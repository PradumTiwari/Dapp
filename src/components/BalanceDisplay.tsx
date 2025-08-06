import { useConnection, useWallet } from "@solana/wallet-adapter-react";
import { LAMPORTS_PER_SOL } from "@solana/web3.js";
import {  useEffect, useState } from "react";

export const BalanceDisplay = () => {
  const [balance, setBalance] = useState(0);
  const { connection } = useConnection();
  const { publicKey } = useWallet();

  useEffect(() => {
    if (!connection || !publicKey) {
      console.error("Wallet not connected or connection unavailable");
      return;
    }

    let subscriptionId:number;

    const updateBalance = async () => {
      try {
        // 1. Fetch current balance
        const accountInfo = await connection.getAccountInfo(publicKey);
        if (accountInfo) {
          setBalance(accountInfo.lamports / LAMPORTS_PER_SOL);
        } else {
          throw new Error("Account info not found");
        }

        // 2. Listen for changes
        subscriptionId = connection.onAccountChange(
          publicKey,
          
          (updatedAccountInfo) => {
            setBalance(updatedAccountInfo.lamports / LAMPORTS_PER_SOL);
          },
         {commitment: "confirmed"}
        );
      } catch (error) {
        console.error("Failed to retrieve account info:", error);
      }
    };

    updateBalance();

    // Clean up the listener
    return () => {
      if (subscriptionId !== undefined) {
        connection.removeAccountChangeListener(subscriptionId);
      }
    };
  }, [connection, publicKey]);

  return (
    <div>
      <p>{publicKey ? `Balance: ${balance} SOL` : "Wallet not connected"}</p>
    </div>
  );
};


export default BalanceDisplay;