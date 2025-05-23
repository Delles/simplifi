import { Link } from "react-router-dom";

interface PrimaryActionCardProps {
    title: string;
    description: string;
    route: string;
    icon: string;
    color: "create" | "manage" | "distribute";
    subtitle?: string;
    badge?: string;
}

const getCardDesignSystem = (color: PrimaryActionCardProps["color"]) => {
    switch (color) {
        case "create":
            return {
                gradient:
                    "bg-gradient-to-br from-create-500 via-blue-500 to-indigo-600",
                lightGradient:
                    "bg-gradient-to-br from-create-50 via-blue-50 to-indigo-50",
                iconBg: "bg-create-500",
                textColor: "text-create-600",
                hoverShadow: "hover:shadow-[0_20px_40px_rgba(60,127,186,0.15)]",
                borderGlow: "hover:ring-2 hover:ring-create-500/20",
                badgeBg: "bg-create-100 text-create-700 border-create-200",
            };
        case "manage":
            return {
                gradient:
                    "bg-gradient-to-br from-manage-500 via-emerald-500 to-green-600",
                lightGradient:
                    "bg-gradient-to-br from-manage-50 via-emerald-50 to-green-50",
                iconBg: "bg-manage-500",
                textColor: "text-manage-600",
                hoverShadow: "hover:shadow-[0_20px_40px_rgba(16,185,129,0.15)]",
                borderGlow: "hover:ring-2 hover:ring-manage-500/20",
                badgeBg: "bg-manage-100 text-manage-700 border-manage-200",
            };
        case "distribute":
            return {
                gradient:
                    "bg-gradient-to-br from-distribute-500 via-amber-500 to-orange-600",
                lightGradient:
                    "bg-gradient-to-br from-distribute-50 via-amber-50 to-orange-50",
                iconBg: "bg-distribute-500",
                textColor: "text-distribute-600",
                hoverShadow: "hover:shadow-[0_20px_40px_rgba(245,158,11,0.15)]",
                borderGlow: "hover:ring-2 hover:ring-distribute-500/20",
                badgeBg:
                    "bg-distribute-100 text-distribute-700 border-distribute-200",
            };
    }
};

export default function PrimaryActionCard({
    title,
    description,
    route,
    icon,
    color,
    subtitle,
    badge,
}: PrimaryActionCardProps) {
    const design = getCardDesignSystem(color);

    return (
        <Link
            to={route}
            className={`group block relative overflow-hidden rounded-2xl transition-all duration-300 transform hover:scale-[1.02] hover:-translate-y-1 ${design.hoverShadow} ${design.borderGlow}`}
        >
            {/* Background gradient overlay */}
            <div
                className={`absolute inset-0 ${design.lightGradient} opacity-60`}
            ></div>

            {/* Glass-morphism background */}
            <div className="relative backdrop-blur-sm bg-white/90 border border-white/50 shadow-level-2 p-6">
                {/* Decorative corner element */}
                <div className="absolute top-4 right-4 opacity-20">
                    <div
                        className={`w-16 h-16 ${design.gradient} rounded-full blur-2xl`}
                    ></div>
                </div>

                {/* Header with Icon */}
                <div className="relative flex items-start justify-between mb-4">
                    <div className="flex items-center gap-4">
                        {/* Enhanced Icon */}
                        <div
                            className={`w-14 h-14 ${design.iconBg} rounded-xl flex items-center justify-center text-2xl text-white shadow-lg group-hover:scale-110 group-hover:rotate-3 transition-all duration-300`}
                        >
                            {icon}
                        </div>

                        {/* Title & Badge */}
                        <div>
                            <h4 className="text-xl font-bold text-graphite group-hover:text-graphite mb-1 transition-colors duration-200">
                                {title}
                            </h4>
                            {badge && (
                                <span
                                    className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium border ${design.badgeBg} animate-pulse-gentle`}
                                >
                                    {badge}
                                </span>
                            )}
                        </div>
                    </div>

                    {/* Arrow Icon */}
                    <div className="opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-x-2 group-hover:translate-x-0">
                        <svg
                            className="w-6 h-6 text-slate"
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
                    </div>
                </div>

                {/* Description */}
                <p className="text-slate leading-relaxed mb-4 text-base group-hover:text-graphite transition-colors duration-200">
                    {description}
                </p>

                {/* Footer with Subtitle */}
                {subtitle && (
                    <div className="flex items-center gap-2">
                        <div
                            className={`w-1 h-1 ${design.iconBg} rounded-full animate-pulse`}
                        ></div>
                        <span
                            className={`text-sm font-medium ${design.textColor} group-hover:translate-x-1 transition-transform duration-200`}
                        >
                            {subtitle}
                        </span>
                    </div>
                )}

                {/* Hover glow effect */}
                <div
                    className={`absolute inset-0 ${design.gradient} opacity-0 group-hover:opacity-5 transition-opacity duration-300 rounded-2xl`}
                ></div>
            </div>

            {/* Bottom border accent */}
            <div
                className={`absolute bottom-0 left-0 right-0 h-1 ${design.gradient} transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left`}
            ></div>
        </Link>
    );
}
