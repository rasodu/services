# DLEMPFast
Start DLEMP server with prebuilt docker images. This is much faster than building images from dockerfiles.

## What are goals of this project?
1. Provide disposable PHP development environment.
- Provide isolated PHP development environment for each of your projects.
- Allow developers to manage and version control PHP environment on per project basis.(Developers can easily install additional PHP extensions)
- Provide quick way to run PHP project in single server production setup and clear path to scale app in production.

## Which version of PHP do you support?
We support PHP 5.6 and 7.0

## How do I install this?
- If you don't have an existing project, then create a new project
    1. ```docker-machine ssh default``` (Only if you are not on Linux machine)
    - ```cd <project-dir>```
    - ```docker run --rm -it --user=$(id -u):$(id -g) -v $(pwd):/usr/share/nginx/WEBAPP rasodu/cmdlaravel:7.0.1 /bin/bash```
    - ```laravel new [new-project-dir]``` or ```composer create-project laravel/laravel=5.1.<*|33> <.|new-project-dir>```    
- Add DLEMPFast to your project
    1. ```docker run --rm -it --user=$(id -u):$(id -g) -v $(pwd):/usr/share/nginx/WEBAPP rasodu/cmdlaravel:7.0.1 /bin/bash```
    - ```composer require rasodu/services:dev-master```
    - ```mkdir public``` If it doesn't exist
    - ```mkdir -p services/docker-config```
    - Copy ```.dockerignore``` file form ```rasodu/DLEMP``` to your project's root folder
    - In you project's '.env'(and also to '.env.example' if it exist) file create following variables list :
        ```
        COMPOSE_PROJECT_NAME=<your_project_name>

        DLEMPFAST_CONTEXT=../../../../../

        DLEMPFAST_BASE_DIR=vendor/rasodu/services/

        DLEMPFAST_CONFIG_DIR=vendor/rasodu/services/

        DLEMPFAST_PROJECT_DIR=

        DLEMPFAST_RASODU_MYSQL_VERSION=5.6.28

        DLEMPFAST_RASODU_PHPFPMLARAVEL_VERSION=7.0
        DLEMPFAST_RASODU_PHPFPMLARAVEL_CONFIG_DIR=vendor/rasodu/services/
        DLEMPFAST_RASODU_PHPFPMLARAVEL_DOCKERFILE_DIR=vendor/rasodu/services/

        COMPOSE_FILE=vendor/rasodu/services/services/composefile/phpfpmlaravel/c.yml;vendor/rasodu/services/services/composefile/phpfpmlaravel/c.override.yml;vendor/rasodu/services/services/composefile/httpbackendlaravelnginx/c.yml;vendor/rasodu/services/services/composefile/httpbackendlaravelnginx/c.override.yml;vendor/rasodu/services/services/composefile/loadbalancernginx/c.yml
        ```
    - ```chmod 777 -R bootstrap/cache/ && chmod 777 -R storage/```
    - Try to start server with ```docker-compose up -d``` command
    - Once server starts successfully, commit changed files to your project.
- Optional installation steps
    1. Add ```/public/phpunit-coverage``` and ```/public/app-documentation``` to your project's '.gitignore' : If you will be generating phpunit code coverage.
    - If you want to use browser sync, then add following code to 'gulpfile.js'.
        ```javascript

            mix.browserSync({
                proxy: 'https://nginxhttps',
                port: 3002,
                ui: {
                    port: 3001
                }
            });
        ```
    - ```mkdir -p com/rasodu/phpfpmlaravel/customization && cp -a vendor/rasodu/services/com/rasodu/phpfpmlaravel/customization/. com/rasodu/phpfpmlaravel/customization/``` : If you want to set custom config.


## How do I start development server?
- ```docker-compose up -d``` : start development server
- ```docker-compose stop``` : stop development server
- ```docker-compose down --rmi local -v``` : remove containers, networks, local images and volumes

## How do I enter cmd container?
- ```docker exec -it --user=$(id -u):$(id -g) <your_project_name>_cmd_1 /bin/bash```

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

## Which optimization should you perform on your production Laravel website?
```
composer install --no-dev
composer dump-autoload --optimize
in .env file 'APP_ENV=production' and 'APP_DEBUG=false'
php artisan optimize --force
php artisan route:cache
php artisan config:cache
```

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

## How do I run my app in AWS ECS cluster?
- Required tools
    - Common
        1. Docker Toolbox
    - Environment specific
        - AWS
            1. AWS CLI
        - Kubernetes
            1. kubectl
            - kompose
            - Kubernetes cluster(An ECS cluster(ECS CLI) : All instance in the cluster should have AmazonEC2ContainerServiceforEC2Role policy)
- Create final combined compose file(Only if you are using kubernetes cluster)
    1. ```docker-compose config > compose-combined.yml```
    - Change version number from '2.0' to '2' in compose-combined.yml
- Push images to repository
    - AWS EC2 Container Registry
        1. ```$(aws ecr get-login)```
        - ```docker-compose build```
        - ```docker push <tag>:<version>``` //Push all custom images for the project: docker images | grep -i <COMPOSE_PROJECT_NAME>
        - docker logout
    - Google Container Registry
        1. &lt;Needs intructions>
- Create cluster
    - AWS Elastic Beanstalk
        1. Create AWS Elastic Beanstalk with Multicontainer Docker Environment with Load Balancer
        - Add policy ```AmazonEC2ContainerServiceforEC2Role``` in ```aws-elasticbeanstalk-ec2-role``` role //this will allow EC2 instances to access EC2 Container Registry
        - Create app specific ```Dockerrun.aws.json```
    - Create Google Container Cluster
        1. &lt;Needs intructions>
- Run containers
    - AWS Elastic Beanstalk
        1. Lod your app specific ```Dockerrun.aws.json``` in your Elastic Beanstalk Environment
    - Kubernets cluster(These instructions need improvement.)
        1. Build images: ```eval $(minikube docker-env)``` and ```docker-compose build```
        - ```kompose -f compose-combined.yml up```
        - ```kubectl get deployments,rs,pods,services```
        - ```kubectl expose deployment <deployment-name> --type=LoadBalancer --port=<port-number> [--target-port=<>]```
        - ```kubectl edit svc/docker-registry ```
        - Check service is running : ```curl http://$(minikube ip):32599/```
