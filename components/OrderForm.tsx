"use client";

import { useState, useEffect } from 'react';
import { useSearchParams } from 'next/navigation';
import { Smartphone, Hash, Lock, CheckCircle, AlertCircle, User, Mail, MessageSquare, Globe, Tag } from 'lucide-react';
import { calculatePrice } from '@/utils/pricing';
import { createClient } from '@/utils/supabase/client';
import { validateIMEI } from '@/utils/validation';

export interface OrderData {
    category: string;
    model: string;
    imei: string;
    serial: string;
    mode: string;
    name: string;
    email: string;
    whatsapp: string;
    country: string;
    networkStatus: string;
    serviceType: string;
    knowsICloud: boolean;
}

interface OrderFormProps {
    onSubmit: (data: OrderData) => void;
}

const DEVICES = {
    iPhone: [
        "iPhone 17 Pro Max", "iPhone 17 Pro", "iPhone 17 Air", "iPhone 17",
        "iPhone 16 Pro Max", "iPhone 16 Pro", "iPhone 16 Plus", "iPhone 16",
        "iPhone 15 Pro Max", "iPhone 15 Pro", "iPhone 15 Plus", "iPhone 15",
        "iPhone 14 Pro Max", "iPhone 14 Pro", "iPhone 14 Plus", "iPhone 14",
        "iPhone SE (3rd Gen)",
        "iPhone 13 Pro Max", "iPhone 13 Pro", "iPhone 13", "iPhone 13 mini",
        "iPhone 12 Pro Max", "iPhone 12 Pro", "iPhone 12", "iPhone 12 mini",
        "iPhone SE (2nd Gen)",
        "iPhone 11 Pro Max", "iPhone 11 Pro", "iPhone 11",
        "iPhone XS Max", "iPhone XS", "iPhone XR", "iPhone X",
        "iPhone 8 Plus", "iPhone 8",
        "iPhone 7 Plus", "iPhone 7",
        "iPhone SE (1st Gen)",
        "iPhone 6s Plus", "iPhone 6s", "iPhone 6 Plus", "iPhone 6",
        "iPhone 5s", "iPhone 5c", "iPhone 5",
        "iPhone 4s", "iPhone 4"
    ],
    iPad: [
        "iPad Pro 12.9 (6th Gen)", "iPad Pro 12.9 (5th Gen)", "iPad Pro 12.9 (4th Gen)",
        "iPad Pro 11 (4th Gen)", "iPad Pro 11 (3rd Gen)",
        "iPad Air (5th Gen)", "iPad Air (4th Gen)",
        "iPad (10th Gen)", "iPad (9th Gen)",
        "iPad mini (6th Gen)", "iPad mini (5th Gen)"
    ],
    iPod: [
        "iPod touch (7th Gen)", "iPod touch (6th Gen)", "iPod touch (5th Gen)"
    ]
};

const SERVICES = [
    { id: 'icloud', label: 'iCloud Unlock' },
    { id: 'passcode_removal', label: 'Passcode Removal' },
    { id: 'mdm', label: 'MDM Bypass' },
    { id: 'carrier', label: 'Carrier Unlock' }
];

export default function OrderForm({ onSubmit }: OrderFormProps) {
    const searchParams = useSearchParams();

    const [formData, setFormData] = useState<OrderData>({
        category: 'iPhone',
        model: 'iPhone 17 Pro Max',
        imei: '',
        serial: '',
        mode: 'hello',
        name: '',
        email: '',
        whatsapp: '',
        country: '',
        networkStatus: 'with_network',
        serviceType: 'icloud',
        knowsICloud: true
    });

    // Calculate live price
    const { amount, description: serviceLabel } = calculatePrice(
        formData.serviceType,
        formData.model,
        formData.mode,
        formData.knowsICloud
    );

    useEffect(() => {
        const checkUser = async () => {
            const supabase = createClient();
            const { data: { user } } = await supabase.auth.getUser();
            if (user) {
                setFormData(prev => ({
                    ...prev,
                    email: user.email || prev.email,
                    name: user.email?.split('@')[0] || prev.name
                }));
            }
        };
        checkUser();

        const imeiParam = searchParams.get('imei');
        const modelParam = searchParams.get('model');
        const serialParam = searchParams.get('serial');
        const serviceParam = searchParams.get('service');

        if (imeiParam || modelParam || serialParam || serviceParam) {
            setFormData(prev => ({
                ...prev,
                imei: imeiParam || prev.imei,
                model: modelParam || prev.model,
                serial: serialParam || prev.serial,
                serviceType: serviceParam || prev.serviceType,
                category: modelParam?.toLowerCase().includes('iphone') ? 'iPhone' :
                    modelParam?.toLowerCase().includes('ipad') ? 'iPad' :
                        modelParam?.toLowerCase().includes('ipod') ? 'iPod' : prev.category
            }));
        }
    }, [searchParams]);

    const [error, setError] = useState('');

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const name = e.target.name;
        const value = e.target.type === 'checkbox' ? (e.target as HTMLInputElement).checked : e.target.value;

        if (name === 'knowsICloud') {
            setFormData(prev => ({ ...prev, knowsICloud: value as boolean }));
        } else if (name === 'serviceType') {
            const val = value as string;
            const newMode = val === 'passcode_removal' ? 'passcode' : 'hello';
            setFormData(prev => ({ ...prev, serviceType: val, mode: newMode }));
        } else {
            setFormData(prev => ({ ...prev, [name]: value as string }));
        }
        setError('');
    };

    const handleCategoryChange = (val: string) => {
        setFormData({
            ...formData,
            category: val,
            model: DEVICES[val as keyof typeof DEVICES][0]
        });
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        // Basic length check
        if (formData.imei.length !== 15) {
            setError('IMEI must be exactly 15 digits');
            return;
        }

        // Mathematical validity check (Luhn Algorithm)
        if (!validateIMEI(formData.imei)) {
            setError('Invalid IMEI number. Please check for typos.');
            return;
        }

        if (!formData.whatsapp) {
            setError('WhatsApp number is required');
            return;
        }
        onSubmit(formData);
    };

    return (
        <div className="w-full max-w-2xl mx-auto bg-neutral-900/50 backdrop-blur-xl border border-neutral-800 rounded-3xl p-8 shadow-2xl">
            <div className="mb-8 text-center">
                <h2 className="text-3xl font-bold bg-gradient-to-r from-white to-gray-400 bg-clip-text text-transparent">
                    Device Details
                </h2>
                <p className="text-gray-400 mt-2">Enter your device information and see real-time pricing</p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
                {/* Service Selection */}
                <div className="space-y-2">
                    <label className="text-sm font-medium text-gray-300 flex items-center gap-2">
                        Service Type
                    </label>
                    <select
                        name="serviceType"
                        value={formData.serviceType}
                        onChange={handleChange}
                        className="w-full bg-black/50 border border-neutral-800 rounded-xl px-4 py-3 text-white focus:ring-2 focus:ring-red-600 focus:border-transparent outline-none transition-all"
                    >
                        {SERVICES.map((s) => (
                            <option key={s.id} value={s.id}>{s.label}</option>
                        ))}
                    </select>
                </div>

                {/* Device Type Selection */}
                <div className="flex gap-2 p-1 bg-black/40 rounded-xl">
                    {Object.keys(DEVICES).map((type) => (
                        <button
                            key={type}
                            type="button"
                            onClick={() => handleCategoryChange(type)}
                            className={`flex-1 py-3 rounded-lg text-sm font-semibold transition-all ${formData.category === type
                                ? 'bg-red-600 text-white shadow-lg'
                                : 'text-gray-400 hover:text-white hover:bg-white/5'
                                }`}
                        >
                            {type}
                        </button>
                    ))}
                </div>

                {/* Model Selection */}
                <div className="space-y-2">
                    <label className="text-sm font-medium text-gray-300 flex items-center gap-2">
                        <Smartphone className="w-4 h-4 text-red-500" /> Model
                    </label>
                    <select
                        name="model"
                        value={formData.model}
                        onChange={handleChange}
                        className="w-full bg-black/50 border border-neutral-800 rounded-xl px-4 py-3 text-white focus:ring-2 focus:ring-red-600 focus:border-transparent outline-none transition-all"
                    >
                        {DEVICES[formData.category as keyof typeof DEVICES].map((model) => (
                            <option key={model} value={model}>{model}</option>
                        ))}
                    </select>
                </div>

                {/* Real-time Price Display */}
                <div className="p-6 bg-red-600/5 border border-red-600/20 rounded-2xl animate-in zoom-in duration-300">
                    <div className="flex justify-between items-center mb-1">
                        <span className="text-xs font-bold text-red-500 uppercase tracking-widest flex items-center gap-1">
                            <Tag className="w-3 h-3" /> Estimated Price
                        </span>
                        <span className="text-xs text-gray-500 font-medium">Secure Service</span>
                    </div>
                    <div className="flex justify-between items-baseline">
                        <div className="text-sm font-medium text-gray-400">{serviceLabel}</div>
                        <div className="text-3xl font-black text-white">
                            ${amount.toFixed(2)}
                        </div>
                    </div>
                    <div className="mt-3 text-[10px] text-gray-500 italic text-center">
                        * Prices are subject to change based on actual device status.
                    </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {/* IMEI Input */}
                    <div className="space-y-2">
                        <label className="text-sm font-medium text-gray-300 flex items-center gap-2">
                            <Hash className="w-4 h-4 text-red-500" /> IMEI Number
                        </label>
                        <input
                            type="text"
                            name="imei"
                            value={formData.imei}
                            onChange={handleChange}
                            placeholder="351234567890123"
                            className="w-full bg-black/50 border border-neutral-800 rounded-xl px-4 py-3 text-white focus:ring-2 focus:ring-red-600 focus:border-transparent outline-none transition-all"
                            maxLength={15}
                        />
                    </div>

                    {/* Serial Number */}
                    <div className="space-y-2">
                        <label className="text-sm font-medium text-gray-300 flex items-center gap-2">
                            <Hash className="w-4 h-4 text-red-500" /> Serial Number
                        </label>
                        <input
                            type="text"
                            name="serial"
                            value={formData.serial}
                            onChange={handleChange}
                            placeholder="F17L..."
                            className="w-full bg-black/50 border border-neutral-800 rounded-xl px-4 py-3 text-white focus:ring-2 focus:ring-red-600 focus:border-transparent outline-none transition-all uppercase"
                        />
                    </div>
                </div>

                {/* Lock Mode - Only show for iCloud Unlock */}
                {formData.serviceType === 'icloud' && (
                    <div className="space-y-3">
                        <label className="text-sm font-medium text-gray-300 flex items-center gap-2">
                            <Lock className="w-4 h-4 text-red-500" /> Lock Status
                        </label>
                        <div className="grid grid-cols-2 gap-4">
                            <label className={`cursor-pointer border rounded-xl p-3 flex items-center justify-center gap-2 transition-all ${formData.mode === 'hello' ? 'bg-red-600/10 border-red-600 text-white' : 'bg-black/30 border-neutral-800 text-gray-400'}`}>
                                <input type="radio" name="mode" value="hello" checked={formData.mode === 'hello'} onChange={handleChange} className="hidden" />
                                <span className="font-medium">Hello Screen</span>
                            </label>
                            <label className={`cursor-pointer border rounded-xl p-3 flex items-center justify-center gap-2 transition-all ${formData.mode === 'passcode' ? 'bg-red-600/10 border-red-600 text-white' : 'bg-black/30 border-neutral-800 text-gray-400'}`}>
                                <input type="radio" name="mode" value="passcode" checked={formData.mode === 'passcode'} onChange={handleChange} className="hidden" />
                                <span className="font-medium">Passcode</span>
                            </label>
                        </div>
                    </div>
                )}

                {/* Conditional Field for Passcode Removal */}
                {formData.serviceType === 'passcode_removal' && (
                    <div className="space-y-3 p-4 bg-white/5 rounded-2xl border border-white/10">
                        <label className="flex items-center gap-3 cursor-pointer">
                            <input
                                type="checkbox"
                                name="knowsICloud"
                                checked={formData.knowsICloud}
                                onChange={handleChange}
                                className="w-5 h-5 rounded border-neutral-800 bg-black text-red-600 focus:ring-red-600 focus:ring-offset-black"
                            />
                            <span className="text-sm text-gray-300">I remember my iCloud Email and Password</span>
                        </label>
                        <p className="text-xs text-gray-500 ml-8 leading-relaxed">
                            {formData.knowsICloud
                                ? "Great! We can remove the passcode securely for a standard fee."
                                : "If you don't remember your iCloud details, we must use the full iCloud unlock process. Higher prices will apply."}
                        </p>
                    </div>
                )}

                <div className="border-t border-neutral-800 pt-6 mt-6 space-y-6">
                    <h3 className="text-lg font-semibold text-white">Customer Details</h3>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="space-y-2">
                            <label className="text-sm font-medium text-gray-300 flex items-center gap-2">
                                <User className="w-4 h-4 text-red-500" /> Full Name
                            </label>
                            <input
                                type="text"
                                name="name"
                                value={formData.name}
                                onChange={handleChange}
                                className="w-full bg-black/50 border border-neutral-800 rounded-xl px-4 py-3 text-white focus:ring-2 focus:ring-red-600 focus:border-transparent outline-none"
                            />
                        </div>
                        <div className="space-y-2">
                            <label className="text-sm font-medium text-gray-300 flex items-center gap-2">
                                <Globe className="w-4 h-4 text-red-500" /> Country
                            </label>
                            <input
                                type="text"
                                name="country"
                                value={formData.country}
                                onChange={handleChange}
                                className="w-full bg-black/50 border border-neutral-800 rounded-xl px-4 py-3 text-white focus:ring-2 focus:ring-red-600 focus:border-transparent outline-none"
                            />
                        </div>
                    </div>

                    <div className="space-y-2">
                        <label className="text-sm font-medium text-gray-300 flex items-center gap-2">
                            <Mail className="w-4 h-4 text-red-500" /> Email Address
                        </label>
                        <input
                            type="email"
                            name="email"
                            value={formData.email}
                            onChange={handleChange}
                            className="w-full bg-black/50 border border-neutral-800 rounded-xl px-4 py-3 text-white focus:ring-2 focus:ring-red-600 focus:border-transparent outline-none"
                        />
                    </div>

                    <div className="space-y-2">
                        <label className="text-sm font-medium text-gray-300 flex items-center gap-2">
                            <MessageSquare className="w-4 h-4 text-red-500" /> WhatsApp Number <span className="text-red-500 text-xs ml-auto">*Urgent</span>
                        </label>
                        <input
                            type="text"
                            name="whatsapp"
                            value={formData.whatsapp}
                            onChange={handleChange}
                            placeholder="+1 234 567 890"
                            className="w-full bg-black/50 border border-neutral-800 rounded-xl px-4 py-3 text-white focus:ring-2 focus:ring-red-600 focus:border-transparent outline-none"
                        />
                    </div>
                </div>

                {error && (
                    <div className="bg-red-500/10 border border-red-500/20 text-red-500 px-4 py-3 rounded-xl flex items-center gap-2 text-sm">
                        <AlertCircle className="w-4 h-4" /> {error}
                    </div>
                )}

                <button
                    type="submit"
                    className="w-full mt-4 bg-red-600 hover:bg-red-700 text-white font-bold py-4 rounded-xl shadow-[0_0_20px_rgba(220,38,38,0.4)] hover:shadow-[0_0_30px_rgba(220,38,38,0.6)] transition-all flex items-center justify-center gap-2"
                >
                    Continue to Payment <CheckCircle className="w-5 h-5" />
                </button>
            </form>
        </div>
    );
}
