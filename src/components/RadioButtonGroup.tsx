import React from "react";
import styled from "styled-components";

interface RadioOption {
    value: string;
    label: string;
    description?: string;
}

interface RadioButtonGroupProps {
    options: RadioOption[];
    value: string;
    onChange: (value: string) => void;
    name: string;
    disabled?: boolean;
}

interface StyledProps {
    disabled: boolean;
}

interface RadioStyleProps extends StyledProps {
    checked: boolean;
}

const GroupContainer = styled.div`
    display: flex;
    flex-direction: column;
    gap: 1rem;
`;

const RadioLabel = styled.label<StyledProps>`
    display: flex;
    align-items: flex-start;
    padding: 1rem;
    border: 1px solid #e5e7eb; // Ash
    border-radius: 8px;
    cursor: ${(props: StyledProps) =>
        props.disabled ? "not-allowed" : "pointer"};
    transition: all 0.2s ease;
    opacity: ${(props: StyledProps) => (props.disabled ? 0.5 : 1)};

    &:hover {
        border-color: ${(props: StyledProps) =>
            props.disabled ? "#E5E7EB" : "#00F2C3"}; // Ash : Cyber Teal
        background: ${(props: StyledProps) =>
            props.disabled ? "transparent" : "#F7F9FC"}; // Cloud White
    }
`;

const RadioInput = styled.input`
    display: none; // Hide native radio button
`;

const CustomRadio = styled.div<RadioStyleProps>`
    min-width: 18px; // Size of the custom radio button
    width: 18px;
    height: 18px;
    border-radius: 50%;
    border: 2px solid
        ${(props) =>
            props.disabled
                ? "#E5E7EB"
                : props.checked
                ? "#00F2C3"
                : "#E5E7EB"}; // Ash or Cyber Teal (Primary Accent for selected)
    background-color: ${(props) =>
        props.checked
            ? "#00F2C3"
            : "#FFFFFF"}; // Cyber Teal fill when checked, Pure White otherwise
    margin-right: 0.75rem;
    margin-top: 0.125rem; /* Align with text better */
    display: inline-block;
    position: relative;
    transition: all 0.2s ease;

    // Inner dot for selected state (optional, but common)
    &::after {
        content: "";
        display: ${(props) => (props.checked ? "block" : "none")};
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        width: 8px;
        height: 8px;
        border-radius: 50%;
        background-color: ${(props) =>
            props.disabled
                ? "#6B7280"
                : "#0D2B2B"}; // Slate when disabled, Deep Teal/Black on Cyber Teal
    }
`;

const RadioContent = styled.div`
    flex: 1;
`;

const RadioTitle = styled.div`
    font-size: 0.875rem;
    font-weight: 500;
    color: #1f2937; // Graphite
    margin-bottom: 0.25rem;
`;

const RadioDescription = styled.div`
    font-size: 0.75rem;
    color: #6b7280; // Slate
`;

export const RadioButtonGroup: React.FC<RadioButtonGroupProps> = ({
    options,
    value,
    onChange,
    name,
    disabled = false,
}) => {
    return (
        <GroupContainer>
            {options.map((option) => (
                <RadioLabel key={option.value} disabled={disabled || false}>
                    <RadioInput
                        type="radio"
                        name={name}
                        value={option.value}
                        checked={value === option.value}
                        onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                            !disabled && onChange(e.target.value)
                        }
                        disabled={disabled}
                    />
                    <CustomRadio
                        checked={value === option.value}
                        disabled={disabled || false}
                    />
                    <RadioContent>
                        <RadioTitle>{option.label}</RadioTitle>
                        {option.description && (
                            <RadioDescription>
                                {option.description}
                            </RadioDescription>
                        )}
                    </RadioContent>
                </RadioLabel>
            ))}
        </GroupContainer>
    );
};
