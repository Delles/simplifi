import { Link } from "react-router-dom";

interface Activity {
    id: number;
    type: string;
    title: string;
    description: string;
    timestamp: string;
    status: "completed" | "pending" | "failed";
    txHash?: string;
    color: "create" | "manage" | "distribute";
}

interface RecentActivityProps {
    activities: Activity[];
}

const getActivityIcon = (type: string) => {
    switch (type) {
        case "token_created":
            return "🚀";
        case "liquidity_added":
            return "💧";
        case "airdrop_completed":
            return "🌟";
        case "token_minted":
            return "⚡";
        case "token_burned":
            return "🔥";
        default:
            return "📝";
    }
};

const getStatusDesign = (status: Activity["status"]) => {
    switch (status) {
        case "completed":
            return {
                bg: "bg-success/10",
                text: "text-success",
                border: "border-success/20",
                icon: "✓",
            };
        case "pending":
            return {
                bg: "bg-warning/10",
                text: "text-warning",
                border: "border-warning/20",
                icon: "⏳",
            };
        case "failed":
            return {
                bg: "bg-error/10",
                text: "text-error",
                border: "border-error/20",
                icon: "✗",
            };
    }
};

const getColorDesign = (color: Activity["color"]) => {
    switch (color) {
        case "create":
            return {
                bg: "bg-create-50",
                border: "border-create-200",
                iconBg: "bg-create-500",
                accent: "text-create-600",
            };
        case "manage":
            return {
                bg: "bg-manage-50",
                border: "border-manage-200",
                iconBg: "bg-manage-500",
                accent: "text-manage-600",
            };
        case "distribute":
            return {
                bg: "bg-distribute-50",
                border: "border-distribute-200",
                iconBg: "bg-distribute-500",
                accent: "text-distribute-600",
            };
    }
};

export default function RecentActivity({ activities }: RecentActivityProps) {
    return (
        <div className="bg-white/90 backdrop-blur-sm rounded-2xl border border-ash/50 shadow-level-2 hover:shadow-level-3 transition-all duration-300">
            {/* Header */}
            <div className="p-6 border-b border-ash/50">
                <div className="flex items-center justify-between">
                    <div>
                        <h3 className="text-h4 font-semibold text-graphite">
                            Recent Activity
                        </h3>
                        <p className="text-body-secondary text-slate mt-1">
                            Your latest blockchain transactions
                        </p>
                    </div>
                    <Link
                        to="/app/activity"
                        className="text-create-600 hover:text-create-700 text-body-secondary font-medium transition-colors"
                    >
                        View All →
                    </Link>
                </div>
            </div>

            {/* Activity List */}
            <div className="p-6">
                {activities.length === 0 ? (
                    <div className="text-center py-12">
                        <div className="w-16 h-16 bg-gray-100 rounded-2xl flex items-center justify-center mx-auto mb-4">
                            <span className="text-2xl">📝</span>
                        </div>
                        <h4 className="text-lg font-medium text-graphite mb-2">
                            No activity yet
                        </h4>
                        <p className="text-slate text-body-secondary">
                            Your blockchain transactions will appear here
                        </p>
                    </div>
                ) : (
                    <div className="space-y-4">
                        {activities.map((activity, index) => {
                            const statusDesign = getStatusDesign(
                                activity.status
                            );
                            const colorDesign = getColorDesign(activity.color);

                            return (
                                <div
                                    key={activity.id}
                                    className={`
                                        group relative p-4 rounded-xl border transition-all duration-200
                                        ${colorDesign.bg} ${colorDesign.border}
                                        hover:shadow-level-1 animate-fade-in-up
                                    `}
                                    style={{
                                        animationDelay: `${index * 0.1}s`,
                                    }}
                                >
                                    <div className="flex items-start space-x-4">
                                        {/* Activity Icon */}
                                        <div
                                            className={`
                                            w-12 h-12 rounded-xl flex items-center justify-center text-white
                                            ${colorDesign.iconBg} shadow-level-1
                                        `}
                                        >
                                            <span className="text-lg">
                                                {getActivityIcon(activity.type)}
                                            </span>
                                        </div>

                                        {/* Content */}
                                        <div className="flex-1 min-w-0">
                                            <div className="flex items-start justify-between">
                                                <div className="flex-1">
                                                    <h4 className="font-medium text-graphite text-body-primary">
                                                        {activity.title}
                                                    </h4>
                                                    <p className="text-slate text-body-secondary mt-1">
                                                        {activity.description}
                                                    </p>
                                                    <div className="flex items-center space-x-4 mt-2">
                                                        <span className="text-slate text-caption">
                                                            {activity.timestamp}
                                                        </span>
                                                        {activity.txHash && (
                                                            <a
                                                                href={`https://explorer.multiversx.com/transactions/${activity.txHash}`}
                                                                target="_blank"
                                                                rel="noopener noreferrer"
                                                                className="text-create-600 hover:text-create-700 text-caption font-medium transition-colors"
                                                            >
                                                                View Transaction
                                                                →
                                                            </a>
                                                        )}
                                                    </div>
                                                </div>

                                                {/* Status Badge */}
                                                <div
                                                    className={`
                                                    px-3 py-1 rounded-full border text-caption font-medium
                                                    ${statusDesign.bg} ${statusDesign.text} ${statusDesign.border}
                                                `}
                                                >
                                                    <span className="mr-1">
                                                        {statusDesign.icon}
                                                    </span>
                                                    {activity.status}
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                )}
            </div>
        </div>
    );
}
