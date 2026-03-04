import React from "react";

// Layout components
import Sidebar from "../components/dashboard/Sidebar";
import Topbar from "../components/dashboard/Topbar";

// Scan page components
import ScanHeader from "../components/scan/Scanheader";
import LiveConsole from "../components/scan/Liveconsole";
import FindingLog from "../components/scan/Findinglog";
import BottomBar from "../components/scan/Bottombar";

// Mock data
import {
    scanHeaderData,
    activityLog,
    findingLog,
    bottomStats
} from "../components/scan/mockdata";


const ScanPage = () => {
    return (
        <div className="dbRoot">

            {/* Left sidebar navigation */}
            <Sidebar />

            <main className="dbMain">

                {/* Top header */}
                <Topbar mode="scan" />

                {/* Scan page content */}
                <div className="scanPage">

                    {/* Scan information header */}
                    <ScanHeader data={scanHeaderData} />

                    {/* Main scan activity section */}
                    <div className="scanBodyGrid">
                        <LiveConsole logs={activityLog} />
                        <FindingLog items={findingLog} />
                    </div>

                </div>

                {/* Bottom scan status bar */}
                <BottomBar data={bottomStats} />

            </main>
        </div>
    );
};

export default ScanPage;