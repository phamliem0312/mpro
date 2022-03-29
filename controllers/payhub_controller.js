const api = require('../apis/bank_api')

module.exports = {
  mobi_internal: async (req, res, next) => {
    try {
      let data = {}
      let response = {}
      data.transactionID = req.body.transactionID;
      data.createDatetime = req.body.createDatetime;
      data.functionID = req.body.functionID;
      data.packID = req.body.packID;
      data.packAmount = req.body.packAmount;
      data.transactionAmount = req.body.transactionAmount;
      data.accountNumber = req.body.accountNumber;
      if (req.body.functionID == 1) {
        response = await api.transfer_account_1(data);
      }
      else if (req.body.functionID == 2) {
        response = await api.transfer_account_2(data);
      }
      res.status(200).send({
        code: 0,
        type: 'success',
        message: '',
        data: {
          response: response.data
        }
      })
    }
    catch (err) {
      res.status(500).send({
        code: 999,
        type: 'failure',
        message: err.stack,
        data: {}
      })
    }
  },
  test: async (req, res, next) => {
    req.body.test;
    res.status(200).send({
      requestData: req.body
    })
  }
}