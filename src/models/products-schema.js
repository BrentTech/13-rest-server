'use strict';

const mongoose = require('mongoose');

const products = mongoose.Schema({
  _id: {type: String, required:true},
  name: {type: String, required:true},
  type: {type: String, required:true},
  description: {type: String, required:true},
});

module.exports = mongoose.model('products', products);