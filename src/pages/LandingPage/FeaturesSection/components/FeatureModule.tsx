import React from "react";
import { motion, useAnimation } from "framer-motion";
import type { Variants } from "framer-motion";

interface FeatureModuleProps {
    icon: React.ReactNode;
    title: string;
    description: string;
    animationVariants: Variants;
    custom?: number;
}

export const FeatureModule: React.FC<FeatureModuleProps> = ({
    icon,
    title,
    description,
    animationVariants,
    custom,
}) => {
    const controls = useAnimation();

    const handleHoverStart = () => {
        controls.start("hover");
    };

    const handleHoverEnd = () => {
        controls.start("rest");
    };

    return (
        <motion.article
            className="group relative h-full"
            variants={animationVariants}
            custom={custom}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
            onHoverStart={handleHoverStart}
            onHoverEnd={handleHoverEnd}
            role="button"
            tabIndex={0}
            aria-label={`Learn more about ${title}`}
        >
            {/* Main Card Container */}
            <motion.div
                className="relative h-full bg-gradient-to-br from-white/95 via-white/90 to-white/85 backdrop-blur-xl rounded-3xl border border-white/20 shadow-[0_8px_32px_rgba(0,0,0,0.06)] overflow-hidden cursor-pointer transition-all duration-500 ease-out"
                whileHover={{
                    y: -12,
                    scale: 1.02,
                    boxShadow:
                        "0 25px 50px rgba(0,0,0,0.15), 0 0 0 1px rgba(59,130,246,0.1)",
                    transition: { duration: 0.4, ease: [0.23, 1, 0.32, 1] },
                }}
                whileTap={{ scale: 0.98 }}
                whileFocus={{
                    boxShadow:
                        "0 0 0 3px rgba(59,130,246,0.3), 0 25px 50px rgba(0,0,0,0.15)",
                    outline: "none",
                }}
            >
                {/* Animated Gradient Background */}
                <motion.div
                    className="absolute inset-0 bg-gradient-to-br from-theme-blue/5 via-digital-lavender/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700"
                    initial={{ opacity: 0 }}
                    animate={controls}
                    variants={{
                        rest: { opacity: 0 },
                        hover: { opacity: 1 },
                    }}
                />

                {/* Glowing Border Effect */}
                <motion.div
                    className="absolute inset-0 rounded-3xl"
                    initial={{ opacity: 0 }}
                    animate={controls}
                    variants={{
                        rest: {
                            opacity: 0,
                            background:
                                "linear-gradient(45deg, transparent, transparent)",
                        },
                        hover: {
                            opacity: 1,
                            background:
                                "linear-gradient(45deg, rgba(59,130,246,0.3), rgba(147,51,234,0.3), rgba(59,130,246,0.3))",
                            backgroundSize: "200% 200%",
                            animation: "gradient-shift 3s ease infinite",
                        },
                    }}
                    style={{
                        background:
                            "linear-gradient(45deg, rgba(59,130,246,0.3), rgba(147,51,234,0.3), rgba(59,130,246,0.3))",
                        backgroundSize: "200% 200%",
                        maskImage:
                            "linear-gradient(black, black) content-box, linear-gradient(black, black)",
                        maskComposite: "xor",
                        padding: "2px",
                    }}
                />

                {/* Content Container */}
                <div className="relative p-8 md:p-10 h-full flex flex-col">
                    {/* Icon Container with Enhanced Effects */}
                    <motion.div
                        className="relative mb-8 self-center md:self-start"
                        whileHover={{
                            scale: 1.1,
                            rotate: [0, -5, 5, 0],
                            transition: { duration: 0.6, ease: "easeInOut" },
                        }}
                    >
                        {/* Icon Glow Effect */}
                        <motion.div
                            className="absolute inset-0 bg-gradient-to-br from-theme-blue/30 to-digital-lavender/30 rounded-2xl blur-xl opacity-0 group-hover:opacity-70 transition-opacity duration-500"
                            animate={controls}
                            variants={{
                                rest: { scale: 0.8, opacity: 0 },
                                hover: { scale: 1.2, opacity: 0.7 },
                            }}
                        />

                        {/* Icon Background */}
                        <motion.div
                            className="relative w-16 h-16 md:w-20 md:h-20 bg-gradient-to-br from-theme-blue/20 via-digital-lavender/15 to-theme-blue/10 rounded-2xl flex items-center justify-center backdrop-blur-sm border border-white/30"
                            animate={controls}
                            variants={{
                                rest: {
                                    background:
                                        "linear-gradient(135deg, rgba(59,130,246,0.2), rgba(147,51,234,0.15), rgba(59,130,246,0.1))",
                                },
                                hover: {
                                    background:
                                        "linear-gradient(135deg, rgba(59,130,246,0.3), rgba(147,51,234,0.25), rgba(59,130,246,0.2))",
                                },
                            }}
                            transition={{ duration: 0.3 }}
                        >
                            <motion.div
                                className="text-theme-blue scale-125 md:scale-150"
                                animate={controls}
                                variants={{
                                    rest: { scale: 1.25 },
                                    hover: { scale: 1.4 },
                                }}
                                transition={{ duration: 0.3, ease: "easeOut" }}
                            >
                                {icon}
                            </motion.div>
                        </motion.div>
                    </motion.div>

                    {/* Text Content */}
                    <div className="flex-1 text-center md:text-left">
                        <motion.h3
                            className="text-2xl md:text-3xl font-bold bg-gradient-to-r from-graphite via-slate to-graphite bg-clip-text text-transparent mb-4 leading-tight"
                            animate={controls}
                            variants={{
                                rest: { y: 0 },
                                hover: { y: -2 },
                            }}
                            transition={{ duration: 0.2 }}
                        >
                            {title}
                        </motion.h3>

                        <motion.p
                            className="text-slate/80 text-base md:text-lg leading-relaxed mb-8"
                            animate={controls}
                            variants={{
                                rest: { y: 0, opacity: 0.8 },
                                hover: { y: -2, opacity: 1 },
                            }}
                            transition={{ duration: 0.2, delay: 0.05 }}
                        >
                            {description}
                        </motion.p>
                    </div>

                    {/* Enhanced CTA */}
                    <motion.div
                        className="flex items-center justify-center md:justify-start gap-2"
                        initial={{ opacity: 0, y: 10 }}
                        animate={controls}
                        variants={{
                            rest: { opacity: 0, y: 10 },
                            hover: { opacity: 1, y: 0 },
                        }}
                        transition={{ duration: 0.3, delay: 0.1 }}
                    >
                        <span className="text-theme-blue font-semibold text-lg">
                            Explore Feature
                        </span>
                        <motion.svg
                            className="w-5 h-5 text-theme-blue"
                            animate={controls}
                            variants={{
                                rest: { x: 0 },
                                hover: { x: 4 },
                            }}
                            transition={{
                                duration: 0.2,
                                repeat: Infinity,
                                repeatType: "reverse",
                            }}
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M17 8l4 4m0 0l-4 4m4-4H3"
                            />
                        </motion.svg>
                    </motion.div>
                </div>

                {/* Floating Particles Effect */}
                <motion.div
                    className="absolute top-4 right-4 w-2 h-2 bg-theme-blue/30 rounded-full"
                    animate={{
                        y: [-2, -8, -2],
                        opacity: [0.3, 0.8, 0.3],
                    }}
                    transition={{
                        duration: 3,
                        repeat: Infinity,
                        ease: "easeInOut",
                    }}
                />
                <motion.div
                    className="absolute bottom-8 left-6 w-1.5 h-1.5 bg-digital-lavender/40 rounded-full"
                    animate={{
                        y: [-1, -6, -1],
                        opacity: [0.4, 0.7, 0.4],
                    }}
                    transition={{
                        duration: 4,
                        repeat: Infinity,
                        ease: "easeInOut",
                        delay: 1,
                    }}
                />
            </motion.div>
        </motion.article>
    );
};
