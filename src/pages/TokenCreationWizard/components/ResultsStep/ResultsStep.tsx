import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import type { TokenData } from "../BasicInformation/BasicInformation";

interface ResultsStepProps {
    tokenData: TokenData;
    isSuccess: boolean;
    transactionHash?: string;
    errorMessage?: string;
    onRetry?: () => void;
}

export const ResultsStep: React.FC<ResultsStepProps> = ({
    tokenData,
    isSuccess,
    transactionHash,
    errorMessage,
    onRetry,
}) => {
    const navigate = useNavigate();
    const [showConfetti, setShowConfetti] = useState(false);
    const [achievementUnlocked, setAchievementUnlocked] = useState(false);

    useEffect(() => {
        if (isSuccess) {
            // Trigger confetti and achievement after a short delay for dramatic effect
            setTimeout(() => setShowConfetti(true), 500);
            setTimeout(() => setAchievementUnlocked(true), 1000);
        }
    }, [isSuccess]);

    const handleShareSuccess = () => {
        const shareText = `🎉 I just created my own token "${tokenData.name}" (${tokenData.ticker}) on MultiversX! 🚀 #MultiversX #TokenCreation #Crypto`;

        if (navigator.share) {
            navigator
                .share({
                    title: "I created my own token!",
                    text: shareText,
                    url: window.location.origin,
                })
                .catch(console.error);
        } else {
            // Fallback: copy to clipboard
            navigator.clipboard
                .writeText(shareText)
                .then(() => {
                    alert("Share text copied to clipboard!");
                })
                .catch(() => {
                    console.log("Could not copy to clipboard");
                });
        }
    };

    if (!isSuccess) {
        return (
            <div className="text-center space-y-8 max-w-2xl mx-auto">
                {/* Failure Animation */}
                <div className="relative">
                    <div className="w-20 h-20 bg-gradient-to-br from-red-500 to-red-600 rounded-2xl flex items-center justify-center text-4xl text-white mx-auto shadow-level-3 animate-pulse">
                        😞
                    </div>
                    <div className="absolute inset-0 rounded-2xl border-4 border-red-300 animate-ping opacity-50"></div>
                </div>

                <div>
                    <h2 className="text-3xl font-bold text-graphite mb-3">
                        Oops! Something Went Wrong
                    </h2>
                    <p className="text-slate text-lg mb-4">
                        Don't worry - this happens sometimes with blockchain
                        transactions. Let's try again!
                    </p>
                </div>

                {/* Error Details */}
                <div className="bg-red-50 border border-red-200 rounded-xl p-6 text-left">
                    <h3 className="font-semibold text-red-800 mb-2 flex items-center gap-2">
                        <span>🔍</span> What happened?
                    </h3>
                    <p className="text-red-700 text-sm mb-4">
                        {errorMessage ||
                            "The transaction failed to complete. This could be due to network congestion, insufficient EGLD balance, or a temporary network issue."}
                    </p>

                    <div className="bg-red-100 rounded-lg p-4">
                        <h4 className="font-medium text-red-800 mb-2">
                            Common solutions:
                        </h4>
                        <ul className="text-sm text-red-700 space-y-1">
                            <li>
                                • Check your EGLD balance (need at least 0.05
                                EGLD)
                            </li>
                            <li>• Ensure your wallet is connected</li>
                            <li>• Try again in a few minutes</li>
                            <li>• Check MultiversX network status</li>
                        </ul>
                    </div>
                </div>

                {/* Action Buttons */}
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                    <button
                        onClick={onRetry}
                        className="px-8 py-3 bg-gradient-to-r from-create-500 to-create-600 text-white rounded-xl font-medium
                            hover:from-create-600 hover:to-create-700 shadow-interactive hover:shadow-interactive-hover 
                            transform hover:scale-105 transition-all duration-200 flex items-center justify-center gap-2"
                    >
                        <span>🔄</span>
                        Try Again
                    </button>

                    <button
                        onClick={() => navigate("/app")}
                        className="px-8 py-3 border border-gray-300 text-gray-700 rounded-xl font-medium
                            hover:bg-gray-50 hover:border-gray-400 transition-all duration-200 flex items-center justify-center gap-2"
                    >
                        <span>🏠</span>
                        Back to Dashboard
                    </button>
                </div>

                {/* Learning Opportunity */}
                <div className="bg-blue-50 border border-blue-200 rounded-xl p-6 text-left">
                    <h3 className="font-semibold text-blue-800 mb-2 flex items-center gap-2">
                        <span>💡</span> Learning Moment
                    </h3>
                    <p className="text-blue-700 text-sm">
                        Blockchain transactions can sometimes fail, and that's
                        completely normal! Even experienced developers encounter
                        this. The important thing is that your wallet and funds
                        are completely safe. No EGLD was charged for the failed
                        transaction.
                    </p>
                </div>
            </div>
        );
    }

    return (
        <div className="text-center space-y-8 max-w-2xl mx-auto relative">
            {/* Confetti Effect */}
            {showConfetti && (
                <div className="absolute inset-0 pointer-events-none overflow-hidden">
                    {[...Array(20)].map((_, i) => (
                        <div
                            key={i}
                            className={`absolute w-3 h-3 ${
                                [
                                    "bg-create-500",
                                    "bg-yellow-400",
                                    "bg-green-500",
                                    "bg-purple-500",
                                    "bg-pink-500",
                                ][i % 5]
                            } rounded-full animate-bounce`}
                            style={{
                                left: `${Math.random() * 100}%`,
                                top: `${Math.random() * 100}%`,
                                animationDelay: `${Math.random() * 2}s`,
                                animationDuration: `${1 + Math.random()}s`,
                            }}
                        />
                    ))}
                </div>
            )}

            {/* Success Animation */}
            <div className="relative">
                <div className="w-24 h-24 bg-gradient-to-br from-green-500 to-green-600 rounded-full flex items-center justify-center text-5xl text-white mx-auto shadow-level-3 animate-bounce-gentle">
                    🎉
                </div>
                <div className="absolute inset-0 rounded-full border-4 border-green-300 animate-ping opacity-75"></div>
                {achievementUnlocked && (
                    <div className="absolute -top-4 -right-4 bg-yellow-400 text-yellow-900 text-xs font-bold px-3 py-1 rounded-full animate-pulse">
                        ✨ ACHIEVEMENT!
                    </div>
                )}
            </div>

            {/* Success Message */}
            <div>
                <h2 className="text-4xl font-bold text-graphite mb-3">
                    🎊 Congratulations! 🎊
                </h2>
                <p className="text-lg text-slate mb-2">
                    You've successfully created your first token on MultiversX!
                </p>
                <p className="text-create-600 font-semibold text-xl">
                    Welcome to the world of token creation! 🚀
                </p>
            </div>

            {/* Achievement Badge */}
            {achievementUnlocked && (
                <div className="bg-gradient-to-r from-yellow-50 to-orange-50 border-2 border-yellow-300 rounded-xl p-6 animate-fade-in-scale-up">
                    <div className="flex items-center justify-center gap-3 mb-3">
                        <span className="text-3xl">🏆</span>
                        <div>
                            <h3 className="font-bold text-yellow-800 text-lg">
                                Achievement Unlocked!
                            </h3>
                            <p className="text-yellow-700 text-sm">
                                Token Creator
                            </p>
                        </div>
                    </div>
                    <p className="text-yellow-700 text-sm">
                        You've joined an exclusive group of innovators who have
                        created their own digital assets. This is just the
                        beginning!
                    </p>
                </div>
            )}

            {/* Token Details Card */}
            <div className="bg-white/95 backdrop-blur-sm border border-ash rounded-2xl p-8 shadow-level-3">
                <h3 className="text-xl font-bold text-graphite mb-6 flex items-center justify-center gap-2">
                    <span className="text-2xl">🎫</span>
                    Your New Token
                </h3>

                <div className="space-y-4">
                    <div className="flex justify-between items-center p-4 bg-create-50 rounded-xl">
                        <span className="font-medium text-slate">
                            Token Name
                        </span>
                        <span className="text-graphite font-bold text-lg">
                            {tokenData.name}
                        </span>
                    </div>

                    <div className="flex justify-between items-center p-4 bg-blue-50 rounded-xl">
                        <span className="font-medium text-slate">
                            Ticker Symbol
                        </span>
                        <span className="text-graphite font-mono font-bold text-lg bg-white px-3 py-1 rounded-lg">
                            {tokenData.ticker}
                        </span>
                    </div>

                    <div className="flex justify-between items-center p-4 bg-green-50 rounded-xl">
                        <span className="font-medium text-slate">
                            Total Supply
                        </span>
                        <span className="text-graphite font-bold text-lg">
                            {Number(tokenData.initialSupply).toLocaleString()}
                        </span>
                    </div>

                    {transactionHash && (
                        <div className="p-4 bg-purple-50 rounded-xl">
                            <div className="flex justify-between items-center mb-2">
                                <span className="font-medium text-slate">
                                    Transaction Hash
                                </span>
                                <a
                                    href={`https://explorer.multiversx.com/transactions/${transactionHash}`}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="text-purple-600 hover:text-purple-700 text-sm font-medium"
                                >
                                    View on Explorer →
                                </a>
                            </div>
                            <p className="text-xs font-mono text-slate bg-white p-2 rounded border break-all">
                                {transactionHash}
                            </p>
                        </div>
                    )}
                </div>
            </div>

            {/* What You Accomplished */}
            <div className="bg-gradient-to-r from-education-background to-create-50 border border-education-border rounded-xl p-6 text-left">
                <h3 className="font-bold text-graphite mb-4 flex items-center gap-2">
                    <span className="text-xl">🌟</span>
                    What You Just Accomplished
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                    <div className="space-y-2">
                        <p className="flex items-start gap-2">
                            <span className="text-green-600">✅</span>
                            <span>
                                Created a digital asset on a global blockchain
                            </span>
                        </p>
                        <p className="flex items-start gap-2">
                            <span className="text-green-600">✅</span>
                            <span>Deployed smart contract functionality</span>
                        </p>
                        <p className="flex items-start gap-2">
                            <span className="text-green-600">✅</span>
                            <span>Joined the decentralized economy</span>
                        </p>
                    </div>
                    <div className="space-y-2">
                        <p className="flex items-start gap-2">
                            <span className="text-green-600">✅</span>
                            <span>Learned blockchain fundamentals</span>
                        </p>
                        <p className="flex items-start gap-2">
                            <span className="text-green-600">✅</span>
                            <span>Made your first crypto transaction</span>
                        </p>
                        <p className="flex items-start gap-2">
                            <span className="text-green-600">✅</span>
                            <span>Became a token creator! 🎉</span>
                        </p>
                    </div>
                </div>
            </div>

            {/* Next Steps */}
            <div className="bg-blue-50 border border-blue-200 rounded-xl p-6 text-left">
                <h3 className="font-bold text-blue-800 mb-4 flex items-center gap-2">
                    <span className="text-xl">🚀</span>
                    What's Next?
                </h3>
                <div className="space-y-3 text-sm text-blue-700">
                    <p className="flex items-start gap-2">
                        <span className="text-blue-600">📊</span>
                        <span>
                            <strong>Manage your token:</strong> Access token
                            management tools from your dashboard
                        </span>
                    </p>
                    <p className="flex items-start gap-2">
                        <span className="text-blue-600">🎯</span>
                        <span>
                            <strong>Distribute tokens:</strong> Use our airdrop
                            tools to share your tokens
                        </span>
                    </p>
                    <p className="flex items-start gap-2">
                        <span className="text-blue-600">💧</span>
                        <span>
                            <strong>Add liquidity:</strong> Make your token
                            tradable on xExchange
                        </span>
                    </p>
                    <p className="flex items-start gap-2">
                        <span className="text-blue-600">👥</span>
                        <span>
                            <strong>Build community:</strong> Share your
                            achievement and grow your project
                        </span>
                    </p>
                </div>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <button
                    onClick={handleShareSuccess}
                    className="px-8 py-3 bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-xl font-medium
                        hover:from-purple-600 hover:to-pink-600 shadow-interactive hover:shadow-interactive-hover 
                        transform hover:scale-105 transition-all duration-200 flex items-center justify-center gap-2"
                >
                    <span>📱</span>
                    Share Your Achievement
                </button>

                <button
                    onClick={() => navigate("/app")}
                    className="px-8 py-3 bg-gradient-to-r from-create-500 to-create-600 text-white rounded-xl font-medium
                        hover:from-create-600 hover:to-create-700 shadow-interactive hover:shadow-interactive-hover 
                        transform hover:scale-105 transition-all duration-200 flex items-center justify-center gap-2"
                >
                    <span>🏠</span>
                    Go to Dashboard
                </button>
            </div>

            {/* Inspirational Quote */}
            <div className="bg-gradient-to-r from-indigo-50 to-purple-50 border border-indigo-200 rounded-xl p-6">
                <blockquote className="text-center italic text-indigo-700">
                    "Every expert was once a beginner. Every pro was once an
                    amateur. Every icon was once an unknown."
                </blockquote>
                <p className="text-center text-indigo-600 text-sm mt-2 font-medium">
                    You've taken your first step into a larger world. Welcome to
                    the future of finance! 🌟
                </p>
            </div>
        </div>
    );
};
