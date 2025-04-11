// components/sections/Footer.tsx
'use client'

import { motion } from 'framer-motion'
import { FaWallet, FaTwitter, FaDiscord, FaTelegram } from 'react-icons/fa'

const socialLinks = [
    { icon: FaTwitter, href: '#', label: 'Twitter' },
    { icon: FaDiscord, href: '#', label: 'Discord' },
    { icon: FaTelegram, href: '#', label: 'Telegram' }
]

export const Footer = () => {
    return (
        <footer className="bg-gray-800 text-white py-12">
            <div className="container mx-auto px-4">
                <div className="text-center mb-8">
                    <h2 className="text-3xl font-bold mb-4">Ready to Start Your KutuCoin Journey?</h2>
                    <p className="mb-8">Join the cutest crypto community for couples today!</p>
                    <motion.button
                        className="bg-pink-500 text-white px-8 py-3 rounded-full font-semibold hover:bg-pink-600 transition duration-300"
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                    >
                        <FaWallet className="inline-block mr-2" />
                        Connect Wallet
                    </motion.button>
                </div>

                <div className="flex justify-center space-x-6 mb-8">
                    {socialLinks.map((social) => (
                        <motion.a
                            key={social.label}
                            href={social.href}
                            className="text-white hover:text-pink-400 text-2xl"
                            whileHover={{ scale: 1.2 }}
                            whileTap={{ scale: 0.9 }}
                            aria-label={social.label}
                        >
                            <social.icon />
                        </motion.a>
                    ))}
                </div>

                <div className="text-center text-gray-400 text-sm">
                    <p>© 2024 KutuCoin. All rights reserved.</p>
                </div>
            </div>
        </footer>
    )
}