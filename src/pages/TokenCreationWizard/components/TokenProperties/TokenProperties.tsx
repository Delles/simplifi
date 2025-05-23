import React, { useState } from "react";
import { InfoTooltip, PropertyToggle } from "../shared";
import type { TokenData } from "../BasicInformation/BasicInformation";

interface TokenPropertiesProps {
    tokenData: TokenData;
    onInputChange: (field: keyof TokenData, value: string | boolean) => void;
    estimatedCost: number;
}

export const TokenProperties: React.FC<TokenPropertiesProps> = ({
    tokenData,
    onInputChange,
    estimatedCost,
}) => {
    const [showAdvanced, setShowAdvanced] = useState(false);

    return (
        <div className="space-y-6">
            <div className="text-center mb-8">
                <div className="w-16 h-16 bg-gradient-to-br from-create-500 to-create-600 rounded-2xl flex items-center justify-center text-3xl text-white mx-auto mb-4 animate-bounce-gentle shadow-level-2">
                    ⚙️
                </div>
                <h2 className="text-2xl font-bold text-graphite mb-2">
                    Token Properties
                </h2>
                <p className="text-slate max-w-md mx-auto">
                    Configure how your token will behave. These settings
                    determine what actions are possible with your token.
                </p>
            </div>

            {/* Cost Reminder */}
            <div className="bg-gradient-to-r from-create-50 to-blue-50 border border-create-200 rounded-xl p-4 mb-6">
                <div className="flex items-center gap-3">
                    <div className="w-8 h-8 bg-create-500 rounded-lg flex items-center justify-center">
                        <svg
                            className="w-4 h-4 text-white"
                            fill="currentColor"
                            viewBox="0 0 20 20"
                        >
                            <path
                                fillRule="evenodd"
                                d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z"
                                clipRule="evenodd"
                            />
                        </svg>
                    </div>
                    <div>
                        <p className="text-sm font-medium text-create-700">
                            Configuration in Progress
                        </p>
                        <p className="text-xs text-create-600">
                            Cost remains {estimatedCost} EGLD regardless of
                            properties selected
                        </p>
                    </div>
                </div>
            </div>

            {/* Basic Properties */}
            <div className="space-y-4">
                <h3 className="text-lg font-semibold text-graphite mb-4">
                    Essential Properties
                </h3>

                {/* Supply Type */}
                <div className="bg-white border border-ash rounded-xl p-6">
                    <div className="flex items-center gap-3 mb-4">
                        <span className="text-lg font-medium text-graphite">
                            Supply Type
                        </span>
                        <InfoTooltip
                            content="Fixed supply means no more tokens can ever be created. Variable supply allows you to mint more tokens later."
                            title="Supply Type"
                            risk="caution"
                        />
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <label
                            className={`p-4 border-2 rounded-xl cursor-pointer transition-all duration-200 ${
                                tokenData.supplyType === "fixed"
                                    ? "border-create-500 bg-create-50"
                                    : "border-gray-200 hover:border-gray-300"
                            }`}
                        >
                            <input
                                type="radio"
                                name="supplyType"
                                value="fixed"
                                checked={tokenData.supplyType === "fixed"}
                                onChange={(e) =>
                                    onInputChange(
                                        "supplyType",
                                        e.target.value as "fixed" | "variable"
                                    )
                                }
                                className="sr-only"
                            />
                            <div className="font-medium text-graphite mb-2">
                                🔒 Fixed Supply
                            </div>
                            <div className="text-sm text-slate">
                                No additional tokens can ever be created
                                (Recommended for most projects)
                            </div>
                        </label>

                        <label
                            className={`p-4 border-2 rounded-xl cursor-pointer transition-all duration-200 ${
                                tokenData.supplyType === "variable"
                                    ? "border-create-500 bg-create-50"
                                    : "border-gray-200 hover:border-gray-300"
                            }`}
                        >
                            <input
                                type="radio"
                                name="supplyType"
                                value="variable"
                                checked={tokenData.supplyType === "variable"}
                                onChange={(e) =>
                                    onInputChange(
                                        "supplyType",
                                        e.target.value as "fixed" | "variable"
                                    )
                                }
                                className="sr-only"
                            />
                            <div className="font-medium text-graphite mb-2">
                                📈 Variable Supply
                            </div>
                            <div className="text-sm text-slate">
                                You can mint additional tokens later (Use with
                                caution)
                            </div>
                        </label>
                    </div>
                </div>

                <PropertyToggle
                    title="Burnable"
                    description="Token holders can permanently destroy their own tokens"
                    value={tokenData.burnable}
                    onChange={(value) => onInputChange("burnable", value)}
                    tooltip="Allows any holder to burn (destroy) their own tokens permanently. This can be useful for reducing supply over time."
                    risk="safe"
                />

                <PropertyToggle
                    title="Ownership Transfer"
                    description="You can transfer management rights to another address"
                    value={tokenData.ownershipTransfer}
                    onChange={(value) =>
                        onInputChange("ownershipTransfer", value)
                    }
                    tooltip="Allows you to transfer token management rights to another address. Useful for DAOs or if you want to give up control later."
                    risk="caution"
                />
            </div>

            {/* Advanced Properties */}
            <div className="space-y-4">
                <div className="flex items-center justify-between">
                    <h3 className="text-lg font-semibold text-graphite">
                        Advanced Properties
                    </h3>
                    <button
                        type="button"
                        onClick={() => setShowAdvanced(!showAdvanced)}
                        className="text-create-600 hover:text-create-700 text-sm font-medium flex items-center gap-2 transition-colors duration-200"
                    >
                        {showAdvanced ? "Hide Advanced" : "Show Advanced"}
                        <svg
                            className={`w-4 h-4 transition-transform duration-200 ${
                                showAdvanced ? "rotate-180" : ""
                            }`}
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M19 9l-7 7-7-7"
                            />
                        </svg>
                    </button>
                </div>

                {showAdvanced && (
                    <div className="space-y-4 animate-fade-in-up">
                        <div className="bg-amber-50 border border-amber-200 rounded-xl p-4">
                            <div className="flex items-start gap-3">
                                <span className="text-lg">⚠️</span>
                                <div>
                                    <h4 className="font-semibold text-amber-800 mb-1">
                                        Advanced Features Warning
                                    </h4>
                                    <p className="text-amber-700 text-sm">
                                        These features are powerful but can be
                                        risky. Only enable them if you
                                        understand their implications.
                                    </p>
                                </div>
                            </div>
                        </div>

                        <PropertyToggle
                            title="Pausable"
                            description="You can temporarily halt all token transfers"
                            value={tokenData.pausable}
                            onChange={(value) =>
                                onInputChange("pausable", value)
                            }
                            tooltip="Allows you to pause all token transfers in emergency situations. Use with extreme caution as this affects all holders."
                            risk="danger"
                        />

                        <PropertyToggle
                            title="Freezable"
                            description="You can freeze specific accounts"
                            value={tokenData.freezable}
                            onChange={(value) =>
                                onInputChange("freezable", value)
                            }
                            tooltip="Allows you to freeze individual accounts, preventing them from using their tokens. This is a powerful moderation tool."
                            risk="danger"
                        />

                        <PropertyToggle
                            title="Wipeable"
                            description="You can destroy tokens from frozen accounts"
                            value={tokenData.wipeable}
                            onChange={(value) =>
                                onInputChange("wipeable", value)
                            }
                            tooltip="Allows you to destroy tokens from frozen accounts. Requires Freezable to be enabled. Use only in extreme circumstances."
                            risk="danger"
                            disabled={!tokenData.freezable}
                        />

                        <PropertyToggle
                            title="Upgradable Properties"
                            description="You can change token properties later"
                            value={tokenData.upgradable}
                            onChange={(value) =>
                                onInputChange("upgradable", value)
                            }
                            tooltip="Allows you to modify token properties after creation. This provides flexibility but reduces trust."
                            risk="caution"
                        />

                        <PropertyToggle
                            title="NFT Creation Role"
                            description="This token can be used as payment for NFT creation"
                            value={tokenData.nftCreate}
                            onChange={(value) =>
                                onInputChange("nftCreate", value)
                            }
                            tooltip="Grants the ability to use this token as payment currency for NFT creation. Advanced feature for specific use cases."
                            risk="safe"
                        />
                    </div>
                )}
            </div>
        </div>
    );
};
