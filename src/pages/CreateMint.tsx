import React from 'react';
import { useConnection,useWallet } from '@solana/wallet-adapter-react';
import { PublicKey,Keypair,SystemProgram,Transaction } from '@solana/web3.js';
import { TOKEN_PROGRAM_ID,MINT_SIZE,createInitializeMintInstruction } from '@solana/spl-token';

import { useCallback,useState } from 'react';




const CreateMint = () => {

    const {connection}=useConnection();
    const {publicKey,sendTransaction,signTransaction}=useWallet();
    const [mintAddress,setMintAddress]=useState<string|null>(null);

    const handleCreateMint=useCallback(async()=>{
        if(!publicKey||!signTransaction){
            alert("Connect Phantom wallet first");
            return;
        }

        try {
            const mintKeypair=Keypair.generate();//This is my mint Adddress
            const lamportsForMint=await connection.getMinimumBalanceForRentExemption(MINT_SIZE);
          
            //Create account fro the mint
            const ix1=SystemProgram.createAccount({
                fromPubkey:publicKey,
                newAccountPubkey:mintKeypair.publicKey,
                space:MINT_SIZE,
                lamports:lamportsForMint,
                programId:TOKEN_PROGRAM_ID

            })

              const ix2 = createInitializeMintInstruction(
                      mintKeypair.publicKey,
                        2,
                        publicKey,
                        null
      );

      const recentBlockHash=await connection.getRecentBlockhash();

      const transaction=new Transaction().add(ix1,ix2);
      transaction.recentBlockhash=recentBlockHash.blockhash;

      transaction.feePayer=publicKey;

      //Sign with MintkEy pair first(offline signer)
      transaction.partialSign(mintKeypair);

      //Let phantom sign it now

      const signedTx=await signTransaction(transaction);
      const signature=await connection.sendRawTransaction(signedTx.serialize());
      setMintAddress(mintKeypair.publicKey.toBase58());
      alert("✅ Mint created! Tx: " + signature);
            

        } catch (error) {
               console.error("Mint creation failed", error);
      alert("Error: " + error);
        }
    },[connection,publicKey,sendTransaction])
  return (
    <div>
      <button
        className="p-2 bg-[#4E8D6B] text-slate-200 font-semibold rounded-sm hover:bg-[#235347]"
        onClick={handleCreateMint}
        disabled={!publicKey}
      >
        Create Token Mint
      </button>

      {mintAddress && (
        <p>
          🎉 Mint Created: <br />
          <a
            href={`https://explorer.solana.com/address/${mintAddress}?cluster=devnet`}
            target="_blank"
            rel="noopener noreferrer"
          >
            {mintAddress}
          </a>
        </p>
      )}
    </div>
  )
}

export default CreateMint