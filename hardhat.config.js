require("@nomiclabs/hardhat-waffle");

// import { hdWalletConfig } from "./config.js"
const { hdWalletConfig } = require("./config")

const  {development, testing, production} = hdWalletConfig
// require('dotenv').config()
// This is a sample Hardhat task. To learn how to create your own go to
// https://hardhat.org/guides/create-task.html
task("accounts", "Prints the list of accounts", async (taskArgs, hre) => {
  const accounts = await hre.ethers.getSigners();

  for (const account of accounts) {
    console.log(account.address);
  }
});

// You need to export an object to set up your config
// Go to https://hardhat.org/config/ to learn more

/**
 * @type import('hardhat/config').HardhatUserConfig
 */
module.exports = {
  // solidity: "0.8.4",
  // solidity: "^0.7.0",
  solidity: {
      compilers: [
        {
          version: "0.6.0",
          settings: {
            optimizer: {
              enabled: true,
              runs: 200,
            },
            evmVersion: 'istanbul',
          },
        },
        {
          version: "0.8.0",
          settings: {
            optimizer: {
              enabled: true,
              runs: 200,
            },
            evmVersion: 'istanbul',
          },
        },
        // {
        //   version: "0.7.6",
        //   settings: {
        //     optimizer: {
        //       enabled: true,
        //       runs: 200,
        //     },
        //   },
        //   evmVersion: 'istanbul',
        // // },
        // {
        //   version: "0.8.0",
        //   settings: {
        //     optimizer: {
        //       enabled: true,
        //       runs: 200,
        //     },
        //   },
        //   evmVersion: 'istanbul',
        // },
        {
          version: "0.8.7",
        },
     ], 
    },  
  networks: {
    hardhat: {
      chainId: 31337,
      // gas: 160000000000,
      // gasPrice: 0x01,
      // url: development.providerOrUrl,
      // accounts: [development.mnemonic]
    },
    // rinkeby: {
    //   url: process.env.PROVIDER_URL,
    //   accounts: [process.env.PK],
    // },
    kovan: {
      url: testing.providerOrUrl,
      accounts: [testing.mnemonic],
      gas: 0xfffffffffff,
      gasPrice: 0x01,
      allowUnlimitedContractSize:true
    },
    // mainnet: {
    //   url: production.providerOrUrl,
    //   accounts: [production.mnemonic]
    // }
  }
};
