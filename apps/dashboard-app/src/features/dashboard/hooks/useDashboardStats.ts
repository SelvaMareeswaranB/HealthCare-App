import { mockPatients } from "@repo/mock-data";

export const useDashboardStats = () => {
  const totalPatients = mockPatients.length;

  const activePatients = mockPatients.filter(
    (patient) => patient.status === "Active",
  ).length;

  const criticalPatients = mockPatients.filter(
    (patient) => patient.status === "Critical",
  ).length;

  const totalRevenue = mockPatients.reduce(
    (acc, patient) => acc + patient.billAmount,
    0,
  );

  const completedAppointments = mockPatients.filter(
    (patient) => patient.appointmentStatus === "Completed",
  ).length;

  const completionRate = Math.round(
    (completedAppointments / totalPatients) * 100,
  );

  return {
    totalPatients,
    activePatients,
    criticalPatients,
    totalRevenue,
    completedAppointments,
    completionRate,
  };
};