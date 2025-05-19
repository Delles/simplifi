import React, { useState } from "react";
import styled from "styled-components";

interface InfoIconWithTooltipProps {
    tooltipText: string;
    size?: "small" | "medium" | "large";
}

interface StyledProps {
    size: string;
    visible: boolean;
}

const IconContainer = styled.div`
    display: inline-flex;
    align-items: center;
    justify-content: center;
    position: relative;
    cursor: help;
`;

const InfoIcon = styled.div<{ size: string }>`
    width: ${(props: { size: string }) => {
        switch (props.size) {
            case "small":
                return "16px";
            case "large":
                return "24px";
            default:
                return "20px";
        }
    }};
    height: ${(props: { size: string }) => {
        switch (props.size) {
            case "small":
                return "16px";
            case "large":
                return "24px";
            default:
                return "20px";
        }
    }};
    border-radius: 50%;
    background: #6b7280; // Slate
    color: #ffffff;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: ${(props: { size: string }) => {
        switch (props.size) {
            case "small":
                return "10px";
            case "large":
                return "14px";
            default:
                return "12px";
        }
    }};
    font-weight: bold;
    transition: background-color 0.2s ease;

    &:hover {
        background: #3b82f6; // Hyperlink Blue
    }
`;

const Tooltip = styled.div<StyledProps>`
    position: absolute;
    bottom: calc(100% + 8px);
    left: 50%;
    transform: translateX(-50%);
    background: #1f2937; // Graphite
    color: #f3f4f6; // Mist
    padding: 8px 12px;
    border-radius: 4px;
    font-size: ${(props: StyledProps) => {
        switch (props.size) {
            case "small":
                return "12px";
            case "large":
                return "16px";
            default:
                return "14px";
        }
    }};
    line-height: 1.4;
    white-space: nowrap;
    opacity: ${(props: StyledProps) => (props.visible ? 1 : 0)};
    visibility: ${(props: StyledProps) =>
        props.visible ? "visible" : "hidden"};
    transition: opacity 0.2s ease, visibility 0.2s ease;
    z-index: 1000;
    max-width: 300px;
    text-align: center;

    &::after {
        content: "";
        position: absolute;
        top: 100%;
        left: 50%;
        transform: translateX(-50%);
        border-width: 6px;
        border-style: solid;
        border-color: #1f2937 transparent transparent transparent;
    }
`;

export const InfoIconWithTooltip: React.FC<InfoIconWithTooltipProps> = ({
    tooltipText,
    size = "medium",
}) => {
    const [isVisible, setIsVisible] = useState(false);

    return (
        <IconContainer
            onMouseEnter={() => setIsVisible(true)}
            onMouseLeave={() => setIsVisible(false)}
        >
            <InfoIcon size={size}>i</InfoIcon>
            <Tooltip visible={isVisible} size={size}>
                {tooltipText}
            </Tooltip>
        </IconContainer>
    );
};
