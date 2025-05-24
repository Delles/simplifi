import { Link } from "react-router-dom";

interface UserJourneyStep {
    title: string;
    description: string;
    action: string;
    color: "create" | "manage" | "distribute";
    route: string;
    icon: string;
    badge?: string;
    milestone?: string;
}

interface UserJourneyBannerProps {
    tokenCount: number;
}

const getUserJourneyStep = (tokenCount: number): UserJourneyStep => {
    if (tokenCount === 0) {
        return {
            title: "Ready to launch your first token?",
            description:
                "Create your token in minutes with our guided wizard. Join thousands of creators who've already started their journey.",
            action: "Create Your First Token",
            color: "create",
            route: "/app/create-token",
            icon: "🚀",
            badge: "Start Here",
            milestone: "Getting Started",
        };
    } else if (tokenCount === 1) {
        return {
            title: "Great start! Let's make your token tradable",
            description:
                "Add liquidity to enable trading and unlock the full potential of your token economy.",
            action: "Add Liquidity",
            color: "manage",
            route: "/app/add-liquidity",
            icon: "💧",
            milestone: "Growing",
        };
    } else if (tokenCount < 3) {
        return {
            title: "Your ecosystem is growing! 🌱",
            description:
                "Consider creating airdrops to reward your community and drive engagement.",
            action: "Start Airdrop Campaign",
            color: "distribute",
            route: "/airdrop",
            icon: "🎯",
            milestone: "Expanding",
        };
    } else {
        return {
            title: "You're becoming a token expert! 🎉",
            description:
                "Share your success story and help inspire the next generation of creators.",
            action: "View Portfolio Analytics",
            color: "distribute",
            route: "/app/my-tokens",
            icon: "📊",
            badge: "Expert",
            milestone: "Expert Level",
        };
    }
};

const getColorClasses = (color: UserJourneyStep["color"]) => {
    switch (color) {
        case "create":
            return {
                bg: "bg-create-50/50",
                border: "border-create-200/50",
                iconBg: "bg-create-500",
                badgeBg: "bg-create-100",
                badgeText: "text-create-700",
                buttonBg: "bg-create-500 hover:bg-create-600",
                accentText: "text-create-600",
            };
        case "manage":
            return {
                bg: "bg-manage-50/50",
                border: "border-manage-200/50",
                iconBg: "bg-manage-500",
                badgeBg: "bg-manage-100",
                badgeText: "text-manage-700",
                buttonBg: "bg-manage-500 hover:bg-manage-600",
                accentText: "text-manage-600",
            };
        case "distribute":
            return {
                bg: "bg-distribute-50/50",
                border: "border-distribute-200/50",
                iconBg: "bg-distribute-500",
                badgeBg: "bg-distribute-100",
                badgeText: "text-distribute-700",
                buttonBg: "bg-distribute-500 hover:bg-distribute-600",
                accentText: "text-distribute-600",
            };
    }
};

export default function UserJourneyBanner({
    tokenCount,
}: UserJourneyBannerProps) {
    const userJourney = getUserJourneyStep(tokenCount);
    const colors = getColorClasses(userJourney.color);

    return (
        <div
            className={`relative rounded-xl ${colors.bg} border ${colors.border} p-6 mb-6 group hover:shadow-level-1 transition-all duration-200`}
        >
            {/* Content */}
            <div className="flex items-center justify-between">
                {/* Left Content */}
                <div className="flex items-center gap-4 flex-1">
                    {/* Icon */}
                    <div
                        className={`w-12 h-12 ${colors.iconBg} rounded-xl flex items-center justify-center text-white text-xl shadow-sm`}
                    >
                        {userJourney.icon}
                    </div>

                    {/* Text Content */}
                    <div className="flex-1">
                        <div className="flex items-center gap-2 mb-1">
                            <h3 className="font-semibold text-graphite text-lg">
                                {userJourney.title}
                            </h3>
                            {userJourney.badge && (
                                <span
                                    className={`px-2 py-0.5 rounded-full text-xs font-medium ${colors.badgeBg} ${colors.badgeText}`}
                                >
                                    {userJourney.badge}
                                </span>
                            )}
                        </div>
                        <p className="text-slate text-sm leading-relaxed max-w-lg">
                            {userJourney.description}
                        </p>

                        {/* Progress indicator for multiple tokens */}
                        {tokenCount > 0 && (
                            <div className="flex items-center gap-2 mt-2">
                                <span
                                    className={`text-xs font-medium ${colors.accentText}`}
                                >
                                    {userJourney.milestone}
                                </span>
                                <div className="flex gap-1">
                                    {[1, 2, 3, 4].map((step) => (
                                        <div
                                            key={step}
                                            className={`w-1.5 h-1.5 rounded-full ${
                                                step <= Math.min(tokenCount, 4)
                                                    ? colors.iconBg
                                                    : "bg-gray-300"
                                            }`}
                                        />
                                    ))}
                                </div>
                                <span className="text-xs text-slate">
                                    {tokenCount}/4+ tokens
                                </span>
                            </div>
                        )}
                    </div>
                </div>

                {/* Right CTA */}
                <Link
                    to={userJourney.route}
                    className={`flex items-center gap-2 px-4 py-2.5 ${colors.buttonBg} text-white font-medium rounded-lg transition-all duration-200 transform hover:scale-105 shadow-sm hover:shadow-md`}
                >
                    <span>{userJourney.action}</span>
                    <svg
                        className="w-4 h-4"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                    >
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M13 7l5 5m0 0l-5 5m5-5H6"
                        />
                    </svg>
                </Link>
            </div>

            {/* Quick tip for first-time users */}
            {tokenCount === 0 && (
                <div className="mt-4 pt-4 border-t border-create-200/30">
                    <div className="flex items-center gap-2 text-xs text-slate">
                        <span>💡</span>
                        <span>
                            <strong>Quick tip:</strong> Most creators launch
                            their first token in under 10 minutes
                        </span>
                    </div>
                </div>
            )}
        </div>
    );
}
