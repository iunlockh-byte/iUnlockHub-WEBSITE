"use client";

import { MessageCircle } from 'lucide-react';
import Link from 'next/link';

export default function WhatsAppButton() {
    // REPLACE THIS WITH YOUR ACTUAL BUSINESS WHATSAPP NUMBER
    const phoneNumber = "+94766079059";
    const message = "Hello iUnlock Hub, I need help with a device unlock.";
    const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;

    return (
        <Link
            href={whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="fixed bottom-8 right-8 z-[90] bg-[#25D366] hover:bg-[#20ba56] text-white p-4 rounded-full shadow-[0_4px_20px_rgba(37,211,102,0.4)] hover:scale-110 transition-all duration-300 group"
            aria-label="Contact us on WhatsApp"
        >
            <div className="relative">
                <MessageCircle className="w-8 h-8" />
                <span className="absolute -top-12 right-0 bg-white text-black text-xs font-bold py-1 px-3 rounded-lg shadow-xl opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none border border-neutral-200">
                    Need Help? Chat with us!
                </span>
            </div>
        </Link>
    );
}
