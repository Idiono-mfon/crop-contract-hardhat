const { info } = require('../io/logger');
const gif = require('@etherisc/gif-connect');
// eslint-disable-next-line no-undef
const Acre = artifacts.require('AcreChainlink');

module.exports = async (deployer) => {

  const instance = new gif.Instance(process.env.HTTP_PROVIDER, process.env.GIF_REGISTRY);
  const productServiceAddr = await instance.getProductServiceAddress();

  info('Deploying Acre');
  await deployer.deploy(Acre, productServiceAddr, { gas: 3500000 });
  const acreDeployed = Acre.deployed();
  info(`Deployed at ${acreDeployed}`);
};
