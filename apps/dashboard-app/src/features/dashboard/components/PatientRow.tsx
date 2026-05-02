import type { Patient } from "@repo/mock-data";

interface Props {
  patient: Patient;
}

const PatientRow = ({ patient }: Props) => {
  const getStatusStyles = () => {
    switch (patient.status) {
      case "Active":
        return "bg-green-500/20 text-green-400";

      case "Critical":
        return "bg-red-500/20 text-red-400";

      default:
        return "bg-gray-500/20 text-gray-300";
    }
  };

  return (
    <div className="flex flex-col gap-4 rounded-2xl border border-app-border bg-app-surface-2 p-4 sm:flex-row sm:items-center sm:justify-between">
      <div className="flex items-center gap-4">
        <div className="flex h-12 w-12 items-center justify-center rounded-full bg-app-primary text-lg font-bold text-app-bg">
          {patient.name.charAt(0)}
        </div>

        <div>
          <h3 className="font-semibold text-app-text">
            {patient.name}
          </h3>

          <p className="text-sm text-app-text-muted">
            {patient.department} • {patient.diagnosis}
          </p>
        </div>
      </div>

      <div className="flex flex-col items-start gap-2 sm:items-end">
        <span
          className={`rounded-full px-3 py-1 text-xs font-semibold ${getStatusStyles()}`}
        >
          {patient.status}
        </span>

        <p className="text-sm text-app-text-muted">
          ${patient.billAmount.toLocaleString()}
        </p>
      </div>
    </div>
  );
};

export default PatientRow;