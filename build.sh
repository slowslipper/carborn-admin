#!/bin/bash

# Variables
PROJECT_NAME=carborn-admin
SOURCE_DIR=/usr/share/nginx/html
TARGET=master
TARGET_PORT=8080
CONTAINER_NAME=${PROJECT_NAME}-${TARGET}
IMAGE_NAME=${PROJECT_NAME}:${TARGET}

echo "TARGET: ${TARGET}"
echo "CONTAINER: ${PROJECT_NAME}"
echo "IMAGE: ${IMAGE_NAME}"

git checkout --track origin/${TARGET}

git pull

docker stop ${CONTAINER_NAME}

docker rm ${CONTAINER_NAME}

docker rmi ${IMAGE_NAME}

docker build -t ${IMAGE_NAME} .

docker run --name ${CONTAINER_NAME} -d -p ${TARGET_PORT}:80 ${IMAGE_NAME}