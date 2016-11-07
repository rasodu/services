# Change Log
All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](http://keepachangelog.com/)
and this project adheres to [Semantic Versioning](http://semver.org/).

## [Unreleased]
### Changed
### Added
### Fixed


## 0.4.0 - 2016-11-06
### Changed
- Use official letsencrypt image
- Change name of files that create volumes for mysql and elasticsearch services
### Added
- Allow beanstalkd and redis to operate completely from memory if docker volumes are not used.
- Allow choosing specific version of Elasticsearch

## 0.3.1 - 2016-10-02
### Changed
- phpfpmlaravel.prod.yml changed to phpfpmlaravel.vol.yml
### Added
- beanstalkd.vol.yml file is added
- redis.vol.yml file is added
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
