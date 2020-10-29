# README --EasyRide--

A scheduling app for horse riders to book riding times (both indoor and outdoor), group rides and lesson spots. Riders will be able report on progress made and follow through on payment and invoicing. Made with a specific client in mind.

## Tech Stack

- database: postgres
- backend: Ruby on rails, nodejs
- front end: React, Material-UI, Bootstrap, SASS
- testing: circleCI
- deployment: Heroku

## Getting Started:
1. Clone the repository into a new local one, and cd into this local folder

2. Install the database (postgresql must be installed)
  - create the Rails database: ``` $ rails db:create ```
  - Create the databse tables: ```$ rails db:migrate```
  - Seed the database if needed: ```$ rails db:seed```
3. Install Rails dependancies:
  - Install Bundler: ```$ gem install bundler```
  - Install all dependencies: ```$ bundle install```
4. Install Javascript dependencies:
  - Using yarn, ```$ yarn install```
  - Using npm, ```$ npm install```
5. Start rails server: ```$ rails s```

6. Head to http://localhost:3000 in your favourite browser



## [User Stories & Milestones](docs/planning/userStories.md)

## [Routes](docs/planning/routes.md)

## [Project Workflow](docs/planning/contributing.md)

## [Resources](docs/planning/resources.md)

## Contributors

- Audrey Cooper
- Iyris Vigil
- Nicole Woodcock
