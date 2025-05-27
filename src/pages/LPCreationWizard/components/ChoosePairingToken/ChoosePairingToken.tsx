import React from "react";
import type { LPData } from "../Introduction";
import { InfoTooltip, CollapsibleCard } from "../shared";

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
                return "text-emerald-green bg-emerald-green/10";
            case "medium":
                return "text-distribute-primary bg-distribute-primary/10";
            case "high":
                return "text-red-600 bg-red-100";
            default:
                return "text-slate bg-slate/10";
        }
    };

    // Filter recommended and other tokens
    const recommendedTokens = mockPairingTokens.filter(
        (token) => token.recommended
    );
    const otherTokens = mockPairingTokens.filter((token) => !token.recommended);

    const TokenCard = ({
        token,
        isRecommended = false,
    }: {
        token: (typeof mockPairingTokens)[0];
        isRecommended?: boolean;
    }) => {
        const isSelected = lpData.tokenB?.identifier === token.identifier;

        return (
            <div
                onClick={() => handleTokenSelect(token)}
                className={`
                    group relative cursor-pointer transition-all duration-200 rounded-xl p-4 border
                    ${
                        isSelected
                            ? "bg-theme-blue/5 border-theme-blue/30 shadow-level-1"
                            : "bg-white border-ash/30 hover:bg-theme-blue/5 hover:border-theme-blue/20 hover:shadow-level-1"
                    }
                `}
            >
                <div className="flex items-center gap-4">
                    {/* Token Icon */}
                    <div className="w-12 h-12 bg-gradient-to-br from-theme-blue to-theme-blue-dark rounded-xl flex items-center justify-center text-2xl shadow-level-1 group-hover:scale-105 transition-transform duration-200">
                        {token.icon}
                    </div>

                    {/* Token Info */}
                    <div className="flex-1">
                        <div className="flex items-center gap-2 mb-1">
                            <h4 className="font-semibold text-graphite">
                                {token.name}
                            </h4>
                            <span className="px-2 py-1 bg-slate/10 text-slate text-xs rounded-md font-medium">
                                {token.ticker}
                            </span>
                            {isRecommended && (
                                <span className="px-2 py-1 bg-emerald-green/10 text-emerald-green text-xs rounded-md font-medium">
                                    Recommended
                                </span>
                            )}
                        </div>
                        <p className="text-sm text-slate mb-2">
                            {token.description}
                        </p>
                        <div className="flex items-center gap-4 text-xs">
                            <span className="text-slate">
                                Balance:{" "}
                                {formatBalance(token.balance, token.decimals)}{" "}
                                {token.ticker}
                            </span>
                            <span
                                className={`px-2 py-1 rounded-full text-xs font-medium ${getRiskColor(
                                    token.riskLevel
                                )}`}
                            >
                                {token.riskLevel} risk
                            </span>
                        </div>
                    </div>

                    {/* Selection Indicator */}
                    <div
                        className={`w-6 h-6 rounded-full border-2 flex items-center justify-center transition-all duration-200 ${
                            isSelected
                                ? "bg-theme-blue border-theme-blue text-white"
                                : "border-ash group-hover:border-theme-blue"
                        }`}
                    >
                        {isSelected && <span className="text-xs">✓</span>}
                    </div>
                </div>
            </div>
        );
    };

    return (
        <div className="space-y-8">
            {/* Hero Section - Simplified */}
            <div className="text-center">
                <div className="w-16 h-16 bg-gradient-to-br from-theme-blue to-theme-blue-dark rounded-2xl flex items-center justify-center text-3xl text-white mx-auto mb-6 shadow-level-2">
                    🔗
                </div>

                <h2 className="text-h2 font-bold text-theme-blue mb-4">
                    Choose Pairing Token
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

            {/* Token Pair Preview */}
            {lpData.tokenA && (
                <div className="bg-theme-blue/5 border border-theme-blue/20 rounded-xl p-4">
                    <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                            <div className="w-10 h-10 bg-gradient-to-br from-theme-blue to-theme-blue-dark rounded-lg flex items-center justify-center text-white font-bold shadow-level-1">
                                A
                            </div>
                            <div>
                                <h4 className="font-semibold text-theme-blue">
                                    {lpData.tokenA.name}
                                </h4>
                                <p className="text-sm text-slate">
                                    {lpData.tokenA.ticker}
                                </p>
                            </div>
                        </div>

                        <div className="text-2xl text-slate">⇄</div>

                        <div className="flex items-center gap-3">
                            <div>
                                <h4 className="font-semibold text-theme-blue text-right">
                                    {lpData.tokenB
                                        ? lpData.tokenB.name
                                        : "Select Token B"}
                                </h4>
                                <p className="text-sm text-slate text-right">
                                    {lpData.tokenB
                                        ? lpData.tokenB.ticker
                                        : "Choose pairing token"}
                                </p>
                            </div>
                            <div className="w-10 h-10 bg-gradient-to-br from-emerald-green to-emerald-600 rounded-lg flex items-center justify-center text-white font-bold shadow-level-1">
                                {lpData.tokenB ? "B" : "?"}
                            </div>
                        </div>
                    </div>
                </div>
            )}

            {/* Current Selection Display */}
            {lpData.tokenB && (
                <div className="bg-emerald-green/5 border border-emerald-green/20 rounded-xl p-4">
                    <div className="flex items-center gap-3">
                        <div className="w-10 h-10 bg-gradient-to-br from-emerald-green to-emerald-600 rounded-lg flex items-center justify-center text-white text-lg shadow-level-1">
                            {lpData.tokenB.icon}
                        </div>
                        <div className="flex-1">
                            <h4 className="font-semibold text-emerald-green">
                                Selected: {lpData.tokenB.name}
                            </h4>
                            <p className="text-sm text-slate">
                                Balance:{" "}
                                {formatBalance(
                                    lpData.tokenB.balance,
                                    lpData.tokenB.decimals
                                )}{" "}
                                {lpData.tokenB.ticker}
                            </p>
                        </div>
                        <div className="w-8 h-8 bg-emerald-green rounded-lg flex items-center justify-center text-white">
                            ✓
                        </div>
                    </div>
                </div>
            )}

            {/* Recommended Tokens */}
            <CollapsibleCard
                title="Recommended Pairing Tokens"
                icon="⭐"
                variant="success"
                defaultExpanded={!lpData.tokenB}
                badge="Best liquidity"
            >
                <div className="space-y-3">
                    <p className="text-slate text-sm mb-4">
                        These tokens provide the best liquidity and trading
                        volume for your pool.
                    </p>
                    {recommendedTokens.map((token) => (
                        <TokenCard
                            key={token.identifier}
                            token={token}
                            isRecommended={true}
                        />
                    ))}
                </div>
            </CollapsibleCard>

            {/* Other Available Tokens */}
            <CollapsibleCard
                title="Other Available Tokens"
                icon="💼"
                variant="secondary"
                defaultExpanded={false}
                badge={`${otherTokens.length} tokens`}
            >
                <div className="space-y-3">
                    <p className="text-slate text-sm mb-4">
                        Additional pairing options with varying liquidity
                        levels.
                    </p>
                    {otherTokens.map((token) => (
                        <TokenCard key={token.identifier} token={token} />
                    ))}
                </div>
            </CollapsibleCard>

            {/* Token Details - Only show if token is selected */}
            {lpData.tokenB && (
                <CollapsibleCard
                    title="Pairing Token Details"
                    icon="📊"
                    variant="primary"
                    defaultExpanded={false}
                >
                    <div className="space-y-4">
                        <div className="grid md:grid-cols-2 gap-4">
                            <div className="space-y-3">
                                <div className="flex justify-between">
                                    <span className="text-slate text-sm">
                                        Token Name:
                                    </span>
                                    <span className="font-medium text-graphite text-sm">
                                        {lpData.tokenB.name}
                                    </span>
                                </div>
                                <div className="flex justify-between">
                                    <span className="text-slate text-sm">
                                        Ticker:
                                    </span>
                                    <span className="font-medium text-graphite text-sm">
                                        {lpData.tokenB.ticker}
                                    </span>
                                </div>
                                <div className="flex justify-between">
                                    <span className="text-slate text-sm">
                                        Type:
                                    </span>
                                    <span className="font-medium text-graphite text-sm">
                                        {lpData.tokenB.type}
                                    </span>
                                </div>
                                <div className="flex justify-between">
                                    <span className="text-slate text-sm">
                                        Risk Level:
                                    </span>
                                    <span
                                        className={`px-2 py-1 rounded-full text-xs font-medium ${getRiskColor(
                                            lpData.tokenB.riskLevel || "low"
                                        )}`}
                                    >
                                        {" "}
                                        {lpData.tokenB.riskLevel}
                                    </span>
                                </div>
                            </div>
                            <div className="space-y-3">
                                <div className="flex justify-between">
                                    <span className="text-slate text-sm">
                                        Market Cap:
                                    </span>
                                    <span className="font-medium text-graphite text-sm">
                                        {lpData.tokenB.marketCap}
                                    </span>
                                </div>
                                <div className="flex justify-between">
                                    <span className="text-slate text-sm">
                                        24h Volume:
                                    </span>
                                    <span className="font-medium text-graphite text-sm">
                                        {lpData.tokenB.volume24h}
                                    </span>
                                </div>
                                <div className="flex justify-between">
                                    <span className="text-slate text-sm">
                                        Your Balance:
                                    </span>
                                    <span className="font-medium text-graphite text-sm">
                                        {formatBalance(
                                            lpData.tokenB.balance,
                                            lpData.tokenB.decimals
                                        )}{" "}
                                        {lpData.tokenB.ticker}
                                    </span>
                                </div>
                                <div className="flex justify-between">
                                    <span className="text-slate text-sm">
                                        Decimals:
                                    </span>
                                    <span className="font-medium text-graphite text-sm">
                                        {lpData.tokenB.decimals}
                                    </span>
                                </div>
                            </div>
                        </div>
                    </div>
                </CollapsibleCard>
            )}

            {/* Pairing Strategy Tips */}
            <CollapsibleCard
                title="Pairing Strategy Tips"
                icon="💡"
                variant="secondary"
                defaultExpanded={false}
            >
                <div className="space-y-3">
                    {[
                        {
                            icon: "🌟",
                            title: "EGLD Pairing",
                            desc: "Best for maximum exposure and native ecosystem integration. High trading volume expected.",
                        },
                        {
                            icon: "💵",
                            title: "USDC Pairing",
                            desc: "Stable value reference, good for price discovery and reduced volatility impact.",
                        },
                        {
                            icon: "📊",
                            title: "Volume Considerations",
                            desc: "Higher market cap tokens typically provide better liquidity and trading volume.",
                        },
                        {
                            icon: "⚖️",
                            title: "Risk Assessment",
                            desc: "Consider the correlation between your token and the pairing token for impermanent loss.",
                        },
                    ].map((tip, index) => (
                        <div
                            key={index}
                            className="flex items-start gap-3 p-3 bg-slate/5 rounded-lg"
                        >
                            <div className="w-8 h-8 bg-theme-blue/10 rounded-lg flex items-center justify-center text-lg flex-shrink-0">
                                {tip.icon}
                            </div>
                            <div>
                                <p className="font-semibold text-graphite text-sm mb-1">
                                    {tip.title}
                                </p>
                                <p className="text-slate text-sm leading-relaxed">
                                    {tip.desc}
                                </p>
                            </div>
                        </div>
                    ))}
                </div>
            </CollapsibleCard>
        </div>
    );
};
