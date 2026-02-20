"use client";

import { CheckCircle2, Download, Clock, Heart, HardDrive, Globe, Monitor, X } from 'lucide-react';
import Link from 'next/link';

interface OrderConfirmationModalProps {
    isOpen: boolean;
    onClose: () => void;
}

const SOFTWARE = [
    {
        name: "3uTools",
        icon: HardDrive,
        url: "http://www.3u.com/"
    },
    {
        name: "iTunes",
        icon: Globe,
        url: "https://www.apple.com/itunes/"
    },
    {
        name: "UltraViewer",
        icon: Monitor,
        url: "https://www.ultraviewer.net/en/download.html"
    }
];

export default function OrderConfirmationModal({ isOpen, onClose }: OrderConfirmationModalProps) {
    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
            {/* Backdrop */}
            <div
                className="absolute inset-0 bg-black/80 backdrop-blur-sm animate-in fade-in duration-300"
                onClick={onClose}
            />

            {/* Modal Content */}
            <div className="relative bg-neutral-900 border border-neutral-800 rounded-3xl w-full max-w-2xl overflow-hidden shadow-2xl animate-in fade-in zoom-in duration-300">
                <button
                    onClick={onClose}
                    className="absolute top-4 right-4 text-gray-500 hover:text-white transition-colors"
                >
                    <X className="w-6 h-6" />
                </button>

                <div className="p-8 md:p-12 text-center">
                    <div className="w-20 h-20 bg-green-500/20 rounded-full flex items-center justify-center mx-auto mb-6">
                        <CheckCircle2 className="w-10 h-10 text-green-500" />
                    </div>

                    <h2 className="text-3xl font-bold text-white mb-4">Payment Notice Received!</h2>
                    <p className="text-gray-400 text-lg mb-8">
                        Thank you for your order! We have received your payment notification.
                    </p>

                    <div className="bg-black/40 rounded-2xl p-6 mb-8 text-left border border-white/5">
                        <h3 className="text-white font-bold mb-4 flex items-center gap-2">
                            <Download className="w-5 h-5 text-red-500" />
                            Prepare for your Unlocking Session
                        </h3>
                        <p className="text-gray-400 text-sm mb-6 leading-relaxed">
                            To ensure a smooth and fast service, please download and install the following required software on your <span className="text-white font-bold">Windows PC</span> before we connect:
                        </p>

                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                            {SOFTWARE.map((app, index) => (
                                <Link
                                    key={index}
                                    href={app.url}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="flex items-center gap-3 bg-neutral-800/50 hover:bg-red-600/20 border border-neutral-700 hover:border-red-600/50 rounded-xl p-3 transition-all group"
                                >
                                    <app.icon className="w-5 h-5 text-gray-400 group-hover:text-red-500" />
                                    <span className="text-white text-sm font-semibold">{app.name}</span>
                                </Link>
                            ))}
                        </div>
                    </div>

                    <div className="flex flex-col md:flex-row items-center justify-center gap-8 mb-8">
                        <div className="flex items-center gap-3">
                            <div className="w-10 h-10 bg-red-600/20 rounded-lg flex items-center justify-center">
                                <Clock className="w-5 h-5 text-red-500" />
                            </div>
                            <p className="text-left text-sm text-gray-300">
                                <span className="block font-bold">24-Hour Contact</span>
                                We will reach out via WhatsApp/Email.
                            </p>
                        </div>

                        <div className="flex items-center gap-3">
                            <div className="w-10 h-10 bg-red-600/20 rounded-lg flex items-center justify-center">
                                <Heart className="w-5 h-5 text-red-500" />
                            </div>
                            <p className="text-left text-sm text-gray-300">
                                <span className="block font-bold">Thank You!</span>
                                We appreciate your trust in iUnlock Hub.
                            </p>
                        </div>
                    </div>

                    <button
                        onClick={onClose}
                        className="w-full md:w-auto px-12 py-4 bg-red-600 hover:bg-red-700 text-white font-bold rounded-xl transition-all shadow-[0_0_20px_rgba(220,38,38,0.3)]"
                    >
                        Got it, Thank You!
                    </button>
                </div>
            </div>
        </div>
    );
}
