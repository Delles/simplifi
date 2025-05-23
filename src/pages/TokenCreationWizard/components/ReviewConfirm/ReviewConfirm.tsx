import React from "react";
import type { TokenData } from "../BasicInformation/BasicInformation";

interface ReviewConfirmProps {
    tokenData: TokenData;
    estimatedCost: number;
}

export const ReviewConfirm: React.FC<ReviewConfirmProps> = ({
    tokenData,
    estimatedCost,
}) => {
    return (
        <div className="space-y-6">
            <div className="text-center mb-8">
                <div className="w-16 h-16 bg-gradient-to-br from-create-500 to-create-600 rounded-2xl flex items-center justify-center text-3xl text-white mx-auto mb-4 animate-bounce-gentle shadow-level-2">
                    📋
                </div>
                <h2 className="text-2xl font-bold text-graphite mb-2">
                    Review Your Token
                </h2>
                <p className="text-slate max-w-md mx-auto">
                    Please verify all details before deployment. This is your
                    final chance to review everything.
                </p>
            </div>

            <div className="bg-white/95 backdrop-blur-sm border border-ash rounded-2xl p-8 shadow-level-3">
                <h3 className="text-lg font-semibold text-graphite mb-6 flex items-center gap-2">
                    <span className="w-6 h-6 bg-create-500 rounded-lg flex items-center justify-center text-white text-sm">
                        📄
                    </span>
                    Token Summary
                </h3>

                <div className="space-y-4">
                    <div className="flex justify-between items-center py-3 border-b border-ash">
                        <span className="font-medium text-slate">
                            Token Name
                        </span>
                        <span className="text-graphite font-medium">
                            {tokenData.name || "Not set"}
                        </span>
                    </div>

                    <div className="flex justify-between items-center py-3 border-b border-ash">
                        <span className="font-medium text-slate">Ticker</span>
                        <span className="text-graphite font-mono bg-gray-100 px-3 py-1 rounded-lg text-sm">
                            {tokenData.ticker || "Not set"}
                        </span>
                    </div>

                    <div className="flex justify-between items-center py-3 border-b border-ash">
                        <span className="font-medium text-slate">
                            Initial Supply
                        </span>
                        <span className="text-graphite font-medium">
                            {tokenData.initialSupply
                                ? Number(
                                      tokenData.initialSupply
                                  ).toLocaleString()
                                : "Not set"}
                        </span>
                    </div>

                    <div className="flex justify-between items-center py-3 border-b border-ash">
                        <span className="font-medium text-slate">Decimals</span>
                        <span className="text-graphite font-medium">
                            {tokenData.decimals}
                            <span className="text-xs text-slate ml-2">
                                (
                                {tokenData.decimals === "0"
                                    ? "Whole numbers"
                                    : tokenData.decimals === "18"
                                    ? "Standard precision"
                                    : "Custom precision"}
                                )
                            </span>
                        </span>
                    </div>

                    <div className="flex justify-between items-center py-3 border-b border-ash">
                        <span className="font-medium text-slate">
                            Supply Type
                        </span>
                        <span
                            className={`px-3 py-1 rounded-full text-sm font-medium ${
                                tokenData.supplyType === "fixed"
                                    ? "bg-manage-100 text-manage-700"
                                    : "bg-amber-100 text-amber-700"
                            }`}
                        >
                            {tokenData.supplyType === "fixed"
                                ? "🔒 Fixed"
                                : "📈 Variable"}
                        </span>
                    </div>
                </div>

                <div className="mt-8">
                    <h4 className="font-semibold text-graphite mb-4 flex items-center gap-2">
                        <span className="w-5 h-5 bg-create-500 rounded flex items-center justify-center text-white text-xs">
                            ⚙️
                        </span>
                        Enabled Properties
                    </h4>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                        {tokenData.burnable && (
                            <div className="flex items-center gap-2 text-sm text-manage-700 bg-manage-50 px-3 py-2 rounded-lg">
                                <span>✅</span> Burnable
                            </div>
                        )}
                        {tokenData.ownershipTransfer && (
                            <div className="flex items-center gap-2 text-sm text-amber-700 bg-amber-50 px-3 py-2 rounded-lg">
                                <span>⚠️</span> Ownership Transfer
                            </div>
                        )}
                        {tokenData.pausable && (
                            <div className="flex items-center gap-2 text-sm text-red-700 bg-red-50 px-3 py-2 rounded-lg">
                                <span>🚨</span> Pausable
                            </div>
                        )}
                        {tokenData.freezable && (
                            <div className="flex items-center gap-2 text-sm text-red-700 bg-red-50 px-3 py-2 rounded-lg">
                                <span>🚨</span> Freezable
                            </div>
                        )}
                        {tokenData.wipeable && (
                            <div className="flex items-center gap-2 text-sm text-red-700 bg-red-50 px-3 py-2 rounded-lg">
                                <span>🚨</span> Wipeable
                            </div>
                        )}
                        {tokenData.upgradable && (
                            <div className="flex items-center gap-2 text-sm text-amber-700 bg-amber-50 px-3 py-2 rounded-lg">
                                <span>⚠️</span> Upgradable
                            </div>
                        )}
                        {tokenData.nftCreate && (
                            <div className="flex items-center gap-2 text-sm text-create-700 bg-create-50 px-3 py-2 rounded-lg">
                                <span>🎨</span> NFT Creation Role
                            </div>
                        )}

                        {/* Show message if no special properties are enabled */}
                        {!tokenData.burnable &&
                            !tokenData.ownershipTransfer &&
                            !tokenData.pausable &&
                            !tokenData.freezable &&
                            !tokenData.wipeable &&
                            !tokenData.upgradable &&
                            !tokenData.nftCreate && (
                                <div className="col-span-full text-center py-4 text-slate text-sm">
                                    No special properties enabled - using safe
                                    defaults
                                </div>
                            )}
                    </div>
                </div>
            </div>

            {/* Enhanced Cost Breakdown */}
            <div className="bg-gradient-to-r from-education-background to-create-50 border border-education-border rounded-xl p-6">
                <h4 className="font-semibold text-graphite mb-4 flex items-center gap-2">
                    💰 Cost Breakdown
                </h4>
                <div className="space-y-3 text-sm">
                    <div className="flex justify-between items-center">
                        <span className="text-slate">
                            Token Issuance Fee (MultiversX Network)
                        </span>
                        <span className="text-graphite font-medium">
                            {estimatedCost} EGLD
                        </span>
                    </div>
                    <div className="flex justify-between items-center text-xs text-slate">
                        <span>• Covers blockchain registration and setup</span>
                        <span>Non-refundable</span>
                    </div>
                    <div className="border-t border-education-border pt-3 flex justify-between items-center">
                        <span className="font-semibold text-graphite text-base">
                            Total Cost
                        </span>
                        <span className="font-bold text-graphite text-lg bg-create-100 px-3 py-1 rounded-lg">
                            {estimatedCost} EGLD
                        </span>
                    </div>
                    <p className="text-xs text-slate mt-2">
                        This fee is paid directly to the MultiversX network.
                        SimpliFi does not charge any additional fees.
                    </p>
                </div>
            </div>

            {/* Enhanced Final Warning */}
            <div className="bg-gradient-to-r from-amber-50 to-orange-50 border border-amber-200 rounded-xl p-6">
                <div className="flex items-start gap-4">
                    <span className="text-2xl">⚠️</span>
                    <div className="flex-1">
                        <h4 className="font-semibold text-amber-800 mb-2">
                            Final Confirmation Required
                        </h4>
                        <p className="text-amber-700 text-sm leading-relaxed mb-4">
                            Token creation is <strong>irreversible</strong>.
                            Please double-check all details above. Your token
                            name, ticker, and initial properties cannot be
                            changed after deployment.
                        </p>

                        <div className="space-y-3">
                            <label className="flex items-start gap-3 cursor-pointer">
                                <input
                                    type="checkbox"
                                    className="w-4 h-4 text-create-600 rounded focus:ring-create-500 mt-0.5"
                                    required
                                />
                                <span className="text-sm text-amber-800">
                                    I understand that token creation is
                                    permanent and irreversible
                                </span>
                            </label>

                            <label className="flex items-start gap-3 cursor-pointer">
                                <input
                                    type="checkbox"
                                    className="w-4 h-4 text-create-600 rounded focus:ring-create-500 mt-0.5"
                                    required
                                />
                                <span className="text-sm text-amber-800">
                                    I have verified that my ticker is unique and
                                    not used by other projects
                                </span>
                            </label>

                            <label className="flex items-start gap-3 cursor-pointer">
                                <input
                                    type="checkbox"
                                    className="w-4 h-4 text-create-600 rounded focus:ring-create-500 mt-0.5"
                                    required
                                />
                                <span className="text-sm text-amber-800">
                                    I understand the {estimatedCost} EGLD fee is
                                    non-refundable
                                </span>
                            </label>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};
