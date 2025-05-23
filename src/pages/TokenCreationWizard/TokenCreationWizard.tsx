import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
    WizardStepper,
    BasicInformation,
    TokenProperties,
    ReviewConfirm,
    Deploy,
    ResultsStep,
    type TokenData,
} from "./components";

// Cost estimation (PDR requirement: transparent cost breakdown)
const EGLD_ISSUANCE_COST = 0.05;

export const TokenCreationWizard: React.FC = () => {
    const navigate = useNavigate();
    const [currentStep, setCurrentStep] = useState(1);
    const [isLoading, setIsLoading] = useState(false);
    const [estimatedCost, setEstimatedCost] = useState(EGLD_ISSUANCE_COST);

    // Results step state
    const [deploymentResult, setDeploymentResult] = useState<{
        isSuccess: boolean;
        transactionHash?: string;
        errorMessage?: string;
    } | null>(null);

    const [tokenData, setTokenData] = useState<TokenData>({
        name: "",
        ticker: "",
        initialSupply: "",
        decimals: "18",
        supplyType: "fixed",
        burnable: true,
        ownershipTransfer: true,
        pausable: false,
        freezable: false,
        wipeable: false,
        upgradable: false,
        nftCreate: false,
    });

    // Updated steps to include Results step
    const steps = [
        {
            title: "Basic Info",
            description: "Name & Supply",
            educationalNote: "Define your token's identity",
        },
        {
            title: "Properties",
            description: "Token Rules",
            educationalNote: "Configure token behavior",
        },
        {
            title: "Review",
            description: "Confirm Details",
            educationalNote: "Verify before deployment",
        },
        {
            title: "Deploy",
            description: "Create Token",
            educationalNote: "Launch on MultiversX",
        },
        {
            title: "Results",
            description: "Success!",
            educationalNote: "Your token is ready",
        },
    ];

    // Real-time cost estimation (PDR requirement)
    useEffect(() => {
        const cost = EGLD_ISSUANCE_COST;
        // Additional costs could be calculated here based on token properties
        setEstimatedCost(cost);
    }, [tokenData]);

    const handleInputChange = (
        field: keyof TokenData,
        value: string | boolean
    ) => {
        setTokenData((prev) => ({ ...prev, [field]: value }));
    };

    const handleNext = async () => {
        if (currentStep < 4) {
            setIsLoading(true);
            // Simulate validation/processing time for better UX
            await new Promise((resolve) => setTimeout(resolve, 300));
            setCurrentStep((prev) => prev + 1);
            setIsLoading(false);
        }
    };

    const handleBack = () => {
        if (currentStep > 1) {
            setCurrentStep((prev) => prev - 1);
        }
    };

    const handleDeploy = async () => {
        setIsLoading(true);
        try {
            // TODO: Implement actual deployment logic with MultiversX SDK
            console.log("Deploying token with data:", tokenData);
            console.log("Estimated cost:", estimatedCost, "EGLD");

            // Simulate deployment time
            await new Promise((resolve) => setTimeout(resolve, 2000));

            // Random success/failure for testing (as requested)
            const isSuccess = Math.random() > 0.3; // 70% success rate for testing

            if (isSuccess) {
                // Generate a mock transaction hash for success
                const mockTxHash = `0x${Math.random()
                    .toString(16)
                    .substring(2, 66)}`;
                setDeploymentResult({
                    isSuccess: true,
                    transactionHash: mockTxHash,
                });
            } else {
                // Generate random error message for failure
                const errorMessages = [
                    "Insufficient EGLD balance. Please ensure you have at least 0.05 EGLD.",
                    "Network congestion detected. Please try again in a few minutes.",
                    "Transaction timeout. The MultiversX network is experiencing high traffic.",
                    "Invalid ticker symbol. This ticker may already be in use.",
                ];
                setDeploymentResult({
                    isSuccess: false,
                    errorMessage:
                        errorMessages[
                            Math.floor(Math.random() * errorMessages.length)
                        ],
                });
            }

            // Move to results step
            setCurrentStep(5);
        } catch (error) {
            console.error("Deployment failed:", error);
            setDeploymentResult({
                isSuccess: false,
                errorMessage: "An unexpected error occurred. Please try again.",
            });
            setCurrentStep(5);
        } finally {
            setIsLoading(false);
        }
    };

    const handleRetryDeployment = () => {
        setDeploymentResult(null);
        setCurrentStep(4); // Go back to deploy step
    };

    const renderCurrentStep = () => {
        switch (currentStep) {
            case 1:
                return (
                    <BasicInformation
                        tokenData={tokenData}
                        onInputChange={handleInputChange}
                        estimatedCost={estimatedCost}
                    />
                );
            case 2:
                return (
                    <TokenProperties
                        tokenData={tokenData}
                        onInputChange={handleInputChange}
                        estimatedCost={estimatedCost}
                    />
                );
            case 3:
                return (
                    <ReviewConfirm
                        tokenData={tokenData}
                        estimatedCost={estimatedCost}
                    />
                );
            case 4:
                return (
                    <Deploy
                        onDeploy={handleDeploy}
                        isLoading={isLoading}
                        tokenData={tokenData}
                        estimatedCost={estimatedCost}
                    />
                );
            case 5:
                return deploymentResult ? (
                    <ResultsStep
                        tokenData={tokenData}
                        isSuccess={deploymentResult.isSuccess}
                        transactionHash={deploymentResult.transactionHash}
                        errorMessage={deploymentResult.errorMessage}
                        onRetry={handleRetryDeployment}
                    />
                ) : null;
            default:
                return (
                    <BasicInformation
                        tokenData={tokenData}
                        onInputChange={handleInputChange}
                        estimatedCost={estimatedCost}
                    />
                );
        }
    };

    // Enhanced validation with educational feedback
    const getStepValidation = () => {
        switch (currentStep) {
            case 1: {
                const basicMissing = [];
                if (!tokenData.name) basicMissing.push("Token Name");
                if (!tokenData.ticker) basicMissing.push("Token Ticker");
                if (!tokenData.initialSupply)
                    basicMissing.push("Initial Supply");

                return {
                    isValid: basicMissing.length === 0,
                    missing: basicMissing,
                    message:
                        basicMissing.length > 0
                            ? `Please complete: ${basicMissing.join(", ")}`
                            : "Ready to configure token properties",
                };
            }
            case 2:
                return {
                    isValid: true,
                    missing: [],
                    message: "Token properties configured successfully",
                };
            case 3:
                return {
                    isValid: true,
                    missing: [],
                    message: "Ready to deploy your token",
                };
            case 4:
            case 5:
                return {
                    isValid: true,
                    missing: [],
                    message: "Deployment in progress",
                };
            default:
                return {
                    isValid: false,
                    missing: [],
                    message: "",
                };
        }
    };

    const stepValidation = getStepValidation();

    return (
        <div className="min-h-screen bg-app-canvas">
            {/* Enhanced Header with better visual hierarchy */}
            <div className="bg-white/95 backdrop-blur-lg border-b border-ash/50 sticky top-0 z-40">
                <div className="max-w-5xl mx-auto px-6 py-6">
                    <div className="flex items-center justify-between">
                        <div className="flex items-center gap-4">
                            <button
                                onClick={() => navigate("/app")}
                                className="group p-3 hover:bg-gray-100 rounded-xl transition-all duration-200 
                                    hover:scale-105 active:scale-95"
                                disabled={isLoading}
                            >
                                <svg
                                    className="w-5 h-5 text-slate group-hover:text-graphite transition-colors"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    stroke="currentColor"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth={2}
                                        d="M15 19l-7-7 7-7"
                                    />
                                </svg>
                            </button>
                            <div>
                                <h1 className="text-2xl font-bold text-graphite">
                                    Token Creation Wizard
                                </h1>
                                <p className="text-sm text-slate">
                                    {steps[currentStep - 1].educationalNote} •
                                    Step {currentStep} of {steps.length}
                                </p>
                            </div>
                        </div>

                        {/* Real-time cost indicator (PDR requirement) - Hide on results step */}
                        {currentStep < 5 && (
                            <div className="hidden md:flex items-center gap-3 px-4 py-2 bg-create-50 rounded-xl border border-create-200">
                                <div className="w-2 h-2 bg-create-500 rounded-full animate-pulse"></div>
                                <span className="text-sm font-medium text-create-700">
                                    Estimated Cost: {estimatedCost} EGLD
                                </span>
                            </div>
                        )}
                    </div>
                </div>
            </div>

            <div className="max-w-5xl mx-auto px-6 py-8">
                {/* Enhanced stepper with better animations */}
                <div className="mb-8">
                    <WizardStepper
                        currentStep={currentStep}
                        totalSteps={5}
                        steps={steps}
                        validation={stepValidation}
                    />
                </div>

                {/* Main Content with enhanced glass-morphism */}
                <div className="relative">
                    {/* Background gradient for enhanced visual appeal */}
                    <div className="absolute inset-0 bg-gradient-to-br from-create-50/30 via-blue-50/20 to-indigo-50/30 rounded-3xl blur-sm"></div>

                    <div
                        className="relative bg-white/90 backdrop-blur-sm rounded-3xl border border-white/60 
                        shadow-level-3 hover:shadow-level-4 transition-all duration-500 p-8 mb-8"
                    >
                        <div className="animate-fade-in-scale-up">
                            {renderCurrentStep()}
                        </div>
                    </div>
                </div>

                {/* Enhanced Navigation with better feedback - Hide on deploy and results steps */}
                {currentStep < 4 && (
                    <div className="flex justify-between items-center">
                        <button
                            onClick={handleBack}
                            disabled={currentStep === 1 || isLoading}
                            className="group px-6 py-3 border border-gray-300 text-gray-700 rounded-xl font-medium
                                hover:bg-gray-50 hover:border-gray-400 disabled:opacity-50 disabled:cursor-not-allowed 
                                transition-all duration-200 flex items-center gap-2
                                disabled:hover:bg-transparent disabled:hover:border-gray-300"
                        >
                            <svg
                                className="w-4 h-4 group-hover:-translate-x-1 transition-transform"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={2}
                                    d="M15 19l-7-7 7-7"
                                />
                            </svg>
                            Back
                        </button>

                        {/* Validation feedback */}
                        <div className="hidden md:flex items-center gap-3 text-sm">
                            {stepValidation.isValid ? (
                                <div className="flex items-center gap-2 text-manage-600">
                                    <svg
                                        className="w-4 h-4"
                                        fill="currentColor"
                                        viewBox="0 0 20 20"
                                    >
                                        <path
                                            fillRule="evenodd"
                                            d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                                            clipRule="evenodd"
                                        />
                                    </svg>
                                    {stepValidation.message}
                                </div>
                            ) : (
                                <div className="flex items-center gap-2 text-distribute-600">
                                    <svg
                                        className="w-4 h-4"
                                        fill="currentColor"
                                        viewBox="0 0 20 20"
                                    >
                                        <path
                                            fillRule="evenodd"
                                            d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z"
                                            clipRule="evenodd"
                                        />
                                    </svg>
                                    {stepValidation.message}
                                </div>
                            )}
                        </div>

                        <button
                            onClick={handleNext}
                            disabled={!stepValidation.isValid || isLoading}
                            className="group px-8 py-3 bg-gradient-to-r from-create-500 to-create-600 text-white rounded-xl font-medium
                                hover:from-create-600 hover:to-create-700 disabled:opacity-50 disabled:cursor-not-allowed 
                                shadow-interactive hover:shadow-interactive-hover transform hover:scale-105 active:scale-95
                                transition-all duration-200 flex items-center gap-2 min-w-[140px] justify-center
                                disabled:hover:scale-100 disabled:hover:shadow-interactive"
                        >
                            {isLoading ? (
                                <>
                                    <svg
                                        className="animate-spin w-4 h-4"
                                        fill="none"
                                        viewBox="0 0 24 24"
                                    >
                                        <circle
                                            className="opacity-25"
                                            cx="12"
                                            cy="12"
                                            r="10"
                                            stroke="currentColor"
                                            strokeWidth="4"
                                        ></circle>
                                        <path
                                            className="opacity-75"
                                            fill="currentColor"
                                            d="m4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                                        ></path>
                                    </svg>
                                    Processing...
                                </>
                            ) : (
                                <>
                                    {currentStep === 3
                                        ? "Deploy Token"
                                        : "Continue"}
                                    <svg
                                        className="w-4 h-4 group-hover:translate-x-1 transition-transform"
                                        fill="none"
                                        viewBox="0 0 24 24"
                                        stroke="currentColor"
                                    >
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeWidth={2}
                                            d="M9 5l7 7-7 7"
                                        />
                                    </svg>
                                </>
                            )}
                        </button>
                    </div>
                )}
            </div>
        </div>
    );
};
