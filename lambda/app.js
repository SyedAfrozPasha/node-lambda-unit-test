const data = require("../dataService/data");
const utils = require("../utils/utils");

exports.handler = async (event, context) => {
  return await lambdaFunction(event, context);
};

/* ************************************
Uncomment this section to test the lambda locally
using node lambda/app.js
**************************************
const event1 = {
  body: { searchText: "100", someotherParams: "ABC" },
};
exports.handler(event1, null);
************************************ */

async function lambdaFunction(event, context) {
  const response = {};
  try {
    let requestBody = event.body;
    let { searchText, someotherParams } = requestBody;

    /* Validate the required request params */
    if (
      !utils.validateInputs(searchText) ||
      !utils.validateInputs(someotherParams)
    ) {
      throw new Error("Invalid request body");
    }

    const searchResult = await fetchSearchResult(searchText, someotherParams);

    if (searchResult && searchResult.length > 0) {
      response.data = searchResult;
      response.message = "Results fetched!";
    } else {
      response.data = searchResult || [];
      response.message = "No results found";
    }
    response.code = 200;

    // console.log("response:", response);
    return response;
  } catch (error) {
    response.code = 400;

    if (error) {
      response.ErrorMessages = [error.message];
    }

    // console.log("response-ERR:", response);
    return response;
  }
}

async function fetchSearchResult(searchText, someotherParams) {
  try {
    const dbQuery = `
            SELECT * FROM TABLE_A WHERE Keyword like '%${searchText}%'
            ORDER BY '${someotherParams}'
        `;
    const dbResult = await data.query(dbQuery);
    if (dbResult && dbResult.records && dbResult.records.length > 0) {
      return dbResult.records;
    } else {
      return [];
    }
  } catch (e) {
    throw e;
  }
}
