import React, { useState } from "react";
import styled from "styled-components";
import { Stepper } from "../../components/Stepper";
import { InfoIconWithTooltip } from "../../components/InfoIconWithTooltip"; // Uncommented for use
// import { RadioButtonGroup } from "../../components/RadioButtonGroup"; // Removed

interface LPData {
    tokenA_amount: string;
    tokenB_amount: string;
    // feeTier: string; // e.g., '0.05%', '0.3%', '1%' // Removed as per new spec
    // For now, we'll omit price range for simplicity
}

// New TokenInfo interface
interface TokenInfo {
    name: string;
    ticker: string;
    identifier: string;
    balance: string;
    decimals: number;
    iconUrl?: string;
    isVerified?: boolean;
}

interface StyledProps {
    variant?: "primary" | "secondary" | "outlined" | "text"; // Added outlined and text variants
    color?: "primary" | "secondary" | "danger" | "slate"; // Added color options for text links
    disabled?: boolean; // Added disabled to StyledProps for Button styling
}

const WizardContainer = styled.div`
    max-width: 800px; /* Max-width remains here for overall centering */
    margin: 0 auto;
    padding: 2rem; /* Padding for the page canvas */
    background-color: #f7f9fc; /* Cloud White - Theme: App Canvas/Page Background */
    font-family: "Inter", sans-serif; /* Theme: Font Family */
`;

// New CentralCard component
const CentralCard = styled.div`
    background: #ffffff; /* Pure White */
    border-radius: 12px;
    padding: 32px; /* 32px padding */
    box-shadow: 0px 4px 6px rgba(0, 0, 0, 0.05), 0px 1px 3px rgba(0, 0, 0, 0.1); /* Level 1 Shadow (example, adjust if specific theme values exist) */
    /* max-width: 800px; // Moved to WizardContainer for overall centering */
`;

const WizardHeader = styled.div`
    margin-bottom: 2rem; // Space between header and stepper
`;

const WizardTitle = styled.h2`
    font-family: "Inter", sans-serif;
    font-weight: 600; /* SemiBold */
    font-size: 24px;
    color: #1f2937; /* Graphite (assuming, adjust if theme specifies other) */
    margin: 0 0 0.5rem 0;
`;

const WizardSubtitle = styled.p`
    font-family: "Inter", sans-serif;
    font-weight: 400; /* Regular */
    font-size: 14px;
    color: #6b7280; /* Slate */
    margin: 0;
`;

const StepContainer = styled.div`
    /* background: #ffffff; // Background now handled by CentralCard */
    /* border-radius: 12px; // Border-radius now handled by CentralCard */
    padding: 2rem 0; /* Adjust padding as needed, or remove if CentralCard padding is sufficient */
    /* box-shadow: 0px 4px 8px rgba(25, 39, 55, 0.07),
        0px 2px 4px rgba(25, 39, 55, 0.05); // Shadow now handled by CentralCard */
`;

const FormGroup = styled.div`
    margin-bottom: 1.5rem;
`;

const Label = styled.label`
    display: block;
    font-family: "Inter", sans-serif; /* Theme: Font Family */
    font-size: 14px; /* Theme: Input Labels */
    font-weight: 500; /* Theme: Input Labels (Medium) */
    color: #6b7280; /* Slate - Theme: Input Labels color */
    margin-bottom: 0.5rem;
`;

const Input = styled.input`
    width: 100%;
    padding: 0.75rem; /* ~12px */
    border: 1px solid #e5e7eb; /* Ash - Theme: Standard Borders */
    border-radius: 8px; /* Theme: 6px-8px for UI Elements */
    font-family: "Inter", sans-serif; /* Theme: Font Family */
    font-size: 16px; /* Theme: Input Field Text */
    font-weight: 400; /* Regular */
    color: #1f2937; /* Graphite - Theme: Text Color (Primary) */
    background-color: #ffffff; /* Pure White - Theme: Content Surface Background */
    transition: all 0.2s ease;
    box-sizing: border-box; /* Ensure padding and border don't increase width */

    &::placeholder {
        color: #9ca3af; /* Silver/Slate with opacity - Theme: Placeholder Text Color */
        font-weight: 400; /* Regular */
    }

    &:focus {
        outline: none;
        border: 1.5px solid #3b82f6; /* Hyperlink Blue - Theme: Focus State Border */
        box-shadow: inset 0px 1px 2px rgba(59, 130, 246, 0.2); /* Theme: Subtle inner shadow for focus */
    }

    &:disabled {
        background: #e5e7eb; /* Ash - Theme: Disabled Background */
        color: #6b7280; /* Slate - Theme: Disabled Text */
        cursor: not-allowed;
        border-color: #e5e7eb; /* Ensure border also reflects disabled state */
    }
`;

const Button = styled.button<StyledProps>`
    padding: 0.75rem 1.5rem; /* ~12px 24px */
    border-radius: 8px; /* Theme: 6px-8px for UI Elements */
    font-family: "Inter", sans-serif; /* Theme: Font Family */
    cursor: pointer;
    transition: all 0.2s ease;
    box-sizing: border-box;

    ${(props: StyledProps) =>
        props.variant === "primary"
            ? `
    background: #00F2C3; /* Cyber Teal - Theme: Primary Accent */
    color: #0D2B2B; /* Deep Teal/Black - Theme: Text On Primary Accent */
    border: none;
    font-size: 16px; /* Theme: Primary/Large Buttons */
    font-weight: 500; /* Medium */

    &:hover:not(:disabled) {
      background: #00D9B0; /* Darker Teal */
      box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.1); /* Subtle hover shadow */
    }

    &:focus:not(:disabled) {
      outline: 2px solid #00F2C3; /* Cyber Teal */
      outline-offset: 2px;
    }

    &:disabled {
      background: #E5E7EB; /* Ash - Theme: Disabled Background */
      color: #6B7280; /* Slate - Theme: Disabled Text */
      cursor: not-allowed;
    }
  `
            : props.variant === "outlined" // New outlined variant
            ? `
    background: #FFFFFF; /* Pure White */
    color: #3B82F6; /* Hyperlink Blue - Theme: Secondary Accent */
    border: 1px solid #3B82F6; /* Hyperlink Blue */
    font-size: 14px; /* Theme: Secondary/Small Buttons */
    font-weight: 500; /* Medium */

    &:hover:not(:disabled) {
      background: rgba(59, 130, 246, 0.1); /* Hyperlink Blue 10% opacity */
      border-color: #3B82F6; /* Ensure border remains */
    }
    
    &:focus:not(:disabled) {
      outline: 2px solid #3B82F6; /* Hyperlink Blue */
      outline-offset: 2px;
    }

    &:disabled {
      border-color: #E5E7EB; /* Ash */
      color: #6B7280; /* Slate */
      background: #FFFFFF;
      cursor: not-allowed;
    }
  `
            : props.variant === "text" // New text variant (for Cancel link)
            ? `
    background: transparent;
    color: ${
        props.color === "slate" ? "#6B7280" : "#3B82F6"
    }; /* Slate or Hyperlink Blue */
    border: none;
    font-size: 14px;
    font-weight: 500;
    padding: 0.5rem; // Minimal padding for link-like button
    text-decoration: none; // Can add underline on hover if desired

    &:hover:not(:disabled) {
      text-decoration: underline;
    }

    &:focus:not(:disabled) {
      outline: 1px dashed ${props.color === "slate" ? "#6B7280" : "#3B82F6"};
      outline-offset: 1px;
    }
    
    &:disabled {
      color: #adb5bd; /* Lighter gray for disabled text link */
      cursor: not-allowed;
    }
  `
            : ` 
    background: #FFFFFF; /* Pure White - Default to secondary if variant not primary/outlined/text */
    color: #3B82F6; /* Hyperlink Blue - Theme: Secondary Accent */
    border: 1px solid #3B82F6; /* Hyperlink Blue */
    font-size: 14px; /* Theme: Secondary/Small Buttons */
    font-weight: 500; /* Medium */

    &:hover:not(:disabled) {
      background: rgba(59, 130, 246, 0.1); /* Hyperlink Blue 10% opacity */
      border-color: #3B82F6; /* Ensure border remains */
    }
    
    &:focus:not(:disabled) {
      outline: 2px solid #3B82F6; /* Hyperlink Blue */
      outline-offset: 2px;
    }

    &:disabled {
      border-color: #E5E7EB; /* Ash */
      color: #6B7280; /* Slate */
      background: #FFFFFF;
      cursor: not-allowed;
    }
  `}
`;

const SummaryItem = styled.div`
    display: flex;
    justify-content: space-between;
    padding: 0.75rem 0;
    border-bottom: 1px solid #e5e7eb; /* Ash - Theme: Standard Borders */
    font-family: "Inter", sans-serif; /* Theme: Font Family */

    &:last-child {
        border-bottom: none;
    }
`;

const SummaryLabel = styled.div`
    color: #6b7280; /* Slate - Theme: Text - Secondary */
    font-size: 14px; /* Theme: p (Secondary/Small) */
    font-weight: 400; /* Regular */
`;

const SummaryValue = styled.div`
    color: #1f2937; /* Graphite - Theme: Text - Primary */
    font-weight: 400; /* Regular */
    font-size: 14px; /* Theme: p (Secondary/Small) */
`;

// WarningBox component removed as CalloutBox variant='warning' will be used

const CheckboxLabel = styled.label`
    display: flex;
    align-items: center;
    gap: 0.75rem; /* Increased gap slightly */
    margin: 1.5rem 0; /* Increased margin */
    cursor: pointer;
    user-select: none; // Prevent text selection on click
    font-family: "Inter", sans-serif; /* Theme: Font Family */
    font-size: 14px; /* Theme: p (Secondary/Small) */
    color: #1f2937; /* Graphite - Theme: Text - Primary */
`;

const NativeCheckbox = styled.input.attrs({ type: "checkbox" })`
    display: none; // Hide native checkbox
`;

// New styled component for the custom checkbox
const CustomCheckbox = styled.div<{ checked: boolean; disabled?: boolean }>`
    min-width: 20px; /* Increased size slightly */
    width: 20px;
    height: 20px;
    border: 2px solid
        ${(props) =>
            props.disabled
                ? "#E5E7EB" /* Ash - Theme: Disabled Background/Border */
                : props.checked
                ? "#00F2C3" /* Cyber Teal - Theme: Primary Accent */
                : "#adb5bd"}; /* Mid-gray for unchecked state, better than Ash for visibility */
    background-color: ${(props) =>
        props.checked
            ? "#00F2C3" /* Cyber Teal - Theme: Primary Accent */
            : "#FFFFFF"}; /* Pure White */
    border-radius: 6px; /* Theme: 6px-8px, using 6px for a slightly more checkbox feel */
    /* margin-right: 0.75rem; */ /* Gap is now handled by CheckboxLabel */
    display: inline-flex;
    align-items: center;
    justify-content: center;
    transition: all 0.2s ease;
    opacity: ${(props) =>
        props.disabled ? 0.6 : 1}; /* Adjusted opacity for disabled */
    flex-shrink: 0; /* Prevent shrinking in flex layout */

    // Checkmark (using a pseudo-element)
    &::after {
        content: "✓"; // Checkmark character
        font-size: 14px; /* Adjusted for new checkbox size */
        font-weight: bold; /* Make checkmark clearer */
        color: ${(props) =>
            props.disabled
                ? "#6B7280" /* Slate - Theme: Disabled Text */
                : "#0D2B2B"}; /* Deep Teal/Black - Theme: Text on Primary Accent */
        display: ${(props) => (props.checked ? "block" : "none")};
    }

    /* Focus state for accessibility */
    input[type="checkbox"]:focus + & {
        outline: 2px solid #3b82f6; /* Hyperlink Blue */
        outline-offset: 2px;
    }
`;

// New Styled Component for Navigation Footer
const NavigationFooter = styled.div`
    margin-top: 2rem;
    padding-top: 1.5rem;
    border-top: 1px solid #e5e7eb; /* Ash - Horizontal Rule */
    display: flex;
    justify-content: space-between;
    align-items: center;
`;

const FooterActionsRight = styled.div`
    display: flex;
    gap: 1rem;
`;

const steps = [
    { title: "Introduction", description: "Understand liquidity provision" },
    { title: "Your Token", description: "Select your primary token" },
    { title: "Pairing Token", description: "Choose a token to pair with" },
    {
        title: "Set Liquidity & Price",
        description: "Define amounts and initial price",
    },
    {
        title: "Review & Confirm",
        description: "Final check and risk acknowledgement",
    },
    { title: "Transaction", description: "Process your transaction" },
    { title: "Confirmation", description: "Liquidity provision successful" },
];

// const feeTierOptions = [ // Removed
//     { value: "0.05%", label: "0.05%", description: "Best for very stable pairs (e.g., USDC/USDT)." },
//     { value: "0.3%", label: "0.3%", description: "Best for most common pairs (e.g., EGLD/USDC)." },
//     { value: "1.0%", label: "1.0%", description: "Best for exotic or newly listed pairs." },
// ];

// New CalloutBox styled component (re-added)
const CalloutBox = styled.div<{
    variant: "informational" | "warning" | "critical";
}>`
    border: 1px solid #e5e7eb; /* Ash - for a subtle main border */
    border-left-width: 4px;
    border-left-color: ${(props) =>
        props.variant === "informational"
            ? "#3B82F6" // Hyperlink Blue
            : props.variant === "warning"
            ? "#F59E0B" // Amber
            : "#EF4444"}; // Signal Red
    padding: 1rem;
    margin: 1rem 0;
    border-radius: 8px;
    background-color: ${(props) =>
        props.variant === "informational"
            ? "rgba(59, 130, 246, 0.05)" // Light blueish (Hyperlink Blue @ 5%)
            : props.variant === "warning"
            ? "#FFFBEB" // Light amber (Amber-50 / Mist equivalent)
            : "rgba(239, 68, 68, 0.05)"}; // Light reddish (Signal Red @ 5%)

    h5 {
        font-family: "Inter", sans-serif;
        font-size: 14px; /* Theme: Small heading/label */
        font-weight: 600; /* SemiBold */
        color: ${(props) =>
            props.variant === "informational"
                ? "#1E40AF" // Darker Blue (Hyperlink Blue shade for text)
                : props.variant === "warning"
                ? "#B45309" // Darker Amber (Amber shade for text)
                : "#991B1B"}; // Darker Red (Signal Red shade for text)
        margin: 0 0 0.5rem 0;
    }
    p {
        font-family: "Inter", sans-serif;
        font-size: 14px; /* Theme: p (Secondary/Small) */
        line-height: 1.6;
        color: ${(props) =>
            props.variant === "informational"
                ? "#1f2937" // Graphite
                : props.variant === "warning"
                ? "#B45309" // Darker Amber - consistent with h5 for warning text
                : "#1f2937"}; // Graphite (for critical text, header is Darker Red)
        margin: 0;
    }
`;

// Placeholder Styled Components (definitions were missing/misplaced, ensuring they are here)
const TokenDisplayCard = styled.div`
    border: 1px solid #e5e7eb; /* Ash */
    padding: 1rem;
    border-radius: 8px;
    margin: 1rem 0;
    background-color: #f9fafb; /* Cloud White / very light Mist - Slate-50 or Gray-50 from theme */
    /* Typography for general elements within TokenDisplayCard */
    h4 {
        font-family: "Inter", sans-serif;
        font-size: 16px; /* Default h4 size */
        font-weight: 600; /* SemiBold */
        color: #1f2937; /* Graphite */
        margin-bottom: 0.75rem; /* Consistent spacing */
    }
    p {
        font-family: "Inter", sans-serif;
        font-size: 14px; /* Default p size */
        color: #374151; /* Slate or Graphite, depending on context. Defaulting to slightly lighter.*/
        line-height: 1.6;
        margin: 0.25rem 0; /* Consistent spacing */
    }
    /* Specific overrides can still be done with inline styles or more specific selectors if needed */
`;

const SearchableTokenDropdown = styled.div`
    /* Placeholder for a richer dropdown component that will be built later */
    margin-bottom: 1rem;

    /* Styling for the actual select element within this div */
    select {
        width: 100%;
        padding: 0.75rem; /* ~12px */
        border: 1px solid #e5e7eb; /* Ash - Theme: Standard Borders */
        border-radius: 8px; /* Theme: 6px-8px for UI Elements */
        font-family: "Inter", sans-serif; /* Theme: Font Family */
        font-size: 16px; /* Theme: Input Field Text */
        font-weight: 400; /* Regular */
        color: #1f2937; /* Graphite - Theme: Text Color (Primary) */
        background-color: #ffffff; /* Pure White - Theme: Content Surface Background */
        transition: all 0.2s ease;
        box-sizing: border-box;
        appearance: none; /* Basic reset for custom arrow */
        background-image: url("data:image/svg+xml;charset=US-ASCII,%3Csvg%20xmlns%3D%22http%3A//www.w3.org/2000/svg%22%20width%3D%22292.4%22%20height%3D%22292.4%22%3E%3Cpath%20fill%3D%22%236B7280%22%20d%3D%22M287%2069.4a17.6%2017.6%200%200%200-13-5.4H18.4c-5%200-9.3%201.8-12.9%205.4A17.6%2017.6%200%200%200%200%2082.2c0%205%201.8%209.3%205.4%2012.9l128%20127.9c3.6%203.6%207.8%205.4%2012.8%205.4s9.2-1.8%2012.8-5.4L287%2095c3.5-3.5%205.4-7.8%205.4-12.8%200-5-1.9-9.2-5.5-12.8z%22/%3E%3C/svg%3E");
        background-repeat: no-repeat;
        background-position: right 0.7em top 50%, 0 0;
        background-size: 0.65em auto, 100%;

        &:focus {
            outline: none;
            border: 1.5px solid #3b82f6; /* Hyperlink Blue - Theme: Focus State Border */
            box-shadow: inset 0px 1px 2px rgba(59, 130, 246, 0.2); /* Theme: Subtle inner shadow for focus */
        }

        &:disabled {
            background: #e5e7eb; /* Ash - Theme: Disabled Background */
            color: #6b7280; /* Slate - Theme: Disabled Text */
            cursor: not-allowed;
            border-color: #e5e7eb; /* Ensure border also reflects disabled state */
        }
    }
`;

const ClickableCard = styled.button`
    border: 1px solid #e5e7eb; /* Ash */
    padding: 1rem;
    border-radius: 8px;
    text-align: left;
    cursor: pointer;
    background: #ffffff; /* Pure White */
    width: 100%; /* Or adjust as needed */
    transition: border-color 0.2s ease, box-shadow 0.2s ease;
    font-family: "Inter", sans-serif;

    /* Targeting potential inner elements for default theming */
    strong {
        color: #1f2937; /* Graphite */
        font-weight: 500; /* Medium, for titles within the card */
    }

    div[style*="font-size: 12px"] {
        /* More specific if needed, or use classes */
        color: #6b7280; /* Slate for secondary text */
    }

    &:hover:not(:disabled) {
        border-color: #3b82f6; /* Hyperlink Blue */
    }
    &.selected:not(:disabled) {
        border-color: #00f2c3; /* Cyber Teal */
        box-shadow: 0 0 0 2px #00f2c3; /* Cyber Teal focus ring */
    }
    &:disabled {
        background-color: #f3f4f6; /* Lighter Ash / Gray-100 */
        border-color: #e5e7eb; /* Ash */
        color: #9ca3af; /* Silver for main text when disabled */
        cursor: not-allowed;
        strong {
            color: #9ca3af;
        }
        div[style*="font-size: 12px"] {
            color: #adb5bd; /* Lighter silver for secondary disabled text */
        }
    }
    /* Styles for logo, name, balance to be added for recommended tokens */
`;

export const LPCreationWizard: React.FC = () => {
    const [currentStep, setCurrentStep] = useState(0);
    const [lpData, setLpData] = useState<LPData>({
        tokenA_amount: "",
        tokenB_amount: "",
        // feeTier: "0.3%", // Removed
    });
    const [isDeploying, setIsDeploying] = useState(false); // Will be repurposed for transaction processing state
    const [deploymentSuccessful, setDeploymentSuccessful] = useState(false); // Will be repurposed for transaction success state

    // New state variables
    const [introductionAcknowledged, setIntroductionAcknowledged] =
        useState(false);
    const [reviewRisksAcknowledged, setReviewRisksAcknowledged] =
        useState(false);
    const [selectedTokenA, setSelectedTokenA] = useState<TokenInfo | null>(
        null
    );
    const [selectedTokenB, setSelectedTokenB] = useState<TokenInfo | null>(
        null
    );
    const [transactionHash, setTransactionHash] = useState<string | null>(null);
    const [transactionStatusMessage, setTransactionStatusMessage] =
        useState<string>("");
    const [transactionError, setTransactionError] = useState<string | null>(
        null
    );

    const impermanentLossInfo =
        "Impermanent Loss Explained (Placeholder):\n\n" +
        "Impermanent Loss (IL) is a potential risk when providing liquidity to an Automated Market Maker (AMM) like those on xExchange. " +
        "It occurs when the price of the tokens in the liquidity pool changes compared to when you deposited them.\n\n" +
        "If token prices diverge significantly, the value of your share in the pool (when withdrawn) might be less than the value you would have had if you simply held your original tokens. " +
        'The loss is "impermanent" because it\'s only realized if you withdraw your funds at that point. If prices revert to their original state, the loss can be mitigated or disappear.\n\n' +
        "However, if prices don't revert, the loss becomes permanent upon withdrawal. " +
        "Trading fees earned can sometimes offset IL, but not always, especially during high volatility.";

    const handleInputChange = (
        field: keyof LPData,
        value: string | boolean // Value can still be boolean for potential future checkbox inputs in LPData
    ) => {
        setLpData((prev) => ({ ...prev, [field]: value as string }));
    };

    const totalSteps = steps.length;

    const handleNext = () => {
        if (currentStep < totalSteps - 1) {
            if (currentStep === 4) {
                // Transitioning from Review (step 4) to Transaction (step 5)
                handleCreatePool(); // Initiate transaction simulation
            }
            setCurrentStep((prev) => prev + 1);
        } else if (currentStep === totalSteps - 1) {
            // This is the "Finish" case on the last step, or could be handled by a dedicated Finish button
            console.log("Wizard Finished / Navigate away");
            // Potentially reset wizard or navigate
        }
    };

    const handleBack = () => {
        if (currentStep > 0) {
            setCurrentStep((prev) => prev - 1);
        }
    };

    const handleCreatePool = () => {
        // Renamed from handleDeploy // Will be repurposed for Step 6 logic
        setIsDeploying(true);
        setDeploymentSuccessful(false);
        setTransactionError(null); // Clear previous errors
        setTransactionStatusMessage(
            "Action Required: Please check your wallet..."
        );

        // Simulate wallet interaction and network confirmation
        setTimeout(() => {
            setTransactionStatusMessage("Preparing transaction...");
            setTimeout(() => {
                setTransactionStatusMessage(
                    "Awaiting signature in your connected wallet..."
                );
                // Simulate user signing - in a real app, this would await wallet provider response
                setTimeout(() => {
                    // Simulate transaction submission success/failure randomly for testing
                    const randomSuccess = Math.random() > 0.2; // 80% success rate for simulation

                    if (randomSuccess) {
                        setTransactionStatusMessage(
                            "Transaction submitted. Confirming on the MultiversX network..."
                        );
                        setTimeout(() => {
                            setTransactionStatusMessage(
                                "...Still confirming (block 1/12)..."
                            );
                            setTimeout(() => {
                                setIsDeploying(false);
                                setDeploymentSuccessful(true);
                                const mockTx =
                                    "0x" +
                                    Array(64)
                                        .fill(0)
                                        .map(() =>
                                            Math.floor(
                                                Math.random() * 16
                                            ).toString(16)
                                        )
                                        .join("");
                                setTransactionHash(mockTx);
                                setTransactionStatusMessage(
                                    "Transaction Confirmed!"
                                ); // Optional: for a brief moment before auto-nav
                                setCurrentStep((prev) => prev + 1); // Auto-navigate to Confirmation Step (Step 7)
                            }, 2000); // Simulate confirmation time
                        }, 1500); // Simulate submission time
                    } else {
                        setIsDeploying(false);
                        setTransactionError(
                            "Transaction failed: User rejected the transaction in wallet (Simulated). Possible reasons: insufficient funds, network congestion, or explicit rejection."
                        );
                        setTransactionStatusMessage("Transaction Failed.");
                    }
                }, 3000); // Simulate user interaction time with wallet
            }, 1000); // Simulate preparation time
        }, 500); // Initial delay to show "Action Required"
    };

    const handleCancel = () => {
        if (
            window.confirm(
                "Are you sure you want to cancel and exit the liquidity wizard?"
            )
        ) {
            // Reset state and navigate away or close modal, etc.
            console.log("Wizard cancelled");
            setCurrentStep(0); // Example: reset to first step
            setIntroductionAcknowledged(false);
            setReviewRisksAcknowledged(false);
            setSelectedTokenA(null);
            setSelectedTokenB(null);
            setLpData({
                tokenA_amount: "",
                tokenB_amount: "",
            });
            // ... reset other states as needed
        }
    };

    const handleFinishWizard = () => {
        console.log("Wizard Finished. Navigating to dashboard.");

        window.location.href = "/app"; // Navigate to dashboard
    };

    // Mock token data for development
    const mockUserTokens: TokenInfo[] = [
        {
            name: "My Super Token",
            ticker: "MST",
            identifier: "MST-abcdef",
            balance: "1000",
            decimals: 18,
            isVerified: true,
        },
        {
            name: "Another Great Coin",
            ticker: "AGC",
            identifier: "AGC-123456",
            balance: "500.75",
            decimals: 6,
        },
        {
            name: "Zero Balance Token",
            ticker: "ZBT",
            identifier: "ZBT-000000",
            balance: "0",
            decimals: 18,
        },
        {
            name: "Mega NFT",
            ticker: "MNFT",
            identifier: "MNFT-789xyz",
            balance: "1",
            decimals: 0,
            iconUrl: "/path/to/mnft-icon.png",
        },
        // Adding EGLD and USDC to mock data for Step 3
        {
            name: "Wrapped EGLD",
            ticker: "WEGLD",
            identifier: "WEGLD-abcdef", // Official WEGLD identifier would be used in a real app
            balance: "10.5", // Mock balance
            decimals: 18,
            isVerified: true,
            iconUrl: "/path/to/wegld-icon.png", // Placeholder icon
        },
        {
            name: "USD Coin",
            ticker: "USDC",
            identifier: "USDC-abcdef", // Official USDC identifier
            balance: "1500.25", // Mock balance
            decimals: 6,
            isVerified: true,
            iconUrl: "/path/to/usdc-icon.png", // Placeholder icon
        },
    ];

    const renderStep1_Introduction = () => (
        <>
            <h3
                style={{
                    fontFamily: "'Inter', sans-serif",
                    fontSize: "20px",
                    fontWeight: 600,
                    color: "#1F2937",
                    marginBottom: "1rem",
                }}
            >
                Understanding Liquidity Provision
            </h3>
            <p
                style={{
                    fontFamily: "'Inter', sans-serif",
                    fontSize: "14px",
                    color: "#374151",
                    lineHeight: 1.6,
                    marginBottom: "1rem",
                }}
            >
                Before you add liquidity, it's important to understand some core
                concepts. Providing liquidity allows your token to be traded on
                a decentralized exchange (DEX) like xExchange.
            </p>

            <h4
                style={{
                    fontFamily: "'Inter', sans-serif",
                    fontSize: "16px",
                    fontWeight: 600,
                    color: "#1F2937",
                    marginTop: "1.5rem",
                    marginBottom: "0.75rem",
                }}
            >
                Key Concepts
            </h4>
            <ul
                style={{
                    fontFamily: "'Inter', sans-serif",
                    fontSize: "14px",
                    color: "#374151",
                    lineHeight: 1.6,
                    paddingLeft: "20px",
                    marginBottom: "1.5rem",
                }}
            >
                <li style={{ marginBottom: "0.5rem" }}>
                    <strong>Liquidity Pool:</strong> A smart contract holding
                    reserves of two tokens. Users can swap one token for another
                    using these reserves.
                </li>
                <li style={{ marginBottom: "0.5rem" }}>
                    <strong>LP Tokens:</strong> When you deposit your tokens
                    into a liquidity pool, you receive Liquidity Provider (LP)
                    tokens. These represent your share of the pool and are used
                    to reclaim your deposited tokens and any accrued fees.
                </li>
            </ul>

            <h4
                style={{
                    fontFamily: "'Inter', sans-serif",
                    fontSize: "16px",
                    fontWeight: 600,
                    color: "#1F2937",
                    marginTop: "1.5rem",
                    marginBottom: "0.75rem",
                }}
            >
                Key Considerations & Risks
            </h4>
            <CalloutBox variant="warning">
                <h5
                    style={{
                        margin: "0 0 0.5rem 0",
                        fontSize: "14px",
                        fontWeight: 600,
                    }}
                >
                    You Define the Initial Price
                </h5>
                <p style={{ margin: 0, fontSize: "14px", lineHeight: 1.5 }}>
                    When you are the first to add liquidity to a pool, the ratio
                    of the two tokens you deposit sets the initial price. If
                    this price is significantly different from the market rate
                    on other exchanges, arbitrage traders can immediately profit
                    at your expense, leading to a potential loss of your initial
                    capital.
                </p>
            </CalloutBox>
            <CalloutBox variant="warning">
                <h5
                    style={{
                        margin: "0 0 0.5rem 0",
                        fontSize: "14px",
                        fontWeight: 600,
                    }}
                >
                    Risk: Impermanent Loss (IL)
                </h5>
                <p style={{ margin: 0, fontSize: "14px", lineHeight: 1.5 }}>
                    Impermanent Loss occurs when the price of your deposited
                    assets changes compared to when you deposited them. The
                    larger the change, the more you are exposed to IL. This
                    means you might have been better off just holding the tokens
                    instead of providing liquidity.
                    <button
                        onClick={() => alert(impermanentLossInfo)}
                        style={{
                            background: "none",
                            border: "none",
                            padding: "0",
                            color: "#3B82F6" /* Hyperlink Blue */,
                            textDecoration: "underline",
                            cursor: "pointer",
                            fontSize: "14px",
                            fontFamily: "'Inter', sans-serif",
                            display: "block",
                            marginTop: "0.5rem",
                        }}
                    >
                        Learn more about Impermanent Loss
                    </button>
                </p>
            </CalloutBox>

            <h4
                style={{
                    fontFamily: "'Inter', sans-serif",
                    fontSize: "16px",
                    fontWeight: 600,
                    color: "#1F2937",
                    marginTop: "1.5rem",
                    marginBottom: "0.75rem",
                }}
            >
                Why Provide Liquidity?
            </h4>
            <ul
                style={{
                    fontFamily: "'Inter', sans-serif",
                    fontSize: "14px",
                    color: "#374151",
                    lineHeight: 1.6,
                    paddingLeft: "20px",
                    marginBottom: "1.5rem",
                }}
            >
                <li style={{ marginBottom: "0.5rem" }}>
                    Make your token tradable and discoverable.
                </li>
                <li style={{ marginBottom: "0.5rem" }}>
                    Enable a market for your token pair.
                </li>
                <li style={{ marginBottom: "0.5rem" }}>
                    Potentially earn trading fees from swaps in the pool (though
                    this is subject to IL and other risks).
                </li>
            </ul>

            <h4
                style={{
                    fontFamily: "'Inter', sans-serif",
                    fontSize: "16px",
                    fontWeight: 600,
                    color: "#1F2937",
                    marginTop: "1.5rem",
                    marginBottom: "0.75rem",
                }}
            >
                Disclaimer
            </h4>
            <p
                style={{
                    fontFamily: "'Inter', sans-serif",
                    fontSize: "12px",
                    color: "#6B7280",
                    lineHeight: 1.6,
                    marginBottom: "1.5rem",
                }}
            >
                Providing liquidity involves significant financial risks.
                SimpliFi is a tool to help you interact with the MultiversX
                blockchain and xExchange. You are solely responsible for your
                decisions, understanding the risks, and any potential losses
                incurred.
            </p>

            <CheckboxLabel htmlFor="introductionAcknowledgement">
                <NativeCheckbox
                    id="introductionAcknowledgement"
                    checked={introductionAcknowledged}
                    onChange={(e) =>
                        setIntroductionAcknowledged(e.target.checked)
                    }
                />
                <CustomCheckbox checked={introductionAcknowledged} />I have read
                and understand the key concepts, benefits, and risks of
                providing liquidity, including initial price setting and
                impermanent loss.
            </CheckboxLabel>
        </>
    );

    const renderStep2_SelectYourToken = () => {
        const eligibleTokens = mockUserTokens.filter(
            (token) => parseFloat(token.balance) > 0
        );

        const handleTokenASelection = (tokenId: string) => {
            const token = mockUserTokens.find((t) => t.identifier === tokenId);
            setSelectedTokenA(token || null);
        };

        return (
            <>
                <h3
                    style={{
                        fontFamily: "'Inter', sans-serif",
                        fontSize: "20px",
                        fontWeight: 600,
                        color: "#1F2937",
                        marginBottom: "0.5rem",
                    }}
                >
                    Select Your Token
                </h3>
                <p
                    style={{
                        fontFamily: "'Inter', sans-serif",
                        fontSize: "14px",
                        color: "#374151",
                        lineHeight: 1.6,
                        marginBottom: "1.5rem",
                    }}
                >
                    Choose the token you want to make tradable. This will be the
                    first token in your liquidity pair.
                </p>

                <FormGroup>
                    <Label htmlFor="tokenASelect">
                        Your Token (Token A)
                        <InfoIconWithTooltip tooltipText="Select one of your existing ESDT tokens with a balance. This token will be paired with another to create the liquidity pool." />
                    </Label>
                    {eligibleTokens.length > 0 ? (
                        <SearchableTokenDropdown id="tokenASelect">
                            {" "}
                            {/* id added for htmlFor */}
                            <select
                                value={selectedTokenA?.identifier || ""}
                                onChange={(e) =>
                                    handleTokenASelection(e.target.value)
                                }
                                // style removed, will be handled by SearchableTokenDropdown parent
                            >
                                <option value="" disabled>
                                    Select your token
                                </option>
                                {eligibleTokens.map((token) => (
                                    <option
                                        key={token.identifier}
                                        value={token.identifier}
                                    >
                                        {token.name} ({token.ticker}) - Balance:{" "}
                                        {token.balance}
                                    </option>
                                ))}
                            </select>
                        </SearchableTokenDropdown>
                    ) : (
                        <CalloutBox variant="informational">
                            <p>
                                You don't seem to have any eligible tokens
                                (ESDTs with a balance greater than zero) in your
                                wallet to create a new liquidity pool. Please
                                acquire some tokens first.
                            </p>
                        </CalloutBox>
                    )}
                </FormGroup>

                {selectedTokenA && (
                    <TokenDisplayCard>
                        <h4
                            style={{
                                fontSize: "16px",
                                fontWeight: 600,
                                marginBottom: "0.75rem",
                            }}
                        >
                            Selected Token A: {selectedTokenA.name} (
                            {selectedTokenA.ticker})
                        </h4>
                        <p style={{ fontSize: "14px", margin: "0.25rem 0" }}>
                            <strong>Identifier:</strong>{" "}
                            {selectedTokenA.identifier}{" "}
                            {/* Add copy icon later */}
                        </p>
                        <p style={{ fontSize: "14px", margin: "0.25rem 0" }}>
                            <strong>Your Balance:</strong>{" "}
                            {selectedTokenA.balance} {selectedTokenA.ticker}
                        </p>
                        <p style={{ fontSize: "14px", margin: "0.25rem 0" }}>
                            <strong>Decimals:</strong> {selectedTokenA.decimals}
                        </p>
                        {selectedTokenA.isVerified && (
                            <p
                                style={{
                                    fontSize: "14px",
                                    margin: "0.25rem 0",
                                    color: "green",
                                }}
                            >
                                ✓ Verified Token
                            </p>
                        )}
                    </TokenDisplayCard>
                )}
            </>
        );
    };

    const renderStep3_ChoosePairingToken = () => {
        const wegldMock = mockUserTokens.find((t) => t.ticker === "WEGLD");
        const usdcMock = mockUserTokens.find((t) => t.ticker === "USDC");

        // Filter out selectedTokenA and non-balance tokens for the dropdown
        const otherEligibleTokens = mockUserTokens.filter(
            (token) =>
                token.identifier !== selectedTokenA?.identifier &&
                parseFloat(token.balance) > 0
        );

        const handleTokenBSelection = (tokenId: string | null) => {
            if (tokenId === null) {
                // Allows deselecting if needed, or for clearing selection
                setSelectedTokenB(null);
                return;
            }
            const token = mockUserTokens.find((t) => t.identifier === tokenId);
            setSelectedTokenB(token || null);
        };

        return (
            <>
                <h3
                    style={{
                        fontFamily: "'Inter', sans-serif",
                        fontSize: "20px",
                        fontWeight: 600,
                        color: "#1F2937",
                        marginBottom: "0.5rem",
                    }}
                >
                    Select a Pairing Token
                </h3>
                <p
                    style={{
                        fontFamily: "'Inter', sans-serif",
                        fontSize: "14px",
                        color: "#374151",
                        lineHeight: 1.6,
                        marginBottom: "1.5rem",
                    }}
                >
                    Now, choose a token to pair with{" "}
                    <strong>
                        {selectedTokenA?.ticker || "your selected token"}
                    </strong>
                    . This will form your liquidity pool pair.
                </p>

                <FormGroup>
                    <Label>
                        Recommended Pairing Tokens
                        <InfoIconWithTooltip tooltipText="Pairing with well-established tokens like WEGLD or USDC can provide better stability and trading volume for your new pool." />
                    </Label>
                    <div
                        style={{
                            display: "flex",
                            gap: "1rem",
                            marginBottom: "1.5rem",
                        }}
                    >
                        {wegldMock && parseFloat(wegldMock.balance) > 0 && (
                            <ClickableCard
                                className={
                                    selectedTokenB?.identifier ===
                                    wegldMock.identifier
                                        ? "selected"
                                        : ""
                                }
                                onClick={() =>
                                    handleTokenBSelection(wegldMock.identifier)
                                }
                            >
                                <div>
                                    <strong>
                                        {wegldMock.name} ({wegldMock.ticker})
                                    </strong>
                                </div>
                                <div style={{ fontSize: "12px" }}>
                                    Balance: {wegldMock.balance}
                                </div>
                            </ClickableCard>
                        )}
                        {usdcMock && parseFloat(usdcMock.balance) > 0 && (
                            <ClickableCard
                                className={
                                    selectedTokenB?.identifier ===
                                    usdcMock.identifier
                                        ? "selected"
                                        : ""
                                }
                                onClick={() =>
                                    handleTokenBSelection(usdcMock.identifier)
                                }
                            >
                                <div>
                                    <strong>
                                        {usdcMock.name} ({usdcMock.ticker})
                                    </strong>
                                </div>
                                <div style={{ fontSize: "12px" }}>
                                    Balance: {usdcMock.balance}
                                </div>
                            </ClickableCard>
                        )}
                    </div>
                </FormGroup>

                <FormGroup>
                    <Label htmlFor="tokenBSelect">
                        Or, choose another token (Token B)
                        <InfoIconWithTooltip tooltipText="Select a different token from your wallet to pair with Token A." />
                    </Label>
                    {otherEligibleTokens.length > 0 ? (
                        <SearchableTokenDropdown id="tokenBSelect">
                            <select
                                value={selectedTokenB?.identifier || ""}
                                onChange={(e) =>
                                    handleTokenBSelection(e.target.value)
                                }
                                // style removed, will be handled by SearchableTokenDropdown parent
                            >
                                <option
                                    value=""
                                    disabled={
                                        selectedTokenB !== null &&
                                        (selectedTokenB.identifier ===
                                            wegldMock?.identifier ||
                                            selectedTokenB.identifier ===
                                                usdcMock?.identifier)
                                    }
                                >
                                    {selectedTokenB !== null &&
                                    (selectedTokenB.identifier ===
                                        wegldMock?.identifier ||
                                        selectedTokenB.identifier ===
                                            usdcMock?.identifier)
                                        ? "--- Recommended token selected ---"
                                        : "Select other token"}
                                </option>
                                {otherEligibleTokens.map((token) => (
                                    <option
                                        key={token.identifier}
                                        value={token.identifier}
                                    >
                                        {token.name} ({token.ticker}) - Balance:{" "}
                                        {token.balance}
                                    </option>
                                ))}
                            </select>
                        </SearchableTokenDropdown>
                    ) : (
                        <CalloutBox variant="informational">
                            <p>
                                No other eligible tokens found to pair with{" "}
                                {selectedTokenA?.ticker || "Token A"}.
                            </p>
                        </CalloutBox>
                    )}
                </FormGroup>

                {selectedTokenB && (
                    <TokenDisplayCard>
                        <h4
                            style={{
                                fontSize: "16px",
                                fontWeight: 600,
                                marginBottom: "0.75rem",
                            }}
                        >
                            Selected Token B: {selectedTokenB.name} (
                            {selectedTokenB.ticker})
                        </h4>
                        <p style={{ fontSize: "14px", margin: "0.25rem 0" }}>
                            <strong>Identifier:</strong>{" "}
                            {selectedTokenB.identifier}
                        </p>
                        <p style={{ fontSize: "14px", margin: "0.25rem 0" }}>
                            <strong>Your Balance:</strong>{" "}
                            {selectedTokenB.balance} {selectedTokenB.ticker}
                        </p>
                        <p style={{ fontSize: "14px", margin: "0.25rem 0" }}>
                            <strong>Decimals:</strong> {selectedTokenB.decimals}
                        </p>
                        {selectedTokenB.isVerified && (
                            <p
                                style={{
                                    fontSize: "14px",
                                    margin: "0.25rem 0",
                                    color: "green",
                                }}
                            >
                                ✓ Verified Token
                            </p>
                        )}
                        {selectedTokenB.ticker === "WEGLD" && (
                            <p
                                style={{
                                    fontSize: "14px",
                                    margin: "0.25rem 0",
                                    fontStyle: "italic",
                                }}
                            >
                                Note: Pairing with WEGLD will use specific
                                addLiquidityEgld functions.
                            </p>
                        )}
                    </TokenDisplayCard>
                )}

                {selectedTokenA && selectedTokenB && (
                    <CalloutBox variant="informational">
                        <p>
                            You are preparing to create a liquidity pool for{" "}
                            <strong>
                                {selectedTokenA.ticker} /{" "}
                                {selectedTokenB.ticker}
                            </strong>
                            .
                        </p>
                    </CalloutBox>
                )}
            </>
        );
    };

    const renderStep4_DefineLiquidityAndPrice = () => {
        const amountA = parseFloat(lpData.tokenA_amount) || 0;
        const amountB = parseFloat(lpData.tokenB_amount) || 0;

        const balanceA = selectedTokenA
            ? parseFloat(selectedTokenA.balance)
            : 0;
        const balanceB = selectedTokenB
            ? parseFloat(selectedTokenB.balance)
            : 0;

        const isAmountAValid = amountA > 0 && amountA <= balanceA;
        const isAmountBValid = amountB > 0 && amountB <= balanceB;

        let priceAInB = "-";
        let priceBInA = "-";

        if (amountA > 0 && amountB > 0) {
            priceAInB = (amountB / amountA).toLocaleString(undefined, {
                minimumFractionDigits: 2,
                maximumFractionDigits: 8,
            });
            priceBInA = (amountA / amountB).toLocaleString(undefined, {
                minimumFractionDigits: 2,
                maximumFractionDigits: 8,
            });
        }

        const handleMaxAmount = (tokenType: "A" | "B") => {
            if (tokenType === "A" && selectedTokenA) {
                handleInputChange("tokenA_amount", selectedTokenA.balance);
            }
            if (tokenType === "B" && selectedTokenB) {
                handleInputChange("tokenB_amount", selectedTokenB.balance);
            }
        };

        if (!selectedTokenA || !selectedTokenB) {
            return (
                <CalloutBox variant="warning">
                    <p>
                        Please select both Token A and Token B in the previous
                        steps before defining liquidity.
                    </p>
                </CalloutBox>
            );
        }

        return (
            <>
                <h3
                    style={{
                        fontFamily: "'Inter', sans-serif",
                        fontSize: "20px",
                        fontWeight: 600,
                        color: "#1F2937",
                        marginBottom: "1.5rem",
                    }}
                >
                    Define Initial Liquidity and Price
                </h3>

                {/* Token A Deposit Section */}
                <FormGroup>
                    <Label htmlFor="tokenAAmount">
                        Amount of {selectedTokenA.ticker} to deposit
                        <InfoIconWithTooltip
                            tooltipText={`Your current balance: ${selectedTokenA.balance} ${selectedTokenA.ticker}`}
                        />
                    </Label>
                    <div
                        style={{
                            display: "flex",
                            alignItems: "center",
                            gap: "0.5rem",
                        }}
                    >
                        <Input
                            id="tokenAAmount"
                            type="number"
                            min="0"
                            value={lpData.tokenA_amount}
                            onChange={(e) =>
                                handleInputChange(
                                    "tokenA_amount",
                                    e.target.value
                                )
                            }
                            placeholder={`e.g., 100.0 ${selectedTokenA.ticker}`}
                            style={{
                                borderColor:
                                    amountA > 0 && !isAmountAValid
                                        ? "red"
                                        : undefined,
                            }}
                        />
                        <Button
                            variant="outlined"
                            onClick={() => handleMaxAmount("A")}
                            style={{ padding: "0.75rem" }}
                        >
                            MAX
                        </Button>
                    </div>
                    {amountA > 0 && !isAmountAValid && (
                        <p
                            style={{
                                color: "red",
                                fontSize: "12px",
                                marginTop: "0.25rem",
                            }}
                        >
                            Amount exceeds balance or is invalid.
                        </p>
                    )}
                </FormGroup>

                {/* Token B Deposit Section */}
                <FormGroup>
                    <Label htmlFor="tokenBAmount">
                        Amount of {selectedTokenB.ticker} to deposit
                        <InfoIconWithTooltip
                            tooltipText={`Your current balance: ${selectedTokenB.balance} ${selectedTokenB.ticker}`}
                        />
                    </Label>
                    <div
                        style={{
                            display: "flex",
                            alignItems: "center",
                            gap: "0.5rem",
                        }}
                    >
                        <Input
                            id="tokenBAmount"
                            type="number"
                            min="0"
                            value={lpData.tokenB_amount}
                            onChange={(e) =>
                                handleInputChange(
                                    "tokenB_amount",
                                    e.target.value
                                )
                            }
                            placeholder={`e.g., 500.0 ${selectedTokenB.ticker}`}
                            style={{
                                borderColor:
                                    amountB > 0 && !isAmountBValid
                                        ? "red"
                                        : undefined,
                            }}
                        />
                        <Button
                            variant="outlined"
                            onClick={() => handleMaxAmount("B")}
                            style={{ padding: "0.75rem" }}
                        >
                            MAX
                        </Button>
                    </div>
                    {amountB > 0 && !isAmountBValid && (
                        <p
                            style={{
                                color: "red",
                                fontSize: "12px",
                                marginTop: "0.25rem",
                            }}
                        >
                            Amount exceeds balance or is invalid.
                        </p>
                    )}
                </FormGroup>

                {/* Price & Information Display Area */}
                <div
                    style={{
                        border: "1px solid #e5e7eb",
                        borderRadius: "8px",
                        padding: "1rem",
                        margin: "2rem 0",
                    }}
                >
                    <h4
                        style={{
                            fontFamily: "'Inter', sans-serif",
                            fontSize: "16px",
                            fontWeight: 600,
                            color: "#1F2937",
                            marginBottom: "1rem",
                        }}
                    >
                        Resulting Initial Price for Your Pool
                    </h4>
                    <SummaryItem>
                        <SummaryLabel>1 {selectedTokenA.ticker}</SummaryLabel>
                        <SummaryValue>
                            <strong>{priceAInB}</strong> {selectedTokenB.ticker}
                        </SummaryValue>
                    </SummaryItem>
                    <SummaryItem>
                        <SummaryLabel>1 {selectedTokenB.ticker}</SummaryLabel>
                        <SummaryValue>
                            <strong>{priceBInA}</strong> {selectedTokenA.ticker}
                        </SummaryValue>
                    </SummaryItem>
                    <SummaryItem>
                        <SummaryLabel>
                            Your estimated share of the pool
                        </SummaryLabel>
                        <SummaryValue>
                            <strong>100%</strong>
                        </SummaryValue>
                    </SummaryItem>
                </div>

                <CalloutBox variant="critical">
                    <h5 /* Using h5 from CalloutBox styling */>
                        IMPORTANT: YOU ARE SETTING THE MARKET PRICE
                    </h5>
                    <p>
                        The ratio of tokens you deposit now will define the
                        initial exchange price for this pair on the DEX. If this
                        price significantly deviates from the pair's price on
                        other established markets (if any), your pool could face
                        immediate arbitrage (e.g., bots buying the underpriced
                        asset or selling the overpriced one), potentially
                        leading to a rapid loss of some of your deposited funds.
                        Review carefully.
                    </p>
                </CalloutBox>

                <CalloutBox variant="informational">
                    <h5 /* Using h5 from CalloutBox styling */>
                        Tip for Setting Your Initial Price
                    </h5>
                    <p>
                        To set a desired price of, for example, 1{" "}
                        {selectedTokenA.ticker} = 0.01 {selectedTokenB.ticker},
                        you would need to deposit tokens in a ratio where the
                        amount of {selectedTokenB.ticker} is 0.01 times the
                        amount of {selectedTokenA.ticker}. For instance, deposit
                        1000 {selectedTokenA.ticker} and 10{" "}
                        {selectedTokenB.ticker}.
                    </p>
                </CalloutBox>
            </>
        );
    };

    const renderStep5_ReviewAndConfirmRisks = () => {
        if (
            !selectedTokenA ||
            !selectedTokenB ||
            !lpData.tokenA_amount ||
            !lpData.tokenB_amount
        ) {
            return (
                <CalloutBox variant="warning">
                    <p>
                        Please complete the previous steps, including token
                        selection and amounts, before reviewing.
                    </p>
                </CalloutBox>
            );
        }

        const amountA = parseFloat(lpData.tokenA_amount) || 0;
        const amountB = parseFloat(lpData.tokenB_amount) || 0;
        let priceAInB = "-";
        let priceBInA = "-";

        if (amountA > 0 && amountB > 0) {
            priceAInB = (amountB / amountA).toLocaleString(undefined, {
                minimumFractionDigits: 2,
                maximumFractionDigits: 8,
            });
            priceBInA = (amountA / amountB).toLocaleString(undefined, {
                minimumFractionDigits: 2,
                maximumFractionDigits: 8,
            });
        }

        // Mock LP token calculation
        const mockLPTokens = (Math.sqrt(amountA * amountB) || 0).toLocaleString(
            undefined,
            { minimumFractionDigits: 2, maximumFractionDigits: 6 }
        );

        return (
            <>
                <h3
                    style={{
                        fontFamily: "'Inter', sans-serif",
                        fontSize: "20px",
                        fontWeight: 600,
                        color: "#1F2937",
                        marginBottom: "0.5rem",
                    }}
                >
                    Review Liquidity Details & Confirm Risks
                </h3>
                <p
                    style={{
                        fontFamily: "'Inter', sans-serif",
                        fontSize: "14px",
                        color: "#374151",
                        lineHeight: 1.6,
                        marginBottom: "1.5rem",
                    }}
                >
                    Please carefully review all the details of your liquidity
                    provision. This action will interact with the blockchain.
                </p>

                {/* Summary Section 1: You Will Deposit */}
                <TokenDisplayCard style={{ marginBottom: "1.5rem" }}>
                    <h4
                        style={{
                            fontSize: "16px",
                            fontWeight: 600,
                            marginBottom: "0.75rem",
                        }}
                    >
                        You Will Deposit:
                    </h4>
                    <SummaryItem>
                        <SummaryLabel>
                            {selectedTokenA.ticker} Amount:
                        </SummaryLabel>
                        <SummaryValue>{lpData.tokenA_amount}</SummaryValue>
                    </SummaryItem>
                    <SummaryItem>
                        <SummaryLabel>
                            {selectedTokenB.ticker} Amount:
                        </SummaryLabel>
                        <SummaryValue>{lpData.tokenB_amount}</SummaryValue>
                    </SummaryItem>
                </TokenDisplayCard>

                {/* Summary Section 2: Initial Price */}
                <TokenDisplayCard style={{ marginBottom: "1.5rem" }}>
                    <h4
                        style={{
                            fontSize: "16px",
                            fontWeight: 600,
                            marginBottom: "0.75rem",
                        }}
                    >
                        This Will Set the Initial Price At:
                    </h4>
                    <SummaryItem>
                        <SummaryLabel>1 {selectedTokenA.ticker}</SummaryLabel>
                        <SummaryValue>
                            <strong>{priceAInB}</strong> {selectedTokenB.ticker}
                        </SummaryValue>
                    </SummaryItem>
                    <SummaryItem>
                        <SummaryLabel>1 {selectedTokenB.ticker}</SummaryLabel>
                        <SummaryValue>
                            <strong>{priceBInA}</strong> {selectedTokenA.ticker}
                        </SummaryValue>
                    </SummaryItem>
                </TokenDisplayCard>

                {/* Summary Section 3: Estimated LP Tokens */}
                <TokenDisplayCard style={{ marginBottom: "1.5rem" }}>
                    <h4
                        style={{
                            fontSize: "16px",
                            fontWeight: 600,
                            marginBottom: "0.75rem",
                        }}
                    >
                        Estimated LP Tokens You Will Receive:
                        <InfoIconWithTooltip tooltipText="LP (Liquidity Provider) tokens represent your share in this liquidity pool. You can use them to withdraw your assets and accrued fees later." />
                    </h4>
                    <SummaryItem>
                        <SummaryLabel>LP Token Amount (Estimate):</SummaryLabel>
                        <SummaryValue>
                            ~{mockLPTokens} {selectedTokenA.ticker}-
                            {selectedTokenB.ticker}-LP
                        </SummaryValue>
                    </SummaryItem>
                </TokenDisplayCard>

                <CalloutBox variant="warning">
                    <h5 /* Using h5 from CalloutBox styling */>
                        Acknowledge Key Risks
                    </h5>
                    <ul
                        style={{
                            paddingLeft: "20px",
                            margin: "0.5rem 0 0 0",
                            fontSize: "14px",
                            lineHeight: 1.6,
                        }}
                    >
                        <li>
                            <strong>Initial Price Setting:</strong> The ratio of
                            your deposits defines the pool's starting price.
                            Mispricing can lead to immediate losses through
                            arbitrage.
                        </li>
                        <li>
                            <strong>Impermanent Loss:</strong> If token prices
                            diverge after you deposit, the value of your
                            withdrawn assets might be less than if you had
                            simply held them.
                        </li>
                        <li>
                            <strong>Asset Volatility:</strong> The value of your
                            deposited tokens and LP tokens can fluctuate
                            significantly.
                        </li>
                        <li>
                            <strong>Blockchain Interaction:</strong>{" "}
                            Transactions are final once confirmed on the
                            blockchain. Ensure all details are correct before
                            proceeding.
                        </li>
                    </ul>
                </CalloutBox>

                <CheckboxLabel
                    htmlFor="reviewRisksAcknowledgementCheckbox"
                    style={{ fontSize: "16px", alignItems: "flex-start" }}
                >
                    <NativeCheckbox
                        id="reviewRisksAcknowledgementCheckbox"
                        checked={reviewRisksAcknowledged}
                        onChange={(e) =>
                            setReviewRisksAcknowledged(e.target.checked)
                        }
                        style={{ marginTop: "4px" }}
                    />
                    <CustomCheckbox
                        checked={reviewRisksAcknowledged}
                        style={{ marginTop: "4px" }}
                    />
                    I have carefully reviewed all the information above. I
                    understand and accept the financial risks associated with
                    providing liquidity, including those related to initial
                    price setting and impermanent loss.
                </CheckboxLabel>

                <p
                    style={{
                        fontFamily: "'Inter', sans-serif",
                        fontSize: "12px",
                        color: "#6B7280",
                        lineHeight: 1.6,
                        marginTop: "1rem",
                    }}
                >
                    A network transaction fee (gas) in EGLD will be required to
                    create the liquidity pool. This will be displayed for
                    confirmation in your connected wallet.
                </p>
            </>
        );
    };

    const renderStep6_TransactionExecution = () => {
        if (!selectedTokenA || !selectedTokenB) {
            // Should not happen if flow is correct, but good fallback
            return (
                <CalloutBox variant="warning">
                    <p>
                        Token information is missing. Please go back and select
                        tokens.
                    </p>
                </CalloutBox>
            );
        }

        // Basic Spinner (can be replaced with a proper SVG/CSS spinner component)
        const Spinner = () => {
            const spinnerChars = ["|", "/", "-", "\\"];
            const [charIndex, setCharIndex] = useState(0);
            React.useEffect(() => {
                if (isDeploying && !transactionError) {
                    const interval = setInterval(() => {
                        setCharIndex(
                            (prev) => (prev + 1) % spinnerChars.length
                        );
                    }, 200);
                    return () => clearInterval(interval);
                }
            }, [spinnerChars.length]); // Removed isDeploying and transactionError
            return isDeploying && !transactionError ? (
                <span
                    style={{
                        marginRight: "10px",
                        display: "inline-block",
                        width: "20px",
                    }}
                >
                    {spinnerChars[charIndex]}
                </span>
            ) : null;
        };

        if (transactionError) {
            return (
                <>
                    <h3
                        style={{
                            fontFamily: "'Inter', sans-serif",
                            fontSize: "20px",
                            fontWeight: 600,
                            color: "#EF4444",
                            marginBottom: "1rem",
                        }}
                    >
                        Transaction Failed
                    </h3>
                    <CalloutBox variant="critical">
                        <p>{transactionError}</p>
                    </CalloutBox>
                    <div
                        style={{
                            display: "flex",
                            justifyContent: "flex-end",
                            gap: "1rem",
                            marginTop: "2rem",
                        }}
                    >
                        <Button
                            variant="outlined"
                            onClick={
                                () =>
                                    setCurrentStep(
                                        0
                                    ) /* Or a dedicated dashboard/close action */
                            }
                        >
                            Close
                        </Button>
                        <Button
                            variant="primary"
                            onClick={() => {
                                setTransactionError(null);
                                setIsDeploying(false); // Reset deploying state
                                setCurrentStep(4); // Go back to Review step
                            }}
                        >
                            Try Again
                        </Button>
                    </div>
                </>
            );
        }

        return (
            <>
                <h3
                    style={{
                        fontFamily: "'Inter', sans-serif",
                        fontSize: "20px",
                        fontWeight: 600,
                        color: "#1F2937",
                        marginBottom: "1rem",
                    }}
                >
                    Processing Your Liquidity Transaction
                </h3>
                <div style={{ textAlign: "center", padding: "2rem 0" }}>
                    <div style={{ fontSize: "48px", marginBottom: "1rem" }}>
                        {isDeploying ? (
                            <Spinner />
                        ) : deploymentSuccessful ? (
                            "✅"
                        ) : (
                            "⏳"
                        )}
                    </div>
                    <p
                        style={{
                            fontSize: "18px",
                            fontWeight: 500,
                            color: "#1F2937",
                            marginBottom: "0.5rem",
                        }}
                    >
                        {transactionStatusMessage}
                    </p>
                    {isDeploying && (
                        <p style={{ fontSize: "14px", color: "#6B7280" }}>
                            Please follow the prompts in your connected wallet.
                            Do not close this window.
                        </p>
                    )}
                </div>

                <TokenDisplayCard
                    style={{
                        marginTop: "2rem",
                        opacity: isDeploying ? 0.7 : 1,
                    }}
                >
                    <h4
                        style={{
                            fontSize: "16px",
                            fontWeight: 600,
                            marginBottom: "0.75rem",
                        }}
                    >
                        Transaction Summary:
                    </h4>
                    <SummaryItem>
                        <SummaryLabel>Action:</SummaryLabel>
                        <SummaryValue>Create Liquidity Pool</SummaryValue>
                    </SummaryItem>
                    <SummaryItem>
                        <SummaryLabel>Pair:</SummaryLabel>
                        <SummaryValue>
                            {selectedTokenA.ticker} / {selectedTokenB.ticker}
                        </SummaryValue>
                    </SummaryItem>
                    <SummaryItem>
                        <SummaryLabel>
                            Depositing {selectedTokenA.ticker}:
                        </SummaryLabel>
                        <SummaryValue>{lpData.tokenA_amount}</SummaryValue>
                    </SummaryItem>
                    <SummaryItem>
                        <SummaryLabel>
                            Depositing {selectedTokenB.ticker}:
                        </SummaryLabel>
                        <SummaryValue>{lpData.tokenB_amount}</SummaryValue>
                    </SummaryItem>
                </TokenDisplayCard>
            </>
        );
    };

    const renderStep7_Confirmation = () => {
        if (
            !deploymentSuccessful ||
            !selectedTokenA ||
            !selectedTokenB ||
            !transactionHash
        ) {
            return (
                <CalloutBox variant="warning">
                    <p>
                        Transaction confirmation details are not yet available.
                        Please wait or ensure the transaction was successful.
                    </p>
                </CalloutBox>
            );
        }

        const amountA = parseFloat(lpData.tokenA_amount) || 0;
        const amountB = parseFloat(lpData.tokenB_amount) || 0;
        let priceAInB = "-";
        let priceBInA = "-";

        if (amountA > 0 && amountB > 0) {
            priceAInB = (amountB / amountA).toLocaleString(undefined, {
                minimumFractionDigits: 2,
                maximumFractionDigits: 8,
            });
            priceBInA = (amountA / amountB).toLocaleString(undefined, {
                minimumFractionDigits: 2,
                maximumFractionDigits: 8,
            });
        }

        const mockLPTokens = (Math.sqrt(amountA * amountB) || 0).toLocaleString(
            undefined,
            { minimumFractionDigits: 2, maximumFractionDigits: 6 }
        );
        const lpTokenIdentifier = `${selectedTokenA.ticker}-${selectedTokenB.ticker}-LP`;
        const mockExplorerUrl = `https://devnet-explorer.multiversx.com/transactions/${transactionHash}`;

        return (
            <>
                <div style={{ textAlign: "center", marginBottom: "2rem" }}>
                    <span
                        style={{
                            fontSize: "60px",
                            display: "block",
                            marginBottom: "1rem",
                        }}
                    >
                        ✅
                    </span>
                    <h2
                        style={{
                            fontFamily: "'Inter', sans-serif",
                            fontSize: "28px",
                            fontWeight: 700,
                            color: "#10B981",
                            marginBottom: "0.5rem",
                        }}
                    >
                        Congratulations! Liquidity Added!
                    </h2>
                    <p
                        style={{
                            fontFamily: "'Inter', sans-serif",
                            fontSize: "16px",
                            color: "#374151",
                            lineHeight: 1.6,
                        }}
                    >
                        Your{" "}
                        <strong>
                            {selectedTokenA.ticker} / {selectedTokenB.ticker}
                        </strong>{" "}
                        liquidity pool has been successfully created and your
                        assets have been deposited.
                    </p>
                </div>

                <TokenDisplayCard style={{ marginBottom: "1.5rem" }}>
                    <h4
                        style={{
                            fontSize: "18px",
                            fontWeight: 600,
                            marginBottom: "1rem",
                        }}
                    >
                        Key Details:
                    </h4>
                    <SummaryItem>
                        <SummaryLabel>
                            Deposited {selectedTokenA.ticker}:
                        </SummaryLabel>
                        <SummaryValue>{lpData.tokenA_amount}</SummaryValue>
                    </SummaryItem>
                    <SummaryItem>
                        <SummaryLabel>
                            Deposited {selectedTokenB.ticker}:
                        </SummaryLabel>
                        <SummaryValue>{lpData.tokenB_amount}</SummaryValue>
                    </SummaryItem>
                    <SummaryItem>
                        <SummaryLabel>
                            Resulting Price (1 {selectedTokenA.ticker}):
                        </SummaryLabel>
                        <SummaryValue>
                            <strong>{priceAInB}</strong> {selectedTokenB.ticker}
                        </SummaryValue>
                    </SummaryItem>
                    <SummaryItem>
                        <SummaryLabel>
                            Resulting Price (1 {selectedTokenB.ticker}):
                        </SummaryLabel>
                        <SummaryValue>
                            <strong>{priceBInA}</strong> {selectedTokenA.ticker}
                        </SummaryValue>
                    </SummaryItem>
                    <SummaryItem>
                        <SummaryLabel>
                            LP Tokens Received (Estimate):
                        </SummaryLabel>
                        <SummaryValue>
                            ~{mockLPTokens} {lpTokenIdentifier}
                            <InfoIconWithTooltip
                                tooltipText={`These LP tokens (${lpTokenIdentifier}) represent your share in the pool and have been sent to your wallet.`}
                            />
                        </SummaryValue>
                    </SummaryItem>
                    <SummaryItem>
                        <SummaryLabel>Transaction ID:</SummaryLabel>
                        <SummaryValue>
                            <a
                                href={mockExplorerUrl}
                                target="_blank"
                                rel="noopener noreferrer"
                                style={{
                                    color: "#3B82F6",
                                    textDecoration: "underline",
                                }}
                                title="View on Explorer"
                            >
                                {transactionHash.substring(0, 8)}...
                                {transactionHash.substring(
                                    transactionHash.length - 8
                                )}
                            </a>
                            {/* Add CopyIcon later */}
                        </SummaryValue>
                    </SummaryItem>
                </TokenDisplayCard>

                <CalloutBox variant="informational">
                    <h5 /* Using h5 from CalloutBox styling */>
                        Managing Your Liquidity Position
                    </h5>
                    <p>
                        Your liquidity position is now active. You can manage it
                        (add more liquidity, remove liquidity, or participate in
                        yield farming if available for this pair) directly on
                        the xExchange platform. Remember to keep your LP tokens
                        safe, as they are required to withdraw your underlying
                        assets.
                    </p>
                </CalloutBox>

                {/* CTAs are handled by the main NavigationFooter, which will show "Finish" */}
            </>
        );
    };

    const renderCurrentStep = () => {
        switch (currentStep) {
            case 0:
                return renderStep1_Introduction();
            case 1:
                return renderStep2_SelectYourToken();
            case 2:
                return renderStep3_ChoosePairingToken();
            case 3:
                return renderStep4_DefineLiquidityAndPrice();
            case 4:
                return renderStep5_ReviewAndConfirmRisks();
            case 5:
                return renderStep6_TransactionExecution();
            case 6:
                return renderStep7_Confirmation();
            default:
                return (
                    <div>
                        Step {currentStep + 1} - Content not yet implemented.
                    </div>
                );
        }
    };

    const getNextButtonText = () => {
        if (currentStep === totalSteps - 1) return "Finish"; // Last step
        if (currentStep === 0) return "Continue"; // Introduction step
        if (currentStep === 3) return "Review Details"; // Step 4: Define Initial Liquidity & Price
        if (currentStep === 4) return "Proceed to Sign Transaction"; // Step 5: Review & Confirm Risks
        return "Next";
    };

    return (
        <WizardContainer>
            <CentralCard>
                {" "}
                {/* Added CentralCard wrapper */}
                <WizardHeader>
                    <WizardTitle>Add Initial Liquidity</WizardTitle>
                    <WizardSubtitle>
                        Guide to make your token tradable on xExchange.
                    </WizardSubtitle>
                </WizardHeader>
                <Stepper
                    steps={steps}
                    currentStep={currentStep}
                    onStepClick={(step) => {
                        if (
                            step < currentStep &&
                            !isDeploying &&
                            currentStep !==
                                5 /* Don't allow step click back from Transaction step if processing */
                        ) {
                            setCurrentStep(step);
                        }
                    }}
                />
                <StepContainer>{renderCurrentStep()}</StepContainer>
                <NavigationFooter>
                    <Button
                        variant="text"
                        color="slate"
                        onClick={handleCancel}
                        // Consider hiding if currentStep is Transaction Processing (e.g. currentStep === 5 && isDeploying)
                    >
                        Cancel
                    </Button>
                    <FooterActionsRight>
                        {currentStep > 0 &&
                            currentStep !==
                                5 /* Hide Back on Step 1 and Transaction step */ &&
                            currentStep !== totalSteps - 1 && // Hide Back on last step (Confirmation)
                            !isDeploying && (
                                <Button
                                    onClick={handleBack}
                                    disabled={isDeploying}
                                    variant="outlined"
                                >
                                    Back
                                </Button>
                            )}
                        {!(
                            currentStep === 5 &&
                            (isDeploying || deploymentSuccessful) &&
                            !transactionError
                        ) && (
                            <Button
                                variant="primary"
                                onClick={
                                    currentStep === totalSteps - 1
                                        ? handleFinishWizard
                                        : handleNext
                                }
                                disabled={
                                    isDeploying ||
                                    (currentStep === 0 &&
                                        !introductionAcknowledged) ||
                                    (currentStep === 1 &&
                                        (!selectedTokenA ||
                                            parseFloat(
                                                selectedTokenA.balance
                                            ) <= 0)) || // Step 2 validation
                                    (currentStep === 2 &&
                                        (!selectedTokenB ||
                                            parseFloat(
                                                selectedTokenB.balance
                                            ) <= 0)) || // Step 3 validation
                                    (currentStep === 3 &&
                                        (() => {
                                            const amountA =
                                                parseFloat(
                                                    lpData.tokenA_amount
                                                ) || 0;
                                            const amountB =
                                                parseFloat(
                                                    lpData.tokenB_amount
                                                ) || 0;
                                            const balanceA = selectedTokenA
                                                ? parseFloat(
                                                      selectedTokenA.balance
                                                  )
                                                : 0;
                                            const balanceB = selectedTokenB
                                                ? parseFloat(
                                                      selectedTokenB.balance
                                                  )
                                                : 0;
                                            const isAmountAValid =
                                                amountA > 0 &&
                                                amountA <= balanceA;
                                            const isAmountBValid =
                                                amountB > 0 &&
                                                amountB <= balanceB;
                                            return (
                                                !isAmountAValid ||
                                                !isAmountBValid
                                            );
                                        })()) || // Step 4 validation
                                    (currentStep === 4 &&
                                        !reviewRisksAcknowledged) // Step 5 validation
                                }
                            >
                                {getNextButtonText()}
                            </Button>
                        )}
                    </FooterActionsRight>
                </NavigationFooter>
            </CentralCard>
        </WizardContainer>
    );
};
