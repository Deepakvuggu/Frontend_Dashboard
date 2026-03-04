import React from "react";

function SevPill({ sev }) {
    const toneMap = {
        Critical: "crit",
        High: "high",
        Medium: "med",
    };

    const tone = toneMap[sev] || "med";

    return <span className={`sevPill ${tone}`}>{sev}</span>;
}

export default function FindingLog({ items = [] }) {
    return (
        <aside className="findingPanel">
            <div className="findingHeader">Finding Log</div>

            <div className="findingList">
                {items.map((item) => (
                    <div key={item.id} className="findingCard">
                        <div className="findingTop">
                            <SevPill sev={item.sev} />
                            <div className="findingTime">{item.time}</div>
                        </div>

                        <div className="findingTitle">{item.title}</div>
                        <div className="findingPath">{item.path}</div>
                        <div className="findingDesc">{item.desc}</div>
                    </div>
                ))}
            </div>
        </aside>
    );
}