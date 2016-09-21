
const PROJECTION = [ 'id', 'foo', 'bar', 'baz' ]

function ExampleOne(domain, bucket) {

  return {
    example: (driver, x) => driver.findBy(bucket, PROJECTION, 'foo', x)
  }
}


ExampleOne.BUCKET = 'example-one'


module.exports = ExampleOne
