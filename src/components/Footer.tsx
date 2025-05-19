export default function Footer() {
    return (
        <footer className="bg-pure-white p-4 text-center text-body-secondary text-slate border-t border-ash">
            <p>
                &copy; {new Date().getFullYear()} SimpliFi DApp. All rights
                reserved.
            </p>
            {/* Add other footer content if needed */}
        </footer>
    );
}
