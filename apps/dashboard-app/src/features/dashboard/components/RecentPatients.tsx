import { mockPatients } from "@repo/mock-data";
import PatientRow from "./PatientRow";

const RecentPatients = () => {
  return (
    <div className="rounded-3xl border border-app-border bg-app-surface p-6">
      <div className="mb-5 flex items-center justify-between">
        <h2 className="text-lg font-semibold text-app-text">
          Recent Patients
        </h2>

        <button className="text-sm font-medium text-app-primary">
          View All
        </button>
      </div>

      <div className="space-y-4">
        {mockPatients.map((patient) => (
          <PatientRow
            key={patient.id}
            patient={patient}
          />
        ))}
      </div>
    </div>
  );
};

export default RecentPatients;