#!/bin/bash

set -ex
source ../../.release.env

if [ -z "${SSH_DEPLOY_USER+x}" ]; then
  echo "SSH_DEPLOY_USER is unset"
  exit 1
fi

if [ -z "${SSH_DEPLOY_HOST+x}" ]; then
  echo "SSH_DEPLOY_HOST is unset"
  exit 1
fi

if [ -z "${SSH_DEPLOY_PORT+x}" ]; then
  echo "SSH_DEPLOY_PORT is unset"
  exit 1
fi

SSH_DEPLOY_ADDRESS=$SSH_DEPLOY_USER@$SSH_DEPLOY_HOST

VERSION_BASE=$(jq -r .version ./package.json | grep -oE "^\d+\.\d+\.")
VERSION_FIX=$(jq -r .version ./package.json | grep -oE "\d+$")
VERSION=$VERSION_BASE$(($VERSION_FIX+1))
echo Releasing $VERSION

# bump version in package.json
jq "del(.version) + {\"version\":\"$VERSION\"}" ./package.json > ./package.json.tmp && mv ./package.json.tmp ./package.json

# bump version in k8s deployment
K8S_DEPLOYMENT=$(sed '/^---$/q' ../../kubernetes/vite-react.yaml | grep -v '^---$')
K8S_DEPLOYMENT=$(yq ".spec.template.spec.containers.0.image=\"makxca/makxca-site:react-vite$VERSION\"" <<< "$K8S_DEPLOYMENT")
K8S_SERVICE=$(grep -A 9999 "^---$" ../../kubernetes/vite-react.yaml | grep -v '^---$')
echo "$K8S_DEPLOYMENT\n---\n$K8S_SERVICE" > ../../kubernetes/vite-react.yaml

# push docker
pnpm build
pnpm run docker

# update k8s config
scp -P $SSH_DEPLOY_PORT -r ../../kubernetes/vite-react.yaml $SSH_DEPLOY_ADDRESS:~/makxca-site/kubernetes/vite-react.yaml
ssh $SSH_DEPLOY_ADDRESS -p $SSH_DEPLOY_PORT "kubectl apply -f ~/makxca-site/kubernetes/vite-react.yaml"
