import Header from "@/components/Header";
import ToolsList from "@/components/ToolsList";
import { Wrench } from "lucide-react";
import Link from "next/link";

export default function ToolsPage() {
    return (
        <main className="min-h-screen bg-black text-white">
            <Header />

            {/* Hero Section */}
            <section className="relative pt-32 pb-12 overflow-hidden">
                <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-[500px] bg-red-600/10 blur-[120px] rounded-full pointer-events-none" />

                <div className="container mx-auto px-4 relative z-10 text-center">
                    <div className="inline-flex items-center gap-2 px-3 py-1 bg-red-500/10 border border-red-500/20 rounded-full text-red-400 text-xs font-medium uppercase tracking-wider mb-6">
                        <Wrench className="w-3 h-3" />
                        Professional Tools
                    </div>

                    <h1 className="text-4xl md:text-6xl font-bold mb-6">
                        Tool Rent <span className="text-transparent bg-clip-text bg-gradient-to-r from-red-500 to-red-800">Service</span>
                    </h1>

                    <p className="text-gray-400 max-w-2xl mx-auto text-lg leading-relaxed">
                        Access premium unlocking and repair tools instantly. Secure digital licenses and hourly rentals for professional technicians.
                    </p>
                </div>
            </section>

            <ToolsList />

            <footer className="py-8 text-center text-zinc-600 border-t border-zinc-900 bg-neutral-950">
                <div className="container mx-auto px-4 flex flex-col md:flex-row justify-between items-center gap-4">
                    <p>&copy; 2024 iUnlock Hub. All rights reserved.</p>
                    <div className="flex gap-6 text-sm">
                        <Link href="/privacy" className="hover:text-white transition-colors">Privacy Policy</Link>
                        <Link href="/terms" className="hover:text-white transition-colors">Terms of Service</Link>
                        <Link href="https://wa.me/94766079059" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors">Support</Link>
                    </div>
                </div>
            </footer>
        </main>
    );
}
