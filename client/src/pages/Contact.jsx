import React, { useState } from 'react';

import GlassCard from '../components/GlassCard';

import { motion, AnimatePresence } from 'framer-motion';

const Contact = () => {
    const [submitted, setSubmitted] = useState(false);

    const handleSubmit = (e) => {
        e.preventDefault();
        setSubmitted(true);
        // Mock submission
        setTimeout(() => setSubmitted(false), 3000);
    };

    return (
        <div className="container mx-auto px-4 py-12">
            <GlassCard className="max-w-xl mx-auto">
                <motion.h1
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="text-3xl font-bold mb-6 text-center"
                >
                    Contact Us
                </motion.h1>

                <AnimatePresence mode="wait">
                    {submitted ? (
                        <motion.div
                            key="success"
                            initial={{ opacity: 0, scale: 0.8 }}
                            animate={{ opacity: 1, scale: 1 }}
                            exit={{ opacity: 0, scale: 0.8 }}
                            className="bg-green-100 dark:bg-green-900/30 text-green-800 dark:text-green-300 p-6 rounded-lg text-center border border-green-200 dark:border-green-800"
                        >
                            <h3 className="text-xl font-bold mb-2">Message Sent!</h3>
                            <p>Thank you! We'll get back to you shortly.</p>
                        </motion.div>
                    ) : (
                        <motion.form
                            key="form"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            onSubmit={handleSubmit}
                        >
                            <div className="mb-4">
                                <label className="block text-gray-700 dark:text-gray-300 text-sm font-bold mb-2">Name</label>
                                <input type="text" className="glass-input w-full" placeholder="Your Name" required />
                            </div>
                            <div className="mb-4">
                                <label className="block text-gray-700 dark:text-gray-300 text-sm font-bold mb-2">Email</label>
                                <input type="email" className="glass-input w-full" placeholder="your@email.com" required />
                            </div>
                            <div className="mb-6">
                                <label className="block text-gray-700 dark:text-gray-300 text-sm font-bold mb-2">Message</label>
                                <textarea className="glass-input w-full h-32 resize-none" placeholder="How can we help?" required></textarea>
                            </div>
                            <motion.button
                                whileHover={{ scale: 1.02 }}
                                whileTap={{ scale: 0.98 }}
                                type="submit"
                                className="glass-btn w-full text-lg"
                            >
                                Send Message
                            </motion.button>
                        </motion.form>
                    )}
                </AnimatePresence>
            </GlassCard>
        </div>
    );
};

export default Contact;
