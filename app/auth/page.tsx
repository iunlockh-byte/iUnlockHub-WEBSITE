"use client";

import { useState } from 'react';
import { createClient } from '@/utils/supabase/client';
import { LogIn, UserPlus, Mail, Lock, ShieldCheck, ArrowRight, Github, Apple, Chrome } from 'lucide-react';
import Header from '@/components/Header';
import Link from 'next/link';

export default function AuthPage() {
    const [isLogin, setIsLogin] = useState(true);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState<{ type: 'success' | 'error', text: string } | null>(null);

    const supabase = createClient();

    const handleAuth = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setMessage(null);

        try {
            if (isLogin) {
                const { error } = await supabase.auth.signInWithPassword({
                    email,
                    password,
                });
                if (error) throw error;
                setMessage({ type: 'success', text: 'Welcome back! Redirecting...' });
                setTimeout(() => window.location.href = '/', 2000);
            } else {
                const { error } = await supabase.auth.signUp({
                    email,
                    password,
                    options: {
                        emailRedirectTo: `${window.location.origin}/auth/callback`,
                    },
                });
                if (error) throw error;
                setMessage({ type: 'success', text: 'Success! Check your email for the confirmation link.' });
            }
        } catch (error: any) {
            setMessage({ type: 'error', text: error.message });
        } finally {
            setLoading(false);
        }
    };

    const handleOAuth = async (provider: 'google' | 'github' | 'apple') => {
        setLoading(true);
        setMessage(null);
        try {
            const { error } = await supabase.auth.signInWithOAuth({
                provider,
                options: {
                    redirectTo: `${window.location.origin}/auth/callback`,
                },
            });
            if (error) throw error;
        } catch (error: any) {
            setMessage({ type: 'error', text: error.message });
            setLoading(false);
        }
    };

    return (
        <main className="min-h-screen bg-black text-white flex flex-col">
            <Header />

            <div className="flex-1 flex items-center justify-center p-4 pt-32 pb-20 relative overflow-hidden">
                {/* Background Glow */}
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-red-600/10 blur-[120px] rounded-full pointer-events-none" />

                <div className="w-full max-w-md relative z-10">
                    <div className="bg-neutral-900/50 backdrop-blur-xl border border-neutral-800 rounded-[2.5rem] p-8 md:p-10 shadow-2xl">

                        <div className="text-center mb-10">
                            <div className="w-16 h-16 bg-red-600/20 rounded-2xl flex items-center justify-center mx-auto mb-6 border border-red-500/20">
                                {isLogin ? <LogIn className="w-8 h-8 text-red-500" /> : <UserPlus className="w-8 h-8 text-red-500" />}
                            </div>
                            <h2 className="text-3xl font-black tracking-tight mb-2">
                                {isLogin ? 'Welcome Back' : 'Join the Hub'}
                            </h2>
                            <p className="text-zinc-500 text-sm">
                                {isLogin ? 'Access your account and track your orders.' : 'Create an account to start reviewing and sharing.'}
                            </p>
                        </div>

                        {message && (
                            <div className={`mb-6 p-4 rounded-2xl text-sm font-medium flex items-center gap-3 animate-in fade-in slide-in-from-top-2 duration-300 ${message.type === 'success' ? 'bg-green-500/10 text-green-400 border border-green-500/20' : 'bg-red-500/10 text-red-400 border border-red-500/20'
                                }`}>
                                <ShieldCheck className="w-5 h-5 min-w-[1.25rem]" />
                                {message.text}
                            </div>
                        )}

                        <form onSubmit={handleAuth} className="space-y-6">
                            <div className="space-y-2">
                                <label className="text-xs font-bold text-zinc-500 uppercase tracking-widest px-1">Email Address</label>
                                <div className="relative group">
                                    <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-zinc-500 group-focus-within:text-red-500 transition-colors" />
                                    <input
                                        type="email"
                                        required
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                        className="w-full bg-black/40 border border-neutral-800 rounded-2xl py-4 pl-12 pr-4 text-white focus:outline-none focus:border-red-600/50 transition-all placeholder:text-zinc-700"
                                        placeholder="name@example.com"
                                    />
                                </div>
                            </div>

                            <div className="space-y-2">
                                <label className="text-xs font-bold text-zinc-500 uppercase tracking-widest px-1">Password</label>
                                <div className="relative group">
                                    <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-zinc-500 group-focus-within:text-red-500 transition-colors" />
                                    <input
                                        type="password"
                                        required
                                        value={password}
                                        onChange={(e) => setPassword(e.target.value)}
                                        className="w-full bg-black/40 border border-neutral-800 rounded-2xl py-4 pl-12 pr-4 text-white focus:outline-none focus:border-red-600/50 transition-all placeholder:text-zinc-700"
                                        placeholder="••••••••"
                                    />
                                </div>
                            </div>

                            <button
                                type="submit"
                                disabled={loading}
                                className="w-full bg-red-600 hover:bg-red-700 disabled:opacity-50 text-white font-bold py-4 rounded-2xl transition-all shadow-lg shadow-red-600/20 flex items-center justify-center gap-2 group"
                            >
                                {loading ? 'Processing...' : isLogin ? 'Sign In' : 'Create Account'}
                                {!loading && <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />}
                            </button>
                        </form>

                        <div className="mt-8 flex items-center gap-4">
                            <div className="flex-1 h-px bg-neutral-800" />
                            <span className="text-zinc-600 text-[10px] uppercase font-bold tracking-widest">Or continue with</span>
                            <div className="flex-1 h-px bg-neutral-800" />
                        </div>

                        <div className="mt-8 grid grid-cols-3 gap-4">
                            <button
                                onClick={() => handleOAuth('google')}
                                disabled={loading}
                                className="flex items-center justify-center p-4 bg-black/40 border border-neutral-800 rounded-2xl hover:border-zinc-700 hover:bg-black/60 transition-all group"
                                title="Sign in with Google"
                            >
                                <Chrome className="w-5 h-5 text-zinc-400 group-hover:text-white transition-colors" />
                            </button>
                            <button
                                onClick={() => handleOAuth('apple')}
                                disabled={loading}
                                className="flex items-center justify-center p-4 bg-black/40 border border-neutral-800 rounded-2xl hover:border-zinc-700 hover:bg-black/60 transition-all group"
                                title="Sign in with Apple"
                            >
                                <Apple className="w-5 h-5 text-zinc-400 group-hover:text-white transition-colors" />
                            </button>
                            <button
                                onClick={() => handleOAuth('github')}
                                disabled={loading}
                                className="flex items-center justify-center p-4 bg-black/40 border border-neutral-800 rounded-2xl hover:border-zinc-700 hover:bg-black/60 transition-all group"
                                title="Sign in with GitHub"
                            >
                                <Github className="w-5 h-5 text-zinc-400 group-hover:text-white transition-colors" />
                            </button>
                        </div>

                        <div className="mt-8 pt-8 border-t border-neutral-800 text-center">
                            <p className="text-zinc-500 text-sm">
                                {isLogin ? "Don't have an account?" : "Already have an account?"}
                                <button
                                    onClick={() => setIsLogin(!isLogin)}
                                    className="ml-2 text-red-500 font-bold hover:underline"
                                >
                                    {isLogin ? 'Sign Up' : 'Login'}
                                </button>
                            </p>
                        </div>
                    </div>

                    <div className="mt-12 text-center text-zinc-600 text-xs">
                        By continuing, you agree to iUnlock Hub's
                        <Link href="/terms" className="text-zinc-400 hover:text-white mx-1">Terms</Link>
                        and
                        <Link href="/privacy" className="text-zinc-400 hover:text-white mx-1">Privacy Policy</Link>
                    </div>
                </div>
            </div>
        </main>
    );
}
