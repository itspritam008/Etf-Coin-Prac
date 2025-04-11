// components/sections/Testimonials.tsx
'use client'

import { motion } from 'framer-motion'

interface Testimonial {
    text: string
    author: string
    delay: number
}

const testimonials: Testimonial[] = [
    {
        text: "KutuCoin has made our relationship even more exciting! We love watching our tokens grow together.",
        author: "Alice & Bob",
        delay: 0.1
    },
    {
        text: "The NFT perks are amazing! We've collected so many cute memories through KutuCoin.",
        author: "Carol & Dave",
        delay: 0.2
    }
]

export const Testimonials = () => {
    return (
        <section className="container mx-auto px-4 py-16 bg-white rounded-lg shadow-lg">
            <h2 className="text-3xl font-bold text-center mb-12">Love Stories with KutuCoin</h2>
            <div className="grid md:grid-cols-2 gap-8">
                {testimonials.map((testimonial) => (
                    <motion.div
                        key={testimonial.author}
                        className="bg-gradient-to-r from-pink-50 to-purple-50 p-8 rounded-lg relative"
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: testimonial.delay }}
                        whileHover={{ scale: 1.02 }}
                    >
                        <svg className="w-12 h-12 text-pink-200 absolute -top-2 -left-2" viewBox="0 0 24 24">
                            <path
                                fill="currentColor"
                                d="M4.583 17.321C3.553 16.227 3 15 3 13.011c0-3.5 2.457-6.637 6.03-8.188l.893 1.378c-3.335 1.804-3.987 4.145-4.247 5.621.537-.278 1.24-.375 1.929-.311 1.804.167 3.226 1.648 3.226 3.489a3.5 3.5 0 01-3.5 3.5c-1.073 0-2.099-.49-2.748-1.179zm10 0C13.553 16.227 13 15 13 13.011c0-3.5 2.457-6.637 6.03-8.188l.893 1.378c-3.335 1.804-3.987 4.145-4.247 5.621.537-.278 1.24-.375 1.929-.311 1.804.167 3.226 1.648 3.226 3.489a3.5 3.5 0 01-3.5 3.5c-1.073 0-2.099-.49-2.748-1.179z"
                            />
                        </svg>
                        <p className="italic mb-4 text-gray-600">{testimonial.text}</p>
                        <p className="font-semibold text-pink-500">{testimonial.author}</p>
                    </motion.div>
                ))}
            </div>
        </section>
    )
}
