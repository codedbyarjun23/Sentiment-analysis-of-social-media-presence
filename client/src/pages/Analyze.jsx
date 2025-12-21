import React, { useState, useEffect } from 'react';
import { toast } from 'react-hot-toast';

import GlassCard from '../components/GlassCard';
import axios from 'axios';
import { Send, CheckCircle, AlertCircle, HelpCircle } from 'lucide-react';

import { motion, AnimatePresence } from 'framer-motion';

const Analyze = () => {
    const [text, setText] = useState('');
    const [result, setResult] = useState(null);
    const [loading, setLoading] = useState(false);
    // Fetch recent analyses on mount
    const [history, setHistory] = useState([]);

    const fetchHistory = async () => {
        try {
            const res = await axios.get(`${import.meta.env.VITE_API_URL}/api/analyze`);
            setHistory(res.data);
        } catch (err) {
            console.error("Failed to fetch history", err);
        }
    };

    useEffect(() => {
        fetchHistory();
    }, []);

    const onAnalyze = async () => {
        if (!text) {
            toast.error("Please enter some text to analyze");
            return;
        }
        setLoading(true);
        setResult(null);
        // Toast promise handles loading, success, and error states automatically
        try {
            // We can't easily use toast.promise with our custom timeout logic if we want to be exact, 
            // but we can just use manual loading if we prefer control.
            // Let's use manual for consistency with the timeout.

            const responsePromise = axios.post(`${import.meta.env.VITE_API_URL}/api/analyze`, { text });

            await toast.promise(responsePromise, {
                loading: 'Analyzing sentiment...',
                success: 'Analysis complete!',
                error: 'Analysis failed. Please try again.'
            });

            const res = await responsePromise;

            // Keep the timeout for the visual transition if desired, but we have the data.
            setTimeout(() => {
                setResult(res.data);
                setLoading(false);
                fetchHistory(); // Refresh list
            }, 500);

        } catch (err) {
            console.error("Analysis failed", err);
            setLoading(false);
        }
    };

    return (
        <div className="container mx-auto px-4 py-8">
            <GlassCard className="max-w-3xl mx-auto mb-8">
                <motion.h1
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="text-3xl font-bold mb-6 text-center"
                >
                    Analyze Text Sentiment
                </motion.h1>
                <motion.p
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.1 }}
                    className="text-gray-600 dark:text-gray-400 text-center mb-8"
                >
                    Enter any text, tweet, or comment below to analyze its sentiment score and keywords.
                </motion.p>

                <div className="mb-6">
                    <textarea
                        className="glass-input w-full h-40 resize-none p-4 text-lg transition-all focus:ring-4 focus:ring-primary/20"
                        placeholder="Type or paste text here..."
                        value={text}
                        onChange={(e) => setText(e.target.value)}
                    />
                </div>

                <div className="text-center mb-8">
                    <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={onAnalyze}
                        disabled={loading || !text}
                        className={`glass-btn text-lg px-8 py-3 rounded-full flex items-center justify-center mx-auto ${loading || !text ? 'opacity-50 cursor-not-allowed' : ''}`}
                    >
                        {loading ? 'Analyzing...' : <><Send className="w-5 h-5 mr-2" /> Analyze Sentiment</>}
                    </motion.button>
                </div>

                <AnimatePresence>
                    {result && (
                        <motion.div
                            initial={{ opacity: 0, y: 20, height: 0 }}
                            animate={{ opacity: 1, y: 0, height: 'auto' }}
                            exit={{ opacity: 0, y: -20, height: 0 }}
                            transition={{ duration: 0.4 }}
                            className="overflow-hidden border-t border-gray-200 dark:border-gray-700 pt-8"
                        >
                            <h2 className="text-2xl font-bold mb-6">Analysis Results</h2>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pb-4">
                                <motion.div
                                    initial={{ scale: 0.8, opacity: 0 }}
                                    animate={{ scale: 1, opacity: 1 }}
                                    transition={{ delay: 0.2 }}
                                    className={`p-6 rounded-xl border flex flex-col items-center justify-center
                                        ${result.sentiment === 'Positive' ? 'bg-green-50/50 border-green-200 dark:bg-green-900/20 dark:border-green-800' :
                                            result.sentiment === 'Negative' ? 'bg-red-50/50 border-red-200 dark:bg-red-900/20 dark:border-red-800' :
                                                'bg-gray-50/50 border-gray-200 dark:bg-gray-800/20 dark:border-gray-700'}`}
                                >
                                    {result.sentiment === 'Positive' && <CheckCircle className="w-16 h-16 text-green-500 mb-4" />}
                                    {result.sentiment === 'Negative' && <AlertCircle className="w-16 h-16 text-red-500 mb-4" />}
                                    {result.sentiment === 'Neutral' && <HelpCircle className="w-16 h-16 text-gray-500 mb-4" />}

                                    <h3 className="text-2xl font-bold mb-1">{result.sentiment}</h3>
                                    <p className="text-gray-500">Overall Sentiment</p>
                                </motion.div>

                                <motion.div
                                    initial={{ x: 20, opacity: 0 }}
                                    animate={{ x: 0, opacity: 1 }}
                                    transition={{ delay: 0.3 }}
                                    className="p-6 rounded-xl border border-white/20 bg-white/10 dark:bg-black/10"
                                >
                                    <h3 className="text-xl font-bold mb-4">Confidence Score</h3>
                                    <div className="flex items-end mb-2">
                                        <span className="text-4xl font-bold text-primary">{(result.confidence * 100).toFixed(0)}%</span>
                                    </div>
                                    <div className="w-full bg-gray-200 rounded-full h-2.5 dark:bg-gray-700">
                                        <motion.div
                                            initial={{ width: 0 }}
                                            animate={{ width: `${result.confidence * 100}%` }}
                                            transition={{ duration: 1, ease: "easeOut" }}
                                            className="bg-primary h-2.5 rounded-full"
                                        ></motion.div>
                                    </div>

                                    <h3 className="text-xl font-bold mt-6 mb-3">Keywords Detected</h3>
                                    <div className="flex flex-wrap gap-2">
                                        {result.keywords && result.keywords.length > 0 ? (
                                            result.keywords.map((word, idx) => (
                                                <span key={idx} className="bg-white/30 border border-white/30 px-3 py-1 rounded-full text-sm">
                                                    {word}
                                                </span>
                                            ))
                                        ) : (
                                            <span className="text-gray-500 italic">No specific keywords detected.</span>
                                        )}
                                    </div>
                                </motion.div>
                            </div>
                        </motion.div>
                    )}
                </AnimatePresence>
            </GlassCard>

            {/* Recent Analyses List */}
            <GlassCard className="max-w-3xl mx-auto">
                <h3 className="text-xl font-bold mb-4">Recent Analyses</h3>
                <div className="overflow-x-auto">
                    <table className="w-full text-left border-collapse">
                        <thead>
                            <tr>
                                <th className="p-3 border-b border-gray-200 dark:border-gray-700 text-gray-500 font-medium text-sm">Text</th>
                                <th className="p-3 border-b border-gray-200 dark:border-gray-700 text-gray-500 font-medium text-sm">Sentiment</th>
                                <th className="p-3 border-b border-gray-200 dark:border-gray-700 text-gray-500 font-medium text-sm">Confidence</th>
                            </tr>
                        </thead>
                        <tbody>
                            {!Array.isArray(history) || history.length === 0 ? (
                                <tr>
                                    <td colSpan="3" className="p-4 text-center text-gray-500">No recent analyses found.</td>
                                </tr>
                            ) : (
                                history.map((item) => (
                                    <tr key={item._id || Math.random()} className="hover:bg-white/10 transition-colors">
                                        <td className="p-3 border-b border-gray-100 dark:border-gray-800 truncate max-w-xs">{item.text}</td>
                                        <td className="p-3 border-b border-gray-100 dark:border-gray-800">
                                            <span className={`text-xs font-medium px-2.5 py-0.5 rounded 
                                                    ${item.sentiment === 'Positive' ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300' :
                                                    item.sentiment === 'Negative' ? 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300' :
                                                        'bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-300'}`}>
                                                {item.sentiment}
                                            </span>
                                        </td>
                                        <td className="p-3 border-b border-gray-100 dark:border-gray-800 text-gray-500 text-sm">
                                            {item.confidence ? (item.confidence * 100).toFixed(0) : 0}%
                                        </td>
                                    </tr>
                                ))
                            )}
                        </tbody>
                    </table>
                </div>
            </GlassCard>
        </div>
    );
};

export default Analyze;
