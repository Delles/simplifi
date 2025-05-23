import React from "react";
import type { TokenData } from "../BasicInformation/BasicInformation";

interface DeployProps {
    onDeploy: () => void;
    isLoading: boolean;
    tokenData: TokenData;
    estimatedCost: number;
}

export const Deploy: React.FC<DeployProps> = ({
    onDeploy,
    isLoading,
    tokenData,
    estimatedCost,
}) => {
    return (
        <div className="text-center space-y-8">
            <div className="relative">
                <div
                    className={`w-20 h-20 bg-gradient-to-br from-create-500 to-create-600 rounded-2xl flex items-center justify-center text-4xl text-white mx-auto shadow-level-3 transition-all duration-500 ${
                        isLoading
                            ? "animate-pulse scale-110"
                            : "animate-bounce-gentle"
                    }`}
                >
                    {isLoading ? "⏳" : "🚀"}
                </div>

                {isLoading && (
                    <div className="absolute inset-0 rounded-2xl border-4 border-create-300 animate-ping"></div>
                )}
            </div>

            <div>
                <h2 className="text-3xl font-bold text-graphite mb-3">
                    {isLoading ? "Deploying..." : "Ready to Launch!"}
                </h2>
                <p className="text-slate text-lg max-w-lg mx-auto">
                    {isLoading
                        ? `Creating your ${tokenData.name} (${tokenData.ticker}) token on MultiversX...`
                        : "Your token configuration is complete. Click deploy to create your token on MultiversX."}
                </p>
            </div>

            {/* Quick Summary Card */}
            {!isLoading && (
                <div className="bg-gradient-to-r from-create-50 to-blue-50 border border-create-200 rounded-xl p-6 max-w-md mx-auto">
                    <h3 className="font-semibold text-create-700 mb-3">
                        Quick Summary
                    </h3>
                    <div className="space-y-2 text-sm">
                        <div className="flex justify-between">
                            <span className="text-slate">Token:</span>
                            <span className="text-graphite font-medium">
                                {tokenData.name}
                            </span>
                        </div>
                        <div className="flex justify-between">
                            <span className="text-slate">Ticker:</span>
                            <span className="text-graphite font-mono">
                                {tokenData.ticker}
                            </span>
                        </div>
                        <div className="flex justify-between">
                            <span className="text-slate">Supply:</span>
                            <span className="text-graphite font-medium">
                                {Number(
                                    tokenData.initialSupply
                                ).toLocaleString()}
                            </span>
                        </div>
                        <div className="flex justify-between border-t border-create-200 pt-2">
                            <span className="text-slate font-medium">
                                Cost:
                            </span>
                            <span className="text-create-700 font-bold">
                                {estimatedCost} EGLD
                            </span>
                        </div>
                    </div>
                </div>
            )}

            {/* Loading Progress */}
            {isLoading && (
                <div className="max-w-md mx-auto">
                    <div className="bg-gray-200 rounded-full h-3 overflow-hidden">
                        <div
                            className="h-full bg-gradient-to-r from-create-500 to-blue-500 rounded-full animate-gradient-shift transition-all duration-1000"
                            style={{ width: "100%" }}
                        ></div>
                    </div>
                    <p className="text-xs text-slate mt-2">
                        Please confirm the transaction in your wallet...
                    </p>
                </div>
            )}

            <button
                onClick={onDeploy}
                disabled={isLoading}
                className={`w-full max-w-md mx-auto py-4 px-8 rounded-xl font-semibold text-lg
                    shadow-interactive hover:shadow-interactive-hover transform hover:scale-105 active:scale-95
                    transition-all duration-300 flex items-center justify-center gap-3 min-h-[60px]
                    ${
                        isLoading
                            ? "bg-gray-400 cursor-not-allowed"
                            : "bg-gradient-to-r from-create-500 to-blue-500 hover:from-create-600 hover:to-blue-600 text-white"
                    }`}
            >
                {isLoading ? (
                    <>
                        <svg
                            className="animate-spin w-5 h-5"
                            fill="none"
                            viewBox="0 0 24 24"
                        >
                            <circle
                                className="opacity-25"
                                cx="12"
                                cy="12"
                                r="10"
                                stroke="currentColor"
                                strokeWidth="4"
                            ></circle>
                            <path
                                className="opacity-75"
                                fill="currentColor"
                                d="m4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                            ></path>
                        </svg>
                        Deploying Token...
                    </>
                ) : (
                    <>
                        <span>🚀</span>
                        Deploy Token
                        <span>✨</span>
                    </>
                )}
            </button>

            <div className="max-w-lg mx-auto space-y-3">
                <p className="text-sm text-slate">
                    {isLoading
                        ? "Your wallet will prompt you to sign the transaction. This process is secure and non-custodial."
                        : "This will open your wallet to sign the token creation transaction."}
                </p>

                {!isLoading && (
                    <div className="bg-amber-50 border border-amber-200 rounded-lg p-3">
                        <p className="text-xs text-amber-700">
                            <strong>Important:</strong> Make sure you have at
                            least {estimatedCost} EGLD in your wallet to cover
                            the network fees. The transaction is irreversible
                            once confirmed.
                        </p>
                    </div>
                )}
            </div>
        </div>
    );
};
