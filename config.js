require('dotenv').config()

const hdWalletConfig = {
  development: {
    mnemonic: process.env.DEV_MNEMONIC,
    providerOrUrl: process.env.DEV_HTTP_PROVIDER,
  },
  xdai: {
    mnemonic: process.env.XDAI_MNEMONIC,
    providerOrUrl: process.env.XDAI_HTTP_PROVIDER,
  },
  sokol: {
    mnemonic: process.env.SOKOL_MNEMONIC,
    providerOrUrl: process.env.SOKOL_HTTP_PROVIDER,
    pollingInterval: 200000,
  },

  testing:{
    mnemonic: process.env.KOVAN_MNEMONIC,
    providerOrUrl: process.env.KOVAN_HTTP_PROVIDER,
  },
  production:{
    mnemonic: process.env.POLYGON_MNEMONIC,
    providerOrUrl: process.env.POLYGON_HTTP_PROVIDER,
  }
}

const oracleConfig = {
  development: {
    gifRegistry: process.env.DEV_GIF_REGISTRY,
    httpProvider: process.env.DEV_HTTP_PROVIDER,
    chainLinkTokenAddress: process.env.DEV_CHAINLINK_TOKEN,
    chainLinkPaymentAmount: process.env.DEV_CHAINLINK_PAYMENT,
    // chainLinkRatingsJobId: process.env.DEV_CHAINLINK_RATINGS_JOBID,
    chainLinkStatusesJobId: process.env.DEV_CHAINLINK_STATUSES_JOBID,
    chainLinkOracleAddress: process.env.DEV_CHAINLINK_ORACLE_ADDRESS,
  },
//   xdai: {
//     gifRegistry: process.env.XDAI_GIF_REGISTRY,
//     httpProvider: process.env.XDAI_HTTP_PROVIDER,
//     chainLinkTokenAddress: process.env.XDAI_CHAINLINK_TOKEN,
//     chainLinkPaymentAmount: process.env.XDAI_CHAINLINK_PAYMENT,
//     chainLinkRatingsJobId: process.env.XDAI_CHAINLINK_RATINGS_JOBID,
//     chainLinkStatusesJobId: process.env.XDAI_CHAINLINK_STATUSES_JOBID,
//     chainLinkOracleAddress: process.env.XDAI_CHAINLINK_ORACLE_ADDRESS,
//   },

// sokol: {
//     gifRegistry: process.env.SOKOL_GIF_REGISTRY,
//     httpProvider: process.env.SOKOL_HTTP_PROVIDER,
//     chainLinkTokenAddress: process.env.SOKOL_CHAINLINK_TOKEN,
//     chainLinkPaymentAmount: process.env.SOKOL_CHAINLINK_PAYMENT,
//     chainLinkRatingsJobId: process.env.SOKOL_CHAINLINK_RATINGS_JOBID,
//     chainLinkStatusesJobId: process.env.SOKOL_CHAINLINK_STATUSES_JOBID,
//     chainLinkOracleAddress: process.env.SOKOL_CHAINLINK_ORACLE_ADDRES,
//   },

  test: {
    gifRegistry: process.env.TEST_GIF_REGISTRY,
    httpProvider: process.env.TEST_HTTP_PROVIDER,
    chainLinkTokenAddress: process.env.TEST_CHAINLINK_TOKEN,
    chainLinkPaymentAmount: process.env.TEST_CHAINLINK_PAYMENT,
    // chainLinkRatingsJobId: process.env.TEST_CHAINLINK_RATINGS_JOBID,
    chainLinkStatusesJobId: process.env.TEST_CHAINLINK_STATUSES_JOBID,
    chainLinkOracleAddress: process.env.TEST_CHAINLINK_ORACLE_ADDRESS,
  },
  production: {
    gifRegistry: process.env.PROD_GIF_REGISTRY,
    httpProvider: process.env.PROD_HTTP_PROVIDER,
    chainLinkTokenAddress: process.env.PROD_CHAINLINK_TOKEN,
    chainLinkPaymentAmount: process.env.PROD_CHAINLINK_PAYMENT,
    chainLinkRatingsJobId: process.env.PROD_CHAINLINK_RATINGS_JOBID,
    // chainLinkStatusesJobId: process.env.PROD_CHAINLINK_STATUSES_JOBID,
    chainLinkOracleAddress: process.env.PROD_CHAINLINK_ORACLE_ADDRESS,
  },
}

 const defaultEnv = "test";

// export const 

module.exports = { hdWalletConfig, oracleConfig, defaultEnv }