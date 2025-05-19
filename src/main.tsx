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
const walletConnectV2ProjectId = "9b1a9564f91cb659ffe21b73d5c4e2d8";

ReactDOM.createRoot(document.getElementById("root")!).render(
    <React.StrictMode>
        <DappProvider
            environment={EnvironmentsEnum.devnet}
            customNetworkConfig={{
                name: "devnet",
                apiTimeout: 6000,
                walletConnectV2ProjectId: walletConnectV2ProjectId,
                apiAddress: "https://devnet-api.multiversx.com",
            }}
        >
            <TransactionsToastList />
            <NotificationModal />
            <SignTransactionsModals />
            <App />
        </DappProvider>
    </React.StrictMode>
);
