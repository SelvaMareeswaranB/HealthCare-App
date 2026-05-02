import AnalyticsCard from "./AnalyticsCard";

const AnalyticsStats = () => {
  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
      <AnalyticsCard
        title="Monthly Revenue"
        value="$32,000"
      />

      <AnalyticsCard
        title="Total Patients"
        value="1,248"
      />

      <AnalyticsCard
        title="Appointments"
        value="864"
      />

      <AnalyticsCard
        title="Satisfaction"
        value="4.8/5"
      />
    </div>
  );
};

export default AnalyticsStats;