import React from "react";
import type { LPData } from "../Introduction";
import { InfoTooltip } from "../shared";

interface SelectTokenProps {
    lpData: LPData;
    onInputChange: (field: keyof LPData, value: unknown) => void;
}

// Mock user tokens for development
const mockUserTokens = [
    {
        identifier: "SIMPLIFI-a1b2c3",
        name: "Simplifi Token",
        ticker: "SIMPLIFI",
        balance: "1000000",
        decimals: 18,
        amount: "",
    },
    {
        identifier: "MYTOKEN-def456",
        name: "My Custom Token",
        ticker: "MYTOKEN",
        balance: "500000",
        decimals: 6,
        amount: "",
    },
    {
        identifier: "PROJECT-789abc",
        name: "Project Token",
        ticker: "PROJECT",
        balance: "750000",
        decimals: 18,
        amount: "",
    },
];

export const SelectToken: React.FC<SelectTokenProps> = ({
    lpData,
    onInputChange,
}) => {
    const handleTokenSelect = (token: (typeof mockUserTokens)[0]) => {
        onInputChange("tokenA", { ...token });
    };

    // Helper function to format balance
    const formatBalance = (balance: string, decimals: number) => {
        const value = parseFloat(balance) / Math.pow(10, decimals);
        return value.toLocaleString(undefined, {
            maximumFractionDigits: decimals > 6 ? 6 : decimals,
            minimumFractionDigits: 0,
        });
    };

    // Helper function to generate token avatar gradient
    const getTokenGradient = (ticker: string) => {
        const colors = [
            "from-blue-500 to-purple-600",
            "from-green-500 to-teal-600",
            "from-orange-500 to-red-600",
            "from-purple-500 to-pink-600",
            "from-teal-500 to-cyan-600",
            "from-indigo-500 to-blue-600",
        ];
        const hash = ticker.split("").reduce((a, b) => a + b.charCodeAt(0), 0);
        return colors[hash % colors.length];
    };

    return (
        <div className="space-y-8">
            {/* Hero Section */}
            <div className="text-center">
                <div className="relative mb-6">
                    {/* Animated Background Glow */}
                    <div className="absolute inset-0 w-20 h-20 mx-auto bg-gradient-to-br from-distribute-400/30 to-amber-400/30 rounded-full blur-lg animate-pulse-gentle"></div>

                    {/* Main Icon */}
                    <div className="relative w-20 h-20 bg-gradient-to-br from-distribute-500 to-amber-500 rounded-3xl flex items-center justify-center text-4xl text-white mx-auto shadow-level-3 animate-bounce-gentle">
                        🪙
                    </div>

                    {/* Floating Particles */}
                    <div className="absolute -top-1 -right-1 w-2 h-2 bg-distribute-400 rounded-full animate-bounce opacity-60"></div>
                    <div className="absolute -bottom-1 -left-1 w-1.5 h-1.5 bg-amber-400 rounded-full animate-pulse opacity-40"></div>
                </div>

                <h2 className="text-h2 font-bold text-graphite mb-4 tracking-tight">
                    Select Your{" "}
                    <span className="bg-gradient-to-r text-color-theme-blue bg-clip-text font-extrabold">
                        Token
                    </span>
                </h2>
                <div className="flex items-center justify-center gap-3 text-body-lg text-slate max-w-2xl mx-auto">
                    <span>
                        Choose the token you want to add to the liquidity pool
                        (Token A)
                    </span>
                    <InfoTooltip
                        title="Token A Selection"
                        content="This will be your main token that users can trade against the pairing token (EGLD, USDC, etc.). Make sure you have sufficient balance for providing initial liquidity."
                        risk="caution"
                    />
                </div>
            </div>

            {/* Token Selection Section */}
            <div className="space-y-6">
                {/* Section Header */}
                <div className="flex items-center gap-4">
                    <div className="flex-1">
                        <h3 className="text-h4 font-bold text-graphite mb-2">
                            Your Tokens
                        </h3>
                        <p className="text-body-secondary text-slate">
                            Select from your available tokens to create a
                            liquidity pool
                        </p>
                    </div>

                    {/* Token Count Badge */}
                    <div className="bg-distribute-100 text-distribute-700 px-4 py-2 rounded-full text-sm font-medium">
                        {mockUserTokens.length} token
                        {mockUserTokens.length !== 1 ? "s" : ""} available
                    </div>
                </div>

                {/* Token List */}
                {mockUserTokens.length === 0 ? (
                    <div className="relative">
                        {/* Background Gradient */}
                        <div className="absolute inset-0 bg-gradient-to-br from-yellow-50 to-amber-50 rounded-3xl"></div>

                        <div className="relative backdrop-blur-sm bg-white/90 rounded-3xl p-12 text-center border border-yellow-200/60 shadow-level-2">
                            <div className="w-20 h-20 bg-gradient-to-br from-yellow-400 to-amber-500 rounded-full flex items-center justify-center text-4xl mx-auto mb-6 animate-bounce-gentle">
                                🔍
                            </div>
                            <h4 className="text-h4 font-bold text-yellow-800 mb-3">
                                No Tokens Found
                            </h4>
                            <p className="text-body-secondary text-yellow-700 max-w-md mx-auto">
                                We couldn't find any tokens in your wallet. Make
                                sure you have tokens available for creating a
                                liquidity pool.
                            </p>
                        </div>
                    </div>
                ) : (
                    <div className="grid gap-4">
                        {mockUserTokens.map((token, index) => {
                            const isSelected =
                                lpData.tokenA?.identifier === token.identifier;
                            const formattedBalance = formatBalance(
                                token.balance,
                                token.decimals
                            );
                            const tokenGradient = getTokenGradient(
                                token.ticker
                            );

                            return (
                                <div
                                    key={token.identifier}
                                    onClick={() => handleTokenSelect(token)}
                                    className={`
                                        group relative cursor-pointer transition-all duration-300 ease-out
                                        ${
                                            isSelected
                                                ? "scale-[1.02]"
                                                : "hover:scale-[1.01]"
                                        }
                                    `}
                                    style={{
                                        animationDelay: `${index * 100}ms`,
                                    }}
                                >
                                    {/* Background Gradient for Selected State */}
                                    {isSelected && (
                                        <div className="absolute inset-0 bg-gradient-to-r from-distribute-100/50 to-amber-100/50 rounded-3xl blur-sm"></div>
                                    )}

                                    {/* Glass-morphism Card */}
                                    <div
                                        className={`
                                        relative backdrop-blur-sm rounded-3xl p-6 border shadow-level-2 transition-all duration-300
                                        ${
                                            isSelected
                                                ? "bg-white/95 border-distribute-300 shadow-level-3"
                                                : "bg-white/90 border-white/40 hover:bg-white/95 hover:border-distribute-200 hover:shadow-level-3"
                                        }
                                    `}
                                    >
                                        {/* Selection Indicator */}
                                        {isSelected && (
                                            <div className="absolute top-4 right-4 w-8 h-8 bg-gradient-to-r from-distribute-500 to-amber-500 rounded-full flex items-center justify-center shadow-level-2 animate-bounce-gentle">
                                                <span className="text-white text-sm font-bold">
                                                    ✓
                                                </span>
                                            </div>
                                        )}

                                        <div className="flex items-center gap-6">
                                            {/* Token Avatar */}
                                            <div className="relative flex-shrink-0">
                                                <div
                                                    className={`w-16 h-16 bg-gradient-to-br ${tokenGradient} rounded-2xl flex items-center justify-center text-white font-bold text-xl shadow-level-2 group-hover:scale-110 transition-transform duration-300`}
                                                >
                                                    {token.ticker.substring(
                                                        0,
                                                        2
                                                    )}
                                                </div>

                                                {/* Verification Badge */}
                                                <div className="absolute -bottom-1 -right-1 w-6 h-6 bg-green-500 rounded-full border-2 border-white flex items-center justify-center">
                                                    <span className="text-white text-xs">
                                                        ✓
                                                    </span>
                                                </div>
                                            </div>

                                            {/* Token Info */}
                                            <div className="flex-1 min-w-0">
                                                <div className="flex items-center gap-3 mb-2">
                                                    <h4 className="text-lg font-bold text-graphite truncate">
                                                        {token.name}
                                                    </h4>
                                                    <span className="px-3 py-1 bg-ash/50 rounded-full text-sm text-slate font-medium">
                                                        {token.ticker}
                                                    </span>
                                                </div>

                                                <div className="space-y-2">
                                                    <div className="flex items-center gap-2">
                                                        <span className="text-sm text-slate">
                                                            Balance:
                                                        </span>
                                                        <span className="text-sm font-semibold text-graphite">
                                                            {formattedBalance}{" "}
                                                            {token.ticker}
                                                        </span>
                                                    </div>

                                                    <div className="flex items-center gap-6 text-xs text-slate">
                                                        <div className="flex items-center gap-1">
                                                            <span className="w-2 h-2 bg-blue-400 rounded-full"></span>
                                                            <span>
                                                                Decimals:{" "}
                                                                {token.decimals}
                                                            </span>
                                                        </div>
                                                        <div className="flex items-center gap-1">
                                                            <span className="w-2 h-2 bg-purple-400 rounded-full"></span>
                                                            <span className="truncate">
                                                                ID:{" "}
                                                                {
                                                                    token.identifier
                                                                }
                                                            </span>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>

                                            {/* Selection Arrow */}
                                            <div
                                                className={`flex-shrink-0 transition-all duration-300 ${
                                                    isSelected
                                                        ? "text-distribute-500 scale-110"
                                                        : "text-slate/50 group-hover:text-distribute-400 group-hover:scale-105"
                                                }`}
                                            >
                                                <svg
                                                    className="w-6 h-6"
                                                    fill="none"
                                                    stroke="currentColor"
                                                    viewBox="0 0 24 24"
                                                >
                                                    <path
                                                        strokeLinecap="round"
                                                        strokeLinejoin="round"
                                                        strokeWidth={2}
                                                        d="M9 5l7 7-7 7"
                                                    />
                                                </svg>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                )}
            </div>

            {/* Selected Token Summary */}
            {lpData.tokenA && (
                <div className="relative">
                    {/* Background Gradient */}
                    <div className="absolute inset-0 bg-gradient-to-r from-distribute-50 via-distribute-100/50 to-amber-50 rounded-3xl blur-sm"></div>

                    <div className="relative backdrop-blur-md bg-white/95 rounded-3xl p-6 border border-white/50 shadow-level-3 animate-fade-in-up">
                        <div className="flex items-center gap-4">
                            {/* Success Icon */}
                            <div className="w-12 h-12 bg-gradient-to-r from-distribute-500 to-amber-500 rounded-2xl flex items-center justify-center text-white font-bold shadow-level-2 animate-bounce-gentle">
                                ✓
                            </div>

                            {/* Token Summary */}
                            <div className="flex-1">
                                <h4 className="text-lg font-bold text-distribute-700 mb-1">
                                    Selected Token A
                                </h4>
                                <p className="text-distribute-600 text-sm">
                                    <span className="font-semibold">
                                        {lpData.tokenA.name}
                                    </span>
                                    <span className="text-slate mx-2">•</span>
                                    <span className="bg-distribute-100 text-distribute-700 px-2 py-1 rounded-full text-xs font-medium">
                                        {lpData.tokenA.ticker}
                                    </span>
                                    <span className="text-slate mx-2">•</span>
                                    <span className="text-sm">
                                        Ready for pairing
                                    </span>
                                </p>
                            </div>

                            {/* Next Step Indicator */}
                            <div className="text-distribute-500 animate-pulse">
                                <svg
                                    className="w-6 h-6"
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
                            </div>
                        </div>
                    </div>
                </div>
            )}

            {/* Educational Tips Section */}
            <div className="relative">
                {/* Background Gradient */}
                <div className="absolute inset-0 bg-gradient-to-br from-blue-50 to-indigo-50 rounded-3xl"></div>

                <div className="relative backdrop-blur-sm bg-white/90 rounded-3xl p-8 border border-blue-200/60 shadow-level-2">
                    <div className="flex flex-col lg:flex-row items-start gap-6">
                        {/* Icon Section */}
                        <div className="flex-shrink-0">
                            <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-2xl flex items-center justify-center text-3xl text-white shadow-level-2">
                                💡
                            </div>
                        </div>

                        {/* Content Section */}
                        <div className="flex-1">
                            <h4 className="text-h4 font-bold text-blue-800 mb-4">
                                Token Selection Tips
                            </h4>

                            <div className="grid md:grid-cols-2 gap-4">
                                {[
                                    {
                                        icon: "🎯",
                                        tip: "Choose a token you want to make tradable on xExchange",
                                    },
                                    {
                                        icon: "💰",
                                        tip: "Ensure you have sufficient balance for initial liquidity",
                                    },
                                    {
                                        icon: "📊",
                                        tip: "Consider the token's utility and potential trading volume",
                                    },
                                    {
                                        icon: "🔗",
                                        tip: "You'll need to pair this with EGLD, USDC, or another established token",
                                    },
                                ].map((item, index) => (
                                    <div
                                        key={index}
                                        className="flex items-start gap-3 group/tip"
                                        style={{
                                            animationDelay: `${index * 100}ms`,
                                        }}
                                    >
                                        <div className="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center text-lg group-hover/tip:scale-110 transition-transform duration-200 flex-shrink-0 mt-0.5">
                                            {item.icon}
                                        </div>
                                        <p className="text-blue-700 text-sm leading-relaxed">
                                            {item.tip}
                                        </p>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Quick Stats */}
            {mockUserTokens.length > 0 && (
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    {[
                        {
                            label: "Total Tokens",
                            value: mockUserTokens.length.toString(),
                            icon: "🪙",
                            color: "from-blue-500 to-blue-600",
                        },
                        {
                            label: "Ready for LP",
                            value: mockUserTokens.length.toString(),
                            icon: "✅",
                            color: "from-green-500 to-green-600",
                        },
                        {
                            label: "Next Step",
                            value: lpData.tokenA
                                ? "Pairing Token"
                                : "Select Token",
                            icon: "➡️",
                            color: "from-amber-500 to-orange-600",
                        },
                    ].map((stat, index) => (
                        <div
                            key={index}
                            className="relative group"
                            style={{ animationDelay: `${index * 150}ms` }}
                        >
                            <div
                                className="absolute inset-0 bg-gradient-to-br opacity-5 rounded-2xl group-hover:opacity-10 transition-opacity duration-300"
                                style={{
                                    backgroundImage: `linear-gradient(135deg, ${
                                        stat.color.split(" ")[1]
                                    }, ${stat.color.split(" ")[3]})`,
                                }}
                            ></div>

                            <div className="relative backdrop-blur-sm bg-white/80 rounded-2xl p-6 border border-white/40 shadow-card hover:shadow-card-hover transition-all duration-300 text-center group-hover:scale-105">
                                <div
                                    className={`w-12 h-12 bg-gradient-to-br ${stat.color} rounded-xl flex items-center justify-center text-2xl mx-auto mb-3 shadow-sm group-hover:rotate-12 transition-transform duration-300`}
                                >
                                    {stat.icon}
                                </div>
                                <div className="text-2xl font-bold text-graphite mb-1">
                                    {stat.value}
                                </div>
                                <div className="text-sm text-slate">
                                    {stat.label}
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};
