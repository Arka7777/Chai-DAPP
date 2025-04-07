const hre = require("hardhat");
const { formatEther } = require("ethers"); 
async function getBalances(address){
  const balance = await hre.ethers.provider.getBalance(address);
  return formatEther(balance);

}
async function consoleBalances(addresses) {
  let counter=0;
  for(const address of addresses){
    console.log(`Address ${counter} balance: ${await getBalances(address)}`);
    counter++;
  }

}
async function consoleMemos(memos){
  for(const memo of memos){
    console.log(`name: ${memo.name}, message : ${memo.message}, address: ${memo.from}, timestamp: ${memo.timestamp}`);
  }
}


async function main() {
 

  
  const [owner,from1,from2,from3] = await hre.ethers.getSigners();


  const chaiFactory=await hre.ethers.getContractFactory("chai");


  const chaiContract = await chaiFactory.deploy();
  // await chaiContract.deployed();
  console.log("Chai contract deployed to:", chaiContract.address);
  const addresses=[owner.address,from1.address,from2.address,from3.address];
  console.log("before sending memos");
  await consoleBalances(addresses);


  const amount={value:ethers.parseEther("1")};
  await chaiContract.connect(from1).buy("from1","nice chai 1",amount);
  await chaiContract.connect(from2).buy("from2","nice boss 2",amount);
  await chaiContract.connect(from3).buy("from3","nice info 3",amount);

  console.log("after buying")
  await consoleBalances(addresses);
  const memos=await chaiContract.getMemos();
  // console.log("memos:");
  consoleMemos(memos);


}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
