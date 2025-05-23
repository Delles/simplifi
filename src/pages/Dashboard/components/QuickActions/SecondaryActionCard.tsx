import { Link } from "react-router-dom";

interface SecondaryActionCardProps {
    title: string;
    description: string;
    route: string;
    icon: string;
    color: "create" | "manage" | "distribute";
}

const getCardDesignSystem = (color: SecondaryActionCardProps["color"]) => {
    switch (color) {
        case "create":
            return {
                lightGradient:
                    "bg-gradient-to-r from-create-50 via-blue-50 to-indigo-50",
                iconBg: "bg-create-500",
                textColor: "text-create-600",
                hoverRing: "hover:ring-2 hover:ring-create-500/20",
                decorativeColor: "bg-create-500",
            };
        case "manage":
            return {
                lightGradient:
                    "bg-gradient-to-r from-manage-50 via-emerald-50 to-green-50",
                iconBg: "bg-manage-500",
                textColor: "text-manage-600",
                hoverRing: "hover:ring-2 hover:ring-manage-500/20",
                decorativeColor: "bg-manage-500",
            };
        case "distribute":
            return {
                lightGradient:
                    "bg-gradient-to-r from-distribute-50 via-amber-50 to-orange-50",
                iconBg: "bg-distribute-500",
                textColor: "text-distribute-600",
                hoverRing: "hover:ring-2 hover:ring-distribute-500/20",
                decorativeColor: "bg-distribute-500",
            };
    }
};

export default function SecondaryActionCard({
    title,
    description,
    route,
    icon,
    color,
}: SecondaryActionCardProps) {
    const design = getCardDesignSystem(color);

    return (
        <Link
            to={route}
            className={`group block relative overflow-hidden rounded-xl transition-all duration-300 transform hover:scale-[1.01] hover:-translate-y-0.5 ${design.hoverRing}`}
        >
            {/* Subtle background gradient */}
            <div
                className={`absolute inset-0 ${design.lightGradient} opacity-40`}
            ></div>

            {/* Glass-morphism background */}
            <div className="relative backdrop-blur-sm bg-white/80 border border-white/60 shadow-level-1 hover:shadow-level-2 transition-all duration-300 p-4">
                <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                        {/* Icon */}
                        <div
                            className={`w-10 h-10 ${design.iconBg} rounded-lg flex items-center justify-center text-lg text-white shadow-lg group-hover:scale-110 group-hover:rotate-2 transition-all duration-300`}
                        >
                            {icon}
                        </div>

                        {/* Content */}
                        <div>
                            <h5 className="text-base font-semibold text-graphite group-hover:text-graphite transition-colors duration-200">
                                {title}
                            </h5>
                            <p className="text-sm text-slate mt-0.5 group-hover:text-graphite transition-colors duration-200">
                                {description}
                            </p>
                        </div>
                    </div>

                    {/* Arrow Icon */}
                    <div className="opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-x-1 group-hover:translate-x-0">
                        <svg
                            className="w-4 h-4 text-slate"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M9 5l7 7-7 7"
                            />
                        </svg>
                    </div>
                </div>

                {/* Decorative element */}
                <div className="absolute top-2 right-2 opacity-20">
                    <div
                        className={`w-1 h-1 ${design.decorativeColor} rounded-full animate-pulse`}
                    ></div>
                </div>

                {/* Hover accent line */}
                <div
                    className={`absolute left-0 top-0 bottom-0 w-0.5 ${design.iconBg} transform scale-y-0 group-hover:scale-y-100 transition-transform duration-300 origin-center`}
                ></div>
            </div>
        </Link>
    );
}
