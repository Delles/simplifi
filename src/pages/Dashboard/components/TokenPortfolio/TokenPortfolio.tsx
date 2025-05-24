import { Link } from "react-router-dom";
import { useState } from "react";
import TokenCard from "./TokenCard";
import CompactTokenItem from "./CompactTokenItem";
import type { Token } from "./TokenCard";
import EmptyTokenState from "./EmptyTokenState";

interface TokenPortfolioProps {
    tokens: Token[];
}

export default function TokenPortfolio({ tokens }: TokenPortfolioProps) {
    const [expandedTokens, setExpandedTokens] = useState<string[]>([]);

    const toggleTokenExpansion = (tokenId: string) => {
        setExpandedTokens((prev) =>
            prev.includes(tokenId)
                ? prev.filter((id) => id !== tokenId)
                : [...prev, tokenId]
        );
    };

    const heroToken = tokens[0];
    const additionalTokens = tokens.slice(1);

    return (
        <div>
            {/* Enhanced Header */}
            <div className="flex items-center justify-between mb-6 animate-fade-in-up">
                <div>
                    <h2 className="text-2xl font-bold text-graphite mb-1">
                        Your Tokens
                    </h2>
                    <div className="flex items-center gap-3">
                        <div className="flex items-center gap-2">
                            <div className="w-2 h-2 bg-manage-500 rounded-full animate-pulse"></div>
                            <span className="text-slate text-sm">
                                {tokens.length} token
                                {tokens.length !== 1 ? "s" : ""} managed
                            </span>
                        </div>
                        {tokens.length > 0 && (
                            <>
                                <div className="w-1 h-1 bg-slate rounded-full"></div>
                                <span className="text-xs text-slate">Live</span>
                            </>
                        )}
                    </div>
                </div>

                {tokens.length > 1 && (
                    <Link
                        to="/app/my-tokens"
                        className="flex items-center gap-1.5 px-3 py-1.5 text-create-600 hover:text-create-700 text-sm font-medium transition-colors"
                    >
                        View All
                        <svg
                            className="w-4 h-4"
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
                <div className="space-y-4">
                    {/* Hero Token (First Token) - Always Full Detail */}
                    {heroToken && (
                        <div
                            className="animate-fade-in-up"
                            style={{ animationDelay: "0.1s" }}
                        >
                            <TokenCard token={heroToken} />
                        </div>
                    )}

                    {/* Additional Tokens - Compact with Expansion */}
                    {additionalTokens.length > 0 && (
                        <div className="space-y-2">
                            {additionalTokens.map((token, index) => (
                                <div
                                    key={token.id}
                                    className="animate-fade-in-up"
                                    style={{
                                        animationDelay: `${(index + 2) * 0.1}s`,
                                    }}
                                >
                                    <CompactTokenItem
                                        token={token}
                                        isExpanded={expandedTokens.includes(
                                            token.id
                                        )}
                                        onToggleExpanded={() =>
                                            toggleTokenExpansion(token.id)
                                        }
                                    />
                                </div>
                            ))}
                        </div>
                    )}

                    {/* Enhanced "View All" section for many tokens */}
                    {tokens.length > 4 && (
                        <div
                            className="pt-4 animate-fade-in-up"
                            style={{
                                animationDelay: `${(tokens.length + 1) * 0.1}s`,
                            }}
                        >
                            <div className="bg-gradient-to-r from-gray-50 to-blue-50/30 rounded-lg border border-ash/20 p-4">
                                <div className="flex items-center justify-between">
                                    <div className="flex items-center gap-3">
                                        <div className="w-8 h-8 bg-manage-500 rounded-lg flex items-center justify-center text-white text-sm">
                                            📊
                                        </div>
                                        <div>
                                            <h3 className="font-medium text-graphite text-sm">
                                                Managing {tokens.length} Tokens
                                            </h3>
                                            <p className="text-xs text-slate">
                                                View comprehensive portfolio
                                                analytics
                                            </p>
                                        </div>
                                    </div>
                                    <Link
                                        to="/app/my-tokens"
                                        className="flex items-center gap-1.5 px-3 py-2 bg-manage-500 hover:bg-manage-600 text-white text-sm font-medium rounded-lg transition-colors duration-200"
                                    >
                                        <span>Portfolio</span>
                                        <svg
                                            className="w-4 h-4"
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
