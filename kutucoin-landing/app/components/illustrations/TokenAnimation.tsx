// components/illustrations/TokenAnimation.js

'use client'

import { motion } from 'framer-motion'

export const TokenAnimation = () => (
    <svg className="w-32 h-32" viewBox="0 0 100 100">
        <motion.circle
            cx="50"
            cy="50"
            r="40"
            stroke="#FF6B6B"
            strokeWidth="4"
            fill="none"
            initial={{ pathLength: 0 }}
            animate={{ pathLength: 1, rotate: 360 }}
            transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
        />
        <motion.text
            x="50"
            y="55"
            textAnchor="middle"
            fill="#FF6B6B"
            fontSize="16"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
        >
            KUTU
        </motion.text>
    </svg>
)