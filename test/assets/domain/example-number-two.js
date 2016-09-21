
const PROJECTION = [ 'id', 'foo', 'bar', 'baz' ]


function ExampleTwo(domain, bucket) {

  return {
    example: (driver, x) => driver.findBy(bucket, PROJECTION, 'bar', x)
  }
}


ExampleTwo.BUCKET = 'example-two'


module.exports = ExampleTwo
