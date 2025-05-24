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
        };
    } else if (progressPercentage < 50) {
        return {
            level: "Learning",
            emoji: "📚",
            color: "create",
        };
    } else if (progressPercentage < 80) {
        return {
            level: "Growing",
            emoji: "🚀",
            color: "manage",
        };
    } else if (progressPercentage < 100) {
        return {
            level: "Expert",
            emoji: "⭐",
            color: "distribute",
        };
    } else {
        return {
            level: "Master",
            emoji: "👑",
            color: "distribute",
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
                iconBg: "bg-create-500",
            };
        case "manage":
            return {
                progressBg: "bg-manage-500",
                textColor: "text-manage-600",
                badgeBg: "bg-manage-100",
                badgeText: "text-manage-700",
                buttonBg: "bg-manage-500 hover:bg-manage-600",
                iconBg: "bg-manage-500",
            };
        case "distribute":
            return {
                progressBg: "bg-distribute-500",
                textColor: "text-distribute-600",
                badgeBg: "bg-distribute-100",
                badgeText: "text-distribute-700",
                buttonBg: "bg-distribute-500 hover:bg-distribute-600",
                iconBg: "bg-distribute-500",
            };
        default:
            return {
                progressBg: "bg-create-500",
                textColor: "text-create-600",
                badgeBg: "bg-create-100",
                badgeText: "text-create-700",
                buttonBg: "bg-create-500 hover:bg-create-600",
                iconBg: "bg-create-500",
            };
    }
};

export default function LearningProgress({ data }: LearningProgressProps) {
    const progressPercentage = (data.completedSteps / data.totalSteps) * 100;
    const levelInfo = getLevelInfo(data.completedSteps, data.totalSteps);
    const colorClasses = getColorClasses(levelInfo.color);

    return (
        <div className="bg-white/90 rounded-xl border border-ash/30 shadow-level-1 hover:shadow-level-2 transition-all duration-200 p-6 flex-1">
            {/* Header */}
            <div className="flex items-center justify-between mb-6">
                <div className="flex items-center gap-4">
                    <div
                        className={`w-12 h-12 ${colorClasses.iconBg} rounded-xl flex items-center justify-center text-white text-lg`}
                    >
                        📈
                    </div>
                    <div>
                        <h3 className="text-2xl font-bold text-graphite">
                            Learning Progress
                        </h3>
                        <div
                            className={`inline-flex items-center px-3 py-1 ${colorClasses.badgeBg} ${colorClasses.badgeText} rounded-lg text-sm font-medium`}
                        >
                            <span className="mr-1">{levelInfo.emoji}</span>
                            {levelInfo.level}
                        </div>
                    </div>
                </div>
                <div className="text-center">
                    <div className="text-3xl font-bold text-graphite">
                        {data.completedSteps}/{data.totalSteps}
                    </div>
                    <div className="text-sm text-slate">
                        {Math.round(progressPercentage)}% Complete
                    </div>
                </div>
            </div>

            {/* Progress Bar */}
            <div className="mb-6">
                <div className="w-full bg-gray-200 rounded-full h-3">
                    <div
                        className={`h-full rounded-full transition-all duration-500 ${colorClasses.progressBg}`}
                        style={{ width: `${progressPercentage}%` }}
                    />
                </div>
            </div>

            {/* Content Grid - Using horizontal layout for wider space */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Current Topic */}
                <div className="bg-gray-50/50 rounded-lg p-4">
                    <div className="flex items-center gap-2 mb-2">
                        <span className="text-lg">📖</span>
                        <span className="text-sm font-medium text-slate">
                            Currently Studying
                        </span>
                    </div>
                    <h4 className="text-lg font-semibold text-graphite mb-2">
                        {data.currentTopic}
                    </h4>
                    <Link
                        to="/app/learn"
                        className={`inline-flex items-center gap-2 px-4 py-2 ${colorClasses.buttonBg} text-white font-medium rounded-lg transition-colors duration-200 text-sm`}
                    >
                        <span>Continue Learning</span>
                        <span>→</span>
                    </Link>
                </div>

                {/* Next Recommendation */}
                <div className="bg-gray-50/50 rounded-lg p-4">
                    <div className="flex items-center gap-2 mb-2">
                        <span className="text-lg">💡</span>
                        <span className="text-sm font-medium text-slate">
                            Up Next
                        </span>
                    </div>
                    <p className="text-sm text-slate leading-relaxed">
                        {data.nextRecommendation}
                    </p>
                    {progressPercentage > 0 && (
                        <div className="mt-3">
                            <span className="inline-flex items-center gap-1 text-xs font-medium text-create-600">
                                <span>🏆</span>
                                {progressPercentage >= 100
                                    ? "Journey Complete!"
                                    : progressPercentage >= 80
                                    ? "Almost there!"
                                    : progressPercentage >= 50
                                    ? "Great progress!"
                                    : "Keep learning!"}
                            </span>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}
