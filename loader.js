
const R = require('ramda')
const startcase = require('lodash.startcase')
const Kvasir    = require('./index.js')


const Loader = (path) => require('require-all')({

  dirname: path

, recursive: false

, resolve: function(Domain) {
    return Kvasir(Domain.BUCKET, Domain)
  }

, map: R.compose(R.replace(/\s/g,''), startcase, R.replace(/-/g, ' '))

})


module.exports = Loader
