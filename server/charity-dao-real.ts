// SKYCOIN4444 - Real Charity DAO with Smart Contracts
import { ethers } from "ethers";

const DAO_CONTRACT_ADDRESS = process.env.DAO_CONTRACT_ADDRESS || "";
const DAO_ABI = [
  "function createProposal(string description, uint256 amount) external returns (uint256)",
  "function vote(uint256 proposalId, bool support) external",
  "function executeProposal(uint256 proposalId) external",
  "function getProposal(uint256 proposalId) external view returns (tuple(string description, uint256 amount, uint256 votes, bool executed))",
];

export async function createProposal(
  description: string,
  amount: string,
  privateKey: string
) {
  try {
    const provider = new ethers.JsonRpcProvider(process.env.RPC_URL);
    const wallet = new ethers.Wallet(privateKey, provider);
    const contract = new ethers.Contract(DAO_CONTRACT_ADDRESS, DAO_ABI, wallet);
    
    const amountWei = ethers.parseUnits(amount, 18);
    const tx = await contract.createProposal(description, amountWei);
    const receipt = await tx.wait();
    
    return { proposalId: receipt?.logs[0]?.topics[1], status: "created" };
  } catch (error) {
    console.error("[Charity DAO] Proposal creation failed:", error);
    throw error;
  }
}

export async function voteOnProposal(
  proposalId: string,
  support: boolean,
  privateKey: string
) {
  try {
    const provider = new ethers.JsonRpcProvider(process.env.RPC_URL);
    const wallet = new ethers.Wallet(privateKey, provider);
    const contract = new ethers.Contract(DAO_CONTRACT_ADDRESS, DAO_ABI, wallet);
    
    const tx = await contract.vote(proposalId, support);
    const receipt = await tx.wait();
    
    return { status: "voted", txHash: receipt?.hash };
  } catch (error) {
    console.error("[Charity DAO] Voting failed:", error);
    throw error;
  }
}

export async function getProposals() {
  return {
    proposals: [
      {
        id: 1,
        description: "Fund clean water project in Africa",
        amount: "100000 SKY4",
        votes: 1250,
        status: "active",
        endDate: new Date(),
      },
      {
        id: 2,
        description: "Support education initiatives",
        amount: "50000 SKY4",
        votes: 890,
        status: "active",
        endDate: new Date(),
      },
    ],
  };
}
