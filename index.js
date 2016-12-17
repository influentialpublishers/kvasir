
const R         = require('ramda');


const callDriverMethod = R.curry((method, bucket, driver, request) =>
    driver[method](bucket, request)
)


const METHODS = [

// Driver -> Record -> Promise Id
  'insert'

// Driver -> KeyList -> Record -> Promise Id
, 'upsert'

// Driver -> Id -> Record -> Promise Id
, 'update'

// Driver -> PredicateDictionary -> Params -> Record -> Promise Something
, 'updateWhereEq'

// Driver -> Projection -> Promise Array Record
, 'projectAll'

// Driver -> Projection -> Property -> Value -> Promise Array Record
, 'findBy'

// Driver -> Projection -> Property -> Value -> Promise Record
, 'findOneBy'

// Driver -> PredicateDictionary -> Promise Array Record
, 'findWhere'

// Driver -> () -> Promise Array Record
, 'getAll'

// Driver -> String -> Promise Record
, 'getById'

// Driver -> String -> Promise Record
, 'deleteById'
];


/**
 * This factory will create a KVasir object with the methods above.
 * Each method expects slightly different parameters, however they
 * all expect that a `Driver` object be passed as the first parameter.
 * The factory method also expects a `bucket` string that defines the
 * storage bucket (table, repository, etc...) where the domain's data
 * may be found.
 */
const BaseFactory = (bucket) => R.compose(
  R.fromPairs
, R.map((method) => [ method, callDriverMethod(method, bucket) ])
)(METHODS)


const Factory = (bucket, constructor) => {

  const base_factory = BaseFactory(bucket)
  const your_factory = constructor(base_factory, bucket)

  return R.merge(base_factory, your_factory)

}


Factory.Base        = BaseFactory
Factory.METHOD_LIST = METHODS


module.exports      = Factory
