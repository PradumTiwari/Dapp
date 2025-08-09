import React, { useCallback, useState } from 'react';
import { useConnection, useWallet } from '@solana/wallet-adapter-react';
import { PublicKey, Keypair, SystemProgram, Transaction } from '@solana/web3.js';
import { TOKEN_PROGRAM_ID, MINT_SIZE, createInitializeMintInstruction } from '@solana/spl-token';
import { FaCoins, FaRocket } from 'react-icons/fa';

const CreateMint = () => {
  const { connection } = useConnection();
  const { publicKey, signTransaction } = useWallet();
  const [mintAddress, setMintAddress] = useState<string | null>(null);

  const handleCreateMint = useCallback(async () => {
    if (!publicKey || !signTransaction) {
      alert('Connect Phantom wallet first');
      return;
    }

    try {
      const mintKeypair = Keypair.generate();
      const lamportsForMint = await connection.getMinimumBalanceForRentExemption(MINT_SIZE);

      const ix1 = SystemProgram.createAccount({
        fromPubkey: publicKey,
        newAccountPubkey: mintKeypair.publicKey,
        space: MINT_SIZE,
        lamports: lamportsForMint,
        programId: TOKEN_PROGRAM_ID,
      });

      const ix2 = createInitializeMintInstruction(
        mintKeypair.publicKey,
        2,
        publicKey,
        null
      );

      const recentBlockhash = await connection.getRecentBlockhash();
      const transaction = new Transaction().add(ix1, ix2);
      transaction.recentBlockhash = recentBlockhash.blockhash;
      transaction.feePayer = publicKey;

      transaction.partialSign(mintKeypair);

      const signedTx = await signTransaction(transaction);
      const signature = await connection.sendRawTransaction(signedTx.serialize());

      setMintAddress(mintKeypair.publicKey.toBase58());
      alert('✅ Mint created! Tx: ' + signature);
    } catch (error) {
      console.error('Mint creation failed', error);
      alert('Error: ' + error);
    }
  }, [connection, publicKey, signTransaction]);

  if (!publicKey) {
    return (
      <div className="flex justify-center items-center min-h-screen bg-gradient-to-br from-green-200 via-white to-green-300">
        <p className="text-lg text-gray-700 font-medium bg-white/50 px-6 py-3 rounded-lg shadow-lg backdrop-blur-md">
          Please connect your wallet to create a token mint.
        </p>
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center justify-center p-4 w-full max-w-lg">
      <div className="bg-white/80 backdrop-blur-md shadow-xl rounded-3xl p-8 border border-gray-200 w-full">
        <h2 className="text-xl font-extrabold text-center text-green-700 mb-6 flex items-center justify-center gap-2">
          <FaCoins className="text-green-600" /> Create Token Mint
        </h2>

        <button
          className="w-full bg-green-600 hover:bg-green-700 text-white py-3 rounded-xl font-semibold transition duration-200 flex items-center justify-center gap-2 text-lg"
          onClick={handleCreateMint}
          disabled={!publicKey}
        >
          <FaRocket /> Create Mint
        </button>

        {mintAddress && (
          <p className="mt-6 text-center text-gray-700">
            🎉 Mint Created:
            <br />
            <a
              href={`https://explorer.solana.com/address/${mintAddress}?cluster=devnet`}
              target="_blank"
              rel="noopener noreferrer"
              className="text-green-600 underline break-all"
            >
              {mintAddress}
            </a>
          </p>
        )}
      </div>
    </div>
  );
};

export default CreateMint;
