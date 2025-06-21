import React, { useState } from 'react';

/**
 * Card container
 * Props:
 * - children: card content
 * - className: additional classes
 */
export function Card({ children, className = '' }) {
  return (
    <div className={`bg-white rounded-lg shadow-md p-6 ${className}`}>
      {children}
    </div>
  );
}