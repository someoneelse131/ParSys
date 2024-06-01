## DOCKER COMPOSE FILE FINISHED ##

1. Install Docker on your machine
2. edit ".env" files for specific settings
3. Copy both files (docker-compose.yml and .env) into a folder
4. Navigate into folder and run Command
docker compose up

# Additional Commands and Infos

# Pull Image install and run container
docker compose up -d

# Stop complete container
docker compose down

# Lookup running containers
docker ps

# Lookup stopped containers
docker ps -a


# CHEATSHEET #

# run docker container
docker run -it container_name bash

# Show active Container
docker ps

# Show all container
docker ps -a

# show docker images
docker images

# run compose file (need to be in docker-compose.yml path)
docker-compose run

# run in background
docker-compose -d

# stop compose 
docker-compose down

# run docker container
docker start container_name

# show docker container logs
docker logs container_name

# image bauen -> Dockerfiles änderungen werden nur übernommen wenn build nochmals ausgeführt wird
docker build compose

# show docker networks
docker network ls

# show docker network details
docker inspect network_id

# DELETE all images
docker rmi -f (docker images -q)

# DELETE all container
docker rm -f (docker ps -a -q)

# DELETE all volumes
docker volume rm (docker volume ls -q)
docker volume rm $(docker volume ls -q)

# open bash from running container
docker exec -it [docker id or docker name] bash
