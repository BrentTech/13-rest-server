'use strict';

const Products = require('../models/products.js');
const supergoose = require('./supergoose.js');

beforeAll(supergoose.startDB);
afterAll(supergoose.stopDB);

describe('Products Model', () => {
  it('can post() a new product', () => {
    let obj = {name:'Broom', type:'Thing',description:'Super nice!'};
    let products = new Products();
    return products.post(obj)
      .then(record => {
        Object.keys(obj).forEach(key =>{
          expect(record[key]).toEqual(obj[key]);
        });
      });
  });

  it('can get() a product', () => {
    let obj = {name:'Broom', type:'Thing',description:'Super nice!'};
    let products = new Products();
    return products.post(obj)
      .then(record => {
        return products.get(record._id)
          .then(player => {
            Object.keys(obj).forEach(key =>{
              expect(player[0][key]).toEqual(obj[key]);
            });
          });
      });
  });
    
  it('can put() a category', () => {
    let obj = {name:'Broom', type:'Thing',description:'Super nice!'};
    let products = new Products();
    return products.post(obj)
      .then(record => {
        return products.put(record._id, {name:'Broom', type:'Thing',description:'It ok...'})
          .then(products => {
            expect(products.nModified).toEqual(1);
          });
      });
  });

  it('can delete() a category', () => {
    let obj = {name:'Broom', type:'Thing',description:'Super nice!'};
    let products = new Products();
    products.post(obj)
      .then(record => {
        record._id = 4;
        products.delete(4);
      })
      .then(() => {
        return products.get()
          .then(records => {
            let bool = false;
            for(let i = 0; i < records.length; i++){
              if(records._id === 4){
                bool = true;
              }
            }
            expect(bool).toBe(false);
          });
      });
  });
});