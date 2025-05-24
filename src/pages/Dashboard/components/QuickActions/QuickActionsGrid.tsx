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
            title: "Create Token",
            description: "Launch in minutes",
            route: "/app/create-token",
            icon: "🚀",
            subtitle: tokenCount === 0 ? "Start here" : "Create another",
        },
        {
            type: "secondary" as const,
            title: "Learn Basics",
            description: "Token fundamentals",
            route: "/app/learn",
            icon: "📚",
        },
    ];

    const manageActions = [
        {
            type: "primary" as const,
            title: tokenCount > 0 ? "My Tokens" : "Token Portfolio",
            description:
                tokenCount > 0 ? `${tokenCount} tokens` : "Coming soon",
            route: "/app/my-tokens",
            icon: "📊",
            subtitle:
                tokenCount > 0 ? "Manage & monitor" : "Create first token",
        },
        {
            type: "secondary" as const,
            title: "Add Liquidity",
            description: tokenCount > 0 ? "Enable trading" : "After creation",
            route: "/app/add-liquidity",
            icon: "💧",
        },
    ];

    const distributeActions = [
        {
            type: "primary" as const,
            title: "Airdrop",
            description: tokenCount > 0 ? "Reward community" : "Coming soon",
            route: "/airdrop",
            icon: "🎯",
            subtitle:
                tokenCount > 0 ? "Batch distribution" : "Create token first",
        },
        {
            type: "secondary" as const,
            title: "Community",
            description: "Connect & share",
            route: "/community",
            icon: "👥",
        },
    ];

    return (
        <div className="mb-8">
            <div className="mb-6">
                <h2 className="text-xl font-bold text-graphite mb-2">
                    Quick Actions
                </h2>
                <p className="text-sm text-slate">
                    {tokenCount === 0 &&
                        "Everything you need to get started with token creation"}
                    {tokenCount > 0 &&
                        tokenCount < 3 &&
                        "Manage your tokens and grow your ecosystem"}
                    {tokenCount >= 3 &&
                        "Advanced tools for experienced creators"}
                </p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                <ActionCategory
                    title="Create"
                    color="create"
                    actions={createActions}
                />
                <ActionCategory
                    title="Manage"
                    color="manage"
                    actions={manageActions}
                />
                <ActionCategory
                    title="Distribute"
                    color="distribute"
                    actions={distributeActions}
                />
            </div>
        </div>
    );
}
