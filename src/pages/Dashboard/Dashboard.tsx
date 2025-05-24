// Dashboard Components
import WelcomeSection from "./components/WelcomeSection";
import UserJourneyBanner from "./components/UserJourneyBanner";
import { QuickActionsGrid } from "./components/QuickActions";
import { TokenPortfolio } from "./components/TokenPortfolio";
import type { Token } from "./components/TokenPortfolio";
import { LearningProgress } from "./components/Sidebar";

// Enhanced Dashboard Components
import RecentActivity from "./components/RecentActivity";
import EducationalSpotlight from "./components/EducationalSpotlight";

// Types for the remaining components
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

// Mock data for user-focused dashboard
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
            <div className="grid grid-cols-1 xl:grid-cols-2 gap-8 mb-8">
                {/* Primary Content - Token Portfolio */}
                <div>
                    <TokenPortfolio tokens={mockTokens} />
                </div>

                {/* Secondary Content - Recent Activity */}
                <div>
                    <RecentActivity activities={mockRecentActivity} />
                </div>
            </div>

            {/* Educational & Learning Section */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Learning Progress - Takes 2 columns for priority */}
                <div className="lg:col-span-2 flex">
                    <LearningProgress data={mockLearningProgress} />
                </div>

                {/* Educational Spotlight - Takes 1 column */}
                <div className="flex">
                    <EducationalSpotlight content={mockEducationalSpotlight} />
                </div>
            </div>
        </div>
    );
}
