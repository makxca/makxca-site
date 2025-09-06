#!/bin/bash

set -ex
source ./../.release.env

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

# upload new config
scp -P $SSH_DEPLOY_PORT ./nginx.conf $SSH_DEPLOY_ADDRESS:/etc/nginx/nginx.conf

# restart nginx
ssh -p $SSH_DEPLOY_PORT $SSH_DEPLOY_ADDRESS "sudo nginx -s reload"
# if this error, try to find process number and kill it:
# ssh -p $SSH_DEPLOY_PORT $SSH_DEPLOY_ADDRESS "sudo lsof -i :80 | grep -oe "nginx\s*[0-9]*" | grep -oe "[0-9]*" | sudo xargs kill -9"
