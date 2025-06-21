// // src/components/ui/Button.jsx
// import React from 'react';

// /**
//  * Button component with variants: primary, secondary, danger
//  * Props:
//  * - variant: one of 'primary' | 'secondary' | 'danger'
//  * - children: button label
//  * - onClick: click handler
//  */
// export function Button({ variant = 'primary', children, ...props }) {
//   const base = 'px-4 py-2 font-semibold rounded-lg shadow transition transform hover:scale-105';
//   const variants = {
//     primary: 'bg-blue-600 text-white hover:bg-blue-700',
//     secondary: 'bg-gray-200 text-gray-800 hover:bg-gray-300',
//     danger: 'bg-red-600 text-white hover:bg-red-700',
//   };
//   return (
//     <button className={`${base} ${variants[variant]}`} {...props}>
//       {children}
//     </button>
//   );
// }


/**
 * Custom Button component with Tailwind styling.
 * Props:
 * - children: Button content (text, icon, etc.).
 * - type: Button type (e.g., 'submit', 'button').
 * - onClick: Function to handle button clicks.
 * - className: Additional classes for styling.
 * - disabled: Boolean to disable the button.
 * - variant: Custom variant for button styling (e.g., 'ghost', 'outline').
 * - size: Custom size for button styling (e.g., 'sm').
 */
// export function Button({ children, type = 'button', onClick, className = '', disabled = false, variant, size }) {
//     let baseStyles = `flex items-center justify-center rounded-md font-medium focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-900 transition-all duration-200`;
//     let variantStyles = '';
//     let sizeStyles = '';

//     if (variant === 'ghost') {
//         variantStyles = 'bg-transparent text-gray-400 hover:text-white hover:bg-white/10';
//     } else if (variant === 'outline') {
//         variantStyles = 'bg-transparent border border-white/30 text-white hover:bg-white hover:text-black';
//     } else {
//         // Default variant
//         variantStyles = 'bg-white text-black hover:bg-gray-200';
//     }

//     if (size === 'sm') {
//         sizeStyles = 'px-3 py-1 text-sm';
//     } else {
//         sizeStyles = 'px-4 py-2 text-base';
//     }

//     return (
//         <button
//             type={type}
//             onClick={onClick}
//             className={`${baseStyles} ${variantStyles} ${sizeStyles} ${className}`}
//             disabled={disabled}
//         >
//             {children}
//         </button>
//     );
// }

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
    }
    else {
        // Default variant
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