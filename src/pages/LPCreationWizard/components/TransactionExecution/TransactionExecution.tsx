import React, { useState, useEffect } from "react";
import type { LPData } from "../Introduction";
import { InfoTooltip } from "../shared";

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
                <div className="w-20 h-20 bg-gradient-to-br from-amber-500 to-orange-500 rounded-3xl flex items-center justify-center text-4xl text-white mx-auto shadow-level-3">
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
            {/* Hero Section */}
            <div className="text-center">
                <div className="relative mb-6">
                    {/* Animated Background Glow */}
                    <div className="absolute inset-0 w-20 h-20 mx-auto bg-gradient-to-br from-distribute-400/30 to-amber-400/30 rounded-full blur-lg animate-pulse-gentle"></div>

                    {/* Main Icon */}
                    <div className="relative w-20 h-20 bg-gradient-to-br from-distribute-500 to-amber-500 rounded-3xl flex items-center justify-center text-4xl text-white mx-auto shadow-level-3 animate-bounce-gentle">
                        🚀
                    </div>

                    {/* Floating Particles */}
                    <div className="absolute -top-1 -right-1 w-2 h-2 bg-distribute-400 rounded-full animate-bounce opacity-60"></div>
                    <div className="absolute -bottom-1 -left-1 w-1.5 h-1.5 bg-amber-400 rounded-full animate-pulse opacity-40"></div>
                </div>

                <h2 className="text-h2 font-bold text-graphite mb-4 tracking-tight">
                    Execute{" "}
                    <span className="text-distribute-600 font-extrabold">
                        Transaction
                    </span>
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
            <div className="relative">
                <div
                    className={`absolute inset-0 rounded-3xl ${
                        isWalletConnected
                            ? "bg-gradient-to-r from-green-50 to-emerald-50"
                            : "bg-gradient-to-r from-amber-50 to-yellow-50"
                    }`}
                ></div>

                <div className="relative backdrop-blur-sm bg-white/90 rounded-3xl p-6 border border-gray-200/60 shadow-level-2">
                    <div className="flex items-center justify-between">
                        <div className="flex items-center gap-4">
                            <div
                                className={`w-12 h-12 rounded-2xl flex items-center justify-center text-white font-bold shadow-level-2 ${
                                    isWalletConnected
                                        ? "bg-gradient-to-r from-green-500 to-emerald-600"
                                        : "bg-gradient-to-r from-amber-500 to-yellow-600"
                                }`}
                            >
                                {isWalletConnected ? "🔐" : "⚠️"}
                            </div>
                            <div>
                                <h4
                                    className={`font-bold ${
                                        isWalletConnected
                                            ? "text-green-800"
                                            : "text-amber-800"
                                    }`}
                                >
                                    {isWalletConnected
                                        ? "Wallet Connected"
                                        : "Wallet Required"}
                                </h4>
                                <p
                                    className={`text-sm ${
                                        isWalletConnected
                                            ? "text-green-600"
                                            : "text-amber-600"
                                    }`}
                                >
                                    {isWalletConnected
                                        ? "Ready to sign transactions"
                                        : "Please connect your wallet to continue"}
                                </p>
                            </div>
                        </div>

                        {!isWalletConnected && (
                            <button
                                onClick={handleConnectWallet}
                                className="px-6 py-2 bg-gradient-to-r from-amber-500 to-yellow-500 text-white rounded-xl font-medium hover:from-amber-600 hover:to-yellow-600 transition-all duration-200 shadow-level-2"
                            >
                                Connect Wallet
                            </button>
                        )}
                    </div>
                </div>
            </div>

            {/* Transaction Summary */}
            <div className="relative">
                <div className="absolute inset-0 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-3xl"></div>

                <div className="relative backdrop-blur-sm bg-white/90 rounded-3xl p-8 border border-blue-200/60 shadow-level-2">
                    <div className="flex items-center gap-4 mb-6">
                        <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-indigo-600 rounded-2xl flex items-center justify-center text-3xl text-white shadow-level-2">
                            📋
                        </div>
                        <div>
                            <h3 className="text-h3 font-bold text-blue-800">
                                Transaction Summary
                            </h3>
                            <p className="text-blue-600">
                                Review what will be executed
                            </p>
                        </div>
                    </div>

                    <div className="grid gap-6 lg:grid-cols-2">
                        {/* Pool Details */}
                        <div className="space-y-4">
                            <h4 className="font-bold text-blue-800 mb-3">
                                Pool Details
                            </h4>

                            <div className="bg-blue-50 rounded-xl p-4 space-y-3">
                                <div className="flex justify-between">
                                    <span className="text-blue-600">
                                        Pool Pair:
                                    </span>
                                    <span className="font-semibold text-blue-800">
                                        {lpData.tokenA.ticker}/
                                        {lpData.tokenB.ticker}
                                    </span>
                                </div>
                                <div className="flex justify-between">
                                    <span className="text-blue-600">
                                        Initial Price:
                                    </span>
                                    <span className="font-semibold text-blue-800">
                                        1 {lpData.tokenA.ticker} ={" "}
                                        {lpData.initialPrice}{" "}
                                        {lpData.tokenB.ticker}
                                    </span>
                                </div>
                                <div className="flex justify-between">
                                    <span className="text-blue-600">
                                        LP Tokens:
                                    </span>
                                    <span className="font-semibold text-blue-800">
                                        {lpData.estimatedLPTokens}
                                    </span>
                                </div>
                            </div>
                        </div>

                        {/* Token Amounts */}
                        <div className="space-y-4">
                            <h4 className="font-bold text-blue-800 mb-3">
                                Token Amounts
                            </h4>

                            <div className="space-y-3">
                                <div className="bg-blue-50 rounded-xl p-4">
                                    <div className="flex items-center gap-3 mb-2">
                                        <div className="w-8 h-8 bg-blue-500 rounded-lg flex items-center justify-center text-white font-bold text-sm">
                                            A
                                        </div>
                                        <span className="font-semibold text-blue-800">
                                            {lpData.tokenA.ticker}
                                        </span>
                                    </div>
                                    <p className="text-xl font-bold text-blue-800">
                                        {lpData.tokenA.amount}
                                    </p>
                                </div>

                                <div className="bg-green-50 rounded-xl p-4">
                                    <div className="flex items-center gap-3 mb-2">
                                        <div className="w-8 h-8 bg-green-500 rounded-lg flex items-center justify-center text-white font-bold text-sm">
                                            B
                                        </div>
                                        <span className="font-semibold text-green-800">
                                            {lpData.tokenB.ticker}
                                        </span>
                                    </div>
                                    <p className="text-xl font-bold text-green-800">
                                        {lpData.tokenB.amount}
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Transaction Costs */}
                    <div className="mt-6 bg-purple-50 rounded-xl p-4">
                        <h4 className="font-bold text-purple-800 mb-3">
                            Estimated Transaction Costs
                        </h4>
                        <div className="grid gap-4 md:grid-cols-2">
                            <div className="flex justify-between">
                                <span className="text-purple-600">
                                    Gas Fee:
                                </span>
                                <span className="font-semibold text-purple-800">
                                    ~{estimatedGasFee} EGLD
                                </span>
                            </div>
                            <div className="flex justify-between">
                                <span className="text-purple-600">
                                    Pool Creation:
                                </span>
                                <span className="font-semibold text-purple-800">
                                    Free
                                </span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Transaction Progress */}
            {isLoading && (
                <div className="relative">
                    <div className="absolute inset-0 bg-gradient-to-br from-distribute-50 to-amber-50 rounded-3xl animate-pulse-gentle opacity-50"></div>

                    <div className="relative backdrop-blur-md bg-white/95 rounded-3xl p-8 border border-distribute-200/60 shadow-level-3">
                        <div className="text-center mb-8">
                            <div className="w-20 h-20 bg-gradient-to-r from-distribute-500 to-amber-500 rounded-full flex items-center justify-center text-4xl text-white mx-auto mb-4 shadow-level-3 animate-spin-slow">
                                ⚡
                            </div>
                            <h3 className="text-h3 font-bold text-distribute-800 mb-2">
                                Creating Liquidity Pool
                            </h3>
                            <p className="text-distribute-600">
                                Please wait while your transaction is being
                                processed...
                            </p>
                        </div>

                        {/* Progress Steps */}
                        <div className="space-y-4">
                            {transactionSteps.map((step, index) => {
                                const isActive = index + 1 === transactionStep;
                                const isCompleted = index + 1 < transactionStep;

                                return (
                                    <div
                                        key={step.id}
                                        className={`flex items-center gap-4 p-4 rounded-xl transition-all duration-500 ${
                                            isActive
                                                ? "bg-distribute-100 border border-distribute-300"
                                                : isCompleted
                                                ? "bg-green-50 border border-green-200"
                                                : "bg-slate-50 border border-slate-200"
                                        }`}
                                        style={{
                                            animationDelay: `${index * 200}ms`,
                                        }}
                                    >
                                        <div
                                            className={`w-12 h-12 rounded-xl flex items-center justify-center text-2xl font-bold transition-all duration-300 ${
                                                isActive
                                                    ? "bg-distribute-500 text-white animate-pulse"
                                                    : isCompleted
                                                    ? "bg-green-500 text-white"
                                                    : "bg-slate-300 text-slate-600"
                                            }`}
                                        >
                                            {isCompleted ? "✓" : step.icon}
                                        </div>

                                        <div className="flex-1">
                                            <h4
                                                className={`font-bold mb-1 ${
                                                    isActive
                                                        ? "text-distribute-800"
                                                        : isCompleted
                                                        ? "text-green-800"
                                                        : "text-slate-600"
                                                }`}
                                            >
                                                {step.title}
                                            </h4>
                                            <p
                                                className={`text-sm ${
                                                    isActive
                                                        ? "text-distribute-600"
                                                        : isCompleted
                                                        ? "text-green-600"
                                                        : "text-slate-500"
                                                }`}
                                            >
                                                {step.description}
                                            </p>
                                        </div>

                                        {isActive && (
                                            <div className="w-6 h-6 border-2 border-distribute-300 border-t-distribute-600 rounded-full animate-spin"></div>
                                        )}
                                    </div>
                                );
                            })}
                        </div>
                    </div>
                </div>
            )}

            {/* Execute Button Section */}
            {!isLoading && (
                <div className="relative">
                    <div className="absolute inset-0 bg-gradient-to-r from-green-50 via-emerald-100/50 to-green-50 rounded-3xl blur-sm"></div>

                    <div className="relative backdrop-blur-md bg-white/95 rounded-3xl p-8 border border-white/50 shadow-level-3">
                        <div className="text-center">
                            <div className="w-20 h-20 bg-gradient-to-r from-green-500 to-emerald-500 rounded-full flex items-center justify-center text-4xl text-white mx-auto mb-6 shadow-level-3 animate-bounce-gentle">
                                🎯
                            </div>

                            <h3 className="text-h3 font-bold text-green-800 mb-4">
                                Ready to Execute Transaction
                            </h3>
                            <p className="text-green-600 max-w-2xl mx-auto leading-relaxed mb-8">
                                Everything is configured and ready. Click the
                                button below to execute the transaction and
                                create your liquidity pool.
                            </p>

                            <button
                                onClick={onExecute}
                                disabled={!isWalletConnected}
                                className={`px-12 py-4 rounded-2xl font-bold text-lg transition-all duration-300 shadow-level-3 hover:shadow-level-4 transform hover:scale-105 ${
                                    isWalletConnected
                                        ? "bg-gradient-to-r from-green-500 to-emerald-500 text-white hover:from-green-600 hover:to-emerald-600"
                                        : "bg-slate-300 text-slate-500 cursor-not-allowed"
                                }`}
                            >
                                {isWalletConnected
                                    ? "🚀 Execute Transaction"
                                    : "🔐 Connect Wallet First"}
                            </button>

                            {isWalletConnected && (
                                <p className="text-sm text-green-600 mt-4">
                                    Your wallet will prompt you to confirm the
                                    transaction
                                </p>
                            )}
                        </div>
                    </div>
                </div>
            )}

            {/* Important Notes */}
            <div className="relative">
                <div className="absolute inset-0 bg-gradient-to-br from-amber-50 to-yellow-50 rounded-3xl"></div>

                <div className="relative backdrop-blur-sm bg-white/90 rounded-3xl p-8 border border-amber-200/60 shadow-level-2">
                    <div className="flex items-center gap-4 mb-6">
                        <div className="w-16 h-16 bg-gradient-to-br from-amber-500 to-yellow-500 rounded-2xl flex items-center justify-center text-3xl text-white shadow-level-2">
                            💡
                        </div>
                        <div>
                            <h3 className="text-h3 font-bold text-amber-800">
                                Before You Execute
                            </h3>
                            <p className="text-amber-600">
                                Important reminders
                            </p>
                        </div>
                    </div>

                    <div className="grid md:grid-cols-2 gap-4">
                        {[
                            {
                                icon: "🔐",
                                title: "Wallet Security",
                                note: "Only sign transactions from trusted sources. This transaction creates a liquidity pool on xExchange.",
                            },
                            {
                                icon: "💰",
                                title: "Gas Fees",
                                note: "You'll pay network gas fees (~0.01 EGLD). The transaction will fail if you don't have enough EGLD.",
                            },
                            {
                                icon: "⏰",
                                title: "Processing Time",
                                note: "Transaction typically takes 10-30 seconds to complete. Don't close this page while processing.",
                            },
                            {
                                icon: "🔄",
                                title: "Cannot Undo",
                                note: "Once executed, the liquidity pool is created permanently. You can remove liquidity later but cannot delete the pool.",
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
        </div>
    );
};
