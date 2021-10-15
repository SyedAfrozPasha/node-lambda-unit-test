/**
 * Function to get search result from database (mock result)
 */

const self = {
  query(SQLquery) {
    return new Promise((resolve, reject) => {
      resolve({
        records: [
          { keyword: "EMP100101", departmentId: 1 },
          { keyword: "EMP100167", departmentId: 2 },
          { keyword: "EMP100199", departmentId: 4 },
          { keyword: "EMP181001", departmentId: 5 },
          { keyword: "EMP122100", departmentId: 9 },
        ],
      });
    });
  },
};

module.exports = self;
