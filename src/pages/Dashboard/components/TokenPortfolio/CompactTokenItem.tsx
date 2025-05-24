import { Link } from "react-router-dom";
import type { Token } from "./TokenCard";

interface CompactTokenItemProps {
    token: Token;
    isExpanded: boolean;
    onToggleExpanded: () => void;
}

const generateTokenGradient = (ticker: string) => {
    const gradients = [
        "from-create-500 to-blue-600",
        "from-manage-500 to-emerald-600",
        "from-distribute-500 to-amber-600",
        "from-purple-500 to-pink-600",
        "from-cyan-500 to-blue-600",
        "from-green-500 to-teal-600",
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
            dot: "bg-manage-500",
        };
    } else {
        return {
            bg: "bg-distribute-100",
            text: "text-distribute-700",
            dot: "bg-distribute-500",
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

export default function CompactTokenItem({
    token,
    isExpanded,
    onToggleExpanded,
}: CompactTokenItemProps) {
    const tokenGradient = generateTokenGradient(token.ticker);
    const statusDesign = getStatusDesign(token.status);

    return (
        <div
            className={`
                group border border-ash/20 rounded-lg transition-all duration-300 overflow-hidden
                ${
                    isExpanded
                        ? "bg-white shadow-level-2 border-ash/40"
                        : "bg-gray-50/50 hover:bg-white hover:shadow-level-1 hover:border-ash/30"
                }
            `}
        >
            {/* Compact Header - Always Visible */}
            <div
                className="flex items-center justify-between p-4 cursor-pointer"
                onClick={onToggleExpanded}
            >
                <div className="flex items-center gap-3 flex-1 min-w-0">
                    {/* Small Token Avatar */}
                    <div
                        className={`w-10 h-10 bg-gradient-to-br ${tokenGradient} rounded-lg flex items-center justify-center text-white font-bold text-xs shadow-sm flex-shrink-0`}
                    >
                        {token.ticker.slice(0, 2)}
                    </div>

                    {/* Token Info */}
                    <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 mb-1">
                            <h4 className="font-medium text-graphite text-sm truncate">
                                {token.name}
                            </h4>
                            <span className="text-xs font-medium text-slate bg-gray-200 px-1.5 py-0.5 rounded flex-shrink-0">
                                {token.ticker}
                            </span>
                        </div>
                        <div className="flex items-center gap-3 text-xs text-slate/70">
                            <span>{formatSupply(token.supply)} supply</span>
                            <span>•</span>
                            <span>{token.holders} holders</span>
                        </div>
                    </div>
                </div>

                <div className="flex items-center gap-3 flex-shrink-0">
                    {/* Status */}
                    <div
                        className={`flex items-center gap-1 px-2 py-1 rounded text-xs font-medium ${statusDesign.bg} ${statusDesign.text}`}
                    >
                        <div
                            className={`w-1 h-1 ${statusDesign.dot} rounded-full`}
                        ></div>
                        {token.status}
                    </div>

                    {/* Expand/Collapse Icon */}
                    <div
                        className={`transition-transform duration-200 ${
                            isExpanded ? "rotate-180" : ""
                        }`}
                    >
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
                                d="M19 9l-7 7-7-7"
                            />
                        </svg>
                    </div>
                </div>
            </div>

            {/* Expanded Content */}
            {isExpanded && (
                <div className="px-4 pb-4 pt-0 border-t border-ash/10 animate-fade-in">
                    {/* Detailed Stats */}
                    <div className="flex items-center justify-between py-3 px-3 bg-gray-50/50 rounded-lg mb-3">
                        <div className="text-center">
                            <div className="text-sm font-semibold text-graphite">
                                {formatSupply(token.supply)}
                            </div>
                            <div className="text-xs text-slate/70">
                                Total Supply
                            </div>
                        </div>
                        <div className="w-px h-6 bg-ash/30"></div>
                        <div className="text-center">
                            <div className="text-sm font-semibold text-graphite">
                                {token.holders.toLocaleString()}
                            </div>
                            <div className="text-xs text-slate/70">Holders</div>
                        </div>
                        <div className="w-px h-6 bg-ash/30"></div>
                        <div className="text-center">
                            <div className="text-sm font-semibold text-graphite">
                                {token.lastActivity}
                            </div>
                            <div className="text-xs text-slate/70">
                                Last Activity
                            </div>
                        </div>
                    </div>

                    {/* Action Buttons */}
                    <div className="flex gap-2">
                        <Link
                            to={`/app/token/${token.id}/manage`}
                            className="flex-1 flex items-center justify-center gap-1.5 px-3 py-2 bg-manage-500 hover:bg-manage-600 text-white text-sm font-medium rounded-lg transition-colors duration-200"
                            onClick={(e) => e.stopPropagation()}
                        >
                            <span className="text-sm">⚙️</span>
                            Manage
                        </Link>
                        <Link
                            to={`/airdrop?token=${token.id}`}
                            className="flex-1 flex items-center justify-center gap-1.5 px-3 py-2 bg-distribute-500 hover:bg-distribute-600 text-white text-sm font-medium rounded-lg transition-colors duration-200"
                            onClick={(e) => e.stopPropagation()}
                        >
                            <span className="text-sm">🎯</span>
                            Airdrop
                        </Link>
                    </div>
                </div>
            )}
        </div>
    );
}
