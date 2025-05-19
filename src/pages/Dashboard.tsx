export default function Dashboard() {
    return (
        <div className="p-6 md:p-8">
            <h1 className="text-h1 font-bold text-graphite mb-4">Dashboard</h1>
            <p className="text-body-primary text-slate mt-4">
                Welcome to your dashboard! This is where you can manage your
                SimpliFi account.
            </p>
            {/* Add dashboard content here, potentially using Card components */}
            {/* Example Card usage (assuming a Card component exists):
            <div className="mt-6 bg-pure-white p-6 rounded-card shadow-level-1">
                <h3 className="text-h3 font-semibold text-graphite mb-3">My Tokens</h3>
                <p className="text-body-secondary text-slate">No tokens found. Create one now!</p>
            </div>
            */}
        </div>
    );
}
