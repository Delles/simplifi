import { Link } from "react-router-dom";

interface TokenSummaryCardProps {
    id: string;
    name: string;
    ticker: string;
}

export default function TokenSummaryCard({
    id,
    name,
    ticker,
}: TokenSummaryCardProps) {
    return (
        <div className="bg-pure-white p-4 rounded-card shadow-level-1 flex justify-between items-center hover:shadow-level-2 transition-all duration-200">
            <div>
                <h3 className="text-h3 font-semibold text-graphite">{name}</h3>
                <p className="text-body-secondary text-slate">{ticker}</p>
            </div>
            <Link
                to={`/my-tokens/${id}`}
                className="px-6 py-2 bg-cyber-teal text-deep-teal-black font-medium text-button-lg rounded-ui-element hover:bg-opacity-90 transition-colors focus:outline-none focus:ring-2 focus:ring-cyber-teal focus:ring-offset-2"
            >
                Manage
            </Link>
        </div>
    );
}
