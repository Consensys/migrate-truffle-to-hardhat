module.exports = {

  networks: {
    development: {
     host: "127.0.0.1",     
     port: 8545,            
     network_id: "*",       
    },
    quickstart: {
      host: "127.0.0.1",     
      port: 8545,            
      network_id: "1337",   
      gasPrice: 0
    },
    // goerli: {
    //   provider: () => new HDWalletProvider(MNEMONIC, `https://goerli.infura.io/v3/${PROJECT_ID}`),
    //   network_id: 5,       
    //   confirmations: 2,    
    //   timeoutBlocks: 200,  
    //   skipDryRun: true     
    // }
  },
  compilers: {
    solc: {
      version: "0.8.19",      // Fetch exact version from solc-bin (default: truffle's version)
      settings: {          // See the solidity docs for advice about optimization and evmVersion
       optimizer: {
         enabled: true,
         runs: 200
       },
      }
    }
  },

  mocha: {
    timeout: 40000
  }
};
