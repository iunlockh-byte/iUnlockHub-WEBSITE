import Header from "@/components/Header";
import { Scale, AlertTriangle, CreditCard, Clock } from "lucide-react";

export default function TermsAndConditions() {
    return (
        <main className="min-h-screen bg-black text-white">
            <Header />

            <section className="pt-32 pb-20">
                <div className="container mx-auto px-4 max-w-4xl">
                    <div className="text-center mb-16">
                        <div className="inline-flex items-center gap-2 px-3 py-1 bg-red-500/10 border border-red-500/20 rounded-full text-red-400 text-xs font-medium uppercase tracking-wider mb-6">
                            <Scale className="w-3 h-3" />
                            User Agreement
                        </div>
                        <h1 className="text-4xl md:text-6xl font-bold mb-6">Terms & <span className="text-red-600">Conditions</span></h1>
                        <p className="text-gray-400 text-lg">Please read these terms carefully before using our services.</p>
                    </div>

                    <div className="space-y-12 bg-neutral-900/30 border border-neutral-800 rounded-3xl p-8 md:p-12">
                        <div>
                            <div className="flex items-center gap-3 mb-4">
                                <AlertTriangle className="w-6 h-6 text-red-500" />
                                <h2 className="text-2xl font-bold text-white">1. Service Scope</h2>
                            </div>
                            <p className="text-gray-400 leading-relaxed mb-4">
                                iUnlock Hub provides remote iCloud unlocking and digital tool rental services. By using our site, you understand that:
                            </p>
                            <ul className="list-disc list-inside text-gray-400 space-y-2 ml-4">
                                <li>Unlocking success depends on the device status (Clean/Lost/Stolen) and server availability.</li>
                                <li>Tool rentals are digital licenses for specific software (Chimera, Hydra, etc.) for a limited time.</li>
                                <li>You must provide accurate IMEI and Model information to avoid order failure.</li>
                            </ul>
                        </div>

                        <div>
                            <div className="flex items-center gap-3 mb-4">
                                <CreditCard className="w-6 h-6 text-red-500" />
                                <h2 className="text-2xl font-bold text-white">2. Payments & Refunds</h2>
                            </div>
                            <p className="text-gray-400 leading-relaxed mb-4">
                                All payments are made via cryptocurrency or supported digital methods.
                            </p>
                            <ul className="list-disc list-inside text-gray-400 space-y-2 ml-4">
                                <li>Orders are non-refundable once the unlocking process has been initiated on the server.</li>
                                <li>If an order cannot be processed due to a server error, a credit or refund may be issued at our discretion.</li>
                                <li>No refunds will be given for incorrect IMEI/Model information provided by the customer.</li>
                            </ul>
                        </div>

                        <div>
                            <div className="flex items-center gap-3 mb-4">
                                <Clock className="w-6 h-6 text-red-500" />
                                <h2 className="text-2xl font-bold text-white">3. Delivery Times</h2>
                            </div>
                            <p className="text-gray-400 leading-relaxed">
                                We aim to respond to all orders and inquiries within **24 hours**. Digital tool rentals are usually delivered within 1-6 hours during business operations. Complex iCloud unlocks may take 1-7 business days depending on the service level selected.
                            </p>
                        </div>

                        <div>
                            <div className="flex items-center gap-3 mb-4">
                                <Scale className="w-6 h-6 text-red-500" />
                                <h2 className="text-2xl font-bold text-white">4. Disclaimer</h2>
                            </div>
                            <p className="text-gray-400 leading-relaxed">
                                iUnlock Hub is not responsible for any software issues, data loss, or bricked devices resulting from the use of third-party tools (3uTools, iTunes, etc.) or unlocking attempts. Our services are intended for legal device owners only.
                            </p>
                        </div>

                        <div className="pt-8 border-t border-neutral-800">
                            <p className="text-sm text-gray-500 italic">
                                By placing an order with iUnlock Hub, you agree to these terms in full.
                            </p>
                        </div>
                    </div>
                </div>
            </section>
        </main>
    );
}
