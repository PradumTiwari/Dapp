import React, { useMemo, useState } from 'react';

import {ConnectionProvider,WalletProvider} from "@solana/wallet-adapter-react";
import {clusterApiUrl,Transaction,PublicKey,SystemProgram} from "@solana/web3.js"
import "@solana/wallet-adapter-react-ui/styles.css";
import { WalletModalProvider,WalletMultiButton } from '@solana/wallet-adapter-react-ui';
import SendSol from './components/SendSol.tsx';
import CallingAprogramInstruction from './components/CallingAprogramInstruction.tsx';
import ComponentRender from './components/ComponentRender.tsx';
import GetBalance from './components/GetBalance.tsx';

export default function App() {

  const endpoint=clusterApiUrl("devnet");

  const wallets=useMemo(()=>[],[]);

  return(
    <div className='flex flex-col items-center justify-center h-screen bg-gradient-to-b from-green-100 to-green-900    '>
    <ConnectionProvider endpoint={endpoint}>
    <WalletProvider wallets={wallets}>

      
    <WalletModalProvider>
     
    <WalletMultiButton/>
    <GetBalance/>
    <ComponentRender/>
    </WalletModalProvider>


    </WalletProvider>
     </ConnectionProvider>
     </div>
  )

  
}
