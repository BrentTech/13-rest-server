'use strict';

const uuid = require('uuid/v4');

const productModel = require('./products-schema.js');

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

module.exports = Products;
