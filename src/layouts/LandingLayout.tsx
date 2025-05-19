import { Outlet } from "react-router-dom";
import Header from "../components/Header";
import Footer from "../components/Footer";

// TODO: Consider creating specific Header/Footer for LandingLayout if needed

export default function LandingLayout() {
    return (
        <div className="min-h-screen flex flex-col bg-cloud-white">
            <Header />
            <main className="flex-1">
                <Outlet />
            </main>
            <Footer />
        </div>
    );
}
