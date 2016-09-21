
const R         = require('ramda');


const find = R.curry((name, driver, terms) => driver.find(name, terms));


const findOne = R.curry((name, driver, terms) => driver.findOne(name, terms));


const findById = R.curry((name, driver, id) => driver.findById(name, id));


const update = (name, driver, request, current) =>
  driver.update(name, request, current);


const insert = (name, driver, request) => driver.create(name, request);


// save :: String -> Driver -> Request -> Current -> Model
const save = R.curry((name, driver, request, current = null) =>
  R.isNil(current) ?
    insert(name, driver, request) :
    update(name, driver, request, current)
);


module.exports = R.curry((name, driver) => ({
  find     : find(name, driver)
, findOne  : findOne(name, driver)
, findById : findById(name, driver)
, save     : save(name, driver)
}));
