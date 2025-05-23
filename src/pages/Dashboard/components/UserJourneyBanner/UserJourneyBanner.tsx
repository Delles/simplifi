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
            title: "Ready to democratize your ideas?",
            description:
                "Join thousands of creators, artists, and entrepreneurs who've launched their token economy with SimpliFi",
            action: "Create Your First Token",
            color: "create",
            route: "/app/create-token",
            icon: "🚀",
            badge: "Most Popular",
            milestone: "Getting Started",
        };
    } else if (tokenCount < 3) {
        return {
            title: "Your token economy is taking shape! 🌱",
            description:
                "Take the next step and make your tokens tradable by adding liquidity. This opens up new possibilities for your community.",
            action: "Add Liquidity",
            color: "manage",
            route: "/app/add-liquidity",
            icon: "💧",
            milestone: "Growing",
        };
    } else {
        return {
            title: "You're a token expert! 🎉",
            description:
                "With multiple tokens under your belt, you're ready to help others learn. Share your experience and inspire the next generation of creators.",
            action: "Share Your Story",
            color: "distribute",
            route: "/community",
            icon: "🌟",
            badge: "Expert Level",
            milestone: "Expert",
        };
    }
};

const getDesignSystem = (color: UserJourneyStep["color"]) => {
    switch (color) {
        case "create":
            return {
                gradient:
                    "bg-gradient-to-r from-create-500 via-create-600 to-create-700",
                lightGradient:
                    "bg-gradient-to-r from-create-50 via-blue-50 to-indigo-50",
                border: "border-create-500/20",
                shadow: "shadow-interactive",
                hoverShadow: "hover:shadow-interactive-hover",
                button: "bg-create-500 hover:bg-create-600 shadow-lg hover:shadow-xl",
                badge: "bg-create-100 text-create-700 border-create-200",
                progressBar: "bg-create-500",
                iconBg: "bg-create-500",
                accentColor: "text-create-600",
            };
        case "manage":
            return {
                gradient:
                    "bg-gradient-to-r from-manage-500 via-emerald-500 to-manage-600",
                lightGradient:
                    "bg-gradient-to-r from-manage-50 via-emerald-50 to-green-50",
                border: "border-manage-500/20",
                shadow: "shadow-level-2",
                hoverShadow: "hover:shadow-level-3",
                button: "bg-manage-500 hover:bg-manage-600 shadow-lg hover:shadow-xl",
                badge: "bg-manage-100 text-manage-700 border-manage-200",
                progressBar: "bg-manage-500",
                iconBg: "bg-manage-500",
                accentColor: "text-manage-600",
            };
        case "distribute":
            return {
                gradient:
                    "bg-gradient-to-r from-distribute-500 via-amber-500 to-distribute-600",
                lightGradient:
                    "bg-gradient-to-r from-distribute-50 via-amber-50 to-orange-50",
                border: "border-distribute-500/20",
                shadow: "shadow-level-2",
                hoverShadow: "hover:shadow-level-3",
                button: "bg-distribute-500 hover:bg-distribute-600 shadow-lg hover:shadow-xl",
                badge: "bg-distribute-100 text-distribute-700 border-distribute-200",
                progressBar: "bg-distribute-500",
                iconBg: "bg-distribute-500",
                accentColor: "text-distribute-600",
            };
    }
};

export default function UserJourneyBanner({
    tokenCount,
}: UserJourneyBannerProps) {
    const userJourney = getUserJourneyStep(tokenCount);
    const design = getDesignSystem(userJourney.color);
    const progressPercentage = Math.min((tokenCount / 5) * 100, 100);

    return (
        <div className="mb-8 group">
            {/* Main Banner */}
            <div
                className={`relative overflow-hidden rounded-2xl ${design.lightGradient} border-2 ${design.border} ${design.shadow} ${design.hoverShadow} transition-all duration-300`}
            >
                {/* Decorative Background Elements */}
                <div className="absolute inset-0 opacity-30">
                    <div
                        className={`absolute top-0 right-0 w-64 h-64 ${design.gradient} rounded-full blur-3xl transform translate-x-32 -translate-y-32`}
                    ></div>
                    <div
                        className={`absolute bottom-0 left-0 w-48 h-48 ${design.gradient} rounded-full blur-2xl transform -translate-x-24 translate-y-24`}
                    ></div>
                </div>

                {/* Content */}
                <div className="relative z-10 p-8">
                    <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">
                        {/* Left Content */}
                        <div className="flex-1 space-y-4">
                            {/* Milestone Badge & Title */}
                            <div className="flex flex-col sm:flex-row sm:items-center gap-3">
                                <div className="flex items-center gap-3">
                                    {/* Animated Icon */}
                                    <div
                                        className={`w-12 h-12 ${design.iconBg} rounded-xl flex items-center justify-center text-2xl animate-bounce-gentle shadow-lg`}
                                    >
                                        {userJourney.icon}
                                    </div>

                                    {/* Milestone Badge */}
                                    <div
                                        className={`px-3 py-1 rounded-full text-xs font-medium border ${design.badge} animate-pulse-gentle`}
                                    >
                                        {userJourney.milestone}
                                        {userJourney.badge &&
                                            ` • ${userJourney.badge}`}
                                    </div>
                                </div>
                            </div>

                            {/* Title */}
                            <h3 className="text-2xl lg:text-3xl font-bold text-graphite leading-tight">
                                {userJourney.title}
                            </h3>

                            {/* Description */}
                            <p className="text-lg text-slate leading-relaxed max-w-2xl">
                                {userJourney.description}
                            </p>

                            {/* Progress Indicator for existing tokens */}
                            {tokenCount > 0 && (
                                <div className="bg-white/70 backdrop-blur-sm rounded-xl p-4 border border-white/50 shadow-level-1">
                                    <div className="flex items-center justify-between text-sm mb-2">
                                        <span className="text-slate font-medium">
                                            Your Journey Progress
                                        </span>
                                        <span className="text-graphite font-semibold">
                                            {Math.min(tokenCount, 5)}/5
                                            milestones
                                        </span>
                                    </div>
                                    <div className="w-full bg-gray-200 rounded-full h-3 overflow-hidden">
                                        <div
                                            className={`h-full rounded-full transition-all duration-700 ease-out ${design.progressBar} relative overflow-hidden`}
                                            style={{
                                                width: `${progressPercentage}%`,
                                            }}
                                        >
                                            {/* Animated shine effect */}
                                            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent animate-gradient-shift"></div>
                                        </div>
                                    </div>
                                    <div className="text-xs text-slate mt-1">
                                        {tokenCount < 5
                                            ? `${
                                                  5 - tokenCount
                                              } more to complete your journey`
                                            : "Journey complete! 🎉"}
                                    </div>
                                </div>
                            )}
                        </div>

                        {/* Right CTA */}
                        <div className="flex-shrink-0">
                            <Link
                                to={userJourney.route}
                                className={`group inline-flex items-center gap-3 px-8 py-4 ${design.button} text-white font-semibold rounded-xl transition-all duration-200 transform hover:scale-105 active:scale-95`}
                            >
                                <span className="text-lg">
                                    {userJourney.action}
                                </span>
                                <svg
                                    className="w-5 h-5 transition-transform duration-200 group-hover:translate-x-1"
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
                    </div>
                </div>

                {/* Decorative Corner Elements */}
                <div className="absolute top-4 right-4 opacity-20">
                    <div
                        className={`w-2 h-2 ${design.iconBg} rounded-full animate-ping`}
                    ></div>
                </div>
                <div className="absolute top-6 right-8 opacity-30">
                    <div
                        className={`w-1 h-1 ${design.iconBg} rounded-full animate-pulse`}
                    ></div>
                </div>
            </div>

            {/* Motivational Quote/Tip */}
            {tokenCount === 0 && (
                <div className="mt-4 flex items-center justify-center">
                    <div className="bg-white/80 backdrop-blur-sm rounded-xl px-6 py-3 border border-white/50 shadow-level-1 animate-fade-in-up">
                        <div className="flex items-center gap-2 text-sm text-slate">
                            <span className="text-lg">💡</span>
                            <span className="font-medium">Pro tip:</span>
                            <span>
                                Most creators launch their first token in under
                                10 minutes
                            </span>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
