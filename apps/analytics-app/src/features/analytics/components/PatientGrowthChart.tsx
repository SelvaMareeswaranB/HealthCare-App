import { patientGrowthData } from "../constants/analytics.data";

const PatientGrowthChart = () => {
  const maxPatients = Math.max(...patientGrowthData.map((item) => item.patients));

  return (
    <div className="rounded-3xl border border-app-border bg-app-surface p-6">
      <div className="mb-6">
        <h2 className="text-lg font-semibold text-app-text">
          Patient Growth
        </h2>

        <p className="text-sm text-app-text-muted">
          Monthly patient registration trend
        </p>
      </div>

      <div className="space-y-4">
        {patientGrowthData.map((item) => (
          <div key={item.month} className="space-y-1">
            <div className="flex items-center justify-between text-sm">
              <span className="text-app-text-muted">{item.month}</span>
              <span className="font-medium text-app-text">{item.patients} patients</span>
            </div>
            <div className="h-2 w-full rounded-full bg-slate-700/40">
              <div
                className="h-2 rounded-full bg-blue-400"
                style={{ width: `${(item.patients / maxPatients) * 100}%` }}
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PatientGrowthChart;