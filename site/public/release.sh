#!/bin/bash

set -ex
source ./../../.release.env

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

# upload public folder to the server
scp -P $SSH_DEPLOY_PORT -r . $SSH_DEPLOY_ADDRESS:/var/www/public/
