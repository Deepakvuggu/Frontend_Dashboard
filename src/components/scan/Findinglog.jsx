import React from "react";

function SevPill({ sev }) {
    const cls =
        sev === "Critical"
            ? "sevPill crit"
            : sev === "High"
                ? "sevPill high"
                : "sevPill med";
    return <span className={cls}>{sev}</span>;
}

export default function Findinglog({ items }) {
    return (
        <aside className="findingPanel">
            <div className="findingHeader">Finding Log</div>

            <div className="findingList">
                {items.map((f) => (
                    <div key={f.id} className="findingCard">
                        <div className="findingTop">
                            <SevPill sev={f.sev} />
                            <div className="findingTime">{f.time}</div>
                        </div>

                        <div className="findingTitle">{f.title}</div>
                        <div className="findingPath">{f.path}</div>
                        <div className="findingDesc">{f.desc}</div>
                    </div>
                ))}
            </div>
        </aside>
    );
}