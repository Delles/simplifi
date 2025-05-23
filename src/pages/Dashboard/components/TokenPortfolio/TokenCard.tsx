import { Link } from "react-router-dom";

export interface Token {
    id: string;
    name: string;
    ticker: string;
    supply: string;
    holders: number;
    status: "active" | "paused";
    lastActivity: string;
}

interface TokenCardProps {
    token: Token;
}

const generateTokenGradient = (ticker: string) => {
    const gradients = [
        "bg-gradient-to-br from-create-500 via-blue-500 to-indigo-600",
        "bg-gradient-to-br from-manage-500 via-emerald-500 to-green-600",
        "bg-gradient-to-br from-distribute-500 via-amber-500 to-orange-600",
        "bg-gradient-to-br from-purple-500 via-pink-500 to-red-500",
        "bg-gradient-to-br from-cyan-500 via-blue-500 to-purple-600",
        "bg-gradient-to-br from-green-500 via-teal-500 to-blue-500",
    ];

    const charSum = ticker
        .split("")
        .reduce((sum, char) => sum + char.charCodeAt(0), 0);
    return gradients[charSum % gradients.length];
};

const getStatusDesign = (status: Token["status"]) => {
    if (status === "active") {
        return {
            bg: "bg-manage-100",
            text: "text-manage-700",
            border: "border-manage-200",
            icon: "✅",
            pulse: "bg-manage-500",
        };
    } else {
        return {
            bg: "bg-amber-100",
            text: "text-amber-700",
            border: "border-amber-200",
            icon: "⏸️",
            pulse: "bg-amber-500",
        };
    }
};

const formatSupply = (supply: string) => {
    const num = parseInt(supply);
    if (num >= 1000000) {
        return `${(num / 1000000).toFixed(1)}M`;
    } else if (num >= 1000) {
        return `${(num / 1000).toFixed(1)}K`;
    }
    return supply;
};

export default function TokenCard({ token }: TokenCardProps) {
    const tokenGradient = generateTokenGradient(token.ticker);
    const statusDesign = getStatusDesign(token.status);

    return (
        <div className="group relative">
            {/* Background gradient overlay */}
            <div className="absolute inset-0 bg-gradient-to-r from-create-50 via-manage-50 to-distribute-50 rounded-2xl opacity-40"></div>

            {/* Main card */}
            <div className="relative backdrop-blur-sm bg-white/90 rounded-2xl border border-white/50 shadow-level-2 hover:shadow-level-3 transition-all duration-300 transform hover:scale-[1.01] hover:-translate-y-1 p-6">
                {/* Decorative corner elements */}
                <div className="absolute top-4 right-4 opacity-20">
                    <div
                        className={`w-12 h-12 ${tokenGradient} rounded-full blur-xl`}
                    ></div>
                </div>

                {/* Token Header */}
                <div className="relative flex items-center justify-between mb-6">
                    <div className="flex items-center gap-4">
                        {/* Enhanced Token Avatar */}
                        <div className="relative">
                            <div
                                className={`w-16 h-16 ${tokenGradient} rounded-2xl flex items-center justify-center text-white font-bold text-xl shadow-lg group-hover:scale-110 group-hover:rotate-3 transition-all duration-300`}
                            >
                                {token.ticker.slice(0, 2)}
                            </div>
                            {/* Animated ring */}
                            <div
                                className={`absolute inset-0 rounded-2xl border-2 border-white/30 group-hover:scale-110 transition-transform duration-300`}
                            ></div>
                        </div>

                        {/* Token Info */}
                        <div>
                            <h3 className="text-xl font-bold text-graphite group-hover:text-graphite mb-1">
                                {token.name}
                            </h3>
                            <div className="flex items-center gap-2">
                                <span className="text-sm font-medium text-slate bg-gray-100 px-2 py-1 rounded-lg">
                                    {token.ticker}
                                </span>
                                <div className="w-1 h-1 bg-slate rounded-full"></div>
                                <span className="text-xs text-slate">
                                    ID: {token.id}
                                </span>
                            </div>
                        </div>
                    </div>

                    {/* Enhanced Status Badge */}
                    <div
                        className={`px-4 py-2 rounded-xl text-sm font-medium border backdrop-blur-sm ${statusDesign.bg} ${statusDesign.text} ${statusDesign.border} group-hover:scale-105 transition-transform duration-200`}
                    >
                        <div className="flex items-center gap-2">
                            <div className="relative">
                                <div
                                    className={`w-2 h-2 ${statusDesign.pulse} rounded-full animate-pulse`}
                                ></div>
                                {token.status === "active" && (
                                    <div className="absolute inset-0 w-2 h-2 bg-manage-500 rounded-full animate-ping opacity-30"></div>
                                )}
                            </div>
                            <span>
                                {statusDesign.icon}{" "}
                                {token.status.charAt(0).toUpperCase() +
                                    token.status.slice(1)}
                            </span>
                        </div>
                    </div>
                </div>

                {/* Enhanced Token Stats */}
                <div className="grid grid-cols-3 gap-6 mb-6">
                    <div className="text-center group/stat">
                        <div className="bg-white/70 backdrop-blur-sm rounded-xl p-4 border border-white/50 shadow-level-1 group-hover/stat:shadow-level-2 transition-all duration-200">
                            <div className="text-2xl font-bold text-graphite mb-1">
                                {formatSupply(token.supply)}
                            </div>
                            <div className="text-xs text-slate font-medium">
                                Total Supply
                            </div>
                            <div className="w-full h-1 bg-create-500 rounded-full mt-2 opacity-20"></div>
                        </div>
                    </div>

                    <div className="text-center group/stat">
                        <div className="bg-white/70 backdrop-blur-sm rounded-xl p-4 border border-white/50 shadow-level-1 group-hover/stat:shadow-level-2 transition-all duration-200">
                            <div className="text-2xl font-bold text-graphite mb-1">
                                {token.holders.toLocaleString()}
                            </div>
                            <div className="text-xs text-slate font-medium">
                                Holders
                            </div>
                            <div className="w-full h-1 bg-manage-500 rounded-full mt-2 opacity-20"></div>
                        </div>
                    </div>

                    <div className="text-center group/stat">
                        <div className="bg-white/70 backdrop-blur-sm rounded-xl p-4 border border-white/50 shadow-level-1 group-hover/stat:shadow-level-2 transition-all duration-200">
                            <div className="text-sm font-semibold text-graphite mb-1">
                                {token.lastActivity}
                            </div>
                            <div className="text-xs text-slate font-medium">
                                Last Activity
                            </div>
                            <div className="w-full h-1 bg-distribute-500 rounded-full mt-2 opacity-20"></div>
                        </div>
                    </div>
                </div>

                {/* Enhanced Action Buttons */}
                <div className="flex gap-3">
                    <Link
                        to={`/app/token/${token.id}/manage`}
                        className="flex-1 group/btn relative overflow-hidden rounded-xl bg-manage-500 hover:bg-manage-600 text-white font-semibold py-3 px-4 shadow-lg hover:shadow-xl transition-all duration-200 transform hover:scale-105"
                    >
                        <div className="relative flex items-center justify-center gap-2">
                            <span className="text-lg">⚙️</span>
                            <span>Manage</span>
                            <svg
                                className="w-4 h-4 opacity-0 group-hover/btn:opacity-100 transition-opacity duration-200"
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
                        {/* Hover glow effect */}
                        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent opacity-0 group-hover/btn:opacity-100 transition-opacity duration-300 transform -skew-x-12"></div>
                    </Link>

                    <Link
                        to={`/airdrop?token=${token.id}`}
                        className="flex-1 group/btn relative overflow-hidden rounded-xl bg-distribute-500 hover:bg-distribute-600 text-white font-semibold py-3 px-4 shadow-lg hover:shadow-xl transition-all duration-200 transform hover:scale-105"
                    >
                        <div className="relative flex items-center justify-center gap-2">
                            <span className="text-lg">🎯</span>
                            <span>Airdrop</span>
                            <svg
                                className="w-4 h-4 opacity-0 group-hover/btn:opacity-100 transition-opacity duration-200"
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
                        {/* Hover glow effect */}
                        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent opacity-0 group-hover/btn:opacity-100 transition-opacity duration-300 transform -skew-x-12"></div>
                    </Link>
                </div>

                {/* Bottom accent line */}
                <div
                    className={`absolute bottom-0 left-0 right-0 h-1 ${tokenGradient} transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-center rounded-b-2xl`}
                ></div>
            </div>
        </div>
    );
}
