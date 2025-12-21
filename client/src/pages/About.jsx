import React from 'react';

import GlassCard from '../components/GlassCard';

const About = () => {
    return (
        <div className="container mx-auto px-4 py-12">
            <GlassCard className="max-w-4xl mx-auto">
                <h1 className="text-4xl font-bold mb-6 text-center text-primary">About This Project</h1>
                <p className="text-lg text-gray-700 dark:text-gray-300 mb-8 leading-relaxed text-center">
                    This project focuses on developing a sentiment analysis tool to evaluate social media presence, analyzing posts, comments, and interactions to gauge public opinion and inform marketing strategies.
                </p>

                <div className="grid md:grid-cols-2 gap-8 mt-12">
                    <div>
                        <h2 className="text-2xl font-bold mb-4">Objectives</h2>
                        <ul className="list-disc list-inside space-y-2 text-gray-700 dark:text-gray-300">
                            <li>Monitor public sentiment on social media</li>
                            <li>Assess brand reputation in real-time</li>
                            <li>Provide actionable insights for marketing teams</li>
                            <li>Identify trending topics and keywords</li>
                        </ul>
                    </div>
                    <div>
                        <h2 className="text-2xl font-bold mb-4">Tech Stack</h2>
                        <div className="flex flex-wrap gap-3">
                            <span className="px-4 py-2 bg-green-100 text-green-800 rounded-full font-medium">MongoDB</span>
                            <span className="px-4 py-2 bg-gray-100 text-gray-800 rounded-full font-medium">Express.js</span>
                            <span className="px-4 py-2 bg-blue-100 text-blue-800 rounded-full font-medium">React.js</span>
                            <span className="px-4 py-2 bg-green-100 text-green-800 rounded-full font-medium">Node.js</span>
                            <span className="px-4 py-2 bg-purple-100 text-purple-800 rounded-full font-medium">Tailwind CSS</span>
                        </div>
                    </div>
                </div>

                <div className="mt-12 p-6 bg-white/20 rounded-xl border border-white/30">
                    <h2 className="text-2xl font-bold mb-4">Future Enhancements</h2>
                    <ul className="list-disc list-inside space-y-2 text-gray-700 dark:text-gray-300">
                        <li>Real social media API integration (Twitter/X, Instagram, etc.)</li>
                        <li>More advanced NLP models with deep learning</li>
                        <li>Automated report generation and email alerts</li>
                    </ul>
                </div>
            </GlassCard>
        </div>
    );
};

export default About;
