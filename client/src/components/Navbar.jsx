import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { BarChart2, Menu, X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import ThemeToggle from './ThemeToggle';

const FlipLink = ({ children, to, isActive }) => {
    return (
        <Link to={to} className="relative block overflow-hidden whitespace-nowrap group">
            <motion.div
                initial={false}
                animate={isActive ? { y: "-100%" } : { y: 0 }}
                whileHover={{ y: "-100%" }}
                transition={{ duration: 0.3, ease: "easeInOut" }}
                className="relative"
            >
                <div className={`px-4 py-2 text-sm font-medium transition-colors duration-300 ${isActive ? 'text-primary' : 'text-gray-600 dark:text-gray-300'}`}>
                    {children}
                </div>
                <div className={`absolute top-full left-0 w-full px-4 py-2 text-sm font-medium text-primary bg-primary/10 rounded-md`}>
                    {children}
                </div>
            </motion.div>
        </Link>
    );
};

const Navbar = () => {
    const [isOpen, setIsOpen] = useState(false);
    const location = useLocation();

    const navLinks = [
        { name: 'Home', path: '/' },
        { name: 'Dashboard', path: '/dashboard' },
        { name: 'Analyze', path: '/analyze' },
        { name: 'About', path: '/about' },
        { name: 'Contact', path: '/contact' },
    ];

    return (
        <motion.nav
            className="fixed bottom-0 left-0 right-0 z-50 flex justify-center pb-6 px-4 pointer-events-none"
        >
            <div className="w-full max-w-5xl glass-navbar rounded-full px-6 py-3 flex items-center justify-between pointer-events-auto">

                {/* Logo */}
                <Link to="/" className="flex items-center gap-2 group">
                    <div className="p-2 bg-primary/10 rounded-full group-hover:bg-primary/20 transition-colors">
                        <BarChart2 className="w-6 h-6 text-primary" />
                    </div>
                    <span className="font-bold text-lg tracking-tight">SentimentAI</span>
                </Link>

                {/* Desktop Links */}
                <div className="hidden md:flex items-center gap-2">
                    {navLinks.map((link) => (
                        <FlipLink key={link.name} to={link.path} isActive={location.pathname === link.path}>
                            {link.name}
                        </FlipLink>
                    ))}
                </div>

                {/* CTA / Login */}
                <div className="hidden md:flex items-center gap-4">
                    <ThemeToggle />
                    {localStorage.getItem('token') ? (
                        <button
                            onClick={() => {
                                localStorage.removeItem('token');
                                window.location.href = '/login';
                            }}
                            className="px-6 py-2 rounded-full bg-red-500/10 text-red-500 font-semibold text-sm hover:bg-red-500/20 transition-colors"
                        >
                            Logout
                        </button>
                    ) : (
                        <Link to="/login">
                            <motion.button
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                                className="px-6 py-2 rounded-full bg-primary text-gray-900 font-semibold text-sm shadow-md hover:shadow-lg transition-shadow"
                            >
                                Login
                            </motion.button>
                        </Link>
                    )}
                </div>

                {/* Mobile Menu Button */}
                <button
                    onClick={() => setIsOpen(!isOpen)}
                    className="md:hidden p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
                >
                    {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
                </button>
            </div>

            {/* Mobile Menu Dropdown (Upwards) */}
            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ opacity: 0, y: 20, scale: 0.95 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: 20, scale: 0.95 }}
                        transition={{ duration: 0.2 }}
                        className="absolute bottom-24 left-4 right-4 bg-white/90 dark:bg-gray-900/90 backdrop-blur-xl border border-white/20 rounded-2xl p-4 shadow-xl md:hidden pointer-events-auto"
                    >
                        <div className="flex flex-col gap-2">
                            {navLinks.map((link) => (
                                <Link
                                    key={link.name}
                                    to={link.path}
                                    onClick={() => setIsOpen(false)}
                                    className={`px-4 py-3 rounded-xl text-sm font-medium transition-colors ${location.pathname === link.path
                                        ? 'bg-primary/10 text-primary'
                                        : 'hover:bg-gray-100 dark:hover:bg-gray-800'
                                        }`}
                                >
                                    {link.name}
                                </Link>
                            ))}
                            <div className="h-px bg-gray-200 dark:bg-gray-700 my-2" />
                            <div className="flex justify-between items-center px-4">
                                <span className="text-sm font-medium text-gray-600 dark:text-gray-300">Theme</span>
                                <ThemeToggle />
                            </div>
                            <div className="h-px bg-gray-200 dark:bg-gray-700 my-2" />
                            {localStorage.getItem('token') ? (
                                <button
                                    onClick={() => {
                                        localStorage.removeItem('token');
                                        setIsOpen(false);
                                        window.location.href = '/login';
                                    }}
                                    className="px-4 py-3 rounded-xl text-sm font-bold text-center bg-red-500/10 text-red-500 w-full"
                                >
                                    Logout
                                </button>
                            ) : (
                                <Link
                                    to="/login"
                                    onClick={() => setIsOpen(false)}
                                    className="px-4 py-3 rounded-xl text-sm font-bold text-center bg-primary text-gray-900"
                                >
                                    Login
                                </Link>
                            )}
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </motion.nav>
    );
};

export default Navbar;
