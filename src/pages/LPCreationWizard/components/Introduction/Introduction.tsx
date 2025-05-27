import React from "react";
import { CollapsibleCard } from "../shared";

// LPData interface definition
export interface LPData {
    tokenA: {
        identifier: string;
        name: string;
        ticker: string;
        balance: string;
        decimals: number;
        amount: string;
    } | null;
    tokenB: {
        identifier: string;
        name: string;
        ticker: string;
        balance: string;
        decimals: number;
        amount: string;
        type: "EGLD" | "ESDT";
        description?: string;
        marketCap?: string;
        volume24h?: string;
        recommended?: boolean;
        icon?: string;
        riskLevel?: "low" | "medium" | "high";
    } | null;
    initialPrice: string;
    estimatedLPTokens: string;
    riskAcknowledged: boolean;
}

interface IntroductionProps {
    lpData: LPData;
    onInputChange: (field: keyof LPData, value: unknown) => void;
}

export const Introduction: React.FC<IntroductionProps> = () => {
    return (
        <div className="space-y-8">
            {/* Hero Section - Simplified */}
            <div className="text-center">
                <div className="w-16 h-16 bg-gradient-to-br from-theme-blue to-theme-blue-dark rounded-2xl flex items-center justify-center text-3xl text-white mx-auto mb-6 shadow-level-2">
                    💧
                </div>

                <h2 className="text-h2 font-bold text-theme-blue mb-4">
                    Welcome to LP Creation
                </h2>
                <p className="text-body-lg text-slate max-w-2xl mx-auto">
                    Learn about liquidity pools, understand the risks, and get
                    ready to make your token tradable on xExchange.
                </p>
            </div>

            {/* What is a Liquidity Pool - Collapsible Card */}
            <CollapsibleCard
                title="What is a Liquidity Pool?"
                icon="🏊‍♂️"
                variant="primary"
                defaultExpanded={true}
            >
                <div className="space-y-4">
                    <p className="text-slate leading-relaxed">
                        A liquidity pool is a smart contract that holds tokens
                        and enables trading by providing liquidity to the
                        market. Users can swap tokens instantly without
                        traditional order books.
                    </p>

                    <div className="grid md:grid-cols-2 gap-4">
                        <div className="space-y-3">
                            {[
                                {
                                    icon: "🔄",
                                    title: "Token Trading",
                                    desc: "Enables users to swap between your token and other tokens",
                                },
                                {
                                    icon: "📊",
                                    title: "Price Discovery",
                                    desc: "Market determines the fair price through supply and demand",
                                },
                                {
                                    icon: "⏰",
                                    title: "24/7 Availability",
                                    desc: "Your token becomes tradable around the clock",
                                },
                            ].map((feature, index) => (
                                <div
                                    key={index}
                                    className="flex items-start gap-3"
                                >
                                    <div className="w-8 h-8 bg-theme-blue/10 rounded-lg flex items-center justify-center text-lg flex-shrink-0">
                                        {feature.icon}
                                    </div>
                                    <div>
                                        <p className="font-semibold text-graphite text-sm mb-1">
                                            {feature.title}
                                        </p>
                                        <p className="text-slate text-sm leading-relaxed">
                                            {feature.desc}
                                        </p>
                                    </div>
                                </div>
                            ))}
                        </div>

                        <div className="space-y-3">
                            {[
                                {
                                    icon: "🤖",
                                    title: "Automated Market Making",
                                    desc: "No need for traditional order books",
                                },
                                {
                                    icon: "⚡",
                                    title: "Instant Settlement",
                                    desc: "Trades execute immediately on-chain",
                                },
                                {
                                    icon: "🌐",
                                    title: "Decentralized",
                                    desc: "No central authority controls the trading",
                                },
                            ].map((feature, index) => (
                                <div
                                    key={index}
                                    className="flex items-start gap-3"
                                >
                                    <div className="w-8 h-8 bg-theme-blue/10 rounded-lg flex items-center justify-center text-lg flex-shrink-0">
                                        {feature.icon}
                                    </div>
                                    <div>
                                        <p className="font-semibold text-graphite text-sm mb-1">
                                            {feature.title}
                                        </p>
                                        <p className="text-slate text-sm leading-relaxed">
                                            {feature.desc}
                                        </p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </CollapsibleCard>

            {/* Benefits Section - Collapsible Card */}
            <CollapsibleCard
                title="Benefits of Creating a Liquidity Pool"
                icon="🎯"
                variant="success"
                defaultExpanded={false}
            >
                <div className="space-y-4">
                    <div className="grid md:grid-cols-2 gap-4">
                        {[
                            {
                                icon: "💰",
                                title: "Earn Trading Fees",
                                desc: "Receive a portion of fees from every trade in your pool",
                            },
                            {
                                icon: "🚀",
                                title: "Bootstrap Liquidity",
                                desc: "Provide initial trading capability for your token",
                            },
                            {
                                icon: "📈",
                                title: "Price Stability",
                                desc: "More liquidity leads to lower price volatility",
                            },
                            {
                                icon: "🌟",
                                title: "Market Presence",
                                desc: "Establish your token in the DeFi ecosystem",
                            },
                        ].map((benefit, index) => (
                            <div key={index} className="flex items-start gap-3">
                                <div className="w-8 h-8 bg-emerald-green/10 rounded-lg flex items-center justify-center text-lg flex-shrink-0">
                                    {benefit.icon}
                                </div>
                                <div>
                                    <p className="font-semibold text-graphite text-sm mb-1">
                                        {benefit.title}
                                    </p>
                                    <p className="text-slate text-sm leading-relaxed">
                                        {benefit.desc}
                                    </p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </CollapsibleCard>

            {/* Important Considerations - Collapsible Card */}
            <CollapsibleCard
                title="Important Considerations"
                icon="⚠️"
                variant="warning"
                defaultExpanded={false}
            >
                <div className="space-y-4">
                    <div className="space-y-3">
                        {[
                            {
                                icon: "🔄",
                                title: "Impermanent Loss",
                                desc: "Your LP position value may change relative to holding tokens separately if prices diverge significantly.",
                            },
                            {
                                icon: "💰",
                                title: "Initial Price Setting",
                                desc: "You'll set the initial price ratio. Ensure it reflects fair market value to avoid arbitrage.",
                            },
                            {
                                icon: "🔒",
                                title: "Capital Lock",
                                desc: "Your tokens will be locked in the smart contract until you remove liquidity.",
                            },
                            {
                                icon: "📊",
                                title: "Market Responsibility",
                                desc: "As the initial provider, you're responsible for bootstrapping the market.",
                            },
                        ].map((consideration, index) => (
                            <div
                                key={index}
                                className="flex items-start gap-3 p-3 bg-distribute-primary/5 rounded-lg"
                            >
                                <div className="w-8 h-8 bg-distribute-primary/10 rounded-lg flex items-center justify-center text-lg flex-shrink-0">
                                    {consideration.icon}
                                </div>
                                <div>
                                    <p className="font-semibold text-distribute-primary text-sm mb-1">
                                        {consideration.title}
                                    </p>
                                    <p className="text-slate text-sm leading-relaxed">
                                        {consideration.desc}
                                    </p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </CollapsibleCard>

            {/* Getting Started - Collapsible Card */}
            <CollapsibleCard
                title="Getting Started"
                icon="🚀"
                variant="secondary"
                defaultExpanded={false}
            >
                <div className="space-y-4">
                    <p className="text-slate leading-relaxed">
                        This wizard will guide you through the process step by
                        step:
                    </p>

                    <div className="space-y-3">
                        {[
                            {
                                step: "1",
                                title: "Select Your Token",
                                desc: "Choose the token you want to create a liquidity pool for",
                            },
                            {
                                step: "2",
                                title: "Choose Pairing Token",
                                desc: "Select what to pair with (EGLD, USDC, etc.)",
                            },
                            {
                                step: "3",
                                title: "Set Amounts & Price",
                                desc: "Define how much of each token to provide",
                            },
                            {
                                step: "4",
                                title: "Review & Execute",
                                desc: "Confirm details and create your liquidity pool",
                            },
                        ].map((step, index) => (
                            <div key={index} className="flex items-start gap-3">
                                <div className="w-8 h-8 bg-theme-blue rounded-lg flex items-center justify-center text-white text-sm font-bold flex-shrink-0">
                                    {step.step}
                                </div>
                                <div>
                                    <p className="font-semibold text-graphite text-sm mb-1">
                                        {step.title}
                                    </p>
                                    <p className="text-slate text-sm leading-relaxed">
                                        {step.desc}
                                    </p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </CollapsibleCard>

            {/* Ready to Start */}
            <div className="text-center p-6 bg-theme-blue/5 rounded-xl border border-theme-blue/20">
                <div className="flex items-center justify-center gap-3 mb-3">
                    <div className="w-8 h-8 bg-theme-blue rounded-lg flex items-center justify-center text-white text-sm">
                        ✓
                    </div>
                    <h3 className="font-semibold text-theme-blue">
                        Ready to Start?
                    </h3>
                </div>
                <p className="text-slate text-sm">
                    Click "Start LP Creation" below to begin the process. You
                    can always go back to previous steps if needed.
                </p>
            </div>
        </div>
    );
};
