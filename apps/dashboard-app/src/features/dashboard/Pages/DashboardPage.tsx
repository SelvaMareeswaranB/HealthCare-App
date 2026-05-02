import AppointmentProgress from "../components/AppointmentProgress";
import DashboardHeader from "../components/DashboardHeader";
import RecentPatients from "../components/RecentPatients";
import StatsCards from "../components/StatsCards";

const DashboardPage = () => {
    return (
        <div className="min-h-screen bg-app-bg p-4 md:p-6">
            <DashboardHeader />
            <StatsCards />
            <div className="mt-6 grid grid-cols-1 gap-6 xl:grid-cols-12">
                <div className="xl:col-span-4">
                    <AppointmentProgress />
                </div>

                <div className="xl:col-span-8">
                    <RecentPatients />
                </div>
            </div>
        </div>
    );
};

export default DashboardPage;