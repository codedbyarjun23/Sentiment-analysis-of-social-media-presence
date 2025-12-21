import React from 'react';

import { twMerge } from 'tailwind-merge';

const GlassCard = ({ children, className }) => {
    return (
        <div className={twMerge('glass-card p-6', className)}>
            {children}
        </div>
    );
};

export default GlassCard;
