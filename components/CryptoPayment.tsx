"use client";

import { useState, useEffect } from 'react';
import { Copy, Check, Bitcoin, Tag, CreditCard, Download } from 'lucide-react';
import { createClient } from '@/utils/supabase/client';
import { QRCodeSVG } from 'qrcode.react';
import { OrderData } from './OrderForm';
import OrderConfirmationModal from './OrderConfirmationModal';
import PayPalSlip from './PayPalSlip';
import { calculatePrice } from '@/utils/pricing';
import { CONFIG } from '@/utils/config';

interface CryptoPaymentProps {
    orderData: OrderData;
}

const WALLETS = {
    ...CONFIG.wallets,
    PAYPAL: {
        address: CONFIG.business.paypalEmail,
        network: "PayPal",
        icon: "P"
    }
} as const;

export default function CryptoPayment({ orderData }: CryptoPaymentProps) {
    const [selectedCoin, setSelectedCoin] = useState<keyof typeof WALLETS>('USDT');
    const [copied, setCopied] = useState(false);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isPayPalSlipOpen, setIsPayPalSlipOpen] = useState(false);
    const [user, setUser] = useState<any>(null);

    const supabase = createClient();

    useEffect(() => {
        const checkUser = async () => {
            const { data: { user } } = await supabase.auth.getUser();
            setUser(user);
        };
        checkUser();
    }, []);

    // Calculate dynamic price
    const { amount, description: serviceDescription } = calculatePrice(
        orderData.serviceType,
        orderData.model,
        orderData.mode,
        orderData.knowsICloud
    );

    const copyToClipboard = () => {
        navigator.clipboard.writeText(WALLETS[selectedCoin].address);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    return (
        <>
            <div className="w-full max-w-xl mx-auto bg-neutral-900/50 backdrop-blur-xl border border-neutral-800 rounded-3xl p-8 shadow-2xl animate-in fade-in slide-in-from-bottom-8">
                <div className="mb-8 text-center">
                    <div className="w-16 h-16 bg-red-600/20 rounded-full flex items-center justify-center mx-auto mb-4">
                        <Bitcoin className="w-8 h-8 text-red-500" />
                    </div>
                    <h2 className="text-3xl font-bold text-white">Secure Payment</h2>
                    <p className="text-gray-400 mt-2">Complete your order using Cryptocurrency</p>
                </div>

                {/* Order Summary */}
                <div className="bg-white/5 border border-white/10 rounded-2xl p-6 mb-8 text-left">
                    <h3 className="text-lg font-semibold text-white mb-4 border-b border-white/10 pb-2 flex items-center gap-2">
                        <Tag className="w-5 h-5 text-red-500" /> Order Summary
                    </h3>
                    <div className="grid grid-cols-2 gap-y-3 text-sm">
                        <div className="text-gray-400">Service:</div>
                        <div className="text-white font-bold text-right text-red-400">{serviceDescription}</div>

                        <div className="text-gray-400">Device:</div>
                        <div className="text-white font-medium text-right">{orderData.model}</div>

                        <div className="text-gray-400">IMEI:</div>
                        <div className="text-white font-medium text-right">{orderData.imei}</div>

                        <div className="text-gray-400">Lock Mode:</div>
                        <div className="text-white font-medium text-right capitalize">{orderData.mode} Screen</div>

                        <div className="text-gray-400">Customer:</div>
                        <div className="text-white font-medium text-right">{orderData.name}</div>
                    </div>
                </div>

                <div className="grid grid-cols-4 gap-2 p-1 bg-black/40 rounded-xl mb-8">
                    {(Object.keys(WALLETS) as Array<keyof typeof WALLETS>).map((coin) => (
                        <button
                            key={coin}
                            onClick={() => setSelectedCoin(coin)}
                            className={`py-2 rounded-lg text-[10px] font-bold transition-all ${selectedCoin === coin
                                ? 'bg-red-600 text-white shadow-lg'
                                : 'text-gray-400 hover:text-white hover:bg-white/5'
                                }`}
                        >
                            {coin}
                        </button>
                    ))}
                </div>

                {selectedCoin === 'PAYPAL' ? (
                    <div className="bg-white/5 border border-white/10 rounded-2xl p-8 mb-6 text-center animate-in zoom-in-95 duration-300">
                        <div className="w-20 h-20 bg-[#0070ba]/20 rounded-full flex items-center justify-center mx-auto mb-6">
                            <CreditCard className="w-10 h-10 text-[#0070ba]" />
                        </div>
                        <h3 className="text-xl font-bold text-white mb-2">PayPal Payment</h3>
                        <p className="text-gray-400 text-sm mb-6">Click below to view your unique payment slip and complete your order via PayPal.</p>

                        <button
                            onClick={() => setIsPayPalSlipOpen(true)}
                            className="w-full py-4 bg-[#0070ba] hover:bg-[#005ea6] text-white rounded-xl font-bold transition-all shadow-lg flex items-center justify-center gap-2"
                        >
                            <Download className="w-5 h-5" />
                            View & Download Payment Slip
                        </button>
                    </div>
                ) : (
                    <>
                        <div className="bg-white p-6 rounded-3xl mb-6 mx-auto w-52 h-52 flex items-center justify-center shadow-[0_0_30px_rgba(255,255,255,0.1)] group">
                            <QRCodeSVG
                                value={WALLETS[selectedCoin].address}
                                size={170}
                                level="H"
                                includeMargin={false}
                                className="transition-transform duration-500 group-hover:scale-105"
                            />
                        </div>

                        <div className="space-y-4">
                            <label className="text-xs font-bold text-gray-500 uppercase tracking-wider block text-center">
                                {WALLETS[selectedCoin].network} Deposit Address
                            </label>

                            <div
                                onClick={copyToClipboard}
                                className="group cursor-pointer bg-black/50 border border-neutral-800 hover:border-red-600/50 rounded-xl p-4 flex items-center justify-between transition-all"
                            >
                                <code className="text-sm text-gray-300 truncate font-mono px-2">
                                    {WALLETS[selectedCoin].address}
                                </code>
                                <div className={`p-2 rounded-lg transition-colors ${copied ? 'bg-green-500/20 text-green-500' : 'bg-neutral-800 text-gray-400 group-hover:bg-red-600 group-hover:text-white'}`}>
                                    {copied ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
                                </div>
                            </div>

                            <p className="text-center text-xs text-gray-500 mt-4">
                                Send only {selectedCoin} ({WALLETS[selectedCoin].network}) to this address. <br />
                                Sending any other asset may result in permanent loss.
                            </p>
                        </div>
                    </>
                )}

                <div className="mt-8 pt-6 border-t border-white/10 flex justify-between items-center">
                    <div className="text-sm text-gray-400">Total Amount</div>
                    <div className="text-2xl font-bold text-white">${amount.toFixed(2)}</div>
                </div>

                <button
                    onClick={async () => {
                        // 1. Save order to Supabase (if user is logged in)
                        if (user) {
                            await supabase.from('orders').insert({
                                user_id: user.id,
                                customer_email: orderData.email,
                                customer_name: orderData.name,
                                whatsapp_number: orderData.whatsapp,
                                device_model: orderData.model,
                                imei: orderData.imei,
                                service_type: serviceDescription,
                                amount: amount,
                                payment_method: WALLETS[selectedCoin].network
                            });
                        }

                        // 2. Save order to localStorage (legacy support / backup)
                        const existingOrders = JSON.parse(localStorage.getItem('iunlock_orders') || '[]');
                        const newOrder = {
                            ...orderData,
                            id: Date.now().toString(),
                            timestamp: new Date().toLocaleString(),
                            status: 'Pending',
                            price: `$${amount.toFixed(2)}`
                        };
                        localStorage.setItem('iunlock_orders', JSON.stringify([newOrder, ...existingOrders]));

                        // Generate WhatsApp message and open link
                        const businessNumber = CONFIG.business.whatsapp;
                        const message = `*iUnlock Hub - New Order Notice*\n\n` +
                            `*Order ID:* ${newOrder.id}\n` +
                            `*Service:* ${serviceDescription}\n` +
                            `*Device:* ${orderData.model}\n` +
                            `*IMEI:* ${orderData.imei}\n` +
                            `*Status:* Payment Sent (${WALLETS[selectedCoin].network})\n` +
                            `*Amount:* $${amount.toFixed(2)}\n` +
                            `*Customer:* ${orderData.name}\n` +
                            `*WhatsApp:* ${orderData.whatsapp || 'N/A'}\n\n` +
                            `_Please process my order as soon as possible._`;

                        const whatsappUrl = `https://wa.me/${businessNumber}?text=${encodeURIComponent(message)}`;
                        window.open(whatsappUrl, '_blank');

                        // Send automated invoice email
                        fetch('/api/invoice', {
                            method: 'POST',
                            headers: { 'Content-Type': 'application/json' },
                            body: JSON.stringify({
                                orderId: newOrder.id,
                                customerName: orderData.name,
                                customerEmail: orderData.email,
                                deviceModel: orderData.model,
                                imei: orderData.imei,
                                serviceName: serviceDescription,
                                amount: amount.toFixed(2),
                                timestamp: newOrder.timestamp
                            })
                        }).catch(err => console.error('Failed to send invoice email:', err));

                        // Open confirmation modal
                        setIsModalOpen(true);
                    }}
                    className="w-full mt-6 bg-green-600 hover:bg-green-700 text-white font-bold py-4 rounded-xl shadow-lg transition-all"
                >
                    I Have Sent Payment
                </button>
            </div>

            <OrderConfirmationModal
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
            />
            <PayPalSlip
                isOpen={isPayPalSlipOpen}
                onClose={() => setIsPayPalSlipOpen(false)}
                orderData={{
                    id: Date.now().toString().slice(-6), // Shortened ID for the slip
                    customerName: orderData.name,
                    serviceName: serviceDescription,
                    deviceModel: orderData.model,
                    amount: amount.toFixed(2),
                    timestamp: new Date().toLocaleString()
                }}
            />
        </>
    );
}
