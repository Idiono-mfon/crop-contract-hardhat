// We require the Hardhat Runtime Environment explicitly here. This is optional
// but useful for running the script in a standalone fashion through `node <script>`.
//
// When running the script with `npx hardhat run <script>` you'll find the Hardhat
// Runtime Environment's members available in the global scope.
const hre = require("hardhat");

const ethers = require('ethers')

const fs = require("fs");

const gif = require('@etherisc/gif-connect');

const { info } = require('../utils/logger');

// Check here again
const uuid2hex = (uuid) => `0x${uuid.replaceAll('-', '')}`.padEnd(66, '0')

const { defaultEnv, oracleConfig }  = require("../config.js")


const {
    gifRegistry,
    httpProvider,
    chainLinkTokenAddress,
    chainLinkPaymentAmount,
    chainLinkStatusesJobId,
    chainLinkOracleAddress,
  } = oracleConfig[defaultEnv]


async function main() {
  // Hardhat always runs the compile task when running scripts with its command
  // line interface.
  //
  // If this script is run directly using `node` you may want to call compile
  // manually to make sure everything is compiled
  // await hre.run('compile');

  // We get the contract to deploy
//   const Greeter = await hre.ethers.getContractFactory("Greeter");
//   const greeter = await Greeter.deploy("Hello, Hardhat!");

   const Acre = await hre.ethers.getContractFactory("Acre");

   const AcreOracle = await hre.ethers.getContractFactory("AcreOracle");

//    const Greeter = await hre.ethers.getContractFactory("Acre");
   const instance = new gif.Instance(httpProvider, gifRegistry);
   
   info('Retrieve Product service address');

   const productServiceAddr = await instance.getProductServiceAddress();

   console.log(productServiceAddr)

  //  const byteCode = await instance.getAbi(gifRegistry);

   info('Retrieve Oracle service address');
   
   const oracleServiceAddress = await instance.getOracleServiceAddress()

   console.log(oracleServiceAddress)

   info('Retrieve Oracle Owner service address');
   
   const oracleOwnerServiceAddress = await instance.getOracleOwnerServiceAddress()

   console.log(oracleOwnerServiceAddress)

  //  console.log(uuid2hex(chainLinkStatusesJobId))

  //  return;

    // info('Deploying AcreChainlink Product contract');
    
  //  const acre =  await Acre.deploy(productServiceAddr, ethers.utils.formatBytes32String("testOracle"),0);

  //  console.log(`Transaction hash ${acre.deployTransaction.hash}`)
    
  //  await acre.deployed();

  //  info('Deployed AcreChainlink Product contract successfully');

  //  console.log(`AcrechainLink is deployed here: ${acre.address}`)
  //  console.log(`AcrechainLink is signer address is here: ${acre.signer.address}`)
   
   info('Deploying AcreOracle OracleType contract');

   const acreOracle = await AcreOracle.deploy(
       chainLinkTokenAddress, 
       chainLinkOracleAddress, 
       oracleServiceAddress,
       oracleOwnerServiceAddress,
       uuid2hex(chainLinkStatusesJobId),
       chainLinkPaymentAmount
    );

    console.log(`AcrechainOracle is deployed here: ${acreOracle.address}`)
    console.log(`Transaction hash ${acreOracle.deployTransaction.hash}`)

    // await acreOracle.deployed();

    info('Deployed AcreOracle OracleType contract');

    console.log(`AcrechainOracle is deployed here: ${acreOracle.address}`)
    console.log(`AcrechainOracle is signer address is here: ${acreOracle.signer.address}`)

  //  fs.writeFileSync(
  //       "./deployedAddresses.js", 
  //       `
  //           export const acreContractAddress = "${acre.address}"
  //           export const deployerAddress = "${acre.signer.address}"
  //           export const acreOracleContracteAddress = "${acreOracle.address}"
  //       `
  //       );

   info('Contracts deployment completed................................................................');
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
