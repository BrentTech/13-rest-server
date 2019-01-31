![CF](http://i.imgur.com/7v5ASc8.png) LAB
=================================================

## REST Server

### Author: Brent Woodward

### Links and Resources
[![Build Status](https://www.travis-ci.com/BrentTech/13-rest-server.svg?branch=master)](https://www.travis-ci.com/BrentTech/13-rest-server)
* [repo](https://github.com/BrentTech/13-rest-server)
* [travis](https://www.travis-ci.com/BrentTech/13-rest-server)
* [back-end Modular](https://peaceful-retreat-70009.herokuapp.com/)
* [back-end Monolith](https://thawing-ocean-66744.herokuapp.com/)

#### Documentation
* [swagger]() (API assignments only)
* [jsdoc](https://peaceful-retreat-70009.herokuapp.com/docs)

### Modules
#### `modulename.js`
##### Exported Values and Methods

###### `foo(thing) -> string`
Usage Notes or examples


### Setup
#### `.env` requirements
* `PORT` - Port Number set by host service, or .ENV
* `MONGODB_URI` - Set by the host service

#### Running the app

* `npm start`
* Endpoint: `/`
  * Undefined home route
* Endpoint: `/docs`
  * JSDocs
* Endpoint: `/api/v1/products`
  * Returns JSON Object. Handles GET, and POST verbs. POST a new product, or GET all products. 
* Endpoint: `/api/v1/products/:id`
  * Returns JSON Object. Handles GET, PUT, DELETE. GET one product by id, PUT (update) one product by id, and DELETE one product by id.
* Endpoint: `/api/v1/categories`
  * Returns JSON Object. Handles GET, and POST verbs. POST a new category, or GET all categories. 
* Endpoint: `/api/v1/categories/:id`
  * Returns JSON Object. Handles GET, PUT, DELETE. GET one category by id, PUT (update) one category by id, and DELETE one category by id.

#### Tests
* How do you run tests?
* `npm test`
* What assertions were made?

* What assertions need to be / should be made?

#### UML
Link to an image of the UML for your application and response to events
