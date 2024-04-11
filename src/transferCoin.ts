import { Transaction, ethers } from "ethers";
import { tokenContract, wallet } from "./wallet";

type TransferCoin = {
  success: boolean;
  message: string;
};


/*
 * Transfer coin to address. This is native token ie ETH
 * @param {string} address - The address to transfer to
 */
export default async function transferCoin(address: string): Promise<TransferCoin> {
  try {
    // console.log(wallet.address, address);

    let transaction;
    if(process.env.IS_ERC20){
      transaction = await transferERC20Coin(address);
    }else{
      transaction = await transferNativeCoin(address);
    }
    if(transaction){
      return {
        success: true,
        message: transaction.hash as string,
      };
    }else{
      return {
        success: false,
        message: "Unable to Send Transaction - 1",
      };  
    }

  } catch (error) {
    console.log(error);
    return {
      success: false,
      message: "Unable to Send Transaction",
    };
  }
}

async function transferNativeCoin(address: string): Promise<Transaction> {

  // console.log(wallet.address, address);
  const transaction = await wallet.sendTransaction({
    to: address,
    value: ethers.utils.parseUnits(process.env.VALUE as string, 'ether'),
  });
  return transaction;

}

async function transferERC20Coin(address: string): Promise<Transaction> {

  const transaction = await tokenContract.connect(wallet).transfer(address, ethers.utils.parseUnits(process.env.VALUE as string, parseInt(process.env.DECIMALS as string)));
  console.log('Transaction hash:', transaction.hash);
  return transaction;
}

