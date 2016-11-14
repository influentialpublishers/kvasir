/*eslint-env node, mocha, es6 */
const demand      = require('must')
const Loader      = require('../loader.js')
const MemoryStore = require('kuss/lib/memory')
const PATH        = __dirname + '/assets/domain'


describe('Kvasir Loader (loader.js)', function() {

  let test_driver = null

  
  beforeEach(function() {
    test_driver = MemoryStore({})
  })

 
  describe('Basic usage: ', function() {

    let DO = {}

    before(function() {
      DO = Loader(PATH)
    })


    it('should generate an object with all the example domain object',
    function() {

      demand(DO.ExampleOne).be.an.object()
      demand(DO.ExampleNumberTwo).be.an.object()

    })


    it('should properly construct the domain objects so that we can '
    + 'avoid some boilerplate', function() {

      const test_data = { foo: 'bar', bar: 'baz', baz: 'buzz' }

      const test = (obj) => {

        demand(obj.id).be.a.string()
        demand(obj.foo).eql('bar')
        demand(obj.bar).eql('baz')
        demand(obj.baz).eql('buzz')

      }

      return Promise.all([

        DO.ExampleOne.insert(test_driver, test_data)
      , DO.ExampleNumberTwo.insert(test_driver, test_data)
        
      ])

      .then(() => Promise.all([

        DO.ExampleOne.example(test_driver, 'bar')
      , DO.ExampleNumberTwo.example(test_driver, 'baz')

      ]))

      .then(([ one, two ]) => {

        test(one[0])
        test(two[0])

      })

    })


    it('should load folder based modules (index) ', function() {

      console.log(DO)
      demand(DO.FolderExample).be.an.object()
      demand(DO.Invalid).be.undefined()

    })


  })


})
