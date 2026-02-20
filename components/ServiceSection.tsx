import { CloudOff, Smartphone, Shield, Unlock } from 'lucide-react';
import Link from 'next/link';

const services = [
    {
        icon: CloudOff,
        title: "iCloud Unlock",
        description: "Permanently remove iCloud Activation Lock from any iPhone or iPad model.",
        price: "From $20.00",
        href: "/order?service=icloud"
    },
    {
        icon: Smartphone,
        title: "Carrier Unlock",
        description: "Unlock your device from any carrier to use any SIM card worldwide.",
        price: "Fixed $49.99",
        href: "/order?service=carrier"
    },
    {
        icon: Shield,
        title: "MDM Bypass",
        description: "Remove Mobile Device Management (MDM) profiles from corporate devices.",
        price: "Fixed $80.00",
        href: "/order?service=mdm"
    },
    {
        icon: Unlock,
        title: "Passcode Removal",
        description: "Reset disabled devices and remove forgotten passcodes securely.",
        price: "From $29.99",
        href: "/order?service=passcode_removal"
    }
];

export default function ServiceSection() {
    return (
        <section id="services" className="py-24 bg-neutral-950">
            <div className="container mx-auto px-4">
                <div className="text-center mb-16">
                    <h2 className="text-4xl font-bold text-white mb-4">Our Premium Services</h2>
                    <p className="text-gray-400 max-w-2xl mx-auto">
                        Professional unlocking solutions for all your iOS device needs. Fast, secure, and fully remote.
                    </p>
                </div>

                <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
                    {services.map((service, index) => (
                        <Link
                            key={index}
                            href={service.href}
                            className="group relative p-8 bg-neutral-900 rounded-3xl border border-neutral-800 hover:border-red-600/50 transition-all duration-300 hover:shadow-[0_0_30px_rgba(220,38,38,0.1)] hover:-translate-y-1 block"
                        >
                            <div className="absolute inset-0 bg-gradient-to-br from-red-600/5 to-transparent rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity" />

                            <div className="relative z-10">
                                <div className="w-14 h-14 bg-neutral-800 rounded-2xl flex items-center justify-center mb-6 group-hover:bg-red-600 transition-colors duration-300">
                                    <service.icon className="w-7 h-7 text-white" />
                                </div>

                                <h3 className="text-xl font-bold text-white mb-3">{service.title}</h3>
                                <p className="text-gray-400 text-sm mb-6 leading-relaxed">
                                    {service.description}
                                </p>

                                <div className="flex items-center justify-between mt-auto">
                                    <span className="text-red-500 font-bold">{service.price}</span>
                                    <span className="text-sm text-gray-500 group-hover:text-white transition-colors">Order Now →</span>
                                </div>
                            </div>
                        </Link>
                    ))}
                </div>
            </div>
        </section>
    );
}
