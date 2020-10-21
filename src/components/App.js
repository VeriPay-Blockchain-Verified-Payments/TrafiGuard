import React, { Suspense, lazy } from 'react'
import { BrowserRouter, Switch, Route } from 'react-router-dom'

import Layout from './Layout'
import Home from './pages/Home'
import NotFound from './pages/NotFound'
import Wallet from '../wallets'

import { useRoot } from '../contexts/RootContext'

const ConnectWallet = lazy(() => import('./custom/ConnectWallet'))

const App = () => {
  const context = useRoot()
  const wallet = Wallet.instance()

  wallet
    .prepare({
      context,
      site: { title: 'VeriPay', logoUrl: 'to be added' },
    })
    .catch(err => {
      console.log(err)
    })

  return (
    <BrowserRouter>
      <Layout>
        <Switch>
          <Route exact path="/" component={Home} />
          <Suspense fallback={<div>Loading...</div>}>
            <Route path="/connect-wallet" component={ConnectWallet} />
          </Suspense>
          <Route path="*" component={NotFound} />
        </Switch>
      </Layout>
    </BrowserRouter>
  )
}

export default App
