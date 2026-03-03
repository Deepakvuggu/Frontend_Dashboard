import React from "react";
import clockIcon from "../../assets/icons/refresh.png";

export default function Statstrip({ data }) {
  return (
    <div className="dbStrip">
      <div className="dbStripItem">
        <span className="dbStripLabel">Org:</span>
        <span className="dbStripValue">{data.org}</span>
      </div>
      <div className="dbStripItem">
        <span className="dbStripLabel">Owner:</span>
        <span className="dbStripValue">{data.owner}</span>
      </div>
      <div className="dbStripItem">
        <span className="dbStripLabel">Total Scans:</span>
        <span className="dbStripValue">{data.totalScans}</span>
      </div>
      <div className="dbStripItem">
        <span className="dbStripLabel">Scheduled:</span>
        <span className="dbStripValue">{data.scheduled}</span>
      </div>
      <div className="dbStripItem">
        <span className="dbStripLabel">Rescans:</span>
        <span className="dbStripValue">{data.rescans}</span>
      </div>
      <div className="dbStripItem">
        <span className="dbStripLabel">Failed Scans:</span>
        <span className="dbStripValue">{data.failedScans}</span>
      </div>

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