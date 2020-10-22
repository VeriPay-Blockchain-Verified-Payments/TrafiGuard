import React, { createContext, useContext, useState } from 'react'
import * as _ from 'lodash'
import Web3 from 'web3'

import Underwriting from '../../json_contracts/Underwriting.json'
import ShipmentCollateralHandling_allinone from '../../json_contracts/ShipmentCollateralHandling_allinone.json'
// import investmentManagerABI from '../../investmentManagerABI.json'

const web3 = new Web3()

if (window.ethereum) {
  web3.setProvider(window.ethereum)
}

const initialRoot = {
  type: localStorage.getItem('type'),
  defaultAddress: localStorage.getItem('defaultAddress'),
  contractManager: new web3.eth.Contract(
    ShipmentCollateralHandling_allinone,
    '0xF80f304b47A3386C970415bf0862dCc50C6F95AA'
  ),
  depositManager: new web3.eth.Contract(
    Underwriting,
    '0xd52775456a2EE4F783d466C50214Ee15001f339D'
  ),
  // investmentManager: new web3.eth.Contract(
  //   investmentManagerABI,
  //   '0x8FB240A424A05CB6c68CAf54eF1B504c0E900603'
  // ),

}
console.log(initialRoot)
export const RootContext = createContext(initialRoot)

export const useRoot = () => useContext(RootContext)

export default ({ children }) => {
  const [type, setType] = useState(initialRoot.type)
  const [defaultAddress, setDefaultAddress] = useState(
    initialRoot.defaultAddress
  )

  const isLoggedIn = () => {
    return !_.isEmpty(defaultAddress)
  }

  const logOut = () => {
    localStorage.removeItem('type')
    localStorage.removeItem('defaultAddress')
    setType('')
    setDefaultAddress('')
  }

  const logIn = (type, defaultAddress) => {
    localStorage.setItem('type', type)
    localStorage.setItem('defaultAddress', defaultAddress)
    setType(type)
    setDefaultAddress(defaultAddress)
  }

  const getBalance = () =>
    new Promise((resolve, reject) =>
      web3.eth.getBalance(defaultAddress).then(res => {
        resolve(res)
      })
    )

  // window.web3 = web3
  // window.root = initialRoot
  const lockCollateral = (address, amount) =>
      initialRoot.contractManager.methods
      .lockCollateral().send({from: address})

  const takeLoan = () =>
      initialRoot.contractManager.mehhods
      .takeLoan().send()

  const deposit = (address, amount, name) =>
    initialRoot.depositManager.methods
	  .deposit(address, web3....toWei(amount, 'ether'), name)
      .send({
        from: address,
        value: web3....toWei(amount, 'ether'),
      })

  return (
    <RootContext.Provider
      value={{
        type,
        setType,
        defaultAddress,
        setDefaultAddress,
        isLoggedIn,
        logOut,
        logIn,
        web3,
        momsContracts: initialRoot.momsContracts,
        getBalance,
        deposit,
        lockCollateral,
        takeLoan
      }}
    >
      {children}
    </RootContext.Provider>
  )
}
