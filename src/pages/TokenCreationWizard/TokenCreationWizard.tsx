import React, { useState } from "react";
import styled from "styled-components";
import { Stepper } from "../../components/Stepper";
import { InfoIconWithTooltip } from "../../components/InfoIconWithTooltip";
import { CollapsibleSection } from "../../components/CollapsibleSection";
import { ToggleSwitch } from "../../components/ToggleSwitch";
import { RadioButtonGroup } from "../../components/RadioButtonGroup";

interface TokenData {
    // Step 1: Basic Info
    name: string;
    ticker: string;
    initialSupply: string;
    decimals: string;

    // Step 2: Properties
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
    { title: "Basic Info", description: "Token name and supply" },
    { title: "Properties", description: "Token features and settings" },
    { title: "Review", description: "Confirm your choices" },
    { title: "Deploy", description: "Create your token" },
];

const supplyTypeOptions = [
    {
        value: "fixed",
        label: "Fixed Supply",
        description:
            "The total supply will remain constant. No new tokens can be minted.",
    },
    {
        value: "variable",
        label: "Variable Supply",
        description: "You can mint additional tokens after creation if needed.",
    },
];

export const TokenCreationWizard: React.FC = () => {
    const [currentStep, setCurrentStep] = useState(0);
    const [tokenData, setTokenData] = useState<TokenData>({
        name: "",
        ticker: "",
        initialSupply: "",
        decimals: "18",
        supplyType: "fixed",
        burnable: false,
        ownershipTransfer: false,
        pausable: false,
        freezable: false,
        wipeable: false,
        upgradable: false,
        nftCreate: false,
    });
    const [confirmed, setConfirmed] = useState(false);
    const [isDeploying, setIsDeploying] = useState(false);
    const [deploymentSuccessful, setDeploymentSuccessful] = useState(false);

    const handleInputChange = (
        field: keyof TokenData,
        value: string | boolean
    ) => {
        setTokenData((prev) => ({ ...prev, [field]: value }));
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

    const handleDeploy = () => {
        setIsDeploying(true);
        setDeploymentSuccessful(false);
        // Simulate deployment
        setTimeout(() => {
            setIsDeploying(false);
            setDeploymentSuccessful(true);
            // alert("Token deployment simulated successfully!");
        }, 2000);
    };

    const renderStep1 = () => (
        <>
            <FormGroup>
                <Label>
                    Token Name
                    <InfoIconWithTooltip tooltipText="The full name of your token (e.g., 'My Awesome Token')" />
                </Label>
                <Input
                    type="text"
                    value={tokenData.name}
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                        handleInputChange("name", e.target.value)
                    }
                    placeholder="Enter token name"
                />
            </FormGroup>

            <FormGroup>
                <Label>
                    Token Ticker
                    <InfoIconWithTooltip tooltipText="A short identifier for your token (3-10 characters)" />
                </Label>
                <Input
                    type="text"
                    value={tokenData.ticker}
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                        handleInputChange(
                            "ticker",
                            e.target.value.toUpperCase()
                        )
                    }
                    placeholder="Enter token ticker"
                    maxLength={10}
                />
            </FormGroup>

            <FormGroup>
                <Label>
                    Initial Supply
                    <InfoIconWithTooltip tooltipText="The initial amount of tokens to create" />
                </Label>
                <Input
                    type="number"
                    value={tokenData.initialSupply}
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                        handleInputChange("initialSupply", e.target.value)
                    }
                    placeholder="Enter initial supply"
                    min="0"
                />
            </FormGroup>

            <FormGroup>
                <Label>
                    Decimals
                    <InfoIconWithTooltip tooltipText="Number of decimal places (default: 18)" />
                </Label>
                <Input
                    type="number"
                    value={tokenData.decimals}
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                        handleInputChange("decimals", e.target.value)
                    }
                    placeholder="Enter number of decimals"
                    min="0"
                    max="18"
                />
            </FormGroup>
        </>
    );

    const renderStep2 = () => (
        <>
            <FormGroup>
                <Label>Supply Type</Label>
                <RadioButtonGroup
                    options={supplyTypeOptions}
                    value={tokenData.supplyType}
                    onChange={(value) => handleInputChange("supplyType", value)}
                    name="supplyType"
                />
            </FormGroup>

            <FormGroup>
                <ToggleSwitch
                    label="Burnable"
                    checked={tokenData.burnable}
                    onChange={(value) => handleInputChange("burnable", value)}
                />
                <InfoIconWithTooltip tooltipText="Allow tokens to be burned (destroyed)" />
            </FormGroup>

            <FormGroup>
                <ToggleSwitch
                    label="Ownership Transfer"
                    checked={tokenData.ownershipTransfer}
                    onChange={(value) =>
                        handleInputChange("ownershipTransfer", value)
                    }
                />
                <InfoIconWithTooltip tooltipText="Allow token ownership to be transferred to another address" />
            </FormGroup>

            <CollapsibleSection title="Advanced Settings">
                <FormGroup>
                    <ToggleSwitch
                        label="Pausable"
                        checked={tokenData.pausable}
                        onChange={(value) =>
                            handleInputChange("pausable", value)
                        }
                    />
                    <InfoIconWithTooltip tooltipText="Allow token transfers to be paused in case of emergency" />
                </FormGroup>

                <FormGroup>
                    <ToggleSwitch
                        label="Freezable"
                        checked={tokenData.freezable}
                        onChange={(value) =>
                            handleInputChange("freezable", value)
                        }
                    />
                    <InfoIconWithTooltip tooltipText="Allow specific addresses to be frozen (prevented from transferring tokens)" />
                </FormGroup>

                <FormGroup>
                    <ToggleSwitch
                        label="Wipeable"
                        checked={tokenData.wipeable}
                        onChange={(value) =>
                            handleInputChange("wipeable", value)
                        }
                        disabled={!tokenData.freezable}
                    />
                    <InfoIconWithTooltip tooltipText="Allow frozen addresses to have their tokens wiped (requires Freezable)" />
                </FormGroup>

                <FormGroup>
                    <ToggleSwitch
                        label="Upgradable"
                        checked={tokenData.upgradable}
                        onChange={(value) =>
                            handleInputChange("upgradable", value)
                        }
                    />
                    <InfoIconWithTooltip tooltipText="Allow token contract to be upgraded in the future" />
                </FormGroup>

                <FormGroup>
                    <ToggleSwitch
                        label="NFT Creation Role"
                        checked={tokenData.nftCreate}
                        onChange={(value) =>
                            handleInputChange("nftCreate", value)
                        }
                    />
                    <InfoIconWithTooltip tooltipText="Allow token to create NFTs (requires special role)" />
                </FormGroup>
            </CollapsibleSection>
        </>
    );

    const renderStep3 = () => (
        <>
            <SummaryItem>
                <SummaryLabel>Token Name</SummaryLabel>
                <SummaryValue>{tokenData.name}</SummaryValue>
            </SummaryItem>

            <SummaryItem>
                <SummaryLabel>Token Ticker</SummaryLabel>
                <SummaryValue>{tokenData.ticker}</SummaryValue>
            </SummaryItem>

            <SummaryItem>
                <SummaryLabel>Initial Supply</SummaryLabel>
                <SummaryValue>{tokenData.initialSupply}</SummaryValue>
            </SummaryItem>

            <SummaryItem>
                <SummaryLabel>Decimals</SummaryLabel>
                <SummaryValue>{tokenData.decimals}</SummaryValue>
            </SummaryItem>

            <SummaryItem>
                <SummaryLabel>Supply Type</SummaryLabel>
                <SummaryValue>
                    {tokenData.supplyType === "fixed" ? "Fixed" : "Variable"}
                </SummaryValue>
            </SummaryItem>

            <SummaryItem>
                <SummaryLabel>Properties</SummaryLabel>
                <SummaryValue>
                    {[
                        tokenData.burnable && "Burnable",
                        tokenData.ownershipTransfer && "Ownership Transfer",
                        tokenData.pausable && "Pausable",
                        tokenData.freezable && "Freezable",
                        tokenData.wipeable && "Wipeable",
                        tokenData.upgradable && "Upgradable",
                        tokenData.nftCreate && "NFT Creation",
                    ]
                        .filter(Boolean)
                        .join(", ") || "None"}
                </SummaryValue>
            </SummaryItem>

            <SummaryItem>
                <SummaryLabel>Estimated Fee</SummaryLabel>
                <SummaryValue>~0.05 EGLD</SummaryValue>
            </SummaryItem>

            <WarningBox>
                ⚠️ Please review all settings carefully. Some properties cannot
                be changed after deployment unless 'Upgradable' is enabled.
            </WarningBox>

            <CheckboxLabel>
                <NativeCheckbox
                    checked={confirmed}
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                        setConfirmed(e.target.checked)
                    }
                />
                <CustomCheckbox checked={confirmed} />I understand that
                deploying a token to the blockchain is a permanent action and I
                have reviewed all settings.
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
                        {" "}
                        {/* h3 per theme */}
                        Transaction Submitted (Simulated)
                    </h4>
                    <p
                        style={{
                            fontSize: "16px",
                            color: "#1F2937",
                            lineHeight: "1.6",
                            marginBottom: "0.5rem",
                        }}
                    >
                        Your token has been successfully created on the test
                        network (simulation).
                    </p>
                    <p
                        style={{
                            fontSize: "16px",
                            color: "#1F2937",
                            lineHeight: "1.6",
                            marginBottom: "1rem",
                        }}
                    >
                        Transaction ID (Simulated):{" "}
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
                                /* Logic to navigate to My Tokens or similar */ alert(
                                    "Navigate to My Tokens (Placeholder)"
                                );
                            }}
                            variant="secondary"
                        >
                            View My Tokens
                        </Button>
                        <Button
                            onClick={() => {
                                setCurrentStep(0);
                                setConfirmed(false);
                                setDeploymentSuccessful(
                                    false
                                ); /* Reset relevant state for new token */
                            }}
                            variant="primary"
                        >
                            Create Another Token
                        </Button>
                    </ButtonGroup>
                </div>
            );
        }

        return (
            <>
                {isDeploying ? (
                    <div>Deploying your token... Please wait.</div>
                ) : (
                    <Button
                        variant="primary"
                        onClick={handleDeploy}
                        disabled={!confirmed || isDeploying}
                    >
                        {isDeploying ? "Deploying..." : "Deploy Token"}
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
                    if (step < currentStep) {
                        setCurrentStep(step);
                    }
                }}
            />

            <StepContainer>
                {renderCurrentStep()}

                <ButtonGroup>
                    {currentStep > 0 && (
                        <Button onClick={handleBack}>Back</Button>
                    )}

                    {currentStep < steps.length - 1 && (
                        <Button
                            variant="primary"
                            onClick={handleNext}
                            disabled={
                                !tokenData.name ||
                                !tokenData.ticker ||
                                !tokenData.initialSupply
                            }
                        >
                            Next
                        </Button>
                    )}
                </ButtonGroup>
            </StepContainer>
        </WizardContainer>
    );
};
