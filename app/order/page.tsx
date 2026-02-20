"use client";

import { useState, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import Header from "@/components/Header";
import OrderForm, { OrderData } from "@/components/OrderForm";
import CryptoPayment from "@/components/CryptoPayment";
import { ShieldCheck } from 'lucide-react';

function OrderProcess() {
    const [step, setStep] = useState(1);
    const [orderData, setOrderData] = useState<OrderData | null>(null);
    const searchParams = useSearchParams();

    // Optional: Use searchParams to pre-select service if needed
    // const service = searchParams.get('service');

    const handleOrderSubmit = (data: OrderData) => {
        setOrderData(data);
        setStep(2);
    };

    return (
        <div className="container mx-auto px-4 pt-24">
            {/* Progress Steps */}
            <div className="max-w-xl mx-auto mb-12 flex items-center justify-between relative">
                <div className="absolute top-1/2 left-0 w-full h-1 bg-neutral-800 -z-10 rounded-full"></div>
                <div className={`absolute top-1/2 left-0 h-1 bg-red-600 -z-10 rounded-full transition-all duration-500`} style={{ width: step === 1 ? '50%' : '100%' }}></div>

                <div className={`w-10 h-10 rounded-full flex items-center justify-center font-bold transition-all ${step >= 1 ? 'bg-red-600 text-white shadow-[0_0_15px_rgba(220,38,38,0.5)]' : 'bg-neutral-800 text-gray-500'}`}>
                    1
                </div>
                <div className={`w-10 h-10 rounded-full flex items-center justify-center font-bold transition-all ${step >= 2 ? 'bg-red-600 text-white shadow-[0_0_15px_rgba(220,38,38,0.5)]' : 'bg-neutral-800 text-gray-500'}`}>
                    2
                </div>
                <div className={`w-10 h-10 rounded-full flex items-center justify-center font-bold transition-all ${step >= 3 ? 'bg-red-600 text-white' : 'bg-neutral-800 text-gray-500'}`}>
                    3
                </div>
            </div>

            <div className="max-w-xl mx-auto flex justify-between text-xs text-gray-500 font-medium uppercase tracking-widest mb-12 -mt-10 px-2">
                <span>Device Info</span>
                <span>Payment</span>
                <span>Unlock</span>
            </div>

            {step === 1 && (
                <div className="animate-in fade-in slide-in-from-bottom-8">
                    <OrderForm onSubmit={handleOrderSubmit} />
                    <div className="mt-8 text-center">
                        <p className="text-gray-500 text-sm max-w-md mx-auto flex items-center justify-center gap-2">
                            <ShieldCheck className="w-4 h-4" />
                            Your IMEI data is processed securely and encrypted.
                        </p>
                    </div>
                </div>
            )}

            {step === 2 && orderData && (
                <div className="animate-in fade-in slide-in-from-bottom-8">
                    <CryptoPayment orderData={orderData} />
                    <div className="text-center mt-6">
                        <button
                            onClick={() => setStep(1)}
                            className="text-gray-500 hover:text-white text-sm underline underline-offset-4"
                        >
                            Change Device Details
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
}

export default function OrderPage() {
    return (
        <main className="min-h-screen bg-black text-white pb-20">
            <Header />
            <Suspense fallback={<div className="container mx-auto px-4 pt-40 text-center text-gray-500">Loading order form...</div>}>
                <OrderProcess />
            </Suspense>
        </main>
    );
}
