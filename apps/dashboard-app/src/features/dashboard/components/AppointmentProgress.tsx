import { useDashboardStats } from "../hooks/useDashboardStats";

const AppointmentProgress = () => {
  const {
    completionRate,
    completedAppointments,
    totalPatients,
  } = useDashboardStats();

  return (
    <div className="h-full rounded-3xl border border-app-border bg-app-surface p-6">
      <h2 className="text-lg font-semibold text-app-text">
        Appointment Completion
      </h2>

      <div className="mt-6">
        <h1 className="text-5xl font-bold text-app-text">
          {completionRate}%
        </h1>

        <p className="mt-2 text-app-text-muted">
          Completed appointments
        </p>
      </div>

      <div className="mt-6 h-3 overflow-hidden rounded-full bg-app-surface-2">
        <div
          className="h-full rounded-full bg-app-primary transition-all"
          style={{
            width: `${completionRate}%`,
          }}
        />
      </div>

      <div className="mt-6">
        <h3 className="text-lg font-semibold text-app-text">
          {completedAppointments} of {totalPatients}
        </h3>

        <p className="text-app-text-muted">
          appointments completed
        </p>
      </div>
    </div>
  );
};

export default AppointmentProgress;