import { Outlet } from "react-router-dom";
import Footer from "../components/Footer";
import Header from "../components/Header";
import Sidebar from "../components/Sidebar";

export default function MainLayout() {
    return (
        <div className="min-h-screen flex flex-col bg-cloud-white">
            <Header />
            <div className="flex flex-1">
                <Sidebar />
                <main className="flex-1">
                    <Outlet />
                </main>
            </div>
            <Footer />
        </div>
    );
}
