# TokenCreationWizard Components

This directory contains the modular TokenCreationWizard implementation, following the PDR specifications for democratizing token creation on MultiversX.

## Architecture

The wizard is split into modular components for easier maintenance and development:

```
TokenCreationWizard/
├── TokenCreationWizard.tsx          # Main orchestrator component
├── components/
│   ├── index.ts                     # Main exports
│   ├── shared/                      # Reusable components
│   │   ├── InfoTooltip.tsx         # Educational tooltips with risk indicators
│   │   ├── WizardStepper.tsx       # Progress stepper with animations
│   │   ├── PropertyToggle.tsx      # Toggle component for token properties
│   │   └── index.ts                # Shared component exports
│   ├── BasicInformation/           # Step 1: Basic token info
│   │   ├── BasicInformation.tsx    # Name, ticker, supply, decimals
│   │   └── index.ts                # Component exports
│   ├── TokenProperties/            # Step 2: Token behavior configuration
│   │   ├── TokenProperties.tsx     # Properties with progressive disclosure
│   │   └── index.ts                # Component exports
│   ├── ReviewConfirm/              # Step 3: Final review and confirmation
│   │   ├── ReviewConfirm.tsx       # Summary and cost breakdown
│   │   └── index.ts                # Component exports
│   └── Deploy/                     # Step 4: Token deployment
│       ├── Deploy.tsx              # Launch interface
│       └── index.ts                # Component exports
└── README.md                       # This documentation
```

## Component Responsibilities

### Main Orchestrator

-   **TokenCreationWizard.tsx**: Manages wizard state, navigation, and data flow between steps

### Shared Components

-   **InfoTooltip**: Provides educational content with risk-based styling (safe/caution/danger)
-   **WizardStepper**: Visual progress indicator with animations and step completion
-   **PropertyToggle**: Accessible toggle component for boolean token properties

### Step Components

1. **BasicInformation**: Collects fundamental token data (name, ticker, supply, decimals)
2. **TokenProperties**: Configures token behavior with progressive disclosure of advanced features
3. **ReviewConfirm**: Displays complete summary, cost breakdown, and final confirmation
4. **Deploy**: Provides launch interface with deployment button

## Data Flow

```typescript
interface TokenData {
    // Basic Information
    name: string;
    ticker: string;
    initialSupply: string;
    decimals: string;

    // Token Properties
    supplyType: "fixed" | "variable";
    burnable: boolean;
    ownershipTransfer: boolean;

    // Advanced Properties
    pausable: boolean;
    freezable: boolean;
    wipeable: boolean;
    upgradable: boolean;
    nftCreate: boolean;
}
```

## PDR Compliance

This implementation follows all PDR requirements:

### ✅ Accessibility First

-   Screen reader support with semantic HTML
-   Keyboard navigation throughout wizard
-   Clear visual hierarchy and focus indicators

### ✅ Education-Driven

-   InfoTooltip components with contextual explanations
-   Risk-based color coding (safe/caution/danger)
-   Pro tips and educational callouts
-   Progressive disclosure of advanced features

### ✅ Security by Design

-   Multiple confirmation steps
-   Risk warnings for dangerous properties
-   Cost transparency (0.05 EGLD clearly displayed)
-   Final irreversibility warning

### ✅ Progressive Disclosure

-   Advanced properties hidden by default
-   Toggle to show/hide complex features
-   Step-by-step guided process

## ThemeUI Integration

Components use the "Vibrant Democracy" theme:

-   **Action Colors**: Create theme (`create-500`, `create-100`, etc.)
-   **Glass-morphism**: `bg-white/90 backdrop-blur-sm`
-   **Enhanced Shadows**: `shadow-level-2`, `shadow-interactive`
-   **Animations**: `animate-bounce-gentle`, `animate-fade-in-up`
-   **Typography**: Inter font family with semantic sizing

## Development Guidelines

### Adding New Steps

1. Create new component in `components/StepName/`
2. Follow the established props pattern (`tokenData`, `onInputChange`)
3. Export from component's `index.ts`
4. Add to main `components/index.ts`
5. Update wizard switch statement

### Shared Components

-   Place reusable components in `components/shared/`
-   Follow accessibility patterns established by existing components
-   Use TypeScript interfaces for props
-   Include proper risk indicators where applicable

### Styling

-   Use Tailwind classes following ThemeUI specifications
-   Maintain consistent spacing with `space-y-6` pattern
-   Use action-specific colors for different contexts
-   Include hover states and transitions for interactive elements
