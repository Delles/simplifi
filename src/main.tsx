import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./index.css";

import { DappProvider } from "@multiversx/sdk-dapp/wrappers/DappProvider/DappProvider";
import { EnvironmentsEnum } from "@multiversx/sdk-dapp/types";
import {
    TransactionsToastList,
    SignTransactionsModals,
    NotificationModal,
} from "@multiversx/sdk-dapp/UI";

// Ensure this is replaced by the user in their actual setup
const walletConnectV2ProjectId = "YOUR_WALLET_CONNECT_PROJECT_ID";

ReactDOM.createRoot(document.getElementById("root")!).render(
    <React.StrictMode>
        <DappProvider
            environment={EnvironmentsEnum.devnet}
            customNetworkConfig={{
                name: "simplifi-devnet-config",
                apiTimeout: 6000,
                walletConnectV2ProjectId: walletConnectV2ProjectId,
                // apiAddress: "https://api.multiversx.com", // Mainnet API address
            }}
            // dappConfig is optional and mainly for things like logoutRoute
            // dappConfig={{
            //   logoutRoute: "/logout-custom-route",
            // }}
        >
            <TransactionsToastList />
            <NotificationModal />
            <SignTransactionsModals />
            <App />
        </DappProvider>
    </React.StrictMode>
);
