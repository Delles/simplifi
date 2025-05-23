import React, { useState, useRef, useEffect } from "react";

interface InfoTooltipProps {
    content: string;
    title?: string;
    risk?: "safe" | "caution" | "danger";
}

export const InfoTooltip: React.FC<InfoTooltipProps> = ({
    content,
    title,
    risk = "safe",
}) => {
    const [isOpen, setIsOpen] = useState(false);
    const timeoutRef = useRef<NodeJS.Timeout | null>(null);
    const containerRef = useRef<HTMLDivElement>(null);

    const getRiskColor = () => {
        switch (risk) {
            case "safe":
                return "border-risk-safe bg-risk-safe-bg text-manage-700";
            case "caution":
                return "border-risk-caution bg-risk-caution-bg text-distribute-700";
            case "danger":
                return "border-risk-danger bg-risk-danger-bg text-red-700";
            default:
                return "border-education-border bg-education-background text-slate";
        }
    };

    const handleMouseEnter = () => {
        if (timeoutRef.current) {
            clearTimeout(timeoutRef.current);
        }
        setIsOpen(true);
    };

    const handleMouseLeave = () => {
        // Add a small delay to prevent flicking when moving cursor between button and tooltip
        timeoutRef.current = setTimeout(() => {
            setIsOpen(false);
        }, 150);
    };

    const handleTooltipMouseEnter = () => {
        if (timeoutRef.current) {
            clearTimeout(timeoutRef.current);
        }
        setIsOpen(true);
    };

    const handleTooltipMouseLeave = () => {
        setIsOpen(false);
    };

    useEffect(() => {
        return () => {
            if (timeoutRef.current) {
                clearTimeout(timeoutRef.current);
            }
        };
    }, []);

    return (
        <div className="relative inline-block" ref={containerRef}>
            <button
                type="button"
                className="w-5 h-5 rounded-full bg-education-primary text-white text-xs flex items-center justify-center 
                    hover:scale-110 transition-transform duration-200 cursor-help focus:outline-none focus:ring-2 focus:ring-education-primary/50"
                onMouseEnter={handleMouseEnter}
                onMouseLeave={handleMouseLeave}
                onClick={() => setIsOpen(!isOpen)}
                aria-label={title || "More information"}
            >
                ?
            </button>

            {isOpen && (
                <div
                    className={`absolute z-50 w-80 p-4 rounded-xl border shadow-tooltip ${getRiskColor()} 
                    bottom-full right-0 mb-2 animate-fade-in-up pointer-events-auto`}
                    onMouseEnter={handleTooltipMouseEnter}
                    onMouseLeave={handleTooltipMouseLeave}
                >
                    {title && (
                        <h4 className="font-semibold mb-2 flex items-center gap-2">
                            {risk === "caution" && "⚠️"}
                            {risk === "danger" && "🚨"}
                            {risk === "safe" && "✅"}
                            {title}
                        </h4>
                    )}
                    <p className="text-sm leading-relaxed">{content}</p>

                    {/* Arrow */}
                    <div
                        className={`absolute top-full right-4 w-0 h-0 border-l-8 border-r-8 border-t-8 
                        border-l-transparent border-r-transparent ${
                            risk === "safe"
                                ? "border-t-risk-safe"
                                : risk === "caution"
                                ? "border-t-risk-caution"
                                : risk === "danger"
                                ? "border-t-risk-danger"
                                : "border-t-education-border"
                        }`}
                    ></div>
                </div>
            )}
        </div>
    );
};
