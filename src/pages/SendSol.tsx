import { useConnection, useWallet } from '@solana/wallet-adapter-react';
import { LAMPORTS_PER_SOL, PublicKey, SystemProgram,Transaction } from '@solana/web3.js';
import React, { useState } from 'react'

const SendSol = () => {
  const {connection}=useConnection();
    const {publicKey,sendTransaction}=useWallet();
  
     const [value,setValue]=useState(0);
      const [to,setTo]=useState("");

      const onClick=async()=>{
        if (!publicKey) {
    alert("Please connect your wallet first.");
    return;
  }

  if (!to || value <= 0) {
    alert("Enter a valid recipient and value");
    return;
  }

  const transaction=new Transaction().add(
    SystemProgram.transfer({
      fromPubkey:publicKey,
      toPubkey:new PublicKey(to),
      lamports:value*LAMPORTS_PER_SOL,
    })
  );

  try {
    const sig=await sendTransaction(transaction,connection);
    console.log("Transaction sent:",sig);
    
  } catch (error) {
    console.error("Error sending transaction:", error);
  }
      }
    
      
  return (
    <div>
       <div>
      <input
        type="text"
        placeholder="Value"
        className='border border-slate-700'
        value={value}
        onChange={(e) => setValue(Number(e.target.value))}
      />
      <input
        type="text"
        placeholder="To"
        value={to}
          className='border border-slate-700 m-2'
        onChange={(e) => setTo((e.target.value))}
      />
      <button className='bg-[#051F20] text-slate-100 p-3 rounded-2xl shadow-lg' onClick={onClick}>Send</button>
    </div>
    </div>
  )
}

export default SendSol