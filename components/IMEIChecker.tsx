"use client";

import { useState } from 'react';
import Link from 'next/link';
import { Search, Loader2, CheckCircle2, XCircle, Info, ShieldCheck, Smartphone, Hash, Calendar, Lock, Shield } from 'lucide-react';

interface IMEIData {
    imei: string;
    model: string;
    serial: string;
    warrantyStatus: string;
    icloudStatus: 'On' | 'Off';
    blacklistStatus: 'Clean' | 'Blacklisted';
    purchaseDate: string;
    simLock: 'Locked' | 'Unlocked';
}

export default function IMEIChecker() {
    const [imei, setImei] = useState('');
    const [loading, setLoading] = useState(false);
    const [result, setResult] = useState<IMEIData | null>(null);
    const [error, setError] = useState('');

    const handleCheck = async (e: React.FormEvent) => {
        e.preventDefault();
        if (imei.length !== 15) {
            setError('IMEI must be exactly 15 digits');
            return;
        }

        setLoading(true);
        setError('');
        setResult(null);

        // Simulate API call
        await new Promise(resolve => setTimeout(resolve, 2000));

        // Mock result
        setResult({
            imei: imei,
            model: "iPhone 15 Pro Max (A3106)",
            serial: "N" + Math.random().toString(36).substring(2, 10).toUpperCase(),
            warrantyStatus: "Active - Limited Warranty",
            icloudStatus: "On",
            blacklistStatus: "Clean",
            purchaseDate: "October 15, 2023",
            simLock: "Unlocked"
        });
        setLoading(false);
    };

    return (
        <div className="w-full max-w-4xl mx-auto">
            <div className="bg-neutral-900/50 backdrop-blur-xl border border-neutral-800 rounded-3xl p-8 shadow-2xl mb-8">
                <div className="text-center mb-10">
                    <h2 className="text-3xl font-bold bg-gradient-to-r from-white to-gray-400 bg-clip-text text-transparent">
                        iPhone IMEI Check
                    </h2>
                    <p className="text-gray-400 mt-2">Get instant details about any iPhone model</p>
                </div>

                <form onSubmit={handleCheck} className="relative max-w-xl mx-auto">
                    <div className="relative">
                        <input
                            type="text"
                            value={imei}
                            onChange={(e) => setImei(e.target.value.replace(/\D/g, ''))}
                            placeholder="Enter 15-digit IMEI"
                            maxLength={15}
                            className="w-full bg-black/50 border border-neutral-800 rounded-2xl px-6 py-4 text-white text-lg focus:ring-2 focus:ring-red-600 focus:border-transparent outline-none transition-all pr-16"
                        />
                        <button
                            type="submit"
                            disabled={loading}
                            className="absolute right-2 top-2 bottom-2 bg-red-600 hover:bg-red-700 disabled:bg-neutral-800 text-white px-6 rounded-xl transition-all flex items-center justify-center group"
                        >
                            {loading ? <Loader2 className="w-5 h-5 animate-spin" /> : <Search className="w-5 h-5 group-hover:scale-110 transition-transform" />}
                        </button>
                    </div>
                    {error && <p className="text-red-500 text-sm mt-2 ml-2 flex items-center gap-1"><XCircle className="w-4 h-4" /> {error}</p>}
                </form>

                <div className="mt-8 flex items-center justify-center gap-6 text-xs text-gray-500 font-medium tracking-wider uppercase">
                    <span className="flex items-center gap-1"><ShieldCheck className="w-3 h-3 text-red-500" /> Secure Check</span>
                    <span className="flex items-center gap-1"><Info className="w-3 h-3 text-red-500" /> Precise Data</span>
                    <span className="flex items-center gap-1"><Smartphone className="w-3 h-3 text-red-500" /> All Models</span>
                </div>
            </div>

            {loading && (
                <div className="flex flex-col items-center justify-center py-20 space-y-4 animate-in fade-in duration-500">
                    <div className="relative">
                        <div className="w-16 h-16 border-4 border-red-600/20 border-t-red-600 rounded-full animate-spin"></div>
                        <Smartphone className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-6 h-6 text-red-500" />
                    </div>
                    <p className="text-gray-400 font-medium animate-pulse">Connecting to Global Database...</p>
                </div>
            )}

            {result && !loading && (
                <div className="animate-in fade-in slide-in-from-bottom-8 duration-700">
                    <div className="bg-neutral-900/50 backdrop-blur-xl border border-neutral-800 rounded-3xl overflow-hidden shadow-2xl">
                        {/* Status Header */}
                        <div className="bg-gradient-to-r from-red-600/10 to-transparent p-6 border-b border-neutral-800 flex items-center justify-between">
                            <div className="flex items-center gap-3">
                                <div className="w-12 h-12 bg-red-600/20 rounded-xl flex items-center justify-center">
                                    <Smartphone className="w-6 h-6 text-red-500" />
                                </div>
                                <div>
                                    <h3 className="text-xl font-bold text-white">{result.model}</h3>
                                    <p className="text-gray-500 text-sm">IMEI: {result.imei}</p>
                                </div>
                            </div>
                            <div className="text-right">
                                <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-green-500/10 border border-green-500/20 rounded-full text-green-500 text-xs font-bold uppercase tracking-wider">
                                    <CheckCircle2 className="w-3 h-3" /> Result Ready
                                </span>
                            </div>
                        </div>

                        {/* Details Grid */}
                        <div className="p-8 grid md:grid-cols-2 gap-8">
                            <div className="space-y-6">
                                <DetailItem icon={Hash} label="Serial Number" value={result.serial} />
                                <DetailItem icon={Calendar} label="Estimated Purchase" value={result.purchaseDate} />
                                <DetailItem icon={Shield} label="Warranty Status" value={result.warrantyStatus} />
                            </div>
                            <div className="space-y-6">
                                <DetailItem
                                    icon={Lock}
                                    label="Find My iPhone (iCloud)"
                                    value={result.icloudStatus}
                                    color={result.icloudStatus === 'On' ? 'text-red-500' : 'text-green-500'}
                                />
                                <DetailItem
                                    icon={Shield}
                                    label="Blacklist Status"
                                    value={result.blacklistStatus}
                                    color={result.blacklistStatus === 'Clean' ? 'text-green-500' : 'text-red-500'}
                                />
                                <DetailItem icon={Smartphone} label="SIM Lock Status" value={result.simLock} />
                            </div>
                        </div>

                        {/* Footer Action */}
                        <div className="bg-black/40 p-10 border-t border-neutral-800 flex flex-col items-center justify-center gap-6">
                            <div className="text-center">
                                <p className="text-white text-lg font-bold mb-2">Device is ready for unlocking!</p>
                                <p className="text-gray-400 text-sm">Transfer these details directly to our secure order form.</p>
                            </div>

                            <Link
                                href={`/order?imei=${result.imei}&model=${encodeURIComponent(result.model)}&serial=${result.serial}`}
                                className="inline-flex items-center gap-3 px-10 py-5 bg-red-600 hover:bg-red-700 text-white text-xl font-bold rounded-2xl transition-all shadow-[0_0_30px_rgba(220,38,38,0.3)] hover:shadow-[0_0_50px_rgba(220,38,38,0.5)] hover:scale-105 active:scale-95"
                            >
                                <Lock className="w-6 h-6" /> Unlock Now
                            </Link>

                            <p className="text-gray-500 text-xs mt-2 italic">
                                * Your device details will be automatically filled in the next step.
                            </p>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}

function DetailItem({ icon: Icon, label, value, color = "text-white" }: { icon: any, label: string, value: string, color?: string }) {
    return (
        <div className="flex items-start gap-4 group">
            <div className="w-10 h-10 bg-neutral-800 rounded-lg flex items-center justify-center group-hover:bg-neutral-700 transition-colors">
                <Icon className="w-5 h-5 text-gray-400 group-hover:text-red-500 transition-colors" />
            </div>
            <div>
                <p className="text-xs font-semibold text-gray-500 uppercase tracking-widest mb-1">{label}</p>
                <p className={`text-lg font-bold ${color}`}>{value}</p>
            </div>
        </div>
    );
}
