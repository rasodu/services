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
- If you don't have an existing project, then create a new project
    1. ```docker-machine ssh default``` (Only if you are not on Linux machine)
    2. ```cd <project-dir>```
    3. ```docker run --rm -it -v $(pwd):/usr/share/nginx/WEBAPP rasodu/cmd:5.6.1 /bin/bash```
    4. ```laravel new [new-project-dir]``` or ```composer create-project laravel/laravel=5.1.<*|33> <.|new-project-dir>```
- Add DLEMPFast to your project
    1. ```cd <project-dir>```
    2. ```git submodule add https://github.com/rasodu/DLEMPFast.git DLEMPFast```
    3. ```mkdir public``` If it doesn't exist
    4. ```cp DLEMPFast/.dockerignore . && mkdir -p docker/docker-config && cp DLEMPFast/docker/docker-config/letsencrypt-cli.ini docker/docker-config/```
    5. In you project's '.env'(and also to '.env.example' if it exist) file create following variables list :
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
        COMPOSE_FILE=DLEMPFast/docker/composefile/phpfpm56.yml;DLEMPFast/docker/composefile/phpfpm56.override.yml;DLEMPFast/docker/composefile/nginx.yml
        ```
    6. Try to start server with ```docker-compose up -d``` command
    7. Once server starts successfully, commit changed files to your project.
- Optional installation steps
    1. Add ```/public/phpunit-coverage``` and ```/public/app-documentation``` to your project's '.gitignore' : If you will be generating phpunit code coverage.
    2. add ```elixir.config.browserSync.proxy= "https://nginxhttps";``` to 'gulpfile.js' : If you want to use browser sync.
    3. ```mkdir -p docker/docker-config && cp -a DLEMPFast/docker/docker-config/. docker/docker-config/``` : If you want to set custom config.
    4. Set email and domain in 'letsencrypt-cli.ini' : Only if you want to use let's encrypt certificate during production for production(Optional):


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
docker run --rm -it -v <project-name>_etc-letsencrypt:/etc/letsencrypt -v <project-name>_acme-challenge:/DLEMP/letsencrypt/public/.well-known/acme-challenge <project-name>_letsencrypt /bin/bash
/DLEMP/letsencrypt/bin/letsencrypt-auto --version
/DLEMP/letsencrypt/bin/letsencrypt-auto certonly --agree-tos
ln -sf /etc/letsencrypt/live/<domain>/privkey.pem /etc/letsencrypt/privkey.pem
ln -sf /etc/letsencrypt/live/<domain>/fullchain.pem /etc/letsencrypt/fullchain.pem
exit
exit
docker-compose -f docker-compose.yml -f docker-compose.prod.yml restart nginxhttps
```

## How do I scale my app in production?
