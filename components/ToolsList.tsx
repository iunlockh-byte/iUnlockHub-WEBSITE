"use client";

import { Wrench, CheckCircle, Clock } from 'lucide-react';
import Link from 'next/link';

const TOOLS = [
    { name: "Chimera Pro Tool", description: "Professional service software for Samsung, Huawei, Xiaomi, BlackBerry, Nokia, LG, HTC phones." },
    { name: "TFM Tool Pro", description: "Comprehensive tool for various Android device servicing needs." },
    { name: "Cheetah Tool Pro", description: "Advanced repair and unlocking tool for modern smartphones." },
    { name: "Mobilesea Service Tool", description: "Powerful servicing solution for mobile device technicians." },
    { name: "TSM Tool", description: "Specialized tool for specific device operations and unlocks." },
    { name: "MDM Fix Tool", description: "Navigate and resolve Mobile Device Management locks effortlessly." },
    { name: "AMT Tool", description: "Android Multi Tool for various diagnostic and repair functions." },
    { name: "AndroidWin Tool", description: "Windows-based utility for Android device management and unlocking." },
    { name: "CF Tool", description: "Compact and fast tool for essential device operations." },
    { name: "KG Killer Tool", description: "Specialized solution for KG locked devices." },
    { name: "TR Tool", description: "Reliable tool for specific technician requirements." },
    { name: "UAT Pro Tool", description: "Uni-Android Tool Pro for extensive device support and features." },
    { name: "Hydra Tool", period: "6 Hours", description: "Digital license for Hydra Tool. Valid for 6 hours." },
    { name: "Griffin Unlocker", description: "Robust unlocking software for a wide range of mobile brands." },
    { name: "EMT/EME Tool", description: "Essential servicing tool for professional mobile repair shops." },
    { name: "Pandora Digital Login", period: "48 Hours", description: "Access Pandora software features. Valid for 48 hours." },
    { name: "DFT Pro Tool", period: "48 Hours", description: "DFT Pro digital license. Valid for 48 hours." },
    { name: "Octoplus Box", description: "Digital activation/credits for Octoplus Box software features." },
    { name: "Unlock Tool", price: "$10.00", period: "6 Hours", description: "Professional unlocking utility. Valid for 6 hours." }
];

export default function ToolsList() {
    return (
        <section className="py-20 bg-black">
            <div className="container mx-auto px-4">
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {TOOLS.map((tool: any, index) => (
                        <div
                            key={index}
                            className="group relative bg-neutral-900/50 border border-neutral-800 rounded-2xl p-6 hover:border-red-600/50 transition-all duration-300 hover:shadow-[0_0_20px_rgba(220,38,38,0.1)] hover:-translate-y-1"
                        >
                            <div className="absolute inset-0 bg-gradient-to-br from-red-600/5 to-transparent rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity" />

                            <div className="relative z-10 flex flex-col h-full">
                                <div className="flex items-start justify-between mb-4">
                                    <div className="p-3 bg-neutral-800 rounded-xl group-hover:bg-red-600/20 transition-colors">
                                        <Wrench className="w-6 h-6 text-red-500" />
                                    </div>
                                    {tool.period && (
                                        <span className="flex items-center gap-1 text-xs font-semibold bg-red-900/30 text-red-400 px-2 py-1 rounded-full border border-red-500/20">
                                            <Clock className="w-3 h-3" /> {tool.period}
                                        </span>
                                    )}
                                </div>

                                <h3 className="text-xl font-bold text-white mb-2 group-hover:text-red-400 transition-colors">
                                    {tool.name}
                                </h3>
                                <p className="text-gray-400 text-sm mb-6 flex-grow">
                                    {tool.description}
                                </p>

                                <div className="mt-auto pt-4 border-t border-neutral-800 flex items-center justify-between">
                                    <div className="flex flex-col">
                                        <span className="text-xs text-gray-500 uppercase tracking-wider font-semibold">Price</span>
                                        <span className="text-lg font-bold text-white">{tool.price || "Ask for Price"}</span>
                                    </div>
                                    <Link
                                        href="/contact"
                                        className="px-4 py-2 bg-white text-black font-bold text-sm rounded-lg hover:bg-gray-200 transition-colors flex items-center gap-2"
                                    >
                                        Rent Now
                                    </Link>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
