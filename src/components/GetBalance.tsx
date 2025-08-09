import { useConnection, useWallet } from '@solana/wallet-adapter-react'
import  { useEffect, useState } from 'react'

const GetBalance = () => {
    const {connection}=useConnection();
    const [balance,setBalance]=useState<number|null>(null);
    const {publicKey}=useWallet();

    useEffect(()=>{
        const fetchBalance=async()=>{
            if(publicKey){
            const bal= await connection.getBalance(publicKey);
              setBalance(bal/1e9);
            }
            else{
                setBalance(null);
            }
        }

        fetchBalance();
   
    },[publicKey,connection]);
  return (
    <div className="text-center mt-4">
            {publicKey ? (
                <p>💰 Balance: {balance?.toFixed(4)} SOL</p>
            ) : (
                <p>🔌 Wallet not connected</p>
            )}
        </div>
  )
}

export default GetBalance