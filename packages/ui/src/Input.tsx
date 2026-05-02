import React from "react";

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
}

export const Input: React.FC<InputProps> = ({
  label,
  error,
  className = "",
  ...props
}) => {
  return (
    <div className="w-full">
      {label && (
        <label className="block text-sm font-b text-slate-300 mb-1 ">
          {label}
        </label>
      )}

      <input
        {...props}
        className={`block w-full rounded-md bg-[#0f172a]/50 py-2.5 px-3 text-white shadow-sm 
        ring-1 ring-inset ring-slate-700 placeholder:text-slate-500 focus:outline-none
          sm:text-sm ${className}`}
      />

      {error && (
        <p className="mt-1 text-sm text-red-400">{error}</p>
      )}
    </div>
  );
};