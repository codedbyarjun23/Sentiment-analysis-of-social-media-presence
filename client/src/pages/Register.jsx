import React, { useState } from 'react';
import { toast } from 'react-hot-toast';

import GlassCard from '../components/GlassCard';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { motion } from 'framer-motion';

const Register = () => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: '',
        confirmPassword: '',
    });
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const { name, email, password, confirmPassword } = formData;

    const onChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

    const onSubmit = async (e) => {
        e.preventDefault();
        if (password !== confirmPassword) {
            setError("Passwords don't match");
            toast.error("Passwords do not match");
            return;
        }
        const loadingToast = toast.loading('Creating account...');
        try {
            const res = await axios.post(`${import.meta.env.VITE_API_URL}/api/auth/register`, { name, email, password });
            localStorage.setItem('token', res.data.token);
            toast.success('Registration successful!', { id: loadingToast });
            navigate('/dashboard');
        } catch (err) {
            const msg = err.response?.data?.msg || 'Registration failed';
            setError(msg);
            toast.error(msg, { id: loadingToast });
        }
    };

    return (
        <div className="flex justify-center items-center min-h-[calc(100vh-64px)]">
            <motion.div
                initial={{ opacity: 0, y: 30, scale: 0.95 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                transition={{ duration: 0.5 }}
                className="w-full max-w-md"
            >
                <GlassCard className="w-full">
                    <h2 className="text-3xl font-bold text-center mb-6">Register</h2>
                    {error && <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} className="bg-red-500/20 text-red-700 dark:text-red-200 p-3 rounded mb-4 text-center border border-red-500/30">{error}</motion.div>}
                    <form onSubmit={onSubmit}>
                        <div className="mb-4">
                            <label className="block text-gray-700 dark:text-gray-300 text-sm font-bold mb-2">Name</label>
                            <input
                                type="text"
                                name="name"
                                value={name}
                                onChange={onChange}
                                className="glass-input w-full"
                                required
                            />
                        </div>
                        <div className="mb-4">
                            <label className="block text-gray-700 dark:text-gray-300 text-sm font-bold mb-2">Email</label>
                            <input
                                type="email"
                                name="email"
                                value={email}
                                onChange={onChange}
                                className="glass-input w-full"
                                required
                            />
                        </div>
                        <div className="mb-4">
                            <label className="block text-gray-700 dark:text-gray-300 text-sm font-bold mb-2">Password</label>
                            <input
                                type="password"
                                name="password"
                                value={password}
                                onChange={onChange}
                                className="glass-input w-full"
                                required
                            />
                        </div>
                        <div className="mb-6">
                            <label className="block text-gray-700 dark:text-gray-300 text-sm font-bold mb-2">Confirm Password</label>
                            <input
                                type="password"
                                name="confirmPassword"
                                value={confirmPassword}
                                onChange={onChange}
                                className="glass-input w-full"
                                required
                            />
                        </div>
                        <motion.button
                            whileHover={{ scale: 1.02 }}
                            whileTap={{ scale: 0.98 }}
                            type="submit"
                            className="glass-btn w-full"
                        >
                            Register
                        </motion.button>
                    </form>
                    <p className="mt-4 text-center text-sm text-gray-600 dark:text-gray-400">
                        Already have an account? <Link to="/login" className="text-primary hover:underline">Login</Link>
                    </p>
                </GlassCard>
            </motion.div>
        </div>
    );
};

export default Register;
