require("@nomiclabs/hardhat-waffle");

const fs = require("fs");
const privateKey = fs.readFileSync(".secret").toString().trim();

module.exports = {
  solidity: "0.8.4",
  paths: {
    artifacts: "./src/backend/artifacts",
    sources: "./src/backend/contracts",
    cache: "./src/backend/cache",
    tests: "./src/backend/test",
  },

  networks: {
    ganache: {
      url: "http://127.0.0.1:7545",
    },

    fuji: {
      url: "https://api.avax-test.network/ext/bc/C/rpc",
      accounts: [ '0x'+privateKey],
      chainId: 43113,
    },

    hardhat: {},
  },
};
