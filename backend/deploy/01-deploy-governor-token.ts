import { DeployFunction } from 'hardhat-deploy/types';
import { HardhatRuntimeEnvironment } from 'hardhat/types';
import { developmentChains, networkConfig } from '../helper-hardhat-config';
import verify from "../helper-functions"
import { ethers } from 'hardhat';


const deployGovernanceToken: DeployFunction = async function (hre: HardhatRuntimeEnvironment) {
    const { getNamedAccounts, deployments, network } = hre;
    const { deploy, log } = deployments;
    const { deployer } = await getNamedAccounts();
    log("Deploying GovernorToken...");
    const governanceToken = await deploy("GovernanceToken", {
        from: deployer,
        args: [],
        log: true,
        waitConfirmations: networkConfig[network.name].blockConfirmations || 1,
    });
    log("GovernorToken deployed to: " + governanceToken.address);
    if (!developmentChains.includes(network.name)) {
        await verify(governanceToken.address, [], "contracts/GovernanceToken.sol:GovernanceToken");
    };

    log(`Delegating to ${deployer}...`);
    await delegate(governanceToken.address, deployer);
    log(`Delegated}!`);
};

const delegate = async (governanceTokenAddress: string, delegatedAccount: string) => {
    const governanceToken = await ethers.getContractAt("GovernanceToken", governanceTokenAddress);
    const totalSupply = await governanceToken.totalSupply();
    console.log("Max supply: ", totalSupply.toNumber());
    const transactionResponse = await governanceToken.delegate(delegatedAccount);
    await transactionResponse.wait();
    console.log(`Checkpoints: ${await governanceToken.numCheckpoints(delegatedAccount)}`);
}

export default deployGovernanceToken;
deployGovernanceToken.tags = ["all", "governor"];
