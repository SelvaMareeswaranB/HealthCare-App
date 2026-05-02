import { departmentData } from "../constants/analytics.data.ts";

const DepartmentChart = () => {
  const maxPatients = Math.max(...departmentData.map((item) => item.patients));

  return (
    <div className="rounded-3xl border border-app-border bg-app-surface p-6">
      <div className="mb-6">
        <h2 className="text-lg font-semibold text-app-text">
          Department Performance
        </h2>

        <p className="text-sm text-app-text-muted">
          Patients handled by each department
        </p>
      </div>

      <div className="space-y-4">
        {departmentData.map((item) => (
          <div key={item.department} className="space-y-1">
            <div className="flex items-center justify-between text-sm">
              <span className="text-app-text-muted">{item.department}</span>
              <span className="font-medium text-app-text">{item.patients} patients</span>
            </div>
            <div className="h-3 w-full rounded bg-slate-700/40">
              <div
                className="h-3 rounded bg-blue-400"
                style={{ width: `${(item.patients / maxPatients) * 100}%` }}
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default DepartmentChart;