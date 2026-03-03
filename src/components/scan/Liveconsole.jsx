import React, { useMemo, useState } from "react";

export default function Liveconsole({ logs }) {
    const [tab, setTab] = useState("activity");

    const text = useMemo(() => {
        const joined = logs
            .map((l) => `${l.t} ${l.txt}`)
            .join("\n\n");
        return joined;
    }, [logs]);

    return (
        <section className="scanConsoleCard">
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
                    <button className="scanIconBtn" type="button" aria-label="Collapse">
                        ˅
                    </button>
                    <button className="scanIconBtn" type="button" aria-label="Close">
                        ×
                    </button>
                </div>
            </div>

            <div className="scanConsoleTabs">
                <button
                    type="button"
                    className={`scanTab ${tab === "activity" ? "isActive" : ""}`}
                    onClick={() => setTab("activity")}
                >
                    Activity Log
                </button>
                <button
                    type="button"
                    className={`scanTab ${tab === "loops" ? "isActive" : ""}`}
                    onClick={() => setTab("loops")}
                >
                    Verification Loops
                </button>
            </div>

            <div className="scanConsoleBody">
                {tab === "activity" ? (
                    <pre className="scanLog">{text}</pre>
                ) : (
                    <div className="scanEmpty">
                        <div className="scanEmptyTitle">No verification loops yet</div>
                        <div className="scanEmptySub">They will appear here once the scanner begins validating findings.</div>
                    </div>
                )}
            </div>
        </section>
    );
}