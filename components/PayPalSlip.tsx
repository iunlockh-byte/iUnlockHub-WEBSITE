"use client";

import { X, CheckCircle, CreditCard, Download, ShieldCheck } from 'lucide-react';
import { Lock } from 'lucide-react';
import { useRef } from 'react';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';
import { CONFIG } from '@/utils/config';

interface PayPalSlipProps {
    isOpen: boolean;
    onClose: () => void;
    orderData: {
        id: string;
        customerName: string;
        serviceName: string;
        deviceModel: string;
        amount: string;
        timestamp: string;
    };
}

export default function PayPalSlip({ isOpen, onClose, orderData }: PayPalSlipProps) {
    const slipRef = useRef<HTMLDivElement>(null);

    const handleDownloadPDF = async () => {
        if (!slipRef.current) return;

        try {
            const canvas = await html2canvas(slipRef.current, {
                scale: 2,
                backgroundColor: '#ffffff',
                logging: false,
                useCORS: true
            });

            const imgData = canvas.toDataURL('image/png');
            const pdf = new jsPDF({
                orientation: 'portrait',
                unit: 'mm',
                format: 'a4'
            });

            const imgProps = pdf.getImageProperties(imgData);
            const pdfWidth = pdf.internal.pageSize.getWidth();
            const pdfHeight = (imgProps.height * pdfWidth) / imgProps.width;

            pdf.addImage(imgData, 'PNG', 0, 0, pdfWidth, pdfHeight);
            pdf.save(`iUnlock-Payment-Slip-${orderData.id}.pdf`);
        } catch (error) {
            console.error('PDF Generation Error:', error);
            // Fallback to simple print if PDF generation fails
            window.print();
        }
    };

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/90 backdrop-blur-sm animate-in fade-in duration-300">
            <div
                ref={slipRef}
                className="relative w-full max-w-md bg-white text-zinc-900 rounded-[2.5rem] overflow-hidden shadow-2xl animate-in zoom-in-95 duration-300"
            >

                {/* Close Button */}
                <button
                    onClick={onClose}
                    className="absolute top-6 right-6 p-2 hover:bg-zinc-100 rounded-full transition-colors text-zinc-400 hover:text-zinc-600"
                >
                    <X className="w-6 h-6" />
                </button>

                {/* Header / Brand */}
                <div className="bg-zinc-50 px-8 pt-10 pb-6 border-b border-zinc-100">
                    <div className="flex items-center gap-2 mb-4">
                        <div className="p-1.5 bg-red-600 rounded-lg">
                            <Lock className="w-5 h-5 text-white" />
                        </div>
                        <span className="text-xl font-bold tracking-tight">iUnlock Hub</span>
                    </div>
                    <h2 className="text-2xl font-black uppercase tracking-tighter text-zinc-800">Payment Slip</h2>
                    <p className="text-zinc-500 text-sm mt-1">Official Order Confirmation</p>
                </div>

                {/* Slip Content */}
                <div className="p-8 space-y-6">

                    {/* Status Badge */}
                    <div className="flex justify-between items-center bg-green-50 px-4 py-2 rounded-xl border border-green-100">
                        <span className="text-sm font-bold text-green-700 uppercase tracking-widest">Pending Payment</span>
                        <CheckCircle className="w-5 h-5 text-green-500" />
                    </div>

                    {/* Details Grid */}
                    <div className="space-y-4">
                        <div className="flex justify-between items-center">
                            <span className="text-zinc-400 text-sm">Order ID</span>
                            <span className="text-zinc-900 font-mono font-bold">#{orderData.id}</span>
                        </div>
                        <div className="flex justify-between items-center">
                            <span className="text-zinc-400 text-sm">Date</span>
                            <span className="text-zinc-900 font-medium">{orderData.timestamp}</span>
                        </div>
                        <div className="border-t border-zinc-100 pt-4">
                            <div className="flex justify-between items-center mb-1">
                                <span className="text-zinc-400 text-sm">Service</span>
                                <span className="text-zinc-900 font-bold">{orderData.serviceName}</span>
                            </div>
                            <div className="flex justify-between items-center">
                                <span className="text-zinc-400 text-sm">Device</span>
                                <span className="text-zinc-700 text-sm">{orderData.deviceModel}</span>
                            </div>
                        </div>
                    </div>

                    {/* Total Section */}
                    <div className="bg-zinc-900 rounded-2xl p-6 text-white shadow-xl">
                        <div className="flex justify-between items-end">
                            <div>
                                <p className="text-zinc-400 text-xs uppercase font-bold tracking-widest mb-1">Total to Pay</p>
                                <h3 className="text-3xl font-black">${orderData.amount}</h3>
                            </div>
                            <div className="text-right">
                                <p className="text-zinc-400 text-[10px] mb-1">Payable to:</p>
                                <p className="text-white text-xs font-bold leading-none">{CONFIG.business.paypalEmail}</p>
                            </div>
                        </div>
                    </div>

                    {/* Action Buttons */}
                    <div className="space-y-3">
                        <a
                            href={`https://www.paypal.com/cgi-bin/webscr?cmd=_xclick&business=${CONFIG.business.paypalEmail}&item_name=${encodeURIComponent(orderData.serviceName + ' - ' + orderData.deviceModel)}&amount=${orderData.amount}&currency_code=USD`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="w-full flex items-center justify-center gap-3 bg-[#0070ba] hover:bg-[#005ea6] text-white py-4 rounded-2xl font-bold transition-all shadow-lg hover:shadow-xl active:scale-[0.98]"
                        >
                            <CreditCard className="w-5 h-5" />
                            Pay with PayPal
                        </a>

                        <button
                            onClick={handleDownloadPDF}
                            className="w-full flex items-center justify-center gap-2 text-zinc-500 hover:text-zinc-800 text-sm font-semibold py-2 transition-colors"
                        >
                            <Download className="w-4 h-4" />
                            Download Slip (PDF)
                        </button>
                    </div>

                    {/* Footer Trust */}
                    <div className="pt-2 flex items-center justify-center gap-2 text-[10px] text-zinc-400 border-t border-zinc-100">
                        <ShieldCheck className="w-3 h-3" />
                        <span>Secure Transaction • iUnlock Hub Official Payment</span>
                    </div>
                </div>
            </div>
        </div>
    );
}
