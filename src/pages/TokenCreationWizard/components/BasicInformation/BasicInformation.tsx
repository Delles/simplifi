import React from "react";
import { InfoTooltip } from "../shared";

export interface TokenData {
    name: string;
    ticker: string;
    initialSupply: string;
    decimals: string;
    supplyType: "fixed" | "variable";
    burnable: boolean;
    ownershipTransfer: boolean;
    pausable: boolean;
    freezable: boolean;
    wipeable: boolean;
    upgradable: boolean;
    nftCreate: boolean;
}

interface BasicInformationProps {
    tokenData: TokenData;
    onInputChange: (field: keyof TokenData, value: string | boolean) => void;
    estimatedCost: number;
}

export const BasicInformation: React.FC<BasicInformationProps> = ({
    tokenData,
    onInputChange,
    estimatedCost,
}) => {
    return (
        <div className="space-y-6">
            <div className="text-center mb-8">
                <div className="w-16 h-16 bg-gradient-to-br from-create-500 to-create-600 rounded-2xl flex items-center justify-center text-3xl text-white mx-auto mb-4 animate-bounce-gentle shadow-level-2">
                    🚀
                </div>
                <h2 className="text-2xl font-bold text-graphite mb-2">
                    Basic Token Information
                </h2>
                <p className="text-slate max-w-md mx-auto">
                    Let's start with the fundamentals of your token. These
                    details will define your token's identity on MultiversX.
                </p>
            </div>

            {/* Cost Transparency Card - PDR Requirement */}
            <div className="bg-gradient-to-r from-create-50 to-blue-50 border border-create-200 rounded-xl p-4 mb-6">
                <div className="flex items-center gap-3">
                    <div className="w-8 h-8 bg-create-500 rounded-lg flex items-center justify-center">
                        <svg
                            className="w-4 h-4 text-white"
                            fill="currentColor"
                            viewBox="0 0 20 20"
                        >
                            <path d="M8.433 7.418c.155-.103.346-.196.567-.267v1.698a2.305 2.305 0 01-.567-.267C8.07 8.34 8 8.114 8 8c0-.114.07-.34.433-.582zM11 12.849v-1.698c.22.071.412.164.567.267.364.243.433.468.433.582 0 .114-.07.34-.433.582a2.305 2.305 0 01-.567.267z" />
                            <path
                                fillRule="evenodd"
                                d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-13a1 1 0 10-2 0v.092a4.535 4.535 0 00-1.676.662C6.602 6.234 6 7.009 6 8c0 .99.602 1.765 1.324 2.246.48.32 1.054.545 1.676.662v1.941c-.391-.127-.68-.317-.843-.504a1 1 0 10-1.51 1.31c.562.649 1.413 1.076 2.353 1.253V15a1 1 0 102 0v-.092a4.535 4.535 0 001.676-.662C13.398 13.766 14 12.991 14 12c0-.99-.602-1.765-1.324-2.246A4.535 4.535 0 0011 9.092V7.151c.391.127.68.317.843.504a1 1 0 101.51-1.31c-.562-.649-1.413-1.076-2.353-1.253V5z"
                                clipRule="evenodd"
                            />
                        </svg>
                    </div>
                    <div>
                        <p className="text-sm font-medium text-create-700">
                            Token Creation Cost: {estimatedCost} EGLD
                        </p>
                        <p className="text-xs text-create-600">
                            This covers blockchain fees for registering your
                            token on MultiversX
                        </p>
                    </div>
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Token Name */}
                <div className="space-y-2">
                    <div className="flex items-center gap-2">
                        <label className="block text-sm font-medium text-graphite">
                            Token Name <span className="text-red-500">*</span>
                        </label>
                        <InfoTooltip
                            content="The full name of your token (e.g., 'SimpliFi Token'). This should be descriptive and memorable for your community. Choose carefully - this represents your project's identity!"
                            title="Token Name"
                            risk="safe"
                        />
                    </div>
                    <input
                        type="text"
                        value={tokenData.name}
                        onChange={(e) => onInputChange("name", e.target.value)}
                        placeholder="e.g., SimpliFi Token"
                        className={`w-full px-4 py-3 border rounded-xl focus:outline-none focus:ring-2 transition-all duration-200 ${
                            !tokenData.name
                                ? "border-red-300 focus:ring-red-500/20 focus:border-red-500 bg-red-50/50"
                                : "border-ash focus:ring-create-500/20 focus:border-create-500"
                        }`}
                        maxLength={50}
                    />
                    {!tokenData.name && (
                        <p className="text-xs text-red-600">
                            Token name is required
                        </p>
                    )}
                </div>

                {/* Token Ticker */}
                <div className="space-y-2">
                    <div className="flex items-center gap-2">
                        <label className="block text-sm font-medium text-graphite">
                            Token Ticker <span className="text-red-500">*</span>
                        </label>
                        <InfoTooltip
                            content="A short symbol for your token (3-10 characters). This will be displayed everywhere your token appears. Choose wisely - this cannot be changed later! Avoid existing tickers."
                            title="Token Ticker"
                            risk="caution"
                        />
                    </div>
                    <input
                        type="text"
                        value={tokenData.ticker}
                        onChange={(e) =>
                            onInputChange(
                                "ticker",
                                e.target.value
                                    .toUpperCase()
                                    .replace(/[^A-Z0-9]/g, "")
                            )
                        }
                        placeholder="e.g., SIMP"
                        className={`w-full px-4 py-3 border rounded-xl focus:outline-none focus:ring-2 transition-all duration-200 ${
                            !tokenData.ticker
                                ? "border-red-300 focus:ring-red-500/20 focus:border-red-500 bg-red-50/50"
                                : "border-ash focus:ring-create-500/20 focus:border-create-500"
                        }`}
                        maxLength={10}
                        minLength={3}
                    />
                    <div className="flex justify-between text-xs">
                        {!tokenData.ticker ? (
                            <span className="text-red-600">
                                Token ticker is required (3-10 chars)
                            </span>
                        ) : tokenData.ticker.length < 3 ? (
                            <span className="text-distribute-600">
                                Minimum 3 characters
                            </span>
                        ) : (
                            <span className="text-manage-600">
                                ✓ Valid ticker format
                            </span>
                        )}
                        <span className="text-slate">
                            {tokenData.ticker.length}/10
                        </span>
                    </div>
                </div>

                {/* Initial Supply */}
                <div className="space-y-2">
                    <div className="flex items-center gap-2">
                        <label className="block text-sm font-medium text-graphite">
                            Initial Supply{" "}
                            <span className="text-red-500">*</span>
                        </label>
                        <InfoTooltip
                            content="The number of tokens to create initially. Consider your tokenomics carefully - too many tokens can reduce individual token value, too few might limit distribution. You can mint more later if needed."
                            title="Initial Supply"
                            risk="caution"
                        />
                    </div>
                    <input
                        type="number"
                        value={tokenData.initialSupply}
                        onChange={(e) => {
                            const value = e.target.value;
                            // Only allow positive numbers
                            if (
                                value === "" ||
                                (parseInt(value) > 0 && !value.includes("."))
                            ) {
                                onInputChange("initialSupply", value);
                            }
                        }}
                        placeholder="e.g., 1000000"
                        className={`w-full px-4 py-3 border rounded-xl focus:outline-none focus:ring-2 transition-all duration-200 ${
                            !tokenData.initialSupply
                                ? "border-red-300 focus:ring-red-500/20 focus:border-red-500 bg-red-50/50"
                                : "border-ash focus:ring-create-500/20 focus:border-create-500"
                        }`}
                        min="1"
                        step="1"
                    />
                    {!tokenData.initialSupply && (
                        <p className="text-xs text-red-600">
                            Initial supply is required
                        </p>
                    )}
                    {tokenData.initialSupply && (
                        <p className="text-xs text-slate">
                            {parseInt(tokenData.initialSupply).toLocaleString()}{" "}
                            tokens will be created
                        </p>
                    )}
                </div>

                {/* Decimals */}
                <div className="space-y-2">
                    <div className="flex items-center gap-2">
                        <label className="block text-sm font-medium text-graphite">
                            Decimals
                        </label>
                        <InfoTooltip
                            content="How many decimal places your token supports. 18 is the standard (like EGLD). Use 0 for whole numbers only, 6-8 for stable coins. This affects how precisely your token can be divided."
                            title="Decimal Places"
                            risk="safe"
                        />
                    </div>
                    <select
                        value={tokenData.decimals}
                        onChange={(e) =>
                            onInputChange("decimals", e.target.value)
                        }
                        className="w-full px-4 py-3 border border-ash rounded-xl focus:outline-none focus:ring-2 focus:ring-create-500/20 focus:border-create-500 transition-all duration-200"
                    >
                        <option value="0">
                            0 - Whole numbers only (NFT-like)
                        </option>
                        <option value="6">6 - Stable coins (USDC style)</option>
                        <option value="8">8 - Traditional finance</option>
                        <option value="18">18 - Standard (recommended)</option>
                    </select>
                    <p className="text-xs text-slate">
                        {tokenData.decimals === "0" &&
                            "Tokens cannot be split (e.g., 1, 2, 3...)"}
                        {tokenData.decimals === "6" &&
                            "Tokens divisible to 6 decimal places (e.g., 1.000001)"}
                        {tokenData.decimals === "8" &&
                            "Tokens divisible to 8 decimal places (e.g., 1.00000001)"}
                        {tokenData.decimals === "18" &&
                            "Tokens divisible to 18 decimal places (maximum precision)"}
                    </p>
                </div>
            </div>

            {/* Enhanced educational callout */}
            <div className="bg-education-background border border-education-border rounded-xl p-6">
                <div className="flex items-start gap-4">
                    <div className="w-8 h-8 bg-education-primary rounded-lg flex items-center justify-center text-white text-lg flex-shrink-0">
                        💡
                    </div>
                    <div>
                        <h4 className="font-semibold text-graphite mb-2">
                            Pro Tip: Think Long-term
                        </h4>
                        <p className="text-slate text-sm leading-relaxed mb-3">
                            Your token name and ticker will represent your
                            project forever. Choose something memorable,
                            professional, and aligned with your brand. Avoid
                            using existing project names or tickers.
                        </p>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
                            <div>
                                <p className="font-medium text-manage-700 mb-1">
                                    ✅ Good Examples:
                                </p>
                                <p className="text-slate">
                                    - Creative, unique names
                                </p>
                                <p className="text-slate">
                                    - Clear brand alignment
                                </p>
                                <p className="text-slate">
                                    - Professional appearance
                                </p>
                            </div>
                            <div>
                                <p className="font-medium text-red-700 mb-1">
                                    ❌ Avoid:
                                </p>
                                <p className="text-slate">
                                    - Existing project names
                                </p>
                                <p className="text-slate">
                                    - Generic descriptions
                                </p>
                                <p className="text-slate">
                                    - Special characters
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};
