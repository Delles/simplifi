import { Link } from "react-router-dom";

interface LearningProgressData {
    completedSteps: number;
    totalSteps: number;
    currentTopic: string;
    nextRecommendation: string;
}

interface LearningProgressProps {
    data: LearningProgressData;
}

const getLevelInfo = (completedSteps: number, totalSteps: number) => {
    const progressPercentage = (completedSteps / totalSteps) * 100;

    if (progressPercentage === 0) {
        return {
            level: "Beginner",
            emoji: "🌱",
            color: "create",
            bgGradient: "from-create-50 to-blue-50",
        };
    } else if (progressPercentage < 50) {
        return {
            level: "Learning",
            emoji: "📚",
            color: "create",
            bgGradient: "from-create-50 to-indigo-50",
        };
    } else if (progressPercentage < 80) {
        return {
            level: "Growing",
            emoji: "🚀",
            color: "manage",
            bgGradient: "from-manage-50 to-emerald-50",
        };
    } else if (progressPercentage < 100) {
        return {
            level: "Expert",
            emoji: "⭐",
            color: "distribute",
            bgGradient: "from-distribute-50 to-amber-50",
        };
    } else {
        return {
            level: "Master",
            emoji: "👑",
            color: "distribute",
            bgGradient: "from-purple-50 to-pink-50",
        };
    }
};

const getColorClasses = (color: string) => {
    switch (color) {
        case "create":
            return {
                progressBg: "bg-create-500",
                textColor: "text-create-600",
                badgeBg: "bg-create-100",
                badgeText: "text-create-700",
                buttonBg: "bg-create-500 hover:bg-create-600",
            };
        case "manage":
            return {
                progressBg: "bg-manage-500",
                textColor: "text-manage-600",
                badgeBg: "bg-manage-100",
                badgeText: "text-manage-700",
                buttonBg: "bg-manage-500 hover:bg-manage-600",
            };
        case "distribute":
            return {
                progressBg: "bg-distribute-500",
                textColor: "text-distribute-600",
                badgeBg: "bg-distribute-100",
                badgeText: "text-distribute-700",
                buttonBg: "bg-distribute-500 hover:bg-distribute-600",
            };
        default:
            return {
                progressBg: "bg-create-500",
                textColor: "text-create-600",
                badgeBg: "bg-create-100",
                badgeText: "text-create-700",
                buttonBg: "bg-create-500 hover:bg-create-600",
            };
    }
};

export default function LearningProgress({ data }: LearningProgressProps) {
    const progressPercentage = (data.completedSteps / data.totalSteps) * 100;
    const levelInfo = getLevelInfo(data.completedSteps, data.totalSteps);
    const colorClasses = getColorClasses(levelInfo.color);

    return (
        <div className="group relative">
            {/* Background gradient overlay */}
            <div
                className={`absolute inset-0 bg-gradient-to-br ${levelInfo.bgGradient} rounded-2xl opacity-60`}
            ></div>

            {/* Decorative background elements */}
            <div className="absolute inset-0 opacity-20">
                <div className="absolute top-0 right-0 w-16 h-16 bg-gradient-to-br from-create-500 to-manage-500 rounded-full blur-2xl transform translate-x-8 -translate-y-8"></div>
                <div className="absolute bottom-0 left-0 w-12 h-12 bg-gradient-to-br from-distribute-500 to-amber-500 rounded-full blur-xl transform -translate-x-6 translate-y-6"></div>
            </div>

            {/* Main content */}
            <div className="relative backdrop-blur-sm bg-white/90 rounded-2xl border border-white/50 shadow-level-2 hover:shadow-level-3 transition-all duration-300 p-6">
                {/* Header */}
                <div className="flex items-center justify-between mb-6">
                    <div className="flex items-center gap-3">
                        <div
                            className={`w-12 h-12 ${colorClasses.progressBg} rounded-xl flex items-center justify-center text-white text-xl shadow-lg group-hover:scale-110 group-hover:rotate-3 transition-all duration-300`}
                        >
                            📈
                        </div>
                        <div>
                            <h3 className="text-xl font-bold text-graphite">
                                Learning Journey
                            </h3>
                            <div
                                className={`inline-flex items-center px-3 py-1 ${colorClasses.badgeBg} ${colorClasses.badgeText} rounded-full text-xs font-semibold`}
                            >
                                <span className="mr-1">{levelInfo.emoji}</span>
                                {levelInfo.level}
                            </div>
                        </div>
                    </div>
                </div>

                {/* Enhanced Progress Section */}
                <div className="mb-6">
                    <div className="flex justify-between items-center mb-3">
                        <span className="text-sm font-medium text-slate">
                            Overall Progress
                        </span>
                        <div className="flex items-center gap-2">
                            <span className="text-lg font-bold text-graphite">
                                {data.completedSteps}/{data.totalSteps}
                            </span>
                            <span className="text-xs text-slate">
                                ({Math.round(progressPercentage)}%)
                            </span>
                        </div>
                    </div>

                    {/* Animated Progress Bar */}
                    <div className="relative w-full bg-gray-200 rounded-full h-3 overflow-hidden">
                        <div
                            className={`h-full rounded-full transition-all duration-700 ease-out ${colorClasses.progressBg} relative overflow-hidden`}
                            style={{ width: `${progressPercentage}%` }}
                        >
                            {/* Animated shine effect */}
                            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent animate-gradient-shift"></div>
                        </div>

                        {/* Progress markers */}
                        <div className="absolute inset-0 flex justify-between items-center px-1">
                            {[...Array(data.totalSteps)].map((_, index) => (
                                <div
                                    key={index}
                                    className={`w-1 h-1 rounded-full ${
                                        index < data.completedSteps
                                            ? "bg-white"
                                            : "bg-gray-400"
                                    }`}
                                />
                            ))}
                        </div>
                    </div>
                </div>

                {/* Current Topic */}
                <div className="bg-white/70 backdrop-blur-sm rounded-xl p-4 border border-white/50 shadow-level-1 mb-6">
                    <div className="flex items-center gap-3 mb-2">
                        <span className="text-lg">📖</span>
                        <span className="text-sm font-medium text-slate">
                            Currently Studying
                        </span>
                    </div>
                    <h4
                        className={`text-lg font-semibold ${colorClasses.textColor}`}
                    >
                        {data.currentTopic}
                    </h4>
                </div>

                {/* Continue Learning Button */}
                <Link
                    to="/app/learn"
                    className={`group/btn w-full inline-flex items-center justify-center gap-3 px-6 py-3 ${colorClasses.buttonBg} text-white font-semibold rounded-xl shadow-lg hover:shadow-xl transition-all duration-200 transform hover:scale-105 mb-4`}
                >
                    <span className="text-lg group-hover/btn:scale-110 transition-transform duration-200">
                        🎯
                    </span>
                    <span>Continue Learning</span>
                    <svg
                        className="w-5 h-5 group-hover/btn:translate-x-1 transition-transform duration-200"
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

                {/* Next Recommendation */}
                <div
                    className={`bg-gradient-to-r ${levelInfo.bgGradient} rounded-xl p-4 border border-white/30`}
                >
                    <div className="flex items-center gap-2 mb-2">
                        <span className="text-lg">💡</span>
                        <span className="text-sm font-semibold text-graphite">
                            Up Next:
                        </span>
                    </div>
                    <p className="text-sm text-slate leading-relaxed">
                        {data.nextRecommendation}
                    </p>
                </div>

                {/* Achievement Progress */}
                {progressPercentage > 0 && (
                    <div className="mt-4 flex items-center justify-center">
                        <div className="bg-white/70 backdrop-blur-sm rounded-xl px-4 py-2 border border-white/50">
                            <div className="flex items-center gap-2 text-xs">
                                <span className="text-sm">🏆</span>
                                <span className="font-medium text-graphite">
                                    {progressPercentage >= 100
                                        ? "Journey Complete!"
                                        : progressPercentage >= 80
                                        ? "Almost there!"
                                        : progressPercentage >= 50
                                        ? "Great progress!"
                                        : "Keep learning!"}
                                </span>
                            </div>
                        </div>
                    </div>
                )}

                {/* Decorative corner elements */}
                <div className="absolute top-4 right-4 opacity-30">
                    <div className="flex gap-1">
                        <div className="w-1 h-1 bg-create-500 rounded-full animate-ping"></div>
                        <div
                            className="w-1 h-1 bg-manage-500 rounded-full animate-ping"
                            style={{ animationDelay: "0.2s" }}
                        ></div>
                    </div>
                </div>
            </div>
        </div>
    );
}
