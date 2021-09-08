const self = {
  query(SQLquery) {
    return new Promise((resolve, reject) => {
      resolve({
        recordset: [
          { keyword: "A100XXXXXXXXXXX", id: 1 },
          { keyword: "B00XXXXXXXXX100", id: 2 },
          { keyword: "CXXXXXXX100XXXX", id: 4 },
          { keyword: "DXX100XXXXXXXXX", id: 5 },
          { keyword: "E0XXXXXXXX100XX", id: 9 },
        ],
      });
    });
  },
};

module.exports = self;
