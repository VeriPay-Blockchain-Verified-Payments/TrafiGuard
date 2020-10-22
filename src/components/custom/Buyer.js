import React, { useState } from 'react'
import { useHistory } from 'react-router-dom'
import styled from 'styled-components'
import {
  Row,
  Col,
  Card,
  Statistic,
  Button,
  Modal,
  InputNumber,
  Typography,
} from 'antd'
import { PlusOutlined, EyeOutlined } from '@ant-design/icons'

import { useRoot } from '../../contexts/RootContext'

const { Paragraph } = Typography

const CardButton = styled(Button)`
  border-radius: 20px;
  display: block;
  margin: 1rem 0;
  width: 150px;
`

const Buyer = () => {
  const flows = [
    { deposited: 10000, intereset: 2.5, fee: 12124, developedBy: 'TrafiGuard' },
  ]

  const history = useHistory()

  const { isLoggedIn, deposit, defaultAddress, lockCollateral } = useRoot()

  const [amountWei, setAmountWei] = useState(0)
  const [visible, setVisible] = useState(false)
  

  const showModal = () => {
    setVisible(true)
  }

  const gotoWallet = e => {
    setVisible(false)
    history.push('/connect-wallet')
  }

  const handleOk = () => {
    console.log(defaultAddress, String(amountWei), 'flow0')
    lockCollateral(defaultAddress, 'flow0')
  }

  const handleCancel = e => {
    setVisible(false)
  }

  return (
    <>
      <Paragraph
        style={{
          textAlign: 'center',
          fontWeight: 300,
          display: 'block',
          marginBottom: '3rem',
          margin: '0 auto',
          color: '#aaa',
          maxWidth: '600px',
        }}
      >
        Pay for products globally with decentralized escrow to cover your purchase.
      </Paragraph>
      <Row gutter={24} style={{ padding: '2rem' }}>
      <Col span={24} sm={12} md={8} style={{ marginBottom: '2rem' }}>
      </Col>
        {flows.map(flow => (
          <Col span={24} sm={12} md={8} style={{ marginBottom: '2rem' }}>
            <Card style={{ boxShadow: '1px 5px 15px 0px rgba(0,0,0,0.1)' }}>
              <div style={{ float: 'right', fontSize: '0.7rem' }}>
                Invest via <strong>Compound</strong>
              </div>
              <Statistic
                title="Total Deposited"
                value={flow.deposited}
                precision={2}
                suffix="USDC"
              />
              {/* <Statistic
                title="Annual Interest Rate"
                value={flow.intereset}
                precision={2}
                suffix="%"
              /> */}
              {/* <Statistic title="Fee" value={flow.fee} precision={2} /> */}
              <Statistic
                title="Developed By"
                value={flow.developedBy}
                valueStyle={{ fontSize: '1rem' }}
              />

              <CardButton type="primary" onClick={showModal}>
                <PlusOutlined />
                Purchase
              </CardButton>
              <CardButton type="default">
                <EyeOutlined />
                Details
              </CardButton>
            </Card>
          </Col>
          
        ))}

        <Modal
          title="Confirm your payment of the goods to be shipped"
          visible={visible}
          onOk={isLoggedIn() ? handleOk : gotoWallet}
          okText={isLoggedIn() ? 'Lock Collateral' : 'Connect Wallet'}
          onCancel={handleCancel}
        >
          {isLoggedIn() ? (
            <>
              Enter Amount:&nbsp;
              <InputNumber
                onChange={setAmountWei}
                />
            </>
          ) : (
            <>
              <div style={{ marginBottom: '1rem' }}>
                You should connect your wallet first!
              </div>
            </>
          )}
        </Modal>
      </Row>
    </>
  )
}

export default Buyer
