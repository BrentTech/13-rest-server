'use strict';

const uuid = require('uuid/v4');

const productModel = require('./products-schema.js');


/**
 *
 *
 * @class Products
 */
class Products {

  constructor() {
  }

  /**
   *
   * Function that processes read all or read one record on database
   * @param {*} _id
   * @returns resolved promise
   * @memberof Categories
   */
  get(_id) {
    let queryObject = _id ? {_id} : {};
    return productModel.find(queryObject);
  }
  
  /**
   *
   * Function that processes a create to the database
   * @param {*} entry
   * @returns resolved promise
   * @memberof Categories
   */
  post(entry) {
    entry._id = uuid();
    let newRecord = new productModel(entry);
    return newRecord.save();
  }

  /**
   *
   * Function that processes and update to a database record
   * @param {*} _id
   * @param {*} record
   * @returns resolved promise
   * @memberof Categories
   */
  put(_id, entry) {
    return productModel.update({_id}, entry);
  }

  /**
   *
   * Function that processes a database delete
   * @param {*} _id
   * @returns resolved promise
   * @memberof Categories
   */
  delete(_id) {
    return productModel.remove({_id});
  }
}

module.exports = Products;
