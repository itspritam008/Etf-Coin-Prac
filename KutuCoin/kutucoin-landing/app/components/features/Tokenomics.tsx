// components/features/Tokenomics.tsx
'use client'

import { motion, AnimatePresence } from 'framer-motion'
import { useState } from 'react'
import { FaCoins, FaLock, FaUsers, FaCog, FaRocket, FaChartLine } from 'react-icons/fa'

interface TokenomicItem {
    id: string
    label: string
    percentage: number
    description: string
    icon: typeof FaCoins
    gradient: string
    detail: string
    color: string
    features: string[]  // Add this
    unlockSchedule: string  // Add this
}

const tokenomicsData: TokenomicItem[] = [
    {
        id: "circulating",
        label: "Circulating Supply",
        percentage: 70,
        description: "Available for public trading and community distribution. These tokens will be gradually released to ensure market stability.",
        icon: FaCoins,
        gradient: "from-pink-500 to-rose-400",
        detail: "7B KUTO",
        color: "#EC4899",
        features: [
            "Public Trading",
            "Community Rewards",
            "Liquidity Provision",
            "Staking Rewards"
        ],
        unlockSchedule: "20% at TGE, then linear vesting over 12 months"
    },
    {
        id: "development",
        label: "Development Reserve",
        percentage: 20,
        description: "Reserved for platform development, future improvements, and strategic partnerships to ensure long-term growth.",
        icon: FaCog,
        gradient: "from-purple-500 to-indigo-400",
        detail: "2B KUTO",
        color: "#8B5CF6",
        features: [
            "Platform Development",
            "Strategic Partnerships",
            "Marketing Initiatives",
            "Ecosystem Growth"
        ],
        unlockSchedule: "Locked for 6 months, then linear vesting over 24 months"
    },
    {
        id: "team",
        label: "Team Allocation",
        percentage: 10,
        description: "Allocated for team incentives and advisors, with a 12-month vesting period to ensure long-term commitment.",
        icon: FaUsers,
        gradient: "from-yellow-400 to-amber-500",
        detail: "1B KUTO",
        color: "#F59E0B",
        features: [
            "Team Incentives",
            "Advisor Allocation",
            "Future Hires",
            "Performance Rewards"
        ],
        unlockSchedule: "12-month cliff, then linear vesting over 24 months"
    }
]

const InteractivePieChart = ({ activeSegment, setActiveSegment }: {
    activeSegment: string | null;
    setActiveSegment: (id: string | null) => void;
}) => {
    const total = tokenomicsData.reduce((acc, item) => acc + item.percentage, 0)
    let currentAngle = 0

    return (
        <div className="relative w-[400px] h-[400px]">
            <svg
                viewBox="0 0 100 100"
                className="transform -rotate-90 w-full h-full"
            >
                {tokenomicsData.map((item) => {
                    const angle = (item.percentage / total) * 360
                    const startAngle = currentAngle
                    const endAngle = currentAngle + angle
                    currentAngle += angle

                    const x1 = 50 + 45 * Math.cos((startAngle * Math.PI) / 180)
                    const y1 = 50 + 45 * Math.sin((startAngle * Math.PI) / 180)
                    const x2 = 50 + 45 * Math.cos((endAngle * Math.PI) / 180)
                    const y2 = 50 + 45 * Math.sin((endAngle * Math.PI) / 180)

                    const largeArcFlag = angle > 180 ? 1 : 0

                    const pathData = `
            M 50 50
            L ${x1} ${y1}
            A 45 45 0 ${largeArcFlag} 1 ${x2} ${y2}
            Z
          `

                    return (
                        <motion.path
                            key={item.id}
                            d={pathData}
                            fill={item.color}
                            onMouseEnter={() => setActiveSegment(item.id)}
                            onMouseLeave={() => setActiveSegment(null)}
                            className="cursor-pointer transition-all duration-300"
                            whileHover={{
                                scale: 1.05,
                                translateX: 2,
                                translateY: 2,
                            }}
                            initial={{ opacity: 0, scale: 0 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ duration: 0.5 }}
                        />
                    )
                })}
                <circle
                    cx="50"
                    cy="50"
                    r="25"
                    className="fill-white"
                />
                <motion.circle
                    cx="50"
                    cy="50"
                    r="23"
                    className="fill-pink-50"
                    animate={{
                        scale: [1, 1.1, 1],
                    }}
                    transition={{
                        duration: 2,
                        repeat: Infinity,
                        ease: "easeInOut"
                    }}
                />
            </svg>

            {/* Center Content */}
            <div className="absolute inset-0 flex items-center justify-center">
                <div className="text-center">
                    <motion.div
                        className="text-2xl font-bold bg-gradient-to-r from-pink-500 to-purple-500 text-transparent bg-clip-text"
                        animate={{
                            scale: [1, 1.05, 1],
                        }}
                        transition={{
                            duration: 2,
                            repeat: Infinity,
                            ease: "easeInOut"
                        }}
                    >
                        10B
                    </motion.div>
                    <div className="text-sm text-gray-500">Total Supply</div>
                </div>
            </div>

            {/* Animated Labels */}
            <AnimatePresence>
                {activeSegment && (
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -20 }}
                        className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white/95 backdrop-blur-sm rounded-2xl p-6 shadow-xl w-80"
                    >
                        {tokenomicsData.map(item => item.id === activeSegment && (
                            <div key={item.id}>
                                <div className="flex items-center mb-3">
                                    <div className={`p-2 rounded-lg bg-gradient-to-br ${item.gradient} mr-3`}>
                                        <item.icon className="text-xl text-white" />
                                    </div>
                                    <div>
                                        <h4 className="font-bold text-lg">{item.label}</h4>
                                        <div className="text-sm text-gray-500">{item.detail}</div>
                                    </div>
                                </div>
                                <p className="text-gray-600 text-sm">{item.description}</p>
                                <div className="mt-3 flex items-center">
                                    <div className="text-2xl font-bold bg-gradient-to-r from-pink-500 to-purple-500 text-transparent bg-clip-text">
                                        {item.percentage}%
                                    </div>
                                    <div className="ml-2 text-sm text-gray-500">Allocation</div>
                                </div>
                            </div>
                        ))}
                    </motion.div>
                )}
            </AnimatePresence>

            {/* Connecting Lines and Labels */}
            {tokenomicsData.map((item, index) => {
                const angle = (index / tokenomicsData.length) * Math.PI * 2 - Math.PI / 2
                const radius = 160
                const x = Math.cos(angle) * radius
                const y = Math.sin(angle) * radius

                return (
                    <motion.div
                        key={item.id}
                        className="absolute"
                        style={{
                            left: '50%',
                            top: '50%',
                            transform: `translate(${x}px, ${y}px)`,
                        }}
                        initial={{ opacity: 0, scale: 0 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: index * 0.2 }}
                    >
                        <div className={`w-2 h-2 rounded-full bg-gradient-to-br ${item.gradient}`} />
                    </motion.div>
                )
            })}
        </div>
    )
}
export const Tokenomics = () => {
    const [activeSegment, setActiveSegment] = useState<string | null>(null);

    return (
        <section className="container mx-auto px-4 py-16">
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="text-center mb-16"
            >
                <h2 className="text-4xl font-bold bg-gradient-to-r from-pink-500 to-purple-500 text-transparent bg-clip-text mb-4">
                    Tokenomics
                </h2>
                <p className="text-gray-600 max-w-2xl mx-auto">
                    Total Supply: 10 Billion KUTO tokens distributed to ensure sustainable growth
                </p>
            </motion.div>

            <div className="grid md:grid-cols-2 gap-8 mb-16">
                {/* Interactive Pie Chart Section */}
                <motion.div
                    className="bg-white rounded-2xl p-8 shadow-xl"
                    initial={{ opacity: 0, x: -50 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                >
                    <div className="flex flex-col items-center">
                        <div className="relative w-[400px] h-[400px]">
                            <InteractivePieChart
                                activeSegment={activeSegment}
                                setActiveSegment={setActiveSegment}
                            />
                        </div>

                        {/* Distribution Timeline */}
                        <div className="w-full mt-8">
                            <h3 className="text-xl font-bold text-center bg-gradient-to-r from-pink-500 to-purple-500 text-transparent bg-clip-text mb-6">
                                Distribution Timeline
                            </h3>
                            <div className="relative pt-8">
                                <div className="absolute top-0 left-0 w-full h-0.5 bg-gradient-to-r from-pink-500 to-purple-500" />
                                <div className="grid grid-cols-3 gap-4">
                                    {[
                                        { label: "Initial Release", value: "20%", icon: FaRocket },
                                        { label: "Vesting Period", value: "24 Months", icon: FaLock },
                                        { label: "Final Distribution", value: "Q4 2025", icon: FaChartLine }
                                    ].map((item, index) => (
                                        <motion.div
                                            key={index}
                                            className="flex flex-col items-center"
                                            initial={{ opacity: 0, y: 20 }}
                                            whileInView={{ opacity: 1, y: 0 }}
                                            viewport={{ once: true }}
                                            transition={{ delay: index * 0.1 }}
                                        >
                                            <div className="w-4 h-4 rounded-full bg-white border-4 border-pink-500 mb-2" />
                                            <item.icon className="text-xl text-pink-500 mb-2" />
                                            <div className="text-sm font-semibold text-center">{item.label}</div>
                                            <div className="text-gray-600">{item.value}</div>
                                        </motion.div>
                                    ))}
                                </div>
                            </div>

                            {/* Quick Stats */}
                            <div className="grid grid-cols-2 gap-4 mt-8">
                                <motion.div
                                    className="bg-gradient-to-r from-pink-50 to-purple-50 p-4 rounded-xl"
                                    whileHover={{ scale: 1.02 }}
                                >
                                    <div className="text-sm text-gray-600">Initial Market Cap</div>
                                    <div className="text-lg font-bold bg-gradient-to-r from-pink-500 to-purple-500 text-transparent bg-clip-text">
                                        $100M
                                    </div>
                                </motion.div>
                                <motion.div
                                    className="bg-gradient-to-r from-purple-50 to-pink-50 p-4 rounded-xl"
                                    whileHover={{ scale: 1.02 }}
                                >
                                    <div className="text-sm text-gray-600">Initial Supply</div>
                                    <div className="text-lg font-bold bg-gradient-to-r from-purple-500 to-pink-500 text-transparent bg-clip-text">
                                        2B KUTO
                                    </div>
                                </motion.div>
                            </div>

                            {/* Current Phase Indicator */}
                            <motion.div
                                className="bg-gradient-to-r from-pink-500 to-purple-500 p-6 rounded-xl text-white text-center mt-8"
                                whileHover={{ scale: 1.02 }}
                            >
                                <div className="text-sm opacity-90 mb-1">Current Phase</div>
                                <div className="text-xl font-bold mb-3">Initial Distribution</div>
                                <motion.div
                                    className="w-full bg-white/20 h-2 rounded-full overflow-hidden"
                                    initial={{ width: 0 }}
                                    whileInView={{ width: "100%" }}
                                    viewport={{ once: true }}
                                >
                                    <motion.div
                                        className="h-full bg-white rounded-full"
                                        initial={{ width: 0 }}
                                        whileInView={{ width: "35%" }}
                                        viewport={{ once: true }}
                                        transition={{ duration: 1.5, ease: "easeOut" }}
                                    />
                                </motion.div>
                                <div className="text-sm mt-2 opacity-90">35% Complete</div>
                            </motion.div>
                        </div>
                    </div>
                </motion.div>

                {/* Details Section - Remove hover handlers */}
                <div className="space-y-6">
                    {tokenomicsData.map((item, index) => (
                        <motion.div
                            key={index}
                            className={`bg-white rounded-2xl p-6 shadow-xl hover:shadow-2xl transition-shadow duration-300
                    ${activeSegment === item.id ? 'ring-2 ring-pink-500 shadow-pink-100' : ''}`}
                            initial={{ opacity: 0, x: 50 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: index * 0.2 }}
                        >
                            {/* Rest of the card content remains the same */}
                            <div className="flex items-center space-x-4 mb-4">
                                <div className={`p-3 rounded-xl bg-gradient-to-br ${item.gradient}`}>
                                    <item.icon className="text-2xl text-white" />
                                </div>
                                <div className="flex-grow">
                                    <h3 className="font-bold text-lg">{item.label}</h3>
                                    <p className="text-sm text-gray-500">{item.detail}</p>
                                </div>
                                <div className="text-2xl font-bold bg-gradient-to-r from-pink-500 to-purple-500 text-transparent bg-clip-text">
                                    {item.percentage}%
                                </div>
                            </div>

                            <p className="text-gray-600 mb-4">{item.description}</p>

                            <div className="space-y-2">
                                <div className="text-sm font-semibold text-gray-500">Key Features:</div>
                                <div className="flex flex-wrap gap-2">
                                    {item.features.map((feature, idx) => (
                                        <span
                                            key={idx}
                                            className="text-sm px-3 py-1 bg-gray-50 rounded-full text-gray-600"
                                        >
                                            {feature}
                                        </span>
                                    ))}
                                </div>
                            </div>

                            <div className="mt-4 bg-gray-50 rounded-xl p-4">
                                <div className="w-full bg-gray-200 rounded-full h-2">
                                    <motion.div
                                        className={`h-2 rounded-full bg-gradient-to-r ${item.gradient}`}
                                        initial={{ width: 0 }}
                                        whileInView={{ width: `${item.percentage}%` }}
                                        viewport={{ once: true }}
                                        transition={{ duration: 1.5, ease: "easeOut" }}
                                    />
                                </div>
                                <div className="mt-2 text-sm text-gray-500">
                                    Unlock Schedule: {item.unlockSchedule}
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>

            {/* Additional Stats */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {[
                    {
                        icon: FaRocket,
                        label: "Initial Launch Price",
                        value: "$0.01",
                        gradient: "from-pink-500 to-rose-400"
                    },
                    {
                        icon: FaLock,
                        label: "Lock-up Period",
                        value: "12 Months",
                        gradient: "from-purple-500 to-indigo-400"
                    },
                    {
                        icon: FaChartLine,
                        label: "Growth Projection",
                        value: "+200%",
                        gradient: "from-blue-500 to-cyan-400"
                    },
                ].map((stat, index) => (
                    <motion.div
                        key={index}
                        className="bg-white rounded-xl p-6 shadow-lg"
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: index * 0.1 }}
                        whileHover={{
                            scale: 1.05,
                            boxShadow: "0 0 30px rgba(236, 72, 153, 0.1)",
                        }}
                    >
                        <div className={`p-3 rounded-xl bg-gradient-to-br ${stat.gradient} inline-block`}>
                            <stat.icon className="text-2xl text-white" />
                        </div>
                        <div className="text-gray-600 mt-4">{stat.label}</div>
                        <div className="text-2xl font-bold bg-gradient-to-r from-pink-500 to-purple-500 text-transparent bg-clip-text">
                            {stat.value}
                        </div>
                    </motion.div>
                ))}
            </div>
        </section>
    );
};