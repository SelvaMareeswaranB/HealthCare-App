import AnalyticsHeader from "../components/AnalyticsHeader";
import AnalyticsStats from "../components/AnalyticsStats";
import DepartmentChart from "../components/DepartmentChart";
import PatientGrowthChart from "../components/PatientGrowthChart";
import RevenueChart from "../components/RevenueChart";

const AnalyticsPage = () => {
  return (
    <div className="min-h-screen bg-app-bg p-4 md:p-6">
      <AnalyticsHeader />

      <AnalyticsStats />

      <div className="mt-6 grid grid-cols-1 gap-6 xl:grid-cols-2">
        <RevenueChart />

        <PatientGrowthChart />
      </div>

      <div className="mt-6">
        <DepartmentChart />
      </div>
    </div>
  );
};

export default AnalyticsPage;