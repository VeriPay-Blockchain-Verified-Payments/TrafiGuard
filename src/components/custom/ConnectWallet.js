import React from 'react'

import WalletInfo from './WalletInfo'
import WalletLogins from './WalletLogins'

import { useRoot } from '../../contexts/RootContext'

const ConnectWallet = () => {
  const { isLoggedIn } = useRoot()

  return isLoggedIn() ? <WalletInfo /> : <WalletLogins />
}

export default ConnectWallet
