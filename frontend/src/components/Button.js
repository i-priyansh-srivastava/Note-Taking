export function Button({ children, className, variant, ...props }) {
    const baseStyle = "px-4 py-2 rounded-lg flex items-center gap-2";
    const variants = {
        outline: "border border-gray-500 text-gray-700",
        solid: "bg-blue-600 text-white",
    };
    return (
        <button className={`${baseStyle} ${variants[variant] || ""} ${className}`} {...props}>
            {children}
        </button>
    );
}