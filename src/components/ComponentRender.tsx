import React from 'react'
import SendSol from '../pages/SendSol'
import CallingAprogramInstruction from './CallingAprogramInstruction'
import { useConnection, useWallet } from '@solana/wallet-adapter-react'

const ComponentRender = () => {
    const { connection } = useConnection();
    const { publicKey } = useWallet();  // ✅ This tells you if wallet is connected

    return (
        <div>
            {connection && publicKey && (  // ✅ Only show when wallet is connected
                <div>
                    <div className='p-30 m-20'><SendSol /></div>
                   <div className=' flex items-center justify-center'> <CallingAprogramInstruction /></div>
                </div>
            )}
        </div>
  )
}

export default ComponentRender