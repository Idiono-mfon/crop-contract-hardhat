const { expect } = require("chai");
const { ethers } = require("hardhat");


const params = {
  chainLinkTokenAddress: "0xa36085F69e2889c224210F603D836748e7dC0088", 
   chainLinkOracleAddress:"0x74EcC8Bdeb76F2C6760eD2dc8A46ca5e581fA656", 
   oracleServiceAddress:"0x814287690C64023d8880F5F2Fe3d8C5D3707C8C5",
   oracleOwnerServiceAddress:"0xE02c435cEA392DcFf17703Cc4EF3d7bB4672597C",
   chainLinkStatusesJobId: "7da2702f37fd48e5b1b9a5715e3509b6",
   chainLinkPaymentAmount: 2
}

console.log(params)

// describe("Greeter", function () {
//   it("Should return the new greeting once it's changed", async function () {
//     const Greeter = await ethers.getContractFactory("Greeter");
//     const greeter = await Greeter.deploy("Hello, world!");
//     await greeter.deployed();

//     expect(await greeter.greet()).to.equal("Hello, world!");

//     const setGreetingTx = await greeter.setGreeting("Hola, mundo!");

//     // wait until the transaction is mined
//     await setGreetingTx.wait();

//     expect(await greeter.greet()).to.equal("Hola, mundo!");
//   });
// });


describe("ArceOracle", function () {
  it("Should deployed the contract", async function () {
    const ArceOracle = await ethers.getContractFactory("AcreOracle");

    const arceOracle = await ArceOracle.deploy(
      params.chainLinkTokenAddress, 
      params.chainLinkOracleAddress,
      params.oracleServiceAddress,
      params.oracleOwnerServiceAddress,
      params.chainLinkStatusesJobId,
      params.chainLinkPaymentAmount
      );
    
      await arceOracle.deployed();

      console.log("Yes done");

    // expect(await arceOracle.greet()).to.equal("Hello, world!");

    // const setGreetingTx = await greeter.setGreeting("Hola, mundo!");

    // wait until the transaction is mined
    // await setGreetingTx.wait();

    // expect(await greeter.greet()).to.equal("Hola, mundo!");
  });
});

