
const PROJECTION = [ 'id', 'foo', 'bar', 'baz' ]

function ExampleFolder(domain, bucket) {

  return {
    example: (driver, x) => driver.findBy(bucket, PROJECTION, 'foo', x)
  }
}


ExampleFolder.BUCKET = 'folder'


module.exports = ExampleFolder
