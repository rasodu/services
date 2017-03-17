#declare variables
include .env
COMPOSE = docker-compose
PHONY =
PHPFPMLARAVEL_IMAGE = rasodu/cmdlaravel:$(DLEMPFAST_RASODU_PHPFPMLARAVEL_VERSION).2

PHONY += all
all: vendor/rasodu/dlemp/vendor
	$(COMPOSE) build
	$(COMPOSE) up -d

vendor/rasodu/dlemp/vendor: vendor vendor/rasodu/dlemp/composer.json
	docker run --rm -it --user=$$(id -u):$$(id -g) -v $$(pwd)/vendor/rasodu/dlemp:/usr/share/nginx/WEBAPP $(PHPFPMLARAVEL_IMAGE) composer install

vendor: composer.json
	docker run --rm -it --user=$$(id -u):$$(id -g) -v $$(pwd):/usr/share/nginx/WEBAPP $(PHPFPMLARAVEL_IMAGE) composer install

PHONY += test
test: vendor
	case "$(COMPOSE_FILE)" in \
		*"prod.yml"*) \
			docker exec --user=www-data:www-data dlempfast_phpfpm_1 vendor/bin/phpunit --exclude-group=dev,cmd;; \
		*) \
			docker exec --user=$$(id -u):$$(id -g) dlempfast_cmd_1 phpunit --exclude-group=prod \
			&& docker exec --user=$$(id -u):$$(id -g) dlempfast_phpfpm_1 vendor/bin/phpunit --exclude-group=cmd,prod;; \
	esac

PHONY += mostlyclean
mostlyclean:
	$(COMPOSE) down -v

PHONY += clean
clean:
	$(COMPOSE) down -v --rmi local
	-$(RM) -r vendor


#these rules can only be run during development mode. They run inside cmd container.


PHONY += enter
enter:
	docker-compose exec --user=$$(id -u):$$(id -g) cmd bash


#declare the contents of the PHONY variable as phony.
.PHONY: $(PHONY)
