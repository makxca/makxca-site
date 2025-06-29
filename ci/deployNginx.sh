#!/bin/bash

set -ex
source .release.env

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

scp -P $SSH_DEPLOY_PORT -r ./kubernetes/nginx.conf $SSH_DEPLOY_ADDRESS:~/
ssh $SSH_DEPLOY_ADDRESS -p $SSH_DEPLOY_PORT "sudo mv ~/nginx.conf /etc/nginx"
ssh $SSH_DEPLOY_ADDRESS -p $SSH_DEPLOY_PORT "sudo nginx -s stop"
ssh $SSH_DEPLOY_ADDRESS -p $SSH_DEPLOY_PORT "sudo nginx"
echo SUCCESS
