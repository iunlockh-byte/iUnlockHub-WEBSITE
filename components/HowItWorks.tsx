import { Monitor, Clock, Laptop, PhoneCall, AlertTriangle, CheckCircle } from 'lucide-react';

export default function HowItWorks() {
    const steps = [
        {
            icon: Laptop,
            title: "1. Place Your Order",
            description: "Select your service, enter your device details, and complete the secure payment process."
        },
        {
            icon: PhoneCall,
            title: "2. We Contact You",
            description: "Our team will contact you within 24 hours via WhatsApp or Email to schedule the unlocking session."
        },
        {
            icon: Monitor,
            title: "3. Prepare Your PC",
            description: "Install the required software (3uTools, iTunes, UltraViewer) on your Windows PC or Laptop."
        },
        {
            icon: CheckCircle,
            title: "4. Remote Unlock",
            description: "We connect remotely via UltraViewer and unlock your device securely while you watch."
        }
    ];

    return (
        <section id="how-it-works" className="py-24 bg-neutral-900 border-t border-neutral-800">
            <div className="container mx-auto px-4">
                <div className="max-w-3xl mx-auto text-center mb-16">
                    <h2 className="text-4xl font-bold text-white mb-6">How It Works</h2>
                    <p className="text-gray-400 text-lg">
                        Our remote unlocking process is simple, secure, and fully transparent. follow these steps to get your device unlocked.
                    </p>
                </div>

                {/* Important Warning */}
                <div className="max-w-4xl mx-auto mb-16 bg-red-900/10 border border-red-900/30 rounded-2xl p-6 md:p-8 flex flex-col md:flex-row items-center gap-6">
                    <div className="h-14 w-14 min-w-[3.5rem] bg-red-600/20 rounded-full flex items-center justify-center">
                        <AlertTriangle className="w-7 h-7 text-red-500 animate-pulse" />
                    </div>
                    <div>
                        <h3 className="text-xl font-bold text-red-500 mb-2">Windows PC Required</h3>
                        <p className="text-gray-300 leading-relaxed">
                            This service is performed remotely and <strong className="text-white">requires a Windows PC or Laptop</strong>.
                            We simply cannot perform this service on Apple Mac (macOS) or Linux systems.
                            You must also have a stable internet connection.
                        </p>
                    </div>
                </div>

                <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
                    {steps.map((step, index) => (
                        <div key={index} className="relative group">
                            {index < steps.length - 1 && (
                                <div className="hidden lg:block absolute top-8 left-1/2 w-full h-0.5 bg-neutral-800 -z-10" />
                            )}
                            <div className="bg-black border border-neutral-800 rounded-2xl p-8 hover:border-red-600/30 transition-all duration-300 hover:shadow-[0_0_20px_rgba(220,38,38,0.1)] h-full">
                                <div className="w-16 h-16 bg-neutral-900 rounded-2xl flex items-center justify-center mb-6 mx-auto group-hover:bg-red-600 transition-colors duration-300">
                                    <step.icon className="w-8 h-8 text-white" />
                                </div>
                                <h3 className="text-xl font-bold text-center text-white mb-3">{step.title}</h3>
                                <p className="text-gray-400 text-center text-sm leading-relaxed">
                                    {step.description}
                                </p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
