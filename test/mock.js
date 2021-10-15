// Mock Data File

/* ***** SAMPLE INPUT (requestBody) *******
{
    "searchText": "100",
    "filterBy": "departmentId"
}
********************************** */

/* ***** SAMPLE OUTPUT (response) *******
{
    "code": 200,
    "data": [
        { keyword: "EMP100101", id: 1 },
        { keyword: "EMP100167", id: 2 },
        { keyword: "EMP100199", id: 4 },
        { keyword: "EMP181001", id: 5 },
        { keyword: "EMP122100", id: 9 }
    ],
    "message": "Results fetched!",
}
********************************** */

// Input with valid request paramaters
exports.validInput = () => {
  let data = {
    searchText: "100",
    filterBy: "departmentId",
  };

  return {
    body: data,
  };
};

// Input with invalid request paramaters
exports.invalidInput = (params) => {
  let data = {
    searchText: "100",
    filterBy: "departmentId",
  };

  if (params && params.length > 0) {
    if (params.includes("searchText")) {
      data.searchText = null;
    }

    if (params.includes("filterBy")) {
      data.filterBy = null;
    }

    if (data.searchText) {
      data = {
        searchText: null,
        filterBy: null,
      };
    }
  } else {
    data = {
      searchText: null,
      filterBy: null,
    };
  }
  return {
    body: data,
  };
};

// Output of fetchSearchResult function
const fetchSearchResultOutput = (isError, isEmptyOutput) => {
  // Mock error
  if (isError) {
    throw new Error("Error in SQL transaction");
  }

  // Mock empty response
  if (isEmptyOutput) {
    return {
      records: [],
    };
  }

  // Mock success output
  return {
    records: [
      { keyword: "A100XXXXXXXXXXX", id: 1 },
      { keyword: "B00XXXXXXXXX100", id: 1 },
      { keyword: "CXXXXXXX100XXXX", id: 2 },
      { keyword: "DXX100XXXXXXXXX", id: 5 },
      { keyword: "E0XXXXXXXX100XX", id: 9 },
    ],
  };
};

// Mock function which returns the data for each fucntion
exports.mockDBfunction = (functionName, throwError, isEmptyOutput) => {
  switch (functionName) {
    case "fetchSearchResult":
      return fetchSearchResultOutput(throwError, isEmptyOutput);
    default:
      return {};
  }
};
