import React, { createContext, useContext, useState } from 'react'
import * as _ from 'lodash'
import Web3 from 'web3'


import Underwriting from '../utils/json_contracts/Underwriting.json'
import ShipmentCollateralHandling_allinone from '../utils/json_contracts/ShipmentCollateralHandling.json'
// import investmentManagerABI from '../../investmentManagerABI.json'

const web3 = new Web3()

if (window.ethereum) {
  web3.setProvider(window.ethereum)
}

const initialRoot = {
  type: localStorage.getItem('type'),
  defaultAddress: localStorage.getItem('defaultAddress'),
	collateralHandling: new web3.eth.Contract(
    ShipmentCollateralHandling_allinone,
    '0x0237768c0648DC9bC6bB1D9D30A3b1113DacfD7c'
  ),
  underwriting: new web3.eth.Contract(
    Underwriting,
    '0x83cC97b5472E565fe26408BDF2F6F6C346C10397'
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
  const lockCollateral = (address) =>
      initialRoot.collateralHandling.methods
      .lockCollateral().send({from: address})

  const takeOutLoan = (address) =>
      initialRoot.collateralHandling.methods
      .takeOutLoan().send({ from: address })
  
  const redeemCollateral = (address) =>
      initialRoot.collateralHandling.methods
      .redeemCollateral().send({ from: address })

  const repayLoan = (address) =>
      initialRoot.collateralHandling.methods
      .repayLoan().send({ from: address })

  const batchcall_APIs = (address, values) =>
      initialRoot.underwriting.methods
      .batchcall_APIs(values.PhoneNumber,values.EmailAddress,values.LoanAmount,values.PortArrival,values.PortDeparture,values.LoanDuration,values.ShipMMSI).send({from: address })

  const batch_getRiskScore = (address) =>
      initialRoot.underwriting.methods
      .batch_getRiskScore().send({from: address})
      
        
  
  // const deposit = (address, amount, name) =>
  //   initialRoot.underwriting.methods
	//   .deposit(address,  toWei(amount, 'ether'), name)
  //     .send({
  //       from: address,
	// 			value: collateralHandling..toWei(amount, 'ether'),
  //     })

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
        // deposit,
        lockCollateral,
        takeOutLoan,
        repayLoan,
        redeemCollateral,
        batchcall_APIs,
        batch_getRiskScore
      }}
    >
      {children}
    </RootContext.Provider>
  )
}
