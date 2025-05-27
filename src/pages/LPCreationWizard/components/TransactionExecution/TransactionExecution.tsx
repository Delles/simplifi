import React, { useState, useEffect } from "react";
import type { LPData } from "../Introduction";
import { InfoTooltip, CollapsibleCard } from "../shared";

interface TransactionExecutionProps {
    lpData: LPData;
    onExecute: () => void;
    isLoading: boolean;
}

export const TransactionExecution: React.FC<TransactionExecutionProps> = ({
    lpData,
    onExecute,
    isLoading,
}) => {
    const [isWalletConnected, setIsWalletConnected] = useState(false);
    const [transactionStep, setTransactionStep] = useState(0);
    const [estimatedGasFee] = useState("0.01");

    // Simulate wallet connection check
    useEffect(() => {
        const checkWalletConnection = () => {
            // Simulate wallet check - in real implementation, check actual wallet connection
            const connected = Math.random() > 0.2; // 80% chance of being connected for demo
            setIsWalletConnected(connected);
        };

        checkWalletConnection();
    }, []);

    // Transaction steps for progress tracking
    const transactionSteps = [
        {
            id: 1,
            title: "Preparing Transaction",
            description:
                "Validating pool parameters and preparing smart contract call",
            icon: "⚙️",
        },
        {
            id: 2,
            title: "Wallet Confirmation",
            description: "Please confirm the transaction in your wallet",
            icon: "🔐",
        },
        {
            id: 3,
            title: "Broadcasting",
            description: "Sending transaction to MultiversX network",
            icon: "📡",
        },
        {
            id: 4,
            title: "Processing",
            description: "Network is processing your liquidity pool creation",
            icon: "⏳",
        },
        {
            id: 5,
            title: "Finalizing",
            description: "Creating LP tokens and updating pool registry",
            icon: "✨",
        },
    ];

    // Simulate transaction progress
    useEffect(() => {
        if (isLoading) {
            let currentStep = 0;
            const interval = setInterval(() => {
                currentStep++;
                setTransactionStep(currentStep);
                if (currentStep >= transactionSteps.length) {
                    clearInterval(interval);
                }
            }, 800);

            return () => clearInterval(interval);
        } else {
            setTransactionStep(0);
        }
    }, [isLoading, transactionSteps.length]);

    const handleConnectWallet = () => {
        // Simulate wallet connection
        setIsWalletConnected(true);
    };

    if (!lpData.tokenA || !lpData.tokenB || !lpData.riskAcknowledged) {
        return (
            <div className="text-center space-y-6">
                <div className="w-20 h-20 bg-gradient-to-br from-distribute-primary to-distribute-secondary rounded-3xl flex items-center justify-center text-4xl text-white mx-auto shadow-level-3">
                    ⚠️
                </div>
                <h2 className="text-h2 font-bold text-graphite">
                    Please Complete Previous Steps
                </h2>
                <p className="text-slate max-w-md mx-auto">
                    You need to complete all previous steps and acknowledge
                    risks before executing the transaction.
                </p>
            </div>
        );
    }

    return (
        <div className="space-y-8">
            {/* Hero Section - Simplified */}
            <div className="text-center">
                <div className="w-16 h-16 bg-gradient-to-br from-theme-blue to-theme-blue-dark rounded-2xl flex items-center justify-center text-3xl text-white mx-auto mb-6 shadow-level-2">
                    🚀
                </div>

                <h2 className="text-h2 font-bold text-theme-blue mb-4">
                    Execute Transaction
                </h2>
                <div className="flex items-center justify-center gap-3 text-body-lg text-slate max-w-2xl mx-auto">
                    <span>
                        Sign the transaction to create your liquidity pool on
                        xExchange
                    </span>
                    <InfoTooltip
                        title="Transaction Execution"
                        content="This will create a smart contract transaction to establish your liquidity pool. Make sure your wallet is connected and you have enough EGLD for gas fees."
                        risk="caution"
                    />
                </div>
            </div>

            {/* Wallet Status */}
            <div
                className={`border rounded-xl p-4 ${
                    isWalletConnected
                        ? "bg-emerald-green/5 border-emerald-green/20"
                        : "bg-distribute-primary/5 border-distribute-primary/20"
                }`}
            >
                <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4">
                        <div
                            className={`w-12 h-12 rounded-xl flex items-center justify-center text-white font-bold shadow-level-1 ${
                                isWalletConnected
                                    ? "bg-gradient-to-r from-emerald-green to-emerald-600"
                                    : "bg-gradient-to-r from-distribute-primary to-distribute-secondary"
                            }`}
                        >
                            {isWalletConnected ? "🔐" : "⚠️"}
                        </div>
                        <div>
                            <h4
                                className={`font-bold ${
                                    isWalletConnected
                                        ? "text-emerald-green"
                                        : "text-distribute-primary"
                                }`}
                            >
                                {isWalletConnected
                                    ? "Wallet Connected"
                                    : "Wallet Required"}
                            </h4>
                            <p className="text-sm text-slate">
                                {isWalletConnected
                                    ? "Ready to sign transactions"
                                    : "Please connect your wallet to continue"}
                            </p>
                        </div>
                    </div>

                    {!isWalletConnected && (
                        <button
                            onClick={handleConnectWallet}
                            className="px-6 py-2 bg-gradient-to-r from-distribute-primary to-distribute-secondary text-white rounded-xl font-medium hover:opacity-90 transition-all duration-200 shadow-level-1"
                        >
                            Connect Wallet
                        </button>
                    )}
                </div>
            </div>

            {/* Pool Summary */}
            <CollapsibleCard
                title="Pool Summary"
                icon="📊"
                variant="primary"
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
                                            {lpData.tokenA.name}
                                        </p>
                                        <p className="text-sm text-slate">
                                            {lpData.tokenA.ticker}
                                        </p>
                                    </div>
                                </div>
                                <p className="text-sm text-slate">
                                    Amount:{" "}
                                    <span className="font-medium text-graphite">
                                        {lpData.tokenA.amount}{" "}
                                        {lpData.tokenA.ticker}
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
                                            {lpData.tokenB.name}
                                        </p>
                                        <p className="text-sm text-slate">
                                            {lpData.tokenB.ticker}
                                        </p>
                                    </div>
                                </div>
                                <p className="text-sm text-slate">
                                    Amount:{" "}
                                    <span className="font-medium text-graphite">
                                        {lpData.tokenB.amount}{" "}
                                        {lpData.tokenB.ticker}
                                    </span>
                                </p>
                            </div>
                        </div>
                    </div>

                    {/* Pool Details */}
                    <div className="grid md:grid-cols-3 gap-4 pt-4 border-t border-ash/20">
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
                            <p className="text-sm text-slate mb-1">LP Tokens</p>
                            <p className="font-semibold text-graphite">
                                {lpData.estimatedLPTokens}
                            </p>
                            <p className="text-xs text-slate">estimated</p>
                        </div>
                        <div className="text-center">
                            <p className="text-sm text-slate mb-1">Gas Fee</p>
                            <p className="font-semibold text-graphite">
                                {estimatedGasFee} EGLD
                            </p>
                            <p className="text-xs text-slate">estimated</p>
                        </div>
                    </div>
                </div>
            </CollapsibleCard>

            {/* Transaction Progress */}
            {isLoading && (
                <CollapsibleCard
                    title="Transaction Progress"
                    icon="⏳"
                    variant="warning"
                    defaultExpanded={true}
                >
                    <div className="space-y-4">
                        {transactionSteps.map((step, index) => {
                            const isActive = index + 1 === transactionStep;
                            const isCompleted = index + 1 < transactionStep;

                            return (
                                <div
                                    key={step.id}
                                    className={`flex items-center gap-4 p-3 rounded-lg transition-all duration-300 ${
                                        isActive
                                            ? "bg-distribute-primary/10 border border-distribute-primary/20"
                                            : isCompleted
                                            ? "bg-emerald-green/10 border border-emerald-green/20"
                                            : "bg-slate/5 border border-ash/20"
                                    }`}
                                >
                                    <div
                                        className={`w-10 h-10 rounded-lg flex items-center justify-center text-lg transition-all duration-300 ${
                                            isActive
                                                ? "bg-distribute-primary text-white animate-pulse"
                                                : isCompleted
                                                ? "bg-emerald-green text-white"
                                                : "bg-slate/20 text-slate"
                                        }`}
                                    >
                                        {isCompleted ? "✓" : step.icon}
                                    </div>
                                    <div className="flex-1">
                                        <h4
                                            className={`font-medium ${
                                                isActive
                                                    ? "text-distribute-primary"
                                                    : isCompleted
                                                    ? "text-emerald-green"
                                                    : "text-slate"
                                            }`}
                                        >
                                            {step.title}
                                        </h4>
                                        <p className="text-sm text-slate">
                                            {step.description}
                                        </p>
                                    </div>
                                    {isActive && (
                                        <div className="w-6 h-6">
                                            <div className="animate-spin rounded-full h-6 w-6 border-2 border-distribute-primary border-t-transparent"></div>
                                        </div>
                                    )}
                                </div>
                            );
                        })}
                    </div>
                </CollapsibleCard>
            )}

            {/* Transaction Details */}
            <CollapsibleCard
                title="Transaction Details"
                icon="📋"
                variant="secondary"
                defaultExpanded={false}
            >
                <div className="space-y-4">
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
                                    Contract:
                                </span>
                                <span className="font-mono text-xs text-slate">
                                    xExchange Router
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
                        <div className="space-y-3">
                            <div className="flex justify-between">
                                <span className="text-slate text-sm">
                                    Gas Limit:
                                </span>
                                <span className="font-medium text-graphite text-sm">
                                    60,000,000
                                </span>
                            </div>
                            <div className="flex justify-between">
                                <span className="text-slate text-sm">
                                    Gas Price:
                                </span>
                                <span className="font-medium text-graphite text-sm">
                                    1,000 wei
                                </span>
                            </div>
                            <div className="flex justify-between">
                                <span className="text-slate text-sm">
                                    Estimated Fee:
                                </span>
                                <span className="font-medium text-graphite text-sm">
                                    {estimatedGasFee} EGLD
                                </span>
                            </div>
                        </div>
                    </div>
                </div>
            </CollapsibleCard>

            {/* Important Notes */}
            <CollapsibleCard
                title="Important Notes"
                icon="⚠️"
                variant="warning"
                defaultExpanded={false}
            >
                <div className="space-y-3">
                    {[
                        {
                            icon: "🔒",
                            title: "Irreversible Action",
                            desc: "Once created, the liquidity pool cannot be undone. Make sure all parameters are correct.",
                        },
                        {
                            icon: "💰",
                            title: "Token Lock",
                            desc: "Your tokens will be locked in the smart contract until you remove liquidity.",
                        },
                        {
                            icon: "⏱️",
                            title: "Processing Time",
                            desc: "Transaction may take 1-2 minutes to complete depending on network congestion.",
                        },
                        {
                            icon: "🔄",
                            title: "Failed Transactions",
                            desc: "If the transaction fails, gas fees are still consumed but no pool is created.",
                        },
                    ].map((note, index) => (
                        <div
                            key={index}
                            className="flex items-start gap-3 p-3 bg-distribute-primary/5 rounded-lg"
                        >
                            <div className="w-8 h-8 bg-distribute-primary/10 rounded-lg flex items-center justify-center text-lg flex-shrink-0">
                                {note.icon}
                            </div>
                            <div>
                                <p className="font-semibold text-distribute-primary text-sm mb-1">
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

            {/* Execute Button */}
            {!isLoading && (
                <div className="text-center">
                    <button
                        onClick={onExecute}
                        disabled={!isWalletConnected}
                        className="px-8 py-4 bg-gradient-to-r from-theme-blue to-theme-blue-dark text-white rounded-xl font-semibold text-lg hover:opacity-90 disabled:bg-ash disabled:cursor-not-allowed transition-all duration-200 shadow-level-2 hover:shadow-level-3"
                    >
                        {isWalletConnected
                            ? "Create Liquidity Pool"
                            : "Connect Wallet First"}
                    </button>
                    <p className="text-sm text-slate mt-3">
                        By clicking this button, you confirm that you understand
                        the risks and agree to create the liquidity pool.
                    </p>
                </div>
            )}
        </div>
    );
};
