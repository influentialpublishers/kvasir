

function IdGenerator() {
  
  const counters = {};


  this.get = (name) => {

    if ( counters.hasOwnProperty(name) ) {
      counters[name]++;

    } else {
      counters[name] = 1;
    }

    return counters[name];

  };
}


module.exports = IdGenerator;
