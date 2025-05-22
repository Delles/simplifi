import React, { useState } from "react";
import styled from "styled-components";
import { Stepper } from "../components/Stepper";
import { InfoIconWithTooltip } from "../components/InfoIconWithTooltip";
import { CollapsibleSection } from "../components/CollapsibleSection";
import { ToggleSwitch } from "../components/ToggleSwitch";
import { RadioButtonGroup } from "../components/RadioButtonGroup";

interface LPData {
    tokenA_address: string;
    tokenA_amount: string;
    tokenB_address: string;
    tokenB_amount: string;
    feeTier: string; // e.g., '0.05%', '0.3%', '1%'
    // For now, we'll omit price range for simplicity
}

interface StyledProps {
    variant?: "primary" | "secondary";
}

const WizardContainer = styled.div`
    max-width: 800px;
    margin: 0 auto;
    padding: 2rem;
    background-color: #f7f9fc; /* Cloud White - Theme: App Canvas/Page Background */
    font-family: "Inter", sans-serif; /* Theme: Font Family */
`;

const StepContainer = styled.div`
    background: #ffffff; /* Pure White - Theme: Content Surface Background */
    border-radius: 12px; /* Theme: 8px-12px for Cards/Modals */
    padding: 2rem;
    box-shadow: 0px 4px 8px rgba(25, 39, 55, 0.07),
        0px 2px 4px rgba(25, 39, 55, 0.05); /* Theme: Level 2 Shadow */
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

const ButtonGroup = styled.div`
    display: flex;
    justify-content: space-between;
    margin-top: 2rem;
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
            : `
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

const WarningBox = styled.div`
    background: #fffbeb; /* Amber-50, lighter for better text contrast if needed */
    border: 1px solid #f59e0b; /* Amber - Theme: Warning Border */
    border-left: 4px solid #f59e0b; /* Accent border for emphasis */
    border-radius: 8px; /* Theme: 6px-8px for UI Elements */
    padding: 1rem;
    margin: 1rem 0;
    color: #b45309; /* Darker Amber for text, ensuring good contrast */
    font-family: "Inter", sans-serif; /* Theme: Font Family */
    font-size: 14px; /* Theme: p (Secondary/Small) */

    /* If using Graphite text as per original: */
    /* color: #1f2937; */ /* Graphite - Theme: Warning Text */
    /* background: #FDE68A; */ /* A light amber if Graphite text is used */
`;

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

const steps = [
    { title: "Select Tokens", description: "Choose the pair for your pool" },
    { title: "Set Amounts & Fee", description: "Define initial liquidity and fee tier" },
    { title: "Review", description: "Confirm your LP details" },
    { title: "Create Pool", description: "Deploy your liquidity pool" },
];

const feeTierOptions = [
    { value: "0.05%", label: "0.05%", description: "Best for very stable pairs (e.g., USDC/USDT)." },
    { value: "0.3%", label: "0.3%", description: "Best for most common pairs (e.g., EGLD/USDC)." },
    { value: "1.0%", label: "1.0%", description: "Best for exotic or newly listed pairs." },
];

export const LPCreationWizard: React.FC = () => {
    const [currentStep, setCurrentStep] = useState(0);
    const [lpData, setLpData] = useState<LPData>({
        tokenA_address: "",
        tokenA_amount: "",
        tokenB_address: "",
        tokenB_amount: "",
        feeTier: "0.3%", // Default fee tier
    });
    const [confirmed, setConfirmed] = useState(false);
    const [isDeploying, setIsDeploying] = useState(false);
    const [deploymentSuccessful, setDeploymentSuccessful] = useState(false);

    const handleInputChange = (
        field: keyof LPData, 
        value: string | boolean
    ) => {
        setLpData((prev) => ({ ...prev, [field]: value as string }));
    };

    const handleNext = () => {
        if (currentStep < steps.length - 1) {
            setCurrentStep((prev) => prev + 1);
        }
    };

    const handleBack = () => {
        if (currentStep > 0) {
            setCurrentStep((prev) => prev - 1);
        }
    };

    const handleCreatePool = () => { // Renamed from handleDeploy
        setIsDeploying(true);
        setDeploymentSuccessful(false);
        // Simulate deployment
        setTimeout(() => {
            setIsDeploying(false);
            setDeploymentSuccessful(true);
            // alert("LP Pool deployment simulated successfully!"); // Keep for debugging if needed
        }, 2000);
    };

    const renderStep1 = () => (
        <>
            <FormGroup>
                <Label>
                    Token A Address
                    <InfoIconWithTooltip tooltipText="Address of the first token in the pair (e.g., an ESDT, SFT, or MetaESDT identifier)." />
                </Label>
                <Input
                    type="text"
                    value={lpData.tokenA_address}
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                        handleInputChange("tokenA_address", e.target.value)
                    }
                    placeholder="Enter Token A address (e.g., MYTOKEN-abcdef)"
                />
            </FormGroup>

            <FormGroup>
                <Label>
                    Token B Address
                    <InfoIconWithTooltip tooltipText="Address of the second token in the pair (e.g., an ESDT, SFT, or MetaESDT identifier)." />
                </Label>
                <Input
                    type="text"
                    value={lpData.tokenB_address}
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                        handleInputChange("tokenB_address", e.target.value)
                    }
                    placeholder="Enter Token B address (e.g., YOURTOKEN-123456)"
                />
            </FormGroup>
        </>
    );

    const renderStep2 = () => (
        <>
            <FormGroup>
                <Label>
                    Token A Amount
                    <InfoIconWithTooltip tooltipText="Amount of Token A to deposit into the liquidity pool. This is the initial amount you will provide." />
                </Label>
                <Input
                    type="number"
                    min="0"
                    value={lpData.tokenA_amount}
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                        handleInputChange("tokenA_amount", e.target.value)
                    }
                    placeholder="Enter Token A amount (e.g., 100.0)"
                />
            </FormGroup>

            <FormGroup>
                <Label>
                    Token B Amount
                    <InfoIconWithTooltip tooltipText="Amount of Token B to deposit into the liquidity pool. This is the initial amount you will provide." />
                </Label>
                <Input
                    type="number"
                    min="0"
                    value={lpData.tokenB_amount}
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                        handleInputChange("tokenB_amount", e.target.value)
                    }
                    placeholder="Enter Token B amount (e.g., 5000.0)"
                />
            </FormGroup>
            
            <FormGroup>
                <Label>Fee Tier
                <InfoIconWithTooltip tooltipText="The fee tier determines the percentage fee charged on swaps within this liquidity pool. Choose one that best suits the volatility of the token pair."/>
                </Label>
                <RadioButtonGroup
                    options={feeTierOptions}
                    value={lpData.feeTier}
                    onChange={(value) => handleInputChange("feeTier", value)}
                    name="feeTier"
                />
            </FormGroup>
        </>
    );

    const renderStep3 = () => (
        <>
            <SummaryItem>
                <SummaryLabel>Token A Address</SummaryLabel>
                <SummaryValue>{lpData.tokenA_address || "-"}</SummaryValue>
            </SummaryItem>
            <SummaryItem>
                <SummaryLabel>Token A Amount</SummaryLabel>
                <SummaryValue>{lpData.tokenA_amount || "-"}</SummaryValue>
            </SummaryItem>
            <SummaryItem>
                <SummaryLabel>Token B Address</SummaryLabel>
                <SummaryValue>{lpData.tokenB_address || "-"}</SummaryValue>
            </SummaryItem>
            <SummaryItem>
                <SummaryLabel>Token B Amount</SummaryLabel>
                <SummaryValue>{lpData.tokenB_amount || "-"}</SummaryValue>
            </SummaryItem>
            <SummaryItem>
                <SummaryLabel>Fee Tier</SummaryLabel>
                <SummaryValue>{lpData.feeTier}</SummaryValue>
            </SummaryItem>
            <SummaryItem>
                <SummaryLabel>Estimated Network Fee</SummaryLabel>
                <SummaryValue>~0.02 EGLD</SummaryValue> 
            </SummaryItem>

            <WarningBox>
                ⚠️ Please review all details carefully. Creating a liquidity pool is a permanent action on the blockchain.
            </WarningBox>

            <CheckboxLabel>
                <NativeCheckbox
                    checked={confirmed}
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                        setConfirmed(e.target.checked)
                    }
                    id="lpConfirmationCheckbox"
                />
                <CustomCheckbox checked={confirmed} />
                I understand that creating this liquidity pool is a permanent action and I have reviewed all details.
            </CheckboxLabel>
        </>
    );

    const renderStep4 = () => {
        if (deploymentSuccessful) {
            return (
                <div style={{ fontFamily: "'Inter', sans-serif" }}>
                    <h4
                        style={{
                            fontSize: "20px",
                            fontWeight: 600,
                            color: "#1F2937",
                            marginBottom: "0.5rem",
                        }}
                    >
                        Liquidity Pool Created (Simulated) {/* Updated Headline */}
                    </h4>
                    <p
                        style={{
                            fontSize: "16px",
                            color: "#1F2937",
                            lineHeight: "1.6",
                            marginBottom: "0.5rem",
                        }}
                    >
                        Your liquidity pool has been successfully created on the test
                        network (simulation). {/* Updated Message */}
                    </p>
                    <p
                        style={{
                            fontSize: "16px",
                            color: "#1F2937",
                            lineHeight: "1.6",
                            marginBottom: "1rem",
                        }}
                    >
                        Pool Creation TX ID (Simulated):{" "} {/* Updated TX Label */}
                        <a
                            href="#"
                            onClick={(e) => e.preventDefault()}
                            style={{
                                color: "#3B82F6",
                                textDecoration: "underline",
                            }}
                        >
                            0x123abc456def789ghi (View on Explorer - Simulated)
                        </a>
                    </p>
                    <p
                        style={{
                            fontSize: "16px",
                            fontWeight: 500,
                            color: "#1F2937",
                            marginBottom: "1rem",
                        }}
                    >
                        What's next?
                    </p>
                    <ButtonGroup>
                        <Button
                            onClick={() => {
                                alert(
                                    "Navigate to My Pools (Placeholder)" 
                                );
                            }}
                            variant="secondary"
                        >
                            View My Pools {/* Updated Button Text */}
                        </Button>
                        <Button
                            onClick={() => {
                                setCurrentStep(0);
                                setConfirmed(false);
                                setLpData({ 
                                    tokenA_address: "",
                                    tokenA_amount: "",
                                    tokenB_address: "",
                                    tokenB_amount: "",
                                    feeTier: "0.3%", 
                                }); 
                                setDeploymentSuccessful(false); 
                            }}
                            variant="primary"
                        >
                            Create Another Pool {/* Updated Button Text */}
                        </Button>
                    </ButtonGroup>
                </div>
            );
        }

        return (
            <>
                {isDeploying ? (
                    <div>Deploying your Liquidity Pool... Please wait.</div>
                ) : (
                    <Button
                        variant="primary"
                        onClick={handleCreatePool} // Renamed function call
                        disabled={isDeploying} // Only disable if deploying
                    >
                        {isDeploying ? "Deploying..." : "Create Liquidity Pool"} {/* Updated Button Text */}
                    </Button>
                )}
            </>
        );
    };

    const renderCurrentStep = () => {
        switch (currentStep) {
            case 0:
                return renderStep1();
            case 1:
                return renderStep2();
            case 2:
                return renderStep3();
            case 3:
                return renderStep4();
            default:
                return null;
        }
    };

    return (
        <WizardContainer>
            <Stepper
                steps={steps}
                currentStep={currentStep}
                onStepClick={(step) => {
                    if (step < currentStep && !isDeploying) { // Prevent step click during deployment
                        setCurrentStep(step);
                    }
                }}
            />

            <StepContainer>
                {renderCurrentStep()}

                <ButtonGroup>
                    {currentStep > 0 && currentStep < steps.length -1 && !isDeploying && ( // Hide Back on Deploy/Success step & during deployment
                        <Button onClick={handleBack} disabled={isDeploying}>Back</Button>
                    )}

                    {currentStep < steps.length - 2 && ( 
                        <Button
                            variant="primary"
                            onClick={handleNext}
                            disabled={
                                isDeploying || // Disable during deployment
                                (currentStep === 0 && (!lpData.tokenA_address || !lpData.tokenB_address)) ||
                                (currentStep === 1 && (!lpData.tokenA_amount || !lpData.tokenB_amount || !lpData.feeTier))
                            }
                        >
                            Next
                        </Button>
                    )}
                     {currentStep === steps.length - 2 && ( // Show 'Review & Create Pool' button on Review Step (currentStep === 2)
                        <Button
                            variant="primary"
                            onClick={handleNext} 
                             disabled={isDeploying || !lpData.tokenA_address || !lpData.tokenB_address || !lpData.tokenA_amount || !lpData.tokenB_amount || !confirmed}
                        >
                            Review & Create Pool
                        </Button>
                    )}
                </ButtonGroup>
            </StepContainer>
        </WizardContainer>
    );
};
