import { Link } from "react-router-dom";

interface Announcement {
    id: number;
    title: string;
    description: string;
    type: "feature" | "education" | "network" | "community";
    timestamp: string;
    priority: "high" | "medium" | "low";
}

interface PlatformAnnouncementsProps {
    announcements: Announcement[];
}

const getAnnouncementDesign = (type: Announcement["type"]) => {
    switch (type) {
        case "feature":
            return {
                bg: "bg-create-50",
                border: "border-create-200",
                iconBg: "bg-create-500",
                icon: "🎉",
                accent: "text-create-600",
            };
        case "education":
            return {
                bg: "bg-education-background",
                border: "border-education-border",
                iconBg: "bg-education-primary",
                icon: "📚",
                accent: "text-education-primary",
            };
        case "network":
            return {
                bg: "bg-manage-50",
                border: "border-manage-200",
                iconBg: "bg-manage-500",
                icon: "⚡",
                accent: "text-manage-600",
            };
        case "community":
            return {
                bg: "bg-distribute-50",
                border: "border-distribute-200",
                iconBg: "bg-distribute-500",
                icon: "👥",
                accent: "text-distribute-600",
            };
    }
};

const getPriorityDesign = (priority: Announcement["priority"]) => {
    switch (priority) {
        case "high":
            return {
                bg: "bg-error/10",
                text: "text-error",
                border: "border-error/20",
                indicator: "bg-error",
            };
        case "medium":
            return {
                bg: "bg-warning/10",
                text: "text-warning",
                border: "border-warning/20",
                indicator: "bg-warning",
            };
        case "low":
            return {
                bg: "bg-success/10",
                text: "text-success",
                border: "border-success/20",
                indicator: "bg-success",
            };
    }
};

export default function PlatformAnnouncements({
    announcements,
}: PlatformAnnouncementsProps) {
    return (
        <div className="bg-white/90 backdrop-blur-sm rounded-2xl border border-ash/50 shadow-level-2 hover:shadow-level-3 transition-all duration-300">
            {/* Header */}
            <div className="p-6 border-b border-ash/50">
                <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                        <div className="w-12 h-12 bg-gradient-to-br from-create-500 to-blue-600 rounded-xl flex items-center justify-center shadow-level-1">
                            <span className="text-white text-xl">📢</span>
                        </div>
                        <div>
                            <h3 className="text-h4 font-semibold text-graphite">
                                Platform Updates
                            </h3>
                            <p className="text-body-secondary text-slate">
                                Latest news & features
                            </p>
                        </div>
                    </div>
                    <Link
                        to="/app/announcements"
                        className="text-create-600 hover:text-create-700 text-body-secondary font-medium transition-colors"
                    >
                        View All →
                    </Link>
                </div>
            </div>

            {/* Announcements List */}
            <div className="p-6">
                {announcements.length === 0 ? (
                    <div className="text-center py-12">
                        <div className="w-16 h-16 bg-gray-100 rounded-2xl flex items-center justify-center mx-auto mb-4">
                            <span className="text-2xl">📢</span>
                        </div>
                        <h4 className="text-lg font-medium text-graphite mb-2">
                            No announcements
                        </h4>
                        <p className="text-slate text-body-secondary">
                            Platform updates will appear here
                        </p>
                    </div>
                ) : (
                    <div className="space-y-4">
                        {announcements.map((announcement, index) => {
                            const typeDesign = getAnnouncementDesign(
                                announcement.type
                            );
                            const priorityDesign = getPriorityDesign(
                                announcement.priority
                            );

                            return (
                                <div
                                    key={announcement.id}
                                    className={`
                                        group relative p-4 rounded-xl border transition-all duration-200
                                        ${typeDesign.bg} ${typeDesign.border}
                                        hover:shadow-level-1 animate-fade-in-up
                                    `}
                                    style={{
                                        animationDelay: `${index * 0.1}s`,
                                    }}
                                >
                                    <div className="flex items-start space-x-4">
                                        {/* Type Icon */}
                                        <div
                                            className={`
                                            w-10 h-10 rounded-lg flex items-center justify-center text-white
                                            ${typeDesign.iconBg} shadow-level-1
                                        `}
                                        >
                                            <span className="text-lg">
                                                {typeDesign.icon}
                                            </span>
                                        </div>

                                        {/* Content */}
                                        <div className="flex-1 min-w-0">
                                            <div className="flex items-start justify-between">
                                                <div className="flex-1">
                                                    <h4 className="font-medium text-graphite text-body-primary leading-tight">
                                                        {announcement.title}
                                                    </h4>
                                                    <p className="text-slate text-body-secondary mt-1 leading-relaxed">
                                                        {
                                                            announcement.description
                                                        }
                                                    </p>
                                                    <div className="flex items-center space-x-3 mt-3">
                                                        <span className="text-slate text-caption">
                                                            {
                                                                announcement.timestamp
                                                            }
                                                        </span>
                                                        <span className="text-slate text-caption">
                                                            •
                                                        </span>
                                                        <span
                                                            className={`text-caption font-medium capitalize ${typeDesign.accent}`}
                                                        >
                                                            {announcement.type}
                                                        </span>
                                                    </div>
                                                </div>

                                                {/* Priority Indicator */}
                                                <div className="flex items-center space-x-2">
                                                    <div
                                                        className={`
                                                        w-2 h-2 rounded-full animate-pulse-gentle
                                                        ${priorityDesign.indicator}
                                                    `}
                                                    ></div>
                                                    <span
                                                        className={`
                                                        text-caption font-medium capitalize
                                                        ${priorityDesign.text}
                                                    `}
                                                    >
                                                        {announcement.priority}
                                                    </span>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                )}

                {/* Quick Actions */}
                <div className="mt-6 pt-6 border-t border-ash/50">
                    <div className="grid grid-cols-2 gap-3">
                        <Link
                            to="/app/feedback"
                            className="
                                flex items-center justify-center px-4 py-3
                                bg-white/70 hover:bg-white border border-ash/50
                                rounded-xl text-body-secondary font-medium text-slate
                                hover:text-graphite transition-all duration-200
                                hover:shadow-level-1
                            "
                        >
                            <span className="mr-2">💬</span>
                            Give Feedback
                        </Link>
                        <Link
                            to="/app/roadmap"
                            className="
                                flex items-center justify-center px-4 py-3
                                bg-create-500 hover:bg-create-600 text-white
                                rounded-xl text-body-secondary font-medium
                                transition-all duration-200 shadow-level-1
                                hover:shadow-level-2
                            "
                        >
                            <span className="mr-2">🗺️</span>
                            View Roadmap
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
}
