import { createAppKit } from '@reown/appkit/react'

import { WagmiProvider } from 'wagmi'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { WagmiAdapter } from '@reown/appkit-adapter-wagmi'
import { defineChain } from '@reown/appkit/networks'

// 0. Setup queryClient
const queryClient = new QueryClient()

// 1. Get projectId from https://cloud.reown.com
const projectId = '746d2320e6b61ad0d27cf8305e74ac56'

// 2. Create a metadata object - optional
const metadata = {
  name: 'Edu NFT Marketplace',
  description: 'Testnet NFTs to get hand on experience about NFT',
  url: 'http://localhost/', // origin must match your domain & subdomain
  icons: ['https://avatars.githubusercontent.com/u/179229932']
}

// 3. Set the networks

const eduChainTestnet = defineChain({
  id: 656476 ,
  name: 'EDU Chain Testnet', // Network Name
  rpcUrls: {
    default: { http: ['https://open-campus-codex-sepolia.drpc.org'] },
  },
  blockExplorers: {
    default: { name: 'Blockscout', url: 'https://opencampus-codex.blockscout.com' } // Block Explorer URL
  },
  nativeCurrency: {
    name: 'EDU',
    symbol: 'EDU',
    decimals: 18
  },
  
});


const networks = [eduChainTestnet];

// 4. Create Wagmi Adapter
const wagmiAdapter = new WagmiAdapter({
  networks,
  projectId,
  ssr: true
})

// 5. Create modal
createAppKit({
  adapters: [wagmiAdapter],
  networks,
  projectId,
  metadata,
  features: {
    email: true, // default to true
    socials: ['google', 'x', 'github', 'discord', 'apple', 'facebook', 'farcaster'],
    emailShowWallets: true, // default to true
  },
})
console.log(wagmiAdapter.wagmiConfig);
export function AppKitProvider({ children }) {
  return (
    <WagmiProvider config={wagmiAdapter.wagmiConfig}>
      <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
    </WagmiProvider>
  )
}