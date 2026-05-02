const DashboardHeader = () => {
  return (
    <div className="mb-6 md:mb-8">
      <h1 className="text-3xl font-bold text-app-text md:text-4xl">
        Healthcare Dashboard
      </h1>

      <p className="mt-2 text-sm text-app-text-muted md:text-base">
        Monitor patients, appointments, and healthcare analytics
      </p>
    </div>
  );
};

export default DashboardHeader;