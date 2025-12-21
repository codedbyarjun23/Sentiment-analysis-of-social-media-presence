import React from 'react';

import GlassCard from '../components/GlassCard';
import { ArrowRight, BarChart, Activity, Search } from 'lucide-react';
import { Link } from 'react-router-dom';
import { motion, useScroll, useTransform } from 'framer-motion';
import { Canvas } from '@react-three/fiber';
import Earth from '../components/Earth';

const Landing = () => {
    const { scrollYProgress } = useScroll();
    const y = useTransform(scrollYProgress, [0, 1], ['0%', '50%']);

    return (
        <>
            {/* Hero Section */}
            < section className="relative pt-20 pb-32 overflow-hidden" >
                <div className="container mx-auto px-4 text-center z-10 relative">
                    <motion.h1
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8 }}
                        className="text-5xl md:text-7xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-primary to-secondary drop-shadow-sm"
                    >
                        Sentiment Analysis <br /> of Social Media Presence
                    </motion.h1>
                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, delay: 0.2 }}
                        className="text-xl text-gray-600 dark:text-gray-300 mb-10 max-w-2xl mx-auto"
                    >
                        Monitor public sentiment on social media to assess brand reputation and inform marketing strategies.
                    </motion.p>
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, delay: 0.4 }}
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                    >
                        <Link to="/register" className="glass-btn text-lg px-8 py-3 rounded-full hover:shadow-[0_0_25px_rgba(110,231,183,0.6)] transition-shadow duration-300">
                            Get Started <ArrowRight className="inline-block ml-2 w-5 h-5" />
                        </Link>
                    </motion.div>
                </div>

                {/* Background Blobs */}
                {/* 3D Background */}
                {/* 3D Background with Parallax */}
                <motion.div style={{ y }} className="absolute inset-0 z-0 opacity-60 pointer-events-none">
                    <Canvas camera={{ position: [0, 0, 8], fov: 45 }}>
                        <Earth />
                    </Canvas>
                </motion.div>
            </section >

            {/* Features Section */}
            < section className="py-20 bg-white/5 backdrop-blur-sm" >
                <div className="container mx-auto px-4">
                    <motion.h2
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6 }}
                        className="text-3xl font-bold text-center mb-16"
                    >
                        Key Features
                    </motion.h2>
                    <div className="grid md:grid-cols-3 gap-8">
                        {[
                            {
                                icon: <Activity className="w-12 h-12 text-primary mb-4" />,
                                title: "Real-time Monitoring",
                                desc: "Track sentiment across platforms in real-time to stay ahead of the conversation."
                            },
                            {
                                icon: <BarChart className="w-12 h-12 text-secondary mb-4" />,
                                title: "Visual Insights",
                                desc: "Comprehensive dashboards with intuitive charts and graphs for easy analysis."
                            },
                            {
                                icon: <Search className="w-12 h-12 text-primary mb-4" />,
                                title: "Keyword Analysis",
                                desc: "Identify trending keywords and hashtags driving positive or negative sentiment."
                            }
                        ].map((feature, index) => (
                            <motion.div
                                key={index}
                                initial={{ opacity: 0, y: 30 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true, margin: "-100px" }}
                                transition={{ duration: 0.5, delay: index * 0.2 }}
                                whileHover={{ y: -10 }}
                            >
                                <GlassCard className="hover:bg-glass/80 h-full transition-colors duration-300">
                                    {feature.icon}
                                    <h3 className="text-xl font-bold mb-2">{feature.title}</h3>
                                    <p className="text-gray-600 dark:text-gray-400">
                                        {feature.desc}
                                    </p>
                                </GlassCard>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section >

            {/* How It Works Section */}
            < section className="py-20 relative overflow-hidden" >
                <div className="container mx-auto px-4 relative z-10">
                    <motion.h2
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="text-3xl font-bold text-center mb-16"
                    >
                        How It Works
                    </motion.h2>
                    <div className="grid md:grid-cols-3 gap-8 relative">
                        {/* Connecting Line (Desktop) */}
                        <div className="hidden md:block absolute top-12 left-[20%] right-[20%] h-0.5 bg-gradient-to-r from-transparent via-primary/30 to-transparent"></div>

                        {[
                            { step: "01", title: "Connect Accounts", desc: "Securely link your social media profiles to our platform." },
                            { step: "02", title: "AI Analysis", desc: "Our advanced AI processes comments and posts in real-time." },
                            { step: "03", title: "Get Insights", desc: "Receive actionable reports on brand sentiment and trends." }
                        ].map((item, index) => (
                            <motion.div
                                key={index}
                                initial={{ opacity: 0, y: 30 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: index * 0.2 }}
                                className="relative flex flex-col items-center text-center"
                            >
                                <div className="w-24 h-24 !rounded-full glass-card flex items-center justify-center mb-6 border border-primary/30 shadow-[0_0_20px_rgba(110,231,183,0.2)] bg-[#0A0D12]">
                                    <span className="text-2xl font-bold text-primary">{item.step}</span>
                                </div>
                                <h3 className="text-xl font-bold mb-3">{item.title}</h3>
                                <p className="text-gray-400 max-w-xs">{item.desc}</p>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section >

            {/* Live Analysis Example Section */}
            < section className="py-20 bg-white/5 backdrop-blur-sm" >
                <div className="container mx-auto px-4">
                    <div className="grid lg:grid-cols-2 gap-12 items-center">
                        <motion.div
                            initial={{ opacity: 0, x: -30 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                        >
                            <h2 className="text-3xl font-bold mb-6">See What They Really Think</h2>
                            <p className="text-lg text-gray-400 mb-8">
                                Don't just guess. Know exactly how your audience feels with our granular sentiment breakdown. We detect nuance, sarcasm, and emotion in every interaction.
                            </p>
                            <ul className="space-y-4">
                                {['Instant Sentiment Scoring', 'Emotion Detection (Joy, Anger, etc.)', 'Topic Clustering'].map((item, i) => (
                                    <li key={i} className="flex items-center gap-3">
                                        <div className="w-2 h-2 rounded-full bg-primary shadow-[0_0_10px_rgba(110,231,183,0.8)]" />
                                        <span className="text-gray-200">{item}</span>
                                    </li>
                                ))}
                            </ul>
                        </motion.div>

                        <motion.div
                            initial={{ opacity: 0, x: 30 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            className="relative"
                        >
                            {/* Abstract decorative elements behind */}
                            <div className="absolute -top-10 -right-10 w-40 h-40 bg-purple-500/20 rounded-full blur-2xl" />
                            <div className="absolute -bottom-10 -left-10 w-40 h-40 bg-blue-500/20 rounded-full blur-2xl" />

                            <GlassCard className="rotate-2 hover:rotate-0 transition-transform duration-500">
                                <div className="flex items-start gap-4 mb-6">
                                    <div className="w-10 h-10 rounded-full bg-gray-600 animate-pulse" />
                                    <div className="flex-1">
                                        <div className="h-4 w-24 bg-gray-700 rounded mb-2"/>
                                        <div className="h-3 w-16 bg-gray-800 rounded"/>
                                    </div>
                                    <span className="text-xs text-gray-500">2m ago</span>
                                </div>
                                <p className="text-gray-300 mb-6 italic">
                                    "Honestly, the new update for the app is a game changer! I was skeptical at first, but the UI is so smooth now. Great job team!"
                                </p>
                                <div className="border-t border-white/10 pt-4">
                                    <div className="flex justify-between items-center mb-2">
                                        <span className="text-sm text-gray-400">Analysis Result</span>
                                        <span className="text-xs font-bold text-green-400 bg-green-400/10 px-2 py-1 rounded">POSITIVE</span>
                                    </div>
                                    <div className="space-y-2">
                                        <div className="flex justify-between text-xs">
                                            <span>Positivity</span>
                                            <span>92%</span>
                                        </div>
                                        <div className="h-1.5 w-full bg-gray-800 rounded-full overflow-hidden">
                                            <div className="h-full bg-green-400 w-[92%]" />
                                        </div>
                                        <div className="flex justify-between text-xs mt-1">
                                            <span>Engagement</span>
                                            <span>High</span>
                                        </div>
                                        <div className="h-1.5 w-full bg-gray-800 rounded-full overflow-hidden">
                                            <div className="h-full bg-blue-400 w-[85%]" />
                                        </div>
                                    </div>
                                </div>
                            </GlassCard>
                        </motion.div>
                    </div>
                </div>
            </section >

            {/* Call To Action */}
            < section className="py-32 relative overflow-hidden text-center" >
                <div className="absolute inset-0 bg-gradient-to-b from-transparent to-primary/5 pointer-events-none" />
                <div className="container mx-auto px-4 relative z-10">
                    <motion.h2
                        initial={{ opacity: 0, scale: 0.9 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: true }}
                        className="text-4xl md:text-5xl font-bold mb-8"
                    >
                        Ready to Transform Your Brand?
                    </motion.h2>
                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="text-xl text-gray-400 mb-10 max-w-2xl mx-auto"
                    >
                        Join thousands of marketers who are already using SentimentAI to understand their audience better.
                    </motion.p>
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                    >
                        <Link to="/register" className="glass-btn text-lg px-10 py-4 rounded-full shadow-[0_0_40px_rgba(110,231,183,0.3)] hover:shadow-[0_0_60px_rgba(110,231,183,0.5)] transition-shadow duration-300">
                            Start Analyzing Now <ArrowRight className="inline-block ml-2 group-hover:translate-x-1 transition-transform" />
                        </Link>
                    </motion.div>
                </div>
            </section >
        </>
    );
};

export default Landing;
