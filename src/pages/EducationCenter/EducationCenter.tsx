import { useState } from "react";
import { Link } from "react-router-dom";

// Education Center - Interactive Learning Hub
export default function EducationCenter() {
    const [activeTab, setActiveTab] = useState<
        "overview" | "features" | "how-it-works" | "personas"
    >("overview");
    const [selectedPersona, setSelectedPersona] = useState<string | null>(null);

    const personas = [
        {
            id: "creator",
            title: "🎨 Creator & Artist",
            description: "Fan tokens, community engagement, art collectibles",
            useCase:
                "Independent artist creates fan tokens for exclusive content access",
            examples: [
                "Fan community tokens",
                "Limited edition drops",
                "Creator monetization",
            ],
            icon: "🎨",
        },
        {
            id: "startup",
            title: "🚀 Startup & Entrepreneur",
            description: "Utility tokens, fundraising, customer loyalty",
            useCase: "SaaS startup launches utility token for premium features",
            examples: [
                "Product utility tokens",
                "Early supporter rewards",
                "Governance tokens",
            ],
            icon: "🚀",
        },
        {
            id: "business",
            title: "🏢 Small-Medium Business",
            description:
                "Loyalty programs, customer engagement, local currencies",
            useCase:
                "Local coffee shop creates loyalty tokens for regular customers",
            examples: [
                "Customer loyalty points",
                "Local business rewards",
                "Community currencies",
            ],
            icon: "🏢",
        },
        {
            id: "community",
            title: "👥 Community Manager",
            description:
                "DAO governance, community rewards, participation incentives",
            useCase:
                "Gaming community distributes tokens for tournament participation",
            examples: [
                "DAO governance tokens",
                "Community participation rewards",
                "Event incentives",
            ],
            icon: "👥",
        },
        {
            id: "developer",
            title: "⚡ Developer",
            description: "Rapid prototyping, MVP launches, testing tokens",
            useCase:
                "DeFi developer quickly launches governance token for new protocol",
            examples: ["Prototype tokens", "MVP testing", "Quick deployments"],
            icon: "⚡",
        },
        {
            id: "newcomer",
            title: "🌟 Blockchain Newcomer",
            description: "Learning, experimenting, educational projects",
            useCase: "Teacher creates classroom tokens for student rewards",
            examples: [
                "Educational experiments",
                "Learning projects",
                "Hobby tokens",
            ],
            icon: "🌟",
        },
    ];

    const features = [
        {
            title: "Guided Token Creation",
            description: "Step-by-step wizard with educational tooltips",
            benefits: [
                "No coding required",
                "Built-in best practices",
                "Risk assessment",
            ],
            demo: "Interactive token configurator with real-time preview",
        },
        {
            title: "Smart Batch Airdrops",
            description: "Intelligent distribution with cost optimization",
            benefits: [
                "CSV upload support",
                "Automatic batching",
                "Cost-effective",
            ],
            demo: "Upload recipients and see distribution strategy",
        },
        {
            title: "xExchange Integration",
            description: "Educational liquidity provision with safety checks",
            benefits: [
                "Price impact warnings",
                "Risk education",
                "Safety first",
            ],
            demo: "Liquidity simulation with risk indicators",
        },
        {
            title: "Educational Guidance",
            description: "Contextual help throughout your journey",
            benefits: [
                "Plain language explanations",
                "Visual guides",
                "Best practices",
            ],
            demo: "Interactive tutorials and help system",
        },
        {
            title: "Post-Launch Management",
            description: "Complete token lifecycle management",
            benefits: ["Owner dashboard", "Property management", "Analytics"],
            demo: "Token management interface preview",
        },
        {
            title: "Non-Custodial Security",
            description: "Your keys, your tokens approach",
            benefits: [
                "Complete ownership",
                "Secure transactions",
                "Privacy focused",
            ],
            demo: "Security model explanation",
        },
    ];

    const steps = [
        {
            number: 1,
            title: "Connect & Choose",
            description:
                "Connect your MultiversX wallet securely and select your goal",
            details:
                "Choose from token creation, management, or distribution. Our educational onboarding helps you understand what's possible.",
            timeEstimate: "2 minutes",
        },
        {
            number: 2,
            title: "Follow Guided Wizards",
            description: "Use step-by-step wizards with built-in education",
            details:
                "Configure properties, upload lists, set parameters—all with clear explanations and risk warnings.",
            timeEstimate: "5-10 minutes",
        },
        {
            number: 3,
            title: "Review & Execute",
            description:
                "Review configuration with cost breakdowns and security checks",
            details:
                "Understand exactly what will happen and what it costs before signing any transactions.",
            timeEstimate: "2-3 minutes",
        },
        {
            number: 4,
            title: "Manage & Grow",
            description:
                "Use your dashboard to manage and grow your token ecosystem",
            details:
                "Ongoing tools for community building, analytics, and token lifecycle management.",
            timeEstimate: "Ongoing",
        },
    ];

    return (
        <div className="min-h-screen bg-gradient-to-br from-app-canvas to-cloud-white">
            {/* Hero Section */}
            <section className="py-16 md:py-20">
                <div className="container mx-auto px-6 text-center">
                    <div className="max-w-4xl mx-auto">
                        <h1 className="text-h1 font-bold text-graphite mb-6">
                            Learn How to{" "}
                            <span className="bg-gradient-to-r from-theme-blue to-theme-blue-dark bg-clip-text text-transparent">
                                Democratize Token Creation
                            </span>
                        </h1>
                        <p className="text-xl text-slate leading-relaxed mb-8">
                            Discover how SimpliFi makes blockchain token
                            creation as simple as creating a social media post.
                            No technical knowledge required—just your creativity
                            and vision.
                        </p>

                        {/* Interactive Navigation Tabs */}
                        <div className="bg-white rounded-2xl p-2 shadow-level-1 border border-ash/20 inline-flex mb-12">
                            {[
                                {
                                    id: "overview",
                                    label: "Overview",
                                    icon: "🌟",
                                },
                                {
                                    id: "features",
                                    label: "Features",
                                    icon: "⚡",
                                },
                                {
                                    id: "how-it-works",
                                    label: "How It Works",
                                    icon: "🔧",
                                },
                                {
                                    id: "personas",
                                    label: "For You",
                                    icon: "👤",
                                },
                            ].map((tab) => (
                                <button
                                    key={tab.id}
                                    onClick={() =>
                                        setActiveTab(
                                            tab.id as
                                                | "overview"
                                                | "features"
                                                | "how-it-works"
                                                | "personas"
                                        )
                                    }
                                    className={`px-6 py-3 rounded-xl font-medium transition-all duration-300 ${
                                        activeTab === tab.id
                                            ? "bg-theme-blue text-white shadow-interactive"
                                            : "text-slate hover:text-theme-blue hover:bg-theme-blue/5"
                                    }`}
                                >
                                    <span className="mr-2">{tab.icon}</span>
                                    {tab.label}
                                </button>
                            ))}
                        </div>
                    </div>
                </div>
            </section>

            {/* Dynamic Content Based on Active Tab */}
            <section className="pb-20">
                <div className="container mx-auto px-6">
                    {/* Overview Tab */}
                    {activeTab === "overview" && (
                        <div className="max-w-4xl mx-auto">
                            <div className="bg-white rounded-3xl p-8 md:p-12 shadow-level-2 border border-ash/20 mb-12">
                                <h2 className="text-3xl font-bold text-graphite mb-6 text-center">
                                    Making Token Creation Accessible to Everyone
                                </h2>

                                <div className="grid md:grid-cols-2 gap-8 mb-8">
                                    <div>
                                        <h3 className="text-xl font-semibold text-graphite mb-4">
                                            🎯 Our Mission
                                        </h3>
                                        <p className="text-slate leading-relaxed">
                                            To democratize token creation on
                                            MultiversX by providing intuitive,
                                            educational tools that empower
                                            creators, entrepreneurs, and
                                            communities to launch and manage
                                            their token ecosystems without
                                            technical barriers.
                                        </p>
                                    </div>
                                    <div>
                                        <h3 className="text-xl font-semibold text-graphite mb-4">
                                            🌟 Our Vision
                                        </h3>
                                        <p className="text-slate leading-relaxed">
                                            A world where anyone with a creative
                                            vision can create, distribute, and
                                            manage tokens as easily as posting
                                            on social media—unlocking new
                                            possibilities for community building
                                            and economic innovation.
                                        </p>
                                    </div>
                                </div>

                                <div className="bg-gradient-to-r from-education-background to-digital-lavender/10 rounded-2xl p-6 border border-education-border">
                                    <h3 className="text-xl font-semibold text-graphite mb-4 flex items-center">
                                        <svg
                                            className="w-6 h-6 mr-2 text-education-primary"
                                            fill="currentColor"
                                            viewBox="0 0 20 20"
                                        >
                                            <path
                                                fillRule="evenodd"
                                                d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z"
                                                clipRule="evenodd"
                                            />
                                        </svg>
                                        Why SimpliFi?
                                    </h3>
                                    <div className="grid md:grid-cols-3 gap-4">
                                        <div className="text-center">
                                            <div className="text-2xl mb-2">
                                                🛡️
                                            </div>
                                            <h4 className="font-medium text-graphite mb-1">
                                                Secure & Non-Custodial
                                            </h4>
                                            <p className="text-sm text-slate">
                                                Your keys, your tokens. Always.
                                            </p>
                                        </div>
                                        <div className="text-center">
                                            <div className="text-2xl mb-2">
                                                📚
                                            </div>
                                            <h4 className="font-medium text-graphite mb-1">
                                                Educational First
                                            </h4>
                                            <p className="text-sm text-slate">
                                                Learn while you create.
                                            </p>
                                        </div>
                                        <div className="text-center">
                                            <div className="text-2xl mb-2">
                                                🎨
                                            </div>
                                            <h4 className="font-medium text-graphite mb-1">
                                                Creator Focused
                                            </h4>
                                            <p className="text-sm text-slate">
                                                Built for real use cases.
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}

                    {/* Features Tab */}
                    {activeTab === "features" && (
                        <div className="max-w-6xl mx-auto">
                            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                                {features.map((feature, index) => (
                                    <div
                                        key={index}
                                        className="bg-white rounded-2xl p-6 shadow-level-1 border border-ash/20 hover:shadow-level-2 hover:-translate-y-1 transition-all duration-300 group"
                                    >
                                        <h3 className="text-xl font-semibold text-graphite mb-3 group-hover:text-theme-blue transition-colors duration-300">
                                            {feature.title}
                                        </h3>
                                        <p className="text-slate mb-4">
                                            {feature.description}
                                        </p>

                                        <div className="mb-4">
                                            <h4 className="font-medium text-graphite mb-2">
                                                Key Benefits:
                                            </h4>
                                            <ul className="text-sm text-slate space-y-1">
                                                {feature.benefits.map(
                                                    (benefit, i) => (
                                                        <li
                                                            key={i}
                                                            className="flex items-center"
                                                        >
                                                            <svg
                                                                className="w-4 h-4 mr-2 text-success"
                                                                fill="currentColor"
                                                                viewBox="0 0 20 20"
                                                            >
                                                                <path
                                                                    fillRule="evenodd"
                                                                    d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                                                                    clipRule="evenodd"
                                                                />
                                                            </svg>
                                                            {benefit}
                                                        </li>
                                                    )
                                                )}
                                            </ul>
                                        </div>

                                        <div className="bg-education-background rounded-lg p-3 border border-education-border">
                                            <p className="text-sm text-education-primary font-medium">
                                                🎯 Demo: {feature.demo}
                                            </p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}

                    {/* How It Works Tab */}
                    {activeTab === "how-it-works" && (
                        <div className="max-w-4xl mx-auto">
                            <div className="relative">
                                {steps.map((step, index) => (
                                    <div
                                        key={index}
                                        className="flex items-start mb-12 last:mb-0"
                                    >
                                        {/* Step Number */}
                                        <div className="flex-shrink-0 mr-6">
                                            <div className="w-16 h-16 bg-theme-blue text-white rounded-2xl flex items-center justify-center text-xl font-bold shadow-level-2">
                                                {step.number}
                                            </div>
                                        </div>

                                        {/* Step Content */}
                                        <div className="flex-1 bg-white rounded-2xl p-6 shadow-level-1 border border-ash/20">
                                            <div className="flex justify-between items-start mb-4">
                                                <h3 className="text-xl font-semibold text-graphite">
                                                    {step.title}
                                                </h3>
                                                <span className="bg-education-background text-education-primary text-sm px-3 py-1 rounded-badge font-medium">
                                                    {step.timeEstimate}
                                                </span>
                                            </div>
                                            <p className="text-slate mb-4">
                                                {step.description}
                                            </p>
                                            <p className="text-sm text-slate/80 bg-education-background rounded-lg p-3 border border-education-border">
                                                💡 {step.details}
                                            </p>
                                        </div>

                                        {/* Connection Line */}
                                        {index < steps.length - 1 && (
                                            <div className="absolute left-8 mt-16 w-0.5 h-12 bg-gradient-to-b from-theme-blue/40 to-theme-blue/20"></div>
                                        )}
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}

                    {/* Personas Tab */}
                    {activeTab === "personas" && (
                        <div className="max-w-6xl mx-auto">
                            <div className="text-center mb-12">
                                <h2 className="text-3xl font-bold text-graphite mb-4">
                                    Find Your Token Creation Journey
                                </h2>
                                <p className="text-xl text-slate">
                                    Discover how SimpliFi can help achieve your
                                    specific goals
                                </p>
                            </div>

                            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                                {personas.map((persona) => (
                                    <div
                                        key={persona.id}
                                        className={`bg-white rounded-2xl p-6 border transition-all duration-300 cursor-pointer ${
                                            selectedPersona === persona.id
                                                ? "border-theme-blue shadow-level-2 -translate-y-1"
                                                : "border-ash/20 hover:border-theme-blue/30 hover:shadow-level-1 hover:-translate-y-0.5"
                                        }`}
                                        onClick={() =>
                                            setSelectedPersona(
                                                selectedPersona === persona.id
                                                    ? null
                                                    : persona.id
                                            )
                                        }
                                    >
                                        <div className="text-center mb-4">
                                            <div className="text-4xl mb-2">
                                                {persona.icon}
                                            </div>
                                            <h3 className="text-xl font-semibold text-graphite mb-2">
                                                {persona.title}
                                            </h3>
                                            <p className="text-slate text-sm">
                                                {persona.description}
                                            </p>
                                        </div>

                                        {selectedPersona === persona.id && (
                                            <div className="border-t border-ash/20 pt-4 mt-4">
                                                <div className="mb-4">
                                                    <h4 className="font-medium text-graphite mb-2">
                                                        Example Use Case:
                                                    </h4>
                                                    <p className="text-sm text-slate bg-education-background rounded-lg p-3 border border-education-border">
                                                        {persona.useCase}
                                                    </p>
                                                </div>

                                                <div>
                                                    <h4 className="font-medium text-graphite mb-2">
                                                        Perfect For:
                                                    </h4>
                                                    <ul className="space-y-1">
                                                        {persona.examples.map(
                                                            (example, i) => (
                                                                <li
                                                                    key={i}
                                                                    className="text-sm text-slate flex items-center"
                                                                >
                                                                    <svg
                                                                        className="w-3 h-3 mr-2 text-success"
                                                                        fill="currentColor"
                                                                        viewBox="0 0 20 20"
                                                                    >
                                                                        <path
                                                                            fillRule="evenodd"
                                                                            d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                                                                            clipRule="evenodd"
                                                                        />
                                                                    </svg>
                                                                    {example}
                                                                </li>
                                                            )
                                                        )}
                                                    </ul>
                                                </div>
                                            </div>
                                        )}
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}
                </div>
            </section>

            {/* Call to Action */}
            <section className="py-16 bg-gradient-to-r from-theme-blue to-theme-blue-dark">
                <div className="container mx-auto px-6 text-center">
                    <div className="max-w-3xl mx-auto">
                        <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
                            Ready to Start Your Token Journey?
                        </h2>
                        <p className="text-xl text-white/90 mb-8">
                            Join thousands of creators, entrepreneurs, and
                            communities already building their token ecosystems
                            with SimpliFi's guided approach.
                        </p>

                        <div className="flex flex-col sm:flex-row gap-4 justify-center">
                            <Link
                                to="/"
                                className="bg-white text-theme-blue font-semibold py-4 px-8 text-lg rounded-xl hover:bg-cloud-white hover:-translate-y-1 transition-all duration-300 shadow-level-2 hover:shadow-level-3"
                            >
                                Start Creating Now
                            </Link>
                            <Link
                                to="/community"
                                className="border-2 border-white/30 text-white font-semibold py-4 px-8 text-lg rounded-xl hover:border-white/60 hover:bg-white/10 hover:-translate-y-1 transition-all duration-300"
                            >
                                View Success Stories
                            </Link>
                        </div>

                        <p className="text-white/70 text-sm mt-6">
                            🔒 Always non-custodial • 📚 Education-first
                            approach • 🚀 Built for MultiversX
                        </p>
                    </div>
                </div>
            </section>
        </div>
    );
}
