import React from "react";

type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
    variant?: "primary" | "secondary" | "destructive";
    size?: "sm" | "md";
    outlined?: boolean;
    // Add any other custom props here
};

export default function Button({
    children,
    className = "",
    variant = "primary",
    size = "md",
    outlined = false,
    ...props
}: ButtonProps) {
    const baseStyle =
        "font-medium rounded-ui-element shadow-level-1 focus:outline-none disabled:shadow-none disabled:cursor-not-allowed transition-all duration-150 ease-in-out";

    const sizeStyles = {
        sm: "py-2 px-4 text-button-sm",
        md: "py-3 px-6 text-button-lg",
    };

    let variantClasses = "";

    if (props.disabled) {
        variantClasses = "bg-ash text-slate";
    } else {
        switch (variant) {
            case "primary":
                variantClasses =
                    "bg-cyber-teal text-deep-teal-black hover:bg-opacity-90 focus:ring-2 focus:ring-cyber-teal focus:ring-offset-1";
                break;
            case "secondary":
                if (outlined) {
                    variantClasses =
                        "bg-pure-white text-hyperlink-blue border border-hyperlink-blue hover:bg-hyperlink-blue hover:bg-opacity-10 focus:ring-2 focus:ring-hyperlink-blue focus:ring-offset-1";
                } else {
                    variantClasses =
                        "bg-hyperlink-blue text-pure-white hover:bg-opacity-90 focus:ring-2 focus:ring-hyperlink-blue focus:ring-offset-1";
                }
                break;
            case "destructive":
                variantClasses =
                    "bg-signal-red text-pure-white hover:bg-opacity-90 focus:ring-2 focus:ring-signal-red focus:ring-offset-1";
                break;
            default:
                variantClasses =
                    "bg-cyber-teal text-deep-teal-black hover:bg-opacity-90 focus:ring-2 focus:ring-cyber-teal focus:ring-offset-1";
        }
    }

    const hoverTransform =
        variant === "primary" && !props.disabled
            ? "hover:-translate-y-px hover:shadow-level-2"
            : "";

    return (
        <button
            className={`${baseStyle} ${sizeStyles[size]} ${variantClasses} ${hoverTransform} ${className}`.trim()}
            {...props}
        >
            {children}
        </button>
    );
}
