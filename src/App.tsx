import React, { useMemo, useState } from 'react';

import {ConnectionProvider,WalletProvider} from "@solana/wallet-adapter-react";
import {clusterApiUrl,Transaction,PublicKey,SystemProgram} from "@solana/web3.js"
import "@solana/wallet-adapter-react-ui/styles.css";
import { WalletModalProvider,WalletMultiButton } from '@solana/wallet-adapter-react-ui';
import { createBrowserRouter,RouterProvider} from 'react-router-dom';
import Home from './pages/Home';
import GetBalance from './components/GetBalance';
import SendSol from './pages/SendSol';
import CallInstructionPage from './pages/CallInstruction';

import CreateMint from './pages/CreateMint';

export default function App() {


  const router=createBrowserRouter([
    {
      path:"/",
      element:<Home/>
    },
    {
      path:'/get_balance',
      element:<GetBalance/>
    },
      {
    path: '/send-sol',
    element: <SendSol />,
  },
  {
    path: '/call-instruction',
    element: <CallInstructionPage />,
  },
  {
    path:'/create-Mint',
    element:<CreateMint/>
  }
  ])

  const endpoint=clusterApiUrl("devnet");

  const wallets=useMemo(()=>[],[]);

  return(
    <div className='flex flex-col items-center justify-center h-screen bg-gradient-to-b from-green-100 to-green-900    '>
    <ConnectionProvider endpoint={endpoint}>
    <WalletProvider wallets={wallets}>

      
    <WalletModalProvider>
     
     <div className="py-4">
              <WalletMultiButton />
            </div>
            {/* Render the router content here */}
            <RouterProvider router={router} />
   
    </WalletModalProvider>


    </WalletProvider>
     </ConnectionProvider>
     </div>
  )

  
}
