const HDWalletProvider = require("truffle-hdwallet-provider-klaytn");

const privateKey = "0x45af35af67201b7515e8fed4a0228baede8e1be1304afdecdea751c6ee221868";

module.exports = {
  networks: {
    development: {
      host: "localhost",
      port: 8545,
      network_id: "*" // Match any network id
    },
    testnet: {
      provider: () => new HDWalletProvider(privateKey, "https://api.baobab.klaytn.net:8651"),
      network_id: '1001', //Klaytn baobab testnet's network id
      gas: '8500000',
      gasPrice: null
    },
    mainnet: {
      provider: () => new HDWalletProvider(privateKey, "https://api.cypress.klaytn.net:8651"),
      network_id: '8217', //Klaytn mainnet's network id
      gas: '8500000',
      gasPrice: null
    }
  },
  compilers:{
    solc :{
      version: "0.6.12",
      settings: {
        optimizer: {
          enabled: true,
          runs: 600
        }
      }
    }
  }
};
