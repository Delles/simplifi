import { Link } from "react-router-dom";
import TokenSummaryCard from "../components/shared/TokenSummaryCard";

// Mock data for tokens
const mockTokens = [
    { id: "1", name: "SimpliFi Token", ticker: "SIMP" },
    { id: "2", name: "Test Token", ticker: "TEST" },
];

export default function Dashboard() {
    return (
        <div className="p-6 md:p-8 bg-cloud-white min-h-screen">
            {/* Greeting Section */}
            <div className="mb-8">
                <h1 className="text-h1 font-bold text-graphite mb-4">
                    Welcome back!
                </h1>
                <p className="text-body-primary text-slate leading-body-primary">
                    Manage your tokens and access key features from your
                    dashboard.
                </p>
            </div>

            {/* Quick Actions Section */}
            <div className="mb-8">
                <h2 className="text-h2 font-semibold text-graphite mb-4">
                    Quick Actions
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                    <Link
                        to="/create-token"
                        className="bg-pure-white p-6 rounded-card shadow-level-1 hover:shadow-level-2 transition-all duration-200 hover:-translate-y-0.5"
                    >
                        <h3 className="text-h3 font-semibold text-graphite mb-2">
                            Create New Token
                        </h3>
                        <p className="text-body-secondary text-slate leading-body-secondary">
                            Launch your own token
                        </p>
                    </Link>
                    <Link
                        to="/my-tokens"
                        className="bg-pure-white p-6 rounded-card shadow-level-1 hover:shadow-level-2 transition-all duration-200 hover:-translate-y-0.5"
                    >
                        <h3 className="text-h3 font-semibold text-graphite mb-2">
                            Manage My Tokens
                        </h3>
                        <p className="text-body-secondary text-slate leading-body-secondary">
                            View and manage your tokens
                        </p>
                    </Link>
                    <Link
                        to="/airdrop"
                        className="bg-pure-white p-6 rounded-card shadow-level-1 hover:shadow-level-2 transition-all duration-200 hover:-translate-y-0.5"
                    >
                        <h3 className="text-h3 font-semibold text-graphite mb-2">
                            Airdrop Tokens
                        </h3>
                        <p className="text-body-secondary text-slate leading-body-secondary">
                            Distribute tokens to users
                        </p>
                    </Link>
                    <Link
                        to="/liquidity"
                        className="bg-pure-white p-6 rounded-card shadow-level-1 hover:shadow-level-2 transition-all duration-200 hover:-translate-y-0.5"
                    >
                        <h3 className="text-h3 font-semibold text-graphite mb-2">
                            Add Liquidity
                        </h3>
                        <p className="text-body-secondary text-slate leading-body-secondary">
                            Provide liquidity for your tokens
                        </p>
                    </Link>
                </div>
            </div>

            {/* My Managed Tokens Section */}
            <div>
                <h2 className="text-h2 font-semibold text-graphite mb-4">
                    My Managed Tokens
                </h2>
                {mockTokens.length === 0 ? (
                    <div className="bg-pure-white p-8 rounded-card shadow-level-1">
                        <p className="text-body-primary text-slate text-center leading-body-primary">
                            You haven't created any tokens yet. Create your
                            first token to get started!
                        </p>
                    </div>
                ) : (
                    <div className="space-y-4">
                        {mockTokens.map((token) => (
                            <TokenSummaryCard
                                key={token.id}
                                id={token.id}
                                name={token.name}
                                ticker={token.ticker}
                            />
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
}
