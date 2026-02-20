"use client";

import { useEffect, useState } from 'react';
import { createClient } from '@/utils/supabase/client';
import { User, Mail, Calendar, Package, LogOut, ChevronRight, Settings, Shield } from 'lucide-react';
import Header from '@/components/Header';
import { User as SupabaseUser } from '@supabase/supabase-js';

export default function ProfilePage() {
    const [user, setUser] = useState<SupabaseUser | null>(null);
    const [loading, setLoading] = useState(true);
    const [orders, setOrders] = useState<any[]>([]);

    const supabase = createClient();

    useEffect(() => {
        const checkUser = async () => {
            const { data: { user } } = await supabase.auth.getUser();
            if (!user) {
                window.location.href = '/auth';
                return;
            }
            setUser(user);

            // 1. Load database orders
            const { data: dbOrders, error } = await supabase
                .from('orders')
                .select('*')
                .order('created_at', { ascending: false });

            if (!error && dbOrders) {
                const formattedOrders = dbOrders.map(order => ({
                    id: order.id.slice(0, 8),
                    serviceType: order.service_type,
                    model: order.device_model,
                    imei: order.imei,
                    price: `$${order.amount.toFixed(2)}`,
                    status: order.status,
                    timestamp: new Date(order.created_at).toLocaleString()
                }));
                setOrders(formattedOrders);
            } else {
                // 2. Fallback to local orders if DB is empty or error
                const localOrders = JSON.parse(localStorage.getItem('iunlock_orders') || '[]');
                setOrders(localOrders);
            }

            setLoading(false);
        };
        checkUser();
    }, []);

    const handleSignOut = async () => {
        await supabase.auth.signOut();
        window.location.href = '/';
    };

    if (loading) return (
        <div className="min-h-screen bg-black flex items-center justify-center">
            <div className="w-10 h-10 border-4 border-red-600 border-t-transparent rounded-full animate-spin" />
        </div>
    );

    return (
        <main className="min-h-screen bg-black text-white">
            <Header />

            <div className="pt-32 pb-20 container mx-auto px-4 max-w-5xl">
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">

                    {/* Sidebar / Info */}
                    <div className="lg:col-span-1 space-y-6">
                        <div className="bg-neutral-900 border border-neutral-800 rounded-[2.5rem] p-8 text-center relative overflow-hidden group">
                            <div className="absolute top-0 left-0 w-full h-24 bg-gradient-to-b from-red-600/20 to-transparent" />

                            <div className="relative z-10">
                                <div className="w-24 h-24 bg-zinc-800 rounded-3xl mx-auto mb-6 flex items-center justify-center border-4 border-black shadow-2xl">
                                    <User className="w-10 h-10 text-zinc-400" />
                                </div>
                                <h2 className="text-2xl font-bold mb-1">{user?.email?.split('@')[0]}</h2>
                                <p className="text-zinc-500 text-sm mb-6">{user?.email}</p>

                                <div className="flex flex-col gap-2">
                                    <button className="w-full py-3 bg-zinc-800 hover:bg-zinc-700 rounded-xl font-bold transition-all flex items-center justify-center gap-2 group/btn">
                                        <Settings className="w-4 h-4 text-zinc-500 group-hover/btn:rotate-90 transition-transform" />
                                        Edit Profile
                                    </button>
                                    <button
                                        onClick={handleSignOut}
                                        className="w-full py-3 text-red-500 hover:bg-red-500/10 rounded-xl font-bold transition-all flex items-center justify-center gap-2"
                                    >
                                        <LogOut className="w-4 h-4" />
                                        Sign Out
                                    </button>
                                </div>
                            </div>
                        </div>

                        <div className="bg-neutral-900 border border-neutral-800 rounded-3xl p-6 space-y-4">
                            <h3 className="text-sm font-bold text-zinc-500 uppercase tracking-widest px-2">Account Security</h3>
                            <div className="flex items-center gap-4 p-3 rounded-2xl bg-black/40 border border-neutral-800">
                                <div className="p-2 bg-green-500/10 rounded-lg">
                                    <Shield className="w-5 h-5 text-green-500" />
                                </div>
                                <div>
                                    <p className="text-sm font-bold">Email Verified</p>
                                    <p className="text-[10px] text-zinc-500">Your account is secure</p>
                                </div>
                            </div>
                            <div className="flex items-center gap-4 p-3 rounded-2xl bg-black/40 border border-neutral-800">
                                <div className="p-2 bg-blue-500/10 rounded-lg">
                                    <Calendar className="w-5 h-5 text-blue-500" />
                                </div>
                                <div>
                                    <p className="text-sm font-bold">Member Since</p>
                                    <p className="text-[10px] text-zinc-500">{new Date(user?.created_at || '').toLocaleDateString()}</p>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Main Content / Orders */}
                    <div className="lg:col-span-2 space-y-6">
                        <div className="bg-neutral-900 border border-neutral-800 rounded-[2.5rem] p-8 md:p-10">
                            <div className="flex items-center justify-between mb-8">
                                <h3 className="text-2xl font-black tracking-tight flex items-center gap-3">
                                    <Package className="w-8 h-8 text-red-600" />
                                    Order History
                                </h3>
                                <span className="px-4 py-1.5 bg-zinc-800 rounded-full text-xs font-bold text-zinc-400">
                                    {orders.length} Total Orders
                                </span>
                            </div>

                            {orders.length > 0 ? (
                                <div className="space-y-4">
                                    {orders.map((order) => (
                                        <div key={order.id} className="group bg-black/40 border border-neutral-800 hover:border-red-600/30 rounded-2xl p-6 transition-all">
                                            <div className="flex justify-between items-start mb-4">
                                                <div>
                                                    <p className="text-zinc-500 text-[10px] uppercase font-bold tracking-widest">#{order.id}</p>
                                                    <h4 className="text-lg font-bold text-white">{order.serviceType}</h4>
                                                    <p className="text-sm text-zinc-400">{order.model} • {order.imei}</p>
                                                </div>
                                                <div className="text-right">
                                                    <p className="text-xl font-black text-red-500">{order.price}</p>
                                                    <span className="inline-block px-3 py-1 bg-green-500/10 text-green-500 text-[10px] font-bold rounded-full border border-green-500/20">
                                                        {order.status}
                                                    </span>
                                                </div>
                                            </div>
                                            <div className="flex items-center justify-between pt-4 border-t border-white/5">
                                                <span className="text-xs text-zinc-600">{order.timestamp}</span>
                                                <button className="text-zinc-400 hover:text-white flex items-center gap-1 text-xs font-bold group-hover:gap-2 transition-all">
                                                    View Details
                                                    <ChevronRight className="w-4 h-4" />
                                                </button>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            ) : (
                                <div className="text-center py-20 bg-black/20 rounded-3xl border border-dashed border-neutral-800">
                                    <div className="w-16 h-16 bg-zinc-900 rounded-2xl flex items-center justify-center mx-auto mb-4 border border-zinc-800">
                                        <Package className="w-8 h-8 text-zinc-700" />
                                    </div>
                                    <p className="text-zinc-500 mb-6 font-medium">No order history found.</p>
                                    <a href="/order" className="px-8 py-3 bg-red-600 hover:bg-red-700 text-white font-bold rounded-xl transition-all shadow-lg shadow-red-600/20">
                                        Place Your First Order
                                    </a>
                                </div>
                            )}
                        </div>
                    </div>

                </div>
            </div>
        </main>
    );
}
