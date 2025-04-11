// components/animations/FloatingHeart.js
'use client'

import { motion } from 'framer-motion'
import { FaHeart } from 'react-icons/fa'

export const FloatingHeart = () => {
    return (
        <motion.div
            className="absolute pointer-events-none"
            initial={{ y: 0, x: Math.random() * window.innerWidth, opacity: 0, scale: 0 }}
            animate={{
                y: -window.innerHeight,
                opacity: [0, 1, 1, 0],
                scale: [0, 1, 1, 0],
            }}
            transition={{
                duration: 4,

                repeat: Infinity,
                ease: "easeOut"
            }}
        >
            <FaHeart className="text-pink-400 text-2xl" />
        </motion.div>
    )
}