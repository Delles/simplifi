import React from "react";
import {
    ExtensionLoginButton,
    WalletConnectLoginButton,
    LedgerLoginButton,
    WebWalletLoginButton,
} from "@multiversx/sdk-dapp/UI";
// ... other imports ...

interface ConnectOptionsModalProps {
    isOpen: boolean;
    onClose: () => void;
    callbackRoute?: string;
}

export const ConnectOptionsModal: React.FC<ConnectOptionsModalProps> = ({
    isOpen,
    onClose,
    callbackRoute = "/app",
}) => {
    // ... rest of the component code from before ...
    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
            <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-xl w-full max-w-xs text-center">
                <h3 className="text-xl font-semibold mb-6 text-gray-800 dark:text-white">
                    Select Connection Method
                </h3>
                <div className="space-y-3 flex flex-col">
                    <WebWalletLoginButton
                        callbackRoute={callbackRoute}
                        loginButtonText="Web Wallet"
                        className="!text-sm !py-2.5"
                    />
                    <ExtensionLoginButton
                        callbackRoute={callbackRoute}
                        loginButtonText="DeFi Wallet (Extension)"
                        className="!text-sm !py-2.5"
                    />
                    <WalletConnectLoginButton
                        callbackRoute={callbackRoute}
                        loginButtonText="xPortal App"
                        className="!text-sm !py-2.5"
                    />
                    <LedgerLoginButton
                        callbackRoute={callbackRoute}
                        loginButtonText="Ledger"
                        className="!text-sm !py-2.5"
                    />
                </div>
                <button
                    onClick={onClose}
                    className="mt-6 bg-gray-200 hover:bg-gray-300 dark:bg-gray-700 dark:hover:bg-gray-600 text-gray-700 dark:text-gray-200 font-semibold py-2 px-4 rounded text-sm w-full"
                >
                    Cancel
                </button>
            </div>
        </div>
    );
};
