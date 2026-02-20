"use client";

import { useState } from 'react';
import { ChevronDown, ChevronUp, HelpCircle } from 'lucide-react';

const faqs = [
    {
        question: "Is the unlock permanent?",
        answer: "Yes, our unlocking services are permanent. Once your device is unlocked, it will remain unlocked even after software updates, factory resets, or restores."
    },
    {
        question: "Why do I need a Windows PC?",
        answer: "Our remote unlocking software and specialized tools are designed specifically for Windows environments. Currently, Apple Mac (macOS) and Linux systems are not supported for our remote sessions."
    },
    {
        question: "How long does the process take?",
        answer: "After you place an order, we will contact you within 24 hours to schedule a session. The actual unlocking process typically takes between 15 to 45 minutes depending on the service."
    },
    {
        question: "Is this service safe for my device?",
        answer: "Absolutely. We use official and professional-grade tools that do not harm your device's hardware or void its internal security. Our technicians are highly experienced in remote servicing."
    },
    {
        question: "What if my device cannot be unlocked?",
        answer: "We offer a refund policy if our team is unable to complete the service due to technical issues on our end. However, please ensure your device meets all requirements before ordering."
    },
    {
        question: "What is UltraViewer used for?",
        answer: "UltraViewer allows our technician to remotely access your Windows PC to run the necessary unlocking tools and communicate with your connected mobile device. You can see everything we do on your screen."
    },
    {
        question: "How can I contact support via email?",
        answer: "You can reach our official support team at iunlockh@gmail.com for any inquiries, business proposals, or order assistance."
    }
];

export default function FAQ() {
    const [activeIndex, setActiveIndex] = useState<number | null>(null);

    const toggleAccordion = (index: number) => {
        setActiveIndex(activeIndex === index ? null : index);
    };

    return (
        <section id="faq" className="py-24 bg-neutral-950">
            <div className="container mx-auto px-4">
                <div className="max-w-3xl mx-auto">
                    <div className="text-center mb-16">
                        <div className="inline-flex items-center gap-2 px-3 py-1 bg-red-500/10 border border-red-500/20 rounded-full text-red-400 text-xs font-medium uppercase tracking-wider mb-6">
                            <HelpCircle className="w-3 h-3" />
                            Got Questions?
                        </div>
                        <h2 className="text-4xl font-bold text-white mb-6">Frequently Asked Questions</h2>
                        <p className="text-gray-400 text-lg">
                            Everything you need to know about our premium unlocking services.
                        </p>
                    </div>

                    <div className="space-y-4">
                        {faqs.map((faq, index) => {
                            const isOpen = activeIndex === index;
                            return (
                                <div
                                    key={index}
                                    className={`bg-neutral-900 border transition-colors rounded-2xl overflow-hidden ${isOpen ? 'border-red-600/50 shadow-[0_0_20px_rgba(220,38,38,0.05)]' : 'border-neutral-800 hover:border-neutral-700'}`}
                                >
                                    <button
                                        onClick={() => toggleAccordion(index)}
                                        className="w-full px-6 py-5 flex items-center justify-between text-left transition-colors"
                                    >
                                        <span className={`text-lg font-semibold transition-colors ${isOpen ? 'text-white' : 'text-gray-300'}`}>
                                            {faq.question}
                                        </span>
                                        {isOpen ? (
                                            <ChevronUp className="w-5 h-5 text-red-500" />
                                        ) : (
                                            <ChevronDown className="w-5 h-5 text-gray-500" />
                                        )}
                                    </button>

                                    <div
                                        className={`px-6 transition-all duration-300 ease-in-out ${isOpen ? 'max-h-96 pb-6 opacity-100' : 'max-h-0 opacity-0'}`}
                                    >
                                        <p className="text-gray-400 leading-relaxed">
                                            {faq.answer}
                                        </p>
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                </div>
            </div>
        </section>
    );
}
