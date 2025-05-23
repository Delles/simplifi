# LP Creation Wizard

A comprehensive wizard for creating liquidity pools on xExchange, following the PDR specifications and ThemeUI guidelines.

## Overview

The LP Creation Wizard guides users through the process of adding initial liquidity to make their tokens tradable on xExchange. It follows a 7-step process with educational content, risk warnings, and a smooth user experience.

## Architecture

### Modular Component Structure

The wizard follows the same modular pattern as TokenCreationWizard:

```
LPCreationWizard/
├── LPCreationWizard.tsx          # Main orchestrator component
├── components/
│   ├── shared/                   # Reusable components
│   │   ├── WizardStepper.tsx    # Progress stepper with validation
│   │   ├── InfoTooltip.tsx      # Educational tooltips
│   │   └── index.ts
│   ├── Introduction/             # Step 1: Educational content
│   ├── SelectToken/              # Step 2: Choose Token A
│   ├── ChoosePairingToken/       # Step 3: Choose Token B (EGLD/USDC)
│   ├── DefineLiquidity/          # Step 4: Set amounts and price
│   ├── ReviewRisks/              # Step 5: Risk acknowledgment
│   ├── TransactionExecution/     # Step 6: Sign transaction
│   ├── Confirmation/             # Step 7: Success/failure result
│   └── index.ts                  # Component exports
└── README.md
```

## Wizard Flow

### Step 1: Introduction & Education

-   **Purpose**: Educate users about liquidity pools, LP tokens, and key risks
-   **Content**:
    -   What is a liquidity pool explanation
    -   LP tokens benefits
    -   Risk warnings (impermanent loss, price setting, capital lock)
    -   Educational resources links
-   **Theme**: Orange/amber gradients (distribute theme)

### Step 2: Select Your Token (Token A)

-   **Purpose**: Choose the user's token for the liquidity pair
-   **Features**:
    -   Display user's token balances
    -   Token selection with visual feedback
    -   Educational tooltips
    -   Selected token summary
-   **Validation**: Token A must be selected

### Step 3: Choose Pairing Token (Token B)

-   **Purpose**: Select the token to pair with (EGLD, USDC, etc.)
-   **Status**: 🚧 Under development
-   **Validation**: Token B must be selected

### Step 4: Define Initial Liquidity & Price

-   **Purpose**: Set token amounts and establish initial price
-   **Features**:
    -   Amount input for both tokens
    -   Real-time price calculation
    -   Slippage warnings
-   **Status**: 🚧 Under development
-   **Validation**: Both token amounts must be set

### Step 5: Review & Confirm Risks

-   **Purpose**: Final review and explicit risk acknowledgment
-   **Features**:
    -   Summary of all settings
    -   Risk checklist
    -   Explicit acknowledgment required
-   **Status**: 🚧 Under development
-   **Validation**: Risk acknowledgment required

### Step 6: Transaction Execution

-   **Purpose**: Sign and execute the LP creation transaction
-   **Features**:
    -   Transaction summary
    -   Loading states
    -   Error handling
-   **Status**: 🚧 Under development

### Step 7: Confirmation

-   **Purpose**: Show success/failure result
-   **Features**:
    -   Success animation
    -   Pool summary
    -   Transaction hash link
    -   Next steps guidance
    -   Action buttons (view pool, create another)

## Key Features

### Educational Focus

-   Comprehensive risk warnings about impermanent loss
-   Clear explanations of liquidity pools and LP tokens
-   Educational tooltips throughout the process
-   Links to external documentation

### User Experience

-   Step-by-step progress indicator
-   Real-time validation with helpful messages
-   Smooth transitions and loading states
-   Responsive design with modern UI

### Risk Management

-   Multiple risk warnings and explanations
-   Explicit risk acknowledgment required
-   Clear price impact calculations
-   Transparent fee information

### Theme Compliance

-   Uses distribute theme colors (orange/amber)
-   Follows ThemeUI specifications
-   Consistent with TokenCreationWizard patterns
-   Modern card-based layout

## Data Structure

```typescript
interface LPData {
    tokenA: {
        identifier: string;
        name: string;
        ticker: string;
        balance: string;
        decimals: number;
        amount: string;
    } | null;
    tokenB: {
        identifier: string;
        name: string;
        ticker: string;
        balance: string;
        decimals: number;
        amount: string;
        type: "EGLD" | "ESDT";
    } | null;
    initialPrice: string;
    estimatedLPTokens: string;
    riskAcknowledged: boolean;
}
```

## Development Status

### ✅ Completed

-   Main wizard orchestrator
-   Modular component structure
-   Introduction step with full educational content
-   SelectToken step with token selection
-   Confirmation step with success handling
-   Shared components (WizardStepper, InfoTooltip)
-   Step validation and navigation
-   Theme compliance

### 🚧 In Development

-   ChoosePairingToken step
-   DefineLiquidity step with price calculation
-   ReviewRisks step with risk acknowledgment
-   TransactionExecution step with MultiversX integration

## Usage

```tsx
import { LPCreationWizard } from "./pages/LPCreationWizard/LPCreationWizard";

// Use in routing
<Route path="/create-lp" element={<LPCreationWizard />} />;
```

## Integration Points

### MultiversX SDK Integration

-   Token balance fetching
-   LP pool creation transactions
-   Transaction status monitoring
-   Error handling

### xExchange Integration

-   Pool creation API calls
-   Fee calculation
-   Price impact estimation
-   LP token minting

## Testing

The wizard includes mock data and simulated transactions for development:

-   Mock user tokens with different balances
-   Random success/failure for transaction testing
-   Simulated loading states
-   Mock transaction hashes

## Future Enhancements

1. **Advanced Features**:

    - Price range selection for concentrated liquidity
    - Multiple fee tier options
    - Liquidity mining rewards integration

2. **UX Improvements**:

    - Real-time price feeds
    - Historical pool performance data
    - Gas estimation
    - Transaction preview

3. **Educational Content**:
    - Interactive tutorials
    - Video explanations
    - Risk calculator tools
    - Best practices guides
