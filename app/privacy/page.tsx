import Header from "@/components/Header";
import { Shield, Lock, Eye, FileText } from "lucide-react";

export default function PrivacyPolicy() {
    return (
        <main className="min-h-screen bg-black text-white">
            <Header />

            <section className="pt-32 pb-20">
                <div className="container mx-auto px-4 max-w-4xl">
                    <div className="text-center mb-16">
                        <div className="inline-flex items-center gap-2 px-3 py-1 bg-red-500/10 border border-red-500/20 rounded-full text-red-400 text-xs font-medium uppercase tracking-wider mb-6">
                            <Shield className="w-3 h-3" />
                            Data Protection
                        </div>
                        <h1 className="text-4xl md:text-6xl font-bold mb-6">Privacy <span className="text-red-600">Policy</span></h1>
                        <p className="text-gray-400 text-lg">Your privacy is our priority. Learn how we handle your data.</p>
                    </div>

                    <div className="space-y-12 bg-neutral-900/30 border border-neutral-800 rounded-3xl p-8 md:p-12">
                        <div>
                            <div className="flex items-center gap-3 mb-4">
                                <Eye className="w-6 h-6 text-red-500" />
                                <h2 className="text-2xl font-bold text-white">1. Information We Collect</h2>
                            </div>
                            <p className="text-gray-400 leading-relaxed mb-4">
                                To provide our unlocking and tool rental services, we collect minimal but necessary information:
                            </p>
                            <ul className="list-disc list-inside text-gray-400 space-y-2 ml-4">
                                <li>Device identifiers: IMEI, Serial Number, and Model.</li>
                                <li>Contact Information: WhatsApp Number, Name, and Email address.</li>
                                <li>Payment Confirmation: Transaction details or screenshots provided by you.</li>
                            </ul>
                        </div>

                        <div>
                            <div className="flex items-center gap-3 mb-4">
                                <Lock className="w-6 h-6 text-red-500" />
                                <h2 className="text-2xl font-bold text-white">2. How We Use Your Data</h2>
                            </div>
                            <p className="text-gray-400 leading-relaxed mb-4">
                                Your information is strictly used for:
                            </p>
                            <ul className="list-disc list-inside text-gray-400 space-y-2 ml-4">
                                <li>Processing your unlocking requests with authorized servers.</li>
                                <li>Communicating order status via WhatsApp or Email.</li>
                                <li>Granting access to digital tool licenses.</li>
                            </ul>
                        </div>

                        <div>
                            <div className="flex items-center gap-3 mb-4">
                                <Shield className="w-6 h-6 text-red-500" />
                                <h2 className="text-2xl font-bold text-white">3. Biometric Security</h2>
                            </div>
                            <p className="text-gray-400 leading-relaxed">
                                For Admin users, we offer biometric login (Fingerprint). **Your biometric data never leaves your device.** It is managed by your device's secure hardware (WebAuthn API), and our website only receives a "success" confirmation. We do not store or see your actual fingerprint.
                            </p>
                        </div>

                        <div>
                            <div className="flex items-center gap-3 mb-4">
                                <FileText className="w-6 h-6 text-red-500" />
                                <h2 className="text-2xl font-bold text-white">4. Data Storage</h2>
                            </div>
                            <p className="text-gray-400 leading-relaxed">
                                We utilize browser <span className="text-white font-mono">localStorage</span> to save your order history on your own device for convenience. Our administrators have access to order details via a secure panel only for processing purposes. We do not sell or share your personal data with third-party advertisers.
                            </p>
                        </div>

                        <div className="pt-8 border-t border-neutral-800">
                            <p className="text-sm text-gray-500 italic">
                                Last Updated: February 17, 2026. For any privacy concerns, please contact us via **iunlockh@gmail.com** or our WhatsApp support.
                            </p>
                        </div>
                    </div>
                </div>
            </section>
        </main>
    );
}
