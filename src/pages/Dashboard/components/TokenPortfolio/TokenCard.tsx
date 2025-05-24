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
            icon: "●",
        };
    } else {
        return {
            bg: "bg-distribute-100",
            text: "text-distribute-700",
            dot: "bg-distribute-500",
            icon: "●",
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
        <div className="group bg-white rounded-xl border border-ash/30 hover:border-ash/50 shadow-level-1 hover:shadow-level-2 transition-all duration-200 p-6">
            {/* Header */}
            <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-3">
                    {/* Token Avatar - Smaller and cleaner */}
                    <div
                        className={`w-12 h-12 bg-gradient-to-br ${tokenGradient} rounded-xl flex items-center justify-center text-white font-bold text-sm shadow-sm`}
                    >
                        {token.ticker.slice(0, 2)}
                    </div>

                    {/* Token Info */}
                    <div>
                        <h3 className="font-semibold text-graphite text-lg leading-tight">
                            {token.name}
                        </h3>
                        <div className="flex items-center gap-2 mt-1">
                            <span className="text-sm font-medium text-slate bg-gray-100 px-2 py-0.5 rounded-md">
                                {token.ticker}
                            </span>
                            <span className="text-xs text-slate/60">
                                #{token.id}
                            </span>
                        </div>
                    </div>
                </div>

                {/* Status Badge - Smaller */}
                <div
                    className={`flex items-center gap-1.5 px-2.5 py-1 rounded-lg text-xs font-medium ${statusDesign.bg} ${statusDesign.text}`}
                >
                    <div
                        className={`w-1.5 h-1.5 ${statusDesign.dot} rounded-full`}
                    ></div>
                    {token.status}
                </div>
            </div>

            {/* Stats - Horizontal layout instead of grid */}
            <div className="flex items-center justify-between py-3 px-4 bg-gray-50/50 rounded-lg mb-4">
                <div className="text-center">
                    <div className="text-sm font-semibold text-graphite">
                        {formatSupply(token.supply)}
                    </div>
                    <div className="text-xs text-slate/70">Supply</div>
                </div>
                <div className="w-px h-8 bg-ash/30"></div>
                <div className="text-center">
                    <div className="text-sm font-semibold text-graphite">
                        {token.holders.toLocaleString()}
                    </div>
                    <div className="text-xs text-slate/70">Holders</div>
                </div>
                <div className="w-px h-8 bg-ash/30"></div>
                <div className="text-center">
                    <div className="text-sm font-semibold text-graphite">
                        {token.lastActivity}
                    </div>
                    <div className="text-xs text-slate/70">Last Activity</div>
                </div>
            </div>

            {/* Action Buttons - Smaller and inline */}
            <div className="flex gap-2">
                <Link
                    to={`/app/token/${token.id}/manage`}
                    className="flex-1 flex items-center justify-center gap-1.5 px-3 py-2 bg-manage-500 hover:bg-manage-600 text-white text-sm font-medium rounded-lg transition-colors duration-200"
                >
                    <span className="text-sm">⚙️</span>
                    Manage
                </Link>
                <Link
                    to={`/airdrop?token=${token.id}`}
                    className="flex-1 flex items-center justify-center gap-1.5 px-3 py-2 bg-distribute-500 hover:bg-distribute-600 text-white text-sm font-medium rounded-lg transition-colors duration-200"
                >
                    <span className="text-sm">🎯</span>
                    Airdrop
                </Link>
            </div>
        </div>
    );
}
