import React from 'react';
import type { Patient } from '../../@types';

interface PatientCardHeaderProps {
    patient: Patient;
}

export const PatientCardHeader: React.FC<PatientCardHeaderProps> = ({ patient }) => (
    <div className="flex justify-between items-start mb-1">
        <div>
            <h3 className="text-lg font-semibold" style={{ color: 'var(--color-app-text)' }}>
                {patient.name}
            </h3>

        </div>
        <span
            className="text-xs font-medium px-2.5 py-1 rounded-full uppercase"
            style={{
                backgroundColor: patient.status === 'Critical'
                    ? 'rgba(239, 68, 68, 0.1)'
                    : patient.status === 'Active'
                        ? 'rgba(96, 165, 250, 0.1)'
                        : 'rgba(156, 163, 175, 0.1)',
                color: patient.status === 'Critical'
                    ? 'var(--color-app-danger)'
                    : patient.status === 'Active'
                        ? 'var(--color-app-primary)'
                        : 'var(--color-app-text-muted)'
            }}
        >
            {patient.status}
        </span>
    </div>
);