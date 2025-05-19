import { Link } from "react-router-dom";

export default function Sidebar() {
    return (
        <aside className="w-64 bg-pure-white p-4 space-y-2 shadow-level-1">
            <h2 className="text-h3 font-semibold mb-4 text-graphite">
                Navigation
            </h2>
            <Link
                to="/app"
                className="block text-slate hover:text-cyber-teal py-2 px-3 rounded-ui-element"
            >
                Dashboard
            </Link>
            <Link
                to="/app/settings"
                className="block text-slate hover:text-cyber-teal py-2 px-3 rounded-ui-element"
            >
                Settings
            </Link>
        </aside>
    );
}
