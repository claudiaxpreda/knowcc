#!/bin/bash

docker-machine ssh $1 "mkdir Database"
docker-machine scp Database/init-db.sql $1:Database
docker-machine scp -r kong/ $1:.
docker-machine scp -r nginx/ $1:.
docker-machine scp $2 $1:.
docker-machine scp -r secrets/ $1:.
docker-machine scp stack-portainer.yml $1:.
