'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { FaRocket, FaCoins, FaMobileAlt, FaGlobe } from 'react-icons/fa'

interface RoadmapItem {
    quarter: string
    title: string
    description: string
    icon: React.ElementType
    delay: number
}

const roadmapItems: RoadmapItem[] = [
    {
        quarter: 'Q2 2024',
        title: 'KutuCoin Launch',
        description: 'Initial token release and exchange listings. Start of the KutuCoin ecosystem.',
        icon: FaRocket,
        delay: 0.1
    },
    {
        quarter: 'Q3 2024',
        title: 'NFT Perks Integration',
        description: 'Introduce exclusive NFTs for couples with special benefits and rewards.',
        icon: FaCoins,
        delay: 0.2
    },
    {
        quarter: 'Q4 2024',
        title: 'Mobile App Release',
        description: 'Launch of KutuCoin mobile app for easy token management and couple interactions.',
        icon: FaMobileAlt,
        delay: 0.3
    },
    {
        quarter: 'Q1 2025',
        title: 'Global Expansion',
        description: 'Expanding KutuCoin to new markets and introducing localized features.',
        icon: FaGlobe,
        delay: 0.4
    },
]

export const Roadmap = () => {
    const [hoveredItem, setHoveredItem] = useState<string | null>(null)

    return (
        <section className="container mx-auto px-4 py-16 overflow-hidden">
            <motion.h2
                className="text-4xl font-bold text-center mb-12 bg-gradient-to-r from-pink-400 to-purple-600 text-transparent bg-clip-text"
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
            >
                KutuCoin Roadmap
            </motion.h2>
            <div className="max-w-4xl mx-auto relative">
                <motion.div
                    className="absolute left-1/2 top-0 bottom-0 w-1 bg-gradient-to-b from-pink-300 to-purple-500"
                    initial={{ height: 0 }}
                    animate={{ height: '100%' }}
                    transition={{ duration: 1.5, ease: "easeInOut" }}
                />
                {roadmapItems.map((item, index) => (
                    <motion.div
                        key={item.quarter}
                        className="flex items-center mb-16 relative"
                        initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: item.delay, duration: 0.5 }}
                    >
                        <div className={`w-1/2 ${index % 2 === 0 ? 'text-right pr-8' : 'text-left pl-8 order-last'}`}>
                            <motion.div
                                className="inline-block font-semibold text-lg mb-2 bg-gradient-to-r from-pink-400 to-purple-600 text-transparent bg-clip-text"
                                whileHover={{ scale: 1.05 }}
                            >
                                {item.quarter}
                            </motion.div>
                            <motion.h3
                                className="text-2xl font-bold mb-2"
                                whileHover={{ scale: 1.05 }}
                            >
                                {item.title}
                            </motion.h3>
                            <AnimatePresence>
                                {hoveredItem === item.quarter && (
                                    <motion.p
                                        initial={{ opacity: 0, height: 0 }}
                                        animate={{ opacity: 1, height: 'auto' }}
                                        exit={{ opacity: 0, height: 0 }}
                                        transition={{ duration: 0.3 }}
                                        className="text-gray-600"
                                    >
                                        {item.description}
                                    </motion.p>
                                )}
                            </AnimatePresence>
                        </div>
                        <motion.div
                            className="absolute left-1/2 transform -translate-x-1/2 w-12 h-12 bg-gradient-to-br from-pink-400 to-purple-600 rounded-full flex items-center justify-center z-10 cursor-pointer"
                            whileHover={{ scale: 1.2, boxShadow: '0 0 15px rgba(236, 72, 153, 0.7)' }}
                            onHoverStart={() => setHoveredItem(item.quarter)}
                            onHoverEnd={() => setHoveredItem(null)}
                        >
                            <item.icon className="text-white text-xl" />
                        </motion.div>
                    </motion.div>
                ))}
            </div>
            <motion.div
                className="text-center mt-12"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5, duration: 0.5 }}
            >
                <p className="text-lg text-gray-600 mb-4">Our journey is just beginning. Stay tuned for more exciting updates!</p>
                <motion.button
                    className="bg-gradient-to-r from-pink-500 to-purple-600 text-white px-6 py-3 rounded-full font-semibold hover:from-pink-600 hover:to-purple-700 transition duration-300"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                >
                    Join Our Community
                </motion.button>
            </motion.div>
        </section>
    )
}