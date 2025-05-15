import {
    useGetLoginInfo,
    useGetAccountInfo,
    useGetNetworkConfig,
} from "@multiversx/sdk-dapp/hooks";
import {
    ExtensionLoginButton,
    WalletConnectLoginButton,
    LedgerLoginButton,
    WebWalletLoginButton,
} from "@multiversx/sdk-dapp/UI";
import { logout } from "@multiversx/sdk-dapp/utils";
import { formatAmount } from "@multiversx/sdk-dapp/utils/operations/formatAmount";
import { Link } from "react-router-dom";

const DECIMALS = 18; // Standard EGLD decimals
const DIGITS = 4; // Number of decimals to display for balance

export default function Header() {
    const { isLoggedIn } = useGetLoginInfo();
    const { address, account } = useGetAccountInfo();
    const { network } = useGetNetworkConfig();

    // Wait for network and account data to be available
    if (!network || !account) {
        // You could return a loading state or a simplified header here
        // For now, returning null or a minimal header to avoid errors
        return (
            <header className="bg-white shadow-md p-4 flex justify-between items-center">
                <Link to="/" className="text-xl font-bold text-blue-600">
                    SimplifiDApp
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

    return (
        <header className="bg-white shadow-md p-4 flex justify-between items-center">
            <div className="flex items-center space-x-4">
                <Link to="/" className="text-xl font-bold text-blue-600">
                    SimplifiDApp
                </Link>
                {/* Network should exist due to the check above */}
                <span className="px-2 py-1 text-xs font-semibold text-blue-700 bg-blue-100 rounded-full">
                    {network.name} ({network.chainID})
                </span>
            </div>

            <div className="flex items-center space-x-2">
                {!isLoggedIn ? (
                    <>
                        <WebWalletLoginButton
                            callbackRoute="/app"
                            loginButtonText="Web Wallet"
                        />
                        <ExtensionLoginButton
                            callbackRoute="/app"
                            loginButtonText="Extension"
                        />
                        <WalletConnectLoginButton
                            callbackRoute="/app"
                            loginButtonText="xPortal App"
                        />
                        <LedgerLoginButton
                            callbackRoute="/app"
                            loginButtonText="Ledger"
                        />
                    </>
                ) : (
                    <div className="flex items-center space-x-3">
                        <div className="text-sm">
                            <p className="font-medium">{displayAddress}</p>
                            <p className="text-gray-600">
                                {formattedBalance} {egldLabel}
                            </p>
                        </div>
                        <button
                            onClick={handleLogout}
                            className="bg-red-500 hover:bg-red-600 text-white font-semibold py-2 px-4 rounded text-sm"
                        >
                            Disconnect
                        </button>
                    </div>
                )}
            </div>
        </header>
    );
}
