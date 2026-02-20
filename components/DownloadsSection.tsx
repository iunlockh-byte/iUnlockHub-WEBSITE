import { Download, Globe, HardDrive } from 'lucide-react';
import Link from 'next/link';

const SOFTWARE = [
    {
        name: "3uTools",
        description: "Comprehensive tool for iOS flashing and jailbreaking.",
        icon: HardDrive,
        url: "http://www.3u.com/"
    },
    {
        name: "iTunes",
        description: "Essential driver and management software for iOS devices.",
        icon: Globe,
        url: "https://www.apple.com/itunes/"
    },
    {
        name: "UltraViewer",
        description: "Remote desktop software for secure support access.",
        icon: Monitor,
        url: "https://www.ultraviewer.net/en/download.html"
    }
];

import { Monitor } from 'lucide-react'; // Moved import to top to fix reference

export default function DownloadsSection() {
    return (
        <section id="downloads" className="py-24 bg-black">
            <div className="container mx-auto px-4">
                <div className="text-center mb-16">
                    <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">Required Software</h2>
                    <p className="text-gray-400 max-w-2xl mx-auto">
                        Please download and install these applications on your Windows PC before our scheduled session.
                    </p>
                </div>

                <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
                    {SOFTWARE.map((app, index) => (
                        <div key={index} className="bg-neutral-900/50 border border-neutral-800 rounded-3xl p-8 hover:border-red-600/30 transition-all text-center group">
                            <div className="w-20 h-20 bg-neutral-800 rounded-full flex items-center justify-center mx-auto mb-6 group-hover:bg-red-600/20 transition-colors">
                                <app.icon className="w-10 h-10 text-white group-hover:text-red-500 transition-colors" />
                            </div>

                            <h3 className="text-2xl font-bold text-white mb-3">{app.name}</h3>
                            <p className="text-gray-400 text-sm mb-8">{app.description}</p>

                            <Link
                                href={app.url}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="inline-flex items-center gap-2 px-6 py-3 bg-white text-black font-bold rounded-xl hover:bg-gray-200 transition-colors w-full justify-center"
                            >
                                <Download className="w-4 h-4" /> Download Now
                            </Link>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
