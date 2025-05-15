## High-Level Component Structure

The frontend application will be a Single Page Application (SPA), built with React (Vite) and TypeScript, utilizing @multiversx/sdk-dapp for wallet interactions.

1. **App Container (App.tsx)**
    - Global state management (e.g., Zustand/Redux).
    - Router setup (e.g., React Router).
    - Initialization of @multiversx/sdk-dapp provider.
2. **Layouts**
    - **MainLayout.tsx**: Standard layout for authenticated users.
        - Header.tsx: Contains logo, network indicator, wallet connection status/button, user address, EGLD balance, and disconnect option.
        - Sidebar.tsx: Primary navigation (Dashboard, Create Token, My Tokens, Airdrop Tool, Add Liquidity, Help/FAQ).
        - ContentArea.tsx: Renders the content of the current route.
        - Footer.tsx: Contains disclaimer links, version info, etc.
    - **LandingLayout.tsx**: Simplified layout for the pre-connection landing page.
3. **Core Pages/Views (Routed Components)**
    - **LandingPage.tsx**: Introduces SimpliFi, its value proposition, and features a prominent "Connect Wallet" call to action.
    - **DashboardPage.tsx**: Post-connection landing page. Displays a summary of user's managed tokens, quick action buttons/cards for core features (Create Token, Manage Tokens, Airdrop, Add Liquidity), and potentially recent activity.
    - **TokenCreationWizard.tsx**: A multi-step form guiding users through ESDT creation:
        - Step 1: Basic Information (Name, Ticker with real-time availability & cost check, Initial Supply, Decimals).
        - Step 2: Token Properties (Supply Type, Burnable, Ownership Transfer, with an "Advanced Settings" toggle for Pausable, Freezable, Wipeable, Upgradable, ESDTRoleNFTCreate). Each property includes clear explanations.
        - Step 3: Review & Confirm (Summary of all choices, total EGLD network fee, explicit user confirmation).
        - Step 4: Sign & Deploy (Handles transaction signing and displays status).
    - **MyTokensPage.tsx**: Lists all ESDT tokens managed by the connected wallet, with key details and a "Manage" button for each, leading to TokenManagementPage.
    - **TokenManagementPage.tsx (/my-tokens/:tokenId)**: Dedicated page for managing a specific token.
        - Displays detailed token information and properties.
        - Provides conditional action UIs (e.g., Mint, Burn, Pause, Transfer Ownership) based on the token's properties and whether the user possesses the necessary roles.
    - **AirdropToolPage.tsx**: A multi-step wizard for distributing ESDTs:
        - Step 1: Select Token from user's holdings.
        - Step 2: Prepare Recipient List (CSV upload or manual input, with address/amount validation).
        - Step 3: Review & Strategy (Calculates totals, informs if using ESDTMultiTransfer or SimpliFiAirdropSC based on list size, displays fees).
        - Step 4: Execute Airdrop (Handles transaction signing for funding SC if needed, and distribution calls).
    - **AddLiquidityWizard.tsx**: A multi-step wizard for providing initial liquidity on xExchange:
        - Step 1: Introduction & Education (Explains LPs, risks like impermanent loss, disclaimers, reminder that LP management is on xExchange post-provision). Requires user acknowledgment.
        - Step 2: Select Tokens (User's token as Token A, pairing token like EGLD/USDC as Token B). Displays user balances.
        - Step 3: Define Initial Liquidity & Price (User inputs amounts for Token A & B; platform calculates and displays initial price with strong warnings about price setting).
        - Step 4: Review & Confirm Risks (Summary of deposit, price, LP tokens received; explicit "I understand the risks" checkbox).
        - Step 5: Add Liquidity (Handles transaction signing and displays status).
    - **HelpPage.tsx**: Provides FAQs, guides, and links to relevant MultiversX documentation and SimpliFi resources.
4. **Shared/UI Components (Examples)**
    - WalletConnectModal.tsx: Modal for selecting and connecting to MultiversX wallets.
    - Button.tsx: Standardized buttons (primary, secondary, destructive variants).
    - Input.tsx, NumberInput.tsx, ToggleSwitch.tsx, RadioButtonGroup.tsx: Form elements with built-in validation and tooltips.
    - Modal.tsx: Base component for modal dialogs.
    - Tooltip.tsx, InfoIconWithTooltip.tsx: For contextual help and explanations.
    - Spinner.tsx/LoadingIndicator.tsx: Visual feedback for loading states.
    - TransactionStatusNotification.tsx: Toasts or inline messages for pending, success, and error states of blockchain transactions, including explorer links.
    - Stepper.tsx: Visual guide for progress within multi-step wizards.
    - AddressDisplay.tsx: Formats and allows copying of blockchain addresses.
    - FeeDisplay.tsx: Shows estimated network fees for transactions.
    - TokenSummaryCard.tsx: Reusable card for displaying brief token info.
    - CollapsibleSection.tsx: For hiding/showing advanced options.

## Wireframe Guidance (Key Screens & Flows)

**Global Elements:**

-   **Header:** Logo (left). Network indicator, Wallet Info/Connect Button (right). Wallet info shows truncated address, EGLD balance, and a Disconnect option when connected.
-   **Sidebar Navigation (Left):** Clearly labeled links: Dashboard, Create Token, My Tokens, Airdrop Tool, Add Liquidity, Help/FAQ. Active state highlighted.

**1. Landing Page (Pre-Wallet Connection)**

-   **Layout:** Minimalist, focused.
-   **Content:** Compelling headline about SimpliFi's value. Brief description of key features. Prominent, centrally-placed "Connect Wallet" button.

**2. Dashboard (Post-Wallet Connection - /dashboard)**

-   **Layout:** Main layout with Header and Sidebar.
-   **Content:**
-   Greeting message.
-   **Quick Actions:** Visually distinct cards or buttons for "Create New Token," "Manage My Tokens," "Airdrop Tokens," "Add Liquidity to DEX."
-   **My Managed Tokens Section:**
-   Title: "My Managed Tokens."
-   If none: Message like "You haven't created or managed any tokens yet. [Link to Create Token page]."
-   If tokens exist: A list or grid of TokenSummaryCards (showing Token Name, Ticker, basic supply info, and a "Manage" button linking to the specific TokenManagementPage).

**3. Create Token Wizard (/create-token)**

-   **Layout:** Main layout. Wizard content area prominently features a StepperNavigation (e.g., [Step 1: Details] - [Step 2: Properties] - [Step 3: Review & Deploy]).
-   **Step 1: Token Details:**
-   Form fields for Token Name, Token Ticker (with live availability check, uniqueness warning, and display of issuance cost for ticker), Initial Supply, Decimal Places. Each field accompanied by an InfoIconWithTooltip explaining its purpose and implications in simple terms.
-   Navigation: "Next: Token Properties" button (enabled on valid input), "Cancel."
-   **Step 2: Token Properties:**
-   Form groups for Supply Type (Fixed/Variable), Burnable, Ownership Transfer. Uses toggles or radio buttons with clear labels and default sensible options.
-   CollapsibleSection for "Advanced Properties" (default closed): Pausable, Freezable, Wipeable (with extra warning if Freezable is true), Upgradable, ESDTRoleNFTCreate. Each with an InfoIconWithTooltip.
-   Navigation: "Back," "Next: Review & Deploy," "Cancel."
-   **Step 3: Review & Deploy:**
-   Read-only summary of all user choices from previous steps.
-   Clear display of "Total Network Fee for Issuance: ~X EGLD."
-   Critical Warning: "Ensure all details are correct. Some properties cannot be changed after deployment unless 'Upgradable' is enabled."
-   Mandatory Checkbox: "I understand that deploying a token to the blockchain is a permanent action and I have reviewed all settings."
-   Navigation: "Back," "Deploy Token" button (enabled after checkbox), "Cancel."
-   **Post-Deploy:** Modal/notification showing transaction pending, then success (with explorer link, link to "My Tokens") or error.

**4. Token Management Page (/my-tokens/:tokenId)**

-   **Layout:** Main layout. Title displays "[Token Name] ([Ticker]) - Management."
-   **Content:**
-   **Overview Section/Tab:** Displays Token ID, Creator, Current Owner, Decimals, Supplies, and a read-only list of its properties (Mintable: Yes/No, Pausable: Yes/No, etc.). Links to explorer.
-   **Actions Section/Tab:** Conditionally renders action components based on token properties and user's permissions:
-   MintTokenForm (if canMint and user has role): Input for amount, "Mint" button.
-   BurnOwnTokenForm (if canBurn): Input for amount from own balance, "Burn" button.
-   PauseToggleButton (if canPause and user has role): "Pause Token" / "Unpause Token" button with confirmation modal.
-   TransferOwnershipForm (if canChangeOwner and user has role): Input for new owner address, "Transfer Ownership" button with critical warning modal.

**5. Airdrop Tool Page (/airdrop)**

-   **Layout:** Wizard with StepperNavigation.
-   **Step 1: Select Token & Prepare:** Dropdown to select from user's eligible tokens. Brief explanation of the airdrop process.
-   **Step 2: Recipient List:** Options for CSV upload (template provided) or manual input (address, amount format). Client-side validation and error display. Summary of valid recipients and total tokens.
-   **Step 3: Review & Strategy:** Summarizes token, recipients, total amount. Informs user if "Direct Airdrop" (ESDTMultiTransfer) or "Campaign Airdrop" (via Smart Contract) will be used. If SC, explains the two-step process (fund SC, then authorize distribution). Displays estimated fees.
-   **Step 4: Execute:**
-   Direct: "Confirm & Airdrop" button -> Sign transaction.
-   SC: Button 1 "Fund Airdrop Contract" -> Sign. Button 2 (appears after funding) "Start Distribution" -> Sign.
-   Progress indicators and transaction status updates.

**6. Add Liquidity Wizard (/add-liquidity)**

-   **Layout:** Wizard with StepperNavigation.
-   **Step 1: Introduction & Risks:**
-   Clear explanations of liquidity pools, LP tokens, impermanent loss.
-   Prominent disclaimers (SimpliFi is not a financial advisor).
-   Statement: "After providing initial liquidity through SimpliFi, you will manage your LP position (e.g., add more, remove, or view earnings) directly on xExchange."
-   Mandatory Checkbox: "I understand the concept of providing liquidity and its associated risks." (Next button disabled until checked).
-   **Step 2: Select Tokens:** "Token A" selector (user's tokens), "Token B" selector (EGLD, USDC, etc.). Display balances.
-   **Step 3: Define Initial Liquidity & Price:** Input fields for amounts of Token A and Token B. Dynamically display the resulting initial price (e.g., "1 Token A = X Token B").
-   CriticalWarning: "Setting the initial price is crucial. An incorrect ratio can lead to immediate losses for you or arbitrage opportunities. Ensure you understand the implications before proceeding."
-   **Step 4: Review & Confirm Risks:** Summary of deposit amounts, initial price, expected LP tokens. Estimated network fee. Mandatory Checkbox: "I have reviewed the details and understand the risks of providing liquidity at this price."
-   **Step 5: Add Liquidity:** "Add Liquidity" button -> Sign transaction. Display transaction status, success message (with link to xExchange pool), or error.

**Key UI/UX Principles to Maintain:**

-   **Simplicity & Clarity:** Use plain language. Abstract blockchain complexity.
-   **Progressive Disclosure:** Hide advanced options by default.
-   **Guidance & Education:** Utilize InfoIconWithTooltip extensively for contextual help.
-   **Transparency:** Clearly show fees, actions, and their consequences.
-   **Feedback:** Provide immediate UI feedback for actions and clear, persistent status updates for blockchain transactions.
-   **Consistency:** Maintain uniform design language and interaction patterns.
-   **Mobile-First Responsive Design:** Ensure usability across all device sizes.

This structure and wireframe guidance aim to fulfill the PDR's vision of making token creation and management on MultiversX accessible and user-friendly.
