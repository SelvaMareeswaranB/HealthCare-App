import React from 'react';
import type { Patient } from '../../@types';

interface PatientCardStatusProps {
    patient: Patient;
}

export const PatientCardStatus: React.FC<PatientCardStatusProps> = ({ patient }) => (
    <div className="text-sm flex flex-col gap-4">
        <div className="flex justify-between">            <span style={{ color: 'var(--color-app-text-muted)' }}>Patient Id:</span>
            <span style={{ color: 'var(--color-app-text)' }}>
                {patient.id}
            </span>
        </div>
        <div className="flex justify-between">
            <span style={{ color: 'var(--color-app-text-muted)' }}>Age / Gender:</span>
            <span style={{ color: 'var(--color-app-text)' }}>
                {patient.age} / {patient.gender}
            </span>
        </div>
        <div className="flex justify-between">
            <span style={{ color: 'var(--color-app-text-muted)' }}>Diagnosis:</span>
            <span className="truncate max-w-[150px]" style={{ color: 'var(--color-app-text)' }}>
                {patient.diagnosis}
            </span>
        </div>
        <div className="flex justify-between">
            <span style={{ color: 'var(--color-app-text-muted)' }}>Adm. Date:</span>
            <span style={{ color: 'var(--color-app-text)' }}>{patient.admissionDate}</span>
        </div>
    </div>
);