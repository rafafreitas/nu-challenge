const ModelAuth = require('../Model/Auth');
const ModelTransaction = require('../Model/Transaction');
const Store = require('../Config/Store');

const TransactionController = class Transaction {

  static setTransaction(transaction){

    if (!Store.has('account')) {
      return { status: 400, message: "uninitialized account" }
    }
    const account = ModelAuth.getClient()

    if (Object.keys(transaction).length === 0 && transaction.constructor !== Object) {
      return { status: 400, message: 'transaction is not defined or not object' }
    }

    if (transaction.merchant === null || transaction.merchant === undefined ||  typeof transaction.merchant !== "string") {
      return { status: 400, message: 'merchant is not defined or not string' }
    }

    if (transaction.amount === null || transaction.amount === undefined || !Number.isInteger(transaction.amount)) {
      return { status: 400, message: 'availableLimit is not defined or not integer' }
    }

    if (transaction.time === null || transaction.time === undefined || new Date(transaction.time).toString() === 'Invalid Date') {
      return { status: 400, message: 'time is not defined or not valid date' }
    }
    transaction.timestamp = new Date(transaction.time).getTime();

    if (!account.activeCard) {
      return { status: 400, message: { account: { activeCard: account.activeCard, availableLimit: account.availableLimit }, violations: [ "card-not-active" ]} }
    }

    if (account.availableLimit <= transaction.amount) {
      return { status: 400, message: { account: { activeCard: account.activeCard, availableLimit: account.availableLimit }, violations: [ "insufficient-limit" ]} }
    }

    if (ModelTransaction.verifyHighFrequencySmallInterval(transaction)) {
      return { status: 400, message: { account: { activeCard: account.activeCard, availableLimit: account.availableLimit }, violations: [ "high-frequency-small-interval" ]} }
    }

    if (ModelTransaction.verifyDoubledTransaction(transaction)) {
      return { status: 400, message: { account: { activeCard: account.activeCard, availableLimit: account.availableLimit }, violations: [ "doubled-transaction" ]} }
    }

    return ModelTransaction.setNewTransaction(transaction, account)

  }

}

module.exports = TransactionController
