# Unit Testing of AWS lambda functions (Node.js) using Mocha and Chai

## Quick Guide

1. Run `npm install` to install dependencies.

2. Run `npm run test` to run the test cases.

3. To run the lambda function locally, open `src/lambda/app.js` and uncomment a section of code (line 12 to 15). Then run `npm run start` command in the terminal to execute the lambda.

## Tools/Libraries Used

- [Mocha](https://mochajs.org/)
- [Chai](https://www.chaijs.com/)
- [Proxyquire](https://www.npmjs.com/package/proxyquire)
- [Lambda Tester](https://www.npmjs.com/package/lambda-tester)
