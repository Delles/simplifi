import React, { useState, useEffect } from "react";
import type { LPData } from "../Introduction";

interface RiskReviewModalProps {
    isOpen: boolean;
    onClose: () => void;
    onConfirm: () => void;
    lpData: LPData;
}

export const RiskReviewModal: React.FC<RiskReviewModalProps> = ({
    isOpen,
    onClose,
    onConfirm,
    lpData,
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
            id: "financial_loss",
            title: "Potential Financial Loss",
            description:
                "I understand that I may lose part or all of my investment and I'm not investing more than I can afford to lose.",
            severity: "high" as const,
            icon: "⚠️",
        },
    ];

    const handleRiskCheck = (riskId: string, checked: boolean) => {
        setCheckedRisks((prev) => ({ ...prev, [riskId]: checked }));
    };

    const allRisksAcknowledged = riskItems.every(
        (risk) => checkedRisks[risk.id]
    );

    const handleConfirm = () => {
        if (allRisksAcknowledged) {
            onConfirm();
            onClose();
        }
    };

    const getSeverityColor = (severity: string) => {
        switch (severity) {
            case "high":
                return "border-red-200 bg-red-50";
            case "medium":
                return "border-amber-200 bg-amber-50";
            default:
                return "border-slate-200 bg-slate-50";
        }
    };

    const getSeverityIcon = (severity: string) => {
        switch (severity) {
            case "high":
                return "🚨";
            case "medium":
                return "⚠️";
            default:
                return "ℹ️";
        }
    };

    // Reset state when modal opens
    useEffect(() => {
        if (isOpen) {
            setCheckedRisks({});
        }
    }, [isOpen]);

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-50 overflow-y-auto">
            {/* Backdrop */}
            <div
                className="fixed inset-0 bg-black/50 backdrop-blur-sm transition-opacity"
                onClick={onClose}
            />

            {/* Modal */}
            <div className="flex min-h-full items-center justify-center p-4">
                <div className="relative bg-white rounded-2xl shadow-modal max-w-2xl w-full max-h-[90vh] overflow-y-auto">
                    {/* Header */}
                    <div className="sticky top-0 bg-white border-b border-ash/20 p-6 rounded-t-2xl">
                        <div className="flex items-center justify-between">
                            <div className="flex items-center gap-3">
                                <div className="w-12 h-12 bg-gradient-to-br from-red-500 to-orange-500 rounded-xl flex items-center justify-center text-2xl text-white">
                                    ⚠️
                                </div>
                                <div>
                                    <h2 className="text-xl font-bold text-graphite">
                                        Review & Confirm Risks
                                    </h2>
                                    <p className="text-slate text-sm">
                                        Please acknowledge all risks before
                                        proceeding
                                    </p>
                                </div>
                            </div>
                            <button
                                onClick={onClose}
                                className="w-8 h-8 flex items-center justify-center text-slate hover:text-graphite hover:bg-ash/20 rounded-lg transition-colors"
                                aria-label="Close modal"
                            >
                                <svg
                                    className="w-5 h-5"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    stroke="currentColor"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth={2}
                                        d="M6 18L18 6M6 6l12 12"
                                    />
                                </svg>
                            </button>
                        </div>
                    </div>

                    {/* Content */}
                    <div className="p-6 space-y-6">
                        {/* Pool Summary */}
                        {lpData.tokenA && lpData.tokenB && (
                            <div className="bg-theme-blue/5 rounded-xl p-4 border border-theme-blue/20">
                                <h3 className="font-semibold text-theme-blue mb-3">
                                    Pool Configuration
                                </h3>
                                <div className="grid grid-cols-2 gap-4 text-sm">
                                    <div>
                                        <span className="text-slate">
                                            Token A:
                                        </span>
                                        <div className="font-medium text-graphite">
                                            {lpData.tokenA.amount}{" "}
                                            {lpData.tokenA.ticker}
                                        </div>
                                    </div>
                                    <div>
                                        <span className="text-slate">
                                            Token B:
                                        </span>
                                        <div className="font-medium text-graphite">
                                            {lpData.tokenB.amount}{" "}
                                            {lpData.tokenB.ticker}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        )}

                        {/* Risk Items */}
                        <div className="space-y-4">
                            <h3 className="font-semibold text-graphite">
                                Risk Acknowledgment
                            </h3>
                            {riskItems.map((risk) => (
                                <div
                                    key={risk.id}
                                    className={`border rounded-xl p-4 transition-all duration-200 ${getSeverityColor(
                                        risk.severity
                                    )} ${
                                        checkedRisks[risk.id]
                                            ? "ring-2 ring-theme-blue/20"
                                            : ""
                                    }`}
                                >
                                    <label className="flex items-start gap-3 cursor-pointer">
                                        <div className="flex items-center pt-1">
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
                                                className="w-5 h-5 text-theme-blue border-2 border-slate/30 rounded focus:ring-theme-blue focus:ring-2"
                                            />
                                        </div>
                                        <div className="flex-1">
                                            <div className="flex items-center gap-2 mb-2">
                                                <span className="text-lg">
                                                    {risk.icon}
                                                </span>
                                                <span className="text-xs">
                                                    {getSeverityIcon(
                                                        risk.severity
                                                    )}
                                                </span>
                                                <h4 className="font-medium text-graphite">
                                                    {risk.title}
                                                </h4>
                                            </div>
                                            <p className="text-sm text-slate leading-relaxed">
                                                {risk.description}
                                            </p>
                                        </div>
                                    </label>
                                </div>
                            ))}
                        </div>

                        {/* Warning Message */}
                        <div className="bg-distribute-primary/10 border border-distribute-primary/20 rounded-xl p-4">
                            <div className="flex items-start gap-3">
                                <span className="text-xl">🚨</span>
                                <div>
                                    <h4 className="font-medium text-distribute-primary mb-1">
                                        Important Notice
                                    </h4>
                                    <p className="text-sm text-slate">
                                        Creating a liquidity pool involves
                                        significant risks. Please ensure you
                                        understand all implications before
                                        proceeding. This action cannot be
                                        undone.
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Footer */}
                    <div className="sticky bottom-0 bg-white border-t border-ash/20 p-6 rounded-b-2xl">
                        <div className="flex gap-3">
                            <button
                                onClick={onClose}
                                className="flex-1 px-6 py-3 text-slate hover:text-graphite border border-ash/30 hover:border-ash/50 rounded-xl transition-colors"
                            >
                                Cancel
                            </button>
                            <button
                                onClick={handleConfirm}
                                disabled={!allRisksAcknowledged}
                                className="flex-1 px-6 py-3 bg-theme-blue text-white rounded-xl font-medium hover:bg-theme-blue-dark disabled:bg-ash disabled:cursor-not-allowed transition-colors"
                            >
                                {allRisksAcknowledged
                                    ? "Proceed to Create Pool"
                                    : `Acknowledge All Risks (${
                                          riskItems.filter(
                                              (r) => checkedRisks[r.id]
                                          ).length
                                      }/${riskItems.length})`}
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};
