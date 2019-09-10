const Store = require('../Config/Store')

const TransactionModel = class Transaction {

  static setTransaction(transaction){

    try {

      Store.union('transactions', {
        merchant: transaction.merchant,
        amount: transaction.amount,
        time: transaction.time,
        timestamp: transaction.timestamp
      })

      return {
        status: 200,
        message: {
          account: {
            activeCard: account.activeCard,
            availableLimit: account.availableLimit
          },
          violations: []
        }
      }

    }catch (e) {
      return {
        status: 500,
        message: e.message
      }
    }
  }

}

module.exports = TransactionModel
