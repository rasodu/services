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
1. Download zip file for this project from github and unzip it on your disk
2. Add '/public/phpunit-coverage' to your project's '.gitignore' file
3. Copy 'docker/' folder to your project directory
4. Copy three '\*.yml' at the root of this project to your project directory
5. Copy '.dockerignore' to your project directory
6. Set 'email' and 'domains' in 'docker/docker-config/letsencrypt-cli.ini'(If you don't want to start production server with this project, then you don't need set these values.)
7. Try to start server with ```docker-compose up -d``` command
8. Once server starts successfully, commit the files to your project.

## How do I start development server?
- ```docker-compose up -d``` : start development server
- ```docker-compose stop``` : stop development server
- ```docker-compose rm``` : remove containers

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
