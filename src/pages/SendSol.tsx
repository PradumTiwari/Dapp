import { useConnection, useWallet } from '@solana/wallet-adapter-react';
import { LAMPORTS_PER_SOL, PublicKey, SystemProgram, Transaction } from '@solana/web3.js';
import  { useState } from 'react';

const SendSol = () => {
  const { connection } = useConnection();
  const { publicKey, sendTransaction } = useWallet();

  const [value, setValue] = useState(0);
  const [showSendSol, setShowSendSol] = useState(false);
  const [to, setTo] = useState("");

  const onClick = async () => {
    if (!publicKey) {
      alert("Please connect your wallet first.");
      return;
    }

    if (!to || value <= 0) {
      alert("Enter a valid recipient and amount");
      return;
    }

    const transaction = new Transaction().add(
      SystemProgram.transfer({
        fromPubkey: publicKey,
        toPubkey: new PublicKey(to),
        lamports: value * LAMPORTS_PER_SOL,
      })
    );

    try {
      const sig = await sendTransaction(transaction, connection);
      console.log("Transaction sent:", sig);
      alert(`Transaction Signature: ${sig}`);
    } catch (error) {
      console.error("Error sending transaction:", error);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center bg-gradient-to-br from-green-200 via-white to-green-300 p-4 rounded-3xl w-full max-w-lg">
      <button
        onClick={() => setShowSendSol(!showSendSol)}
        className="mb-4 px-5 py-3 bg-green-600 text-white rounded-xl font-semibold shadow-md hover:bg-green-700 transition"
      >
        {showSendSol ? "Hide Send SOL" : "Send SOL"}
      </button>

      {showSendSol && (
        <div className="bg-white/80 backdrop-blur-md shadow-xl rounded-3xl p-10 w-full border border-gray-200">
          <h2 className="text-3xl font-extrabold text-center text-green-700 mb-8">
            Send SOL
          </h2>

          <div className="mb-6">
            <input
              type="number"
              placeholder="Amount (SOL)"
              className="w-full px-4 py-3 border rounded-xl shadow-sm focus:outline-none focus:ring-2 focus:ring-green-400"
              value={value}
              onChange={(e) => setValue(Number(e.target.value))}
            />
          </div>

          <div className="mb-8">
            <input
              type="text"
              placeholder="Recipient Wallet Address"
              className="w-full px-4 py-3 border rounded-xl shadow-sm focus:outline-none focus:ring-2 focus:ring-green-400"
              value={to}
              onChange={(e) => setTo(e.target.value)}
            />
          </div>

          <button
            className="w-full bg-green-600 hover:bg-green-700 text-white py-3 rounded-xl font-semibold transition duration-200 text-lg"
            onClick={onClick}
          >
            Send
          </button>
        </div>
      )}
    </div>
  );
};

export default SendSol;
