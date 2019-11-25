[![Build Status](https://travis-ci.com/AutomaticDoorControl/AutoDoorCtrlWeb.svg?branch=master)](https://travis-ci.com/AutomaticDoorControl/AutoDoorCtrlWeb) [![Coverage Status](https://coveralls.io/repos/github/AutomaticDoorControl/AutoDoorCtrlWeb/badge.svg?branch=coveralls)](https://coveralls.io/github/AutomaticDoorControl/AutoDoorCtrlWeb?branch=coveralls)
# AutoDoorCtrlWeb 

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 1.7.1.

AutoDoorCtrlWeb is the Website with which Students can login and access the button that allows them to open the service doors from their mobile devices. This website connects to a PHP API that uses a MySQL databse. The API repository can be found [here](https://github.com/AutomaticDoorControl/AutoDoorCtrlWebAPIPHP).

## Installation Instructions
  * clone repository: `https://github.com/AutomaticDoorControl/AutoDoorCtrlWeb.git`
  * Download Node and npm onto your machine(if you haven't already)
  * Install angular cli using `npm install -g @angular/cli`
  * Navigate to the AutoDoorCtrlWeb folder
  * run `npm install`
  * run with `ng serve --open`
  * Website should open on localhost:4200
  * NOTE: Many of the components of the website will not function without access to the API. Point the website to the API by changing the value of `apiServer` in `/src/app/globals.ts`

## Angular CLI Notes 
### Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.

### Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module`.

### Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory. Use the `-prod` flag for a production build.

### Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

### Running end-to-end tests

Run `ng e2e` to execute the end-to-end tests via [Protractor](http://www.protractortest.org/).

### Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI README](https://github.com/angular/angular-cli/blob/master/README.md).
