import React, { useState } from "react";
import { WalletConnectLoginContainer } from "@multiversx/sdk-dapp/UI";
import { useWebWalletLogin } from "@multiversx/sdk-dapp/hooks/login/useWebWalletLogin";
import { useExtensionLogin } from "@multiversx/sdk-dapp/hooks/login/useExtensionLogin";

interface ConnectOptionsModalProps {
    isOpen: boolean;
    onClose: () => void;
    callbackRoute?: string;
    isReturningUser?: boolean;
    showEducationalContent?: boolean;
}
type ModalView = "welcome" | "options" | "xportalQR" | "quickConnect";

export const ConnectOptionsModal: React.FC<ConnectOptionsModalProps> = ({
    isOpen,
    onClose,
    callbackRoute = "/app",
    isReturningUser = false,
    showEducationalContent = true,
}) => {
    const [currentView, setCurrentView] = useState<ModalView>(
        isReturningUser ? "quickConnect" : "welcome"
    );

    // Hooks for login
    const [webWalletLogin] = useWebWalletLogin({ callbackRoute });
    const [extensionLogin] = useExtensionLogin({ callbackRoute });

    if (!isOpen) return null;

    const handleClose = () => {
        setCurrentView(isReturningUser ? "quickConnect" : "welcome");
        onClose();
    };

    // Quick Connect View for Returning Users
    const renderQuickConnectView = () => (
        <div className="p-6">
            <div className="text-center mb-6">
                <h3 className="text-xl font-bold text-graphite mb-2">
                    Welcome back! 👋
                </h3>
                <p className="text-slate">
                    Choose your wallet to get started quickly
                </p>
            </div>

            {/* Quick Wallet Options */}
            <div className="space-y-3 mb-6">
                {/* xPortal App - Quick */}
                <div
                    onClick={() => setCurrentView("xportalQR")}
                    className="group cursor-pointer bg-white p-4 rounded-lg border border-ash hover:border-theme-blue hover:shadow-card-hover transition-all duration-200"
                >
                    <div className="flex items-center justify-between">
                        <div className="flex items-center">
                            <div className="w-10 h-10 bg-theme-blue/10 rounded-lg flex items-center justify-center mr-3">
                                <svg
                                    className="w-5 h-5 text-theme-blue"
                                    fill="currentColor"
                                    viewBox="0 0 24 24"
                                >
                                    <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" />
                                </svg>
                            </div>
                            <div>
                                <h4 className="font-medium text-graphite">
                                    xPortal App
                                </h4>
                                <p className="text-sm text-slate">
                                    Mobile QR scan
                                </p>
                            </div>
                        </div>
                        <span className="text-xs bg-emerald-green/10 text-emerald-green px-2 py-1 rounded-full">
                            Popular
                        </span>
                    </div>
                </div>

                {/* Browser Extension - Quick */}
                <div
                    onClick={extensionLogin}
                    className="group cursor-pointer bg-white p-4 rounded-lg border border-ash hover:border-theme-blue hover:shadow-card-hover transition-all duration-200"
                >
                    <div className="flex items-center justify-between">
                        <div className="flex items-center">
                            <div className="w-10 h-10 bg-theme-blue/10 rounded-lg flex items-center justify-center mr-3">
                                <svg
                                    className="w-5 h-5 text-theme-blue"
                                    fill="currentColor"
                                    viewBox="0 0 24 24"
                                >
                                    <path d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                                </svg>
                            </div>
                            <div>
                                <h4 className="font-medium text-graphite">
                                    Browser Extension
                                </h4>
                                <p className="text-sm text-slate">
                                    DeFi Wallet
                                </p>
                            </div>
                        </div>
                        <span className="text-xs bg-amber/10 text-amber px-2 py-1 rounded-full">
                            Fastest
                        </span>
                    </div>
                </div>

                {/* Web Wallet - Quick */}
                <div
                    onClick={webWalletLogin}
                    className="group cursor-pointer bg-white p-4 rounded-lg border border-ash hover:border-theme-blue hover:shadow-card-hover transition-all duration-200"
                >
                    <div className="flex items-center justify-between">
                        <div className="flex items-center">
                            <div className="w-10 h-10 bg-theme-blue/10 rounded-lg flex items-center justify-center mr-3">
                                <svg
                                    className="w-5 h-5 text-theme-blue"
                                    fill="currentColor"
                                    viewBox="0 0 24 24"
                                >
                                    <path d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9" />
                                </svg>
                            </div>
                            <div>
                                <h4 className="font-medium text-graphite">
                                    Web Wallet
                                </h4>
                                <p className="text-sm text-slate">
                                    Browser-based
                                </p>
                            </div>
                        </div>
                        <span className="text-xs bg-link-blue/10 text-link-blue px-2 py-1 rounded-full">
                            No Download
                        </span>
                    </div>
                </div>
            </div>

            {/* Need Help Link */}
            <div className="text-center">
                <button
                    onClick={() => setCurrentView("welcome")}
                    className="text-sm text-theme-blue hover:text-theme-blue-dark transition-colors duration-200"
                >
                    Need help choosing? See detailed guide →
                </button>
            </div>
        </div>
    );

    const renderWelcomeView = () => (
        <div className="p-8">
            {/* Progress Indicator - only show for educational content */}
            {showEducationalContent && (
                <div className="flex items-center justify-center mb-6">
                    <div className="flex items-center space-x-2">
                        <div className="w-8 h-8 bg-theme-blue text-white rounded-full flex items-center justify-center text-sm font-semibold">
                            1
                        </div>
                        <div className="w-8 h-0.5 bg-ash"></div>
                        <div className="w-8 h-8 bg-ash text-slate rounded-full flex items-center justify-center text-sm">
                            2
                        </div>
                        <div className="w-8 h-0.5 bg-ash"></div>
                        <div className="w-8 h-8 bg-ash text-slate rounded-full flex items-center justify-center text-sm">
                            3
                        </div>
                    </div>
                </div>
            )}

            {/* Welcome Content */}
            <div className="text-center mb-8">
                <h3 className="text-2xl font-bold text-graphite mb-4">
                    {showEducationalContent
                        ? "Welcome to Your Token Journey! 🚀"
                        : "Connect Your Wallet"}
                </h3>
                <p className="text-lg text-graphite/80 mb-6 leading-relaxed">
                    {showEducationalContent
                        ? "You're about to create your first token on MultiversX. Let's start by connecting your wallet securely."
                        : "Choose your preferred wallet to access SimpliFi and start managing your tokens."}
                </p>

                {/* Why Connect Explanation - only show for educational content */}
                {showEducationalContent && (
                    <div className="bg-gradient-to-r from-theme-blue/5 to-theme-blue-light/5 rounded-xl p-6 border border-theme-blue/10 mb-6">
                        <h4 className="font-semibold text-graphite mb-3 flex items-center justify-center">
                            <svg
                                className="w-5 h-5 mr-2 text-theme-blue"
                                fill="currentColor"
                                viewBox="0 0 20 20"
                            >
                                <path
                                    fillRule="evenodd"
                                    d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z"
                                    clipRule="evenodd"
                                />
                            </svg>
                            Why do I need to connect a wallet?
                        </h4>
                        <div className="text-sm text-slate space-y-2 text-left">
                            <p>
                                • <strong>Your keys, your tokens</strong> - You
                                maintain complete control
                            </p>
                            <p>
                                • <strong>Secure transactions</strong> - All
                                actions signed by you, not us
                            </p>
                            <p>
                                • <strong>Blockchain interaction</strong> -
                                Required for creating and managing tokens
                            </p>
                            <p>
                                • <strong>No personal data</strong> - We never
                                see your private keys or personal info
                            </p>
                        </div>
                    </div>
                )}

                <button
                    onClick={() => setCurrentView("options")}
                    className="w-full bg-theme-blue text-white font-semibold py-4 px-8 text-lg rounded-xl shadow-level-2 hover:shadow-level-3 hover:bg-theme-blue-dark hover:-translate-y-1 transition-all duration-300 ease-in-out"
                >
                    Choose Your Wallet
                </button>

                {showEducationalContent && (
                    <p className="text-sm text-slate mt-4">
                        Don't have a wallet yet? We'll help you get one!
                    </p>
                )}
            </div>
        </div>
    );

    const renderOptionsView = () => (
        <div className="p-8">
            {/* Header */}
            <div className="text-center mb-8">
                <button
                    onClick={() => setCurrentView("welcome")}
                    className="flex items-center text-theme-blue hover:text-theme-blue-dark mb-4 mx-auto group"
                >
                    <svg
                        className="w-4 h-4 mr-2 group-hover:-translate-x-1 transition-transform duration-200"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                    >
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M15 19l-7-7 7-7"
                        />
                    </svg>
                    Back
                </button>
                <h3 className="text-2xl font-bold text-graphite mb-2">
                    Choose Your Wallet
                </h3>
                <p className="text-slate">
                    Select the wallet you'd like to use. Don't worry, you can
                    always change this later!
                </p>
            </div>

            {/* Wallet Options */}
            <div className="space-y-4 mb-8">
                {/* xPortal App */}
                <div
                    onClick={() => setCurrentView("xportalQR")}
                    className="group cursor-pointer bg-gradient-to-r from-cloud-white to-white p-6 rounded-xl border border-ash/20 hover:border-theme-blue/30 hover:shadow-level-2 transition-all duration-300 hover:-translate-y-1"
                >
                    <div className="flex items-center justify-between">
                        <div className="flex items-center">
                            <div className="w-12 h-12 bg-theme-blue/10 rounded-xl flex items-center justify-center mr-4 group-hover:bg-theme-blue/15 transition-colors">
                                <svg
                                    className="w-6 h-6 text-theme-blue"
                                    fill="currentColor"
                                    viewBox="0 0 24 24"
                                >
                                    <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" />
                                </svg>
                            </div>
                            <div className="text-left">
                                <h4 className="font-semibold text-graphite">
                                    xPortal App
                                </h4>
                                <p className="text-sm text-slate">
                                    Scan QR code with your mobile app
                                </p>
                                <div className="flex items-center mt-1">
                                    <span className="inline-flex items-center px-2 py-1 rounded-full text-xs bg-emerald-green/10 text-emerald-green">
                                        Most Popular
                                    </span>
                                </div>
                            </div>
                        </div>
                        <svg
                            className="w-5 h-5 text-slate group-hover:text-theme-blue group-hover:translate-x-1 transition-all duration-200"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M9 5l7 7-7 7"
                            />
                        </svg>
                    </div>
                </div>

                {/* Browser Extension */}
                <div
                    onClick={extensionLogin}
                    className="group cursor-pointer bg-gradient-to-r from-cloud-white to-white p-6 rounded-xl border border-ash/20 hover:border-theme-blue/30 hover:shadow-level-2 transition-all duration-300 hover:-translate-y-1"
                >
                    <div className="flex items-center justify-between">
                        <div className="flex items-center">
                            <div className="w-12 h-12 bg-theme-blue/10 rounded-xl flex items-center justify-center mr-4 group-hover:bg-theme-blue/15 transition-colors">
                                <svg
                                    className="w-6 h-6 text-theme-blue"
                                    fill="currentColor"
                                    viewBox="0 0 24 24"
                                >
                                    <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z" />
                                </svg>
                            </div>
                            <div className="text-left">
                                <h4 className="font-semibold text-graphite">
                                    Browser Extension
                                </h4>
                                <p className="text-sm text-slate">
                                    Quick access from your browser
                                </p>
                                <div className="flex items-center mt-1">
                                    <span className="inline-flex items-center px-2 py-1 rounded-full text-xs bg-theme-blue/10 text-theme-blue">
                                        Fastest
                                    </span>
                                </div>
                            </div>
                        </div>
                        <svg
                            className="w-5 h-5 text-slate group-hover:text-theme-blue group-hover:translate-x-1 transition-all duration-200"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M9 5l7 7-7 7"
                            />
                        </svg>
                    </div>
                </div>

                {/* Web Wallet */}
                <div
                    onClick={webWalletLogin}
                    className="group cursor-pointer bg-gradient-to-r from-cloud-white to-white p-6 rounded-xl border border-ash/20 hover:border-theme-blue/30 hover:shadow-level-2 transition-all duration-300 hover:-translate-y-1"
                >
                    <div className="flex items-center justify-between">
                        <div className="flex items-center">
                            <div className="w-12 h-12 bg-theme-blue/10 rounded-xl flex items-center justify-center mr-4 group-hover:bg-theme-blue/15 transition-colors">
                                <svg
                                    className="w-6 h-6 text-theme-blue"
                                    fill="currentColor"
                                    viewBox="0 0 24 24"
                                >
                                    <path d="M12 2C13.1 2 14 2.9 14 4C14 5.1 13.1 6 12 6C10.9 6 10 5.1 10 4C10 2.9 10.9 2 12 2ZM21 9V7L15 1L9 7V9C9 10.1 9.9 11 11 11V16L15 20L19 16V11C20.1 11 21 10.1 21 9Z" />
                                </svg>
                            </div>
                            <div className="text-left">
                                <h4 className="font-semibold text-graphite">
                                    Web Wallet
                                </h4>
                                <p className="text-sm text-slate">
                                    Access through web browser
                                </p>
                                <div className="flex items-center mt-1">
                                    <span className="inline-flex items-center px-2 py-1 rounded-full text-xs bg-amber/10 text-amber">
                                        No Download
                                    </span>
                                </div>
                            </div>
                        </div>
                        <svg
                            className="w-5 h-5 text-slate group-hover:text-theme-blue group-hover:translate-x-1 transition-all duration-200"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M9 5l7 7-7 7"
                            />
                        </svg>
                    </div>
                </div>
            </div>

            {/* Help Section */}
            <div className="text-center border-t border-ash pt-6">
                <p className="text-sm text-slate mb-2">
                    New to MultiversX wallets?
                </p>
                <div className="flex flex-col sm:flex-row gap-2 justify-center">
                    <a
                        href="https://multiversx.com/wallets"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-sm font-medium text-theme-blue hover:text-theme-blue-dark hover:underline"
                    >
                        📚 Learn about wallets
                    </a>
                    <span className="hidden sm:inline text-slate">•</span>
                    <a
                        href="https://xportal.com/download"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-sm font-medium text-theme-blue hover:text-theme-blue-dark hover:underline"
                    >
                        📱 Download xPortal
                    </a>
                </div>
            </div>
        </div>
    );

    const renderXPortalQRView = () => (
        <div className="p-8">
            {/* Header */}
            <div className="text-center mb-6">
                <button
                    onClick={() => setCurrentView("options")}
                    className="flex items-center text-theme-blue hover:text-theme-blue-dark mb-4 mx-auto group"
                >
                    <svg
                        className="w-4 h-4 mr-2 group-hover:-translate-x-1 transition-transform duration-200"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                    >
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M15 19l-7-7 7-7"
                        />
                    </svg>
                    Back to options
                </button>
                <h3 className="text-2xl font-bold text-graphite mb-2">
                    Connect with xPortal
                </h3>
                <p className="text-slate">
                    Scan the QR code below with your xPortal app to connect
                    securely
                </p>
            </div>

            {/* QR Code Container */}
            <div className="flex items-center justify-center mb-6">
                <div className="w-full max-w-xs mx-auto">
                    <WalletConnectLoginContainer
                        callbackRoute={callbackRoute}
                        title="Login with xPortal App"
                        lead="Scan the QR code using your xPortal app."
                        loginButtonText="Connect with xPortal"
                        className="w-full max-w-xs mx-auto my-auto"
                        wrapContentInsideModal={false}
                    />
                </div>
            </div>

            {/* Instructions */}
            <div className="bg-gradient-to-r from-theme-blue/5 to-theme-blue-light/5 rounded-xl p-4 border border-theme-blue/10 mb-4">
                <h4 className="font-semibold text-graphite mb-2 text-center">
                    How to scan:
                </h4>
                <div className="text-sm text-slate space-y-1">
                    <p>1. Open your xPortal app</p>
                    <p>2. Tap the scan icon</p>
                    <p>3. Point your camera at the QR code</p>
                    <p>4. Approve the connection</p>
                </div>
            </div>

            {/* Download Link */}
            <div className="text-center">
                <a
                    href="https://xportal.com/download"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-sm font-medium text-theme-blue hover:text-theme-blue-dark hover:underline"
                >
                    Don't have xPortal? Download it here →
                </a>
            </div>
        </div>
    );

    return (
        <div className="fixed inset-0 bg-graphite/70 backdrop-blur-sm flex items-center justify-center z-50 p-4 transition-all duration-300 ease-in-out">
            <div className="bg-white rounded-2xl shadow-level-3 w-full max-w-md max-h-[95vh] flex flex-col animate-fadeInScaleUp">
                {/* Header with Close Button */}
                <div className="relative p-6 pb-0 flex-shrink-0">
                    <button
                        onClick={handleClose}
                        className="absolute top-4 right-4 text-slate hover:text-graphite transition-colors p-2 rounded-xl hover:bg-ash/20 group"
                        aria-label="Close modal"
                    >
                        <svg
                            className="w-5 h-5 group-hover:rotate-90 transition-transform duration-200"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M6 18L18 6M6 6l12 12"
                            />
                        </svg>
                    </button>
                </div>

                {/* Content */}
                <div className="flex-1 overflow-y-auto">
                    {currentView === "welcome" && renderWelcomeView()}
                    {currentView === "options" && renderOptionsView()}
                    {currentView === "xportalQR" && renderXPortalQRView()}
                    {currentView === "quickConnect" && renderQuickConnectView()}
                </div>
            </div>
        </div>
    );
};
