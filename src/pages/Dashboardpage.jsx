import React from "react";
// import "../../src/css/dashboard.css";
import Sidebar from "../components/dashboard/Sidebar";
import Topbar from "../components/dashboard/Topbar";
import StatStrip from "../components/dashboard/Statstrip";
import SeverityCards from "../components/dashboard/Severitycards";
import ScansTable from "../components/dashboard/Scanstable";
import { scanRows, severityStats, summaryStrip } from "../components/dashboard/mockData";

export default function Dashboardpage() {
  return (
    <div className="dbRoot">
      <Sidebar />

      <main className="dbMain">
      <Topbar mode="dashboard" title="Dashboard" />

        <div className="dbContent">
          <StatStrip data={summaryStrip} />
          <SeverityCards items={severityStats} />
          <ScansTable rows={scanRows} />
        </div>
      </main>
    </div>
  );
}