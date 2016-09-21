
const R = require('ramda');

/**
 * An in-memory based Kvasir driver implementation.
 */
const Store = require('./store');


module.exports = () => {

  const store = new Store();


  const create = (name, request) => store.insert(name, request);


  const update = (name, request, current) =>
    store.update(name, current.id, request);


  const findById = (name, id) => store.findById(name, id);


  const findOne = (name, terms) => store.findOne(name, terms);


  const find = (name, terms) => store.find(name, terms);


  return {
    create
  , update
  , findById
  , findOne
  , find
  }

};
