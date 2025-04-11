// lib/wagmi.ts
import { http, createConfig } from 'wagmi'
import { injected } from 'wagmi/connectors'

const aiaTestnet = {
    id: 1320,
    name: 'AIA Testnet',
    network: 'aia-testnet',
    nativeCurrency: {
        decimals: 18,
        name: 'tAIA',
        symbol: 'tAIA',
    },
    rpcUrls: {
        public: { http: ['https://aia-dataseed1-testnet.aiachain.org'] },
        default: { http: ['https://aia-dataseed1-testnet.aiachain.org'] },
    },
    blockExplorers: {
        default: { name: 'AIA Testnet Explorer', url: 'https://testnet.aiascan.com' },
    },
    testnet: true,
} as const

export const config = createConfig({
    chains: [aiaTestnet],
    connectors: [
        injected(),
    ],
    transports: {
        [aiaTestnet.id]: http()
    },
})

declare module 'wagmi' {
    interface Register {
        config: typeof config
    }
}