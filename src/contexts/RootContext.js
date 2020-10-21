import React, { createContext, useContext, useState } from 'react'
import * as _ from 'lodash'
import Web3 from 'web3'

import depositManagerABI from '../utils/depositManagerABI.json'
import abi from '../utils/abi.json'
// import investmentManagerABI from '../utils/investmentManagerABI.json'

const web3 = new Web3()

if (window.ethereum) {
  web3.setProvider(window.ethereum)
}

const initialRoot = {
  type: localStorage.getItem('type'),
  defaultAddress: localStorage.getItem('defaultAddress'),
  contractManager: new web3.eth.Contract(
    abi,
    '0x535072c141bac4ad80323ebf9a25493119462b4a'
  )
  // depositManager: new web3.eth.Contract(
  //   depositManagerABI,
  //   '0xd52775456a2EE4F783d466C50214Ee15001f339D'
  // ),
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

  const deposit = (address, amount, name) =>
    initialRoot.depositManager.methods
	  .deposit(address, web3.utils.toWei(amount, 'ether'), name)
      .send({
        from: address,
        value: web3.utils.toWei(amount, 'ether'),
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
      }}
    >
      {children}
    </RootContext.Provider>
  )
}
