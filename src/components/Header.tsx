import { useState, useEffect } from "react";
import {
    useGetLoginInfo,
    useGetAccountInfo,
    useGetNetworkConfig,
} from "@multiversx/sdk-dapp/hooks";
import { logout } from "@multiversx/sdk-dapp/utils";
import { formatAmount } from "@multiversx/sdk-dapp/utils/operations/formatAmount";
import { Link } from "react-router-dom";
import Button from "./shared/Button";
import { ConnectOptionsModal } from "./modals/ConnectOptionsModal";

const DECIMALS = 18; // Standard EGLD decimals
const DIGITS = 4; // Number of decimals to display for balance

export default function Header() {
    const { isLoggedIn } = useGetLoginInfo();
    const { address, account } = useGetAccountInfo();
    const { network } = useGetNetworkConfig();
    const [isConnectModalOpen, setIsConnectModalOpen] = useState(false);
    const [isReturningUser, setIsReturningUser] = useState(false);
    const [showUserProgress, setShowUserProgress] = useState(false);

    // Check if user has been here before
    useEffect(() => {
        const hasVisited = localStorage.getItem("simplifi-visited");
        const hasConnectedBefore = localStorage.getItem("simplifi-connected");

        if (hasVisited && hasConnectedBefore) {
            setIsReturningUser(true);
        }

        if (hasVisited) {
            setShowUserProgress(true);
        }

        // Development helper - expose testing functions to window
        if (process.env.NODE_ENV === "development") {
            (
                window as Window &
                    typeof globalThis & {
                        SimpliFiTestHelpers?: {
                            resetToNewUser: () => void;
                            setAsReturningUser: () => void;
                            checkUserState: () => void;
                        };
                    }
            ).SimpliFiTestHelpers = {
                resetToNewUser: () => {
                    localStorage.removeItem("simplifi-visited");
                    localStorage.removeItem("simplifi-connected");
                    window.location.reload();
                },
                setAsReturningUser: () => {
                    localStorage.setItem("simplifi-visited", "true");
                    localStorage.setItem("simplifi-connected", "true");
                    window.location.reload();
                },
                checkUserState: () => {
                    console.log("User State:");
                    console.log(
                        "- Visited:",
                        localStorage.getItem("simplifi-visited")
                    );
                    console.log(
                        "- Connected before:",
                        localStorage.getItem("simplifi-connected")
                    );
                    console.log(
                        "- Is returning user:",
                        localStorage.getItem("simplifi-visited") &&
                            localStorage.getItem("simplifi-connected")
                    );
                },
            };
        }
    }, []);

    // Mark user as visited when they interact with the site
    useEffect(() => {
        localStorage.setItem("simplifi-visited", "true");
    }, []);

    // Mark user as having connected before when they successfully connect
    useEffect(() => {
        if (isLoggedIn) {
            localStorage.setItem("simplifi-connected", "true");
            setIsReturningUser(true);
        }
    }, [isLoggedIn]);

    // Wait for network and account data to be available
    if (!network || !account) {
        return (
            <header className="bg-pure-white shadow-level-1 p-6 flex justify-between items-center sticky top-0 z-40 border-b border-ash">
                <div className="flex items-center space-x-3">
                    <Link
                        to="/"
                        className="flex items-center space-x-2 hover:opacity-80 transition-opacity duration-200"
                    >
                        <div className="text-h2 font-bold text-theme-blue">
                            SimpliFi
                        </div>
                        <div className="text-xs text-slate font-medium hidden sm:block">
                            Democratizing Token Creation
                        </div>
                    </Link>
                </div>
                <div className="text-sm text-slate animate-pulse">
                    Loading...
                </div>
            </header>
        );
    }

    const egldLabel = network.egldLabel || "EGLD";

    const isValidBalanceString = (balance: string): boolean => {
        if (balance.trim() === "") {
            return false;
        }
        return !isNaN(parseFloat(balance));
    };

    const formattedBalance =
        account.balance && isValidBalanceString(account.balance)
            ? formatAmount({
                  input: account.balance,
                  decimals: DECIMALS,
                  digits: DIGITS,
                  showLastNonZeroDecimal: false,
              })
            : "0";

    const handleLogout = () => {
        logout("/");
    };

    const displayAddress = address
        ? `${address.substring(0, 6)}...${address.substring(
              address.length - 4
          )}`
        : "N/A";

    const openConnectModal = () => setIsConnectModalOpen(true);
    const closeConnectModal = () => setIsConnectModalOpen(false);

    // Get user's learning progress (mock for now, could be from context)
    const userProgress = 75; // Could come from UserJourneyProvider

    return (
        <header className="bg-pure-white shadow-level-1 border-b border-ash sticky top-0 z-40">
            <div className="px-6 py-4 flex justify-between items-center">
                <div className="flex items-center space-x-6">
                    <Link
                        to={isLoggedIn ? "/app" : "/"}
                        className="flex items-center space-x-3 hover:opacity-80 transition-opacity duration-200"
                    >
                        <div className="text-h2 font-bold text-theme-blue">
                            SimpliFi
                        </div>
                        <div className="hidden sm:flex flex-col">
                            <div className="text-xs text-slate font-medium">
                                Democratizing Token Creation
                            </div>
                            {isLoggedIn && showUserProgress && (
                                <div className="text-xs text-education-primary font-medium">
                                    Your Journey: {userProgress}% Complete
                                </div>
                            )}
                        </div>
                    </Link>

                    {/* Network Badge with Educational Tooltip for New Users */}
                    <div className="relative group">
                        <span className="px-3 py-1 text-xs font-medium text-pure-white bg-theme-blue rounded-badge shadow-sm flex items-center space-x-1">
                            <div className="w-2 h-2 bg-success rounded-full"></div>
                            <span>{network.name}</span>
                        </span>
                        {!isReturningUser && (
                            <div className="absolute top-full left-0 mt-2 w-64 p-3 bg-education-tooltip-bg text-education-tooltip-text text-xs rounded-tooltip shadow-tooltip opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none z-50">
                                <div className="font-medium mb-1">
                                    🌐 You're on {network.name}
                                </div>
                                <div>
                                    This is MultiversX's blockchain network
                                    where your tokens will be created. All
                                    transactions are secure and decentralized.
                                </div>
                            </div>
                        )}
                    </div>

                    {/* Non-Custodial Security Badge for New Users */}
                    {isLoggedIn && !isReturningUser && (
                        <div className="hidden lg:flex items-center space-x-1 px-2 py-1 bg-risk-safe-bg text-risk-safe text-xs font-medium rounded-badge">
                            <svg
                                className="w-3 h-3"
                                fill="currentColor"
                                viewBox="0 0 20 20"
                            >
                                <path
                                    fillRule="evenodd"
                                    d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z"
                                    clipRule="evenodd"
                                />
                            </svg>
                            <span>Your Keys, Your Tokens</span>
                        </div>
                    )}
                </div>

                <div className="flex items-center space-x-4">
                    {!isLoggedIn ? (
                        <div className="flex items-center space-x-3">
                            {/* Quick Connect for Returning Users */}
                            {isReturningUser && (
                                <div className="hidden sm:flex items-center space-x-2 text-xs text-slate">
                                    <span>Welcome back!</span>
                                </div>
                            )}

                            <Button
                                onClick={openConnectModal}
                                className="bg-gradient-to-r from-create-500 to-create-600 text-white shadow-interactive hover:shadow-interactive-hover transition-all duration-200"
                            >
                                {isReturningUser
                                    ? "Connect Wallet"
                                    : "Start Creating →"}
                            </Button>
                        </div>
                    ) : (
                        <div className="flex items-center space-x-4">
                            {/* Wallet Info with Enhanced Display */}
                            <div className="text-sm text-right">
                                <div className="flex items-center space-x-2">
                                    <p
                                        className="font-semibold text-graphite truncate max-w-[120px] cursor-pointer hover:text-theme-blue transition-colors duration-200"
                                        title={`Click to copy: ${address}`}
                                        onClick={() =>
                                            navigator.clipboard.writeText(
                                                address || ""
                                            )
                                        }
                                    >
                                        {displayAddress}
                                    </p>
                                    <svg
                                        className="w-3 h-3 text-slate cursor-pointer hover:text-theme-blue transition-colors duration-200"
                                        fill="currentColor"
                                        viewBox="0 0 20 20"
                                    >
                                        <path d="M8 3a1 1 0 011-1h2a1 1 0 110 2H9a1 1 0 01-1-1z" />
                                        <path d="M6 3a2 2 0 00-2 2v11a2 2 0 002 2h8a2 2 0 002-2V5a2 2 0 00-2-2 3 3 0 01-3 3H9a3 3 0 01-3-3z" />
                                    </svg>
                                </div>
                                <div className="flex items-center space-x-1 mt-1">
                                    <p className="text-slate text-sm font-medium">
                                        {formattedBalance} {egldLabel}
                                    </p>
                                    {!isReturningUser && (
                                        <div className="group relative">
                                            <svg
                                                className="w-3 h-3 text-education-primary cursor-help"
                                                fill="currentColor"
                                                viewBox="0 0 20 20"
                                            >
                                                <path
                                                    fillRule="evenodd"
                                                    d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-8-3a1 1 0 00-.867.5 1 1 0 11-1.731-1A3 3 0 0113 8a3.001 3.001 0 01-2 2.83V11a1 1 0 11-2 0v-1a1 1 0 011-1 1 1 0 100-2zm0 8a1 1 0 100-2 1 1 0 000 2z"
                                                    clipRule="evenodd"
                                                />
                                            </svg>
                                            <div className="absolute top-full right-0 mt-2 w-48 p-2 bg-education-tooltip-bg text-education-tooltip-text text-xs rounded-tooltip shadow-tooltip opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none z-50">
                                                This is your EGLD balance - the
                                                native currency of MultiversX
                                                used for transaction fees.
                                            </div>
                                        </div>
                                    )}
                                </div>
                            </div>

                            {/* Enhanced Disconnect Button */}
                            <Button
                                onClick={handleLogout}
                                variant="destructive"
                                className="text-sm px-3 py-2"
                            >
                                {isReturningUser ? "Disconnect" : "Sign Out"}
                            </Button>
                        </div>
                    )}
                </div>
            </div>

            {/* Enhanced Connect Modal with User Experience Detection */}
            <ConnectOptionsModal
                isOpen={isConnectModalOpen}
                onClose={closeConnectModal}
                callbackRoute="/app"
                isReturningUser={isReturningUser}
                showEducationalContent={!isReturningUser}
            />
        </header>
    );
}
