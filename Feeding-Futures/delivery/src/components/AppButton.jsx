import React from 'react';
import { ACCENT_COLOR_TAILWIND } from '../styles/constants';

const AppButton = ({ children, onClick, disabled = false, type = 'button', className = '' }) => (
  <button
    type={type}
    onClick={onClick}
    disabled={disabled}
    className={`w-full py-3 px-4 text-white font-semibold tracking-wider rounded-lg transition duration-200 shadow-md ${
      disabled
        ? 'bg-gray-400 cursor-not-allowed'
        : `bg-${ACCENT_COLOR_TAILWIND} hover:bg-emerald-600 active:scale-[0.98] focus:outline-none focus:ring-4 focus:ring-emerald-200`
    } ${className}`}
  >
    {children}
  </button>
);

export default AppButton;
