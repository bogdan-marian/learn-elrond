#!/bin/bash
export PROJECT_ID=general-sand-box
. scripts/set-env.bash
# ./gradlew clean
./gradlew build
docker build -t gcr.io/${PROJECT_ID}/crowdfunding:v1 .
docker run -p 8080:8080 gcr.io/${PROJECT_ID}/crowdfunding:v1