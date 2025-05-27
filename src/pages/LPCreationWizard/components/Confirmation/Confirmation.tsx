import React from "react";
import { useNavigate } from "react-router-dom";
import type { LPData } from "../Introduction";
import { CollapsibleCard } from "../shared";

interface ConfirmationProps {
    lpData: LPData;
    transactionHash?: string;
    onFinish: () => void;
}

export const Confirmation: React.FC<ConfirmationProps> = ({
    lpData,
    transactionHash,
    onFinish,
}) => {
    const navigate = useNavigate();
    const explorerUrl = `https://explorer.multiversx.com/transactions/${transactionHash}`;

    const handleFinish = () => {
        onFinish();
        navigate("/app");
    };

    return (
        <div className="space-y-8">
            {/* Success Hero Section */}
            <div className="text-center">
                <div className="relative mb-6">
                    <div className="w-20 h-20 bg-gradient-to-br from-emerald-green to-emerald-600 rounded-2xl flex items-center justify-center text-4xl text-white mx-auto shadow-level-2 animate-bounce">
                        🎉
                    </div>
                    <div className="absolute inset-0 w-20 h-20 mx-auto bg-emerald-green/20 rounded-2xl animate-ping"></div>
                </div>

                <h2 className="text-h2 font-bold text-emerald-green mb-4">
                    Pool Created Successfully!
                </h2>
                <p className="text-body-lg text-slate max-w-2xl mx-auto">
                    Your liquidity pool is now live on xExchange. Users can
                    start trading your token!
                </p>
            </div>

            {/* Pool Summary */}
            <CollapsibleCard
                title="Your Liquidity Pool"
                icon="🏊‍♂️"
                variant="success"
                defaultExpanded={true}
            >
                <div className="space-y-4">
                    <div className="grid md:grid-cols-2 gap-6">
                        {/* Token A */}
                        <div className="space-y-3">
                            <h4 className="font-semibold text-theme-blue">
                                Token A
                            </h4>
                            <div className="bg-theme-blue/5 rounded-lg p-3">
                                <div className="flex items-center gap-3 mb-2">
                                    <div className="w-8 h-8 bg-gradient-to-br from-theme-blue to-theme-blue-dark rounded-lg flex items-center justify-center text-white font-bold text-sm">
                                        A
                                    </div>
                                    <div>
                                        <p className="font-medium text-graphite">
                                            {lpData.tokenA?.name}
                                        </p>
                                        <p className="text-sm text-slate">
                                            {lpData.tokenA?.ticker}
                                        </p>
                                    </div>
                                </div>
                                <p className="text-sm text-slate">
                                    Amount:{" "}
                                    <span className="font-medium text-graphite">
                                        {lpData.tokenA?.amount || "0"}{" "}
                                        {lpData.tokenA?.ticker}
                                    </span>
                                </p>
                            </div>
                        </div>

                        {/* Token B */}
                        <div className="space-y-3">
                            <h4 className="font-semibold text-emerald-green">
                                Token B
                            </h4>
                            <div className="bg-emerald-green/5 rounded-lg p-3">
                                <div className="flex items-center gap-3 mb-2">
                                    <div className="w-8 h-8 bg-gradient-to-br from-emerald-green to-emerald-600 rounded-lg flex items-center justify-center text-white font-bold text-sm">
                                        B
                                    </div>
                                    <div>
                                        <p className="font-medium text-graphite">
                                            {lpData.tokenB?.name}
                                        </p>
                                        <p className="text-sm text-slate">
                                            {lpData.tokenB?.ticker}
                                        </p>
                                    </div>
                                </div>
                                <p className="text-sm text-slate">
                                    Amount:{" "}
                                    <span className="font-medium text-graphite">
                                        {lpData.tokenB?.amount || "0"}{" "}
                                        {lpData.tokenB?.ticker}
                                    </span>
                                </p>
                            </div>
                        </div>
                    </div>

                    {/* Pool Stats */}
                    <div className="grid md:grid-cols-3 gap-4 pt-4 border-t border-ash/20">
                        <div className="text-center">
                            <p className="text-sm text-slate mb-1">
                                Token Pair
                            </p>
                            <p className="font-semibold text-graphite">
                                {lpData.tokenA?.ticker} /{" "}
                                {lpData.tokenB?.ticker}
                            </p>
                        </div>
                        <div className="text-center">
                            <p className="text-sm text-slate mb-1">
                                Initial Price
                            </p>
                            <p className="font-semibold text-graphite">
                                {lpData.initialPrice} {lpData.tokenB?.ticker}
                            </p>
                            <p className="text-xs text-slate">
                                per {lpData.tokenA?.ticker}
                            </p>
                        </div>
                        <div className="text-center">
                            <p className="text-sm text-slate mb-1">
                                LP Tokens Received
                            </p>
                            <p className="font-semibold text-emerald-green">
                                {lpData.estimatedLPTokens}
                            </p>
                        </div>
                    </div>
                </div>
            </CollapsibleCard>

            {/* Transaction Details */}
            {transactionHash && (
                <CollapsibleCard
                    title="Transaction Details"
                    icon="📋"
                    variant="primary"
                    defaultExpanded={false}
                >
                    <div className="space-y-4">
                        <div className="bg-theme-blue/5 rounded-lg p-4">
                            <h4 className="font-semibold text-theme-blue mb-3">
                                Transaction Hash
                            </h4>
                            <div className="flex items-center gap-3 p-3 bg-white rounded-lg border border-theme-blue/20">
                                <code className="text-xs text-slate font-mono flex-1 overflow-hidden break-all">
                                    {transactionHash}
                                </code>
                                <a
                                    href={explorerUrl}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="px-3 py-1 bg-theme-blue text-white text-xs rounded-md hover:bg-theme-blue-dark transition-colors whitespace-nowrap"
                                >
                                    View ↗
                                </a>
                            </div>
                        </div>

                        <div className="grid md:grid-cols-2 gap-4">
                            <div className="space-y-3">
                                <div className="flex justify-between">
                                    <span className="text-slate text-sm">
                                        Network:
                                    </span>
                                    <span className="font-medium text-graphite text-sm">
                                        MultiversX Mainnet
                                    </span>
                                </div>
                                <div className="flex justify-between">
                                    <span className="text-slate text-sm">
                                        Status:
                                    </span>
                                    <span className="font-medium text-emerald-green text-sm">
                                        ✓ Confirmed
                                    </span>
                                </div>
                            </div>
                            <div className="space-y-3">
                                <div className="flex justify-between">
                                    <span className="text-slate text-sm">
                                        Block:
                                    </span>
                                    <span className="font-medium text-graphite text-sm">
                                        Latest
                                    </span>
                                </div>
                                <div className="flex justify-between">
                                    <span className="text-slate text-sm">
                                        Function:
                                    </span>
                                    <span className="font-medium text-graphite text-sm">
                                        createPair
                                    </span>
                                </div>
                            </div>
                        </div>
                    </div>
                </CollapsibleCard>
            )}

            {/* What's Next */}
            <CollapsibleCard
                title="What's Next?"
                icon="🚀"
                variant="secondary"
                defaultExpanded={true}
            >
                <div className="space-y-4">
                    <p className="text-slate mb-4">
                        Your liquidity pool is now active! Here's what you can
                        do next:
                    </p>

                    <div className="grid md:grid-cols-2 gap-4">
                        {[
                            {
                                icon: "💰",
                                title: "Earn Trading Fees",
                                desc: "Automatically earn fees from every trade in your pool",
                            },
                            {
                                icon: "📊",
                                title: "Monitor Performance",
                                desc: "Track your LP position and accumulated rewards",
                            },
                            {
                                icon: "🔄",
                                title: "Add More Liquidity",
                                desc: "Increase your position to earn more fees and reduce slippage",
                            },
                            {
                                icon: "🎯",
                                title: "Manage Position",
                                desc: "Remove liquidity or adjust your position as needed",
                            },
                        ].map((item, index) => (
                            <div
                                key={index}
                                className="flex items-start gap-3 p-3 bg-slate/5 rounded-lg"
                            >
                                <div className="w-8 h-8 bg-theme-blue/10 rounded-lg flex items-center justify-center text-lg flex-shrink-0">
                                    {item.icon}
                                </div>
                                <div>
                                    <p className="font-semibold text-graphite text-sm mb-1">
                                        {item.title}
                                    </p>
                                    <p className="text-slate text-sm leading-relaxed">
                                        {item.desc}
                                    </p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </CollapsibleCard>

            {/* Important Reminders */}
            <CollapsibleCard
                title="Important Reminders"
                icon="💡"
                variant="warning"
                defaultExpanded={false}
            >
                <div className="space-y-3">
                    {[
                        {
                            icon: "🔒",
                            title: "Keep Your LP Tokens Safe",
                            desc: "Your LP tokens represent ownership in the pool and are required to withdraw liquidity.",
                        },
                        {
                            icon: "📈",
                            title: "Monitor Impermanent Loss",
                            desc: "Track price changes between your tokens to understand potential impermanent loss.",
                        },
                        {
                            icon: "⚖️",
                            title: "Understand the Risks",
                            desc: "Liquidity provision involves risks including impermanent loss and smart contract risks.",
                        },
                    ].map((reminder, index) => (
                        <div
                            key={index}
                            className="flex items-start gap-3 p-3 bg-distribute-primary/5 rounded-lg"
                        >
                            <div className="w-8 h-8 bg-distribute-primary/10 rounded-lg flex items-center justify-center text-lg flex-shrink-0">
                                {reminder.icon}
                            </div>
                            <div>
                                <p className="font-semibold text-distribute-primary text-sm mb-1">
                                    {reminder.title}
                                </p>
                                <p className="text-slate text-sm leading-relaxed">
                                    {reminder.desc}
                                </p>
                            </div>
                        </div>
                    ))}
                </div>
            </CollapsibleCard>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <a
                    href="https://xexchange.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-8 py-3 bg-gradient-to-r from-theme-blue to-theme-blue-dark text-white rounded-xl font-semibold hover:opacity-90 transition-all duration-200 shadow-level-2 hover:shadow-level-3 text-center"
                >
                    View Pool on xExchange
                </a>
                <button
                    onClick={handleFinish}
                    className="px-8 py-3 border border-theme-blue text-theme-blue rounded-xl font-semibold hover:bg-theme-blue/5 transition-all duration-200"
                >
                    Back to Dashboard
                </button>
            </div>

            {/* Success Footer */}
            <div className="text-center p-6 bg-emerald-green/5 rounded-xl border border-emerald-green/20">
                <div className="flex items-center justify-center gap-3 mb-3">
                    <div className="w-8 h-8 bg-emerald-green rounded-lg flex items-center justify-center text-white text-sm">
                        ✓
                    </div>
                    <h3 className="font-semibold text-emerald-green">
                        Congratulations!
                    </h3>
                </div>
                <p className="text-slate text-sm">
                    You've successfully created your first liquidity pool. Your
                    token is now part of the DeFi ecosystem!
                </p>
            </div>
        </div>
    );
};
