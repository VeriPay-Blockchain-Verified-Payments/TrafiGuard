import React from 'react'
import { Empty, Button } from 'antd'
import { Link } from 'react-router-dom'

import { useRoot } from '../../contexts/RootContext'

const ActiveFlows = () => {
  const { isLoggedIn } = useRoot()

  return isLoggedIn() ? (
    <Empty
      style={{ padding: '2rem' }}
      description={<span>No active crypto flows</span>}
    />
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
