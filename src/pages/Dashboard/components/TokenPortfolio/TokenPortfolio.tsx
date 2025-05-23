import { Link } from "react-router-dom";
import TokenCard from "./TokenCard";
import type { Token } from "./TokenCard";
import EmptyTokenState from "./EmptyTokenState";

interface TokenPortfolioProps {
    tokens: Token[];
}

export default function TokenPortfolio({ tokens }: TokenPortfolioProps) {
    return (
        <div className="lg:col-span-2">
            {/* Enhanced Header */}
            <div className="flex items-center justify-between mb-8 animate-fade-in-up">
                <div>
                    <h2 className="text-3xl font-bold text-graphite mb-2">
                        Your Token Portfolio
                    </h2>
                    <div className="flex items-center gap-3">
                        <div className="flex items-center gap-2">
                            <div className="w-2 h-2 bg-manage-500 rounded-full animate-pulse"></div>
                            <span className="text-slate font-medium">
                                {tokens.length} token
                                {tokens.length !== 1 ? "s" : ""} managed
                            </span>
                        </div>
                        {tokens.length > 0 && (
                            <>
                                <div className="w-1 h-1 bg-slate rounded-full"></div>
                                <span className="text-sm text-slate">
                                    Last updated: just now
                                </span>
                            </>
                        )}
                    </div>
                </div>

                {tokens.length > 0 && (
                    <Link
                        to="/app/my-tokens"
                        className="group flex items-center gap-2 px-4 py-2 bg-white/70 backdrop-blur-sm border border-manage-200 text-manage-600 rounded-xl font-medium hover:bg-manage-50 hover:shadow-level-2 transition-all duration-200 transform hover:scale-105"
                    >
                        <span>View All</span>
                        <svg
                            className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-200"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M13 7l5 5m0 0l-5 5m5-5H6"
                            />
                        </svg>
                    </Link>
                )}
            </div>

            {/* Content */}
            {tokens.length === 0 ? (
                <div
                    className="animate-fade-in-up"
                    style={{ animationDelay: "0.1s" }}
                >
                    <EmptyTokenState />
                </div>
            ) : (
                <div className="space-y-6">
                    {/* Token Cards with staggered animations */}
                    {tokens.map((token, index) => (
                        <div
                            key={token.id}
                            className="animate-fade-in-up"
                            style={{ animationDelay: `${(index + 1) * 0.1}s` }}
                        >
                            <TokenCard token={token} />
                        </div>
                    ))}

                    {/* Enhanced "Show more" section for multiple tokens */}
                    {tokens.length > 2 && (
                        <div
                            className="pt-8 text-center animate-fade-in-up"
                            style={{
                                animationDelay: `${(tokens.length + 1) * 0.1}s`,
                            }}
                        >
                            <div className="relative">
                                {/* Background gradient */}
                                <div className="absolute inset-0 bg-gradient-to-r from-manage-50 via-create-50 to-distribute-50 rounded-2xl opacity-60"></div>

                                {/* Content */}
                                <div className="relative backdrop-blur-sm bg-white/80 rounded-2xl border border-white/50 shadow-level-1 hover:shadow-level-2 transition-all duration-300 p-6">
                                    <div className="flex items-center justify-center gap-4 mb-4">
                                        <div className="w-8 h-8 bg-manage-500 rounded-xl flex items-center justify-center text-white text-lg">
                                            📊
                                        </div>
                                        <h3 className="text-lg font-semibold text-graphite">
                                            Managing {tokens.length} Tokens
                                        </h3>
                                    </div>

                                    <p className="text-slate mb-6">
                                        You're building a diverse token
                                        portfolio! View all your tokens in one
                                        place to track performance and manage
                                        efficiently.
                                    </p>

                                    <Link
                                        to="/app/my-tokens"
                                        className="group inline-flex items-center gap-3 px-6 py-3 bg-manage-500 hover:bg-manage-600 text-white font-semibold rounded-xl shadow-lg hover:shadow-xl transition-all duration-200 transform hover:scale-105"
                                    >
                                        <span className="text-lg group-hover:scale-110 transition-transform duration-200">
                                            📈
                                        </span>
                                        <span>
                                            View All {tokens.length} Tokens
                                        </span>
                                        <svg
                                            className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-200"
                                            fill="none"
                                            viewBox="0 0 24 24"
                                            stroke="currentColor"
                                        >
                                            <path
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                                strokeWidth={2}
                                                d="M13 7l5 5m0 0l-5 5m5-5H6"
                                            />
                                        </svg>
                                    </Link>
                                </div>
                            </div>
                        </div>
                    )}
                </div>
            )}
        </div>
    );
}
