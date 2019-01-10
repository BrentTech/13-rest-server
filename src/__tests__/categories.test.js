'use strict';

const Categories = require('../models/categories.js');

describe('Category Model', () => {
  it('can post() a new category', () => {
    let obj = {name:'Best People', description:'So good!'};
    let cat = new Categories();
    return cat.post(obj)
      .then(record => {
        Object.keys(obj).forEach(key =>{
          expect(record[0][key]).toEqual(obj[key]);
        });
      })
      .catch(e => console.error('ERR', e) );
  });

  it('can get() a category', () => {
    let obj = {name:'Best People', description:'So good!'};
    let cat = new Categories();
    return cat.post(obj)
      .then(record => {
        return cat.get(record._id)
          .then(cat => {
            Object.keys(obj).forEach(key =>{
              expect(cat[0][key]).toEqual(obj[key]);
            });
          });
      });
  });
  
  it('can put() a category', () => {
    let obj = {name:'Best People', description:'So good!'};
    let cat = new Categories();
    return cat.post(obj)
      .then(record => {
        return cat.put(record._id, {name:'Best People', description:'So bad!'})
          .then(cat => {
            expect(cat.description).toEqual('So bad!');
          });
      });
  });

  it('can delete() a category', () => {
    let obj = {name:'Best People', description:'So good!'};
    let cat = new Categories();
    cat.post(obj)
      .then(record => {
        record._id = 4;
        cat.delete(4);
      })
      .then(() => {
        return cat.get()
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