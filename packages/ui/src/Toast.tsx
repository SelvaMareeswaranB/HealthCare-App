import React from "react";

type ToastVariant = "success" | "danger" | "warning";

interface ToastProps {
  message: string;
  variant?: ToastVariant;
  onClose?: () => void;
}

export const Toast: React.FC<ToastProps> = ({ message, variant = "success", onClose }) => {
  const baseContainer = "flex items-center w-full max-w-sm p-4 rounded-xl shadow-lg border";
  
  const containerVariants = {
    success: "bg-slate-800/50 border-emerald-500/20 text-emerald-400",
    danger: "bg-slate-800/50 border-red-500/20 text-red-400",
    warning: "bg-slate-800/50 border-amber-500/20 text-amber-400",
  };

  const iconBoxVariants = {
    success: "bg-emerald-500/10 text-emerald-500",
    danger: "bg-red-500/10 text-red-500",
    warning: "bg-amber-500/10 text-amber-500",
  };

  const icons = {
    success: (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
      </svg>
    ),
    danger: (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
      </svg>
    ),
    warning: (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
      </svg>
    ),
  };

  return (
    <div className={`${baseContainer} ${containerVariants[variant]}`} role="alert">
      <div className={`inline-flex items-center justify-center shrink-0 w-8 h-8 rounded-lg ${iconBoxVariants[variant]}`}>
        {icons[variant]}
      </div>
      
      <div className="ms-3 text-sm font-medium text-slate-200">
        {message}
      </div>

      <button
        onClick={onClose}
        type="button"
        className="ms-auto -mx-1.5 -my-1.5 justify-center items-center flex text-slate-500 hover:text-white p-1.5 hover:bg-slate-700 rounded-lg focus:outline-none transition-colors"
        aria-label="Close"
      >
        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
        </svg>
      </button>
    </div>
  );
};