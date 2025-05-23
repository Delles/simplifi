import React, { useState, useEffect } from "react";
import type { LPData } from "../Introduction";
import { InfoTooltip } from "../shared";

interface DefineLiquidityProps {
    lpData: LPData;
    onInputChange: (field: keyof LPData, value: unknown) => void;
}

export const DefineLiquidity: React.FC<DefineLiquidityProps> = ({
    lpData,
    onInputChange,
}) => {
    const [tokenAAmount, setTokenAAmount] = useState(
        lpData.tokenA?.amount || ""
    );
    const [tokenBAmount, setTokenBAmount] = useState(
        lpData.tokenB?.amount || ""
    );
    const [pricePerTokenA, setPricePerTokenA] = useState("");
    const [estimatedLPTokens, setEstimatedLPTokens] = useState("");
    const [warnings, setWarnings] = useState<string[]>([]);

    // Calculate price and LP tokens when amounts change
    useEffect(() => {
        if (
            tokenAAmount &&
            tokenBAmount &&
            parseFloat(tokenAAmount) > 0 &&
            parseFloat(tokenBAmount) > 0
        ) {
            // Calculate price per Token A in terms of Token B
            const priceCalc = (
                parseFloat(tokenBAmount) / parseFloat(tokenAAmount)
            ).toFixed(6);
            setPricePerTokenA(priceCalc);

            // Estimate LP tokens (simplified calculation)
            const lpTokensCalc = Math.sqrt(
                parseFloat(tokenAAmount) * parseFloat(tokenBAmount)
            ).toFixed(6);
            setEstimatedLPTokens(lpTokensCalc);

            // Update parent state
            onInputChange("initialPrice", priceCalc);
            onInputChange("estimatedLPTokens", lpTokensCalc);

            // Update token amounts in parent state
            if (lpData.tokenA) {
                onInputChange("tokenA", {
                    ...lpData.tokenA,
                    amount: tokenAAmount,
                });
            }
            if (lpData.tokenB) {
                onInputChange("tokenB", {
                    ...lpData.tokenB,
                    amount: tokenBAmount,
                });
            }

            // Generate warnings
            const newWarnings: string[] = [];

            // Check if amounts are too small
            if (parseFloat(tokenAAmount) < 1 || parseFloat(tokenBAmount) < 1) {
                newWarnings.push(
                    "Very small liquidity amounts may result in high slippage"
                );
            }

            // Check balance sufficiency
            if (
                lpData.tokenA &&
                parseFloat(tokenAAmount) >
                    parseFloat(lpData.tokenA.balance) /
                        Math.pow(10, lpData.tokenA.decimals)
            ) {
                newWarnings.push(
                    `Insufficient ${lpData.tokenA.ticker} balance`
                );
            }
            if (
                lpData.tokenB &&
                parseFloat(tokenBAmount) >
                    parseFloat(lpData.tokenB.balance) /
                        Math.pow(10, lpData.tokenB.decimals)
            ) {
                newWarnings.push(
                    `Insufficient ${lpData.tokenB.ticker} balance`
                );
            }

            setWarnings(newWarnings);
        } else {
            setPricePerTokenA("");
            setEstimatedLPTokens("");
            setWarnings([]);
        }
    }, [
        tokenAAmount,
        tokenBAmount,
        lpData.tokenA,
        lpData.tokenB,
        onInputChange,
    ]);

    const handleTokenAAmountChange = (value: string) => {
        // Only allow valid numbers
        if (value === "" || /^\d*\.?\d*$/.test(value)) {
            setTokenAAmount(value);
        }
    };

    const handleTokenBAmountChange = (value: string) => {
        // Only allow valid numbers
        if (value === "" || /^\d*\.?\d*$/.test(value)) {
            setTokenBAmount(value);
        }
    };

    const handleMaxClick = (tokenType: "A" | "B") => {
        if (tokenType === "A" && lpData.tokenA) {
            const maxAmount = (
                parseFloat(lpData.tokenA.balance) /
                Math.pow(10, lpData.tokenA.decimals)
            ).toString();
            setTokenAAmount(maxAmount);
        } else if (tokenType === "B" && lpData.tokenB) {
            const maxAmount = (
                parseFloat(lpData.tokenB.balance) /
                Math.pow(10, lpData.tokenB.decimals)
            ).toString();
            setTokenBAmount(maxAmount);
        }
    };

    const formatBalance = (balance: string, decimals: number) => {
        const value = parseFloat(balance) / Math.pow(10, decimals);
        return value.toLocaleString(undefined, {
            maximumFractionDigits: decimals > 6 ? 6 : 2,
            minimumFractionDigits: 0,
        });
    };

    if (!lpData.tokenA || !lpData.tokenB) {
        return (
            <div className="text-center space-y-6">
                <div className="w-20 h-20 bg-gradient-to-br from-amber-500 to-orange-500 rounded-3xl flex items-center justify-center text-4xl text-white mx-auto shadow-level-3">
                    ⚠️
                </div>
                <h2 className="text-h2 font-bold text-graphite">
                    Please Select Tokens First
                </h2>
                <p className="text-slate max-w-md mx-auto">
                    You need to select both Token A and Token B before defining
                    liquidity amounts.
                </p>
            </div>
        );
    }

    return (
        <div className="space-y-8">
            {/* Hero Section */}
            <div className="text-center">
                <div className="relative mb-6">
                    {/* Animated Background Glow */}
                    <div className="absolute inset-0 w-20 h-20 mx-auto bg-gradient-to-br from-distribute-400/30 to-amber-400/30 rounded-full blur-lg animate-pulse-gentle"></div>

                    {/* Main Icon */}
                    <div className="relative w-20 h-20 bg-gradient-to-br from-distribute-500 to-amber-500 rounded-3xl flex items-center justify-center text-4xl text-white mx-auto shadow-level-3 animate-bounce-gentle">
                        💰
                    </div>

                    {/* Floating Particles */}
                    <div className="absolute -top-1 -right-1 w-2 h-2 bg-distribute-400 rounded-full animate-bounce opacity-60"></div>
                    <div className="absolute -bottom-1 -left-1 w-1.5 h-1.5 bg-amber-400 rounded-full animate-pulse opacity-40"></div>
                </div>

                <h2 className="text-h2 font-bold text-graphite mb-4 tracking-tight">
                    Define{" "}
                    <span className="text-distribute-600 font-extrabold">
                        Initial Liquidity
                    </span>
                </h2>
                <div className="flex items-center justify-center gap-3 text-body-lg text-slate max-w-2xl mx-auto">
                    <span>
                        Set the amounts of both tokens to provide initial
                        liquidity
                    </span>
                    <InfoTooltip
                        title="Initial Liquidity"
                        content="The amounts you set will determine the initial price ratio. Make sure you're comfortable with this price as arbitrage traders may immediately trade if it differs from market expectations."
                        risk="caution"
                    />
                </div>
            </div>

            {/* Token Pair Summary */}
            <div className="relative">
                <div className="absolute inset-0 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-3xl"></div>

                <div className="relative backdrop-blur-sm bg-white/90 rounded-3xl p-6 border border-blue-200/60 shadow-level-2">
                    <div className="flex items-center justify-between">
                        <div className="flex items-center gap-4">
                            <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-indigo-600 rounded-2xl flex items-center justify-center text-white font-bold shadow-level-2">
                                A
                            </div>
                            <div>
                                <h4 className="font-bold text-blue-800">
                                    {lpData.tokenA.name}
                                </h4>
                                <span className="text-blue-600 text-sm">
                                    {lpData.tokenA.ticker}
                                </span>
                            </div>
                        </div>

                        <div className="text-2xl text-slate">⇄</div>

                        <div className="flex items-center gap-4">
                            <div>
                                <h4 className="font-bold text-green-800 text-right">
                                    {lpData.tokenB.name}
                                </h4>
                                <span className="text-green-600 text-sm">
                                    {lpData.tokenB.ticker}
                                </span>
                            </div>
                            <div className="w-12 h-12 bg-gradient-to-r from-green-500 to-emerald-600 rounded-2xl flex items-center justify-center text-white font-bold shadow-level-2">
                                B
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Amount Input Section */}
            <div className="space-y-6">
                <h3 className="text-h4 font-bold text-graphite mb-2">
                    Set Token Amounts
                </h3>

                <div className="grid gap-6 lg:grid-cols-2">
                    {/* Token A Amount Input */}
                    <div className="relative">
                        <div className="absolute inset-0 bg-gradient-to-br from-blue-50 to-blue-100/50 rounded-3xl"></div>

                        <div className="relative backdrop-blur-sm bg-white/90 rounded-3xl p-6 border border-blue-200/60 shadow-level-2">
                            <div className="flex items-center gap-3 mb-4">
                                <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-blue-600 rounded-xl flex items-center justify-center text-white font-bold shadow-level-1">
                                    A
                                </div>
                                <div>
                                    <h4 className="font-bold text-blue-800">
                                        {lpData.tokenA.ticker} Amount
                                    </h4>
                                    <p className="text-blue-600 text-sm">
                                        Balance:{" "}
                                        {formatBalance(
                                            lpData.tokenA.balance,
                                            lpData.tokenA.decimals
                                        )}{" "}
                                        {lpData.tokenA.ticker}
                                    </p>
                                </div>
                            </div>

                            <div className="relative">
                                <input
                                    type="text"
                                    value={tokenAAmount}
                                    onChange={(e) =>
                                        handleTokenAAmountChange(e.target.value)
                                    }
                                    placeholder="0.00"
                                    className="w-full px-4 py-4 text-xl font-semibold bg-white/80 border border-blue-200 rounded-2xl focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent transition-all duration-200"
                                />
                                <button
                                    onClick={() => handleMaxClick("A")}
                                    className="absolute right-3 top-1/2 -translate-y-1/2 px-3 py-1 bg-blue-500 text-white text-sm font-medium rounded-lg hover:bg-blue-600 transition-colors duration-200"
                                >
                                    MAX
                                </button>
                            </div>
                        </div>
                    </div>

                    {/* Token B Amount Input */}
                    <div className="relative">
                        <div className="absolute inset-0 bg-gradient-to-br from-green-50 to-green-100/50 rounded-3xl"></div>

                        <div className="relative backdrop-blur-sm bg-white/90 rounded-3xl p-6 border border-green-200/60 shadow-level-2">
                            <div className="flex items-center gap-3 mb-4">
                                <div className="w-10 h-10 bg-gradient-to-r from-green-500 to-green-600 rounded-xl flex items-center justify-center text-white font-bold shadow-level-1">
                                    B
                                </div>
                                <div>
                                    <h4 className="font-bold text-green-800">
                                        {lpData.tokenB.ticker} Amount
                                    </h4>
                                    <p className="text-green-600 text-sm">
                                        Balance:{" "}
                                        {formatBalance(
                                            lpData.tokenB.balance,
                                            lpData.tokenB.decimals
                                        )}{" "}
                                        {lpData.tokenB.ticker}
                                    </p>
                                </div>
                            </div>

                            <div className="relative">
                                <input
                                    type="text"
                                    value={tokenBAmount}
                                    onChange={(e) =>
                                        handleTokenBAmountChange(e.target.value)
                                    }
                                    placeholder="0.00"
                                    className="w-full px-4 py-4 text-xl font-semibold bg-white/80 border border-green-200 rounded-2xl focus:outline-none focus:ring-2 focus:ring-green-400 focus:border-transparent transition-all duration-200"
                                />
                                <button
                                    onClick={() => handleMaxClick("B")}
                                    className="absolute right-3 top-1/2 -translate-y-1/2 px-3 py-1 bg-green-500 text-white text-sm font-medium rounded-lg hover:bg-green-600 transition-colors duration-200"
                                >
                                    MAX
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Price Calculation Section */}
            {pricePerTokenA && (
                <div className="relative">
                    <div className="absolute inset-0 bg-gradient-to-r from-purple-50 via-purple-100/50 to-purple-50 rounded-3xl blur-sm"></div>

                    <div className="relative backdrop-blur-md bg-white/95 rounded-3xl p-6 border border-white/50 shadow-level-3 animate-fade-in-up">
                        <div className="flex items-center gap-4 mb-4">
                            <div className="w-12 h-12 bg-gradient-to-r from-purple-500 to-purple-600 rounded-2xl flex items-center justify-center text-white font-bold shadow-level-2">
                                📊
                            </div>
                            <div>
                                <h4 className="text-lg font-bold text-purple-800">
                                    Price Calculation
                                </h4>
                                <p className="text-purple-600 text-sm">
                                    Initial pool price based on your amounts
                                </p>
                            </div>
                        </div>

                        <div className="grid gap-4 md:grid-cols-2">
                            <div className="bg-purple-50 rounded-2xl p-4">
                                <p className="text-purple-600 text-sm mb-1">
                                    Price per {lpData.tokenA.ticker}
                                </p>
                                <p className="text-2xl font-bold text-purple-800">
                                    {pricePerTokenA} {lpData.tokenB.ticker}
                                </p>
                            </div>
                            <div className="bg-purple-50 rounded-2xl p-4">
                                <p className="text-purple-600 text-sm mb-1">
                                    Estimated LP Tokens
                                </p>
                                <p className="text-2xl font-bold text-purple-800">
                                    {estimatedLPTokens}
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            )}

            {/* Warnings Section */}
            {warnings.length > 0 && (
                <div className="relative">
                    <div className="absolute inset-0 bg-gradient-to-br from-red-50 to-orange-50 rounded-3xl"></div>

                    <div className="relative backdrop-blur-sm bg-white/90 rounded-3xl p-6 border border-red-200/60 shadow-level-2">
                        <div className="flex items-center gap-4 mb-4">
                            <div className="w-12 h-12 bg-gradient-to-r from-red-500 to-red-600 rounded-2xl flex items-center justify-center text-white font-bold shadow-level-2">
                                ⚠️
                            </div>
                            <div>
                                <h4 className="text-lg font-bold text-red-800">
                                    Warnings
                                </h4>
                                <p className="text-red-600 text-sm">
                                    Please review these concerns
                                </p>
                            </div>
                        </div>

                        <div className="space-y-2">
                            {warnings.map((warning, index) => (
                                <div
                                    key={index}
                                    className="flex items-start gap-3 p-3 bg-red-50 rounded-xl"
                                >
                                    <div className="w-5 h-5 bg-red-500 rounded-full flex items-center justify-center text-white text-xs font-bold mt-0.5">
                                        !
                                    </div>
                                    <p className="text-red-700 text-sm">
                                        {warning}
                                    </p>
                                </div>
                            ))}
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
                                Liquidity Amount Guidelines
                            </h4>

                            <div className="grid md:grid-cols-2 gap-4">
                                {[
                                    {
                                        icon: "💰",
                                        tip: "Higher liquidity amounts provide better price stability and lower slippage",
                                    },
                                    {
                                        icon: "⚖️",
                                        tip: "The ratio you set determines the initial price - ensure it reflects fair market value",
                                    },
                                    {
                                        icon: "📈",
                                        tip: "Consider starting with modest amounts and adding more liquidity later",
                                    },
                                    {
                                        icon: "🎯",
                                        tip: "Reserve some tokens for future liquidity additions and trading",
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

            {/* Summary Stats */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {[
                    {
                        label: "Token A Amount",
                        value: tokenAAmount || "0",
                        unit: lpData.tokenA.ticker,
                        icon: "🪙",
                        color: "from-blue-500 to-blue-600",
                    },
                    {
                        label: "Token B Amount",
                        value: tokenBAmount || "0",
                        unit: lpData.tokenB.ticker,
                        icon: "💎",
                        color: "from-green-500 to-green-600",
                    },
                    {
                        label: "Estimated LP Tokens",
                        value: estimatedLPTokens || "0",
                        unit: "LP",
                        icon: "🏊‍♂️",
                        color: "from-purple-500 to-purple-600",
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
                                {parseFloat(stat.value || "0").toLocaleString(
                                    undefined,
                                    { maximumFractionDigits: 6 }
                                )}
                            </div>
                            <div className="text-sm text-slate">
                                {stat.label}
                            </div>
                            <div className="text-xs text-slate font-medium mt-1">
                                {stat.unit}
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};
