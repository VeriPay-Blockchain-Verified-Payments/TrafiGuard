import React, { useState } from 'react'
import { useHistory } from 'react-router-dom'
import styled from 'styled-components'
import { PlusOutlined, EyeOutlined } from '@ant-design/icons'
import CollectionsPage from './LoanForm'



import {
  Row,
  Col,
  Card,
  Statistic,
  Form,
  Button,
  Modal,
  InputNumber,
  Typography,
} from 'antd'
import { Link } from 'react-router-dom'
import BloomQR from './BloomRequest'

import { useRoot } from '../../contexts/RootContext'

const CardButton = styled(Button)`
  text-align: center;
  border-radius: 20px;
  display: block;
  margin: 1rem 0;
  width: 200px;
`
const CardButtonLrg = styled(Button)`
  border-radius: 20px;
  text-align: center;
  display: block;
  margin: 1rem 0;
  width: 240px;
`

const ActiveFlows = () => {
  const history = useHistory()

  const [visible, setVisible] = useState(false)
  const [amountWei, setAmountWei] = useState(0)

  const handleLoan = () => {
    console.log(defaultAddress, String(amountWei), 'flow0')
    takeOutLoan(defaultAddress,'flow0')
  }

  const handleRepayLoan = () => {
    console.log(defaultAddress, String(amountWei), 'flow0')
    repayLoan(defaultAddress,'flow0')
  }

  const handleRedeemCol = () => {
    console.log(defaultAddress, String(amountWei), 'flow0')
    redeemCollateral(defaultAddress,'flow0')
  }

  const handleGetRisk = () => {
    console.log(defaultAddress, String(amountWei), 'flow0')
    batch_getRiskScore(defaultAddress,'flow0')
  }
  
  

  const showModal = () => {
    setVisible(true)
  }

  const gotoWallet = e => {
    setVisible(false)
    history.push('/connect-wallet')
  }

  const handleCancel = e => {
    setVisible(false)
  }

  const { isLoggedIn, defaultAddress, takeOutLoan, repayLoan, redeemCollateral } = useRoot()
  


  return isLoggedIn() ? (
    <>
    <Row>
    <Col span={24} sm={12} md={8} style={{ marginBottom: '2rem' }}>
            <Card style={{ boxShadow: '1px 5px 15px 0px rgba(0,0,0,0.1)' }}>
      <CardButton type="primary" onClick={showModal}>
                  <PlusOutlined />
                  Register Bloom ID
      </CardButton>
      </Card>
      </Col>
      <Modal
            title="Scan the QR Code on your Bloom App to Verify your DID"
            visible={visible}
            onOk={handleCancel}
            onCancel={handleCancel}
      ><BloomQR> </BloomQR></Modal>
      <Col span={24} sm={12} md={8} style={{ marginBottom: '2rem' }}>
            <Card style={{ boxShadow: '1px 5px 15px 0px rgba(0,0,0,0.1)' }}>
      
      
      <CollectionsPage/>
      
      
      </Card>
      </Col>
      <Col span={24} sm={12} md={8} style={{ marginBottom: '2rem' }}>
            <Card style={{ boxShadow: '1px 5px 15px 0px rgba(0,0,0,0.1)' }}>
      <CardButtonLrg type="primary" onClick={handleGetRisk}>
      <PlusOutlined />
                  Get Risk Reduction Score
      </CardButtonLrg>
      </Card>
      </Col>
      <Col span={24} sm={12} md={8} style={{ marginBottom: '2rem' }}>
            <Card style={{ boxShadow: '1px 5px 15px 0px rgba(0,0,0,0.1)' }}>
      <CardButton type="primary" onClick={handleLoan}>
      <PlusOutlined />
                  Take Loan
      </CardButton>
      </Card>
      </Col>
      <Col span={24} sm={12} md={8} style={{ marginBottom: '2rem' }}>
            <Card style={{ boxShadow: '1px 5px 15px 0px rgba(0,0,0,0.1)' }}>
      <CardButton type="primary" onClick={handleRepayLoan}>
      <PlusOutlined />
                  Repay Loan
      </CardButton>
      </Card>
      </Col>
      <Col span={24} sm={12} md={8} style={{ marginBottom: '2rem' }}>
            <Card style={{ boxShadow: '1px 5px 15px 0px rgba(0,0,0,0.1)' }}>
      <CardButton type="primary" onClick={handleRedeemCol}>
      <PlusOutlined />
                  Redeem Colateral
      </CardButton>
      </Card>
      </Col>
      </Row>
    </>

  ) : (
    <div
      style={{
        padding: '2rem',
        display: 'flex',
        justifyContent: 'space-around',
      }}
    >
      <Link to="/connect-wallet">
        <Button type="primary">Connect Wallet</Button>
      </Link>
    </div>
  )
}

export default ActiveFlows
