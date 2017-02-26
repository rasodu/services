# Change Log
All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](http://keepachangelog.com/)
and this project adheres to [Semantic Versioning](http://semver.org/).

## [Unreleased]
### Changed
- Added functionality to tag images that are custom built for the project. This requires additional tags.
### Added
- Added sample ```Dockerrun.aws.json```
- Makefile is added for the project
- DynamoDB compose file is added
### Fixed


## 0.8.0 - 2017-02-04
### Changed
- Composefile location changed in the repository

## 0.7.0 - 2017-01-28
### Changed
- Pusher images ports are changed
### Added
- Laravel Echo server is Added
- PHP 7.1 is added
- Node.js server is added

## 0.6.0 - 2016-12-11
### Changed
- Base phpfpm images are updated.
- Composefile name for nginx service is changed.
### Added
- Load balancer is added. This resulted in splitting old nginx service into two service.

## 0.5.0 - 2016-11-06
### Changed
- Use official letsencrypt image
- Change name of files that create volumes for mysql and elasticsearch services
### Added
- Allow beanstalkd and redis to operate completely from memory if docker volumes are not used.
- Allow choosing specific version of Elasticsearch

## 0.4.0 - 2016-10-02
### Changed
- phpfpmlaravel.prod.yml changed to phpfpmlaravel.vol.yml
### Added
- beanstalkd.vol.yml file is added
- redis.vol.yml file is added

## 0.3.1 - 2016-10-02
### Fixed
- problem in .env file is fixed

## 0.3.0 - 2016-10-02
### Added
- Add Elasticsearch support

## 0.2.3 - 2016-10-02
### Fixed
- Browsersync compose file fix

## 0.2.2 - 2016-10-02
### Fixed
- Browsersync compose file fix

## 0.2.1 - 2016-10-02
### Fixed
- Instruction to use Browsersync are updated

## 0.2.0 - 2016-10-12
### Added
- Allow choosing specific version of MySQL
- Allow choosing specific version of PHP(Support for PHP 7.0 is added)

## 0.1.0 - 2016-10-02
### Added
- 'rasodu/dlemp' is added as development dependency to this project
