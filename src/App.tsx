import React, { useMemo, useState } from 'react';

import {ConnectionProvider,WalletProvider} from "@solana/wallet-adapter-react";
import {clusterApiUrl,Transaction,PublicKey,SystemProgram} from "@solana/web3.js"
import "@solana/wallet-adapter-react-ui/styles.css";
import { WalletModalProvider,WalletMultiButton } from '@solana/wallet-adapter-react-ui';
import BalanceDisplay from "./components/BalanceDisplay.js"


export default function App() {

  const endpoint=clusterApiUrl("devnet");

  const wallets=useMemo(()=>[],[]);

  return(
    <ConnectionProvider endpoint={endpoint}>
    <WalletProvider wallets={wallets}>

      
    <WalletModalProvider>
      <WalletMultiButton/>
     <BalanceDisplay/>
    </WalletModalProvider>


    </WalletProvider>
     </ConnectionProvider>
  )

  
}
