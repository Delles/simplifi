import React, { useState } from "react";
import type { LPData } from "../Introduction";
import { InfoTooltip } from "../shared";

interface ReviewRisksProps {
    lpData: LPData;
    onInputChange: (field: keyof LPData, value: unknown) => void;
}

export const ReviewRisks: React.FC<ReviewRisksProps> = ({
    lpData,
    onInputChange,
}) => {
    const [checkedRisks, setCheckedRisks] = useState<{
        [key: string]: boolean;
    }>({});

    // Risk items that need to be acknowledged
    const riskItems = [
        {
            id: "impermanent_loss",
            title: "Impermanent Loss Risk",
            description:
                "I understand that if token prices diverge, my LP position may be worth less than holding tokens separately.",
            severity: "high" as const,
            icon: "🔄",
        },
        {
            id: "price_setting",
            title: "Initial Price Setting",
            description:
                "I understand that I'm setting the initial price ratio and arbitrage traders may immediately profit if this doesn't match market value.",
            severity: "high" as const,
            icon: "💰",
        },
        {
            id: "smart_contract",
            title: "Smart Contract Risk",
            description:
                "I understand that my tokens will be locked in a smart contract and are subject to smart contract risks.",
            severity: "medium" as const,
            icon: "🔒",
        },
        {
            id: "liquidity_provision",
            title: "Liquidity Provision Responsibility",
            description:
                "I understand that as a liquidity provider, I'm responsible for the initial liquidity and market making.",
            severity: "medium" as const,
            icon: "📊",
        },
        {
            id: "financial_loss",
            title: "Potential Financial Loss",
            description:
                "I understand that I may lose part or all of my investment and I'm not investing more than I can afford to lose.",
            severity: "high" as const,
            icon: "⚠️",
        },
    ];

    const handleRiskCheck = (riskId: string, checked: boolean) => {
        const newCheckedRisks = { ...checkedRisks, [riskId]: checked };
        setCheckedRisks(newCheckedRisks);

        // Update parent state - all risks must be acknowledged
        const allAcknowledged = riskItems.every(
            (risk) => newCheckedRisks[risk.id]
        );
        onInputChange("riskAcknowledged", allAcknowledged);
    };

    const formatBalance = (balance: string, decimals: number) => {
        const value = parseFloat(balance) / Math.pow(10, decimals);
        return value.toLocaleString(undefined, {
            maximumFractionDigits: decimals > 6 ? 6 : 2,
            minimumFractionDigits: 0,
        });
    };

    const getSeverityColor = (severity: string) => {
        switch (severity) {
            case "high":
                return "bg-red-100 text-red-700 border-red-200";
            case "medium":
                return "bg-amber-100 text-amber-700 border-amber-200";
            case "low":
                return "bg-green-100 text-green-700 border-green-200";
            default:
                return "bg-slate-100 text-slate-700 border-slate-200";
        }
    };

    if (!lpData.tokenA || !lpData.tokenB) {
        return (
            <div className="text-center space-y-6">
                <div className="w-20 h-20 bg-gradient-to-br from-amber-500 to-orange-500 rounded-3xl flex items-center justify-center text-4xl text-white mx-auto shadow-level-3">
                    ⚠️
                </div>
                <h2 className="text-h2 font-bold text-graphite">
                    Please Complete Previous Steps
                </h2>
                <p className="text-slate max-w-md mx-auto">
                    You need to complete token selection and amount
                    configuration before reviewing risks.
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
                    <div className="absolute inset-0 w-20 h-20 mx-auto bg-gradient-to-br from-red-400/30 to-orange-400/30 rounded-full blur-lg animate-pulse-gentle"></div>

                    {/* Main Icon */}
                    <div className="relative w-20 h-20 bg-gradient-to-br from-red-500 to-orange-500 rounded-3xl flex items-center justify-center text-4xl text-white mx-auto shadow-level-3 animate-bounce-gentle">
                        ⚠️
                    </div>

                    {/* Floating Particles */}
                    <div className="absolute -top-1 -right-1 w-2 h-2 bg-red-400 rounded-full animate-bounce opacity-60"></div>
                    <div className="absolute -bottom-1 -left-1 w-1.5 h-1.5 bg-orange-400 rounded-full animate-pulse opacity-40"></div>
                </div>

                <h2 className="text-h2 font-bold text-graphite mb-4 tracking-tight">
                    Review &{" "}
                    <span className="text-red-600 font-extrabold">
                        Confirm Risks
                    </span>
                </h2>
                <div className="flex items-center justify-center gap-3 text-body-lg text-slate max-w-2xl mx-auto">
                    <span>
                        Final review of your liquidity pool setup and risk
                        acknowledgment
                    </span>
                    <InfoTooltip
                        title="Final Review"
                        content="This is your last chance to review all details before creating the liquidity pool. Please read and acknowledge all risks carefully."
                        risk="danger"
                    />
                </div>
            </div>

            {/* Pool Setup Summary */}
            <div className="relative">
                <div className="absolute inset-0 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-3xl"></div>

                <div className="relative backdrop-blur-sm bg-white/90 rounded-3xl p-8 border border-blue-200/60 shadow-level-2">
                    <div className="flex items-center gap-4 mb-6">
                        <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-indigo-600 rounded-2xl flex items-center justify-center text-3xl text-white shadow-level-2">
                            📋
                        </div>
                        <div>
                            <h3 className="text-h3 font-bold text-blue-800">
                                Pool Configuration Summary
                            </h3>
                            <p className="text-blue-600">
                                Review your liquidity pool setup before
                                proceeding
                            </p>
                        </div>
                    </div>

                    <div className="grid gap-6 lg:grid-cols-2">
                        {/* Token A Summary */}
                        <div className="bg-blue-50 rounded-2xl p-6">
                            <div className="flex items-center gap-3 mb-4">
                                <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-blue-600 rounded-xl flex items-center justify-center text-white font-bold shadow-level-1">
                                    A
                                </div>
                                <div>
                                    <h4 className="font-bold text-blue-800">
                                        Token A
                                    </h4>
                                    <span className="text-blue-600 text-sm">
                                        {lpData.tokenA.ticker}
                                    </span>
                                </div>
                            </div>
                            <div className="space-y-3">
                                <div className="flex justify-between">
                                    <span className="text-blue-600">Name:</span>
                                    <span className="font-semibold text-blue-800">
                                        {lpData.tokenA.name}
                                    </span>
                                </div>
                                <div className="flex justify-between">
                                    <span className="text-blue-600">
                                        Amount:
                                    </span>
                                    <span className="font-semibold text-blue-800">
                                        {lpData.tokenA.amount}{" "}
                                        {lpData.tokenA.ticker}
                                    </span>
                                </div>
                                <div className="flex justify-between">
                                    <span className="text-blue-600">
                                        Balance:
                                    </span>
                                    <span className="font-semibold text-blue-800">
                                        {formatBalance(
                                            lpData.tokenA.balance,
                                            lpData.tokenA.decimals
                                        )}{" "}
                                        {lpData.tokenA.ticker}
                                    </span>
                                </div>
                            </div>
                        </div>

                        {/* Token B Summary */}
                        <div className="bg-green-50 rounded-2xl p-6">
                            <div className="flex items-center gap-3 mb-4">
                                <div className="w-10 h-10 bg-gradient-to-r from-green-500 to-green-600 rounded-xl flex items-center justify-center text-white font-bold shadow-level-1">
                                    B
                                </div>
                                <div>
                                    <h4 className="font-bold text-green-800">
                                        Token B
                                    </h4>
                                    <span className="text-green-600 text-sm">
                                        {lpData.tokenB.ticker}
                                    </span>
                                </div>
                            </div>
                            <div className="space-y-3">
                                <div className="flex justify-between">
                                    <span className="text-green-600">
                                        Name:
                                    </span>
                                    <span className="font-semibold text-green-800">
                                        {lpData.tokenB.name}
                                    </span>
                                </div>
                                <div className="flex justify-between">
                                    <span className="text-green-600">
                                        Amount:
                                    </span>
                                    <span className="font-semibold text-green-800">
                                        {lpData.tokenB.amount}{" "}
                                        {lpData.tokenB.ticker}
                                    </span>
                                </div>
                                <div className="flex justify-between">
                                    <span className="text-green-600">
                                        Balance:
                                    </span>
                                    <span className="font-semibold text-green-800">
                                        {formatBalance(
                                            lpData.tokenB.balance,
                                            lpData.tokenB.decimals
                                        )}{" "}
                                        {lpData.tokenB.ticker}
                                    </span>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Price and LP Info */}
                    {lpData.initialPrice && lpData.estimatedLPTokens && (
                        <div className="mt-6 grid gap-4 md:grid-cols-2">
                            <div className="bg-purple-50 rounded-2xl p-4">
                                <p className="text-purple-600 text-sm mb-1">
                                    Initial Price
                                </p>
                                <p className="text-xl font-bold text-purple-800">
                                    1 {lpData.tokenA.ticker} ={" "}
                                    {lpData.initialPrice} {lpData.tokenB.ticker}
                                </p>
                            </div>
                            <div className="bg-purple-50 rounded-2xl p-4">
                                <p className="text-purple-600 text-sm mb-1">
                                    Estimated LP Tokens
                                </p>
                                <p className="text-xl font-bold text-purple-800">
                                    {lpData.estimatedLPTokens}
                                </p>
                            </div>
                        </div>
                    )}
                </div>
            </div>

            {/* Risk Acknowledgment Section */}
            <div className="relative">
                <div className="absolute inset-0 bg-gradient-to-br from-red-50 to-orange-50 rounded-3xl animate-pulse-gentle opacity-50"></div>

                <div className="relative backdrop-blur-md bg-white/95 rounded-3xl p-8 border border-red-200/60 shadow-level-3">
                    <div className="flex items-center gap-4 mb-6">
                        <div className="relative">
                            <div className="w-16 h-16 bg-gradient-to-br from-red-500 to-red-600 rounded-2xl flex items-center justify-center text-3xl text-white shadow-level-2">
                                🚨
                            </div>
                            <div className="absolute inset-0 w-16 h-16 bg-red-500/20 rounded-2xl animate-ping"></div>
                        </div>
                        <div>
                            <h3 className="text-h3 font-bold text-red-800">
                                Risk Acknowledgment Required
                            </h3>
                            <p className="text-red-600">
                                You must acknowledge all risks before proceeding
                            </p>
                        </div>
                    </div>

                    <div className="space-y-4">
                        {riskItems.map((risk, index) => (
                            <div
                                key={risk.id}
                                className="relative bg-white/80 backdrop-blur-sm rounded-2xl p-6 border border-red-200/40 hover:shadow-level-2 transition-all duration-300"
                                style={{ animationDelay: `${index * 100}ms` }}
                            >
                                {/* Severity Badge */}
                                <div
                                    className={`absolute top-4 right-4 px-3 py-1 rounded-full text-xs font-bold border ${getSeverityColor(
                                        risk.severity
                                    )}`}
                                >
                                    {risk.severity.toUpperCase()}
                                </div>

                                <div className="flex items-start gap-4">
                                    {/* Risk Icon */}
                                    <div className="w-12 h-12 bg-red-100 rounded-xl flex items-center justify-center text-2xl flex-shrink-0 mt-2">
                                        {risk.icon}
                                    </div>

                                    {/* Risk Content */}
                                    <div className="flex-1 min-w-0 mt-2">
                                        <h4 className="font-bold text-red-800 mb-3">
                                            {risk.title}
                                        </h4>
                                        <p className="text-red-600 text-sm leading-relaxed mb-4">
                                            {risk.description}
                                        </p>

                                        {/* Acknowledgment Checkbox */}
                                        <label className="flex items-start gap-3 cursor-pointer">
                                            <input
                                                type="checkbox"
                                                checked={
                                                    checkedRisks[risk.id] ||
                                                    false
                                                }
                                                onChange={(e) =>
                                                    handleRiskCheck(
                                                        risk.id,
                                                        e.target.checked
                                                    )
                                                }
                                                className="mt-1 w-5 h-5 rounded border-2 border-red-300 text-red-600 focus:ring-red-500 focus:ring-2"
                                            />
                                            <span
                                                className={`text-sm font-medium transition-colors duration-200 ${
                                                    checkedRisks[risk.id]
                                                        ? "text-red-800"
                                                        : "text-red-600"
                                                }`}
                                            >
                                                I understand and acknowledge
                                                this risk
                                            </span>
                                        </label>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>

                    {/* Overall Acknowledgment Status */}
                    <div
                        className={`mt-6 p-4 rounded-2xl transition-all duration-300 ${
                            lpData.riskAcknowledged
                                ? "bg-green-50 border border-green-200"
                                : "bg-red-50 border border-red-200"
                        }`}
                    >
                        <div className="flex items-center gap-3">
                            <div
                                className={`w-8 h-8 rounded-full flex items-center justify-center text-white font-bold ${
                                    lpData.riskAcknowledged
                                        ? "bg-green-500"
                                        : "bg-red-500"
                                }`}
                            >
                                {lpData.riskAcknowledged ? "✓" : "!"}
                            </div>
                            <div>
                                <p
                                    className={`font-semibold ${
                                        lpData.riskAcknowledged
                                            ? "text-green-800"
                                            : "text-red-800"
                                    }`}
                                >
                                    {lpData.riskAcknowledged
                                        ? "All risks acknowledged - Ready to proceed"
                                        : `Please acknowledge all risks (${
                                              Object.values(
                                                  checkedRisks
                                              ).filter(Boolean).length
                                          }/${riskItems.length} completed)`}
                                </p>
                                <p
                                    className={`text-sm ${
                                        lpData.riskAcknowledged
                                            ? "text-green-600"
                                            : "text-red-600"
                                    }`}
                                >
                                    {lpData.riskAcknowledged
                                        ? "You can now proceed to create your liquidity pool"
                                        : "Check all boxes above to continue"}
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Important Notes */}
            <div className="relative">
                <div className="absolute inset-0 bg-gradient-to-br from-amber-50 to-yellow-50 rounded-3xl"></div>

                <div className="relative backdrop-blur-sm bg-white/90 rounded-3xl p-8 border border-amber-200/60 shadow-level-2">
                    <div className="flex items-center gap-4 mb-6">
                        <div className="w-16 h-16 bg-gradient-to-br from-amber-500 to-yellow-500 rounded-2xl flex items-center justify-center text-3xl text-white shadow-level-2">
                            📝
                        </div>
                        <div>
                            <h3 className="text-h3 font-bold text-amber-800">
                                Important Notes
                            </h3>
                            <p className="text-amber-600">
                                Please keep these points in mind
                            </p>
                        </div>
                    </div>

                    <div className="grid md:grid-cols-2 gap-4">
                        {[
                            {
                                icon: "🔄",
                                title: "Reversible Actions",
                                note: "You can add more liquidity later, but the initial price ratio will be set permanently",
                            },
                            {
                                icon: "💰",
                                title: "Fee Earnings",
                                note: "You'll earn trading fees proportional to your share of the liquidity pool",
                            },
                            {
                                icon: "📊",
                                title: "Market Impact",
                                note: "Your initial liquidity will determine how much price impact early trades have",
                            },
                            {
                                icon: "⏰",
                                title: "Timing Matters",
                                note: "Consider market conditions when setting your initial price and amounts",
                            },
                        ].map((item, index) => (
                            <div
                                key={index}
                                className="flex items-start gap-3 p-4 bg-amber-50 rounded-xl"
                                style={{ animationDelay: `${index * 100}ms` }}
                            >
                                <div className="w-8 h-8 bg-amber-100 rounded-lg flex items-center justify-center text-lg flex-shrink-0 mt-0.5">
                                    {item.icon}
                                </div>
                                <div>
                                    <h4 className="font-bold text-amber-800 mb-1 text-sm">
                                        {item.title}
                                    </h4>
                                    <p className="text-amber-700 text-sm leading-relaxed">
                                        {item.note}
                                    </p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            {/* Final Confirmation */}
            {lpData.riskAcknowledged && (
                <div className="relative">
                    <div className="absolute inset-0 bg-gradient-to-r from-green-50 via-emerald-100/50 to-green-50 rounded-3xl blur-sm"></div>

                    <div className="relative backdrop-blur-md bg-white/95 rounded-3xl p-8 border border-white/50 shadow-level-3 animate-fade-in-up">
                        <div className="text-center">
                            <div className="w-20 h-20 bg-gradient-to-r from-green-500 to-emerald-500 rounded-full flex items-center justify-center text-4xl text-white mx-auto mb-6 shadow-level-3 animate-bounce-gentle">
                                🎯
                            </div>

                            <h3 className="text-h3 font-bold text-green-800 mb-4">
                                Ready to Create Liquidity Pool!
                            </h3>
                            <p className="text-green-600 max-w-2xl mx-auto leading-relaxed">
                                You have successfully configured your liquidity
                                pool and acknowledged all risks. Click "Create
                                Liquidity Pool" to proceed with the transaction.
                            </p>

                            <div className="mt-6 flex flex-wrap justify-center gap-4 text-sm">
                                {[
                                    `${lpData.tokenA.ticker}/${lpData.tokenB.ticker} Pair`,
                                    `${lpData.tokenA.amount} ${lpData.tokenA.ticker}`,
                                    `${lpData.tokenB.amount} ${lpData.tokenB.ticker}`,
                                    "All Risks Acknowledged",
                                ].map((item, index) => (
                                    <div
                                        key={index}
                                        className="bg-green-100 text-green-700 px-4 py-2 rounded-full font-medium"
                                        style={{
                                            animationDelay: `${index * 100}ms`,
                                        }}
                                    >
                                        ✓ {item}
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};
