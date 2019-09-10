const Model = require('../Model/Auth')
const Store = require('../Config/Store')

const AuthController = class Auth {

  static setClient(account){

    if (Object.keys(account).length === 0 && account.constructor !== Object) {
      return { status: 400, message: 'account is not defined or not object' }
    }

    if (account.activeCard === null || account.activeCard === undefined || typeof account.activeCard !== "boolean") {
      return { status: 400, message: 'activeCard is not defined or not boolean' }
    }

    if (account.availableLimit === null || account.availableLimit === undefined || !Number.isInteger(account.availableLimit)) {
      return { status: 400, message: 'availableLimit is not defined or not integer' }
    }

    if (Store.has('account')) {
      return {
        status: 400,
        message: {
          account: {
            activeCard: account.activeCard,
            availableLimit: account.availableLimit
          },
          violations: [
            "account-already-initialized"
          ]
        }
      }
    }

    return Model.setClient(account)
  }

}

module.exports = AuthController
