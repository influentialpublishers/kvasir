/*eslint-env node, mocha*/
const demand      = require('must')
const MemoryStore = require('kuss/lib/memory')
const Kvasir      = require('../index')

const TEST_NAME  = 'test';

describe('kvasir', function() {

  let test_domain = null;
  let test_driver = null;

  beforeEach(function() {
    test_driver = MemoryStore({})

    test_domain = Kvasir(TEST_NAME, (base, bucket) => ({
        myCustomFind: (driver, value) => driver.findBy(bucket, 'foo', value)
    }))
  })


  it('should have be a method with an arity of 2', function() {

    demand(Kvasir).be.a(Function)
    demand(Kvasir.length).eql(2)

  })


  it('should be able to insert and retrieve data', function() {

    const test_data = { foo: 'bar', bar: 'baz', baz: 'buzz' }

    return test_domain.insert(test_driver, test_data)

    .then((id) => test_domain.getById(test_driver, id))

    .then((record) => {
      
      demand(record.id).be.a.string()
      demand(record.foo).eql('bar')
      demand(record.bar).eql('baz')
      demand(record.baz).eql('buzz')

    })

  })


})
