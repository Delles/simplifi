import React from "react";
import { InfoTooltip } from "./InfoTooltip";

interface PropertyToggleProps {
    title: string;
    description: string;
    value: boolean;
    onChange: (value: boolean) => void;
    tooltip: string;
    risk?: "safe" | "caution" | "danger";
    disabled?: boolean;
}

export const PropertyToggle: React.FC<PropertyToggleProps> = ({
    title,
    description,
    value,
    onChange,
    tooltip,
    risk = "safe",
    disabled = false,
}) => {
    return (
        <div
            className={`p-4 rounded-xl border transition-all duration-200 ${
                value
                    ? "bg-create-50 border-create-200"
                    : "bg-white border-gray-200 hover:border-gray-300"
            } ${disabled ? "opacity-50 cursor-not-allowed" : ""}`}
        >
            <div className="flex items-start justify-between">
                <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                        <label className="flex items-center cursor-pointer">
                            <input
                                type="checkbox"
                                checked={value}
                                onChange={(e) =>
                                    !disabled && onChange(e.target.checked)
                                }
                                disabled={disabled}
                                className="sr-only"
                            />
                            <div
                                className={`w-5 h-5 rounded border-2 flex items-center justify-center transition-all duration-200 ${
                                    value
                                        ? "bg-create-500 border-create-500"
                                        : "border-gray-300 hover:border-create-300"
                                }`}
                            >
                                {value && (
                                    <svg
                                        className="w-3 h-3 text-white"
                                        fill="currentColor"
                                        viewBox="0 0 20 20"
                                    >
                                        <path
                                            fillRule="evenodd"
                                            d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                                            clipRule="evenodd"
                                        />
                                    </svg>
                                )}
                            </div>
                            <span className="ml-3 font-medium text-graphite">
                                {title}
                            </span>
                        </label>
                        <InfoTooltip
                            content={tooltip}
                            title={title}
                            risk={risk}
                        />
                    </div>
                    <p className="text-sm text-slate leading-relaxed">
                        {description}
                    </p>
                </div>
            </div>
        </div>
    );
};
