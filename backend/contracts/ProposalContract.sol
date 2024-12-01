// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/access/Ownable.sol";

contract ProposalContract is Ownable {
    // Struct to hold proposal data
    struct Proposal {
        uint256 id;
        string title;
        string description;
        int256 latitude;
        int256 longitude;
        address proposer;
        string ipfsHash;
    }

    // Mapping to store proposals by ID
    mapping(uint256 => Proposal) public proposals;
    uint256 public proposalCount;

    // Event to log the addition of a new proposal
    event ProposalAdded(
        uint256 proposalId,
        string title,
        string description,
        int256 latitude,
        int256 longitude,
        address proposer,
        string ipfsHash
    );

    constructor() {}

    /**
     * @dev Store a new proposal in the contract.
     * Can be called by any address.
     * @param _title The title of the proposal.
     * @param _description The description of the proposal.
     * @param _latitude The latitude of the proposal's location.
     * @param _longitude The longitude of the proposal's location.
     * @param _ipfsHash The IPFS hash containing proposal data.
     */
    function storeProposal(
        string memory _title,
        string memory _description,
        int256 _latitude,
        int256 _longitude,
        address _proposer,
        string memory _ipfsHash
    ) public {
        proposals[proposalCount] = Proposal({
            id: proposalCount,
            title: _title,
            description: _description,
            latitude: _latitude,
            longitude: _longitude,
            proposer: _proposer,
            ipfsHash: _ipfsHash
        });
        
        emit ProposalAdded(
            proposalCount,
            _title,
            _description,
            _latitude,
            _longitude,
            _proposer,
            _ipfsHash
        );
        
        // Increment proposal count after storing
        proposalCount++;
    }

    /**
     * @dev Retrieve a specific proposal by its ID.
     * @param _id The ID of the proposal to retrieve.
     * 
     */
    function getProposal(uint256 _id)
        public
        view
        returns (
            uint256 id,
            string memory title,
            string memory description,
            int256 latitude,
            int256 longitude,
            address proposer,
            string memory ipfsHash
        )
    {
        Proposal storage proposal = proposals[_id];
        return (
            proposal.id,
            proposal.title,
            proposal.description,
            proposal.latitude,
            proposal.longitude,
            proposal.proposer,
            proposal.ipfsHash
        );
    }

    /**
     * @dev Retrieve all proposals' details.
     * @return Array of all proposals stored in the contract.
     * This function is used to retrieve all proposals stored in the contract.
     */
    function getAllProposals() public view returns (Proposal[] memory) {
        Proposal[] memory allProposals = new Proposal[](proposalCount);
        for (uint256 i = 0; i < proposalCount; i++) {
            allProposals[i] = proposals[i];
        }
        return allProposals;
    }
}
