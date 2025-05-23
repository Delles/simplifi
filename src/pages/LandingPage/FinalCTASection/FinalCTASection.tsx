import React from "react";
import { Link } from "react-router-dom";

interface FinalCTASectionProps {
    handleConnectWallet: () => void;
}

export const FinalCTASection: React.FC<FinalCTASectionProps> = ({
    handleConnectWallet,
}) => {
    return (
        <section className="py-20 md:py-28 bg-gradient-to-br from-theme-blue via-theme-blue-dark to-deep-teal-black relative overflow-hidden">
            {/* Background Elements */}
            <div className="absolute inset-0 opacity-10">
                <div className="absolute top-20 left-10 w-40 h-40 bg-white rounded-full blur-3xl"></div>
                <div className="absolute bottom-20 right-10 w-32 h-32 bg-theme-blue-light rounded-full blur-3xl"></div>
                <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-digital-lavender rounded-full blur-3xl"></div>
            </div>

            <div className="container mx-auto px-6 text-center max-w-4xl relative z-10">
                {/* Main Headline */}
                <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6 leading-tight">
                    Join the Token <br />
                    <span className="bg-gradient-to-r from-digital-lavender to-theme-blue-light bg-clip-text text-transparent">
                        Revolution
                    </span>
                </h2>

                {/* Subtitle */}
                <p className="text-xl md:text-2xl text-white/90 mb-8 leading-relaxed">
                    SimpliFi is democratizing token creation on MultiversX.
                    Whether you're an artist launching fan tokens, a startup
                    building loyalty programs, or a community manager
                    distributing rewards—<strong>we've made it simple</strong>.
                </p>

                {/* Stats/Social Proof */}
                <div className="flex flex-wrap justify-center gap-8 mb-10 text-white/80">
                    <div className="text-center">
                        <div className="text-2xl md:text-3xl font-bold text-white">
                            1000+
                        </div>
                        <div className="text-sm">Creators Building</div>
                    </div>
                    <div className="text-center">
                        <div className="text-2xl md:text-3xl font-bold text-white">
                            50M+
                        </div>
                        <div className="text-sm">Tokens Distributed</div>
                    </div>
                    <div className="text-center">
                        <div className="text-2xl md:text-3xl font-bold text-white">
                            Zero
                        </div>
                        <div className="text-sm">Code Required</div>
                    </div>
                </div>

                {/* Value Props */}
                <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 md:p-8 mb-10 border border-white/20">
                    <div className="grid md:grid-cols-3 gap-6 text-white">
                        <div className="flex items-center justify-center md:justify-start">
                            <svg
                                className="w-6 h-6 mr-3 text-emerald-green"
                                fill="currentColor"
                                viewBox="0 0 20 20"
                            >
                                <path
                                    fillRule="evenodd"
                                    d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                                    clipRule="evenodd"
                                />
                            </svg>
                            <span className="font-medium">
                                Guided Step-by-Step
                            </span>
                        </div>
                        <div className="flex items-center justify-center md:justify-start">
                            <svg
                                className="w-6 h-6 mr-3 text-emerald-green"
                                fill="currentColor"
                                viewBox="0 0 20 20"
                            >
                                <path
                                    fillRule="evenodd"
                                    d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                                    clipRule="evenodd"
                                />
                            </svg>
                            <span className="font-medium">
                                Built-in Education
                            </span>
                        </div>
                        <div className="flex items-center justify-center md:justify-start">
                            <svg
                                className="w-6 h-6 mr-3 text-emerald-green"
                                fill="currentColor"
                                viewBox="0 0 20 20"
                            >
                                <path
                                    fillRule="evenodd"
                                    d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                                    clipRule="evenodd"
                                />
                            </svg>
                            <span className="font-medium">
                                Non-Custodial Security
                            </span>
                        </div>
                    </div>
                </div>

                {/* CTA Buttons */}
                <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-8">
                    <button
                        onClick={handleConnectWallet}
                        className="bg-white text-theme-blue font-bold py-4 px-8 text-lg rounded-xl shadow-level-3 hover:shadow-level-3 hover:bg-cloud-white hover:-translate-y-1 focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-theme-blue transition-all duration-300 ease-in-out min-w-[220px] group"
                    >
                        <span className="flex items-center justify-center">
                            Start Creating Tokens
                            <svg
                                className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform duration-300"
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={2}
                                    d="M13 7l5 5m0 0l-5 5m5-5H6"
                                />
                            </svg>
                        </span>
                    </button>
                    <Link
                        to="/learn"
                        className="border-2 border-white/30 text-white font-semibold py-4 px-8 text-lg rounded-xl hover:border-white/60 hover:bg-white/10 hover:-translate-y-1 focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-theme-blue transition-all duration-300 ease-in-out min-w-[220px]"
                    >
                        Explore Features
                    </Link>
                </div>

                {/* Bottom Text */}
                <div className="text-white/70 text-sm">
                    <p className="mb-2">
                        Trusted by creators, startups, and communities across
                        the MultiversX ecosystem
                    </p>
                    <p className="flex items-center justify-center text-xs">
                        <svg
                            className="w-4 h-4 mr-2"
                            fill="currentColor"
                            viewBox="0 0 20 20"
                        >
                            <path
                                fillRule="evenodd"
                                d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z"
                                clipRule="evenodd"
                            />
                        </svg>
                        Secured by MultiversX blockchain technology
                    </p>
                </div>
            </div>
        </section>
    );
};
