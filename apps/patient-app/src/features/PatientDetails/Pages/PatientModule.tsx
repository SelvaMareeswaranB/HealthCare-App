// src/features/PatientDetails/PatientModule.tsx
import React, { useState } from 'react';
import type { Patient, ViewMode } from '../@types';
import { mockPatients } from '@repo/mock-data';
import { notifyPatientCriticalStatus } from '@repo/auth/criticalNotification';
import { ViewToggle } from '../components/ViewToggle/ViewToggle';
import { PatientCard } from '../components/PatientCard/PatientCard';
import { PatientListItem } from '../components/PatientListItem/PatientListItem';

export const PatientModule: React.FC = () => {
  const [viewMode, setViewMode] = useState<ViewMode>('grid');
  const [patients, setPatients] = useState(mockPatients);

  const handleViewDetails = (id: string) => {
    alert(`View details for patient ID: ${id}`);
  };

  const handleRemove = (id: string) => {
    setPatients((prev) => prev.filter((p) => p.id !== id));
  };

  const handleStatusChange = (id: string, nextStatus: Patient['status']) => {
    const current = patients.find((p) => p.id === id);
    if (
      current &&
      nextStatus === 'Critical' &&
      current.status !== 'Critical'
    ) {
      void notifyPatientCriticalStatus({
        name: current.name,
        id: current.id,
      });
    }
    setPatients((prev) =>
      prev.map((p) =>
        p.id === id ? { ...p, status: nextStatus } : p
      )
    );
  };

  return (
    <div
      className="p-6 min-h-screen w-full"
      style={{ backgroundColor: 'var(--color-app-bg)', color: 'var(--color-app-text)' }}
    >
      {/* Header Section */}
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-2xl font-bold" style={{ color: 'var(--color-app-text)' }}>
            Patient Management
          </h1>
          <p className="text-sm" style={{ color: 'var(--color-app-text-muted)' }}>
            Active monitoring and patient directory.
          </p>
        </div>
        <ToggleWrapper currentView={viewMode} onChange={setViewMode} />
      </div>

      {/* Grid View */}
      {viewMode === 'grid' && (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
          {patients.map((patient) => (
            <PatientCard
              key={patient.id}
              patient={patient}
              onViewDetails={handleViewDetails}
              onRemove={handleRemove}
              onStatusChange={handleStatusChange}
            />
          ))}
        </div>
      )}

      {/* List View */}
      {viewMode === 'list' && (
        <div className="flex flex-col gap-3">
          {patients.map((patient) => (
            <PatientListItem
              key={patient.id}
              patient={patient}
              onViewDetails={handleViewDetails}
              onRemove={handleRemove}
              onStatusChange={handleStatusChange}
            />
          ))}
        </div>
      )}

      {/* Empty State */}
      {patients.length === 0 && (
        <div
          className="flex flex-col items-center justify-center p-12 border-2 border-dashed rounded-xl mt-6"
          style={{ borderColor: 'var(--color-app-border)' }}
        >
          <p style={{ color: 'var(--color-app-text-muted)' }}>No patients found.</p>
        </div>
      )}
    </div>
  );
};

// Helper sub-component to ensure types work correctly locally
const ToggleWrapper: React.FC<{
  currentView: ViewMode;
  onChange: (view: ViewMode) => void;
}> = ({ currentView, onChange }) => {
  return <ViewToggle currentView={currentView} onChange={onChange} />;
};

export default PatientModule;
