// components/sections/Phases.tsx
'use client'

import { motion, AnimatePresence } from 'framer-motion'
import { FaHeart, FaRing, FaInfinity, FaGift, FaLock, FaNotesMedical, FaStar, FaGem, FaCrown } from 'react-icons/fa'

// Add gradient backgrounds for each phase
const phaseGradients = {
    infatuation: 'from-pink-500 to-rose-400',
    commitment: 'from-yellow-400 to-amber-500',
    eternity: 'from-purple-500 to-indigo-500'
}

interface Phase {
    name: string
    icon: typeof FaHeart
    color: string
    description: string
    perks: {
        icon: typeof FaGift
        title: string
        description: string
    }[]
    nftFeatures: string[]
    level: string
    rewards: string[]
    progress: number
}

const phases: Phase[] = [
    {
        name: 'infatuation',
        icon: FaHeart,
        color: 'text-pink-400',
        description: 'Newly Minted KutuCoin adorned with fun, flirty designs',
        perks: [
            {
                icon: FaGift,
                title: 'Cute Collectibles',
                description: 'Send unique emojis and stickers with each token'
            },
            {
                icon: FaNotesMedical,
                title: 'Initial Benefits',
                description: 'Access to basic couple features and community'
            }
        ],
        nftFeatures: ['Cute animal mascots', 'Heart designs', 'Flirty themes'],
        level: 'Level 1',
        rewards: ['Daily Staking Bonus', 'Couple Chat Access', 'Basic NFT Minting'],
        progress: 33
    },
    {
        name: 'commitment',
        icon: FaRing,
        color: 'text-yellow-400',
        description: 'Matured KutuCoin featuring classic, symbolic designs',
        perks: [
            {
                icon: FaLock,
                title: 'Anniversary Rewards',
                description: 'Special rewards for relationship milestones'
            },
            {
                icon: FaGift,
                title: 'Unique NFTs',
                description: 'Commemorative tokens for special moments'
            }
        ],
        nftFeatures: ['Ring motifs', 'Lock-and-key designs', 'Milestone markers'],
        level: 'Level 2',
        rewards: ['2x Staking Rewards', 'Exclusive Events', 'Premium NFT Access'],
        progress: 66
    },
    {
        name: 'eternity',
        icon: FaInfinity,
        color: 'text-purple-400',
        description: 'Everlasting KutuCoin with symbols of lasting commitment',
        perks: [
            {
                icon: FaGift,
                title: 'Premium Access',
                description: 'Exclusive experiences and partner benefits'
            },
            {
                icon: FaLock,
                title: 'Maximum Rewards',
                description: 'Enhanced staking and special airdrops'
            }
        ],
        nftFeatures: ['Infinity symbols', 'Entwined initials', 'Premium designs'],
        level: 'Level 3',
        rewards: ['3x Staking Rewards', 'VIP Status', 'Rare NFT Airdrops'],
        progress: 100
    }
]

const ProgressBar = ({ progress, gradient }: { progress: number; gradient: string }) => (
    <div className="w-full h-2 bg-gray-200 rounded-full overflow-hidden">
        <motion.div
            className={`h-full bg-gradient-to-r ${gradient}`}
            initial={{ width: 0 }}
            animate={{ width: `${progress}%` }}
            transition={{ duration: 1, ease: "easeOut" }}
        />
    </div>
)

export const Phases = ({ activePhase, setActivePhase }: {
    activePhase: string;
    setActivePhase: (phase: string) => void;
}) => {
    return (
        <section className="container mx-auto px-4 py-16">
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="text-center mb-12"
            >
                <h2 className="text-4xl font-bold bg-gradient-to-r from-pink-500 to-purple-500 text-transparent bg-clip-text mb-4">
                    KutuCoin Evolution Journey
                </h2>
                <p className="text-gray-600 max-w-2xl mx-auto">
                    Watch your tokens transform as your relationship grows stronger
                </p>
            </motion.div>

            {/* Phase Selection */}
            <div className="flex justify-center space-x-12 mb-16">
                {phases.map((phase) => (
                    <motion.div
                        key={phase.name}
                        className={`relative flex flex-col items-center cursor-pointer group`}
                        whileHover={{ scale: 1.1 }}
                        onClick={() => setActivePhase(phase.name)}
                    >
                        <motion.div
                            className={`w-20 h-20 rounded-2xl bg-gradient-to-br ${phaseGradients[phase.name as keyof typeof phaseGradients]} 
                                flex items-center justify-center relative overflow-hidden
                                ${activePhase === phase.name ? 'shadow-lg' : 'opacity-70'}`}
                            whileHover={{
                                boxShadow: "0 0 30px rgba(236, 72, 153, 0.3)",
                            }}
                        >
                            <motion.div
                                className="absolute inset-0 bg-white opacity-0 group-hover:opacity-20"
                                initial={false}
                                animate={{ scale: [1, 1.5, 1] }}
                                transition={{ duration: 2, repeat: Infinity }}
                            />
                            <phase.icon className="text-3xl text-white" />
                            {activePhase === phase.name && (
                                <motion.div
                                    className="absolute inset-0 border-2 border-white rounded-2xl"
                                    initial={{ scale: 0.8, opacity: 0 }}
                                    animate={{ scale: 1.1, opacity: [1, 0] }}
                                    transition={{ duration: 1, repeat: Infinity }}
                                />
                            )}
                        </motion.div>
                        <div className="mt-4 space-y-1">
                            <span className="capitalize font-semibold block">
                                {phase.name}
                            </span>
                            <span className="text-sm text-gray-500 block">
                                {phase.level}
                            </span>
                            <ProgressBar
                                progress={phase.progress}
                                gradient={phaseGradients[phase.name as keyof typeof phaseGradients]}
                            />
                        </div>
                    </motion.div>
                ))}
            </div>

            {/* Phase Details */}
            <AnimatePresence mode="wait">
                <motion.div
                    key={activePhase}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    className="max-w-5xl mx-auto"
                >
                    {phases.map((phase) => phase.name === activePhase && (
                        <div key={phase.name} className="grid md:grid-cols-2 gap-8">
                            <motion.div
                                className="bg-white rounded-2xl p-8 shadow-xl"
                                initial={{ x: -50, opacity: 0 }}
                                animate={{ x: 0, opacity: 1 }}
                                transition={{ duration: 0.5 }}
                            >
                                <div className={`inline-block p-3 rounded-xl bg-gradient-to-br ${phaseGradients[phase.name as keyof typeof phaseGradients]} mb-6`}>
                                    <phase.icon className="text-3xl text-white" />
                                </div>
                                <h3 className="text-2xl font-bold mb-4">Evolution Stage</h3>
                                <p className="text-gray-600 mb-6">{phase.description}</p>

                                <div className="space-y-6">
                                    <div>
                                        <h4 className="font-semibold mb-3 flex items-center">
                                            <FaGem className="mr-2 text-pink-400" />
                                            NFT Features
                                        </h4>
                                        <ul className="grid grid-cols-1 gap-3">
                                            {phase.nftFeatures.map((feature, index) => (
                                                <motion.li
                                                    key={index}
                                                    className="flex items-center bg-gray-50 p-3 rounded-lg"
                                                    initial={{ opacity: 0, x: -20 }}
                                                    animate={{ opacity: 1, x: 0 }}
                                                    transition={{ delay: index * 0.1 }}
                                                >
                                                    <FaStar className="text-yellow-400 mr-2" />
                                                    {feature}
                                                </motion.li>
                                            ))}
                                        </ul>
                                    </div>

                                    <div>
                                        <h4 className="font-semibold mb-3 flex items-center">
                                            <FaCrown className="mr-2 text-yellow-400" />
                                            Rewards
                                        </h4>
                                        <ul className="grid grid-cols-1 gap-3">
                                            {phase.rewards.map((reward, index) => (
                                                <motion.li
                                                    key={index}
                                                    className="flex items-center bg-gray-50 p-3 rounded-lg"
                                                    initial={{ opacity: 0, x: -20 }}
                                                    animate={{ opacity: 1, x: 0 }}
                                                    transition={{ delay: index * 0.1 + 0.3 }}
                                                >
                                                    <FaGift className="text-pink-400 mr-2" />
                                                    {reward}
                                                </motion.li>
                                            ))}
                                        </ul>
                                    </div>
                                </div>
                            </motion.div>

                            <div className="space-y-6">
                                {phase.perks.map((perk, index) => (
                                    <motion.div
                                        key={index}
                                        className="bg-white rounded-2xl p-8 shadow-xl hover:shadow-2xl transition-shadow duration-300"
                                        initial={{ opacity: 0, x: 50 }}
                                        animate={{ opacity: 1, x: 0 }}
                                        transition={{ delay: index * 0.2 }}
                                        whileHover={{ y: -5 }}
                                    >
                                        <div className={`inline-block p-3 rounded-xl bg-gradient-to-br ${phaseGradients[phase.name as keyof typeof phaseGradients]} mb-4`}>
                                            <perk.icon className="text-2xl text-white" />
                                        </div>
                                        <h4 className="text-xl font-bold mb-2">{perk.title}</h4>
                                        <p className="text-gray-600">{perk.description}</p>
                                    </motion.div>
                                ))}
                            </div>
                        </div>
                    ))}
                </motion.div>
            </AnimatePresence>
        </section>
    )
}