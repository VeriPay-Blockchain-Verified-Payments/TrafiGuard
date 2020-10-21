import React from 'react'
import { useHistory } from 'react-router-dom'
import { Heading, Box } from 'rimble-ui'
import styled from 'styled-components'
import * as _ from 'lodash'

import Wallet from '../../wallets'

const WalletButtons = styled.div`
  box-sizing: border-box;
  display: grid;
  grid-template-columns: repeat(2, 49%);
  grid-gap: 1rem 2%;
`

const WalletButton = styled.button`
  padding: 1rem;
  border: 1px solid #eee;
  display: flex;
  align-items: center;
  justify-content: space-between;
  font-size: 1.3rem;
  width: 100%;
  height: 5rem;
  font-weight: 600;
  cursor: pointer;
  display: flex;

  img {
    width: 48px;
  }

  :hover {
    background: #fafafa;
  }
`

const WalletLogins = () => {
  const history = useHistory()
  const wallet = Wallet.instance()

  const _walletConnect = walletType => async () => {
    try {
      await wallet.init(walletType)
      await wallet.connect()
      history.push('/connect-wallet')
    } catch (err) {
      console.error(err)
    }
  }

  const walletButtons = _.map(Wallet.typeMap(), (walletData, walletType) => {
    const disabled = !Wallet.isEnabled(walletType)

    return (
      <WalletButton
        key={walletData.name}
        onClick={_walletConnect(walletType)}
        disabled={disabled}
      >
        <img src={walletData.icon} alt={walletData.name} />
        {walletData.name}
      </WalletButton>
    )
  })

  return (
    <Box mb={4}>
      <Heading as={'h3'} mb={3}>
        Log in
      </Heading>
      <WalletButtons>{walletButtons}</WalletButtons>
    </Box>
  )
}

export default WalletLogins
