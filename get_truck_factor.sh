#!/bin/bash

GIT_REPO=$1
GIT_NAME=$2


rm -rf "./temp"

git clone "$GIT_REPO" "./temp" &> /dev/null

./commit_log_script.sh "./temp" &> /dev/null

java -jar "./gittruckfactor.jar" "./temp" $GIT_NAME

rm -rf "./temp"