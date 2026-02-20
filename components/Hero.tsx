import Link from 'next/link';
import { ShieldCheck, Zap, Globe, Lock } from 'lucide-react';

export default function Hero() {
    return (
        <section className="relative min-h-screen flex items-center justify-center pt-20 overflow-hidden bg-black">
            {/* Background Effects */}
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-[500px] bg-red-600/20 blur-[120px] rounded-full opacity-50 pointer-events-none" />
            <div className="absolute bottom-0 right-0 w-[500px] h-[500px] bg-red-900/10 blur-[100px] rounded-full pointer-events-none" />

            <div className="container mx-auto px-4 relative z-10 grid lg:grid-cols-2 gap-12 items-center">
                <div className="text-left space-y-6">
                    <div className="inline-flex items-center gap-2 px-3 py-1 bg-red-500/10 border border-red-500/20 rounded-full text-red-400 text-xs font-medium uppercase tracking-wider">
                        <span className="w-2 h-2 rounded-full bg-red-500 animate-pulse" />
                        Official iCloud Unlock Service
                    </div>

                    <h1 className="text-5xl md:text-7xl font-bold tracking-tight text-white leading-tight">
                        Unlock Your <br />
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-red-500 to-red-800">
                            iPhone Instantly
                        </span>
                    </h1>

                    <p className="text-lg text-gray-400 max-w-xl">
                        The world&apos;s most trusted remote unlocking service. We support all iPhone models and iOS versions. Safe, secure, and permanent.
                    </p>

                    <div className="flex flex-wrap items-center gap-4 pt-4">
                        <Link
                            href="/order"
                            className="px-8 py-4 bg-red-600 hover:bg-red-700 text-white font-bold rounded-xl transition-all shadow-[0_0_20px_rgba(220,38,38,0.5)] hover:shadow-[0_0_30px_rgba(220,38,38,0.8)] hover:scale-105 active:scale-95"
                        >
                            Start Unlocking
                        </Link>
                        <Link
                            href="#services"
                            className="px-8 py-4 bg-white/5 hover:bg-white/10 border border-white/10 hover:border-white/20 text-white font-semibold rounded-xl transition-all"
                        >
                            View Services
                        </Link>
                    </div>

                    <div className="grid grid-cols-3 gap-6 pt-8 border-t border-white/10 mt-8">
                        <div className="space-y-2">
                            <ShieldCheck className="w-8 h-8 text-red-500" />
                            <p className="text-sm font-medium text-gray-300">100% Secure</p>
                        </div>
                        <div className="space-y-2">
                            <Zap className="w-8 h-8 text-red-500" />
                            <p className="text-sm font-medium text-gray-300">Fast Delivery</p>
                        </div>
                        <div className="space-y-2">
                            <Globe className="w-8 h-8 text-red-500" />
                            <p className="text-sm font-medium text-gray-300">Global Support</p>
                        </div>
                    </div>
                </div>

                <div className="relative hidden lg:block">
                    {/* Placeholder for iPhone Image - effectively a glass card reflecting the aesthetic */}
                    <div className="relative z-10 mx-auto w-[320px] h-[650px] bg-gradient-to-b from-gray-800 to-black rounded-[3rem] border-8 border-gray-900 shadow-2xl p-4 overflow-hidden transform rotate-[-5deg] hover:rotate-0 transition-all duration-500">
                        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-1/3 h-7 bg-black rounded-b-3xl z-20"></div>
                        <div className="w-full h-full bg-neutral-900 rounded-[2.5rem] relative overflow-hidden flex flex-col">
                            {/* Mock UI */}
                            <div className="flex-1 flex flex-col items-center justify-center p-6 space-y-4">
                                <div className="w-16 h-16 rounded-full bg-red-600/20 flex items-center justify-center">
                                    <Lock className="w-8 h-8 text-red-500" />
                                </div>
                                <div className="text-center">
                                    <h3 className="text-white font-semibold text-xl">iPhone Locked</h3>
                                    <p className="text-gray-500 text-sm">Waiting for unlock...</p>
                                </div>
                                <div className="w-full h-1 bg-gray-800 rounded-full overflow-hidden mt-8">
                                    <div className="w-2/3 h-full bg-red-600 animate-[loading_2s_ease-in-out_infinite]"></div>
                                </div>
                            </div>
                            <div className="bg-red-600 p-4 text-center">
                                <p className="text-white font-bold text-sm">UNLOCK SUCCESSFUL</p>
                            </div>
                        </div>
                    </div>

                    {/* Glow behind phone */}
                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] h-[700px] bg-red-600/20 blur-[80px] -z-10 rounded-full" />
                </div>
            </div>
        </section>
    );
}
