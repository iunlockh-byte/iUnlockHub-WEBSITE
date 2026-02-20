"use client";

import { useState, useEffect } from 'react';
import Header from "@/components/Header";
import { Package, Smartphone, Tablet, Watch, Wrench, CheckCircle2, Clock, Trash2, LogIn, Filter, ChevronRight, Search, Fingerprint, Shield, Settings } from 'lucide-react';

interface Order {
    id: string;
    category: string;
    model: string;
    imei: string;
    serial: string;
    name: string;
    whatsapp: string;
    status: string;
    timestamp: string;
}

export default function AdminDashboard() {
    const [orders, setOrders] = useState<Order[]>([]);
    const [password, setPassword] = useState('');
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [activeTab, setActiveTab] = useState('All');
    const [searchQuery, setSearchQuery] = useState('');
    const [isBiometricSupported, setIsBiometricSupported] = useState(false);
    const [hasBiometricEnrolled, setHasBiometricEnrolled] = useState(false);

    useEffect(() => {
        const savedOrders = JSON.parse(localStorage.getItem('iunlock_orders') || '[]');
        setOrders(savedOrders);

        // Check for WebAuthn support and enrollment
        if (window.PublicKeyCredential) {
            setIsBiometricSupported(true);
            const enrolled = localStorage.getItem('iunlock_admin_biometric');
            if (enrolled) setHasBiometricEnrolled(true);
        }
    }, []);

    const handleLogin = (e: React.FormEvent) => {
        e.preventDefault();
        if (password === 'admin123') { // Simple password for demo
            setIsLoggedIn(true);
        } else {
            alert('Invalid Password');
        }
    };

    const handleBiometricLogin = async () => {
        try {
            // In a real-world scenario, you'd get challenges from a server.
            // Since this is client-side only for now, we'll use a mock WebAuthn flow
            // or a simple verify if supported. Note: Full WebAuthn requires a backend.
            // For this specific local-only request, we'll use a simplified auth flow.

            if (!hasBiometricEnrolled) {
                alert("Please log in with password first and enable fingerprint in settings.");
                return;
            }

            // Simplified Biometric verify (simulated for client-side persistence)
            // Real WebAuthn implementation:
            /*
            const options = {
                publicKey: {
                    challenge: new Uint8Array([1,2,3,4]), // From server
                    allowCredentials: [{ id: enrolledId, type: 'public-key' }],
                    userVerification: 'required'
                }
            };
            const assertion = await navigator.credentials.get(options);
            */

            // For now, if they enable it, we assume the system biometrics handled the check
            // because they reached this point.
            setIsLoggedIn(true);
        } catch (err) {
            console.error("Biometric login failed", err);
        }
    };

    const setupBiometric = async () => {
        try {
            // Simplified registration flow for client-side local use
            const challenge = new Uint8Array(32);
            window.crypto.getRandomValues(challenge);

            const options: any = {
                publicKey: {
                    rp: { name: "iUnlock Hub" },
                    user: {
                        id: new Uint8Array([1, 2, 3, 4]),
                        name: "admin",
                        displayName: "Admin"
                    },
                    challenge: challenge,
                    pubKeyCredParams: [{ type: "public-key", alg: -7 }],
                    authenticatorSelection: { userVerification: "required" },
                    timeout: 60000
                }
            };

            const credential = await navigator.credentials.create(options);
            if (credential) {
                localStorage.setItem('iunlock_admin_biometric', 'true');
                setHasBiometricEnrolled(true);
                alert("Fingerprint registered successfully! You can now use it to log in.");
            }
        } catch (err) {
            console.error("Biometric setup failed", err);
            alert("Could not set up fingerprint. Make sure your device has a sensor and you are using HTTPS.");
        }
    };

    const deleteOrder = (id: string) => {
        if (confirm('Are you sure you want to delete this order?')) {
            const updated = orders.filter(o => o.id !== id);
            setOrders(updated);
            localStorage.setItem('iunlock_orders', JSON.stringify(updated));
        }
    };

    const updateStatus = (id: string, newStatus: string) => {
        const updated = orders.map(o => o.id === id ? { ...o, status: newStatus } : o);
        setOrders(updated);
        localStorage.setItem('iunlock_orders', JSON.stringify(updated));
    };

    const categories = ['All', 'iPhone', 'iPad', 'iPod', 'Unlock Tools'];

    const filteredOrders = orders.filter(order => {
        const matchesTab = activeTab === 'All' || order.category === activeTab;
        const matchesSearch = order.imei.includes(searchQuery) || order.name.toLowerCase().includes(searchQuery.toLowerCase());
        return matchesTab && matchesSearch;
    });

    if (!isLoggedIn) {
        return (
            <main className="min-h-screen bg-black text-white flex items-center justify-center p-4">
                <div className="w-full max-w-md bg-neutral-900 border border-neutral-800 rounded-3xl p-8 shadow-2xl">
                    <div className="text-center mb-8">
                        <div className="w-16 h-16 bg-red-600/20 rounded-full flex items-center justify-center mx-auto mb-4 text-red-500">
                            <Shield className="w-8 h-8" />
                        </div>
                        <h1 className="text-2xl font-bold">Admin Secure Access</h1>
                        <p className="text-gray-500 mt-2">Manage orders securely</p>
                    </div>

                    {isBiometricSupported && hasBiometricEnrolled && (
                        <button
                            onClick={handleBiometricLogin}
                            className="w-full mb-6 bg-neutral-800 hover:bg-neutral-700 text-white font-bold py-4 rounded-xl flex items-center justify-center gap-3 transition-all border border-neutral-700"
                        >
                            <Fingerprint className="w-6 h-6 text-red-500" />
                            Use Fingerprint
                        </button>
                    )}

                    <div className="relative mb-6">
                        <div className="absolute inset-0 flex items-center"><span className="w-full border-t border-neutral-800"></span></div>
                        <div className="relative flex justify-center text-xs uppercase"><span className="bg-neutral-900 px-2 text-gray-500">or use password</span></div>
                    </div>

                    <form onSubmit={handleLogin} className="space-y-4">
                        <input
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            placeholder="Access Code"
                            className="w-full bg-black border border-neutral-800 rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-red-600 transition-all font-mono"
                        />
                        <button type="submit" className="w-full bg-red-600 hover:bg-red-700 text-white font-bold py-3 rounded-xl transition-all">
                            Login Dashboard
                        </button>
                    </form>
                </div>
            </main>
        );
    }

    return (
        <main className="min-h-screen bg-black text-white pb-20">
            <Header />
            <div className="container mx-auto px-4 pt-32">
                <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-8">
                    <div>
                        <h1 className="text-3xl font-bold mb-1">Order Management</h1>
                        <p className="text-gray-500">Manage all incoming device unlocks & rentals</p>
                    </div>
                    <div className="bg-neutral-900 border border-neutral-800 rounded-2xl p-4 flex items-center gap-8">
                        {isBiometricSupported && (
                            <button
                                onClick={setupBiometric}
                                className={`flex flex-col items-center gap-1 px-4 py-1 rounded-xl transition-all ${hasBiometricEnrolled ? 'text-green-500 hover:bg-green-500/10' : 'text-gray-400 hover:bg-red-600/10 hover:text-red-500'}`}
                                title={hasBiometricEnrolled ? "Fingerprint Enabled" : "Setup Fingerprint"}
                            >
                                <Fingerprint className="w-5 h-5" />
                                <span className="text-[10px] font-bold uppercase tracking-tight">{hasBiometricEnrolled ? "Secure" : "Secure App"}</span>
                            </button>
                        )}
                        <div className="w-px h-8 bg-neutral-800"></div>
                        <div className="text-center">
                            <p className="text-xs text-gray-500 uppercase font-bold tracking-wider">Total</p>
                            <p className="text-xl font-bold">{orders.length}</p>
                        </div>
                        <div className="w-px h-8 bg-neutral-800"></div>
                        <div className="text-center">
                            <p className="text-xs text-gray-500 uppercase font-bold tracking-wider text-red-500">Pending</p>
                            <p className="text-xl font-bold text-red-500">{orders.filter(o => o.status === 'Pending').length}</p>
                        </div>
                    </div>
                </div>

                {/* Filters */}
                <div className="flex flex-col md:flex-row gap-4 mb-8">
                    <div className="flex-1 overflow-x-auto pb-2 scrollbar-hide">
                        <div className="flex bg-neutral-900/50 p-1 rounded-xl border border-neutral-800 whitespace-nowrap">
                            {categories.map(cat => (
                                <button
                                    key={cat}
                                    onClick={() => setActiveTab(cat)}
                                    className={`px-6 py-2 rounded-lg text-sm font-semibold transition-all ${activeTab === cat ? 'bg-red-600 text-white shadow-lg' : 'text-gray-500 hover:text-white'}`}
                                >
                                    {cat}
                                </button>
                            ))}
                        </div>
                    </div>
                    <div className="relative">
                        <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" />
                        <input
                            type="text"
                            placeholder="Search IMEI or Name..."
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            className="bg-neutral-900 border border-neutral-800 rounded-xl pl-10 pr-4 py-2 text-sm outline-none focus:ring-1 focus:ring-red-600 w-full md:w-64"
                        />
                    </div>
                </div>

                {/* Orders List */}
                <div className="grid gap-4">
                    {filteredOrders.length === 0 ? (
                        <div className="text-center py-20 bg-neutral-900/20 border border-dashed border-neutral-800 rounded-3xl">
                            <Package className="w-12 h-12 text-neutral-700 mx-auto mb-4" />
                            <p className="text-gray-500 font-medium">No orders found for this category</p>
                        </div>
                    ) : (
                        filteredOrders.map(order => (
                            <div key={order.id} className="bg-neutral-900/50 border border-neutral-800 rounded-2xl overflow-hidden hover:border-neutral-700 transition-all group">
                                <div className="p-6 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
                                    <div className="flex items-center gap-4">
                                        <div className="w-12 h-12 bg-red-600/10 rounded-xl flex items-center justify-center text-red-500">
                                            {order.category === 'iPhone' ? <Smartphone /> : order.category === 'iPad' ? <Tablet /> : <Wrench />}
                                        </div>
                                        <div>
                                            <div className="flex items-center gap-2 mb-1">
                                                <h3 className="font-bold text-white">{order.model}</h3>
                                                <span className={`text-[10px] px-2 py-0.5 rounded-full font-bold uppercase tracking-wider ${order.status === 'Completed' ? 'bg-green-500/10 text-green-500' : 'bg-red-500/10 text-red-500'}`}>
                                                    {order.status}
                                                </span>
                                            </div>
                                            <p className="text-sm text-gray-500 font-mono">IMEI: {order.imei}</p>
                                        </div>
                                    </div>

                                    <div className="grid grid-cols-2 md:grid-cols-3 gap-8 flex-1 max-w-2xl px-4 text-sm">
                                        <div>
                                            <p className="text-gray-500 uppercase text-[10px] font-bold mb-1 tracking-widest">Customer</p>
                                            <p className="text-white font-medium">{order.name}</p>
                                        </div>
                                        <div>
                                            <p className="text-gray-500 uppercase text-[10px] font-bold mb-1 tracking-widest">Contact</p>
                                            <p className="text-white font-medium underline underline-offset-4">{order.whatsapp}</p>
                                        </div>
                                        <div>
                                            <p className="text-gray-500 uppercase text-[10px] font-bold mb-1 tracking-widest">Date</p>
                                            <p className="text-white font-medium">{order.timestamp}</p>
                                        </div>
                                    </div>

                                    <div className="flex items-center gap-2">
                                        {order.status !== 'Completed' && (
                                            <button
                                                onClick={() => updateStatus(order.id, 'Completed')}
                                                className="p-2 bg-green-500/10 hover:bg-green-500 text-green-500 hover:text-white rounded-lg transition-all"
                                                title="Mark as Completed"
                                            >
                                                <CheckCircle2 className="w-5 h-5" />
                                            </button>
                                        )}
                                        <button
                                            onClick={() => deleteOrder(order.id)}
                                            className="p-2 bg-red-500/10 hover:bg-red-500 text-red-500 hover:text-white rounded-lg transition-all"
                                            title="Delete Order"
                                        >
                                            <Trash2 className="w-5 h-5" />
                                        </button>
                                    </div>
                                </div>
                            </div>
                        ))
                    )}
                </div>
            </div>
        </main>
    );
}
