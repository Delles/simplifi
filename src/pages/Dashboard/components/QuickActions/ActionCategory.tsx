import PrimaryActionCard from "./PrimaryActionCard";
import SecondaryActionCard from "./SecondaryActionCard";

interface ActionItem {
    type: "primary" | "secondary";
    title: string;
    description: string;
    route: string;
    icon: string;
    subtitle?: string;
    badge?: string;
}

interface ActionCategoryProps {
    title: string;
    color: "create" | "manage" | "distribute";
    actions: ActionItem[];
}

const getCategoryDesignSystem = (color: ActionCategoryProps["color"]) => {
    switch (color) {
        case "create":
            return {
                gradient:
                    "bg-gradient-to-r from-create-500 via-blue-500 to-indigo-500",
                lightGradient:
                    "bg-gradient-to-r from-create-50 via-blue-50 to-indigo-50",
                iconBg: "bg-create-500",
                textColor: "text-create-600",
                headerIcon: "🚀",
                description: "Bring your ideas to life",
                decorativeColor: "bg-create-500",
            };
        case "manage":
            return {
                gradient:
                    "bg-gradient-to-r from-manage-500 via-emerald-500 to-green-600",
                lightGradient:
                    "bg-gradient-to-r from-manage-50 via-emerald-50 to-green-50",
                iconBg: "bg-manage-500",
                textColor: "text-manage-600",
                headerIcon: "⚡",
                description: "Control and optimize",
                decorativeColor: "bg-manage-500",
            };
        case "distribute":
            return {
                gradient:
                    "bg-gradient-to-r from-distribute-500 via-amber-500 to-orange-600",
                lightGradient:
                    "bg-gradient-to-r from-distribute-50 via-amber-50 to-orange-50",
                iconBg: "bg-distribute-500",
                textColor: "text-distribute-600",
                headerIcon: "🌟",
                description: "Share and grow",
                decorativeColor: "bg-distribute-500",
            };
    }
};

export default function ActionCategory({
    title,
    color,
    actions,
}: ActionCategoryProps) {
    const design = getCategoryDesignSystem(color);

    return (
        <div className="space-y-6">
            {/* Enhanced Category Header */}
            <div className="relative group">
                {/* Background gradient */}
                <div
                    className={`absolute inset-0 ${design.lightGradient} rounded-2xl opacity-50 blur-sm`}
                ></div>

                {/* Header content */}
                <div className="relative backdrop-blur-sm bg-white/80 rounded-2xl p-6 border border-white/50 shadow-level-1 hover:shadow-level-2 transition-all duration-300">
                    <div className="flex items-center justify-between">
                        <div className="flex items-center gap-4">
                            {/* Animated Category Icon */}
                            <div
                                className={`w-12 h-12 ${design.iconBg} rounded-xl flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300 animate-bounce-gentle`}
                            >
                                <span className="text-2xl text-white">
                                    {design.headerIcon}
                                </span>
                            </div>

                            {/* Category Title & Description */}
                            <div>
                                <h3
                                    className={`text-2xl font-bold ${design.textColor} mb-1`}
                                >
                                    {title}
                                </h3>
                                <p className="text-slate text-sm font-medium">
                                    {design.description}
                                </p>
                            </div>
                        </div>

                        {/* Action Count Badge */}
                        <div className="bg-white/70 backdrop-blur-sm rounded-xl px-4 py-2 border border-white/50 shadow-level-1">
                            <div className="flex items-center gap-2">
                                <div
                                    className={`w-2 h-2 ${design.decorativeColor} rounded-full animate-pulse`}
                                ></div>
                                <span className="text-sm font-medium text-graphite">
                                    {actions.length} action
                                    {actions.length !== 1 ? "s" : ""}
                                </span>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Decorative elements */}
                <div className="absolute top-2 right-2 opacity-30">
                    <div
                        className={`w-1 h-1 ${design.decorativeColor} rounded-full animate-ping`}
                    ></div>
                </div>
            </div>

            {/* Action Cards */}
            <div className="space-y-4 pl-2">
                {actions.map((action, index) =>
                    action.type === "primary" ? (
                        <div
                            key={index}
                            className="animate-fade-in-up"
                            style={{ animationDelay: `${index * 0.1}s` }}
                        >
                            <PrimaryActionCard
                                title={action.title}
                                description={action.description}
                                route={action.route}
                                icon={action.icon}
                                color={color}
                                subtitle={action.subtitle}
                                badge={action.badge}
                            />
                        </div>
                    ) : (
                        <div
                            key={index}
                            className="animate-fade-in-up"
                            style={{ animationDelay: `${(index + 1) * 0.1}s` }}
                        >
                            <SecondaryActionCard
                                title={action.title}
                                description={action.description}
                                route={action.route}
                                icon={action.icon}
                                color={color}
                            />
                        </div>
                    )
                )}
            </div>
        </div>
    );
}
