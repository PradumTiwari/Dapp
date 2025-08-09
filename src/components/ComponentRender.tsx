import React from 'react';
import SendSol from '../pages/SendSol';
import CallingAprogramInstruction from './CallingAprogramInstruction';
import { useConnection, useWallet } from '@solana/wallet-adapter-react';
import { WalletMultiButton } from '@solana/wallet-adapter-react-ui';
import CreateMint from '../pages/CreateMint';

const ComponentRender = () => {
  const { connection } = useConnection();
  const { publicKey } = useWallet();

  return (
    <div className="min-h-screen  flex flex-col items-center py-50">
      <div className='mb-10'>  <WalletMultiButton /></div>
      {connection && publicKey && (
        <>
          <div className="w-full max-w-lg">
            <SendSol />
          </div>

          <div className="h-8" /> {/* space between forms */}

          <div className="w-full max-w-lg">
            <CallingAprogramInstruction />
          </div>

          <div className="h-8" /> {/* space between forms */}

          <div className="w-full max-w-lg">
            <CreateMint />
          </div>
        </>
      )}
    </div>
  );
};

export default ComponentRender;
