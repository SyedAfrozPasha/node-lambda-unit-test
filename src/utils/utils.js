const self = {
  // Function to check if the given input is valid or not
  isValidateInput(input) {
    if (input === null || input === undefined || input === "") {
      return false;
    }
    return true;
  },
};

module.exports = self;
