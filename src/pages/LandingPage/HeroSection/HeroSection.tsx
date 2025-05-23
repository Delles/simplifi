import React from "react";
import { Link } from "react-router-dom";

interface HeroSectionProps {
    handleConnectWallet: () => void;
}

export const HeroSection: React.FC<HeroSectionProps> = ({
    handleConnectWallet,
}) => {
    return (
        <section className="relative bg-gradient-to-br from-cloud-white via-digital-lavender to-theme-blue-light py-20 md:py-28 lg:py-36 overflow-hidden">
            {/* Background Pattern */}
            <div className="absolute inset-0 opacity-5">
                <div className="absolute top-10 left-10 w-32 h-32 bg-theme-blue rounded-full blur-3xl"></div>
                <div className="absolute bottom-20 right-20 w-40 h-40 bg-theme-blue-dark rounded-full blur-3xl"></div>
                <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-theme-blue-light rounded-full blur-3xl"></div>
            </div>

            <div className="container mx-auto px-6 max-w-5xl relative z-10">
                <div className="text-center">
                    {/* Badge */}
                    <div className="inline-flex items-center px-4 py-2 bg-white/80 backdrop-blur-sm rounded-full text-sm font-medium text-theme-blue border border-theme-blue/20 mb-8">
                        <svg
                            className="w-4 h-4 mr-2"
                            fill="currentColor"
                            viewBox="0 0 20 20"
                        >
                            <path
                                fillRule="evenodd"
                                d="M11.3 1.046A1 1 0 0112 2v5h4a1 1 0 01.82 1.573l-7 10A1 1 0 018 18v-5H4a1 1 0 01-.82-1.573l7-10a1 1 0 011.12-.38z"
                                clipRule="evenodd"
                            />
                        </svg>
                        Powered by MultiversX • No Code Required
                    </div>

                    {/* Main Headline */}
                    <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold text-graphite mb-6 leading-tight">
                        Democratizing{" "}
                        <span className="bg-gradient-to-r from-theme-blue to-theme-blue-dark bg-clip-text text-transparent">
                            Token Creation
                        </span>
                        <br />
                        <span className="text-4xl md:text-5xl lg:text-6xl text-slate">
                            for Everyone
                        </span>
                    </h1>

                    {/* Subtitle */}
                    <p className="text-xl md:text-2xl text-graphite/80 mb-8 max-w-4xl mx-auto leading-relaxed">
                        The <strong>simplest, most intuitive platform</strong>{" "}
                        for creators, artists, startups, and communities to
                        launch, manage, and grow their ESDT tokens on
                        MultiversX.
                    </p>

                    {/* Value Props */}
                    <div className="flex flex-wrap justify-center gap-6 mb-10 text-sm md:text-base">
                        <div className="flex items-center bg-white/60 backdrop-blur-sm px-4 py-2 rounded-full">
                            <svg
                                className="w-5 h-5 mr-2 text-emerald-green"
                                fill="currentColor"
                                viewBox="0 0 20 20"
                            >
                                <path
                                    fillRule="evenodd"
                                    d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                                    clipRule="evenodd"
                                />
                            </svg>
                            No coding knowledge required
                        </div>
                        <div className="flex items-center bg-white/60 backdrop-blur-sm px-4 py-2 rounded-full">
                            <svg
                                className="w-5 h-5 mr-2 text-emerald-green"
                                fill="currentColor"
                                viewBox="0 0 20 20"
                            >
                                <path
                                    fillRule="evenodd"
                                    d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                                    clipRule="evenodd"
                                />
                            </svg>
                            Guided step-by-step process
                        </div>
                        <div className="flex items-center bg-white/60 backdrop-blur-sm px-4 py-2 rounded-full">
                            <svg
                                className="w-5 h-5 mr-2 text-emerald-green"
                                fill="currentColor"
                                viewBox="0 0 20 20"
                            >
                                <path
                                    fillRule="evenodd"
                                    d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                                    clipRule="evenodd"
                                />
                            </svg>
                            Built-in education & guidance
                        </div>
                    </div>

                    {/* CTA Buttons */}
                    <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
                        <button
                            onClick={handleConnectWallet}
                            className="bg-theme-blue text-pure-white font-semibold py-4 px-8 text-lg rounded-xl shadow-level-2 hover:shadow-level-3 hover:bg-theme-blue-dark hover:-translate-y-1 focus:outline-none focus:ring-2 focus:ring-theme-blue focus:ring-offset-2 focus:ring-offset-cloud-white transition-all duration-300 ease-in-out min-w-[200px]"
                        >
                            Start Creating Now
                        </button>
                        <Link
                            to="/learn"
                            className="bg-white/80 backdrop-blur-sm text-theme-blue font-semibold py-4 px-8 text-lg rounded-xl border-2 border-theme-blue/20 hover:border-theme-blue/40 hover:bg-white hover:-translate-y-1 focus:outline-none focus:ring-2 focus:ring-theme-blue focus:ring-offset-2 focus:ring-offset-cloud-white transition-all duration-300 ease-in-out min-w-[200px]"
                        >
                            See How It Works
                        </Link>
                    </div>

                    <p className="text-sm text-graphite/60 mt-6">
                        Connect securely with your MultiversX wallet • Join
                        1000+ creators already building
                    </p>
                </div>
            </div>
        </section>
    );
};
