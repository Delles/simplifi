import React from "react";
import type { LPData } from "../Introduction";
import { InfoTooltip } from "../shared";

interface ChoosePairingTokenProps {
    lpData: LPData;
    onInputChange: (field: keyof LPData, value: unknown) => void;
}

// Mock pairing tokens available on xExchange
const mockPairingTokens = [
    {
        identifier: "EGLD",
        name: "MultiversX",
        ticker: "EGLD",
        balance: "1.5",
        decimals: 18,
        amount: "",
        type: "EGLD" as const,
        description: "Native token of MultiversX blockchain",
        marketCap: "$820M",
        volume24h: "$12.3M",
        recommended: true,
        icon: "🌟",
        riskLevel: "low" as const,
    },
    {
        identifier: "USDC-c76f1f",
        name: "USD Coin",
        ticker: "USDC",
        balance: "250.00",
        decimals: 6,
        amount: "",
        type: "ESDT" as const,
        description: "Fully collateralized US dollar stablecoin",
        marketCap: "$54B",
        volume24h: "$89.2M",
        recommended: true,
        icon: "💵",
        riskLevel: "low" as const,
    },
    {
        identifier: "WEGLD-bd4d79",
        name: "Wrapped EGLD",
        ticker: "WEGLD",
        balance: "0.75",
        decimals: 18,
        amount: "",
        type: "ESDT" as const,
        description: "Wrapped version of EGLD for DeFi protocols",
        marketCap: "$820M",
        volume24h: "$5.1M",
        recommended: false,
        icon: "🎁",
        riskLevel: "low" as const,
    },
    {
        identifier: "UTK-2f80e9",
        name: "Utrust Token",
        ticker: "UTK",
        balance: "1000.0",
        decimals: 18,
        amount: "",
        type: "ESDT" as const,
        description: "Payment solution token",
        marketCap: "$45M",
        volume24h: "$890K",
        recommended: false,
        icon: "💳",
        riskLevel: "medium" as const,
    },
];

export const ChoosePairingToken: React.FC<ChoosePairingTokenProps> = ({
    lpData,
    onInputChange,
}) => {
    const handleTokenSelect = (token: (typeof mockPairingTokens)[0]) => {
        onInputChange("tokenB", { ...token });
    };

    // Helper function to format balance
    const formatBalance = (balance: string, decimals: number) => {
        const value = parseFloat(balance);
        return value.toLocaleString(undefined, {
            maximumFractionDigits: decimals > 6 ? 6 : 2,
            minimumFractionDigits: 0,
        });
    };

    // Helper function to get risk color
    const getRiskColor = (risk: string) => {
        switch (risk) {
            case "low":
                return "text-green-600 bg-green-100";
            case "medium":
                return "text-amber-600 bg-amber-100";
            case "high":
                return "text-red-600 bg-red-100";
            default:
                return "text-slate-600 bg-slate-100";
        }
    };

    // Filter recommended and other tokens
    const recommendedTokens = mockPairingTokens.filter(
        (token) => token.recommended
    );
    const otherTokens = mockPairingTokens.filter((token) => !token.recommended);

    return (
        <div className="space-y-8">
            {/* Hero Section */}
            <div className="text-center">
                <div className="relative mb-6">
                    {/* Animated Background Glow */}
                    <div className="absolute inset-0 w-20 h-20 mx-auto bg-gradient-to-br from-distribute-400/30 to-amber-400/30 rounded-full blur-lg animate-pulse-gentle"></div>

                    {/* Main Icon */}
                    <div className="relative w-20 h-20 bg-gradient-to-br from-distribute-500 to-amber-500 rounded-3xl flex items-center justify-center text-4xl text-white mx-auto shadow-level-3 animate-bounce-gentle">
                        🔗
                    </div>

                    {/* Floating Particles */}
                    <div className="absolute -top-1 -right-1 w-2 h-2 bg-distribute-400 rounded-full animate-bounce opacity-60"></div>
                    <div className="absolute -bottom-1 -left-1 w-1.5 h-1.5 bg-amber-400 rounded-full animate-pulse opacity-40"></div>
                </div>

                <h2 className="text-h2 font-bold text-graphite mb-4 tracking-tight">
                    Choose{" "}
                    <span className="text-distribute-600 font-extrabold">
                        Pairing Token
                    </span>
                </h2>
                <div className="flex items-center justify-center gap-3 text-body-lg text-slate max-w-2xl mx-auto">
                    <span>
                        Select Token B to pair with your{" "}
                        {lpData.tokenA?.ticker || "token"}
                    </span>
                    <InfoTooltip
                        title="Pairing Token Selection"
                        content="The pairing token determines your pool's liquidity characteristics. EGLD and USDC are most common and provide better trading volume. Choose based on your strategy and target market."
                        risk="caution"
                    />
                </div>
            </div>

            {/* Selected Token A Summary */}
            {lpData.tokenA && (
                <div className="relative">
                    <div className="absolute inset-0 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-3xl"></div>

                    <div className="relative backdrop-blur-sm bg-white/90 rounded-3xl p-6 border border-blue-200/60 shadow-level-2">
                        <div className="flex items-center gap-4">
                            <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-indigo-600 rounded-2xl flex items-center justify-center text-white font-bold shadow-level-2">
                                A
                            </div>
                            <div>
                                <h4 className="text-lg font-bold text-blue-800">
                                    Your Token (Token A)
                                </h4>
                                <p className="text-blue-600 text-sm">
                                    <span className="font-semibold">
                                        {lpData.tokenA.name}
                                    </span>
                                    <span className="text-slate mx-2">•</span>
                                    <span className="bg-blue-100 text-blue-700 px-2 py-1 rounded-full text-xs font-medium">
                                        {lpData.tokenA.ticker}
                                    </span>
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            )}

            {/* Recommended Pairing Tokens */}
            <div className="space-y-6">
                <div className="flex items-center gap-4">
                    <div className="flex-1">
                        <h3 className="text-h4 font-bold text-graphite mb-2 flex items-center gap-2">
                            <span className="text-2xl">⭐</span>
                            Recommended Pairing Tokens
                        </h3>
                        <p className="text-body-secondary text-slate">
                            These tokens provide the best liquidity and trading
                            volume
                        </p>
                    </div>
                </div>

                <div className="grid gap-4">
                    {recommendedTokens.map((token, index) => {
                        const isSelected =
                            lpData.tokenB?.identifier === token.identifier;

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
                                style={{ animationDelay: `${index * 100}ms` }}
                            >
                                {/* Background Gradient for Selected State */}
                                {isSelected && (
                                    <div className="absolute inset-0 bg-gradient-to-r from-green-100/50 to-emerald-100/50 rounded-3xl blur-sm"></div>
                                )}

                                {/* Glass-morphism Card */}
                                <div
                                    className={`
                                    relative backdrop-blur-sm rounded-3xl p-6 border shadow-level-2 transition-all duration-300
                                    ${
                                        isSelected
                                            ? "bg-white/95 border-green-300 shadow-level-3"
                                            : "bg-white/90 border-white/40 hover:bg-white/95 hover:border-green-200 hover:shadow-level-3"
                                    }
                                `}
                                >
                                    {/* Recommended Badge */}
                                    <div className="absolute top-4 left-4 bg-gradient-to-r from-green-500 to-emerald-500 text-white px-3 py-1 rounded-full text-xs font-bold">
                                        RECOMMENDED
                                    </div>

                                    {/* Selection Indicator */}
                                    {isSelected && (
                                        <div className="absolute top-4 right-4 w-8 h-8 bg-gradient-to-r from-green-500 to-emerald-500 rounded-full flex items-center justify-center shadow-level-2 animate-bounce-gentle">
                                            <span className="text-white text-sm font-bold">
                                                ✓
                                            </span>
                                        </div>
                                    )}

                                    <div className="flex items-center gap-6 mt-8">
                                        {/* Token Icon */}
                                        <div className="relative flex-shrink-0">
                                            <div className="w-16 h-16 bg-gradient-to-br from-green-500 to-emerald-600 rounded-2xl flex items-center justify-center text-3xl shadow-level-2 group-hover:scale-110 transition-transform duration-300">
                                                {token.icon}
                                            </div>

                                            {/* Risk Badge */}
                                            <div
                                                className={`absolute -bottom-1 -right-1 px-2 py-1 rounded-full text-xs font-medium ${getRiskColor(
                                                    token.riskLevel
                                                )}`}
                                            >
                                                {token.riskLevel}
                                            </div>
                                        </div>

                                        {/* Token Info */}
                                        <div className="flex-1 min-w-0">
                                            <div className="flex items-center gap-3 mb-2">
                                                <h4 className="text-lg font-bold text-graphite">
                                                    {token.name}
                                                </h4>
                                                <span className="px-3 py-1 bg-ash/50 rounded-full text-sm text-slate font-medium">
                                                    {token.ticker}
                                                </span>
                                            </div>

                                            <p className="text-sm text-slate mb-3 leading-relaxed">
                                                {token.description}
                                            </p>

                                            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-xs">
                                                <div>
                                                    <span className="text-slate block">
                                                        Your Balance
                                                    </span>
                                                    <span className="font-semibold text-graphite">
                                                        {formatBalance(
                                                            token.balance,
                                                            token.decimals
                                                        )}{" "}
                                                        {token.ticker}
                                                    </span>
                                                </div>
                                                <div>
                                                    <span className="text-slate block">
                                                        Market Cap
                                                    </span>
                                                    <span className="font-semibold text-green-600">
                                                        {token.marketCap}
                                                    </span>
                                                </div>
                                                <div>
                                                    <span className="text-slate block">
                                                        24h Volume
                                                    </span>
                                                    <span className="font-semibold text-blue-600">
                                                        {token.volume24h}
                                                    </span>
                                                </div>
                                                <div>
                                                    <span className="text-slate block">
                                                        Type
                                                    </span>
                                                    <span className="font-semibold text-purple-600">
                                                        {token.type}
                                                    </span>
                                                </div>
                                            </div>
                                        </div>

                                        {/* Selection Arrow */}
                                        <div
                                            className={`flex-shrink-0 transition-all duration-300 ${
                                                isSelected
                                                    ? "text-green-500 scale-110"
                                                    : "text-slate/50 group-hover:text-green-400 group-hover:scale-105"
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
            </div>

            {/* Other Pairing Tokens */}
            <div className="space-y-6">
                <div className="flex items-center gap-4">
                    <div className="flex-1">
                        <h3 className="text-h4 font-bold text-graphite mb-2">
                            Other Available Tokens
                        </h3>
                        <p className="text-body-secondary text-slate">
                            Additional pairing options with potentially lower
                            liquidity
                        </p>
                    </div>

                    <div className="bg-amber-100 text-amber-700 px-4 py-2 rounded-full text-sm font-medium">
                        {otherTokens.length} more available
                    </div>
                </div>

                <div className="grid gap-4">
                    {otherTokens.map((token, index) => {
                        const isSelected =
                            lpData.tokenB?.identifier === token.identifier;

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
                                    animationDelay: `${
                                        (index + recommendedTokens.length) * 100
                                    }ms`,
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
                                        {/* Token Icon */}
                                        <div className="relative flex-shrink-0">
                                            <div className="w-14 h-14 bg-gradient-to-br from-slate-500 to-slate-600 rounded-2xl flex items-center justify-center text-2xl shadow-level-2 group-hover:scale-110 transition-transform duration-300">
                                                {token.icon}
                                            </div>

                                            {/* Risk Badge */}
                                            <div
                                                className={`absolute -bottom-1 -right-1 px-2 py-1 rounded-full text-xs font-medium ${getRiskColor(
                                                    token.riskLevel
                                                )}`}
                                            >
                                                {token.riskLevel}
                                            </div>
                                        </div>

                                        {/* Token Info */}
                                        <div className="flex-1 min-w-0">
                                            <div className="flex items-center gap-3 mb-2">
                                                <h4 className="text-lg font-bold text-graphite">
                                                    {token.name}
                                                </h4>
                                                <span className="px-3 py-1 bg-ash/50 rounded-full text-sm text-slate font-medium">
                                                    {token.ticker}
                                                </span>
                                            </div>

                                            <p className="text-sm text-slate mb-3 leading-relaxed">
                                                {token.description}
                                            </p>

                                            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-xs">
                                                <div>
                                                    <span className="text-slate block">
                                                        Your Balance
                                                    </span>
                                                    <span className="font-semibold text-graphite">
                                                        {formatBalance(
                                                            token.balance,
                                                            token.decimals
                                                        )}{" "}
                                                        {token.ticker}
                                                    </span>
                                                </div>
                                                <div>
                                                    <span className="text-slate block">
                                                        Market Cap
                                                    </span>
                                                    <span className="font-semibold text-green-600">
                                                        {token.marketCap}
                                                    </span>
                                                </div>
                                                <div>
                                                    <span className="text-slate block">
                                                        24h Volume
                                                    </span>
                                                    <span className="font-semibold text-blue-600">
                                                        {token.volume24h}
                                                    </span>
                                                </div>
                                                <div>
                                                    <span className="text-slate block">
                                                        Type
                                                    </span>
                                                    <span className="font-semibold text-purple-600">
                                                        {token.type}
                                                    </span>
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
            </div>

            {/* Selected Token Summary */}
            {lpData.tokenB && (
                <div className="relative">
                    <div className="absolute inset-0 bg-gradient-to-r from-green-50 via-emerald-100/50 to-green-50 rounded-3xl blur-sm"></div>

                    <div className="relative backdrop-blur-md bg-white/95 rounded-3xl p-6 border border-white/50 shadow-level-3 animate-fade-in-up">
                        <div className="flex items-center gap-4">
                            <div className="w-12 h-12 bg-gradient-to-r from-green-500 to-emerald-500 rounded-2xl flex items-center justify-center text-white font-bold shadow-level-2 animate-bounce-gentle">
                                ✓
                            </div>

                            <div className="flex-1">
                                <h4 className="text-lg font-bold text-green-700 mb-1">
                                    Selected Pairing Token (Token B)
                                </h4>
                                <p className="text-green-600 text-sm">
                                    <span className="font-semibold">
                                        {lpData.tokenB.name}
                                    </span>
                                    <span className="text-slate mx-2">•</span>
                                    <span className="bg-green-100 text-green-700 px-2 py-1 rounded-full text-xs font-medium">
                                        {lpData.tokenB.ticker}
                                    </span>
                                    <span className="text-slate mx-2">•</span>
                                    <span className="text-sm">
                                        Ready for liquidity setup
                                    </span>
                                </p>
                            </div>

                            <div className="text-green-500 animate-pulse">
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

            {/* Educational Tips */}
            <div className="relative">
                <div className="absolute inset-0 bg-gradient-to-br from-blue-50 to-indigo-50 rounded-3xl"></div>

                <div className="relative backdrop-blur-sm bg-white/90 rounded-3xl p-8 border border-blue-200/60 shadow-level-2">
                    <div className="flex flex-col lg:flex-row items-start gap-6">
                        <div className="flex-shrink-0">
                            <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-2xl flex items-center justify-center text-3xl text-white shadow-level-2">
                                💡
                            </div>
                        </div>

                        <div className="flex-1">
                            <h4 className="text-h4 font-bold text-blue-800 mb-4">
                                Pairing Token Selection Guide
                            </h4>

                            <div className="grid md:grid-cols-2 gap-4">
                                {[
                                    {
                                        icon: "🌟",
                                        tip: "EGLD pairs offer the highest trading volume and best price discovery",
                                    },
                                    {
                                        icon: "💵",
                                        tip: "USDC pairs provide price stability and are preferred for stablecoins",
                                    },
                                    {
                                        icon: "⚡",
                                        tip: "Consider the target market and expected trading patterns",
                                    },
                                    {
                                        icon: "📊",
                                        tip: "Higher market cap tokens typically provide better liquidity depth",
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
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {[
                    {
                        label: "Available Pairs",
                        value: mockPairingTokens.length.toString(),
                        icon: "🔗",
                        color: "from-blue-500 to-blue-600",
                    },
                    {
                        label: "Recommended",
                        value: recommendedTokens.length.toString(),
                        icon: "⭐",
                        color: "from-green-500 to-green-600",
                    },
                    {
                        label: "Next Step",
                        value: lpData.tokenB ? "Set Amounts" : "Select Pair",
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
        </div>
    );
};
