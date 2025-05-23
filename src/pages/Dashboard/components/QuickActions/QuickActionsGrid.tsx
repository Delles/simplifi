import ActionCategory from "./ActionCategory";

interface QuickActionsGridProps {
    tokenCount: number;
}

export default function QuickActionsGrid({
    tokenCount,
}: QuickActionsGridProps) {
    const createActions = [
        {
            type: "primary" as const,
            title: "Launch New Token",
            description: "Create your token in minutes with our guided wizard",
            route: "/app/create-token",
            icon: "🚀",
            subtitle: "Popular with creators & startups",
        },
        {
            type: "secondary" as const,
            title: "Learn Token Basics",
            description: "Understand tokenomics",
            route: "/app/learn",
            icon: "📚",
        },
    ];

    const manageActions = [
        {
            type: "primary" as const,
            title: "Token Portfolio",
            description: "Monitor and control your token ecosystem",
            route: "/app/my-tokens",
            icon: "📊",
            subtitle: `${tokenCount} tokens managed`,
        },
        {
            type: "secondary" as const,
            title: "Add Liquidity",
            description: "Make token tradable",
            route: "/app/add-liquidity",
            icon: "💧",
        },
    ];

    const distributeActions = [
        {
            type: "primary" as const,
            title: "Airdrop Campaign",
            description: "Reward your community with batch distributions",
            route: "/airdrop",
            icon: "🎯",
            subtitle: "Perfect for community growth",
        },
        {
            type: "secondary" as const,
            title: "Join Community",
            description: "Connect with creators",
            route: "/community",
            icon: "👥",
        },
    ];

    return (
        <div className="mb-12">
            <div className="mb-8 text-center animate-fade-in-up">
                <div className="inline-flex items-center gap-3 mb-4">
                    <div className="w-2 h-2 bg-create-500 rounded-full animate-pulse"></div>
                    <h2 className="text-3xl font-bold text-graphite">
                        Quick Actions
                    </h2>
                    <div
                        className="w-2 h-2 bg-distribute-500 rounded-full animate-pulse"
                        style={{ animationDelay: "0.5s" }}
                    ></div>
                </div>
                <p className="text-lg text-slate max-w-2xl mx-auto">
                    Everything you need to create, manage, and distribute tokens
                    - organized by your current journey stage
                </p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 xl:gap-12">
                <div
                    className="animate-fade-in-up"
                    style={{ animationDelay: "0.1s" }}
                >
                    <ActionCategory
                        title="Create"
                        color="create"
                        actions={createActions}
                    />
                </div>

                <div
                    className="animate-fade-in-up"
                    style={{ animationDelay: "0.2s" }}
                >
                    <ActionCategory
                        title="Manage"
                        color="manage"
                        actions={manageActions}
                    />
                </div>

                <div
                    className="animate-fade-in-up"
                    style={{ animationDelay: "0.3s" }}
                >
                    <ActionCategory
                        title="Distribute"
                        color="distribute"
                        actions={distributeActions}
                    />
                </div>
            </div>

            <div
                className="mt-12 text-center animate-fade-in-up"
                style={{ animationDelay: "0.4s" }}
            >
                <div className="bg-white/80 backdrop-blur-sm rounded-2xl px-8 py-6 border border-white/50 shadow-level-1 max-w-4xl mx-auto">
                    <div className="flex items-center justify-center gap-4 mb-3">
                        <span className="text-2xl">💡</span>
                        <h3 className="text-lg font-semibold text-graphite">
                            Pro Tips
                        </h3>
                        <span className="text-2xl">🎯</span>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-sm">
                        <div className="text-create-600">
                            <span className="font-medium">New to tokens?</span>{" "}
                            Start with our guided creation wizard
                        </div>
                        <div className="text-manage-600">
                            <span className="font-medium">
                                Growing your project?
                            </span>{" "}
                            Add liquidity to enable trading
                        </div>
                        <div className="text-distribute-600">
                            <span className="font-medium">
                                Building community?
                            </span>{" "}
                            Use airdrops for engagement
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
