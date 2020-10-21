// Frameworks
import IWalletBase from './base'
import { GLOBALS } from '../utils/globals'

class MetamaskWallet extends IWalletBase {
  constructor(site, context) {
    super(GLOBALS.WALLET_TYPE_METAMASK, site, context)
  }

  static isEnabled() {
    const isModern = !!window.ethereum
    const isLegacy = typeof window.web3 !== 'undefined'
    return (isModern || isLegacy) && window.web3.currentProvider.isMetaMask
  }

  async init({ rpcUrl, chainId }) {
    // Detect Injected Web3
    if (!MetamaskWallet.isEnabled()) {
      throw new Error('Error: MetaMask is not installed on this browser!')
    }

    // Initialize a Web3 Provider object
    this.provider = window.ethereum || window.web3.currentProvider

    // Initialize a Web3 object
    this.web3 = this.context.web3
    this.web3.setProvider(this.provider)

    // Initialize Base
    await super.init()
  }
}

export default MetamaskWallet
