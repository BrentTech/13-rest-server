'use strict';

const express = require('express');
const router = express.Router();
const cors = require('cors');
const morgan = require('morgan');
require('dotenv').config();
const mongoose = require('mongoose');
const port = process.env.PORT || 3000;
const uuid = require('uuid/v4');
const mongooseOptions = {
  useNewUrlParser:true,
  useCreateIndex: true,
};

mongoose.connect(process.env.MONGODB_URI, mongooseOptions);

// Prepare the express app
const app = express();

// App Level MW
app.use(cors());
app.use(morgan('dev'));

app.use(express.json());
app.use(express.urlencoded({extended:true}));

// Routes
app.use(router);

// Catchalls
app.use(notFound);
app.use(errorHandler);

app.listen(port, () => console.log(`Server Up on ${port}`));

//Schema
const catSchema = {
  _id: {required:true},
  name: {required:true},
  description: {required:true},
};

const prodSchema = mongoose.Schema({
  _id: {type: String, required:true},
  name: {type: String, required:true},
  type: {type: String, required:true},
  description: {type: String, required:true},
});

mongoose.model('products', prodSchema);

//Data Models
class Products {

  constructor() {
  }

  /**
   *
   *
   * @param {*} _id
   * @returns
   * @memberof Products
   */
  get(_id) {
    let queryObject = _id ? {_id} : {};
    return productModel.find(queryObject);
  }
  
  /**
   *
   *
   * @param {*} entry
   * @returns
   * @memberof Products
   */
  post(entry) {
    entry._id = uuid();
    let newRecord = new productModel(entry);
    return newRecord.save();
  }

  /**
   *
   *
   * @param {*} _id
   * @param {*} entry
   * @returns
   * @memberof Products
   */
  put(_id, entry) {
    return productModel.update({_id}, entry);
  }

  /**
   *
   *
   * @param {*} _id
   * @returns
   * @memberof Products
   */
  delete(_id) {
    return productModel.remove({_id});
  }
}

class Categories {

  constructor() {
    this.database = [];
  }

  /**
   *
   *
   * @param {*} _id
   * @returns
   * @memberof Categories
   */
  get(_id) {
    let response = _id ? this.database.filter( record => record._id === _id) : this.database;
    return Promise.resolve(response);
  }
  

  /**
   *
   *
   * @param {*} entry
   * @returns
   * @memberof Categories
   */
  post(entry) {
    entry._id = uuid();
    let record = this.sanitize(entry);
    if (record._id) {this.database.push(record); }
    return Promise.resolve(record);
  }


  /**
   *
   *
   * @param {*} _id
   * @param {*} record
   * @returns
   * @memberof Categories
   */
  put(_id, record) {
    if(record.name){
      record._id = _id;
    }
    for(let i = 0; i < this.database.length; i++){
      if(record._id === this.database[i]['_id']){
        this.database[i] = record;
      }
    }
    return Promise.resolve(record);
  }


  /**
   *
   *
   * @param {*} _id
   * @returns
   * @memberof Categories
   */
  delete(_id) {
    this.database = this.database.filter( (record) => record._id !== _id);
    return Promise.resolve();
  }


  /**
   *
   *
   * @param {*} data
   * @returns
   * @memberof Categories
   */
  sanitize(data) {
    let valid = true;
    let record = {};

    for(let key in catSchema) {
      if (catSchema[key].required ) {
        if(data[key]) {
          record[key] = data[key];
        }
        else {
          valid = false;
        }
      }
      else {
        record[key] = data[key];
      }
    }
    return valid ? record : undefined;
  }
}

//Data Model Instanciation
const categories = new Categories();
const products = new Products();

//Routes
router.get('/api/v1/categories', getCategories);
router.post('/api/v1/categories', postCategories);
router.get('/api/v1/products', getProducts);
router.post('/api/v1/products', postProducts);

router.get('/api/v1/categories/:id', getCategory);
router.put('/api/v1/categories/:id', putCategories);
router.delete('/api/v1/categories/:id', deleteCategories);
router.get('/api/v1/products/:id', getProduct);
router.put('/api/v1/products/:id', putProducts);
router.delete('/api/v1/products/:id', deleteProducts);

// Functions for Routes
function getCategories(request,response,next) {
  // expects an array of object to be returned from the model
  categories.get()
    .then( data => {
      const output = {
        count: data.length,
        results: data,
      };
      response.status(200).json(output);
    })
    .catch( next );
}

function getCategory(request,response,next) {
  // expects an array with the one matching record from the model
  categories.get(request.params.id)
    .then( result => response.status(200).json(result[0]) )
    .catch( next );
}

function postCategories(request,response,next) {
  // expects the record that was just added to the database
  categories.post(request.body)
    .then( result => response.status(200).json(result) )
    .catch( next );
}

function putCategories(request,response,next) {
  // expects the record that was just updated in the database
  categories.put(request.params.id, request.body)
    .then( result => response.status(200).json(result) )
    .catch( next );
}

function deleteCategories(request,response,next) {
  // Expects no return value (resource was deleted)
  categories.delete(request.params.id)
    .then( result => response.status(200).json(result) )
    .catch( next );
}

function getProducts(request,response,next) {
  // expects an array of objects back
  products.get()
    .then( data => {
      const output = {
        count: data.length,
        results: data,
      };
      response.status(200).json(output);
    })
    .catch( next );
}

function getProduct(request,response,next) {
  // expects an array with one object in it
  products.get(request.params.id)
    .then( result => response.status(200).json(result) )
    .catch( next );
}

function postProducts(request,response,next) {
  // expects the record that was just added to the database
  products.post(request.body)
    .then( result => response.status(200).json(result) )
    .catch( next );
}


function putProducts(request,response,next) {
  // expects the record that was just updated in the database
  products.put(request.params.id, request.body)
    .then( result => response.status(200).json(result) )
    .catch( next );
}

function deleteProducts(request,response,next) {
  // Expects no return value (the resource should be gone)
  products.delete(request.params.id)
    .then( result => response.status(200).json(result[0]) )
    .catch( next );
}

//Error Handlers
function notFound(req,res,next) {
  let error = { error: 'Resource Not Found' };
  res.statusCode = 404;
  res.statusMessage = 'Not Found';
  res.setHeader('Content-Type', 'application/json');
  res.write(JSON.stringify(error));
  res.end();
}

function errorHandler(err, req, res, next) {
  let error = { error: err };
  res.statusCode = 500;
  res.statusMessage = 'Server Error';
  res.setHeader('Content-Type', 'application/json');
  res.write( JSON.stringify(error) );
  res.end();
}

module.exports = {Products, Categories};
