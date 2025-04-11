'use client'

import { motion } from 'framer-motion'
import { useState, useEffect } from 'react'
import { FaHeart, FaRing, FaInfinity, FaWallet, FaArrowRight, FaSignOutAlt } from 'react-icons/fa'
import { Button } from "@/components/ui/button"
import { useToast } from "@/hooks/use-toast"
import { ethers } from 'ethers'
import {
    useAccount,
    useBalance,
    useConnect,
    useDisconnect
} from 'wagmi'
import { getChainId } from '@wagmi/core'
import { config } from '@/lib/wagmi'

// AIA Chain Configuration
const AIA_CHAIN_ID = 1320
const AIA_CHAIN = {
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

// Contract configuration
const KUTUCOIN_ADDRESS = "0x64d7EF4Ad3dB502eb053c4A2C34976169eb3bBe9"
const PURCHASE_AMOUNT = "100"

const KUTUCOIN_ABI = [
    {
        "inputs": [{ "internalType": "address", "name": "account", "type": "address" }],
        "name": "balanceOf",
        "outputs": [{ "internalType": "uint256", "name": "", "type": "uint256" }],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [{ "internalType": "uint256", "name": "amount", "type": "uint256" }],
        "name": "purchaseTokens",
        "outputs": [],
        "stateMutability": "payable",
        "type": "function"
    },
    {
        "inputs": [],
        "name": "decimals",
        "outputs": [{ "internalType": "uint8", "name": "", "type": "uint8" }],
        "stateMutability": "view",
        "type": "function"
    }
]

type FloatingIconProps = {
    Icon: typeof FaHeart
    delay: number
    x: number
    y: number
}

type AnimatedCharactersProps = {
    text: string
}

const features = [
    { id: "evolving-nft", text: "Evolving NFT Collections", icon: FaHeart },
    { id: "milestones", text: "Relationship Milestone Rewards", icon: FaHeart },
    { id: "perks", text: "Exclusive Couple Perks", icon: FaHeart },
    { id: "events", text: "Community Events", icon: FaHeart },
]

const stats = [
    { id: "couples", label: "Active Couples", value: "10K+" },
    { id: "tvl", label: "Total Value Locked", value: "$5M+" },
    { id: "community", label: "Community Members", value: "50K+" },
]

const backgroundIcons = [
    { Icon: FaHeart, delay: 0, x: 100, y: -50 },
    { Icon: FaRing, delay: 1, x: -150, y: 100 },
    { Icon: FaInfinity, delay: 2, x: 200, y: 150 },
    { Icon: FaHeart, delay: 3, x: -100, y: -100 },
    { Icon: FaRing, delay: 4, x: 150, y: 50 },
]

const AnimatedCharacters: React.FC<AnimatedCharactersProps> = ({ text }) => {
    const words = text.split(" ")

    return (
        <motion.h1
            className="text-6xl lg:text-7xl font-bold leading-tight bg-gradient-to-r from-[#FF69B4] to-[#8A2BE2] text-transparent bg-clip-text mb-6"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8 }}
        >
            {words.map((word, index) => (
                <motion.span
                    key={index}
                    className="inline-block"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1, duration: 0.5 }}
                >
                    {word}&nbsp;
                </motion.span>
            ))}
        </motion.h1>
    )
}

const FloatingIcon: React.FC<FloatingIconProps> = ({ Icon, delay, x, y }) => (
    <motion.div
        className="absolute text-pink-400/30"
        initial={{ opacity: 0, scale: 0 }}
        animate={{
            opacity: [0, 1, 0],
            scale: [0.5, 1.5, 0.5],
            x,
            y,
        }}
        transition={{
            duration: 3,
            delay,
            repeat: Infinity,
            ease: "easeInOut"
        }}
    >
        <Icon className="text-2xl" />
    </motion.div>
)

export const Hero: React.FC = () => {
    const [isHovered, setIsHovered] = useState(false)
    const [isPurchasing, setIsPurchasing] = useState(false)
    const [currentChainId, setCurrentChainId] = useState<number | null>(null)
    const { toast } = useToast()

    const { address, isConnected } = useAccount()
    const { connect } = useConnect()
    const { disconnect } = useDisconnect()
    const { data: balance, refetch: refetchBalance } = useBalance({
        address,
        token: KUTUCOIN_ADDRESS as `0x${string}`,
        chainId: AIA_CHAIN_ID,
        // watch: true,
    })

    useEffect(() => {
        const updateChainId = async () => {
            if (isConnected) {
                const chainId = getChainId(config)
                setCurrentChainId(chainId)
            }
        }

        updateChainId()

        if (window.ethereum) {
            window.ethereum.on('chainChanged', () => {
                updateChainId()
            })
        }

        return () => {
            if (window.ethereum) {
                window.ethereum.removeListener('chainChanged', updateChainId)
            }
        }
    }, [isConnected])

    useEffect(() => {
        if (address) {
            refetchBalance()
        }
    }, [address, refetchBalance])


    const getButtonText = () => {
        if (isPurchasing) return 'Processing...';
        if (!isConnected) return 'Connect Wallet';
        if (currentChainId !== AIA_CHAIN_ID) return 'Switch to AIA Network';
        return 'Buy KUTU Tokens';
    };

    const handleError = (error: unknown, message: string) => {
        console.error(message, error)
        toast({
            title: "Error",
            description: message,
            variant: "destructive",
        })
    }

    const connectWallet = async () => {
        if (typeof window.ethereum === 'undefined') {
            toast({
                title: "Wallet Not Found",
                description: "Please install MetaMask to use this feature.",
                variant: "destructive",
            })
            return
        }

        try {
            // Request account access
            await window.ethereum.request({ method: 'eth_requestAccounts' })

            // Add AIA Testnet if not already added
            try {
                await window.ethereum.request({
                    method: 'wallet_switchEthereumChain',
                    params: [{ chainId: `0x${AIA_CHAIN_ID.toString(16)}` }],
                })
            } catch (switchError: any) {
                // This error code indicates that the chain has not been added to MetaMask
                if (switchError.code === 4902) {
                    await window.ethereum.request({
                        method: 'wallet_addEthereumChain',
                        params: [{
                            chainId: `0x${AIA_CHAIN_ID.toString(16)}`,
                            chainName: 'AIA Testnet',
                            nativeCurrency: {
                                name: 'tAIA',
                                symbol: 'tAIA',
                                decimals: 18
                            },
                            rpcUrls: ['https://aia-dataseed1-testnet.aiachain.org'],
                            blockExplorerUrls: ['https://testnet.aiascan.com']
                        }],
                    })
                } else {
                    throw switchError
                }
            }

            toast({
                title: "Success",
                description: "Connected to AIA Testnet",
            })
        } catch (error) {
            handleError(error, "Failed to connect to AIA Testnet. Please try again.")
        }
    }

    const getExplorerUrl = (hash: string) => `https://testnet.aiascan.com/tx/${hash}`

    const handlePurchase = async () => {
        if (!address || !window.ethereum) return

        setIsPurchasing(true)
        try {
            const provider = new ethers.BrowserProvider(window.ethereum)
            const signer = await provider.getSigner()
            const contract = new ethers.Contract(KUTUCOIN_ADDRESS, KUTUCOIN_ABI, signer)

            // Get the decimals
            const decimals = await contract.decimals()
            const amount = ethers.parseUnits(PURCHASE_AMOUNT, decimals)

            // Estimate the required AIA amount (this is a placeholder, you need to implement the actual calculation)
            const estimatedAIA = ethers.parseEther("0.01") // Example: 0.01 AIA

            const tx = await contract.purchaseTokens(amount, { value: estimatedAIA })
            await tx.wait()

            // Refetch the balance
            await refetchBalance()

            toast({
                title: "Success",
                description: (
                    <div>
                        Successfully purchased {PURCHASE_AMOUNT} KUTU tokens!
                        <a
                            href={getExplorerUrl(tx.hash)}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="underline ml-2"
                        >
                            View on Explorer
                        </a>
                    </div>
                ),
            })
        } catch (error) {
            handleError(error, "Failed to purchase tokens. Please try again.")
        } finally {
            setIsPurchasing(false)
        }
    }

    const handleAction = async () => {
        if (!isConnected) {
            return connectWallet();
        }

        const provider = new ethers.BrowserProvider(window.ethereum);
        const network = await provider.getNetwork();

        if (network.chainId !== BigInt(AIA_CHAIN_ID)) {
            toast({
                title: "Wrong Network",
                description: "Please switch to AIA Testnet to continue.",
                variant: "destructive",
            });
            return;
        }

        await handlePurchase();
    };

    return (
        <section className="min-h-screen relative overflow-hidden bg-gradient-to-b from-pink-50 via-purple-50 to-white">
            {backgroundIcons.map((icon, index) => (
                <FloatingIcon key={index} {...icon} />
            ))}

            <div className="container mx-auto px-4 py-20 text-center relative">
                <motion.div
                    className="max-w-5xl mx-auto"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.8 }}
                >
                    <AnimatedCharacters text="The Token of Love that Grows With You" />

                    <motion.p
                        className="text-xl text-gray-600 max-w-2xl mx-auto mb-16"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.5, duration: 0.8 }}
                    >
                        Transform your love story into digital treasures that evolve with your relationship.
                    </motion.p>

                    <motion.div
                        className="flex justify-center gap-6 mb-16 flex-wrap"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.8 }}
                    >
                        {features.map((feature, index) => (
                            <motion.div
                                key={feature.id}
                                className="bg-white/80 backdrop-blur-sm px-8 py-4 rounded-full shadow-sm border border-pink-100"
                                initial={{ opacity: 0, scale: 0.8 }}
                                animate={{ opacity: 1, scale: 1 }}
                                transition={{ delay: 1 + index * 0.1 }}
                                whileHover={{ scale: 1.05 }}
                            >
                                <feature.icon className="inline-block text-pink-400 mr-2" />
                                {feature.text}
                            </motion.div>
                        ))}
                    </motion.div>

                    <div className="flex justify-center space-x-6 mb-20">
                        <Button
                            className="bg-gradient-to-r from-pink-500 to-pink-600 text-white px-10 py-5 rounded-full font-semibold shadow-lg flex items-center text-lg"
                            onClick={handleAction}
                            onMouseEnter={() => setIsHovered(true)}
                            onMouseLeave={() => setIsHovered(false)}
                            disabled={isPurchasing}
                        >
                            <FaWallet className="mr-3 text-xl" />
                            {getButtonText()}
                            <motion.span
                                animate={{ x: isHovered ? 5 : 0 }}
                                transition={{ duration: 0.2 }}
                            >
                                <FaArrowRight className="ml-3 text-xl" />
                            </motion.span>
                        </Button>
                        {isConnected && (
                            <>
                                <Button
                                    className="bg-gradient-to-r from-purple-500 to-purple-600 text-white px-10 py-5 rounded-full font-semibold shadow-lg text-lg"
                                    disabled={true}
                                >
                                    KUTU Balance: {balance ? parseFloat(balance.formatted).toLocaleString() : '0'}
                                </Button>
                                <Button
                                    className="bg-gradient-to-r from-gray-500 to-gray-600 text-white px-6 py-5 rounded-full font-semibold shadow-lg text-lg"
                                    onClick={() => disconnect()}
                                >
                                    <FaSignOutAlt className="mr-2" />
                                    Disconnect
                                </Button>
                            </>
                        )}
                    </div>

                    <motion.div
                        className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-3xl mx-auto"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.8 }}
                    >
                        {stats.map((stat, index) => (
                            <motion.div
                                key={stat.id}
                                className="bg-white/80 backdrop-blur-sm p-6 rounded-xl shadow-sm border border-pink-50"
                                whileHover={{ scale: 1.05 }}
                                transition={{ duration: 0.2 }}
                            >
                                <motion.div
                                    className="text-4xl font-bold bg-gradient-to-r from-pink-500 to-purple-500 text-transparent bg-clip-text"
                                    initial={{ opacity: 0, y: 10 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true }}
                                >
                                    {stat.value}
                                </motion.div>
                                <div className="text-gray-600 mt-2">{stat.label}</div>
                            </motion.div>
                        ))}
                    </motion.div>
                </motion.div>
            </div>
        </section>
    )
}