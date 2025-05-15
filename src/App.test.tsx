import { render, screen } from "@testing-library/react";
import App from "./App";

describe("App Component", () => {
    it("should render the application and find a connect button or user info", () => {
        render(<App />);
        // Check for login buttons (part of sdk-dapp UI) or app title if not logged in
        // If logged in, it might show address. This test is flexible.
        const connectButtons = screen.queryAllByText(
            /Connect|Login|Extension|Web Wallet|xPortal|Ledger/i
        );
        const appTitle = screen.queryByText(/SimplifiDApp/i);
        const userAddress = screen.queryByText(/erd1/i); // Basic check for an address format

        expect(
            connectButtons.length > 0 || appTitle || userAddress
        ).toBeTruthy();
    });
});
