import React from "react";
import type { LPData } from "../Introduction";
import { InfoTooltip, CollapsibleCard } from "../shared";

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
            "from-theme-blue to-theme-blue-dark",
            "from-emerald-green to-emerald-600",
            "from-distribute-primary to-distribute-secondary",
            "from-purple-500 to-purple-600",
            "from-teal-500 to-teal-600",
            "from-indigo-500 to-indigo-600",
        ];
        const hash = ticker.split("").reduce((a, b) => a + b.charCodeAt(0), 0);
        return colors[hash % colors.length];
    };

    return (
        <div className="space-y-8">
            {/* Hero Section - Simplified */}
            <div className="text-center">
                <div className="w-16 h-16 bg-gradient-to-br from-theme-blue to-theme-blue-dark rounded-2xl flex items-center justify-center text-3xl text-white mx-auto mb-6 shadow-level-2">
                    🪙
                </div>

                <h2 className="text-h2 font-bold text-theme-blue mb-4">
                    Select Your Token
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

            {/* Token Selection */}
            <div className="space-y-6">
                {/* Current Selection Display */}
                {lpData.tokenA && (
                    <div className="bg-theme-blue/5 border border-theme-blue/20 rounded-xl p-4">
                        <div className="flex items-center gap-3">
                            <div
                                className={`w-10 h-10 bg-gradient-to-br ${getTokenGradient(
                                    lpData.tokenA.ticker
                                )} rounded-lg flex items-center justify-center text-white font-bold shadow-level-1`}
                            >
                                {lpData.tokenA.ticker.charAt(0)}
                            </div>
                            <div className="flex-1">
                                <h4 className="font-semibold text-theme-blue">
                                    Selected: {lpData.tokenA.name}
                                </h4>
                                <p className="text-sm text-slate">
                                    Balance:{" "}
                                    {formatBalance(
                                        lpData.tokenA.balance,
                                        lpData.tokenA.decimals
                                    )}{" "}
                                    {lpData.tokenA.ticker}
                                </p>
                            </div>
                            <div className="w-8 h-8 bg-theme-blue rounded-lg flex items-center justify-center text-white">
                                ✓
                            </div>
                        </div>
                    </div>
                )}

                {/* Available Tokens */}
                <CollapsibleCard
                    title="Your Available Tokens"
                    icon="💼"
                    variant="secondary"
                    defaultExpanded={!lpData.tokenA}
                    badge={`${mockUserTokens.length} tokens`}
                >
                    {mockUserTokens.length === 0 ? (
                        <div className="text-center py-8">
                            <div className="w-16 h-16 bg-distribute-primary/10 rounded-2xl flex items-center justify-center text-3xl mx-auto mb-4">
                                🔍
                            </div>
                            <h4 className="font-semibold text-graphite mb-2">
                                No Tokens Found
                            </h4>
                            <p className="text-slate text-sm">
                                We couldn't find any tokens in your wallet. Make
                                sure you have tokens available for creating a
                                liquidity pool.
                            </p>
                        </div>
                    ) : (
                        <div className="space-y-3">
                            {mockUserTokens.map((token) => {
                                const isSelected =
                                    lpData.tokenA?.identifier ===
                                    token.identifier;
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
                                            group relative cursor-pointer transition-all duration-200 rounded-xl p-4 border
                                            ${
                                                isSelected
                                                    ? "bg-theme-blue/5 border-theme-blue/30 shadow-level-1"
                                                    : "bg-white border-ash/30 hover:bg-theme-blue/5 hover:border-theme-blue/20 hover:shadow-level-1"
                                            }
                                        `}
                                    >
                                        <div className="flex items-center gap-4">
                                            {/* Token Avatar */}
                                            <div
                                                className={`w-12 h-12 bg-gradient-to-br ${tokenGradient} rounded-xl flex items-center justify-center text-white font-bold shadow-level-1 group-hover:scale-105 transition-transform duration-200`}
                                            >
                                                {token.ticker.charAt(0)}
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
                                                </div>
                                                <p className="text-sm text-slate">
                                                    Balance: {formattedBalance}{" "}
                                                    {token.ticker}
                                                </p>
                                            </div>

                                            {/* Selection Indicator */}
                                            <div
                                                className={`w-6 h-6 rounded-full border-2 flex items-center justify-center transition-all duration-200 ${
                                                    isSelected
                                                        ? "bg-theme-blue border-theme-blue text-white"
                                                        : "border-ash group-hover:border-theme-blue"
                                                }`}
                                            >
                                                {isSelected && (
                                                    <span className="text-xs">
                                                        ✓
                                                    </span>
                                                )}
                                            </div>
                                        </div>
                                    </div>
                                );
                            })}
                        </div>
                    )}
                </CollapsibleCard>

                {/* Token Details - Only show if token is selected */}
                {lpData.tokenA && (
                    <CollapsibleCard
                        title="Token Details"
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
                                            {lpData.tokenA.name}
                                        </span>
                                    </div>
                                    <div className="flex justify-between">
                                        <span className="text-slate text-sm">
                                            Ticker:
                                        </span>
                                        <span className="font-medium text-graphite text-sm">
                                            {lpData.tokenA.ticker}
                                        </span>
                                    </div>
                                    <div className="flex justify-between">
                                        <span className="text-slate text-sm">
                                            Identifier:
                                        </span>
                                        <span className="font-mono text-xs text-slate break-all">
                                            {lpData.tokenA.identifier}
                                        </span>
                                    </div>
                                </div>
                                <div className="space-y-3">
                                    <div className="flex justify-between">
                                        <span className="text-slate text-sm">
                                            Decimals:
                                        </span>
                                        <span className="font-medium text-graphite text-sm">
                                            {lpData.tokenA.decimals}
                                        </span>
                                    </div>
                                    <div className="flex justify-between">
                                        <span className="text-slate text-sm">
                                            Your Balance:
                                        </span>
                                        <span className="font-medium text-graphite text-sm">
                                            {formatBalance(
                                                lpData.tokenA.balance,
                                                lpData.tokenA.decimals
                                            )}{" "}
                                            {lpData.tokenA.ticker}
                                        </span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </CollapsibleCard>
                )}

                {/* Important Notes */}
                <CollapsibleCard
                    title="Important Notes"
                    icon="💡"
                    variant="secondary"
                    defaultExpanded={false}
                >
                    <div className="space-y-3">
                        {[
                            {
                                icon: "🔒",
                                title: "Token Requirements",
                                desc: "Ensure you have sufficient token balance for providing initial liquidity.",
                            },
                            {
                                icon: "⚖️",
                                title: "Balance Consideration",
                                desc: "Reserve some tokens for future use - you don't need to use your entire balance.",
                            },
                            {
                                icon: "🔄",
                                title: "Token Selection",
                                desc: "You can change your selection at any time before creating the pool.",
                            },
                        ].map((note, index) => (
                            <div
                                key={index}
                                className="flex items-start gap-3 p-3 bg-slate/5 rounded-lg"
                            >
                                <div className="w-8 h-8 bg-theme-blue/10 rounded-lg flex items-center justify-center text-lg flex-shrink-0">
                                    {note.icon}
                                </div>
                                <div>
                                    <p className="font-semibold text-graphite text-sm mb-1">
                                        {note.title}
                                    </p>
                                    <p className="text-slate text-sm leading-relaxed">
                                        {note.desc}
                                    </p>
                                </div>
                            </div>
                        ))}
                    </div>
                </CollapsibleCard>
            </div>
        </div>
    );
};
