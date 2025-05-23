import React from "react";

interface StepperProps {
    currentStep: number;
    totalSteps: number;
    steps: {
        title: string;
        description: string;
        educationalNote?: string;
    }[];
    validation?: {
        isValid: boolean;
        missing: string[];
        message: string;
    };
}

export const WizardStepper: React.FC<StepperProps> = ({
    currentStep,
    totalSteps,
    steps,
    validation,
}) => {
    return (
        <div className="mb-8">
            {/* Validation Status Banner */}
            {validation && currentStep < totalSteps && (
                <div className="mb-6 p-4 rounded-xl bg-gradient-to-r from-blue-50 to-indigo-50 border border-blue-100">
                    <div className="flex items-center gap-3">
                        {validation.isValid ? (
                            <div className="w-8 h-8 bg-manage-500 rounded-full flex items-center justify-center">
                                <svg
                                    className="w-4 h-4 text-white"
                                    fill="currentColor"
                                    viewBox="0 0 20 20"
                                >
                                    <path
                                        fillRule="evenodd"
                                        d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                                        clipRule="evenodd"
                                    />
                                </svg>
                            </div>
                        ) : (
                            <div className="w-8 h-8 bg-distribute-500 rounded-full flex items-center justify-center">
                                <svg
                                    className="w-4 h-4 text-white"
                                    fill="currentColor"
                                    viewBox="0 0 20 20"
                                >
                                    <path
                                        fillRule="evenodd"
                                        d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z"
                                        clipRule="evenodd"
                                    />
                                </svg>
                            </div>
                        )}
                        <div>
                            <p
                                className={`text-sm font-medium ${
                                    validation.isValid
                                        ? "text-manage-700"
                                        : "text-distribute-700"
                                }`}
                            >
                                {validation.message}
                            </p>
                            {!validation.isValid &&
                                validation.missing.length > 0 && (
                                    <p className="text-xs text-slate mt-1">
                                        Complete the highlighted fields to
                                        continue
                                    </p>
                                )}
                        </div>
                    </div>
                </div>
            )}

            <div className="flex items-center justify-between mb-6">
                {steps.map((step, index) => {
                    const stepNumber = index + 1;
                    const isCompleted = stepNumber < currentStep;
                    const isCurrent = stepNumber === currentStep;

                    return (
                        <div key={index} className="flex-1 flex items-center">
                            <div className="flex flex-col items-center">
                                {/* Step Circle */}
                                <div
                                    className={`w-12 h-12 rounded-full flex items-center justify-center text-sm font-semibold
                                    transition-all duration-300 ${
                                        isCompleted
                                            ? "bg-create-500 text-white scale-110 shadow-level-2"
                                            : isCurrent
                                            ? "bg-create-100 text-create-700 ring-4 ring-create-500/20 scale-110 shadow-level-1"
                                            : "bg-gray-100 text-gray-400"
                                    }`}
                                >
                                    {isCompleted ? (
                                        <svg
                                            className="w-5 h-5"
                                            fill="currentColor"
                                            viewBox="0 0 20 20"
                                        >
                                            <path
                                                fillRule="evenodd"
                                                d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                                                clipRule="evenodd"
                                            />
                                        </svg>
                                    ) : (
                                        stepNumber
                                    )}
                                </div>

                                {/* Step Info */}
                                <div className="mt-3 text-center">
                                    <div
                                        className={`text-sm font-medium transition-colors duration-200 ${
                                            isCurrent
                                                ? "text-create-600"
                                                : isCompleted
                                                ? "text-create-500"
                                                : "text-gray-400"
                                        }`}
                                    >
                                        {step.title}
                                    </div>
                                    <div className="text-xs text-slate mt-1 max-w-24">
                                        {step.description}
                                    </div>
                                </div>
                            </div>

                            {/* Connector Line */}
                            {index < steps.length - 1 && (
                                <div
                                    className={`flex-1 h-1 mx-4 rounded-full transition-all duration-500 ${
                                        stepNumber < currentStep
                                            ? "bg-gradient-to-r from-create-500 to-create-600 shadow-sm"
                                            : "bg-gray-200"
                                    }`}
                                ></div>
                            )}
                        </div>
                    );
                })}
            </div>

            {/* Enhanced Progress Bar */}
            <div className="w-full bg-gray-200 rounded-full h-3 shadow-inner">
                <div
                    className="h-3 bg-gradient-to-r from-create-500 to-blue-500 rounded-full transition-all duration-500 animate-gradient-shift shadow-level-1"
                    style={{ width: `${(currentStep / totalSteps) * 100}%` }}
                ></div>
            </div>
        </div>
    );
};
