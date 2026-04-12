import Sidebar from "../components/dashboard/Sidebar";
import Header from "../components/dashboard/Header";
import LineChartCard from "../components/dashboard/LineChartCard";
import BarChartCard from "../components/dashboard/BarChartCard";
import PredictionChart from "../components/dashboard/PredictionChart";
import Notifications from "../components/dashboard/Alerts";
import Insights from "../components/dashboard/Insights";
import PanelCard from "../components/dashboard/PanelCard";

export default function Dashboard() {
  return (
    <div className="flex min-h-screen bg-[#0A0F1C] text-white">
      
      {/* Sidebar */}
      <Sidebar />

      {/* Main */}
      <div className="flex-1 p-6">
        
        <Header />
        {/* 📊 CHARTS */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
        <LineChartCard />
        <PredictionChart />
        <BarChartCard />
        <PanelCard/>
        </div>

        {/* 🔔 INSIGHTS + NOTIFICATIONS */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <Insights />
          <Notifications />
        </div>

      </div>
    </div>
  );
}