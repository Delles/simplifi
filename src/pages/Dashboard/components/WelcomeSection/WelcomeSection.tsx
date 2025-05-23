import { useGetAccountInfo } from "@multiversx/sdk-dapp/hooks";
import { useState, useEffect } from "react";

interface WelcomeSectionProps {
    tokenCount: number;
    networkName?: string;
}

interface TimeBasedTheme {
    greeting: string;
    emoji: string;
    gradient: string;
    lightGradient: string;
    accentColor: string;
    iconColor: string;
    description: string;
}

const getTimeBasedTheme = (): TimeBasedTheme => {
    const hour = new Date().getHours();

    if (hour < 12) {
        return {
            greeting: "Good morning",
            emoji: "🌅",
            gradient:
                "bg-gradient-to-r from-amber-400 via-orange-400 to-yellow-500",
            lightGradient:
                "bg-gradient-to-r from-amber-50 via-orange-50 to-yellow-50",
            accentColor: "text-amber-600",
            iconColor: "bg-amber-500",
            description: "A fresh start to build something amazing today!",
        };
    } else if (hour < 17) {
        return {
            greeting: "Good afternoon",
            emoji: "☀️",
            gradient:
                "bg-gradient-to-r from-create-500 via-blue-500 to-indigo-500",
            lightGradient:
                "bg-gradient-to-r from-create-50 via-blue-50 to-indigo-50",
            accentColor: "text-create-600",
            iconColor: "bg-create-500",
            description:
                "The perfect time to make progress on your token journey!",
        };
    } else {
        return {
            greeting: "Good evening",
            emoji: "🌙",
            gradient:
                "bg-gradient-to-r from-indigo-500 via-purple-500 to-blue-600",
            lightGradient:
                "bg-gradient-to-r from-indigo-50 via-purple-50 to-blue-50",
            accentColor: "text-indigo-600",
            iconColor: "bg-indigo-500",
            description: "Time to unwind and plan your next big token idea!",
        };
    }
};

const generateUserAvatar = (address: string) => {
    if (!address) return "🎭";

    const avatars = [
        "🚀",
        "🎨",
        "🔥",
        "⚡",
        "🌟",
        "💎",
        "🎯",
        "🌈",
        "🦄",
        "👑",
    ];
    const charSum = address
        .split("")
        .reduce((sum, char) => sum + char.charCodeAt(0), 0);
    return avatars[charSum % avatars.length];
};

const getStatusBadgeColor = (tokenCount: number) => {
    if (tokenCount === 0) return "text-slate bg-gray-100 border-gray-200";
    if (tokenCount < 3)
        return "text-create-700 bg-create-100 border-create-200";
    if (tokenCount < 5)
        return "text-manage-700 bg-manage-100 border-manage-200";
    return "text-distribute-700 bg-distribute-100 border-distribute-200";
};

const getNetworkStatusColor = (networkName: string) => {
    return networkName.toLowerCase() === "mainnet"
        ? "text-manage-700 bg-manage-100 border-manage-200"
        : "text-amber-700 bg-amber-100 border-amber-200";
};

export default function WelcomeSection({
    tokenCount,
    networkName = "Mainnet",
}: WelcomeSectionProps) {
    const { account } = useGetAccountInfo();
    const [userName, setUserName] = useState("");
    const [mounted, setMounted] = useState(false);

    const theme = getTimeBasedTheme();
    const userAvatar = generateUserAvatar(account?.address || "");
    const hour = new Date().getHours();

    useEffect(() => {
        setMounted(true);
        // In a real app, this would come from user preferences/ENS/profile
        if (account?.address) {
            const shortAddr = `${account.address.slice(
                0,
                6
            )}...${account.address.slice(-4)}`;
            setUserName(shortAddr);
        }
    }, [account?.address]);

    if (!mounted) {
        return (
            <div className="mb-8 h-32 bg-gray-100 animate-pulse rounded-2xl"></div>
        );
    }

    return (
        <div className="mb-8 group">
            {/* Main Welcome Banner */}
            <div
                className={`relative overflow-hidden rounded-2xl ${theme.lightGradient} border-2 border-white/50 shadow-level-2 hover:shadow-level-3 transition-all duration-500`}
            >
                {/* Decorative Background Elements */}
                <div className="absolute inset-0 opacity-20">
                    <div
                        className={`absolute top-0 right-0 w-40 h-40 ${theme.gradient} rounded-full blur-3xl transform translate-x-20 -translate-y-20 animate-spin-slow`}
                    ></div>
                    <div
                        className={`absolute bottom-0 left-0 w-32 h-32 ${theme.gradient} rounded-full blur-2xl transform -translate-x-16 translate-y-16`}
                    ></div>
                </div>

                {/* Content */}
                <div className="relative z-10 p-6 md:p-8">
                    <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">
                        {/* Left Content */}
                        <div className="flex-1">
                            <div className="flex items-center gap-4 mb-4">
                                {/* User Avatar */}
                                <div
                                    className={`w-16 h-16 ${theme.iconColor} rounded-2xl flex items-center justify-center text-2xl shadow-lg animate-bounce-gentle`}
                                >
                                    {userAvatar}
                                </div>

                                {/* Greeting Content */}
                                <div>
                                    <h1 className="text-3xl md:text-4xl font-bold text-graphite leading-tight animate-fade-in-up">
                                        {theme.greeting},{" "}
                                        {userName || "Creator"}!
                                        <span className="inline-block animate-bounce-gentle ml-2">
                                            {theme.emoji}
                                        </span>
                                    </h1>
                                    <p
                                        className={`text-lg ${theme.accentColor} font-medium mt-1 animate-slide-in-right`}
                                    >
                                        {theme.description}
                                    </p>
                                </div>
                            </div>

                            <p
                                className="text-slate text-lg leading-relaxed max-w-2xl animate-fade-in-up"
                                style={{ animationDelay: "0.2s" }}
                            >
                                Welcome to your{" "}
                                <span className="font-semibold text-graphite">
                                    Token Command Center
                                </span>
                                . What would you like to build today?
                            </p>
                        </div>

                        {/* Status Badges */}
                        <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
                            {/* Token Count Badge */}
                            <div className="group/badge">
                                <div
                                    className={`px-6 py-3 rounded-xl border backdrop-blur-sm shadow-level-1 hover:shadow-level-2 transition-all duration-300 transform hover:scale-105 ${getStatusBadgeColor(
                                        tokenCount
                                    )}`}
                                >
                                    <div className="flex items-center gap-3">
                                        <div className="flex items-center gap-2">
                                            <div className="w-8 h-8 bg-white/50 rounded-lg flex items-center justify-center">
                                                <span className="text-lg">
                                                    📊
                                                </span>
                                            </div>
                                            <div>
                                                <div className="text-sm font-medium opacity-75">
                                                    Tokens Managed
                                                </div>
                                                <div className="text-xl font-bold">
                                                    {tokenCount}
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Network Status Badge */}
                            <div className="group/badge">
                                <div
                                    className={`px-6 py-3 rounded-xl border backdrop-blur-sm shadow-level-1 hover:shadow-level-2 transition-all duration-300 transform hover:scale-105 ${getNetworkStatusColor(
                                        networkName
                                    )}`}
                                >
                                    <div className="flex items-center gap-3">
                                        <div className="flex items-center gap-2">
                                            <div className="relative">
                                                <div className="w-3 h-3 bg-manage-500 rounded-full animate-pulse"></div>
                                                <div className="absolute inset-0 w-3 h-3 bg-manage-500 rounded-full animate-ping opacity-30"></div>
                                            </div>
                                            <div>
                                                <div className="text-sm font-medium opacity-75">
                                                    Network
                                                </div>
                                                <div className="text-lg font-bold">
                                                    {networkName}
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Decorative Corner Elements */}
                <div className="absolute top-4 right-4 opacity-30">
                    <div className="flex gap-2">
                        <div
                            className={`w-2 h-2 ${theme.iconColor} rounded-full animate-ping`}
                        ></div>
                        <div
                            className={`w-1 h-1 ${theme.iconColor} rounded-full animate-pulse`}
                            style={{ animationDelay: "0.5s" }}
                        ></div>
                    </div>
                </div>
            </div>

            {/* Time-based Motivational Message */}
            <div
                className="mt-4 flex items-center justify-center animate-fade-in-up"
                style={{ animationDelay: "0.4s" }}
            >
                <div className="bg-white/80 backdrop-blur-sm rounded-xl px-6 py-3 border border-white/50 shadow-level-1 max-w-md">
                    <div className="flex items-center gap-3 text-sm">
                        <span className="text-xl">{theme.emoji}</span>
                        <div>
                            <span className="font-medium text-graphite">
                                {hour < 12 && "Rise and grind! "}
                                {hour >= 12 && hour < 17 && "Keep building! "}
                                {hour >= 17 && "Evening inspiration: "}
                            </span>
                            <span className="text-slate">
                                {tokenCount === 0 &&
                                    "Your first token is just minutes away"}
                                {tokenCount > 0 &&
                                    tokenCount < 3 &&
                                    "You're building momentum perfectly"}
                                {tokenCount >= 3 &&
                                    "You're inspiring others to create"}
                            </span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
