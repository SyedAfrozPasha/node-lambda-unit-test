const self = {
  /* function to validate mandatory input are not null or empty.
  if input is valid, it return true else false */
  validateInputs(input) {
    if (input === null || input === undefined || input === "") {
      return false;
    }
    return true;
  },
};

module.exports = self;
