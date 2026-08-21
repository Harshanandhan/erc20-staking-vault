const hre = require("hardhat");

async function main() {
  const Token = await hre.ethers.getContractFactory("StakeToken");
  const token = await Token.deploy();
  await token.waitForDeployment();

  const Vault = await hre.ethers.getContractFactory("StakingVault");
  const vault = await Vault.deploy(await token.getAddress(), hre.ethers.parseEther("1"));
  await vault.waitForDeployment();

  console.log("StakeToken", await token.getAddress());
  console.log("StakingVault", await vault.getAddress());
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
