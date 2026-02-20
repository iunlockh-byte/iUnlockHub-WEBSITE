import Link from "next/link";
import Header from "@/components/Header";
import Hero from "@/components/Hero";
import ServiceSection from "@/components/ServiceSection";

import HowItWorks from "@/components/HowItWorks";
import DownloadsSection from "@/components/DownloadsSection";
import FAQ from "@/components/FAQ";
import Reviews from "@/components/Reviews";

export default function Home() {
  return (
    <main className="min-h-screen bg-black text-white">
      <Header />
      <Hero />
      <ServiceSection />
      <HowItWorks />
      <DownloadsSection />
      <FAQ />
      <Reviews />

      <footer className="py-8 text-center text-zinc-600 border-t border-zinc-900 bg-neutral-950">
        <div className="container mx-auto px-4 flex flex-col md:flex-row justify-between items-center gap-4">
          <p>&copy; 2024 iUnlock Hub. All rights reserved.</p>
          <div className="flex flex-col md:flex-row gap-4 md:gap-8 text-sm">
            <Link href="/privacy" className="hover:text-white transition-colors">Privacy Policy</Link>
            <Link href="/terms" className="hover:text-white transition-colors">Terms of Service</Link>
            <div className="flex gap-6">
              <Link href="mailto:iunlockh@gmail.com" className="hover:text-white transition-colors flex items-center gap-1">Email Support</Link>
              <Link href="https://wa.me/94766079059" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors flex items-center gap-1">WhatsApp Support</Link>
            </div>
          </div>
        </div>
      </footer>
    </main>
  );
}
