import React from "react";

interface Step {
    title: string;
    description: string;
    educationalNote: string;
}

interface StepValidation {
    isValid: boolean;
    missing: string[];
    message: string;
}

interface WizardStepperProps {
    currentStep: number;
    totalSteps: number;
    steps: Step[];
    validation?: StepValidation;
}

export const WizardStepper: React.FC<WizardStepperProps> = ({
    currentStep,
    totalSteps,
    steps,
    validation,
}) => {
    return (
        <div className="mb-8">
            {/* Simplified Progress Bar */}
            <div className="relative mb-6">
                {/* Background line */}
                <div className="absolute top-5 left-0 w-full h-0.5 bg-ash/30"></div>

                {/* Progress line */}
                <div
                    className="absolute top-5 left-0 h-0.5 bg-gradient-to-r from-theme-blue to-theme-blue-dark transition-all duration-500 ease-out"
                    style={{
                        width: `${
                            ((currentStep - 1) / (totalSteps - 1)) * 100
                        }%`,
                    }}
                ></div>

                {/* Step indicators */}
                <div className="relative flex justify-between">
                    {steps.map((step, index) => {
                        const stepNumber = index + 1;
                        const isCompleted = stepNumber < currentStep;
                        const isCurrent = stepNumber === currentStep;

                        return (
                            <div
                                key={index}
                                className="flex flex-col items-center"
                            >
                                {/* Step circle */}
                                <div
                                    className={`
                                        w-10 h-10 rounded-full border-2 flex items-center justify-center text-sm font-semibold transition-all duration-300 shadow-level-1
                                        ${
                                            isCompleted
                                                ? "bg-theme-blue border-theme-blue text-white"
                                                : isCurrent
                                                ? "bg-white border-theme-blue text-theme-blue ring-2 ring-theme-blue/20"
                                                : "bg-white border-ash text-slate"
                                        }
                                    `}
                                >
                                    {isCompleted ? "✓" : stepNumber}
                                </div>

                                {/* Minimal step label - only show for current/completed */}
                                {(isCurrent || isCompleted) && (
                                    <div className="text-center mt-2 max-w-[100px]">
                                        <div
                                            className={`text-xs font-medium transition-all duration-300 ${
                                                isCurrent
                                                    ? "text-theme-blue"
                                                    : "text-graphite"
                                            }`}
                                        >
                                            {step.title}
                                        </div>
                                    </div>
                                )}
                            </div>
                        );
                    })}
                </div>
            </div>

            {/* Minimal validation indicator - only show if there are issues */}
            {validation && !validation.isValid && (
                <div className="bg-distribute-primary/5 border border-distribute-primary/20 rounded-lg p-3 mb-4">
                    <div className="flex items-center gap-2 text-sm">
                        <div className="w-4 h-4 bg-distribute-primary rounded-full flex items-center justify-center text-white text-xs">
                            !
                        </div>
                        <span className="text-distribute-primary font-medium">
                            {validation.message}
                        </span>
                    </div>
                </div>
            )}
        </div>
    );
};
