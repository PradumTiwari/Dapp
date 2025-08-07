import { useConnection, useWallet } from '@solana/wallet-adapter-react'
import { PublicKey, sendAndConfirmTransaction, SendTransactionError, Transaction, TransactionInstruction } from '@solana/web3.js';
import React, { useState } from 'react'

const PROGRAM_ID = "ChT1B39WKLS8qUrkLvFDXMhEJ4F1XZzwUNHUt4AU9aVa";
const DATA_ACCOUNT_PUBKEY = "Ah9K7dQ8EHaZqcAsgBW8w37yN2eAy3koFmUn4x3CJtod";

const CallingAprogramInstruction = () => {
    const { connection } = useConnection();
    const { publicKey, sendTransaction } = useWallet();

    const [value, setValue] = useState(0);
    const [to, setTo] = useState("");

    const onClick = async () => {
        if (!connection || !publicKey) {
            alert("Not connected wallet");
            return;
        }

        try {
            const programId = new PublicKey(PROGRAM_ID);
            const programDataAccount = new PublicKey(DATA_ACCOUNT_PUBKEY);
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
        } catch (error) {
            console.error("Transaction failed:", error);
        }
    };

    // 🔒 If not connected, hide the component
    if (!publicKey) {
        return null;
    }

    return (
        <div>
            <h2 className='p-2 text-2xl text-slate-900 border rounded-xl shadow-sm mb-10 bg-[#4E8D6B]'>
                Want to Call a smart Contract
            </h2>
            <div>
                <input
                    type="text"
                    placeholder="Program_ID"
                    value={value}
                    className='border border-slate-700 m-2'
                    onChange={(e) => setValue(Number(e.target.value))}
                />
                <input
                    type="text"
                    placeholder="DATA_ACCOUNT"
                    value={to}
                    className='border border-slate-700 m-2'
                    onChange={(e) => setTo(e.target.value)}
                />
                <button
                    className='bg-[#051F20] text-slate-100 p-3 rounded-2xl shadow-lg'
                    onClick={onClick}
                >
                    Send
                </button>
            </div>
        </div>
    );
};


export default CallingAprogramInstruction;