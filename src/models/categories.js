'use strict';

const uuid = require('uuid/v4');

const schema = {
  _id: {required:true},
  name: {required:true},
  description: {required:true},
};

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

    for(let key in schema) {
      if (schema[key].required ) {
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


module.exports = Categories;
