import { BrowserRouter, Routes, Route } from "react-router-dom";
// import { MainLayout, LandingLayout } from "./layouts"; // Old import
import MainLayout from "./layouts/MainLayout";
import LandingLayout from "./layouts/LandingLayout";
// import { DappProvider } from "@multiversx/sdk-dapp/wrappers"; // Removed
// import { EnvironmentsEnum } from "@multiversx/sdk-dapp/types"; // Removed, DappProvider config is in main.tsx
import LandingPage from "./pages/LandingPage/LandingPage"; // Add LandingPage import
import Dashboard from "./pages/Dashboard/Dashboard"; // Assuming these exist or will be created
import SettingsPagePlaceholder from "./pages/SettingsPagePlaceholder/SettingsPagePlaceholder"; // Assuming these exist or will be created
import { TokenCreationWizard } from "./pages/TokenCreationWizard/TokenCreationWizard";
import { AuthGuard } from "./components/AuthGuard"; // Import AuthGuard
import { GuestGuard } from "./components/GuestGuard"; // Import GuestGuard
import { LPCreationWizard } from "./pages/LPCreationWizard/LPCreationWizard";
import EducationCenter from "./pages/EducationCenter"; // Add EducationCenter import

export default function App() {
    return (
        // <DappProvider  // Removed DappProvider from here
        //     environment={EnvironmentsEnum.testnet}
        //     customNetworkConfig={{
        //         name: 'testnetConfig',
        //         apiTimeout: 6000,
        //         apiAddress: 'https://testnet-api.multiversx.com',
        //         walletConnectV2ProjectId: "YOUR_WALLET_CONNECT_PROJECT_ID_REPLACE_ME",
        //     }}
        // >
        <BrowserRouter>
            <Routes>
                {/* Public routes wrapped with GuestGuard */}
                <Route
                    path="/"
                    element={
                        <GuestGuard>
                            <LandingLayout />
                        </GuestGuard>
                    }
                >
                    <Route index element={<LandingPage />} />
                    <Route path="learn" element={<EducationCenter />} />
                </Route>

                {/* Protected routes wrapped with AuthGuard */}
                <Route
                    path="/app"
                    element={
                        <AuthGuard>
                            <MainLayout />
                        </AuthGuard>
                    }
                >
                    <Route index element={<Dashboard />} />
                    <Route
                        path="settings"
                        element={<SettingsPagePlaceholder />}
                    />
                    <Route
                        path="create-token"
                        element={<TokenCreationWizard />}
                    />
                    <Route
                        path="add-liquidity"
                        element={<LPCreationWizard />}
                    />
                    <Route path="learn" element={<EducationCenter />} />
                    {/* other authenticated routes */}
                </Route>
            </Routes>
        </BrowserRouter>
        // </DappProvider> // Removed DappProvider from here
    );
}
