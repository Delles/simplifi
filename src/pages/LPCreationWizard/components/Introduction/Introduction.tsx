import React from "react";
import { InfoTooltip } from "../shared";

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
        <div className="space-y-10">
            {/* Hero Section */}
            <div className="text-center">
                <div className="relative mb-6">
                    {/* Animated Background Glow */}
                    <div className="absolute inset-0 w-24 h-24 mx-auto bg-gradient-to-br from-distribute-400/30 to-amber-400/30 rounded-full blur-xl animate-pulse-gentle"></div>

                    {/* Main Icon */}
                    <div className="relative w-24 h-24 bg-gradient-to-br from-distribute-500 to-amber-500 rounded-3xl flex items-center justify-center text-5xl text-white mx-auto shadow-level-3 animate-bounce-gentle">
                        💧
                    </div>

                    {/* Floating Particles */}
                    <div className="absolute -top-2 -right-2 w-3 h-3 bg-distribute-400 rounded-full animate-bounce opacity-60"></div>
                    <div className="absolute -bottom-1 -left-1 w-2 h-2 bg-amber-400 rounded-full animate-pulse opacity-40"></div>
                </div>

                <h2 className="text-h2 font-bold text-graphite mb-4 tracking-tight">
                    Welcome to{" "}
                    <span className="bg-gradient-to-r from-distribute-400 to-amber-400 bg-clip-text  font-extrabold">
                        LP Creation
                    </span>
                </h2>
                <p className="text-body-xl text-slate max-w-3xl mx-auto leading-relaxed">
                    Learn about liquidity pools, understand the risks, and get
                    ready to make your token
                    <span className="font-semibold text-distribute-600">
                        {" "}
                        tradable on xExchange
                    </span>
                    .
                </p>
            </div>

            {/* What is a Liquidity Pool - Enhanced Glass Card */}
            <div className="relative group">
                {/* Background Gradient */}
                <div className="absolute inset-0 bg-gradient-to-br from-distribute-50 via-distribute-100/50 to-amber-50 rounded-3xl blur-sm"></div>

                {/* Glass-morphism Card */}
                <div className="relative backdrop-blur-md bg-white/90 rounded-3xl p-8 border border-white/50 shadow-level-3 hover:shadow-level-4 transition-all duration-500 group-hover:scale-[1.02]">
                    <div className="flex flex-col lg:flex-row items-start gap-6">
                        {/* Icon Section */}
                        <div className="flex-shrink-0">
                            <div className="w-16 h-16 bg-gradient-to-br from-distribute-500 to-distribute-600 rounded-2xl flex items-center justify-center text-3xl text-white shadow-level-2 group-hover:rotate-6 transition-transform duration-300">
                                🏊‍♂️
                            </div>
                        </div>

                        {/* Content Section */}
                        <div className="flex-1">
                            <h3 className="text-h3 font-bold text-graphite mb-4 flex items-center gap-3">
                                What is a Liquidity Pool?
                                <InfoTooltip
                                    title="Liquidity Pool Basics"
                                    content="A liquidity pool is a smart contract that holds tokens and enables trading by providing liquidity to the market. Users can swap tokens instantly without traditional order books."
                                />
                            </h3>

                            <div className="grid md:grid-cols-2 gap-6">
                                <div className="space-y-4">
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
                                            className="flex items-start gap-3 group/item"
                                            style={{
                                                animationDelay: `${
                                                    index * 100
                                                }ms`,
                                            }}
                                        >
                                            <div className="w-8 h-8 bg-distribute-100 rounded-lg flex items-center justify-center text-lg group-hover/item:scale-110 transition-transform duration-200">
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

                                <div className="space-y-4">
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
                                            className="flex items-start gap-3 group/item"
                                            style={{
                                                animationDelay: `${
                                                    (index + 3) * 100
                                                }ms`,
                                            }}
                                        >
                                            <div className="w-8 h-8 bg-distribute-100 rounded-lg flex items-center justify-center text-lg group-hover/item:scale-110 transition-transform duration-200">
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
                    </div>
                </div>
            </div>

            {/* Benefits Section - Enhanced Grid */}
            <div className="relative">
                {/* Background Pattern */}
                <div className="absolute inset-0 bg-gradient-to-r from-green-50/50 to-emerald-50/50 rounded-3xl"></div>

                <div className="relative backdrop-blur-sm bg-white/95 rounded-3xl p-8 border border-white/60 shadow-level-2">
                    <div className="flex flex-col lg:flex-row items-start gap-6 mb-8">
                        <div className="w-16 h-16 bg-gradient-to-br from-green-500 to-emerald-600 rounded-2xl flex items-center justify-center text-3xl text-white shadow-level-2 flex-shrink-0">
                            🎯
                        </div>
                        <div>
                            <h3 className="text-h3 font-bold text-graphite mb-3 flex items-center gap-3">
                                Benefits of Creating a Liquidity Pool
                                <InfoTooltip
                                    title="Liquidity Provider Benefits"
                                    content="As a liquidity provider, you earn fees from every trade and help bootstrap your token's ecosystem. This creates a symbiotic relationship between you and traders."
                                />
                            </h3>
                            <p className="text-body-secondary text-slate">
                                Discover the advantages of providing liquidity
                                for your token ecosystem
                            </p>
                        </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {[
                            {
                                icon: "💰",
                                title: "Earn Trading Fees",
                                desc: "Receive a share of fees from every trade in your pool",
                                color: "from-yellow-400 to-amber-500",
                            },
                            {
                                icon: "📈",
                                title: "Bootstrap Liquidity",
                                desc: "Provide initial liquidity to make your token tradable",
                                color: "from-blue-400 to-blue-600",
                            },
                            {
                                icon: "🔄",
                                title: "Enable Price Discovery",
                                desc: "Let the market determine your token's fair value",
                                color: "from-purple-400 to-purple-600",
                            },
                            {
                                icon: "🎯",
                                title: "Attract Traders",
                                desc: "Deep liquidity attracts more traders and volume",
                                color: "from-green-400 to-green-600",
                            },
                            {
                                icon: "🚀",
                                title: "Token Growth",
                                desc: "Tradability is essential for token adoption",
                                color: "from-orange-400 to-red-500",
                            },
                            {
                                icon: "🛡️",
                                title: "LP Token Receipt",
                                desc: "Get LP tokens representing your pool ownership",
                                color: "from-teal-400 to-cyan-500",
                            },
                        ].map((benefit, index) => (
                            <div
                                key={index}
                                className="group/benefit relative"
                                style={{ animationDelay: `${index * 100}ms` }}
                            >
                                {/* Card Background with Gradient */}
                                <div
                                    className="absolute inset-0 bg-gradient-to-br opacity-5 rounded-2xl group-hover/benefit:opacity-10 transition-opacity duration-300"
                                    style={{
                                        backgroundImage: `linear-gradient(135deg, ${
                                            benefit.color.split(" ")[1]
                                        }, ${benefit.color.split(" ")[3]})`,
                                    }}
                                ></div>

                                <div className="relative bg-white/60 backdrop-blur-sm rounded-2xl p-6 border border-white/40 shadow-card hover:shadow-card-hover transition-all duration-300 group-hover/benefit:scale-105">
                                    <div
                                        className={`w-12 h-12 bg-gradient-to-br ${benefit.color} rounded-xl flex items-center justify-center text-2xl mb-4 shadow-sm group-hover/benefit:rotate-12 transition-transform duration-300`}
                                    >
                                        {benefit.icon}
                                    </div>
                                    <h4 className="font-bold text-graphite mb-2 text-sm">
                                        {benefit.title}
                                    </h4>
                                    <p className="text-slate text-sm leading-relaxed">
                                        {benefit.desc}
                                    </p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            {/* Risk Warnings - Enhanced Alert Design */}
            <div className="relative">
                {/* Animated Warning Background */}
                <div className="absolute inset-0 bg-gradient-to-br from-red-50 to-orange-50 rounded-3xl animate-pulse-gentle opacity-50"></div>

                <div className="relative backdrop-blur-md bg-white/95 rounded-3xl p-8 border border-red-200/60 shadow-level-3">
                    <div className="flex flex-col lg:flex-row items-start gap-6 mb-8">
                        <div className="relative flex-shrink-0">
                            {/* Pulsing Danger Icon */}
                            <div className="w-16 h-16 bg-gradient-to-br from-red-500 to-red-600 rounded-2xl flex items-center justify-center text-3xl text-white shadow-level-2">
                                ⚠️
                            </div>
                            <div className="absolute inset-0 w-16 h-16 bg-red-500/20 rounded-2xl animate-ping"></div>
                        </div>

                        <div>
                            <h3 className="text-h3 font-bold text-red-800 mb-3 flex items-center gap-3">
                                Important Risks to Understand
                                <InfoTooltip
                                    title="Critical Risk Warning"
                                    content="Please read and understand these risks before proceeding. Liquidity provision involves financial risks that could result in losses. Never invest more than you can afford to lose."
                                    risk="danger"
                                />
                            </h3>
                            <p className="text-body-secondary text-red-700">
                                Take time to understand these risks before
                                proceeding with liquidity provision
                            </p>
                        </div>
                    </div>

                    <div className="grid gap-6 md:grid-cols-2">
                        {[
                            {
                                icon: "🔄",
                                title: "Impermanent Loss",
                                description:
                                    'When token prices diverge, your LP position may be worth less than holding tokens separately. This loss becomes "permanent" when you withdraw.',
                                severity: "high",
                            },
                            {
                                icon: "💰",
                                title: "Initial Price Setting",
                                description:
                                    "You set the initial price ratio. If this doesn't match market expectations, arbitrage traders may immediately profit at your expense.",
                                severity: "high",
                            },
                            {
                                icon: "🔒",
                                title: "Capital Lock Risk",
                                description:
                                    "Your tokens will be locked in the smart contract. While you can withdraw them, you might receive different token ratios than you deposited.",
                                severity: "medium",
                            },
                            {
                                icon: "📊",
                                title: "Market Impact",
                                description:
                                    "Large trades can significantly impact your token's price, especially with limited liquidity. Consider the depth of your initial liquidity provision.",
                                severity: "medium",
                            },
                        ].map((risk, index) => (
                            <div
                                key={index}
                                className="group/risk relative bg-white/80 backdrop-blur-sm rounded-2xl p-6 border border-red-200/40 hover:shadow-level-2 transition-all duration-300"
                                style={{ animationDelay: `${index * 150}ms` }}
                            >
                                {/* Risk Severity Indicator */}
                                <div
                                    className={`absolute top-4 right-4 w-3 h-3 rounded-full ${
                                        risk.severity === "high"
                                            ? "bg-red-500"
                                            : "bg-amber-500"
                                    } shadow-sm`}
                                ></div>

                                <div className="flex items-start gap-4">
                                    <div className="w-12 h-12 bg-red-100 rounded-xl flex items-center justify-center text-2xl group-hover/risk:scale-110 transition-transform duration-200 flex-shrink-0">
                                        {risk.icon}
                                    </div>
                                    <div className="flex-1">
                                        <h4 className="font-bold text-red-800 mb-2 flex items-center gap-2">
                                            {risk.title}
                                            <span
                                                className={`px-2 py-1 rounded-full text-xs font-medium ${
                                                    risk.severity === "high"
                                                        ? "bg-red-100 text-red-700"
                                                        : "bg-amber-100 text-amber-700"
                                                }`}
                                            >
                                                {risk.severity}
                                            </span>
                                        </h4>
                                        <p className="text-red-600 text-sm leading-relaxed">
                                            {risk.description}
                                        </p>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            {/* Educational Resources - Enhanced */}
            <div className="relative">
                <div className="absolute inset-0 bg-gradient-to-br from-blue-50 to-indigo-50 rounded-3xl"></div>

                <div className="relative backdrop-blur-sm bg-white/90 rounded-3xl p-8 border border-blue-200/60 shadow-level-2">
                    <div className="flex flex-col lg:flex-row items-start gap-6 mb-8">
                        <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-2xl flex items-center justify-center text-3xl text-white shadow-level-2 flex-shrink-0">
                            📚
                        </div>
                        <div>
                            <h3 className="text-h3 font-bold text-blue-800 mb-3">
                                Learn More Before You Start
                            </h3>
                            <p className="text-body-secondary text-blue-700">
                                Deepen your understanding with these educational
                                resources
                            </p>
                        </div>
                    </div>

                    <div className="grid md:grid-cols-2 gap-6">
                        {[
                            {
                                title: "MultiversX Documentation",
                                description:
                                    "Official guides on token management and liquidity",
                                icon: "📖",
                                url: "https://docs.multiversx.com/developers/developer-reference/mx-bridge-tokens",
                                color: "from-blue-500 to-blue-600",
                            },
                            {
                                title: "xExchange Academy",
                                description:
                                    "Learn about AMMs, liquidity pools, and DeFi",
                                icon: "🔄",
                                url: "https://xexchange.com",
                                color: "from-purple-500 to-indigo-600",
                            },
                        ].map((resource, index) => (
                            <a
                                key={index}
                                href={resource.url}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="group/resource relative block bg-white/80 backdrop-blur-sm rounded-2xl p-6 border border-blue-200/40 hover:shadow-level-3 transition-all duration-300 hover:scale-105"
                            >
                                <div className="flex items-start gap-4">
                                    <div
                                        className={`w-12 h-12 bg-gradient-to-br ${resource.color} rounded-xl flex items-center justify-center text-2xl text-white shadow-sm group-hover/resource:rotate-12 transition-transform duration-300`}
                                    >
                                        {resource.icon}
                                    </div>
                                    <div className="flex-1">
                                        <h4 className="font-bold text-blue-800 mb-2 group-hover/resource:text-blue-900 transition-colors">
                                            {resource.title}
                                        </h4>
                                        <p className="text-blue-600 text-sm leading-relaxed">
                                            {resource.description}
                                        </p>
                                        <div className="mt-3 flex items-center text-blue-500 text-sm font-medium">
                                            Learn more
                                            <svg
                                                className="w-4 h-4 ml-1 group-hover/resource:translate-x-1 transition-transform duration-200"
                                                fill="none"
                                                stroke="currentColor"
                                                viewBox="0 0 24 24"
                                            >
                                                <path
                                                    strokeLinecap="round"
                                                    strokeLinejoin="round"
                                                    strokeWidth={2}
                                                    d="M9 5l7 7-7 7"
                                                />
                                            </svg>
                                        </div>
                                    </div>
                                </div>
                            </a>
                        ))}
                    </div>
                </div>
            </div>

            {/* Ready to Start - Call to Action */}
            <div className="relative overflow-hidden">
                {/* Animated Background */}
                <div className="absolute inset-0 bg-gradient-to-r from-distribute-500 via-amber-500 to-distribute-600 rounded-3xl animate-gradient-shift bg-size-200"></div>

                <div className="relative text-center py-12 px-8 text-white">
                    <div className="max-w-3xl mx-auto">
                        <div className="mb-6">
                            <div className="w-20 h-20 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center text-4xl mx-auto mb-4 animate-bounce-gentle">
                                🚀
                            </div>
                        </div>

                        <h3 className="text-h2 font-bold mb-4 drop-shadow-sm">
                            Ready to Create Your Pool?
                        </h3>
                        <p className="text-body-xl text-white/90 max-w-2xl mx-auto leading-relaxed mb-6">
                            We'll guide you through selecting tokens, setting
                            amounts, and understanding all risks before creating
                            your liquidity pool.
                        </p>

                        {/* Feature Preview */}
                        <div className="flex flex-wrap justify-center gap-4 text-sm">
                            {[
                                "Token Selection",
                                "Amount Configuration",
                                "Risk Assessment",
                                "Transaction Execution",
                            ].map((feature, index) => (
                                <div
                                    key={index}
                                    className="bg-white/20 backdrop-blur-sm rounded-full px-4 py-2 border border-white/30"
                                    style={{
                                        animationDelay: `${index * 100}ms`,
                                    }}
                                >
                                    {feature}
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};
