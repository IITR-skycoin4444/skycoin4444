// SKYCOIN4444 - Real Staking with Web3 Smart Contracts
import { ethers } from "ethers";

const STAKING_CONTRACT_ADDRESS = process.env.STAKING_CONTRACT_ADDRESS || "";
const STAKING_ABI = [
  "function stake(uint256 amount) external",
  "function unstake(uint256 amount) external",
  "function claimRewards() external",
  "function getStakeInfo(address user) external view returns (uint256 staked, uint256 rewards)",
];

export async function getStakingInfo(userAddress: string) {
  try {
    const provider = new ethers.JsonRpcProvider(process.env.RPC_URL);
    const contract = new ethers.Contract(STAKING_CONTRACT_ADDRESS, STAKING_ABI, provider);
    
    const [staked, rewards] = await contract.getStakeInfo(userAddress);
    
    return {
      staked: ethers.formatUnits(staked, 18),
      rewards: ethers.formatUnits(rewards, 18),
      apy: 12.5, // 12.5% APY
      estimatedMonthlyRewards: (parseFloat(ethers.formatUnits(staked, 18)) * 0.125) / 12,
    };
  } catch (error) {
    console.error("[Staking] Info retrieval failed:", error);
    throw error;
  }
}

export async function stake(userAddress: string, amount: string, privateKey: string) {
  try {
    const provider = new ethers.JsonRpcProvider(process.env.RPC_URL);
    const wallet = new ethers.Wallet(privateKey, provider);
    const contract = new ethers.Contract(STAKING_CONTRACT_ADDRESS, STAKING_ABI, wallet);
    
    const amountWei = ethers.parseUnits(amount, 18);
    const tx = await contract.stake(amountWei);
    const receipt = await tx.wait();
    
    return { txHash: receipt?.hash, status: "success" };
  } catch (error) {
    console.error("[Staking] Stake failed:", error);
    throw error;
  }
}

export async function claimRewards(userAddress: string, privateKey: string) {
  try {
    const provider = new ethers.JsonRpcProvider(process.env.RPC_URL);
    const wallet = new ethers.Wallet(privateKey, provider);
    const contract = new ethers.Contract(STAKING_CONTRACT_ADDRESS, STAKING_ABI, wallet);
    
    const tx = await contract.claimRewards();
    const receipt = await tx.wait();
    
    return { txHash: receipt?.hash, status: "success" };
  } catch (error) {
    console.error("[Staking] Claim failed:", error);
    throw error;
  }
}
