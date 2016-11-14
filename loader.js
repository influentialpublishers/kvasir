
const R         = require('ramda')
const fs        = require('fs')
const startcase = require('lodash.startcase')
const Kvasir    = require('./index.js')


const load   = (file) => require('file')


const init   = (Domain) => Kvasir(Domain.BUCKET, Domain)


const build  = (Domain, Container) => Container[Domain] = init(Domain)


const rename = R.compose(
  R.replace(/\s/g, '')
, startcase
, R.replace(/-/g, ' ')
)


const Loader = R.compose(
  R.reduce(build, {})
, R.map(load)
, R.map(
, fs.readdirSync
)

const Loader = (path) => require('require-all')({

  dirname: path

, recursive: true

, resolve: function(Domain) {
    return Kvasir(Domain.BUCKET, Domain)
  }

, map: R.compose(R.replace(/\s/g,''), startcase, R.replace(/-/g, ' '))

})


module.exports = Loader
