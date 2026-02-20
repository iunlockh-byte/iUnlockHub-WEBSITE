"use client";

import { ShieldAlert, ArrowLeft, RefreshCw } from 'lucide-react';
import Link from 'next/link';
import Header from '@/components/Header';

export default function AuthErrorPage() {
    return (
        <main className="min-h-screen bg-black text-white flex flex-col">
            <Header />

            <div className="flex-1 flex items-center justify-center p-4">
                <div className="w-full max-w-md bg-neutral-900/50 backdrop-blur-xl border border-neutral-800 rounded-[2.5rem] p-8 md:p-12 text-center shadow-2xl relative overflow-hidden">
                    {/* Background Glow */}
                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full bg-red-600/5 blur-[80px] rounded-full pointer-events-none" />

                    <div className="relative z-10">
                        <div className="w-20 h-20 bg-red-600/20 rounded-2xl flex items-center justify-center mx-auto mb-8 border border-red-500/20">
                            <ShieldAlert className="w-10 h-10 text-red-500" />
                        </div>

                        <h1 className="text-3xl font-black tracking-tight mb-4 text-white">
                            Authentication Failed
                        </h1>

                        <p className="text-zinc-500 mb-8 leading-relaxed">
                            Something went wrong while trying to sign you in. This could be due to an expired link, a network issue, or missing platform configuration.
                        </p>

                        <div className="space-y-4">
                            <Link
                                href="/auth"
                                className="w-full bg-red-600 hover:bg-red-700 text-white font-bold py-4 rounded-2xl transition-all shadow-lg shadow-red-600/20 flex items-center justify-center gap-2"
                            >
                                <RefreshCw className="w-5 h-5" />
                                Try Signing In Again
                            </Link>

                            <Link
                                href="/"
                                className="w-full bg-neutral-800 hover:bg-neutral-700 text-white font-bold py-4 rounded-2xl transition-all flex items-center justify-center gap-2"
                            >
                                <ArrowLeft className="w-5 h-5" />
                                Back to Homepage
                            </Link>
                        </div>

                        <div className="mt-8 pt-8 border-t border-neutral-800">
                            <p className="text-zinc-600 text-[10px] uppercase font-bold tracking-widest">
                                Need help? Contact us on WhatsApp
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </main>
    );
}
