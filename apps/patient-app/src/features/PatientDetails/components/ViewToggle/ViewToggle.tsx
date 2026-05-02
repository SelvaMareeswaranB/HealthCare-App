import React from 'react';
import type { ViewMode } from "../../@types";

interface ViewToggleProps {
    currentView: ViewMode;
    onChange: (view: ViewMode) => void;
}

export const ViewToggle: React.FC<ViewToggleProps> = ({ currentView, onChange }) => {
    return (
        <div
            className="flex rounded-lg p-1 border"
            style={{
                backgroundColor: 'var(--color-app-surface)',
                borderColor: 'var(--color-app-border)'
            }}
        >
            <button
                onClick={() => onChange('grid')}
                className={`px-4 py-2 rounded-md text-sm font-medium transition-all duration-200 ${currentView === 'grid'
                    ? 'shadow-sm'
                    : 'hover:bg-[var(--color-app-surface-2)]'
                    }`}
                style={{
                    backgroundColor: currentView === 'grid' ? 'var(--color-app-primary)' : 'transparent',
                    color: currentView === 'grid' ? '#0b1120' : 'var(--color-app-text)'
                }}
            >
                Grid
            </button>
            <button
                onClick={() => onChange('list')}
                className={`px-4 py-2 rounded-md text-sm font-medium transition-all duration-200 ${currentView === 'list'
                    ? 'shadow-sm'
                    : 'hover:bg-[var(--color-app-surface-2)]'
                    }`}
                style={{
                    backgroundColor: currentView === 'list' ? 'var(--color-app-primary)' : 'transparent',
                    color: currentView === 'list' ? '#0b1120' : 'var(--color-app-text)'
                }}
            >
                List
            </button>
        </div>
    );
};

export default ViewToggle;