import React from "react";
// import { motion } from "framer-motion"; // Removed as motion is no longer used
import { RocketIcon, GiftIcon, CoinsIcon } from "./components";

const featuresData = [
    {
        icon: (
            <RocketIcon className="text-theme-blue h-10 w-10 md:h-12 md:w-12" />
        ),
        title: "Guided Token Creation",
        description:
            "Create fungible ESDT tokens with our step-by-step wizard. Configure properties like supply, minting, burning, and ownership transfer with clear explanations—perfect for creators, artists, and startups.",
    },
    {
        icon: (
            <GiftIcon className="text-theme-blue h-10 w-10 md:h-12 md:w-12" />
        ),
        title: "Smart Batch Airdrops",
        description:
            "Upload CSV files or manually add recipients. SimpliFi automatically chooses the optimal distribution method—direct transfers for small lists, smart contracts for large campaigns.",
    },
    {
        icon: (
            <CoinsIcon className="text-theme-blue h-10 w-10 md:h-12 md:w-12" />
        ),
        title: "xExchange Integration",
        description:
            "Add initial liquidity to xExchange pools with educational guidance on pricing and risks. Make your tokens tradable safely with built-in warnings and clear explanations.",
    },
    {
        icon: (
            <svg
                className="text-theme-blue h-10 w-10 md:h-12 md:w-12"
                fill="currentColor"
                viewBox="0 0 20 20"
            >
                <path
                    fillRule="evenodd"
                    d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z"
                    clipRule="evenodd"
                />
            </svg>
        ),
        title: "Educational Guidance",
        description:
            "Every step includes contextual help, tooltips, and clear explanations. Understand token properties, financial implications, and risks before making decisions—designed for non-technical users.",
    },
    {
        icon: (
            <svg
                className="text-theme-blue h-10 w-10 md:h-12 md:w-12"
                fill="currentColor"
                viewBox="0 0 20 20"
            >
                <path
                    fillRule="evenodd"
                    d="M11.49 3.17c-.38-1.56-2.6-1.56-2.98 0a1.532 1.532 0 01-2.286.948c-1.372-.836-2.942.734-2.106 2.106.54.886.061 2.042-.947 2.287-1.561.379-1.561 2.6 0 2.978a1.532 1.532 0 01.947 2.287c-.836 1.372.734 2.942 2.106 2.106a1.532 1.532 0 012.287.947c.379 1.561 2.6 1.561 2.978 0a1.533 1.533 0 012.287-.947c1.372.836 2.942-.734 2.106-2.106a1.533 1.533 0 01.947-2.287c1.561-.379 1.561-2.6 0-2.978a1.532 1.532 0 01-.947-2.287c.836-1.372-.734-2.942-2.106-2.106a1.532 1.532 0 01-2.287-.947zM10 13a3 3 0 100-6 3 3 0 000 6z"
                    clipRule="evenodd"
                />
            </svg>
        ),
        title: "Post-Launch Management",
        description:
            "Complete dashboard for token owners to mint, burn, pause, transfer ownership, and manage all token properties. Control your token's lifecycle with simple, secure interfaces.",
    },
    {
        icon: (
            <svg
                className="text-theme-blue h-10 w-10 md:h-12 md:w-12"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
            >
                <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"
                />
            </svg>
        ),
        title: "Non-Custodial Security",
        description:
            "Your keys, your tokens. SimpliFi never accesses your private keys—all transactions are signed in your MultiversX wallet. Audited smart contracts where custom logic is unavoidable.",
    },
];

export const FeaturesSection: React.FC = () => {
    return (
        <section className="py-20 md:py-24 bg-white">
            {/* Block 1: Title and Subtitle */}
            <div className="container mx-auto px-6 text-center mb-16">
                <div className="max-w-3xl mx-auto">
                    <h2 className="text-4xl md:text-5xl font-bold text-graphite mb-6">
                        Everything You Need for Your
                        <span className="bg-gradient-to-r from-theme-blue to-theme-blue-dark bg-clip-text text-transparent">
                            {" "}
                            ESDT Journey
                        </span>
                    </h2>
                    <p className="text-xl text-graphite/80 leading-relaxed">
                        From token launch to community growth, SimpliFi provides
                        the complete toolkit for creators, startups, and
                        communities building on MultiversX.
                    </p>
                </div>
            </div>

            {/* Block 2: Feature Grid */}
            <div className="container mx-auto px-6">
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
                    {featuresData.map((feature) => (
                        <div
                            key={feature.title}
                            className="group bg-gradient-to-br from-cloud-white to-white p-8 rounded-2xl border border-ash/20 hover:border-theme-blue/20 hover:shadow-level-2 transition-all duration-300 ease-in-out hover:-translate-y-1"
                        >
                            <div className="flex flex-col items-start text-left">
                                <div className="mb-4 p-3 bg-theme-blue/10 rounded-xl group-hover:bg-theme-blue/15 transition-colors duration-300">
                                    {feature.icon}
                                </div>
                                <h3 className="text-xl font-semibold text-graphite mb-3">
                                    {feature.title}
                                </h3>
                                <p className="text-slate leading-relaxed">
                                    {feature.description}
                                </p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {/* Target Audience Highlight */}
            <div className="container mx-auto px-6 mt-20">
                <div className="bg-gradient-to-r from-theme-blue/5 to-theme-blue-light/5 rounded-2xl p-8 md:p-12 text-center border border-theme-blue/10">
                    <h3 className="text-2xl md:text-3xl font-bold text-graphite mb-4">
                        Built for Everyone in the MultiversX Ecosystem
                    </h3>
                    <div className="flex flex-wrap justify-center gap-4 text-sm md:text-base">
                        {[
                            "🎨 Creators & Artists",
                            "🚀 Startups & Entrepreneurs",
                            "🏢 Small-Medium Businesses",
                            "👥 Community Managers",
                            "⚡ Developers (seeking speed)",
                            "🌟 Non-technical Innovators",
                        ].map((audience, index) => (
                            <div
                                key={index}
                                className="bg-white/80 backdrop-blur-sm px-4 py-2 rounded-full border border-theme-blue/10"
                            >
                                {audience}
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
};
