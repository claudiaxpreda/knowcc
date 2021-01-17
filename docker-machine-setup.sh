#!/bin/bash

docker-machine scp Database/init-db.sql $1:Database
docker-machine scp -r kong/ $1:.
docker-machine scp $2 $1:.
