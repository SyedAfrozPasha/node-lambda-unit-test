// Test case file

const expect = require("chai").expect;
const proxyquire = require("proxyquire");
const lambdaTester = require("lambda-tester");

// Internal dependencies
const utils = require("../src/utils/utils");

// Import mock function from mock.js
const { mockDBfunction, validInput, invalidInput } = require("./mock");

// Define a common test suite
describe("FetchSearchResult Lambda Unit Test", function () {
  let lambda = null;

  // Mocking data services
  let dataStub = {};

  beforeEach(function () {
    // Exporting the lambda with mock dependencies
    lambda = proxyquire.noCallThru().load("../src/lambda/app.js", {
      // Replacing the dependencies present inside lambda function (app.js) with mock functions
      "../dataService/data": dataStub,
      "../utils/utils": utils,
    });
  });

  describe("Successful Invocation", function () {
    let mockData = null;

    before(function () {
      // Attach mock function to data services (mocked)
      dataStub = {
        ...dataStub,
        // Mocking DB call
        query: function (params) {
          // Get the name of the function which is calling 'query' inside lambda function (app.js)
          let functionName = arguments.callee.caller.name;

          // based on the function name mock the data
          return mockDBfunction(functionName);
        },
      };
      // Get valid inputs from mock.js
      mockData = validInput();
    });

    it("with data array", function (done) {
      // Execute lambda function using lambdaTester package
      lambdaTester(lambda.handler)
        .event(mockData) // Passing input data
        .expectResult((result) => {
          // Check if code exist
          expect(result.code).to.exist;

          // Check if code =200
          expect(result.code).to.equal(200);

          // Check if data exist
          expect(result.data).to.exist;

          // Check if data is an array
          expect(result.data).to.be.a("array");

          done();
        })
        .catch(done); // Catch assertion errors
    });

    it("with data array having keyword and departmentId", function (done) {
      lambdaTester(lambda.handler)
        .event(mockData)
        .expectResult((result) => {
          // Check if data is an array
          expect(result.data).to.be.a("array");

          // Check if data[0] is an object
          expect(result.data[0]).to.be.a("object");

          // Check if data[0] has keyword property
          expect(result.data[0]).to.have.own.property("keyword");

          // Check if data[0] has departmentId property
          expect(result.data[0]).to.have.own.property("departmentId");

          done();
        })
        .catch(done);
    });
  });

  describe("Error", function () {
    before(function () {
      dataStub = {
        ...dataStub,
        query: function (params) {
          let functionName = arguments.callee.caller.name;
          return mockDBfunction(functionName);
        },
      };
    });

    it("with code = 400, when searchText is null", function (done) {
      // Mock request body
      const mockData = invalidInput(["searchText"]);

      // Invoking lambda with Mock functions and data
      lambdaTester(lambda.handler)
        .event(mockData)
        .expectResult((result) => {
          // Check if code exist
          expect(result.code).to.exist;

          // Check if code = 400
          expect(result.code).to.equal(400);

          // Check if ErrorMessages exist
          expect(result.ErrorMessages).to.exist;

          // Check if ErrorMessages = `Invalid request body`
          expect(result.ErrorMessages[0]).to.equal("Invalid request body");

          done();
        })
        .catch(done);
    });

    it("with code = 400, when filterBy is null", function (done) {
      // Mock request body
      const mockData = invalidInput(["filterBy"]);

      // Invoking lambda with Mock functions and data
      lambdaTester(lambda.handler)
        .event(mockData)
        .expectResult((result) => {
          // Check if code exist
          expect(result.code).to.exist;

          // Check if code = 400
          expect(result.code).to.equal(400);

          // Check if ErrorMessages exist
          expect(result.ErrorMessages).to.exist;

          // Check if ErrorMessages = `Invalid request body`
          expect(result.ErrorMessages[0]).to.equal("Invalid request body");

          done();
        })
        .catch(done);
    });

    it("with code = 400, when all the required body params are null", function (done) {
      // Mock request body
      const mockData = invalidInput([]);

      // Invoking lambda with Mock functions and data
      lambdaTester(lambda.handler)
        .event(mockData)
        .expectResult((result) => {
          // Check if code exist
          expect(result.code).to.exist;

          // Check if code = 400
          expect(result.code).to.equal(400);

          // Check if ErrorMessages exist
          expect(result.ErrorMessages).to.exist;

          // Check if ErrorMessages = `Invalid request body`
          expect(result.ErrorMessages[0]).to.equal("Invalid request body");

          done();
        })
        .catch(done);
    });
  });

  describe("Error", function () {
    let mockData = null;

    before(function () {
      dataStub = {
        ...dataStub,
        // Mocking DB call
        query: function (params) {
          let functionName = arguments.callee.caller.name;
          let throwError = false;

          if (functionName === "fetchSearchResult") throwError = true;
          return mockDBfunction(functionName, throwError);
        },
      };

      mockData = validInput();
    });

    it("with code = 400, when error occurs inside 'fetchSearchResult' function", function (done) {
      lambdaTester(lambda.handler)
        .event(mockData)
        .expectResult((result) => {
          // Check if code exist
          expect(result.code).to.exist;

          // Check if code = 400
          expect(result.code).to.equal(400);

          done();
        })
        .catch(done);
    });
  });

  describe("Error", function () {
    let mockData = null;

    before(function () {
      dataStub = {
        ...dataStub,
        // Mocking DB call
        query: function (params) {
          let functionName = arguments.callee.caller.name;
          let isEmptyOutput = false;

          if (functionName === "fetchSearchResult") isEmptyOutput = true;

          return mockDBfunction(
            functionName,
            (throwError = false),
            isEmptyOutput
          );
        },
      };

      mockData = validInput();
    });

    it("with code = 200, when no records found in 'fetchSearchResult' function", function (done) {
      lambdaTester(lambda.handler)
        .event(mockData)
        .expectResult((result) => {
          // Check if code exist
          expect(result.code).to.exist;

          // Check if code =200
          expect(result.code).to.equal(200);

          // Check if data exist
          expect(result.data).to.exist;

          // Check if data is an array
          expect(result.data).to.be.a("array");

          done();
        })
        .catch(done);
    });
  });
});
