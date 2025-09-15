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
K8S_DEPLOYMENT=$(sed '/^---$/q' ../../kubernetes/flask.yaml | grep -v '^---$')
K8S_DEPLOYMENT=$(yq ".spec.template.spec.containers.0.image=\"makxca/makxca-site:flask$VERSION\"" <<< "$K8S_DEPLOYMENT")
K8S_SERVICE=$(grep -A 9999 "^---$" ../../kubernetes/flask.yaml | grep -v '^---$')
echo -e "$K8S_DEPLOYMENT\n---\n$K8S_SERVICE" > ../../kubernetes/flask.yaml

# push docker
make docker

# update k8s config
scp -P $SSH_DEPLOY_PORT -r ../../kubernetes/flask.yaml $SSH_DEPLOY_ADDRESS:~/makxca-site/kubernetes/flask.yaml
ssh $SSH_DEPLOY_ADDRESS -p $SSH_DEPLOY_PORT "kubectl apply -f ~/makxca-site/kubernetes/flask.yaml"
scp -P $SSH_DEPLOY_PORT -r ../../kubernetes/flask-config.yaml $SSH_DEPLOY_ADDRESS:~/makxca-site/kubernetes/flask-config.yaml
ssh $SSH_DEPLOY_ADDRESS -p $SSH_DEPLOY_PORT "kubectl apply -f ~/makxca-site/kubernetes/flask-config.yaml"
