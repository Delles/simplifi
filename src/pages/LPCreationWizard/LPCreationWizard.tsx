import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
    WizardStepper,
    Introduction,
    SelectToken,
    ChoosePairingToken,
    DefineLiquidity,
    TransactionExecution,
    Confirmation,
    RiskReviewModal,
    type LPData,
} from "./components";

export const LPCreationWizard: React.FC = () => {
    const navigate = useNavigate();
    const [currentStep, setCurrentStep] = useState(1);
    const [isLoading, setIsLoading] = useState(false);
    const [isRiskModalOpen, setIsRiskModalOpen] = useState(false);

    // Results step state
    const [deploymentResult, setDeploymentResult] = useState<{
        isSuccess: boolean;
        transactionHash?: string;
        errorMessage?: string;
    } | null>(null);

    const [lpData, setLpData] = useState<LPData>({
        tokenA: null,
        tokenB: null,
        initialPrice: "",
        estimatedLPTokens: "",
        riskAcknowledged: false,
    });

    // LP Creation wizard steps (removed ReviewRisks step - now handled by modal)
    const steps = [
        {
            title: "Intro",
            description: "Learn About LPs",
            educationalNote: "Understand liquidity pools and risks",
        },
        {
            title: "Token A",
            description: "Choose Token A",
            educationalNote: "Pick your token for the pool",
        },
        {
            title: "Token B",
            description: "Choose Token B",
            educationalNote: "Select pairing token (EGLD/USDC)",
        },
        {
            title: "Amounts",
            description: "Set Amounts",
            educationalNote: "Input token amounts and price",
        },
        {
            title: "Execute",
            description: "Create Pool",
            educationalNote: "Sign transaction",
        },
        {
            title: "Done",
            description: "Pool Created!",
            educationalNote: "Your LP is ready",
        },
    ];

    const handleInputChange = (
        field: keyof LPData,
        value: string | boolean | unknown
    ) => {
        setLpData((prev) => ({ ...prev, [field]: value }));
    };

    const handleNext = async () => {
        if (currentStep < 5) {
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

    const handleExecute = async () => {
        setIsLoading(true);
        try {
            // TODO: Implement actual LP creation logic with MultiversX SDK
            console.log("Creating LP with data:", lpData);

            // Simulate transaction time
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
                    "Insufficient EGLD balance for transaction fees.",
                    "Network congestion detected. Please try again in a few minutes.",
                    "Transaction timeout. The MultiversX network is experiencing high traffic.",
                    "Pool already exists for this token pair.",
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
            setCurrentStep(6);
        } catch (error) {
            console.error("LP creation failed:", error);
            setDeploymentResult({
                isSuccess: false,
                errorMessage: "An unexpected error occurred. Please try again.",
            });
            setCurrentStep(6);
        } finally {
            setIsLoading(false);
        }
    };

    const handleFinish = () => {
        // Reset wizard state
        setLpData({
            tokenA: null,
            tokenB: null,
            initialPrice: "",
            estimatedLPTokens: "",
            riskAcknowledged: false,
        });
        setDeploymentResult(null);
        setCurrentStep(1);
    };

    const handleRiskModalConfirm = () => {
        setLpData((prev) => ({ ...prev, riskAcknowledged: true }));
        setIsRiskModalOpen(false);
    };

    const renderCurrentStep = () => {
        switch (currentStep) {
            case 1:
                return (
                    <Introduction
                        lpData={lpData}
                        onInputChange={handleInputChange}
                    />
                );
            case 2:
                return (
                    <SelectToken
                        lpData={lpData}
                        onInputChange={handleInputChange}
                    />
                );
            case 3:
                return (
                    <ChoosePairingToken
                        lpData={lpData}
                        onInputChange={handleInputChange}
                    />
                );
            case 4:
                return (
                    <DefineLiquidity
                        lpData={lpData}
                        onInputChange={handleInputChange}
                        onOpenRiskModal={() => setIsRiskModalOpen(true)}
                    />
                );
            case 5:
                return (
                    <TransactionExecution
                        lpData={lpData}
                        onExecute={handleExecute}
                        isLoading={isLoading}
                    />
                );
            case 6:
                return deploymentResult ? (
                    <Confirmation
                        lpData={lpData}
                        transactionHash={deploymentResult.transactionHash}
                        onFinish={handleFinish}
                    />
                ) : null;
            default:
                return null;
        }
    };

    const getStepValidation = () => {
        switch (currentStep) {
            case 1:
                return {
                    isValid: true,
                    missing: [],
                    message: "Ready to proceed with LP creation",
                };
            case 2:
                return {
                    isValid: !!lpData.tokenA,
                    missing: lpData.tokenA ? [] : ["Token A selection"],
                    message: lpData.tokenA
                        ? "Token selected successfully"
                        : "Please select a token to continue",
                };
            case 3:
                return {
                    isValid: !!lpData.tokenB,
                    missing: lpData.tokenB ? [] : ["Token B selection"],
                    message: lpData.tokenB
                        ? "Pairing token selected"
                        : "Please select a pairing token",
                };
            case 4:
                return {
                    isValid: !!(
                        lpData.tokenA?.amount &&
                        lpData.tokenB?.amount &&
                        lpData.riskAcknowledged
                    ),
                    missing: [
                        ...(lpData.tokenA?.amount ? [] : ["Token A amount"]),
                        ...(lpData.tokenB?.amount ? [] : ["Token B amount"]),
                        ...(lpData.riskAcknowledged
                            ? []
                            : ["Risk acknowledgment"]),
                    ],
                    message:
                        lpData.tokenA?.amount &&
                        lpData.tokenB?.amount &&
                        lpData.riskAcknowledged
                            ? "Ready to create pool"
                            : "Please complete all requirements",
                };
            default:
                return {
                    isValid: true,
                    missing: [],
                    message: "",
                };
        }
    };

    const getNextButtonText = () => {
        switch (currentStep) {
            case 1:
                return "Start LP Creation";
            case 4:
                return "Create Liquidity Pool";
            case 5:
                return isLoading ? "Creating Pool..." : "Execute Transaction";
            default:
                return "Continue";
        }
    };

    const canProceed = () => {
        const validation = getStepValidation();
        return validation.isValid && !isLoading;
    };

    return (
        <div className="min-h-screen bg-cloud-white">
            <div className="max-w-4xl mx-auto px-6 py-8">
                {/* Header */}
                <div className="text-center mb-8">
                    <h1 className="text-4xl font-bold text-theme-blue mb-4">
                        Create Liquidity Pool
                    </h1>
                    <p className="text-lg text-slate max-w-2xl mx-auto">
                        Add initial liquidity to make your token tradable on
                        xExchange. Earn fees from every trade in your pool.
                    </p>
                </div>

                {/* Main Content Card */}
                <div className="bg-white rounded-2xl shadow-level-2 p-8">
                    {/* Stepper */}
                    <WizardStepper
                        currentStep={currentStep}
                        totalSteps={steps.length}
                        steps={steps}
                        validation={
                            currentStep < 6 ? getStepValidation() : undefined
                        }
                    />

                    {/* Step Content */}
                    <div className="mt-8">{renderCurrentStep()}</div>

                    {/* Navigation */}
                    {currentStep < 6 && (
                        <div className="flex justify-between items-center mt-8 pt-6 border-t border-ash">
                            <button
                                onClick={handleBack}
                                disabled={currentStep === 1}
                                className="px-6 py-3 text-slate hover:text-graphite disabled:text-ash disabled:cursor-not-allowed transition-colors"
                            >
                                ← Back
                            </button>

                            <div className="flex gap-4">
                                <button
                                    onClick={() => navigate("/")}
                                    className="px-6 py-3 text-slate hover:text-graphite transition-colors"
                                >
                                    Cancel
                                </button>

                                {currentStep === 5 ? (
                                    <button
                                        onClick={handleExecute}
                                        disabled={!canProceed()}
                                        className="px-8 py-3 bg-theme-blue text-white rounded-xl font-medium hover:bg-theme-blue-dark disabled:bg-ash disabled:cursor-not-allowed transition-colors"
                                    >
                                        {getNextButtonText()}
                                    </button>
                                ) : (
                                    <button
                                        onClick={handleNext}
                                        disabled={!canProceed()}
                                        className="px-8 py-3 bg-theme-blue text-white rounded-xl font-medium hover:bg-theme-blue-dark disabled:bg-ash disabled:cursor-not-allowed transition-colors"
                                    >
                                        {getNextButtonText()}
                                    </button>
                                )}
                            </div>
                        </div>
                    )}
                </div>

                {/* Risk Review Modal */}
                <RiskReviewModal
                    isOpen={isRiskModalOpen}
                    onClose={() => setIsRiskModalOpen(false)}
                    onConfirm={handleRiskModalConfirm}
                    lpData={lpData}
                />
            </div>
        </div>
    );
};
