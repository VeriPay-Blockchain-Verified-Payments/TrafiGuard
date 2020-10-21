import React from 'react'
import ReactDOM from 'react-dom'
import './index.css'
import App from './components/App'
import RootProvider from './contexts/RootContext'

ReactDOM.render(
  <React.StrictMode>
    <RootProvider>
      <App />
    </RootProvider>
  </React.StrictMode>,
  document.getElementById('root')
)
