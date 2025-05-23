import React from "react";
import { useNavigate } from "react-router-dom";
import type { LPData } from "../Introduction";

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
        <div className="text-center space-y-8">
            {/* Success Animation */}
            <div className="relative">
                <div className="w-24 h-24 bg-gradient-to-br from-green-500 to-emerald-500 rounded-full flex items-center justify-center text-5xl text-white mx-auto mb-6 animate-bounce shadow-level-3">
                    🎉
                </div>
                <div className="absolute inset-0 w-24 h-24 mx-auto bg-green-500/20 rounded-full animate-ping"></div>
            </div>

            {/* Success Message */}
            <div>
                <h2 className="text-3xl font-bold text-graphite mb-3">
                    Pool Created Successfully!
                </h2>
                <p className="text-lg text-slate max-w-md mx-auto">
                    Your liquidity pool is now live on xExchange. Users can
                    start trading your token!
                </p>
            </div>

            {/* Pool Summary */}
            <div className="bg-gradient-to-r from-distribute-50 to-amber-50 rounded-2xl p-6 border border-distribute-200 max-w-md mx-auto">
                <h3 className="font-semibold text-distribute-700 mb-4 flex items-center gap-2 justify-center">
                    <span className="text-xl">🏊‍♂️</span>
                    Your Liquidity Pool
                </h3>
                <div className="space-y-3 text-sm">
                    <div className="flex justify-between items-center">
                        <span className="text-slate">Token Pair:</span>
                        <span className="font-medium text-graphite">
                            {lpData.tokenA?.ticker} /{" "}
                            {lpData.tokenB?.ticker || "TBD"}
                        </span>
                    </div>
                    <div className="flex justify-between items-center">
                        <span className="text-slate">Token A Amount:</span>
                        <span className="font-medium text-graphite">
                            {lpData.tokenA?.amount || "0"}{" "}
                            {lpData.tokenA?.ticker}
                        </span>
                    </div>
                    <div className="flex justify-between items-center">
                        <span className="text-slate">Token B Amount:</span>
                        <span className="font-medium text-graphite">
                            {lpData.tokenB?.amount || "0"}{" "}
                            {lpData.tokenB?.ticker}
                        </span>
                    </div>
                    {lpData.estimatedLPTokens && (
                        <div className="flex justify-between items-center pt-2 border-t border-distribute-200">
                            <span className="text-slate">
                                LP Tokens Received:
                            </span>
                            <span className="font-medium text-distribute-600">
                                {lpData.estimatedLPTokens}
                            </span>
                        </div>
                    )}
                </div>
            </div>

            {/* Transaction Hash */}
            {transactionHash && (
                <div className="bg-white rounded-xl p-4 border border-ash max-w-md mx-auto">
                    <h4 className="font-semibold text-graphite mb-2">
                        Transaction Hash
                    </h4>
                    <div className="flex items-center gap-2 p-2 bg-ash/20 rounded-lg">
                        <code className="text-xs text-slate font-mono flex-1 overflow-hidden">
                            {transactionHash}
                        </code>
                        <a
                            href={explorerUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-xs text-distribute-600 hover:text-distribute-700 font-medium whitespace-nowrap"
                        >
                            View on Explorer ↗
                        </a>
                    </div>
                </div>
            )}

            {/* Next Steps */}
            <div className="bg-blue-50 rounded-2xl p-6 border border-blue-200 max-w-md mx-auto">
                <h3 className="font-semibold text-blue-800 mb-3 flex items-center gap-2 justify-center">
                    <span className="text-xl">🚀</span>
                    What's Next?
                </h3>
                <ul className="text-sm text-blue-700 space-y-2 text-left">
                    <li className="flex items-start gap-2">
                        <span className="text-blue-500 font-bold">•</span>
                        <span>Your token is now tradable on xExchange</span>
                    </li>
                    <li className="flex items-start gap-2">
                        <span className="text-blue-500 font-bold">•</span>
                        <span>Earn fees from every trade in your pool</span>
                    </li>
                    <li className="flex items-start gap-2">
                        <span className="text-blue-500 font-bold">•</span>
                        <span>
                            Monitor your LP position and accumulated fees
                        </span>
                    </li>
                    <li className="flex items-start gap-2">
                        <span className="text-blue-500 font-bold">•</span>
                        <span>
                            Consider adding more liquidity to reduce slippage
                        </span>
                    </li>
                </ul>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center max-w-md mx-auto">
                <a
                    href="https://xexchange.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-6 py-3 bg-distribute-500 text-white rounded-xl font-medium hover:bg-distribute-600 transition-colors text-center"
                >
                    View Pool on xExchange
                </a>
                <button
                    onClick={handleFinish}
                    className="px-6 py-3 border border-distribute-500 text-distribute-600 rounded-xl font-medium hover:bg-distribute-50 transition-colors"
                >
                    Back to Dashboard
                </button>
            </div>

            {/* Educational Footer */}
            <div className="bg-ash/10 rounded-xl p-4 max-w-md mx-auto">
                <p className="text-xs text-slate">
                    💡 <strong>Tip:</strong> Keep your LP tokens safe! They
                    represent your ownership in the pool and are required to
                    withdraw your liquidity later.
                </p>
            </div>
        </div>
    );
};
