
// src/components/ui/Input.jsx
import React from 'react';

/**
 * Input field with label above
 * Props:
 * - label: field label
 * - id: input id
 * - ...other input props
 */
export function Input({ label, id, ...props }) {
  return (
    <div className="mb-4">
      {label && <label htmlFor={id} className="block text-sm font-medium text-gray-700 mb-1">{label}</label>}
      <input
        id={id}
        className="w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
        {...props}
      />
    </div>
  );
}
