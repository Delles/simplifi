export default function Footer() {
    return (
        <footer className="bg-gray-200 p-4 text-center text-sm text-gray-600">
            <p>
                &copy; {new Date().getFullYear()} Simplifi DApp. All rights
                reserved.
            </p>
            {/* Add other footer content if needed */}
        </footer>
    );
}
