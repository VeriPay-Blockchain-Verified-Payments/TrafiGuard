require('dotenv').config({
    path: './.env.local'
})

const HDWalletProvider = require('truffle-hdwallet-provider');
const infuraKey = process.env.INFURA_PROJECT_ID;
const Ganache_privateKey = process.env.GANACHE_PRIVATE_KEY;
const Ropsten_privateKey = process.env.ROPSTEN_PRIVATE_KEY;

module.exports = {
  contracts_directory: './contracts/Tradeora Contracts',

	networks: {
		ganache: {
			provider: () => new HDWalletProvider([Ganache_privateKey], `http://0.0.0.0:7545`),
			network_id: 5777,
			gas: 5500000,
			confirmations: 0,
			timeoutBlocks: 50,
			skipDryRun: true
		},

		// Another network with more advanced options...
		// advanced: {
		// port: 8777,             // Custom port
		// network_id: 1342,       // Custom network
		// gas: 8500000,           // Gas sent with each transaction (default: ~6700000)
		// gasPrice: 20000000000,  // 20 gwei (in wei) (default: 100 gwei)
		// from: <address>,        // Account to send txs from (default: accounts[0])
		// websockets: true        // Enable EventEmitter interface for web3 (default: false)
		// },

		// Useful for deploying to a public network.
		// NB: It's important to wrap the provider as a function.
		ropsten: {
			provider: () => new HDWalletProvider([Ropsten_privateKey], `https://ropsten.infura.io/v3/${infuraKey}`),
			network_id: 3,       // Ropsten's id
			gas: 5500000,        // Ropsten has a lower block limit than mainnet
			confirmations: 0,    // # of confs to wait between deployments. (default: 0)
			timeoutBlocks: 200,  // # of blocks before a deployment times out  (minimum/default: 50)
			skipDryRun: true     // Skip dry run before migrations? (default: false for public nets )
		},

		// Useful for private networks
		// private: {
		// provider: () => new HDWalletProvider(mnemonic, `https://network.io`),
		// network_id: 2111,   // This network is yours, in the cloud.
		// production: true    // Treats this network as if it was a public net. (default: false)
		// }
	},

	// Set default mocha options here, use special reporters etc.
	mocha: {
		// timeout: 100000
	},

	// Configure your compilers
	compilers: {
		solc: {
		version: "0.6.12",    // Fetch exact version from solc-bin (default: truffle's version)
		docker: false,        // Use "0.5.1" you've installed locally with docker (default: false)
		settings: {          // See the solidity docs for advice about optimization and evmVersion
		optimizer: {
			enabled: false,
			runs: 200
		},
		evmVersion: "constantinople"
			}
		}
	}
}
