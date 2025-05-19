import React from "react";
import styled from "styled-components";

interface Step {
    title: string;
    description?: string;
}

interface StepperProps {
    steps: Step[];
    currentStep: number;
    onStepClick?: (stepIndex: number) => void;
}

interface StyledProps {
    isActive: boolean;
    isCompleted: boolean;
}

const StepperContainer = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: flex-start;
    margin: 2rem 0;
    padding: 0 1rem;
`;

const StepItem = styled.div<StyledProps>`
    display: flex;
    flex-direction: column;
    align-items: center;
    flex: 1;
    position: relative;
    cursor: ${(props: StyledProps) =>
        props.isCompleted ? "pointer" : "default"};

    &:not(:last-child)::after {
        content: "";
        position: absolute;
        top: 1.25rem;
        left: 50%;
        width: 100%;
        height: 2px;
        background: ${(props: StyledProps) => {
            if (props.isCompleted || props.isActive) return "#00F2C3"; // Cyber Teal for filled progress (completed or active)
            return "#E5E7EB"; // Ash for upcoming
        }};
        z-index: 1;
    }
`;

const StepCircle = styled.div<StyledProps>`
    width: 2.5rem;
    height: 2.5rem;
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    background: ${(props: StyledProps) => {
        if (props.isCompleted) return "#10B981"; // Emerald Green
        if (props.isActive) return "#00F2C3"; // Cyber Teal
        return "#FFFFFF"; // Pure White
    }};
    border: 2px solid
        ${(props: StyledProps) => {
            if (props.isCompleted) return "#10B981"; // Emerald Green
            if (props.isActive) return "#00F2C3"; // Cyber Teal
            return "#E5E7EB"; // Ash
        }};
    color: ${(props: StyledProps) => {
        if (props.isCompleted || props.isActive) return "#0D2B2B"; // Deep Teal/Black
        return "#9CA3AF"; // Silver
    }};
    font-weight: 600;
    z-index: 2;
    transition: all 0.2s ease;
`;

const StepTitle = styled.div<StyledProps>`
    margin-top: 0.75rem;
    font-size: 0.875rem;
    font-weight: ${(props: StyledProps) => (props.isActive ? "600" : "400")};
    color: ${(props: StyledProps) => {
        if (props.isCompleted) return "#6B7280"; // Slate
        if (props.isActive) return "#00F2C3"; // Cyber Teal
        return "#9CA3AF"; // Silver
    }};
    text-align: center;
`;

const StepDescription = styled.div<{ isActive: boolean }>`
    margin-top: 0.25rem;
    font-size: 0.75rem;
    color: ${(props: { isActive: boolean }) =>
        props.isActive ? "#6B7280" : "#9CA3AF"}; // Slate : Silver
    text-align: center;
    max-width: 150px;
`;

export const Stepper: React.FC<StepperProps> = ({
    steps,
    currentStep,
    onStepClick,
}) => {
    return (
        <StepperContainer>
            {steps.map((step, index) => {
                const isActive = index === currentStep;
                const isCompleted = index < currentStep;

                return (
                    <StepItem
                        key={index}
                        isActive={isActive}
                        isCompleted={isCompleted}
                        onClick={() => isCompleted && onStepClick?.(index)}
                    >
                        <StepCircle
                            isActive={isActive}
                            isCompleted={isCompleted}
                        >
                            {isCompleted ? "✓" : index + 1}
                        </StepCircle>
                        <StepTitle
                            isActive={isActive}
                            isCompleted={isCompleted}
                        >
                            {step.title}
                        </StepTitle>
                        {step.description && (
                            <StepDescription isActive={isActive}>
                                {step.description}
                            </StepDescription>
                        )}
                    </StepItem>
                );
            })}
        </StepperContainer>
    );
};
