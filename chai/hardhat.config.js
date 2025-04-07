require("@nomicfoundation/hardhat-toolbox");
require("dotenv").config();

module.exports = {
  solidity: "0.8.18",
  networks: {
    fuji: {
      url: "https://api.avax-test.network/ext/bc/C/rpc",
      accounts: [process.env.PRIVATE_KEY],
      chainId: 43113
    }
  }
};
