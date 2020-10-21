// Frameworks
import * as _ from 'lodash'

class IWalletBase {
  constructor(type, site, context) {
    this.type = type
    this.site = site
    this.context = context

    this.web3 = null
    this.provider = null
  }

  static isEnabled() {
    return true
  }

  async init() {
    // Get Default Account if already Connected
    this.changeUserAccount(this.web3.eth.accounts)
    this._hookCommonEvents()
  }

  async connect() {
    // const accounts = await this.provider.enable(); // send("eth_requestAccounts");
    // this.web3.eth.getCoinbase((error, address) => { ... });
    const accounts = await this.web3.currentProvider.enable() // send("eth_requestAccounts");
    this.changeUserAccount(accounts)
  }

  async disconnect() {
    const { logOut } = this.context
    logOut()
  }

  changeUserAccount(accounts = []) {
    if (_.isEmpty(accounts)) {
      return
    }

    const { logIn } = this.context

    logIn(this.type, _.get(accounts, '0', ''))
    // console.log(`User's address changed to "${this.store.defaultAddress}".`);
  }

  getChainName(chainId) {
    if (chainId === '1') {
      return 'mainnet'
    }
    if (chainId === '3') {
      return 'ropsten'
    }
    if (chainId === '42') {
      return 'kovan'
    }
    return 'localhost'
  }

  _hookCommonEvents() {
    const _changeAccount = accts => this.changeUserAccount(accts)
    if (_.isFunction(_.get(this.provider, 'on'))) {
      this.provider.on('accountsChanged', _changeAccount)
    } else if (_.isFunction(_.get(this.web3, 'currentProvider.on'))) {
      this.web3.currentProvider.on('accountsChanged', _changeAccount)
    }
  }
}

export default IWalletBase
