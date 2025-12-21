import { cn } from "../lib/utils";

/**
 * Skeleton component for loading states
 * @param {string} className - Additional classes to merge
 * @param {string} height - Height of the skeleton
 * @param {string} width - Width of the skeleton
 * @param {string} rounded - Border radius of the skeleton
 */
const Skeleton = ({ className, height, width, rounded = "rounded-md", ...props }) => {
    return (
        <div
            className={cn(
                "animate-pulse bg-white/10",
                rounded,
                className
            )}
            style={{
                height: height,
                width: width
            }}
            {...props}
        />
    );
};

export { Skeleton };
