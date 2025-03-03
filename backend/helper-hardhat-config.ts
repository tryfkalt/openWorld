const fs = require("fs");
const path = require("path");
import { ethers } from "ethers";

const proposalDataPath = path.join(__dirname, "data/proposalData.json");

// Function to get the latest proposal data from proposalData.json
function getLatestProposal() {
  try {
    const data = fs.readFileSync(proposalDataPath, "utf8");
    const proposals = JSON.parse(data);
    return proposals[proposals.length - 1]; // Get the latest proposal
  } catch (error) {
    console.error("Error reading proposal data:", error);
    return null;
  }
}

const latestProposal = getLatestProposal();

export interface networkConfigItem {
  ethUsdPriceFeed?: string
  blockConfirmations?: number
}

export interface networkConfigInfo {
  [key: string]: networkConfigItem
}

export const networkConfig: networkConfigInfo = {
  localhost: {},
  hardhat: {},
  sepolia: {
    blockConfirmations: 6,
  },
}


export const developmentChains = ["hardhat", "localhost"];
export const proposalsFile = "proposals.json";

export const frontEndContractsGovernor = "../frontend/constants/contractAddressesGovernor.json"
export const frontEndContractsProposalContract = "../frontend/constants/contractAddressesProposalContract.json"
export const frontEndAbiFileGovernor = "../frontend/constants/abiGovernor.json"
export const frontEndAbiFileProposalContract = "../frontend/constants/abiProposalContract.json"
export const frontEndAbiFileGovernanceToken = "../frontend/constants/abiGovernanceToken.json"
export const frontendContractsGovernanceToken = "../frontend/constants/contractAddressesGovernanceToken.json"
export const frontendContractsTimelock = "../frontend/constants/contractAddressesTimelock.json"
export const frontendAbiFileTimelock = "../frontend/constants/abiTimelock.json"


// Governor Values
export const QUORUM_PERCENTAGE = 4; // Need 4% of voters to pass
export const PROPOSAL_THRESHOLD = 100; // 1% of total supply
export const MIN_DELAY = 360; // 1/2 hour - after a vote passes, you have 1/2 hour before you can enact
export const VOTING_PERIOD = 120; // blocks
export const VOTING_DELAY = 15; // 10 Block - How many blocks till a proposal vote becomes active
export const ADDRESS_ZERO = "0x0000000000000000000000000000000000000000";

// Set STORE_PARAMS with data from the latest proposal, or default values if no proposal found
export const STORE_PARAMS = latestProposal && latestProposal.coordinates
  ? [
      latestProposal.title,
      latestProposal.description,
      // Ensure coordinates are valid before using BigNumber
      ethers.BigNumber.from(
        isNaN(parseFloat(latestProposal.coordinates[0]))
          ? 0 // Fallback value if NaN
          : parseFloat(latestProposal.coordinates[0]).toFixed(0)
      ),
      ethers.BigNumber.from(
        isNaN(parseFloat(latestProposal.coordinates[1]))
          ? 0 // Fallback value if NaN
          : parseFloat(latestProposal.coordinates[1]).toFixed(0)
      ),
    ]
  : [
      "Default Title",
      "Default Description",
      ethers.BigNumber.from(0),
      ethers.BigNumber.from(0),
    ];


export const FUNC = "storeProposal" as const;
export const PROPOSAL_DESCRIPTION = "Proposal to store proposal information.";