// Frameworks
import * as _ from 'lodash'

// Internals
import { GLOBALS } from '../utils/globals'

// Wallets
import CoinbaseWallet from './coinbase'
import FortmaticWallet from './fortmatic'
// import TorusWallet from './torus'
import PortisWallet from './portis'
// import UportWallet from './uport'
// import AuthereumWallet from './authereum'
// import BitskiWallet from './bitski'
// import SquareLinkWallet from './squarelink'
// import ArkaneWallet from './arkane'
import WalletConnectWallet from './walletconnect'
import MetamaskWallet from './metamask'
// import NativeWallet from './native'

class Wallet {
  constructor() {
    this.type = null
    this.site = null
    this.context = null
  }

  static instance() {
    if (!Wallet.__instance) {
      Wallet.__instance = new Wallet()
    }
    return Wallet.__instance
  }

  async prepare({ site, context }) {
    this.site = site
    this.context = context
  }

  static isEnabled(type) {
    return Wallet.typeMap()[type].wallet.isEnabled()
  }

  async init(type = GLOBALS.WALLET_TYPE_COINBASE) {
    if (_.isEmpty(this.site)) {
      throw new Error(
        'Error: Wallet has not been prepared before initializing!'
      )
    }
    if (type === this.type) {
      return
    }
    this.type = type

    const walletData = Wallet.typeMap()[type]
    const walletClass = walletData.wallet
    this.wallet = new walletClass(this.site, this.context)
    await this.wallet.init({ options: walletData.options, ...Wallet._getEnv() })
  }

  async connect() {
    if (!this.wallet) {
      return
    }
    await this.wallet.connect()
  }

  async disconnect() {
    localStorage.removeItem('type')
    localStorage.removeItem('defaultAddress')
    window.location.reload()
    if (!this.wallet) {
      return
    }
    await this.wallet.disconnect()
  }

  static getName(type) {
    return Wallet.typeMap()[type].name || 'Unknown'
  }

  static typeMap() {
    return {
      [GLOBALS.WALLET_TYPE_COINBASE]: {
        wallet: CoinbaseWallet,
        name: 'Coinbase WalletLink',
        icon: '/images/coinbasewallet.png',
        options: {},
      },
      [GLOBALS.WALLET_TYPE_WALLETCONNECT]: {
        wallet: WalletConnectWallet,
        name: 'Wallet Connect',
        icon: '/images/walletconnect.png',
        options: {},
      },
      [GLOBALS.WALLET_TYPE_FORTMATIC]: {
        wallet: FortmaticWallet,
        name: 'Fortmatic',
        icon: '/images/fortmatic.png',
        options: {},
      },
      // [GLOBALS.WALLET_TYPE_TORUS]: {
      //   wallet: TorusWallet,
      //   name: 'Torus',
      //   options: {},
      // },
      [GLOBALS.WALLET_TYPE_PORTIS]: {
        wallet: PortisWallet,
        name: 'Portis',
        icon: '/images/portis.png',
        options: {},
      },
      // [GLOBALS.WALLET_TYPE_UPORT]: {
      //   wallet: UportWallet,
      //   name: 'Uport',
      //   options: {},
      // },
      // [GLOBALS.WALLET_TYPE_AUTHEREUM]: {
      //   wallet: AuthereumWallet,
      //   name: 'Authereum',
      //   icon: '/images/authereum.png',
      //   options: {},
      // },
      // [GLOBALS.WALLET_TYPE_BITSKI]: {
      //   wallet: BitskiWallet,
      //   name: 'Bitski',
      //   icon: '/images/bitski.png',
      //   options: { appCallbackUrl: 'https://myapp.com/callback.html' },
      // },
      // [GLOBALS.WALLET_TYPE_SQUARELINK]: {
      //   wallet: SquareLinkWallet,
      //   name: 'SquareLink',
      //   options: {},
      // },
      // [GLOBALS.WALLET_TYPE_ARKANE]: {
      //   wallet: ArkaneWallet,
      //   name: 'Arkane',
      //   options: {},
      // },
      [GLOBALS.WALLET_TYPE_METAMASK]: {
        wallet: MetamaskWallet,
        name: 'MetaMask',
        icon: '/images/metamask.png',
        options: {},
      },
      // [GLOBALS.WALLET_TYPE_NATIVE]: {
      //   wallet: NativeWallet,
      //   name: 'Native',
      //   options: {},
      // },
    }
  }

  static _getEnv() {
    const rpcUrl = process.env.REACT_APP_ETH_JSONRPC_URL
    const chainId = process.env.REACT_APP_ETH_CHAIN_ID
    if (_.isEmpty(rpcUrl)) {
      console.error(
        'Invalid RPC-URL.  Make sure you have set the correct ENV VARs to connect to Web3; ("REACT_APP_ETH_JSONRPC_URL").'
      )
    }
    if (_.isEmpty(chainId)) {
      console.error(
        'Invalid Chain-ID.  Make sure you have set the correct ENV VARs to connect to Web3; ("REACT_APP_ETH_CHAIN_ID").'
      )
    }
    return { rpcUrl, chainId }
  }
}
Wallet.__instance = null

export default Wallet
