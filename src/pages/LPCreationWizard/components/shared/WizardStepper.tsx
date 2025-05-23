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
            {/* Progress Bar */}
            <div className="relative mb-6">
                <div className="absolute top-5 left-0 w-full h-0.5 bg-ash"></div>
                <div
                    className="absolute top-5 left-0 h-0.5 bg-gradient-to-r from-distribute-500 to-amber-500 transition-all duration-500 ease-out"
                    style={{
                        width: `${
                            ((currentStep - 1) / (totalSteps - 1)) * 100
                        }%`,
                    }}
                ></div>

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
                                <div
                                    className={`
                                        w-10 h-10 rounded-full border-2 flex items-center justify-center text-sm font-semibold transition-all duration-300
                                        ${
                                            isCompleted
                                                ? "bg-distribute-500 border-distribute-500 text-white"
                                                : isCurrent
                                                ? "bg-white border-distribute-500 text-distribute-500 shadow-lg"
                                                : "bg-white border-ash text-slate"
                                        }
                                    `}
                                >
                                    {isCompleted ? "✓" : stepNumber}
                                </div>
                                <div className="text-center mt-2 max-w-[120px]">
                                    <div
                                        className={`text-sm font-medium ${
                                            isCurrent
                                                ? "text-distribute-600"
                                                : isCompleted
                                                ? "text-graphite"
                                                : "text-slate"
                                        }`}
                                    >
                                        {step.title}
                                    </div>
                                    <div className="text-xs text-slate mt-1">
                                        {step.description}
                                    </div>
                                </div>
                            </div>
                        );
                    })}
                </div>
            </div>

            {/* Current Step Info */}
            <div className="bg-gradient-to-r from-distribute-50 to-amber-50 rounded-xl p-4 border border-distribute-200">
                <div className="flex items-start gap-3">
                    <div className="w-8 h-8 bg-distribute-500 rounded-lg flex items-center justify-center text-white font-semibold text-sm">
                        {currentStep}
                    </div>
                    <div className="flex-1">
                        <h3 className="font-semibold text-graphite mb-1">
                            {steps[currentStep - 1]?.title}
                        </h3>
                        <p className="text-sm text-slate mb-2">
                            {steps[currentStep - 1]?.educationalNote}
                        </p>
                        {validation && (
                            <div className="flex items-center gap-2 text-sm">
                                {validation.isValid ? (
                                    <>
                                        <span className="w-4 h-4 bg-green-500 rounded-full flex items-center justify-center text-white text-xs">
                                            ✓
                                        </span>
                                        <span className="text-green-700">
                                            {validation.message}
                                        </span>
                                    </>
                                ) : (
                                    <>
                                        <span className="w-4 h-4 bg-amber-500 rounded-full flex items-center justify-center text-white text-xs">
                                            !
                                        </span>
                                        <span className="text-amber-700">
                                            {validation.message}
                                        </span>
                                        {validation.missing.length > 0 && (
                                            <span className="text-slate">
                                                - Missing:{" "}
                                                {validation.missing.join(", ")}
                                            </span>
                                        )}
                                    </>
                                )}
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};
