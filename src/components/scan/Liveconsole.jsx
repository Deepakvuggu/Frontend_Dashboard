import React, { useMemo, useState } from "react";

const TABS = {
  activity: "activity",
  loops: "loops",
};

export default function LiveConsole({ logs = [] }) {
  const [tab, setTab] = useState(TABS.activity);

  const activityText = useMemo(() => {
    return logs
      .map((log) => `${log.t} ${log.txt}`)
      .join("\n\n");
  }, [logs]);

  const isActivity = tab === TABS.activity;

  return (
    <section className="scanConsoleCard">
      {/* Header */}
      <div className="scanConsoleTop">
        <div className="scanConsoleTitle">
          <span className="dotLive" aria-hidden="true" />
          Live Scan Console
        </div>

        <div className="scanConsolePill">
          <span className="pillDot" aria-hidden="true" />
          Running...
        </div>

        <div className="scanConsoleRight">
          <button type="button" className="scanIconBtn" aria-label="Collapse">
            ˅
          </button>
          <button type="button" className="scanIconBtn" aria-label="Close">
            ×
          </button>
        </div>
      </div>

      {/* Tabs */}
      <div className="scanConsoleTabs" role="tablist" aria-label="Console tabs">
        <button
          type="button"
          role="tab"
          aria-selected={isActivity}
          className={`scanTab ${isActivity ? "isActive" : ""}`}
          onClick={() => setTab(TABS.activity)}
        >
          Activity Log
        </button>

        <button
          type="button"
          role="tab"
          aria-selected={!isActivity}
          className={`scanTab ${!isActivity ? "isActive" : ""}`}
          onClick={() => setTab(TABS.loops)}
        >
          Verification Loops
        </button>
      </div>

      {/* Body */}
      <div className="scanConsoleBody">
        {isActivity ? (
          <pre className="scanLog">{activityText}</pre>
        ) : (
          <div className="scanEmpty">
            <div className="scanEmptyTitle">No verification loops yet</div>
            <div className="scanEmptySub">
              They will appear here once the scanner begins validating findings.
            </div>
          </div>
        )}
      </div>
    </section>
  );
}