import { Link } from "react-router-dom";

interface CommunityHighlight {
    id: number;
    title: string;
    description: string;
    category: string;
}

interface CommunityHighlightsProps {
    highlights: CommunityHighlight[];
}

const getCategoryDesign = (category: string) => {
    // Map category keywords to our design system
    if (
        category.toLowerCase().includes("creator") ||
        category.toLowerCase().includes("artist")
    ) {
        return {
            color: "create",
            gradient: "from-create-500 to-blue-500",
            bgColor: "bg-create-100",
            textColor: "text-create-700",
            borderColor: "border-create-500",
            emoji: "🎨",
        };
    } else if (
        category.toLowerCase().includes("startup") ||
        category.toLowerCase().includes("business")
    ) {
        return {
            color: "manage",
            gradient: "from-manage-500 to-emerald-500",
            bgColor: "bg-manage-100",
            textColor: "text-manage-700",
            borderColor: "border-manage-500",
            emoji: "🚀",
        };
    } else if (
        category.toLowerCase().includes("community") ||
        category.toLowerCase().includes("social")
    ) {
        return {
            color: "distribute",
            gradient: "from-distribute-500 to-amber-500",
            bgColor: "bg-distribute-100",
            textColor: "text-distribute-700",
            borderColor: "border-distribute-500",
            emoji: "👥",
        };
    } else {
        return {
            color: "create",
            gradient: "from-create-500 to-indigo-500",
            bgColor: "bg-create-100",
            textColor: "text-create-700",
            borderColor: "border-create-500",
            emoji: "⭐",
        };
    }
};

export default function CommunityHighlights({
    highlights,
}: CommunityHighlightsProps) {
    return (
        <div className="group relative">
            {/* Background gradient overlay */}
            <div className="absolute inset-0 bg-gradient-to-br from-distribute-50 via-amber-50 to-orange-50 rounded-2xl opacity-60"></div>

            {/* Decorative background elements */}
            <div className="absolute inset-0 opacity-20">
                <div className="absolute top-0 right-0 w-16 h-16 bg-gradient-to-br from-distribute-500 to-amber-500 rounded-full blur-2xl transform translate-x-8 -translate-y-8"></div>
                <div className="absolute bottom-0 left-0 w-12 h-12 bg-gradient-to-br from-create-500 to-blue-500 rounded-full blur-xl transform -translate-x-6 translate-y-6"></div>
            </div>

            {/* Main content */}
            <div className="relative backdrop-blur-sm bg-white/90 rounded-2xl border border-white/50 shadow-level-2 hover:shadow-level-3 transition-all duration-300 p-6">
                {/* Header */}
                <div className="flex items-center gap-3 mb-6">
                    <div className="w-12 h-12 bg-gradient-to-br from-distribute-500 to-amber-500 rounded-xl flex items-center justify-center text-white text-xl shadow-lg group-hover:scale-110 group-hover:rotate-3 transition-all duration-300">
                        🌟
                    </div>
                    <div>
                        <h3 className="text-xl font-bold text-graphite">
                            Community Wins
                        </h3>
                        <p className="text-sm text-slate font-medium">
                            Latest success stories
                        </p>
                    </div>
                </div>

                {/* Highlights List */}
                <div className="space-y-4 mb-6">
                    {highlights.map((highlight, index) => {
                        const categoryDesign = getCategoryDesign(
                            highlight.category
                        );

                        return (
                            <div
                                key={highlight.id}
                                className="group/highlight relative animate-fade-in-up"
                                style={{ animationDelay: `${index * 0.1}s` }}
                            >
                                {/* Background gradient for highlight */}
                                <div
                                    className={`absolute inset-0 bg-gradient-to-r ${categoryDesign.bgColor} to-white rounded-xl opacity-50`}
                                ></div>

                                {/* Highlight content */}
                                <div className="relative backdrop-blur-sm bg-white/80 rounded-xl border border-white/60 shadow-level-1 hover:shadow-level-2 transition-all duration-200 p-4">
                                    {/* Category badge */}
                                    <div className="flex items-center justify-between mb-3">
                                        <div
                                            className={`inline-flex items-center px-3 py-1 ${categoryDesign.bgColor} ${categoryDesign.textColor} rounded-full text-xs font-semibold`}
                                        >
                                            <span className="mr-1">
                                                {categoryDesign.emoji}
                                            </span>
                                            {highlight.category}
                                        </div>
                                        <div className="opacity-0 group-hover/highlight:opacity-100 transition-opacity duration-200">
                                            <div className="w-2 h-2 bg-distribute-500 rounded-full animate-pulse"></div>
                                        </div>
                                    </div>

                                    {/* Title */}
                                    <h4 className="text-sm font-semibold text-graphite mb-2 group-hover/highlight:text-graphite transition-colors duration-200">
                                        {highlight.title}
                                    </h4>

                                    {/* Description */}
                                    <p className="text-xs text-slate leading-relaxed group-hover/highlight:text-graphite transition-colors duration-200">
                                        {highlight.description}
                                    </p>

                                    {/* Accent line */}
                                    <div
                                        className={`absolute left-0 top-0 bottom-0 w-1 bg-gradient-to-b ${categoryDesign.gradient} rounded-l-xl transform scale-y-50 group-hover/highlight:scale-y-100 transition-transform duration-300 origin-center`}
                                    ></div>
                                </div>
                            </div>
                        );
                    })}
                </div>

                {/* Join Community Button */}
                <Link
                    to="/community"
                    className="group/btn w-full inline-flex items-center justify-center gap-3 px-6 py-3 bg-gradient-to-r from-distribute-500 to-amber-500 hover:from-distribute-600 hover:to-amber-600 text-white font-semibold rounded-xl shadow-lg hover:shadow-xl transition-all duration-200 transform hover:scale-105 mb-4"
                >
                    <span className="text-lg group-hover/btn:scale-110 transition-transform duration-200">
                        👥
                    </span>
                    <span>Join Our Community</span>
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

                {/* Community Stats */}
                <div className="bg-gradient-to-r from-distribute-50 via-amber-50 to-orange-50 rounded-xl p-4 border border-white/30">
                    <div className="flex items-center justify-center gap-6 text-center">
                        <div>
                            <div className="text-lg font-bold text-distribute-600">
                                2.4K+
                            </div>
                            <div className="text-xs text-slate">
                                Active Members
                            </div>
                        </div>
                        <div className="w-1 h-8 bg-distribute-500 rounded-full opacity-20"></div>
                        <div>
                            <div className="text-lg font-bold text-distribute-600">
                                150+
                            </div>
                            <div className="text-xs text-slate">
                                Daily Stories
                            </div>
                        </div>
                    </div>
                </div>

                {/* Decorative corner elements */}
                <div className="absolute top-4 right-4 opacity-30">
                    <div className="flex gap-1">
                        <div className="w-1 h-1 bg-distribute-500 rounded-full animate-ping"></div>
                        <div
                            className="w-1 h-1 bg-amber-500 rounded-full animate-ping"
                            style={{ animationDelay: "0.2s" }}
                        ></div>
                    </div>
                </div>
            </div>
        </div>
    );
}
