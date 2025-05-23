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
        name: "Test Token",
        ticker: "TEST",
        supply: "500000",
        holders: 42,
        status: "paused",
        lastActivity: "1 day ago",
    },
];

const mockLearningProgress = {
    completedSteps: 3,
    totalSteps: 8,
    currentTopic: "Token Economics",
    nextRecommendation: "Learn about Liquidity Provision",
};

const mockCommunityHighlights = [
    {
        id: 1,
        title: "🎨 Artist launches fan token for exclusive content",
        description:
            "Digital artist Sarah M. distributed 50K tokens to 1,200 fans",
        category: "Creator Success",
    },
    {
        id: 2,
        title: "🚀 Startup raises $100K through utility token",
        description: "TechFlow used SimpliFi to launch their platform token",
        category: "Startup Win",
    },
];

const mockPlatformStats = {
    tokensCreated: "12,450+",
    activeCreators: "3,280+",
    totalAirdrops: "8,950+",
};

export default function Dashboard() {
    return (
        <div className="p-6 md:p-8 bg-cloud-white min-h-screen">
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
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Token Portfolio */}
                <TokenPortfolio tokens={mockTokens} />

                {/* Right Sidebar */}
                <div className="space-y-6">
                    <LearningProgress data={mockLearningProgress} />
                    <CommunityHighlights highlights={mockCommunityHighlights} />
                    <PlatformStats data={mockPlatformStats} />
                </div>
            </div>
        </div>
    );
}
