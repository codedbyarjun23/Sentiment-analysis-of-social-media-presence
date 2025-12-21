import React from 'react';
import Navbar from './Navbar';
import Footer from './Footer';

const Layout = ({ children }) => {
    return (
        <div className="flex flex-col min-h-screen">
            <main className="flex-grow pb-32 px-4">
                {children}
            </main>
            <Navbar />

        </div>
    );
};

export default Layout;
