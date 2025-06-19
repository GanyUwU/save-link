// src/components/ui/Label.jsx
import React from 'react';

/**
 * Label component for form fields
 * Props:
 * - htmlFor: id of the input
 * - children: label text
 * - className: additional tailwind classes
 */
export function Label({ htmlFor, children, className = '' }) {
  return (
    <label htmlFor={htmlFor} className={`block text-sm font-medium text-gray-700 mb-1 ${className}`}>
      {children}
    </label>
  );
}
