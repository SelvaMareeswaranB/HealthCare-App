import {
  Activity,
  AlertTriangle,
  DollarSign,
  Users,
} from "lucide-react";

import { useDashboardStats } from "../hooks/useDashboardStats";

const StatsCards = () => {
  const {
    totalPatients,
    activePatients,
    criticalPatients,
    totalRevenue,
  } = useDashboardStats();

  const stats = [
    {
      title: "Total Patients",
      value: totalPatients,
      icon: Users,
    },
    {
      title: "Active Patients",
      value: activePatients,
      icon: Activity,
    },
    {
      title: "Critical Cases",
      value: criticalPatients,
      icon: AlertTriangle,
    },
    {
      title: "Revenue",
      value: `$${totalRevenue.toLocaleString()}`,
      icon: DollarSign,
    },
  ];

  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
      {stats.map((card) => {
        const Icon = card.icon;

        return (
          <div
            key={card.title}
            className="rounded-3xl border border-app-border bg-app-surface p-5"
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-app-text-muted">
                  {card.title}
                </p>

                <h2 className="mt-2 text-3xl font-bold text-app-text">
                  {card.value}
                </h2>
              </div>

              <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-app-primary/20">
                <Icon className="text-app-primary" size={28} />
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default StatsCards;