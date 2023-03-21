# PANDA crud app


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

##### windows / linux: 
```bash
copy .env.dist to .env
or rename it

update the database credentials in the .env 
```



```bash
npm i
node .
```



### alternative container setup:
```bash
sudo docker run -d \
  --name=mariadb \
  -e PUID=1000 \
  -e PGID=1000 \
  -e TZ=Etc/UTC \
  -e MYSQL_ROOT_PASSWORD=VYTHVTTYwwYig94xO2kbFmKVc04Dj1gYwlUQ8XkRRu2eECkRUOK8DuO99NAapsuwJN6Pezi1wAO0pJcCVK5xSAS \
  -e MYSQL_DATABASE=prod_database \
  -e MYSQL_USER=prod_user \
  -e MYSQL_PASSWORD=1UecKiKRbGOWCcmD2UvyweNDB0hgvQsvYIj3ILKFapw7EMIfTWh9TgAostfCpDW77FdsSbv0qB8bvxIWyB5AGG5qATYM \
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