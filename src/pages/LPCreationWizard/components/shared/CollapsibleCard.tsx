import React, { useState } from "react";

interface CollapsibleCardProps {
    title: string;
    children: React.ReactNode;
    defaultExpanded?: boolean;
    variant?: "primary" | "secondary" | "warning" | "success";
    icon?: string;
    badge?: string;
    className?: string;
}

export const CollapsibleCard: React.FC<CollapsibleCardProps> = ({
    title,
    children,
    defaultExpanded = false,
    variant = "secondary",
    icon,
    badge,
    className = "",
}) => {
    const [isExpanded, setIsExpanded] = useState(defaultExpanded);

    const getVariantStyles = () => {
        switch (variant) {
            case "primary":
                return {
                    container:
                        "border-theme-blue/20 bg-gradient-to-r from-theme-blue/5 to-theme-blue/10",
                    header: isExpanded ? "bg-theme-blue/10" : "bg-white",
                    headerHover: "hover:bg-theme-blue/10",
                    title: "text-theme-blue",
                    content: "bg-white",
                };
            case "warning":
                return {
                    container:
                        "border-distribute-primary/20 bg-gradient-to-r from-distribute-primary/5 to-distribute-primary/10",
                    header: isExpanded
                        ? "bg-distribute-primary/10"
                        : "bg-white",
                    headerHover: "hover:bg-distribute-primary/10",
                    title: "text-distribute-primary",
                    content: "bg-white",
                };
            case "success":
                return {
                    container:
                        "border-emerald-green/20 bg-gradient-to-r from-emerald-green/5 to-emerald-green/10",
                    header: isExpanded ? "bg-emerald-green/10" : "bg-white",
                    headerHover: "hover:bg-emerald-green/10",
                    title: "text-emerald-green",
                    content: "bg-white",
                };
            default: // secondary
                return {
                    container: "border-ash/30 bg-white",
                    header: isExpanded ? "bg-cloud-white" : "bg-white",
                    headerHover: "hover:bg-cloud-white",
                    title: "text-graphite",
                    content: "bg-white",
                };
        }
    };

    const styles = getVariantStyles();

    return (
        <div
            className={`rounded-xl border overflow-hidden shadow-card hover:shadow-card-hover transition-all duration-300 ${styles.container} ${className}`}
        >
            {/* Header */}
            <div
                className={`flex items-center justify-between p-4 cursor-pointer transition-all duration-200 ${styles.header} ${styles.headerHover}`}
                onClick={() => setIsExpanded(!isExpanded)}
            >
                <div className="flex items-center gap-3">
                    {icon && (
                        <div className="w-8 h-8 flex items-center justify-center text-lg">
                            {icon}
                        </div>
                    )}
                    <div>
                        <h3
                            className={`font-semibold text-base ${styles.title}`}
                        >
                            {title}
                        </h3>
                        {badge && (
                            <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-slate/10 text-slate mt-1">
                                {badge}
                            </span>
                        )}
                    </div>
                </div>

                {/* Toggle Icon */}
                <div
                    className={`w-6 h-6 flex items-center justify-center text-slate transition-transform duration-200 ${
                        isExpanded ? "rotate-180" : ""
                    }`}
                >
                    <svg
                        className="w-4 h-4"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                    >
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M19 9l-7 7-7-7"
                        />
                    </svg>
                </div>
            </div>

            {/* Content */}
            <div
                className={`overflow-hidden transition-all duration-300 ${
                    styles.content
                } ${
                    isExpanded
                        ? "max-h-[2000px] opacity-100"
                        : "max-h-0 opacity-0"
                }`}
            >
                <div className="p-4 pt-0 border-t border-ash/20">
                    {children}
                </div>
            </div>
        </div>
    );
};
