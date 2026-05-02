// src/features/PatientDetails/components/PatientListItem/PatientListActions.tsx
import React from 'react';

interface PatientListActionsProps {
  onViewDetails: () => void;
  onRemove: () => void;
}

export const PatientListActions: React.FC<PatientListActionsProps> = ({ onViewDetails, onRemove }) => (
  <div className="flex items-center gap-3">
    <button 
      onClick={onViewDetails}
      className="px-3 py-1 text-xs font-medium rounded border transition-colors hover:bg-[var(--color-app-surface-2)]"
      style={{ 
        borderColor: 'var(--color-app-border)', 
        color: 'var(--color-app-primary)' 
      }}
    >
      View
    </button>
    <button 
      onClick={onRemove}
      className="px-3 py-1 text-xs font-medium rounded transition-colors text-white bg-[var(--color-app-danger)] hover:bg-[var(--color-app-danger-hover)]"
    >
      Remove
    </button>
  </div>
);