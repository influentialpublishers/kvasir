
const R           = require('ramda');
const IdGenerator = require('./id');


function Store() {

  const store = {};
  const generator = new IdGenerator();


  const generateId = (name) => generator.get(name);


  const findById = this.findById = R.curry((bucket, id) => {
    if (!store[bucket][id]) {
      throw new Error('NotFound');
    }
    return store[bucket][id];
  });


  this.findOne = R.curry((bucket, terms) => {
    const results = find(bucket, terms);

    if(!results[0]) {
      throw new Error('NotFound');
    }

    return results[0];
  });


  const find = this.find = R.curry((bucket, terms) => {

  });


  this.update = R.curry((bucket, id, data) => R.compose(
    R.always(id)
  , R.merge(R.__, data)
  , findById(bucket)
  )(id));


  this.insert = R.curry((bucket, data) => R.converge(R.merge, [
    R.identity
  , R.compose(R.objOf('id'), generateId)
  ])(data));

}


module.exports = Store;
