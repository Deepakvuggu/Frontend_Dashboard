import React from "react";
// import "../css/scan.css";

import Sidebar from "../components/dashboard/Sidebar";
import Topbar from "../components/dashboard/Topbar";

import ScanHeader from "../components/scan/Scanheader";
import LiveConsole from "../components/scan/Liveconsole";
import FindingLog from "../components/scan/Findinglog";
import BottomBar from "../components/scan/Bottombar";

import { scanHeaderData, activityLog, findingLog, bottomStats } from "../components/scan/mockdata";

export default function Scanpage() {
    return (
        <div className="dbRoot">
            <Sidebar />

            <main className="dbMain">
                <Topbar mode="scan" />

                <div className="scanPage">
                    <ScanHeader data={scanHeaderData} />

                    <div className="scanBodyGrid">
                        <LiveConsole logs={activityLog} />
                        <FindingLog items={findingLog} />
                    </div>
                </div>

                <BottomBar data={bottomStats} />
            </main>
        </div>
    );
}