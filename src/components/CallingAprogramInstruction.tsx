import { useConnection, useWallet } from "@solana/wallet-adapter-react";
import {
    PublicKey,
    Transaction,
    TransactionInstruction,
} from "@solana/web3.js";
import  { useState } from "react";
import { FaKey, FaMicrochip, FaRocket } from "react-icons/fa";

const CallingAprogramInstruction = () => {
    const { connection } = useConnection();
    const { publicKey, sendTransaction } = useWallet();

    const [programIdInput, setProgramIdInput] = useState("");
    const [dataAccountInput, setDataAccountInput] = useState("");
    const [showForm, setShowForm] = useState(false);

    const onClick = async () => {
        if (!connection || !publicKey) {
            alert("Please connect your wallet first!");
            return;
        }

        if (!programIdInput || !dataAccountInput) {
            alert("Please enter both Program ID and Data Account Public Key");
            return;
        }

        try {
            const programId = new PublicKey(programIdInput);
            const programDataAccount = new PublicKey(dataAccountInput);

            const transaction = new Transaction();

            const instruction = new TransactionInstruction({
                keys: [
                    {
                        pubkey: programDataAccount,
                        isSigner: false,
                        isWritable: true,
                    },
                ],
                programId,
            });

            transaction.add(instruction);
            transaction.feePayer = publicKey;

            const signature = await sendTransaction(transaction, connection);
            console.log("Transaction Signature:", signature);
            alert(`Transaction sent! Signature: ${signature}`);
        } catch (error) {
            console.error("Transaction failed:", error);
            alert("Transaction failed! Check console for details.");
        }
    };

    if (!publicKey) {
        return (
            <div className="flex justify-center items-center min-h-screen bg-gradient-to-br from-green-200 via-green-100 to-green-300">
                <p className="text-lg text-gray-700 font-medium bg-white/50 px-6 py-3 rounded-lg shadow-lg backdrop-blur-md">
                    Please connect your wallet to interact with the program.
                </p>
            </div>
        );
    }

    return (
        <div className="flex  flex-col items-center justify-center bg-gradient-to-br from-green-200 via-white to-green-300 p-4 rounded-3xl">
            <button
                onClick={() => setShowForm(!showForm)}
                className="mb-4 px-5 py-3 bg-green-600 text-white rounded-xl font-semibold shadow-md hover:bg-green-700 transition"
            >
                {showForm ? "Hide Contract Form" : "Show Contract Form"}
            </button>

            {showForm && (
                <div className="bg-white/80 backdrop-blur-md shadow-xl rounded-3xl p-10 w-full max-w-lg border border-gray-200">
                    <h2 className="text-3xl font-extrabold text-center text-green-700 mb-8">
                        Call Solana Smart Contract
                    </h2>

                    <div className="mb-6">
                        <label className="block text-gray-600 font-medium mb-2 flex items-center gap-2">
                            <FaMicrochip className="text-green-600" /> Program ID
                        </label>
                        <input
                            type="text"
                            placeholder="Enter Program ID"
                            value={programIdInput}
                            onChange={(e) => setProgramIdInput(e.target.value)}
                            className="w-full px-4 py-3 border rounded-xl shadow-sm focus:outline-none focus:ring-2 focus:ring-green-400"
                        />
                    </div>

                    <div className="mb-8">
                        <label className="block text-gray-600 font-medium mb-2 flex items-center gap-2">
                            <FaKey className="text-green-600" /> Data Account Public Key
                        </label>
                        <input
                            type="text"
                            placeholder="Enter Data Account PubKey"
                            value={dataAccountInput}
                            onChange={(e) => setDataAccountInput(e.target.value)}
                            className="w-full px-4 py-3 border rounded-xl shadow-sm focus:outline-none focus:ring-2 focus:ring-green-400"
                        />
                    </div>

                    <button
                        onClick={onClick}
                        className="w-full bg-green-600 hover:bg-green-700 text-white py-3 rounded-xl font-semibold transition duration-200 flex items-center justify-center gap-2 text-lg"
                    >
                        <FaRocket /> Send Transaction
                    </button>
                </div>
            )}
        </div>
    );
};

export default CallingAprogramInstruction;
