import React from 'react';
import { motion } from 'framer-motion';

const Loader = ({ fullScreen = false }) => {
    const containerClass = fullScreen
        ? 'fixed inset-0 z-50 bg-black/60 backdrop-blur-md flex justify-center items-center'
        : 'w-full h-full min-h-[50vh] flex justify-center items-center';

    return (
        <div className={containerClass}>
            <div className="relative flex justify-center items-center">
                {/* Outer Ring */}
                <motion.div
                    animate={{ rotate: 360 }}
                    transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                    className="w-24 h-24 border-4 border-primary/30 border-t-primary rounded-full absolute"
                />

                {/* Inner Ring */}
                <motion.div
                    animate={{ rotate: -360 }}
                    transition={{ duration: 1.5, repeat: Infinity, ease: "linear" }}
                    className="w-16 h-16 border-4 border-secondary/30 border-b-secondary rounded-full absolute"
                />

                {/* Center Pulse */}
                <motion.div
                    animate={{ scale: [1, 1.2, 1], opacity: [0.5, 1, 0.5] }}
                    transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
                    className="w-4 h-4 bg-white rounded-full"
                />
            </div>
        </div>
    );
};

export default Loader;
