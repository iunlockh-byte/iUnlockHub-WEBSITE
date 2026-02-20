import Header from "@/components/Header";
import IMEIChecker from "@/components/IMEIChecker";
import Link from "next/link";
import { Search } from "lucide-react";

export default function IMEICheckPage() {
    return (
        <main className="min-h-screen bg-black text-white pb-20">
            <Header />

            {/* Hero Section */}
            <section className="relative pt-32 pb-12 overflow-hidden">
                <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-[500px] bg-red-600/10 blur-[120px] rounded-full pointer-events-none" />

                <div className="container mx-auto px-4 relative z-10 text-center">
                    <div className="inline-flex items-center gap-2 px-3 py-1 bg-red-500/10 border border-red-500/20 rounded-full text-red-400 text-xs font-medium uppercase tracking-wider mb-6">
                        <Search className="w-3 h-3" />
                        Device Intelligence
                    </div>

                    <h1 className="text-4xl md:text-6xl font-bold mb-6">
                        IMEI <span className="text-transparent bg-clip-text bg-gradient-to-r from-red-500 to-red-800">Analyzer</span>
                    </h1>

                    <p className="text-gray-400 max-w-2xl mx-auto text-lg leading-relaxed">
                        Verify your device status instantly. Check for iCloud locks, blacklist reports, warranty details, and original purchase information.
                    </p>
                </div>
            </section>

            <section className="container mx-auto px-4 relative z-20">
                <IMEIChecker />
            </section>

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
