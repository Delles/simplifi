import { Link } from "react-router-dom";

export default function Sidebar() {
    return (
        <aside className="w-64 bg-gray-100 p-4 space-y-2">
            <h2 className="text-lg font-semibold mb-4">Navigation</h2>
            <Link to="/app" className="block hover:text-blue-600">
                Dashboard
            </Link>
            <Link to="/app/settings" className="block hover:text-blue-600">
                Settings
            </Link>
            {/* Add more links as needed */}
        </aside>
    );
}
