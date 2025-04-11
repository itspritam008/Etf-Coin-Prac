'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { FaHeart, FaClock, FaGift, FaArrowRight } from 'react-icons/fa'

interface Benefit {
    icon: typeof FaHeart
    title: string
    description: string
    longDescription: string
    delay: number
}

const benefits: Benefit[] = [
    {
        icon: FaGift,
        title: 'Exclusive Rewards',
        description: 'Earn unique couple NFTs and special perks as your love grows stronger.',
        longDescription: 'As you and your partner invest in KutuCoin, you\'ll unlock a world of exclusive rewards. From customizable couple NFTs that evolve with your relationship to VIP access to romantic getaways, your love story becomes more rewarding with every token.',
        delay: 0.1
    },
    {
        icon: FaClock,
        title: 'Time-locked Bonding',
        description: 'Lock your tokens together to earn enhanced staking rewards.',
        longDescription: 'Demonstrate your commitment by time-locking your KutuCoins together. The longer you lock, the higher your rewards. Watch your investment grow alongside your relationship, with bonus multipliers for relationship milestones.',
        delay: 0.2
    },
    {
        icon: FaHeart,
        title: 'Couple Events',
        description: 'Access exclusive events and experiences for KutuCoin couples.',
        longDescription: 'Join a vibrant community of couples with access to exclusive KutuCoin events. From virtual date nights to real-world meetups, create unforgettable memories with your partner and connect with other couples in the KutuCoin ecosystem.',
        delay: 0.3
    }
]

export const Benefits = () => {
    const [expandedBenefit, setExpandedBenefit] = useState<string | null>(null)

    return (
        <section className="container mx-auto px-4 py-16 overflow-hidden">
            <motion.h2
                className="text-4xl font-bold text-center mb-12"
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
            >
                <span className="bg-gradient-to-r from-pink-400 to-purple-600 text-transparent bg-clip-text">
                    KutuCoin Benefits
                </span>
            </motion.h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {benefits.map((benefit) => (
                    <motion.div
                        key={benefit.title}
                        className="bg-gradient-to-br from-white to-pink-100 p-6 rounded-lg shadow-lg relative overflow-hidden"
                        initial={{ opacity: 0, y: 50 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: benefit.delay, duration: 0.5 }}
                        whileHover={{ scale: 1.03, boxShadow: '0 10px 30px -10px rgba(236, 72, 153, 0.3)' }}
                    >
                        <motion.div
                            className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-pink-400 to-purple-600"
                            initial={{ scaleX: 0 }}
                            whileInView={{ scaleX: 1 }}
                            viewport={{ once: true }}
                            transition={{ delay: benefit.delay + 0.2, duration: 0.8 }}
                        />
                        <div className="flex items-center mb-4">
                            <motion.div
                                className="text-4xl text-pink-400 mr-3"
                                whileHover={{ rotate: 360, scale: 1.2 }}
                                transition={{ duration: 0.5 }}
                            >
                                <benefit.icon />
                            </motion.div>
                            <h3 className="text-2xl font-semibold">{benefit.title}</h3>
                        </div>
                        <p className="text-gray-600 mb-4">{benefit.description}</p>
                        <AnimatePresence>
                            {expandedBenefit === benefit.title && (
                                <motion.div
                                    initial={{ opacity: 0, height: 0 }}
                                    animate={{ opacity: 1, height: 'auto' }}
                                    exit={{ opacity: 0, height: 0 }}
                                    transition={{ duration: 0.3 }}
                                >
                                    <p className="text-gray-700 mt-2">{benefit.longDescription}</p>
                                </motion.div>
                            )}
                        </AnimatePresence>
                        <motion.button
                            className="mt-4 text-pink-500 flex items-center focus:outline-none"
                            onClick={() => setExpandedBenefit(expandedBenefit === benefit.title ? null : benefit.title)}
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                        >
                            {expandedBenefit === benefit.title ? 'Read Less' : 'Read More'}
                            <motion.div
                                animate={{ rotate: expandedBenefit === benefit.title ? 90 : 0 }}
                                transition={{ duration: 0.3 }}
                            >
                                <FaArrowRight className="ml-2" />
                            </motion.div>
                        </motion.button>
                    </motion.div>
                ))}
            </div>
            <motion.div
                className="text-center mt-12"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5, duration: 0.5 }}
            >
                <motion.button
                    className="bg-gradient-to-r from-pink-500 to-purple-600 text-white px-8 py-3 rounded-full font-semibold text-lg shadow-lg"
                    whileHover={{ scale: 1.05, boxShadow: '0 0 15px rgba(236, 72, 153, 0.5)' }}
                    whileTap={{ scale: 0.95 }}
                >
                    Start Earning Benefits Now
                </motion.button>
            </motion.div>
        </section>
    )
}