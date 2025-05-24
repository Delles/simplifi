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
                "bg-gradient-to-r from-amber-50/50 via-orange-50/50 to-yellow-50/50",
            accentColor: "text-amber-600",
            iconColor: "bg-amber-500",
            description: "A fresh start to build something amazing!",
        };
    } else if (hour < 17) {
        return {
            greeting: "Good afternoon",
            emoji: "☀️",
            gradient:
                "bg-gradient-to-r from-create-500 via-blue-500 to-indigo-500",
            lightGradient:
                "bg-gradient-to-r from-create-50/50 via-blue-50/50 to-indigo-50/50",
            accentColor: "text-create-600",
            iconColor: "bg-create-500",
            description: "Perfect time to make progress!",
        };
    } else {
        return {
            greeting: "Good evening",
            emoji: "🌙",
            gradient:
                "bg-gradient-to-r from-indigo-500 via-purple-500 to-blue-600",
            lightGradient:
                "bg-gradient-to-r from-indigo-50/50 via-purple-50/50 to-blue-50/50",
            accentColor: "text-indigo-600",
            iconColor: "bg-indigo-500",
            description: "Time to plan your next big idea!",
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

const formatBalance = (balance: string) => {
    const num = parseFloat(balance);
    if (num >= 1000000) {
        return `${(num / 1000000).toFixed(2)}M`;
    } else if (num >= 1000) {
        return `${(num / 1000).toFixed(2)}K`;
    }
    return num.toFixed(2);
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

    // Format EGLD balance
    const egldBalance = account?.balance ? formatBalance(account.balance) : "0";

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
            <div className="mb-6 h-24 bg-gray-100 animate-pulse rounded-xl"></div>
        );
    }

    return (
        <div className="mb-6">
            {/* Main Welcome Section - More Compact */}
            <div
                className={`relative rounded-xl ${theme.lightGradient} border border-white/50 shadow-level-1 hover:shadow-level-2 transition-all duration-300 p-6`}
            >
                {/* Subtle Background Decoration */}
                <div className="absolute inset-0 opacity-10">
                    <div
                        className={`absolute top-0 right-0 w-24 h-24 ${theme.gradient} rounded-full blur-2xl transform translate-x-12 -translate-y-12`}
                    ></div>
                </div>

                {/* Content */}
                <div className="relative flex items-center justify-between">
                    {/* Left: Greeting */}
                    <div className="flex items-center gap-4">
                        {/* User Avatar */}
                        <div
                            className={`w-12 h-12 ${theme.iconColor} rounded-xl flex items-center justify-center text-white text-xl shadow-sm`}
                        >
                            {userAvatar}
                        </div>

                        {/* Greeting Text */}
                        <div>
                            <h1 className="text-xl font-bold text-graphite leading-tight">
                                {theme.greeting}, {userName || "Creator"}!
                                <span className="ml-2">{theme.emoji}</span>
                            </h1>
                            <p
                                className={`text-sm ${theme.accentColor} font-medium`}
                            >
                                {theme.description}
                            </p>
                        </div>
                    </div>

                    {/* Right: User Stats */}
                    <div className="flex items-center gap-4">
                        {/* EGLD Balance */}
                        {account?.address && (
                            <div className="text-center">
                                <div className="text-lg font-bold text-graphite">
                                    {egldBalance} EGLD
                                </div>
                                <div className="text-xs text-slate">
                                    Balance
                                </div>
                            </div>
                        )}

                        {/* Divider */}
                        {account?.address && (
                            <div className="w-px h-8 bg-ash/30"></div>
                        )}

                        {/* Tokens */}
                        <div className="text-center">
                            <div className="text-lg font-bold text-graphite">
                                {tokenCount}
                            </div>
                            <div className="text-xs text-slate">
                                Token{tokenCount !== 1 ? "s" : ""}
                            </div>
                        </div>

                        {/* Network Status */}
                        <div
                            className={`flex items-center gap-2 px-3 py-2 rounded-lg text-xs font-medium ${getNetworkStatusColor(
                                networkName
                            )}`}
                        >
                            <div className="w-2 h-2 bg-manage-500 rounded-full animate-pulse"></div>
                            {networkName}
                        </div>
                    </div>
                </div>

                {/* Account Address (if connected) */}
                {account?.address && (
                    <div className="mt-4 pt-4 border-t border-white/30">
                        <div className="flex items-center justify-between text-xs">
                            <div className="flex items-center gap-2 text-slate">
                                <span>💼</span>
                                <span>Connected Wallet:</span>
                                <code className="bg-white/50 px-2 py-1 rounded font-mono">
                                    {account.address}
                                </code>
                            </div>
                            <div className="flex items-center gap-2 text-slate">
                                <span>🔄</span>
                                <span>Nonce: {account.nonce}</span>
                            </div>
                        </div>
                    </div>
                )}
            </div>

            {/* Time-based Motivational Message - Keeping your favorite feature! */}
            <div className="mt-3 flex justify-center">
                <div className="bg-white/80 backdrop-blur-sm rounded-lg px-4 py-2 border border-white/50 shadow-sm">
                    <div className="flex items-center gap-2 text-sm">
                        <span>{theme.emoji}</span>
                        <span className="font-medium text-graphite">
                            {hour < 12 && "Rise and build! "}
                            {hour >= 12 && hour < 17 && "Keep going! "}
                            {hour >= 17 && "Evening vibes: "}
                        </span>
                        <span className="text-slate">
                            {tokenCount === 0 && "Your first token awaits"}
                            {tokenCount > 0 &&
                                tokenCount < 3 &&
                                "You're gaining momentum"}
                            {tokenCount >= 3 && "You're inspiring others"}
                        </span>
                    </div>
                </div>
            </div>
        </div>
    );
}
