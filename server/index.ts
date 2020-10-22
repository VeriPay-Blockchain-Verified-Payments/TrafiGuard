import * as dotenv from 'dotenv'
dotenv.config()
import express, { ErrorRequestHandler } from 'express'
import { validateUntypedResponseData } from '@bloomprotocol/verify-kit'
import { Extractors } from '@bloomprotocol/attestations-lib'

const port = process.env.PORT
if (!port) {
  throw Error('Missing required PORT environment variable')
}


const Web3 = require('web3');
const HDWalletProvider = require("@truffle/hdwallet-provider");
let provider = new HDWalletProvider(
	[process.env.ROPSTEN_PRIVATEKEY],
	"http://localhost:8545",
	0, 1
);
const web3 = new Web3(provider)
console.log(web3)

const validateOnChain =
  typeof process.env.VALIDATE_ON_CHAIN === 'string' &&
  process.env.VALIDATE_ON_CHAIN.toLowerCase() === 'true'

const web3Provider = process.env.WEB3_PROVIDER
if (validateOnChain && !web3Provider) {
  throw Error('Missing required WEB3_PROVIDER environment variable')
}

const app = express()

app.use(express.json())

app.get('/', (req, res) => {
	return res.status(200)
})

const StoreBloomData = require('../build/contracts/StoreBloomData.json')
app.post(
  '/api/receive',
	async (req: express.Request, res: express.Response) => {
		console.log(req.body);
		try {
			const verifiedData = await validateUntypedResponseData(req.body, {
				validateOnChain,
				web3Provider
			})

			if (verifiedData.kind === 'invalid') {
				return res.status(400).json({ errors: verifiedData.errors })
			}


			// email
			const consumableEmailData = verifiedData.data.verifiableCredential.find(
				data => data.type === 'email'
			)
			const email = consumableEmailData && consumableEmailData.credentialSubject.data
			console.log(email)
			if (!email || email.trim() === '') {
				throw new Error('Missing email')
			}
			const emailStr = Extractors.extractBase(email, 'email', 'email')

			let accounts = await web3.eth.getAccounts()
			console.log(accounts)

			const _StoreBloomData = await web3.eth.contract(StoreBloomData, StoreBloomData.networks["3"].address)
			let txReceipt = await _StoreBloomData.setData('1234', emailStr, '5566778899', { from: accounts[3] })
			console.log(txReceipt);

			return res.status(200).json({
				success: true,
				token: req.body.token
			})
    } catch (err) {
      console.log('/api/receive catch', err)
      return res.status(500).json({
        error:
          err && err.message ? err.message : 'An unexpected error has occurred.'
      })
    }
  }
)

const catchallErrorHandler: ErrorRequestHandler = (err, _req, res, next) => {
  if (res.headersSent) {
    return next(err)
  }
  return res.status(500).json({
    error:
      err && err.message ? err.message : 'An unexpected error has occurred.'
  })
}
app.use(catchallErrorHandler)

process.on('unhandledRejection', error => {
  if (error) {
    console.log('unhandledRejection', error)
  }
})

app.listen(port, () => console.log(`Express server running on port ${port}`))
