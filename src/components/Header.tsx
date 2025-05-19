import { useState } from "react";
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

    // Wait for network and account data to be available
    if (!network || !account) {
        // You could return a loading state or a simplified header here
        // For now, returning null or a minimal header to avoid errors
        return (
            <header className="bg-pure-white shadow-level-1 p-6 flex justify-between items-center sticky top-0 z-40 border-b border-ash">
                <Link
                    to="/"
                    className="text-h2 font-semibold text-slate hover:text-cyber-teal transition-colors duration-200"
                >
                    SimpliFi
                </Link>
                <div>Loading...</div>
            </header>
        );
    }

    const egldLabel = network.egldLabel || "EGLD";

    const isValidBalanceString = (balance: string): boolean => {
        if (balance.trim() === "") {
            return false;
        }
        // Ensure it's a string representation of a number
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

    return (
        <header className="bg-pure-white shadow-level-1 p-6 flex justify-between items-center sticky top-0 z-40 border-b border-ash">
            <div className="flex items-center space-x-6">
                <Link
                    to={isLoggedIn ? "/app" : "/"}
                    className="text-h2 font-semibold text-slate hover:text-cyber-teal transition-colors duration-200"
                >
                    SimpliFi
                </Link>
                {/* Network should exist due to the check above */}
                <span className="px-3 py-1 text-xs font-bold text-pure-white bg-hyperlink-blue rounded-full shadow-sm">
                    {network.name} ({network.chainID})
                </span>
            </div>

            <div className="flex items-center space-x-4">
                {!isLoggedIn ? (
                    <Button
                        onClick={openConnectModal}
                        // className will be handled by Button.tsx styling
                    >
                        Connect Wallet
                    </Button>
                ) : (
                    <div className="flex items-center space-x-4">
                        <div className="text-sm text-right">
                            <p
                                className="font-semibold text-graphite truncate max-w-[150px]"
                                title={address}
                            >
                                {displayAddress}
                            </p>
                            <p className="text-slate text-sm mt-1">
                                {formattedBalance} {egldLabel}
                            </p>
                        </div>
                        <Button
                            onClick={handleLogout}
                            variant="destructive"
                            // className will be handled by Button.tsx styling
                        >
                            Disconnect
                        </Button>
                    </div>
                )}
            </div>
            <ConnectOptionsModal
                isOpen={isConnectModalOpen}
                onClose={closeConnectModal}
                callbackRoute="/app"
            />
        </header>
    );
}
