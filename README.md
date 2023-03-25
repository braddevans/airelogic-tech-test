# PANDA crud app

## links:

##### Trello: https://trello.com/b/uW5mAqqq/airelogic-techtest


##### Patient Appointment Network Data Application

### requirements:
```bash
 - Nodejs 14+
 - Mongodb Database
```


##### requirement setup:
##### windows:
head to: https://nodejs.org/en/download
and download the version for your platform e.g. (windows x64 installer)

##### linux:
install instructions for all linux distributions can be found on this page: 
https://nodejs.org/en/download/package-manager


###


## project setup instructions:

```bash
git clone https://github.com/braddevans/airelogic-tech-test/
cd airelogic-tech-test/
git checkout patient-appointment-backend

# can head directly to docker setup or manual run below
```


### env setup:
```bash
copy .env.dist to .env
or rename it

update the database credentials in the .env 
```


### bare metal:
```bash
npm i
node .
```



### docker container setup:
```bash
sudo docker run -d \
  --name=mariadb \
  -e PUID=1000 \
  -e PGID=1000 \
  -e TZ=Etc/UTC \
  -e MYSQL_ROOT_PASSWORD=longerlongpasswordhere \
  -e MYSQL_DATABASE=prod_database \
  -e MYSQL_USER=prod_user \
  -e MYSQL_PASSWORD=longpasswordhere \
  -p 73306:3306 \
  -v `pwd`/db/:/config \
  --restart unless-stopped \
  lscr.io/linuxserver/mariadb:latest


sudo docker run -it -d \
  --name prod_api \
  -p 8192:8192
  -v `pwd`:/usr/src/app \
  -w /usr/src/app \
  node:18-bullseye-slim /bin/bash ./start.sh
```