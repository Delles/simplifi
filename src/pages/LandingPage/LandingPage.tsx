import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useGetLoginInfo } from "@multiversx/sdk-dapp/hooks";
import Button from "../../components/shared/Button";
import { ConnectOptionsModal } from "../../components/modals/ConnectOptionsModal";

export default function LandingPage() {
    const { isLoggedIn } = useGetLoginInfo();
    const navigate = useNavigate();
    const [isModalOpen, setIsModalOpen] = useState(false);

    useEffect(() => {
        if (isLoggedIn) {
            navigate("/app"); // Navigate to the main app/dashboard
            setIsModalOpen(false); // Close modal if it was open during login
        }
    }, [isLoggedIn, navigate]);

    const handleConnect = () => {
        setIsModalOpen(true); // Open our custom modal
    };

    const handleCloseModal = () => {
        setIsModalOpen(false);
    };

    return (
        <div className="flex flex-col items-center justify-center text-center py-10 px-4 min-h-[calc(100vh-var(--header-height,80px)-var(--footer-height,60px))]">
            <h1 className="text-4xl md:text-5xl font-bold mb-6 text-gray-800 dark:text-white">
                Launch Your MultiversX Token, Simply.
            </h1>
            <p className="text-lg md:text-xl text-gray-600 dark:text-gray-300 mb-10 max-w-2xl">
                SimpliFi provides the most intuitive interface to effortlessly
                launch, manage, airdrop your ESDT tokens, and provide initial
                liquidity on MultiversX. Get started in minutes, no complex
                coding required.
            </p>
            <Button
                onClick={handleConnect}
                className="px-8 py-3 text-lg font-semibold"
            >
                Connect Wallet
            </Button>

            <ConnectOptionsModal
                isOpen={isModalOpen}
                onClose={handleCloseModal}
                callbackRoute="/app" // Or your desired callback route after login
            />
        </div>
    );
}
