import { ethers } from "ethers";
import wallet from "./wallet";

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
    const transaction = await wallet.sendTransaction({
      to: address,
      value: ethers.utils.parseUnits(process.env.VALUE as string, 'ether'),
    });
    return {
      success: true,
      message: transaction.hash,
    };
  } catch (error) {
    console.log(error);
    return {
      success: false,
      message: "Unable to Send Transaction",
    };
  }
}


