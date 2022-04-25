#!/bin/bash

GIT_REPO=$1
GIT_NAME=$2


mkdir ./temp
git clone "$GIT_REPO" "./temp" &> /dev/null

./commit_log_script.sh "./temp" &> /dev/null

java -jar "./truckfactor-tool/gittruckfactor.jar" "./temp" $GIT_NAME

rm -rf "./temp"