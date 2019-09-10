const Store = require('../Config/Store')

const TransactionModel = class Transaction {

  static getTransactions () {
    return Store.get('transactions')
  }

  static setNewTransaction (transaction, account){

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

  static verifyHighFrequencySmallInterval (transaction) {

    try {

      if (this.hasTransactionsAndAreArray()) {
        const transactions = this.getTransactions();
        const found = transactions.filter(elm =>  elm.timestamp >= (transaction.timestamp - 120000))
        return found.length >= 3
      }

      return false
    } catch (e) {
      return {
        status: 500,
        message: e.message
      }
    }
  }

  static verifyDoubledTransaction (transaction){

    try {

      if (this.hasTransactionsAndAreArray()) {
        const transactions = this.getTransactions()
        const found = transactions.filter(elm => elm.merchant === transaction.merchant && elm.amount === transaction.amount && elm.timestamp >= (transaction.timestamp - 120000))
        return found.length >= 2
      }

      return false

    }catch (e) {
      return {
        status: 500,
        message: e.message
      }
    }
  }

  static hasTransactionsAndAreArray () {
    return ( Store.has('transactions') && Array.isArray(Store.get('transactions')) )
  }

}

module.exports = TransactionModel
