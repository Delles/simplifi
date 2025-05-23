import React, { useState } from "react";
import { ConnectOptionsModal } from "../../components/modals/ConnectOptionsModal";
import { HeroSection } from "./HeroSection";
import { FeaturesSection } from "./FeaturesSection";
import { HowItWorksSection } from "./HowItWorksSection";
import { FinalCTASection } from "./FinalCTASection";

// Assumes this component is rendered within LandingLayout.tsx, which provides Header & Footer
const LandingPage: React.FC = () => {
    const [isModalOpen, setIsModalOpen] = useState(false);

    const handleConnectWallet = () => {
        // Logic to trigger wallet connection modal/process
        // console.log("Connect Wallet Clicked");
        setIsModalOpen(true);
    };

    const handleCloseModal = () => {
        setIsModalOpen(false);
    };

    return (
        // App Canvas background is applied by a higher-level container or LandingLayout
        // For this component, we'll structure its sections.
        // LandingLayout might wrap this in a <main> tag.
        <>
            <HeroSection handleConnectWallet={handleConnectWallet} />
            <FeaturesSection />
            <HowItWorksSection />
            <FinalCTASection handleConnectWallet={handleConnectWallet} />
            <ConnectOptionsModal
                isOpen={isModalOpen}
                onClose={handleCloseModal}
            />
        </>
    );
};

export default LandingPage;
