import { ethers } from "ethers";

/*
 * connects to a wallet to provide funds
 */
const provider = new ethers.providers.JsonRpcProvider(process.env.RPC_URL as string);
const wallet = new ethers.Wallet(process.env.PRIVATE_KEY as string, provider);

const tokenABI = [{"constant":false,"inputs":[{"name":"_to","type":"address"},{"name":"_value","type":"uint256"}],"name":"transfer","outputs":[{"name":"","type":"bool"}],"payable":false,"stateMutability":"nonpayable","type":"function"}];
let tokenContract = new ethers.Contract(process.env.ERC20_TOKEN_CONTRACT as string, tokenABI, provider);

export {
  wallet,
  provider,
  tokenContract,
};
