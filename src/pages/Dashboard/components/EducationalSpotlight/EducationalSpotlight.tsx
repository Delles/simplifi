import { Link } from "react-router-dom";

interface EducationalContent {
    title: string;
    description: string;
    category: string;
    readTime: string;
    difficulty: "Beginner" | "Intermediate" | "Advanced";
    topics: string[];
    cta: string;
    route: string;
}

interface EducationalSpotlightProps {
    content: EducationalContent;
}

const getDifficultyDesign = (difficulty: EducationalContent["difficulty"]) => {
    switch (difficulty) {
        case "Beginner":
            return {
                bg: "bg-success/10",
                text: "text-success",
                border: "border-success/20",
                icon: "🌱",
            };
        case "Intermediate":
            return {
                bg: "bg-warning/10",
                text: "text-warning",
                border: "border-warning/20",
                icon: "🌿",
            };
        case "Advanced":
            return {
                bg: "bg-error/10",
                text: "text-error",
                border: "border-error/20",
                icon: "🌳",
            };
    }
};

export default function EducationalSpotlight({
    content,
}: EducationalSpotlightProps) {
    const difficultyDesign = getDifficultyDesign(content.difficulty);

    return (
        <div className="bg-white/90 backdrop-blur-sm rounded-2xl border border-ash/50 shadow-level-2 hover:shadow-level-3 transition-all duration-300 group">
            {/* Header */}
            <div className="p-6 border-b border-ash/50">
                <div className="flex items-center space-x-3 mb-4">
                    <div className="w-12 h-12 bg-education-primary rounded-xl flex items-center justify-center shadow-level-1">
                        <span className="text-white text-xl">📚</span>
                    </div>
                    <div>
                        <h3 className="text-h4 font-semibold text-graphite">
                            Educational Spotlight
                        </h3>
                        <p className="text-body-secondary text-slate">
                            Expand your knowledge
                        </p>
                    </div>
                </div>
            </div>

            {/* Content */}
            <div className="p-6">
                {/* Category & Metadata */}
                <div className="flex items-center justify-between mb-4">
                    <span className="px-3 py-1 bg-education-secondary/20 text-education-primary text-caption font-medium rounded-full">
                        {content.category}
                    </span>
                    <div className="flex items-center space-x-3 text-caption text-slate">
                        <span>{content.readTime}</span>
                        <span>•</span>
                        <div
                            className={`
                            px-2 py-1 rounded-full border text-caption font-medium
                            ${difficultyDesign.bg} ${difficultyDesign.text} ${difficultyDesign.border}
                        `}
                        >
                            <span className="mr-1">
                                {difficultyDesign.icon}
                            </span>
                            {content.difficulty}
                        </div>
                    </div>
                </div>

                {/* Title & Description */}
                <h4 className="text-xl font-semibold text-graphite mb-3 group-hover:text-education-primary transition-colors">
                    {content.title}
                </h4>
                <p className="text-slate text-body-secondary leading-relaxed mb-6">
                    {content.description}
                </p>

                {/* Topics */}
                <div className="mb-6">
                    <h5 className="text-body-secondary font-medium text-graphite mb-3">
                        What you'll learn:
                    </h5>
                    <div className="grid grid-cols-2 gap-2">
                        {content.topics.map((topic, index) => (
                            <div
                                key={index}
                                className="flex items-center space-x-2 text-body-secondary text-slate animate-fade-in-up"
                                style={{ animationDelay: `${index * 0.1}s` }}
                            >
                                <div className="w-1.5 h-1.5 bg-education-primary rounded-full"></div>
                                <span>{topic}</span>
                            </div>
                        ))}
                    </div>
                </div>

                {/* CTA Button */}
                <Link
                    to={content.route}
                    className="
                        inline-flex items-center justify-center w-full px-6 py-3
                        bg-gradient-to-r from-education-primary to-create-600
                        text-white font-medium rounded-xl
                        shadow-level-2 hover:shadow-level-3
                        transform hover:scale-105 transition-all duration-200
                        group/btn
                    "
                >
                    <span className="mr-2">{content.cta}</span>
                    <span className="transform group-hover/btn:translate-x-1 transition-transform">
                        →
                    </span>
                </Link>
            </div>

            {/* Decorative Elements */}
            <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-education-primary/10 to-create-500/10 rounded-full blur-2xl transform translate-x-16 -translate-y-16 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
        </div>
    );
}
