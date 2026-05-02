import React from 'react';
import type { Patient } from '../../@types';
import { PatientCardHeader } from './PatientCardHeader';
import { PatientCardStatus } from './PatientCardStatus';
import { PatientCardActions } from './PatientCardActions';

interface PatientCardProps {
    patient: Patient;
    onViewDetails: (id: string) => void;
    onRemove: (id: string) => void;
    onStatusChange: (id: string, status: Patient['status']) => void;
}

export const PatientCard: React.FC<PatientCardProps> = ({ patient, onViewDetails, onRemove, onStatusChange }) => {
    return (
        <div

            className="p-5 rounded-xl border shadow-sm transition-shadow hover:shadow-md flex flex-col justify-between h-auto"
            style={{
                backgroundColor: 'var(--color-app-surface)',
                borderColor: 'var(--color-app-border)',
                color: 'var(--color-app-text)'
            }}
        >
            <PatientCardHeader patient={patient} />
            <PatientCardStatus patient={patient} />
            <PatientCardActions
                patient={patient}
                onViewDetails={() => onViewDetails(patient.id)}
                onRemove={() => onRemove(patient.id)}
                onStatusChange={onStatusChange}
            />
        </div>
    );
};