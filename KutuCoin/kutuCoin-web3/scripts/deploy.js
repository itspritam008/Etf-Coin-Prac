const hre = require("hardhat");

async function main() {
    try {
        // Get the ContractFactory for KutuCoin
        const KutuCoin = await hre.ethers.getContractFactory("KutuCoin");

        // Deploy the contract
        console.log("Deploying KutuCoin...");
        const kutuCoin = await KutuCoin.deploy();

        // Wait for the contract to be deployed
        await kutuCoin.waitForDeployment();

        // Get the contract address
        const kutuCoinAddress = await kutuCoin.getAddress();
        console.log("KutuCoin deployed to:", kutuCoinAddress);


        // Additional post-deployment steps
        const deployer = (await hre.ethers.getSigners())[0];
        const totalSupply = await kutuCoin.totalSupply();
        const deployerBalance = await kutuCoin.balanceOf(deployer.address);

        console.log("Total Supply:", hre.ethers.formatEther(totalSupply), "KUTU");
        console.log("Deployer Balance:", hre.ethers.formatEther(deployerBalance), "KUTU");

        // Log the addresses holding the milestone rewards and partnership reserve
        const contractBalance = await kutuCoin.balanceOf(kutuCoinAddress);
        const ownerBalance = await kutuCoin.balanceOf(await kutuCoin.owner());

        console.log("Milestone Rewards (held by contract):", hre.ethers.formatEther(contractBalance), "KUTU");
        console.log("Partnership Reserve (held by owner):", hre.ethers.formatEther(ownerBalance), "KUTU");

    } catch (error) {
        console.error("Deployment failed:", error);
        process.exit(1);
    }
}

// Execute the deployment
main().catch((error) => {
    console.error(error);
    process.exit(1);
});