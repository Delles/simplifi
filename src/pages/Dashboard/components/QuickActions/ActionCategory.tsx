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

const getCategoryDesign = (color: ActionCategoryProps["color"]) => {
    switch (color) {
        case "create":
            return {
                iconBg: "bg-create-500",
                textColor: "text-create-600",
                borderColor: "border-create-200/50",
                bgColor: "bg-create-50/30",
                headerIcon: "🚀",
            };
        case "manage":
            return {
                iconBg: "bg-manage-500",
                textColor: "text-manage-600",
                borderColor: "border-manage-200/50",
                bgColor: "bg-manage-50/30",
                headerIcon: "⚡",
            };
        case "distribute":
            return {
                iconBg: "bg-distribute-500",
                textColor: "text-distribute-600",
                borderColor: "border-distribute-200/50",
                bgColor: "bg-distribute-50/30",
                headerIcon: "🌟",
            };
    }
};

export default function ActionCategory({
    title,
    color,
    actions,
}: ActionCategoryProps) {
    const design = getCategoryDesign(color);

    return (
        <div
            className={`rounded-xl ${design.bgColor} ${design.borderColor} border p-4 space-y-4`}
        >
            {/* Simplified Category Header */}
            <div className="flex items-center gap-3">
                <div
                    className={`w-8 h-8 ${design.iconBg} rounded-lg flex items-center justify-center`}
                >
                    <span className="text-lg text-white">
                        {design.headerIcon}
                    </span>
                </div>
                <h3 className={`text-lg font-semibold ${design.textColor}`}>
                    {title}
                </h3>
            </div>

            {/* Action Cards */}
            <div className="space-y-3">
                {actions.map((action, index) =>
                    action.type === "primary" ? (
                        <PrimaryActionCard
                            key={index}
                            title={action.title}
                            description={action.description}
                            route={action.route}
                            icon={action.icon}
                            color={color}
                            subtitle={action.subtitle}
                            badge={action.badge}
                        />
                    ) : (
                        <SecondaryActionCard
                            key={index}
                            title={action.title}
                            description={action.description}
                            route={action.route}
                            icon={action.icon}
                            color={color}
                        />
                    )
                )}
            </div>
        </div>
    );
}
