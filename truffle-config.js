require('dotenv').config();

const HDWalletProvider = require('@truffle/hdwallet-provider');  // @notice - Should use new module.
const mnemonic = process.env.MNEMONIC;


module.exports = {
  networks: {
    ropsten: {
      provider: () => new HDWalletProvider(mnemonic, 'https://ropsten.infura.io/v3/' + process.env.INFURA_KEY),
      network_id: '3',
      gas: 4465030,
      gasPrice: 5000000000, // 5 gwei
      skipDryRun: true,     // Skip dry run before migrations? (default: false for public nets)
    },
    kovan: {
      provider: () => new HDWalletProvider(mnemonic, 'https://kovan.infura.io/v3/' + process.env.INFURA_KEY),
      network_id: '42',
      gas: 6465030,
      gasPrice: 5000000000, // 5 gwei
      skipDryRun: true,     // Skip dry run before migrations? (default: false for public nets)
    },
    rinkeby: {
      provider: () => new HDWalletProvider(mnemonic, "https://rinkeby.infura.io/v3/" + process.env.INFURA_KEY),
      network_id: 4,
      gas: 6000000,         // 2 times than before
      gasPrice: 5000000000, // 5 gwei,
      skipDryRun: true,     // Skip dry run before migrations? (default: false for public nets)
      //from: process.env.DEPLOYER_ADDRESS
    },
    // main ethereum network(mainnet)
    live: {
      // provider: () => new HDWalletProvider(mnemonic, "https://mainnet.infura.io/v3/" + process.env.INFURA_KEY),
      provider: () => new LedgerWalletProvider({...ledgerOptions, networkId: 1}, 'https://mainnet.infura.io/v3/' + process.env.INFURA_KEY),
      network_id: 1,
      gas: 5500000,
      gasPrice: 2000000000 // 2 gwei
    },
    local: {
      host: "localhost",
      port: 8545,
      network_id: "*",
      gas: 6721975, // default ganache-cli value
    },
  },

  compilers: {
    solc: {
      //version: "0.5.17",
      settings: {
        optimizer: {
          enabled: true,
          runs: 200
        }
      }
    }
  }
}
