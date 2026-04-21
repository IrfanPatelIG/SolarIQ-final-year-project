import { useState } from "react";

import Sidebar from "../components/dashboard/Sidebar";
import Header from "../components/dashboard/Header";

import LineChartCard from "../components/dashboard/LineChartCard";
import BarChartCard from "../components/dashboard/BarChartCard";
import PredictionChart from "../components/dashboard/PredictionChart";
import Insights from "../components/dashboard/Insights";
import PanelCard from "../components/dashboard/PanelCard";
import Alerts from "../components/dashboard/Alerts";

import StatCard from "../components/dashboard/StatCard";
import Card from "../components/dashboard/Card";

export default function Dashboard() {
  const [open, setOpen] = useState(true);

  return (
    <div className="flex min-h-screen bg-[#ffffff]">

      {/* Sidebar */}
      <Sidebar open={open} setOpen={setOpen} />

      {/* Main Content */}
      <div
        className={`flex-1 p-6 space-y-6 transition-all duration-300 ${
          open ? "ml-64" : "ml-16"
        }`}
      >
        <Header />

        {/* KPI CARDS */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <StatCard
            title="Current Weather"
            value="26°C"
            sub="Sunny"
            variant="weather"
          />

          <StatCard
            title="Energy Forecast"
            value="5.2 kWh"
            sub="Predicted"
            variant="energy"
          />

          <StatCard
            title="System Efficiency"
            value="82%"
            sub="Efficient"
            variant="efficiency"
          />
        </div>

        {/* MAIN CONTENT */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <LineChartCard/>
            <PredictionChart />
            <BarChartCard />
            <PanelCard />
            <Alerts />
            <Insights />
        </div>
      </div>
    </div>
  );
}