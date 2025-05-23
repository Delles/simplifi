import React from "react";
import { Link } from "react-router-dom";

export const HowItWorksSection: React.FC = () => {
    const steps = [
        {
            number: "1",
            title: "Connect & Choose",
            description:
                "Connect your MultiversX wallet securely and select what you want to do—create tokens, manage existing ones, or distribute airdrops.",
            icon: (
                <svg
                    className="w-8 h-8 text-theme-blue"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                >
                    <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M13 10V3L4 14h7v7l9-11h-7z"
                    />
                </svg>
            ),
        },
        {
            number: "2",
            title: "Follow Guided Wizards",
            description:
                "Use our step-by-step wizards with built-in education. Configure token properties, upload airdrop lists, or set DEX liquidity—all with clear explanations.",
            icon: (
                <svg
                    className="w-8 h-8 text-theme-blue"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                >
                    <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z"
                    />
                </svg>
            ),
        },
        {
            number: "3",
            title: "Review & Execute",
            description:
                "Review your configuration with cost breakdowns and risk warnings. Sign transactions in your wallet—SimpliFi never touches your private keys.",
            icon: (
                <svg
                    className="w-8 h-8 text-theme-blue"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                >
                    <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                </svg>
            ),
        },
        {
            number: "4",
            title: "Manage & Grow",
            description:
                "Use your dashboard to manage tokens, track airdrop completion, monitor DEX pools, and grow your token ecosystem with ongoing guidance.",
            icon: (
                <svg
                    className="w-8 h-8 text-theme-blue"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                >
                    <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M7 12l3-3 3 3 4-4M8 21l4-4 4 4M3 4h18M4 4h16v12a1 1 0 01-1 1H5a1 1 0 01-1-1V4z"
                    />
                </svg>
            ),
        },
    ];

    return (
        <section className="py-20 md:py-24 bg-gradient-to-br from-cloud-white to-app-canvas">
            <div className="container mx-auto px-6">
                {/* Header */}
                <div className="text-center mb-16 max-w-3xl mx-auto">
                    <h2 className="text-4xl md:text-5xl font-bold text-graphite mb-6">
                        How SimpliFi{" "}
                        <span className="bg-gradient-to-r from-theme-blue to-theme-blue-dark bg-clip-text text-transparent">
                            Works
                        </span>
                    </h2>
                    <p className="text-xl text-graphite/80 leading-relaxed">
                        Our guided, educational approach makes token creation
                        and management accessible to everyone—no blockchain
                        expertise required.
                    </p>
                </div>

                {/* Steps */}
                <div className="relative max-w-6xl mx-auto">
                    {/* Connection Lines for Desktop */}
                    <div className="hidden lg:block absolute top-16 left-0 right-0 h-0.5 bg-gradient-to-r from-theme-blue/20 via-theme-blue/40 to-theme-blue/20"></div>

                    <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-6">
                        {steps.map((step, index) => (
                            <div key={step.number} className="relative">
                                {/* Step Card */}
                                <div className="bg-white rounded-2xl p-6 shadow-level-1 hover:shadow-level-2 transition-all duration-300 group border border-ash/20 hover:border-theme-blue/20">
                                    {/* Number Badge */}
                                    <div className="absolute -top-3 left-6 bg-theme-blue text-white rounded-full w-12 h-12 flex items-center justify-center text-xl font-bold shadow-level-2 group-hover:scale-110 transition-transform duration-300">
                                        {step.number}
                                    </div>

                                    {/* Icon */}
                                    <div className="mt-6 mb-4 p-3 bg-theme-blue/10 rounded-xl w-fit group-hover:bg-theme-blue/15 transition-colors duration-300">
                                        {step.icon}
                                    </div>

                                    {/* Content */}
                                    <h3 className="text-xl font-semibold text-graphite mb-3">
                                        {step.title}
                                    </h3>
                                    <p className="text-slate leading-relaxed text-sm">
                                        {step.description}
                                    </p>
                                </div>

                                {/* Mobile Connection Line */}
                                {index < steps.length - 1 && (
                                    <div className="lg:hidden flex justify-center mt-6 mb-2">
                                        <div className="w-0.5 h-8 bg-gradient-to-b from-theme-blue/40 to-theme-blue/20"></div>
                                    </div>
                                )}
                            </div>
                        ))}
                    </div>
                </div>

                {/* Bottom CTA */}
                <div className="text-center mt-16">
                    <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-8 border border-theme-blue/10 max-w-2xl mx-auto">
                        <h3 className="text-2xl font-bold text-graphite mb-4">
                            Ready to Start Your Token Journey?
                        </h3>
                        <p className="text-slate mb-6">
                            Join thousands of creators, startups, and
                            communities already building on MultiversX with
                            SimpliFi's guided approach.
                        </p>
                        <div className="flex flex-col sm:flex-row gap-4 justify-center">
                            <button className="bg-theme-blue text-white font-semibold py-3 px-6 rounded-xl hover:bg-theme-blue-dark transition-colors duration-300">
                                Start Creating
                            </button>
                            <Link
                                to="/learn"
                                className="border-2 border-theme-blue/20 text-theme-blue font-semibold py-3 px-6 rounded-xl hover:border-theme-blue/40 hover:bg-theme-blue/5 transition-all duration-300"
                            >
                                View Interactive Guide
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};
