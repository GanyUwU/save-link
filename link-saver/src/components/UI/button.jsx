export function Button({ children, type = 'button', onClick, className = '', disabled = false, variant, size }) {
    let baseStyles = `flex items-center justify-center rounded-md font-medium focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-900 transition-all duration-200`;
    let variantStyles = '';
    let sizeStyles = '';

if (variant === 'ghost') {
    variantStyles = 'bg-transparent text-gray-400 hover:text-white hover:bg-white/10';
} else if (variant === 'outline') {
    variantStyles = 'bg-transparent border border-white/30 text-white hover:bg-white hover:text-black';
} else if (variant === 'primary') {
    variantStyles = 'bg-blue-600 text-white hover:bg-blue-700 focus:ring-blue-500';
} else {
    variantStyles = 'bg-white text-black hover:bg-gray-200';
}
    if (size === 'sm') {
        sizeStyles = 'px-3 py-1 text-sm';
    } else {
        sizeStyles = 'px-4 py-2 text-base';
    }

    return (
        <button
            type={type}
            onClick={onClick}
            className={`${baseStyles} ${variantStyles} ${sizeStyles} ${className}`}
            disabled={disabled}
        >
            {children}
        </button>
    );
}