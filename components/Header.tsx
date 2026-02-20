"use client";

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { Lock, User, MessageSquare, LogOut } from 'lucide-react';
import { createClient } from '@/utils/supabase/client';
import { User as SupabaseUser } from '@supabase/supabase-js';

export default function Header() {
  const [user, setUser] = useState<SupabaseUser | null>(null);
  const supabase = createClient();

  useEffect(() => {
    const getUser = async () => {
      const { data: { user } } = await supabase.auth.getUser();
      setUser(user);
    };
    getUser();

    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user ?? null);
    });

    return () => subscription.unsubscribe();
  }, [supabase.auth]);

  const handleSignOut = async () => {
    await supabase.auth.signOut();
    window.location.reload();
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-black/80 backdrop-blur-md border-b border-white/10">
      <div className="container mx-auto px-4 h-16 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2 group">
          <div className="p-2 bg-red-600 rounded-lg group-hover:bg-red-700 transition-colors">
            <Lock className="w-5 h-5 text-white" />
          </div>
          <span className="text-xl font-bold bg-gradient-to-r from-white to-gray-400 bg-clip-text text-transparent">
            iUnlock Hub
          </span>
        </Link>

        <nav className="hidden lg:flex items-center gap-6">
          <Link href="/#services" className="text-sm font-medium text-gray-400 hover:text-white transition-colors">
            Services
          </Link>
          <Link href="/#how-it-works" className="text-sm font-medium text-gray-400 hover:text-white transition-colors">
            How it Works
          </Link>
          <Link href="/tools" className="text-sm font-medium text-gray-400 hover:text-white transition-colors">
            Tools
          </Link>
          <Link href="/imei-check" className="text-sm font-medium text-gray-400 hover:text-white transition-colors">
            IMEI Check
          </Link>
          <Link href="/community" className="text-sm font-medium text-gray-400 hover:text-white transition-colors flex items-center gap-1.5">
            <MessageSquare className="w-4 h-4" />
            Community
          </Link>
          <Link href="/#faq" className="text-sm font-medium text-gray-400 hover:text-white transition-colors">
            FAQ
          </Link>
        </nav>

        <div className="flex items-center gap-4">
          {user ? (
            <div className="flex items-center gap-4">
              <Link href="/profile" className="flex items-center gap-2 text-sm font-medium text-gray-400 hover:text-white transition-colors">
                <div className="w-8 h-8 bg-zinc-800 rounded-full flex items-center justify-center border border-zinc-700">
                  <User className="w-4 h-4 text-zinc-300" />
                </div>
                <span className="hidden sm:inline">{user.email?.split('@')[0]}</span>
              </Link>
              <button onClick={handleSignOut} className="text-zinc-500 hover:text-red-500 transition-colors" title="Sign Out">
                <LogOut className="w-5 h-5" />
              </button>
            </div>
          ) : (
            <Link
              href="/auth"
              className="text-sm font-medium text-gray-400 hover:text-white transition-colors flex items-center gap-2"
            >
              <User className="w-4 h-4" />
              Sign In
            </Link>
          )}

          <Link
            href="/order"
            className="px-5 py-2 bg-red-600 hover:bg-red-700 text-white text-sm font-semibold rounded-full transition-all shadow-[0_0_20px_rgba(220,38,38,0.5)] hover:shadow-[0_0_30px_rgba(220,38,38,0.8)]"
          >
            Unlock Now
          </Link>
        </div>
      </div>
    </header>
  );
}
