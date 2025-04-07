const hre = require("hardhat");

async function main() {
  const chaiFactory = await hre.ethers.getContractFactory("chai");
  
  console.log("Deploying contract...");
  const chaiContract = await chaiFactory.deploy();
  
  // Wait for the deployment transaction to be mined
  await chaiContract.waitForDeployment();
  
  // Get the deployed contract address
  const contractAddress = await chaiContract.getAddress();
  
  console.log("Chai contract deployed to:", contractAddress);
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });