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
                bg: "bg-create-100",
                text: "text-create-700",
                icon: "🌱",
            };
        case "Intermediate":
            return {
                bg: "bg-manage-100",
                text: "text-manage-700",
                icon: "🌿",
            };
        case "Advanced":
            return {
                bg: "bg-distribute-100",
                text: "text-distribute-700",
                icon: "🌳",
            };
    }
};

export default function EducationalSpotlight({
    content,
}: EducationalSpotlightProps) {
    const difficultyDesign = getDifficultyDesign(content.difficulty);

    return (
        <div className="bg-white/90 rounded-xl border border-ash/30 shadow-level-1 hover:shadow-level-2 transition-all duration-200 p-6 flex-1 flex flex-col">
            {/* Header */}
            <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-create-500 rounded-lg flex items-center justify-center">
                        <span className="text-white text-lg">📚</span>
                    </div>
                    <div>
                        <h3 className="text-lg font-semibold text-graphite">
                            {content.title}
                        </h3>
                        <div className="flex items-center gap-2 text-sm text-slate">
                            <span className="px-2 py-1 bg-manage-100 text-manage-700 rounded-md text-xs font-medium">
                                {content.category}
                            </span>
                            <span>•</span>
                            <span>{content.readTime}</span>
                        </div>
                    </div>
                </div>
                <div
                    className={`px-3 py-1 rounded-lg text-sm font-medium ${difficultyDesign.bg} ${difficultyDesign.text}`}
                >
                    <span className="mr-1">{difficultyDesign.icon}</span>
                    {content.difficulty}
                </div>
            </div>

            {/* Description */}
            <p className="text-slate text-sm leading-relaxed mb-4 flex-grow">
                {content.description}
            </p>

            {/* Key Topics */}
            <div className="mb-4">
                <div className="flex flex-wrap gap-2">
                    {content.topics.slice(0, 3).map((topic, index) => (
                        <span
                            key={index}
                            className="text-xs bg-create-100 text-create-700 px-2 py-1 rounded-md font-medium"
                        >
                            {topic}
                        </span>
                    ))}
                    {content.topics.length > 3 && (
                        <span className="text-xs text-create-600 font-medium">
                            +{content.topics.length - 3} more
                        </span>
                    )}
                </div>
            </div>

            {/* CTA Button - Stays at bottom */}
            <Link
                to={content.route}
                className="inline-flex items-center justify-center w-full px-4 py-2.5 bg-create-500 hover:bg-create-600 text-white font-medium rounded-lg transition-colors duration-200 mt-auto"
            >
                <span>{content.cta}</span>
                <span className="ml-2">→</span>
            </Link>
        </div>
    );
}
