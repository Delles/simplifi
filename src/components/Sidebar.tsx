import { Link, useLocation } from "react-router-dom";

interface NavigationItem {
    title: string;
    route: string;
    icon: string;
    color: "create" | "manage" | "distribute";
    description: string;
}

const navigationItems: NavigationItem[] = [
    {
        title: "Dashboard",
        route: "/app",
        icon: "🏠",
        color: "create",
        description: "Overview & Quick Actions",
    },
    {
        title: "Create Token",
        route: "/app/create-token",
        icon: "🚀",
        color: "create",
        description: "Launch your token",
    },
    {
        title: "Manage Tokens",
        route: "/app/manage",
        icon: "⚡",
        color: "manage",
        description: "Control your tokens",
    },
    {
        title: "Distribute",
        route: "/app/distribute",
        icon: "🌟",
        color: "distribute",
        description: "Airdrop & Share",
    },
    {
        title: "Add Liquidity",
        route: "/app/add-liquidity",
        icon: "💧",
        color: "distribute",
        description: "Make tokens tradable",
    },
    {
        title: "Education Center",
        route: "/app/education",
        icon: "📚",
        color: "create",
        description: "Learn & Explore",
    },
    {
        title: "Settings",
        route: "/app/settings",
        icon: "⚙️",
        color: "manage",
        description: "Preferences & Account",
    },
];

const getItemDesignSystem = (
    color: NavigationItem["color"],
    isActive: boolean
) => {
    const baseClasses = {
        create: {
            bg: isActive
                ? "bg-create-100 border-create-200"
                : "hover:bg-create-50",
            text: isActive
                ? "text-create-700"
                : "text-slate hover:text-create-600",
            icon: isActive
                ? "bg-create-500"
                : "bg-create-100 group-hover:bg-create-500",
            iconText: isActive
                ? "text-white"
                : "text-create-600 group-hover:text-white",
            border: isActive
                ? "border-l-4 border-l-create-500"
                : "border-l-4 border-l-transparent",
            shadow: isActive ? "shadow-level-2" : "hover:shadow-level-1",
        },
        manage: {
            bg: isActive
                ? "bg-manage-100 border-manage-200"
                : "hover:bg-manage-50",
            text: isActive
                ? "text-manage-700"
                : "text-slate hover:text-manage-600",
            icon: isActive
                ? "bg-manage-500"
                : "bg-manage-100 group-hover:bg-manage-500",
            iconText: isActive
                ? "text-white"
                : "text-manage-600 group-hover:text-white",
            border: isActive
                ? "border-l-4 border-l-manage-500"
                : "border-l-4 border-l-transparent",
            shadow: isActive ? "shadow-level-2" : "hover:shadow-level-1",
        },
        distribute: {
            bg: isActive
                ? "bg-distribute-100 border-distribute-200"
                : "hover:bg-distribute-50",
            text: isActive
                ? "text-distribute-700"
                : "text-slate hover:text-distribute-600",
            icon: isActive
                ? "bg-distribute-500"
                : "bg-distribute-100 group-hover:bg-distribute-500",
            iconText: isActive
                ? "text-white"
                : "text-distribute-600 group-hover:text-white",
            border: isActive
                ? "border-l-4 border-l-distribute-500"
                : "border-l-4 border-l-transparent",
            shadow: isActive ? "shadow-level-2" : "hover:shadow-level-1",
        },
    };

    return baseClasses[color];
};

export default function Sidebar() {
    const location = useLocation();

    return (
        <aside className="w-72 bg-white/90 backdrop-blur-sm border-r border-ash/50 shadow-level-1">
            {/* Header */}
            <div className="p-6 border-b border-ash/50">
                <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 bg-gradient-to-br from-create-500 to-blue-600 rounded-xl flex items-center justify-center shadow-level-2">
                        <span className="text-white font-bold text-lg">S</span>
                    </div>
                    <div>
                        <h1 className="text-h4 font-semibold text-graphite">
                            SimpliFi
                        </h1>
                        <p className="text-body-secondary text-slate">
                            Democratizing Tokens
                        </p>
                    </div>
                </div>
            </div>

            {/* Navigation */}
            <nav className="p-4 space-y-2">
                {navigationItems.map((item, index) => {
                    const isActive = location.pathname === item.route;
                    const design = getItemDesignSystem(item.color, isActive);

                    return (
                        <Link
                            key={item.route}
                            to={item.route}
                            className={`
                                group flex items-center space-x-4 p-4 rounded-xl transition-all duration-200
                                ${design.bg} ${design.text} ${design.border} ${design.shadow}
                                animate-fade-in-up
                            `}
                            style={{ animationDelay: `${index * 0.05}s` }}
                        >
                            {/* Icon */}
                            <div
                                className={`
                                w-10 h-10 rounded-lg flex items-center justify-center transition-all duration-200
                                ${design.icon}
                            `}
                            >
                                <span
                                    className={`text-lg transition-colors duration-200 ${design.iconText}`}
                                >
                                    {item.icon}
                                </span>
                            </div>

                            {/* Content */}
                            <div className="flex-1 min-w-0">
                                <div className="font-medium text-body-primary truncate">
                                    {item.title}
                                </div>
                                <div className="text-body-secondary text-slate/70 truncate">
                                    {item.description}
                                </div>
                            </div>

                            {/* Active indicator */}
                            {isActive && (
                                <div className="w-2 h-2 rounded-full bg-current opacity-60 animate-pulse-gentle" />
                            )}
                        </Link>
                    );
                })}
            </nav>

            {/* Footer */}
            <div className="absolute bottom-0 left-0 right-0 p-4 border-t border-ash/50 bg-white/95 backdrop-blur-sm">
                <div className="text-center">
                    <p className="text-caption text-slate/60">
                        Built on MultiversX
                    </p>
                    <div className="flex items-center justify-center space-x-2 mt-2">
                        <div className="w-2 h-2 bg-success rounded-full animate-pulse-gentle"></div>
                        <span className="text-caption text-slate/60">
                            Connected
                        </span>
                    </div>
                </div>
            </div>
        </aside>
    );
}
