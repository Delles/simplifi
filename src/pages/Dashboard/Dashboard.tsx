// Dashboard Components
import WelcomeSection from "./components/WelcomeSection";
import UserJourneyBanner from "./components/UserJourneyBanner";
import { QuickActionsGrid } from "./components/QuickActions";
import { TokenPortfolio } from "./components/TokenPortfolio";
import type { Token } from "./components/TokenPortfolio";
import {
    LearningProgress,
    CommunityHighlights,
    PlatformStats,
} from "./components/Sidebar";

// Enhanced Dashboard Components
import RecentActivity from "./components/RecentActivity";
import EducationalSpotlight from "./components/EducationalSpotlight";
import PlatformAnnouncements from "./components/PlatformAnnouncements";

// Types for the new components
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

interface EducationalContent {
    title: string;
    description: string;
    category: string;
    readTime: string;
    difficulty: "Beginner" | "Intermediate" | "Advanced";
    topics: string[];
    cta: string;
    route: string;
}

interface Announcement {
    id: number;
    title: string;
    description: string;
    type: "feature" | "education" | "network" | "community";
    timestamp: string;
    priority: "high" | "medium" | "low";
}

// Mock data for enhanced dashboard
const mockTokens: Token[] = [
    {
        id: "1",
        name: "SimpliFi Token",
        ticker: "SIMP",
        supply: "1000000",
        holders: 156,
        status: "active",
        lastActivity: "2 hours ago",
    },
    {
        id: "2",
        name: "Creator Coin",
        ticker: "CREATE",
        supply: "500000",
        holders: 42,
        status: "active",
        lastActivity: "1 day ago",
    },
    {
        id: "3",
        name: "Test Token",
        ticker: "TEST",
        supply: "100000",
        holders: 8,
        status: "paused",
        lastActivity: "3 days ago",
    },
];

const mockLearningProgress = {
    completedSteps: 4,
    totalSteps: 8,
    currentTopic: "Liquidity Provision",
    nextRecommendation: "Learn about Token Distribution Strategies",
    recentAchievements: [
        "Token Creation Basics ✓",
        "Understanding ESDT Properties ✓",
        "Token Management Fundamentals ✓",
        "Introduction to DEX Liquidity ✓",
    ],
};

const mockCommunityHighlights = [
    {
        id: 1,
        title: "🎨 Digital Artist Creates Fan Token for 10K Community",
        description:
            "Sarah M. successfully distributed 100K tokens to her art community, enabling exclusive content access and voting rights.",
        category: "Creator Success",
        timestamp: "2 hours ago",
        engagement: "245 likes • 32 comments",
    },
    {
        id: 2,
        title: "🚀 Local Coffee Shop Launches Loyalty Token",
        description:
            "Bean & Brew Coffee created a loyalty token system, increasing customer retention by 40% in just 2 weeks.",
        category: "Business Innovation",
        timestamp: "5 hours ago",
        engagement: "189 likes • 28 comments",
    },
    {
        id: 3,
        title: "🌟 Gaming Community Raises $50K Through Token Launch",
        description:
            "Pixel Warriors DAO used SimpliFi to launch their governance token, funding their next game development cycle.",
        category: "Community Win",
        timestamp: "1 day ago",
        engagement: "412 likes • 67 comments",
    },
];

const mockPlatformStats = {
    tokensCreated: "15,847+",
    activeCreators: "4,230+",
    totalAirdrops: "12,450+",
    liquidityAdded: "$2.8M+",
    weeklyGrowth: {
        tokens: "+12%",
        creators: "+8%",
        airdrops: "+15%",
        liquidity: "+22%",
    },
};

const mockRecentActivity: Activity[] = [
    {
        id: 1,
        type: "token_created",
        title: "Created SIMP Token",
        description: "Successfully issued 1M tokens with mint capability",
        timestamp: "2 hours ago",
        status: "completed",
        txHash: "abc123...",
        color: "create",
    },
    {
        id: 2,
        type: "liquidity_added",
        title: "Added Liquidity to SIMP/EGLD",
        description: "Provided 1000 SIMP + 0.5 EGLD to xExchange",
        timestamp: "1 day ago",
        status: "completed",
        txHash: "def456...",
        color: "distribute",
    },
    {
        id: 3,
        type: "airdrop_completed",
        title: "Airdrop to 50 Recipients",
        description: "Distributed 10,000 CREATE tokens to community members",
        timestamp: "3 days ago",
        status: "completed",
        txHash: "ghi789...",
        color: "distribute",
    },
];

const mockEducationalSpotlight: EducationalContent = {
    title: "Understanding Token Economics",
    description:
        "Learn how to design sustainable tokenomics that align incentives and drive long-term value for your community.",
    category: "Advanced Concepts",
    readTime: "8 min read",
    difficulty: "Intermediate",
    topics: [
        "Supply Mechanics",
        "Utility Design",
        "Distribution Strategy",
        "Value Accrual",
    ],
    cta: "Start Learning",
    route: "/app/education/tokenomics",
};

const mockAnnouncements: Announcement[] = [
    {
        id: 1,
        title: "🎉 New Feature: Batch Token Management",
        description:
            "Manage multiple tokens simultaneously with our new batch operations interface.",
        type: "feature",
        timestamp: "1 day ago",
        priority: "high",
    },
    {
        id: 2,
        title: "📚 Educational Series: DeFi Fundamentals",
        description:
            "Join our 5-part educational series covering DeFi basics, starting next week.",
        type: "education",
        timestamp: "2 days ago",
        priority: "medium",
    },
    {
        id: 3,
        title: "⚡ Network Update: Reduced Transaction Fees",
        description:
            "MultiversX network upgrade has reduced average transaction costs by 30%.",
        type: "network",
        timestamp: "1 week ago",
        priority: "low",
    },
];

export default function Dashboard() {
    return (
        <div className="p-6 md:p-8 bg-app-canvas min-h-screen">
            {/* Welcome Section */}
            <WelcomeSection
                tokenCount={mockTokens.length}
                networkName="Mainnet"
            />

            {/* User Journey Banner */}
            <UserJourneyBanner tokenCount={mockTokens.length} />

            {/* Quick Actions Grid */}
            <QuickActionsGrid tokenCount={mockTokens.length} />

            {/* Main Content Grid */}
            <div className="grid grid-cols-1 xl:grid-cols-4 gap-8 mb-8">
                {/* Primary Content - Token Portfolio */}
                <div className="xl:col-span-2">
                    <TokenPortfolio tokens={mockTokens} />
                </div>

                {/* Secondary Content - Recent Activity */}
                <div className="xl:col-span-2">
                    <RecentActivity activities={mockRecentActivity} />
                </div>
            </div>

            {/* Educational & Community Section */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
                {/* Educational Spotlight */}
                <EducationalSpotlight content={mockEducationalSpotlight} />

                {/* Platform Announcements */}
                <PlatformAnnouncements announcements={mockAnnouncements} />
            </div>

            {/* Bottom Grid - Community & Stats */}
            <div className="grid grid-cols-1 xl:grid-cols-3 gap-8">
                {/* Learning Progress */}
                <LearningProgress data={mockLearningProgress} />

                {/* Community Highlights */}
                <CommunityHighlights highlights={mockCommunityHighlights} />

                {/* Platform Stats */}
                <PlatformStats data={mockPlatformStats} />
            </div>
        </div>
    );
}
