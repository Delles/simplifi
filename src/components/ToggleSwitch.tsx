import React from "react";
import styled from "styled-components";

interface ToggleSwitchProps {
    checked: boolean;
    onChange: (checked: boolean) => void;
    disabled?: boolean;
    label?: string;
}

interface StyledProps {
    checked: boolean;
    disabled: boolean;
}

const SwitchContainer = styled.label`
    display: inline-flex;
    align-items: center;
    cursor: pointer;
    user-select: none;
`;

const SwitchLabel = styled.span`
    margin-right: 0.75rem;
    font-size: 0.875rem;
    color: #1f2937; // Graphite
`;

const SwitchInput = styled.input`
    display: none;
`;

const SwitchTrack = styled.div<StyledProps>`
    position: relative;
    width: 44px;
    height: 24px;
    background: ${(props: StyledProps) => {
        if (props.disabled) return "#E5E7EB"; // Ash
        return props.checked ? "#00F2C3" : "#E5E7EB"; // Cyber Teal : Ash
    }};
    border-radius: 12px;
    transition: background-color 0.2s ease;
    opacity: ${(props: StyledProps) => (props.disabled ? 0.5 : 1)};
`;

const SwitchThumb = styled.div<StyledProps>`
    position: absolute;
    top: 2px;
    left: ${(props: StyledProps) => (props.checked ? "22px" : "2px")};
    width: 20px;
    height: 20px;
    background: #ffffff;
    border-radius: 50%;
    box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
    transition: left 0.2s ease;
    opacity: ${(props: StyledProps) => (props.disabled ? 0.5 : 1)};
`;

export const ToggleSwitch: React.FC<ToggleSwitchProps> = ({
    checked,
    onChange,
    disabled = false,
    label,
}) => {
    return (
        <SwitchContainer>
            {label && <SwitchLabel>{label}</SwitchLabel>}
            <SwitchInput
                type="checkbox"
                checked={checked}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                    onChange(e.target.checked)
                }
                disabled={disabled}
            />
            <SwitchTrack checked={checked} disabled={disabled}>
                <SwitchThumb checked={checked} disabled={disabled} />
            </SwitchTrack>
        </SwitchContainer>
    );
};
