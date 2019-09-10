const Store = require('../Config/Store')

const AuthModel = class AuthModel {

  static getClient() {
    return Store.get('account')
  }

  static setClient(account){

    try {

      Store.set({
        account: {
          activeCard: account.activeCard,
          availableLimit: account.availableLimit
        }
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

module.exports = AuthModel
