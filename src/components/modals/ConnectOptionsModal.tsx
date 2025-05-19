import React, { useState } from "react";
import { WalletConnectLoginContainer } from "@multiversx/sdk-dapp/UI";
import { useWebWalletLogin } from "@multiversx/sdk-dapp/hooks/login/useWebWalletLogin";
import { useExtensionLogin } from "@multiversx/sdk-dapp/hooks/login/useExtensionLogin";

interface ConnectOptionsModalProps {
    isOpen: boolean;
    onClose: () => void;
    callbackRoute?: string;
}
type ModalView = "options" | "xportalQR";

export const ConnectOptionsModal: React.FC<ConnectOptionsModalProps> = ({
    isOpen,
    onClose,
    callbackRoute = "/app",
}) => {
    const [currentView, setCurrentView] = useState<ModalView>("options");

    // Hooks for login
    const [webWalletLogin] = useWebWalletLogin({ callbackRoute });
    const [extensionLogin] = useExtensionLogin({ callbackRoute });

    if (!isOpen) return null;

    const handleClose = () => {
        setCurrentView("options");
        onClose();
    };

    // Styles for the primary login option buttons.
    // Text is centered using `text-center`.
    const primaryChoiceButtonStyles =
        "w-full !bg-cyber-teal !text-deep-teal-black !border-none hover:!bg-cyber-teal/90 focus:outline-none focus:ring-2 focus:ring-cyber-teal focus:ring-offset-2 focus:ring-offset-pure-white font-medium rounded-ui-element text-button-lg py-3 px-6 transition-all duration-150 ease-in-out text-center shadow-level-1 hover:shadow-level-2 hover:-translate-y-px transform";

    const cancelButtonStyle =
        "w-full bg-pure-white text-hyperlink-blue border border-hyperlink-blue hover:bg-hyperlink-blue/10 focus:outline-none focus:ring-2 focus:ring-hyperlink-blue focus:ring-offset-2 focus:ring-offset-pure-white font-medium rounded-ui-element text-button-lg py-2.5 px-5 transition-colors duration-150 ease-in-out transform hover:-translate-y-px hover:shadow-level-1";

    const walletConnectSdkWrapperStyle = "w-full max-w-xs mx-auto my-auto";

    const renderOptionsView = () => (
        <div className="p-6">
            <div className="space-y-3.5">
                <div className="w-full">
                    <button
                        onClick={() => setCurrentView("xportalQR")}
                        className={primaryChoiceButtonStyles}
                    >
                        xPortal App
                    </button>
                </div>
                <div className="w-full">
                    <button
                        onClick={webWalletLogin}
                        className={primaryChoiceButtonStyles}
                    >
                        MultiversX Web Wallet
                    </button>
                </div>
                <div className="w-full">
                    <button
                        onClick={extensionLogin}
                        className={primaryChoiceButtonStyles}
                    >
                        Browser Extension
                    </button>
                </div>
            </div>
            <div className="mt-6 text-center">
                <p className="text-body-secondary font-normal text-slate">
                    New to MultiversX wallets?{" "}
                    <a
                        href="https://multiversx.com/wallets"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="font-medium text-hyperlink-blue hover:underline"
                    >
                        Learn how
                    </a>
                </p>
            </div>
        </div>
    );

    const renderXPortalQRView = () => (
        <div className="p-6 flex flex-col flex-grow">
            <button
                onClick={() => setCurrentView("options")}
                className="self-start mb-4 text-button-sm font-medium text-hyperlink-blue hover:text-hyperlink-blue/80 p-1 rounded-md hover:bg-hyperlink-blue/10 focus:outline-none focus:ring-1 focus:ring-hyperlink-blue focus:ring-offset-1 focus:ring-offset-pure-white"
            >
                <span>Back to options</span>
            </button>
            <WalletConnectLoginContainer
                callbackRoute={callbackRoute}
                title="Login with xPortal App"
                lead="Scan the QR code using your xPortal app."
                loginButtonText="Connect with xPortal"
                className={walletConnectSdkWrapperStyle}
                wrapContentInsideModal={false}
            />
            <p className="text-center mt-auto pt-4 text-body-secondary font-normal text-slate">
                <a
                    href="https://xportal.com/download"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="font-medium text-hyperlink-blue hover:underline"
                >
                    Don't have xPortal? Get it here
                </a>
            </p>
        </div>
    );

    return (
        <div
            className="fixed inset-0 bg-graphite/70 flex items-center justify-center z-50 p-4 transition-opacity duration-300 ease-in-out"
            onClick={handleClose}
        >
            <div
                className="bg-pure-white rounded-modal shadow-level-2 w-full max-w-sm flex flex-col max-h-[calc(100vh-4rem)] animate-fadeInScaleUp"
                onClick={(e) => e.stopPropagation()}
            >
                <div className="p-5 text-center shrink-0 relative border-b border-ash">
                    <h3 className="text-h3 font-semibold text-graphite">
                        {currentView === "options"
                            ? "Connect Your Wallet"
                            : "Connect with xPortal"}
                    </h3>
                    <p className="text-body-secondary text-slate mt-1 font-normal">
                        {currentView === "options"
                            ? "Choose your preferred method below."
                            : "Scan the QR code to log in."}
                    </p>
                    <button
                        onClick={handleClose}
                        className="absolute top-1/2 -translate-y-1/2 right-4 text-slate hover:text-graphite transition-colors p-2 rounded-md hover:bg-ash/20 focus:outline-none focus:ring-2 focus:ring-hyperlink-blue focus:ring-offset-1 focus:ring-offset-pure-white"
                        aria-label="Close modal"
                    >
                        <span
                            aria-hidden="true"
                            className="text-xl font-medium leading-none"
                        >
                            &times;
                        </span>
                    </button>
                </div>

                <div className="flex-grow overflow-y-auto">
                    {currentView === "options" && renderOptionsView()}
                    {currentView === "xportalQR" && renderXPortalQRView()}
                </div>

                {currentView === "options" && (
                    <div className="px-6 pb-6 pt-4 border-t border-ash shrink-0">
                        <button
                            onClick={handleClose}
                            className={cancelButtonStyle}
                        >
                            Cancel
                        </button>
                    </div>
                )}
            </div>
        </div>
    );
};
