const data = require("../dataService/data");
const utils = require("../utils/utils");

exports.handler = async (event, context) => {
  return await lambdaFunction(event, context);
};

/* ************************************
Uncomment the below section to test the lambda locally
using the command `npm run start`
************************************** */
// const testEvent = {
//   body: { searchText: "100", filterBy: "departmentId" }
// };
// exports.handler(testEvent, null);


async function lambdaFunction(event, context) {
  const response = {};
  try {
    let requestBody = event.body;
    let { searchText, filterBy } = requestBody;

    /* Validate the required request params */
    if (
      !utils.isValidateInput(searchText) ||
      !utils.isValidateInput(filterBy)
    ) {
      throw new Error("Invalid request body");
    }

    // Get search results
    const searchResult = await fetchSearchResult(searchText, filterBy);

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

    return response;
  }
}

// Function to fetch serach result based on searchText and filter
async function fetchSearchResult(searchText, filterBy) {
  try {
    const dbQuery = `
            SELECT * FROM TABLE_A WHERE Keyword like '%${searchText}%'
            ORDER BY '${filterBy}' ASC
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
