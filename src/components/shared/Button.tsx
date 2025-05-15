import React from "react";

type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
    variant?: "primary" | "secondary" | "danger" | "ghost";
    size?: "sm" | "md" | "lg";
    // Add any other custom props here
};

export default function Button({
    children,
    className = "",
    variant = "primary",
    size = "md",
    ...props
}: ButtonProps) {
    const baseStyle =
        "font-semibold rounded focus:outline-none focus:ring-2 focus:ring-opacity-50 disabled:opacity-50";

    const variantStyles = {
        primary: "bg-blue-600 hover:bg-blue-700 text-white focus:ring-blue-500",
        secondary:
            "bg-gray-200 hover:bg-gray-300 text-gray-800 focus:ring-gray-400",
        danger: "bg-red-500 hover:bg-red-600 text-white focus:ring-red-400",
        ghost: "bg-transparent hover:bg-gray-100 text-gray-800 focus:ring-gray-400",
    };

    const sizeStyles = {
        sm: "py-1 px-2 text-sm",
        md: "py-2 px-4 text-base",
        lg: "py-3 px-6 text-lg",
    };

    return (
        <button
            className={`${baseStyle} ${variantStyles[variant]} ${sizeStyles[size]} ${className}`.trim()}
            {...props}
        >
            {children}
        </button>
    );
}
