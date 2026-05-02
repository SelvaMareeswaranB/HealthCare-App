import React from 'react';
import type { Patient } from '../../@types';
import { PatientListActions } from './PatientListActions';

interface PatientListItemProps {
    patient: Patient;
    onViewDetails: (id: string) => void;
    onRemove: (id: string) => void;
    onStatusChange: (id: string, status: Patient['status']) => void;
}

const STATUSES: Patient['status'][] = ['Active', 'Discharged', 'Critical'];

export const PatientListItem: React.FC<PatientListItemProps> = ({ patient, onViewDetails, onRemove, onStatusChange }) => {
    return (
        <div
            className="flex items-center justify-between p-4 rounded-lg border transition-colors hover:bg-[rgba(255,255,255,0.01)] min-w-[768px]"
            style={{
                backgroundColor: 'var(--color-app-surface)',
                borderColor: 'var(--color-app-border)',
                color: 'var(--color-app-text)'
            }}
        >
            {/* Patient Info Group - Spreading columns evenly */}
            <div className="grid grid-cols-5 gap-6 items-center flex-1 pr-4">

                {/* ID Column */}
                <div>
                    <span className="block text-xs" style={{ color: 'var(--color-app-text-muted)' }}>ID</span>
                    <span className="text-sm font-medium">{patient.id}</span>
                </div>

                {/* Name Column */}    
                <div>
                    <span className="block text-xs" style={{ color: 'var(--color-app-text-muted)' }}>Name</span>
                    <h4 className="font-semibold text-sm truncate">{patient.name}</h4>
                </div>



                {/* Age/Gender Column */}
                <div>
                    <span className="block text-xs" style={{ color: 'var(--color-app-text-muted)' }}>Age/Gender</span>
                    <span className="text-sm font-medium">{patient.age} / {patient.gender}</span>
                </div>

                {/* Diagnosis Column */}
                <div>
                    <span className="block text-xs" style={{ color: 'var(--color-app-text-muted)' }}>Diagnosis</span>
                    <span className="text-sm font-medium truncate block max-w-[200px]">{patient.diagnosis}</span>
                </div>

                {/* Status Column */}
                <div>
                    <span className="block text-xs" style={{ color: 'var(--color-app-text-muted)' }}>Status</span>
                    <select
                        value={patient.status}
                        onChange={(e) =>
                            onStatusChange(patient.id, e.target.value as Patient['status'])
                        }
                        className="mt-0.5 w-full max-w-[140px] text-xs font-medium uppercase rounded border px-2 py-1"
                        style={{
                            borderColor: 'var(--color-app-border)',
                            backgroundColor: 'var(--color-app-bg)',
                            color: patient.status === 'Critical'
                                ? 'var(--color-app-danger)'
                                : patient.status === 'Active'
                                    ? 'var(--color-app-primary)'
                                    : 'var(--color-app-text-muted)',
                        }}
                    >
                        {STATUSES.map((s) => (
                            <option key={s} value={s}>{s}</option>
                        ))}
                    </select>
                </div>
            </div>

            <PatientListActions
                onViewDetails={() => onViewDetails(patient.id)}
                onRemove={() => onRemove(patient.id)}
            />
        </div>
    );
};