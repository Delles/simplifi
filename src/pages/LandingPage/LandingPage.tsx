//Landing Page will be modified to be a landing page for the app.
//It will be used to showcase the features of the app and to get users to sign up.
//It will also be used to get users to connect their wallet and to begin using the app.

import React, { useState } from "react";
import { ConnectOptionsModal } from "../../components/modals/ConnectOptionsModal";

// Placeholder Icon Components (replace with actual SVG icons)
const RocketIcon = ({ className }: { className?: string }) => (
    <div className={`placeholder-icon ${className}`}>[Rocket Icon]</div>
);
const GiftIcon = ({ className }: { className?: string }) => (
    <div className={`placeholder-icon ${className}`}>[Gift Icon]</div>
);
const CoinsIcon = ({ className }: { className?: string }) => (
    <div className={`placeholder-icon ${className}`}>[Coins Icon]</div>
);

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
            {/* Hero Section */}
            <section className="bg-white text-center py-16 md:py-24 lg:py-32">
                <div className="container mx-auto px-6 max-w-4xl">
                    <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold text-graphite mb-4 leading-tight">
                        MultiversX Tokens,{" "}
                        <span className="text-cyber-teal">Simplified</span>.
                    </h1>
                    <p className="text-lg md:text-xl text-slate mb-10 max-w-2xl mx-auto">
                        Launch, manage, airdrop, and provide initial DEX
                        liquidity for your ESDT tokens. No code, no complexity.
                        Just pure simplicity, designed for everyone.
                    </p>

                    {/* Optional: Subtle visual element here if desired */}
                    {/* <div className="my-8 h-48 bg-ash rounded-lg flex items-center justify-center text-slate"> [Elegant Abstract Visual Placeholder] </div> */}

                    <button
                        onClick={handleConnectWallet}
                        className="bg-cyber-teal text-deep-teal-black font-medium py-3 px-10 text-lg rounded-lg shadow-level-1 hover:shadow-level-2 hover:bg-opacity-90 focus:outline-none focus:ring-2 focus:ring-cyber-teal focus:ring-offset-2 focus:ring-offset-white transition-all"
                    >
                        Connect Wallet to Get Started
                    </button>
                    <p className="text-sm text-slate mt-4">
                        Securely connect using your MultiversX wallet.
                    </p>
                </div>
            </section>

            {/* Features Section */}
            <section className="py-16 md:py-20 bg-app-canvas">
                <div className="container mx-auto px-6">
                    <h2 className="text-3xl md:text-4xl font-semibold text-graphite text-center mb-12 md:mb-16">
                        Everything You Need for Your ESDT Journey
                    </h2>
                    <div className="grid md:grid-cols-3 gap-8">
                        {/* Feature 1: Create Token */}
                        <div className="bg-white p-8 rounded-xl shadow-level-1 hover:shadow-level-2 transition-shadow duration-300 flex flex-col items-center text-center md:items-start md:text-left">
                            <RocketIcon className="text-cyber-teal h-12 w-12 mb-5" />
                            <h3 className="text-xl font-semibold text-graphite mb-2">
                                Easy Token Creation
                            </h3>
                            <p className="text-slate text-base">
                                Launch fungible ESDT tokens in minutes with our
                                guided wizard. Define properties and supply with
                                ease—no coding knowledge required.
                            </p>
                        </div>

                        {/* Feature 2: Airdrop Tool */}
                        <div className="bg-white p-8 rounded-xl shadow-level-1 hover:shadow-level-2 transition-shadow duration-300 flex flex-col items-center text-center md:items-start md:text-left">
                            <GiftIcon className="text-cyber-teal h-12 w-12 mb-5" />
                            <h3 className="text-xl font-semibold text-graphite mb-2">
                                Effortless Airdrops
                            </h3>
                            <p className="text-slate text-base">
                                Distribute tokens to your community seamlessly.
                                Upload a list, and SimpliFi handles the rest,
                                optimized for any batch size.
                            </p>
                        </div>

                        {/* Feature 3: Add Liquidity */}
                        <div className="bg-white p-8 rounded-xl shadow-level-1 hover:shadow-level-2 transition-shadow duration-300 flex flex-col items-center text-center md:items-start md:text-left">
                            <CoinsIcon className="text-cyber-teal h-12 w-12 mb-5" />
                            <h3 className="text-xl font-semibold text-graphite mb-2">
                                Guided DEX Liquidity
                            </h3>
                            <p className="text-slate text-base">
                                Add initial liquidity to xExchange with clear
                                guidance on pricing and risks. Make your token
                                tradable, safely and simply.
                            </p>
                        </div>
                    </div>
                </div>
            </section>

            {/* How It Works Section */}
            <section className="py-16 md:py-20 bg-white">
                <div className="container mx-auto px-6 text-center">
                    <h2 className="text-3xl md:text-4xl font-semibold text-graphite mb-12 md:mb-16">
                        Get Started in 3 Simple Steps
                    </h2>
                    <div className="grid md:grid-cols-3 gap-x-8 gap-y-12 items-start max-w-4xl mx-auto">
                        {/* Step 1 */}
                        <div className="flex flex-col items-center">
                            <div className="bg-cyber-teal text-deep-teal-black rounded-full h-16 w-16 flex items-center justify-center text-2xl font-bold mb-4 shadow-md">
                                1
                            </div>
                            <h3 className="text-xl font-semibold text-graphite mb-1">
                                Connect Your Wallet
                            </h3>
                            <p className="text-slate text-base">
                                Securely link your existing MultiversX wallet in
                                seconds.
                            </p>
                        </div>
                        {/* Step 2 */}
                        <div className="flex flex-col items-center">
                            <div className="bg-cyber-teal text-deep-teal-black rounded-full h-16 w-16 flex items-center justify-center text-2xl font-bold mb-4 shadow-md">
                                2
                            </div>
                            <h3 className="text-xl font-semibold text-graphite mb-1">
                                Configure & Customize
                            </h3>
                            <p className="text-slate text-base">
                                Use our intuitive wizards to set up your token
                                or manage services.
                            </p>
                        </div>
                        {/* Step 3 */}
                        <div className="flex flex-col items-center">
                            <div className="bg-cyber-teal text-deep-teal-black rounded-full h-16 w-16 flex items-center justify-center text-2xl font-bold mb-4 shadow-md">
                                3
                            </div>
                            <h3 className="text-xl font-semibold text-graphite mb-1">
                                Launch & Manage
                            </h3>
                            <p className="text-slate text-base">
                                Deploy to the blockchain and manage your assets
                                with full control.
                            </p>
                        </div>
                    </div>
                </div>
            </section>

            {/* Final CTA Section */}
            <section className="py-16 md:py-24 bg-app-canvas">
                <div className="container mx-auto px-6 text-center max-w-3xl">
                    <h2 className="text-3xl md:text-4xl font-semibold text-graphite mb-4">
                        Ready to Simplify Your Token Journey?
                    </h2>
                    <p className="text-lg md:text-xl text-slate mb-10">
                        Join creators, communities, and entrepreneurs building
                        the future on MultiversX with SimpliFi.
                    </p>
                    <button
                        onClick={handleConnectWallet}
                        className="bg-cyber-teal text-deep-teal-black font-medium py-3 px-10 text-lg rounded-lg shadow-level-1 hover:shadow-level-2 hover:bg-opacity-90 focus:outline-none focus:ring-2 focus:ring-cyber-teal focus:ring-offset-2 focus:ring-offset-app-canvas transition-all"
                    >
                        Connect Wallet & Begin
                    </button>
                    <p className="text-sm text-slate mt-6">
                        Powered by MultiversX technology.
                    </p>
                </div>
            </section>
            <ConnectOptionsModal
                isOpen={isModalOpen}
                onClose={handleCloseModal}
            />
        </>
    );
};

export default LandingPage;
