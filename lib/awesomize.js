
const awesomize = require('awesomize');

function ValidationError(results) {
  this.message    = 'Validation Error';
  this.name       = 'ValidationError';
  this.status     = 400;
  this.validation = results;
}
ValidationError.prototype             = Object.create(Error.prototype);
ValidationError.prototype.constructor = ValidationError;


const throwValidationError = (results) => {
  throw new ValidationError(results);
};


module.exports = awesomize.dataOrError(throwValidationError);
