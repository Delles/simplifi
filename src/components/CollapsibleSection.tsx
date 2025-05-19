import React, { useState } from "react";
import styled from "styled-components";

interface CollapsibleSectionProps {
    title: string;
    children: React.ReactNode;
    defaultExpanded?: boolean;
}

interface StyledProps {
    isExpanded: boolean;
}

const SectionContainer = styled.div`
    border: 1px solid #e5e7eb; // Ash
    border-radius: 8px;
    overflow: hidden;
    margin: 1rem 0;
`;

const Header = styled.div<StyledProps>`
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 1rem;
    background: ${(props: StyledProps) =>
        props.isExpanded ? "#F7F9FC" : "#FFFFFF"}; // Cloud White : Pure White
    cursor: pointer;
    transition: background-color 0.2s ease;

    &:hover {
        background: #f7f9fc; // Cloud White
    }
`;

const Title = styled.div`
    font-size: 1rem;
    font-weight: 600;
    color: #1f2937; // Graphite
`;

const ToggleIcon = styled.div<StyledProps>`
    width: 20px;
    height: 20px;
    display: flex;
    align-items: center;
    justify-content: center;
    color: #6b7280; // Slate
    transform: rotate(
        ${(props: StyledProps) => (props.isExpanded ? "180deg" : "0deg")}
    );
    transition: transform 0.2s ease;

    &::before {
        content: "▼";
        font-size: 12px;
    }
`;

const Content = styled.div<StyledProps>`
    padding: ${(props: StyledProps) => (props.isExpanded ? "1rem" : "0")};
    max-height: ${(props: StyledProps) => (props.isExpanded ? "1000px" : "0")};
    overflow: hidden;
    transition: all 0.3s ease;
    background: #ffffff; // Pure White
`;

export const CollapsibleSection: React.FC<CollapsibleSectionProps> = ({
    title,
    children,
    defaultExpanded = false,
}) => {
    const [isExpanded, setIsExpanded] = useState(defaultExpanded);

    return (
        <SectionContainer>
            <Header
                isExpanded={isExpanded}
                onClick={() => setIsExpanded(!isExpanded)}
            >
                <Title>{title}</Title>
                <ToggleIcon isExpanded={isExpanded} />
            </Header>
            <Content isExpanded={isExpanded}>{children}</Content>
        </SectionContainer>
    );
};
