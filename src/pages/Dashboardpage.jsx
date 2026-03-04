import React from "react";

// Layout components
import Sidebar from "../components/dashboard/Sidebar";
import Topbar from "../components/dashboard/Topbar";

// Dashboard widgets
import StatStrip from "../components/dashboard/Statstrip";
import SeverityCards from "../components/dashboard/Severitycards";
import ScansTable from "../components/dashboard/Scanstable";

// Mock data
import {
  scanRows,
  severityStats,
  summaryStrip
} from "../components/dashboard/mockData";


const DashboardPage = () => {
  return (
    <div className="dbRoot">

      {/* Left navigation */}
      <Sidebar />

      {/* Main dashboard area */}
      <main className="dbMain">

        {/* Top header */}
        <Topbar mode="dashboard" title="Dashboard" />

        {/* Dashboard content */}
        <div className="dbContent">

          {/* Summary statistics */}
          <StatStrip data={summaryStrip} />

          {/* Severity overview */}
          <SeverityCards items={severityStats} />

          {/* Scan results table */}
          <ScansTable rows={scanRows} />

        </div>

      </main>
    </div>
  );
};

export default DashboardPage;