import React from "react";
import clockIcon from "../../assets/icons/refresh.png";

export default function StatStrip({ data }) {
  const stats = [
    { label: "Org", value: data.org },
    { label: "Owner", value: data.owner },
    { label: "Total Scans", value: data.totalScans },
    { label: "Scheduled", value: data.scheduled },
    { label: "Rescans", value: data.rescans },
    { label: "Failed Scans", value: data.failedScans },
  ];

  return (
    <div className="dbStrip">
      {/* Left stats */}
      {stats.map((item) => (
        <div className="dbStripItem" key={item.label}>
          <span className="dbStripLabel">{item.label}:</span>
          <span className="dbStripValue">{item.value}</span>
        </div>
      ))}

      {/* Right last updated section */}
      <div className="dbStripRight">
        <img
          src={clockIcon}
          alt=""
          className="dbClockImg"
          aria-hidden="true"
        />
        <span className="dbStripMuted">{data.lastUpdated}</span>
      </div>
    </div>
  );
}