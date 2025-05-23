interface PlatformStatsData {
    tokensCreated: string;
    activeCreators: string;
    totalAirdrops: string;
}

interface PlatformStatsProps {
    data: PlatformStatsData;
}

const getStatIcon = (label: string) => {
    if (label.includes("Token"))
        return {
            emoji: "🪙",
            gradient: "from-create-500 to-blue-500",
            color: "create",
        };
    if (label.includes("Creator"))
        return {
            emoji: "👥",
            gradient: "from-manage-500 to-emerald-500",
            color: "manage",
        };
    if (label.includes("Airdrop"))
        return {
            emoji: "🎯",
            gradient: "from-distribute-500 to-amber-500",
            color: "distribute",
        };
    return {
        emoji: "📊",
        gradient: "from-gray-500 to-slate-500",
        color: "gray",
    };
};

export default function PlatformStats({ data }: PlatformStatsProps) {
    const stats = [
        {
            label: "Tokens Created",
            value: data.tokensCreated,
            subtitle: "Growing daily",
        },
        {
            label: "Active Creators",
            value: data.activeCreators,
            subtitle: "Building amazing projects",
        },
        {
            label: "Total Airdrops",
            value: data.totalAirdrops,
            subtitle: "Communities rewarded",
        },
    ];

    return (
        <div className="group relative">
            {/* Background gradient overlay */}
            <div className="absolute inset-0 bg-gradient-to-br from-gray-50 via-slate-50 to-blue-50 rounded-2xl opacity-60"></div>

            {/* Decorative background elements */}
            <div className="absolute inset-0 opacity-20">
                <div className="absolute top-0 right-0 w-16 h-16 bg-gradient-to-br from-blue-500 to-indigo-500 rounded-full blur-2xl transform translate-x-8 -translate-y-8"></div>
                <div className="absolute bottom-0 left-0 w-12 h-12 bg-gradient-to-br from-green-500 to-emerald-500 rounded-full blur-xl transform -translate-x-6 translate-y-6"></div>
            </div>

            {/* Main content */}
            <div className="relative backdrop-blur-sm bg-white/90 rounded-2xl border border-white/50 shadow-level-2 hover:shadow-level-3 transition-all duration-300 p-6">
                {/* Header */}
                <div className="flex items-center gap-3 mb-6">
                    <div className="w-12 h-12 bg-gradient-to-br from-gray-700 to-slate-600 rounded-xl flex items-center justify-center text-white text-xl shadow-lg group-hover:scale-110 group-hover:rotate-3 transition-all duration-300">
                        📊
                    </div>
                    <div>
                        <h3 className="text-xl font-bold text-graphite">
                            Platform Growth
                        </h3>
                        <p className="text-sm text-slate font-medium">
                            Real-time metrics
                        </p>
                    </div>
                </div>

                {/* Stats Grid */}
                <div className="space-y-4 mb-6">
                    {stats.map((stat, index) => {
                        const iconData = getStatIcon(stat.label);

                        return (
                            <div
                                key={stat.label}
                                className="group/stat animate-fade-in-up"
                                style={{ animationDelay: `${index * 0.1}s` }}
                            >
                                <div className="bg-white/70 backdrop-blur-sm rounded-xl border border-white/60 shadow-level-1 hover:shadow-level-2 transition-all duration-200 p-4">
                                    <div className="flex items-center justify-between">
                                        <div className="flex items-center gap-3">
                                            {/* Animated icon */}
                                            <div
                                                className={`w-10 h-10 bg-gradient-to-br ${iconData.gradient} rounded-lg flex items-center justify-center text-white text-lg shadow-lg group-hover/stat:scale-110 group-hover/stat:rotate-3 transition-all duration-300`}
                                            >
                                                {iconData.emoji}
                                            </div>

                                            {/* Stat content */}
                                            <div>
                                                <div className="text-sm text-slate font-medium mb-1">
                                                    {stat.label}
                                                </div>
                                                <div className="text-xs text-slate opacity-75">
                                                    {stat.subtitle}
                                                </div>
                                            </div>
                                        </div>

                                        {/* Value with animated counter effect */}
                                        <div className="text-right">
                                            <div className="text-xl font-bold text-graphite mb-1 group-hover/stat:scale-105 transition-transform duration-200">
                                                {stat.value}
                                            </div>
                                            <div className="flex items-center gap-1">
                                                <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                                                <span className="text-xs text-green-600 font-medium">
                                                    Live
                                                </span>
                                            </div>
                                        </div>
                                    </div>

                                    {/* Progress indicator */}
                                    <div className="mt-3">
                                        <div className="w-full h-1 bg-gray-200 rounded-full overflow-hidden">
                                            <div
                                                className={`h-full bg-gradient-to-r ${iconData.gradient} rounded-full animate-pulse`}
                                                style={{
                                                    width: `${
                                                        70 + index * 10
                                                    }%`,
                                                }}
                                            ></div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        );
                    })}
                </div>

                {/* Enhanced Security Badge */}
                <div className="bg-gradient-to-r from-green-50 via-emerald-50 to-teal-50 rounded-xl p-4 border border-green-200/50 mb-4">
                    <div className="flex items-center justify-center gap-3">
                        <div className="w-8 h-8 bg-green-500 rounded-lg flex items-center justify-center text-white text-lg animate-bounce-gentle">
                            🔒
                        </div>
                        <div className="text-center">
                            <div className="text-sm font-bold text-green-800 mb-1">
                                100% Non-Custodial
                            </div>
                            <div className="text-xs text-green-700">
                                Your keys, your tokens - Always in your control
                            </div>
                        </div>
                    </div>
                </div>

                {/* Platform Trust Metrics */}
                <div className="bg-gradient-to-r from-blue-50 via-indigo-50 to-purple-50 rounded-xl p-4 border border-white/30">
                    <div className="flex items-center justify-center gap-6 text-center">
                        <div>
                            <div className="flex items-center justify-center gap-1 mb-1">
                                <span className="text-sm">⚡</span>
                                <div className="text-sm font-bold text-blue-600">
                                    99.9%
                                </div>
                            </div>
                            <div className="text-xs text-slate">Uptime</div>
                        </div>

                        <div className="w-1 h-8 bg-blue-500 rounded-full opacity-20"></div>

                        <div>
                            <div className="flex items-center justify-center gap-1 mb-1">
                                <span className="text-sm">🛡️</span>
                                <div className="text-sm font-bold text-blue-600">
                                    0
                                </div>
                            </div>
                            <div className="text-xs text-slate">
                                Security Issues
                            </div>
                        </div>

                        <div className="w-1 h-8 bg-blue-500 rounded-full opacity-20"></div>

                        <div>
                            <div className="flex items-center justify-center gap-1 mb-1">
                                <span className="text-sm">⭐</span>
                                <div className="text-sm font-bold text-blue-600">
                                    4.9
                                </div>
                            </div>
                            <div className="text-xs text-slate">
                                User Rating
                            </div>
                        </div>
                    </div>
                </div>

                {/* Decorative corner elements */}
                <div className="absolute top-4 right-4 opacity-30">
                    <div className="flex gap-1">
                        <div className="w-1 h-1 bg-green-500 rounded-full animate-ping"></div>
                        <div
                            className="w-1 h-1 bg-blue-500 rounded-full animate-ping"
                            style={{ animationDelay: "0.2s" }}
                        ></div>
                        <div
                            className="w-1 h-1 bg-purple-500 rounded-full animate-ping"
                            style={{ animationDelay: "0.4s" }}
                        ></div>
                    </div>
                </div>
            </div>
        </div>
    );
}
