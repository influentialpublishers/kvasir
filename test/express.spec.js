/*eslint-env node, mocha*/
const demand      = require('must')
const MemoryStore = require('kuss/lib/memory')
const Plugin      = require('../express.js')
const PATH        = __dirname + '/assets/domain'


describe('Kvasir Express Plugin (express.js)', function() {

  let driver = null

  
  beforeEach(function() {
    driver = MemoryStore({})
  })


  describe('Basic usage: ', function() {

    let plugin = () => null

    before(function() {
      plugin = Plugin({ path: PATH })
    })


    it('should load the domain objects into the req object',
    function(done) {

      const test_data = { foo: 'bar', bar: 'baz', baz: 'buzz' }

      const test = (obj) => {

        demand(obj.id).be.a.string()
        demand(obj.foo).eql('bar')
        demand(obj.bar).eql('baz')
        demand(obj.baz).eql('buzz')

      }

      const req = {}
      const res = {}

      plugin(req, res, () => {

        req.DO.ExampleOne.insert(driver, test_data)

        .then((id) => req.DO.ExampleOne.getById(driver, id))

        .then(test)

        .then(() => done())

        .catch(done)

      })


    })


  })

})
