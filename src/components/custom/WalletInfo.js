import React, { useState } from 'react'
import { Descriptions } from 'antd'
import { useHistory } from 'react-router-dom'
import { Table, Box, Button, Blockie, EthAddress, Text } from 'rimble-ui'

import Wallet from '../../wallets'

import { useRoot } from '../../contexts/RootContext'

const WalletInfo = () => {
  const [balance, setBalance] = useState(0)
  const history = useHistory()
  const { type, defaultAddress, getBalance } = useRoot()

  const _logout = async () => {
    await Wallet.instance().disconnect()
    history.push('/')
  }

  getBalance().then(b => setBalance(b))

  return (
    <>
      <Descriptions title="User Info" layout="vertical" bordered>
        <Descriptions.Item label="Blockie">
          <Blockie
            opts={{
              seed: defaultAddress,
              color: `#${defaultAddress.slice(2, 8)}`,
              bgcolor: `#${defaultAddress.slice(-6)}`,
              size: 30,
              scale: 3,
              spotcolor: '#000',
            }}
          />
        </Descriptions.Item>
        <Descriptions.Item label="Provider">
          {Wallet.getName(type)}
        </Descriptions.Item>
        <Descriptions.Item label="Balance">
          <strong>{balance}</strong> <small>WEI</small>
        </Descriptions.Item>
        <Descriptions.Item label="Address" span={3}>
          <EthAddress address={defaultAddress} />
        </Descriptions.Item>
      </Descriptions>
      <Box mt={40}>
        <Text.p>
          <Button onClick={_logout}>log out</Button>
        </Text.p>
      </Box>
      <Box mt={40}>
        <Table>
          <thead>
            <tr>
              <th>Transaction hash</th>
              <th>Value</th>
              <th>Recipient</th>
              <th>Time</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>0xeb...cc0</td>
              <td>0.10 ETH</td>
              <td>0x4fe...581</td>
              <td>March 28 2019 08:47:17 AM +UTC</td>
            </tr>
            <tr>
              <td>0xsb...230</td>
              <td>0.11 ETH</td>
              <td>0x4gj...1e1</td>
              <td>March 28 2019 08:52:17 AM +UTC</td>
            </tr>
            <tr>
              <td>0xed...c40</td>
              <td>0.12 ETH</td>
              <td>0x3fd...781</td>
              <td>March 28 2019 08:55:17 AM +UTC</td>
            </tr>
          </tbody>
        </Table>
      </Box>
    </>
  )
}

export default WalletInfo
