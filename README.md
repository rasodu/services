# DLEMPFast
Start DLEMP server with prebuilt docker images. This is much faster than building images from dockerfiles.

## What are goals of this project?
1. Provide disposable PHP development environment.
2. Provide isolated PHP development environment for each of your projects.
3. Provide quick way to run PHP project in single server production setup and clear path to scale app in production.
4. Allow developers to manage and version control PHP environment on per project basis.(Developers can easily install additional PHP extensions)

## Which version of PHP do you support?
At this point we only support PHP 5.6. We will add support for PHP 7 once we think that we have iron out the kinks.

## How do I install this?
1. ```cd <project-dir>```
2. add '/DLEMPFast' and '/public/phpunit-coverage' to your project's '.gitignore'
3. ```git clone https://github.com/rasodu/DLEMPFast.git DLEMPFast```
4. ```mkdir public```
5. ```cp DLEMPFast/.dockerignore . && mkdir -p docker/docker-config && cp DLEMPFast/docker/docker-config/letsencrypt-cli.ini docker/docker-config/```
6. Only if you want to use DLEMPFast for production(Optional): Set email and domain in 'letsencrypt-cli.ini'
7. In you project's '.env'(and also to '.env.example' if it exist) file create following variables list :
    ```
    COMPOSE_PROJECT_NAME=<your_project_name>
    ```
    ```
    DLEMPFAST_CONTEXT=../../../
    ```
    ```
    DLEMPFAST_BASE_DIR=DLEMPFast/
    ```
    ```
    DLEMPFAST_CONFIG_DIR=DLEMPFast/
    ```
    ```
    COMPOSE_FILE=DLEMPFast/docker/composefile/network.yml;DLEMPFast/docker/composefile/phpfpm56.yml;DLEMPFast/docker/composefile/phpfpm56.override.yml;DLEMPFast/docker/composefile/nginx.yml;DLEMPFast/docker/composefile/mysql.yml;DLEMPFast/docker/composefile/s3mock.override.yml;DLEMPFast/docker/composefile/redis.yml;DLEMPFast/docker/composefile/nodesocket.yml;DLEMPFast/docker/composefile/beanstalkd.yml;DLEMPFast/docker/composefile/queue.yml
    ```
8. Try to start server with ```docker-compose up -d``` command
9. Once server starts successfully, commit changed files to your project.

## How do I start development server?
- ```docker-compose up -d``` : start development server
- ```docker-compose stop``` : stop development server
- ```docker-compose down --rmi local -v``` : remove containers, networks, local images and volumes

## How do I customize nginx settings?

## How do I customize PHP settings?

## How do I install additional PHP extensions?

## How do I use FakeS3 during development?

## How do I use Xdebug?

## How do I generate phpunit code coverage?

## Does this project support Laravel Broadcasting Events?

## Does this project support Laravel Queue?

## How do I start production server?
- ```docker-compose -f docker-compose.yml -f docker-compose.prod.yml up -d``` : to start services on production server
- ```docker-compose -f docker-compose.yml -f docker-compose.prod.yml build [service-name]``` : to build all services or to rebuild single service
- ```docker-compose -f docker-compose.yml -f docker-compose.prod.yml up -d --no-deps <service-name>``` : to start single service
- *Note*: Not all services available during development are available in production. 's3mock' and 'cmd' will not be created during production. You should use S3 during production.

## How do I get SSL certificate for production server?
```
docker-machine ssh <production-machine-name>
docker exec -it <projectname>_nginxhttp_1 /bin/bash
/DLEMP/letsencrypt/bin/letsencrypt-auto --version
/DLEMP/letsencrypt/bin/letsencrypt-auto certonly --agree-tos
ln -sf /etc/letsencrypt/live/<domain>/privkey.pem /etc/letsencrypt/privkey.pem
ln -sf /etc/letsencrypt/live/<domain>/fullchain.pem /etc/letsencrypt/fullchain.pem
exit
exit
docker-compose -f docker-compose.yml -f docker-compose.prod.yml restart nginxhttps
```

## How do I scale my app in production?
