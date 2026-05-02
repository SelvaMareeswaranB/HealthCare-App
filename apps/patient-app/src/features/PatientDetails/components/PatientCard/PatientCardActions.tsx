import React from 'react';
import type { Patient } from '../../@types';

interface PatientCardActionsProps {
    patient: Patient;
    onViewDetails: () => void;
    onRemove: () => void;
    onStatusChange: (id: string, status: Patient['status']) => void;
}

const STATUSES: Patient['status'][] = ['Active', 'Discharged', 'Critical'];

export const PatientCardActions: React.FC<PatientCardActionsProps> = ({
    patient,
    onViewDetails,
    onRemove,
    onStatusChange,
}) => (
  <div className="flex flex-col gap-3 pt-4">
    <div className="flex flex-col gap-1">
      <label
        className="text-xs mb-1"
        style={{ color: 'var(--color-app-text-muted)' }}
        htmlFor={`status-${patient.id}`}
      >
        Update status
      </label>
      <select
        id={`status-${patient.id}`}
        value={patient.status}
        onChange={(e) =>
          onStatusChange(patient.id, e.target.value as Patient['status'])
        }
        className="w-full text-xs rounded border px-2 py-1.5"
        style={{
          borderColor: 'var(--color-app-border)',
          backgroundColor: 'var(--color-app-bg)',
          color: 'var(--color-app-text)',
        }}
      >
        {STATUSES.map((s) => (
          <option key={s} value={s}>
            {s}
          </option>
        ))}
      </select>
    </div>
    <div className="flex gap-2">
      <button
        onClick={onViewDetails}
        className="flex-1 px-3 py-1.5 text-xs font-medium rounded border transition-colors"
        style={{
          borderColor: 'var(--color-app-border)',
          color: 'var(--color-app-primary)',
        }}
      >
        View Details
      </button>
      <button
        onClick={onRemove}
        className="px-3 py-1.5 text-xs font-medium rounded transition-colors text-white hover:bg-[var(--color-app-danger-hover)] bg-[var(--color-app-danger)]"
      >
        Remove
      </button>
    </div>
  </div>
);
