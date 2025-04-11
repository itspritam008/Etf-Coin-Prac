// components/illustrations/CoupleIllustration.js
'use client'

import { motion } from 'framer-motion'

export const CoupleIllustration = () => (
    <svg className="w-64 h-64 mx-auto" viewBox="0 0 200 200">
        <motion.circle
            cx="70"
            cy="100"
            r="30"
            fill="#FDB5B5"
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ duration: 0.5 }}
        />
        <motion.circle
            cx="130"
            cy="100"
            r="30"
            fill="#FFB5D8"
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
        />
        <motion.path
            d="M100 70 Q 100 40 130 40 Q 160 40 160 70 Q 160 100 100 130 Q 40 100 40 70 Q 40 40 70 40 Q 100 40 100 70"
            fill="#FF6B6B"
            initial={{ pathLength: 0, opacity: 0 }}
            animate={{ pathLength: 1, opacity: 1 }}
            transition={{ duration: 1, delay: 0.5 }}
        />
    </svg>
)