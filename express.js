
const Loader            = require('./loader.js')
const DEFAULT_NAMESPACE = 'DO'

module.exports = ({ namespace=DEFAULT_NAMESPACE, path }) => {

  const Domain = Loader(path)

  return (req, res, next) => {

    if (!req[namespace]) req[namespace] = Domain

    return next()

  }

}
