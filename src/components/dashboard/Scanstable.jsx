import React, { useMemo, useState } from "react";
import search from '../../assets/icons/search.png';
import filterIcon from "../../assets/icons/filter.png";
import columnsIcon from "../../assets/icons/columns.png";

function StatusBadge({ status }) {
    const cls =
        status === "Completed"
            ? "statusBadge isDone"
            : status === "Scheduled"
                ? "statusBadge isScheduled"
                : "statusBadge isFailed";

    return <span className={cls}>{status}</span>;
}

function ProgressBar({ value }) {
    return (
        <div className="progWrap">
            <div className="progTrack">
                <div className="progBar" style={{ width: `${value}%` }} />
            </div>
            <span className="progText">{value}%</span>
        </div>
    );
}

function Chip({ tone, children }) {
    return <span className={`vChip ${tone}`}>{children}</span>;
}

export default function Scanstable({ rows }) {
    const [q, setQ] = useState("");

    const filtered = useMemo(() => {
        const s = q.trim().toLowerCase();
        if (!s) return rows;
        return rows.filter(
            (r) => r.name.toLowerCase().includes(s) || r.type.toLowerCase().includes(s) || r.status.toLowerCase().includes(s)
        );
    }, [q, rows]);

    return (
        <section className="tableCard">
            <div className="tableToolbar">
                <div className="searchWrap">
                    <img
                        src={search}
                        alt=""
                        className="searchIconImg"
                        aria-hidden="true"
                    />
                    <input
                        className="searchInput"
                        placeholder="Search scans by name or type..."
                        value={q}
                        onChange={(e) => setQ(e.target.value)}
                    />
                </div>

                <div className="toolBtns">
                    <button className="toolBtn" type="button">
                        <img
                            src={filterIcon}
                            alt=""
                            className="toolIconImg"
                            aria-hidden="true"
                        />
                        Filter
                    </button>

                    <button className="toolBtn" type="button">
                        <img
                            src={columnsIcon}
                            alt=""
                            className="toolIconImg"
                            aria-hidden="true"
                        />
                        Column
                    </button>

                    <button className="toolBtn toolBtnPrimary" type="button">
                        + New scan
                    </button>
                </div>
            </div>

            <div className="tableHead">
                <div>Scan Name</div>
                <div>Type</div>
                <div>Status</div>
                <div>Progress</div>
                <div>Vulnerability</div>
                <div className="right">Last Scan</div>
            </div>

            <div className="tableBody">
                {filtered.map((r) => (
                    <div key={r.id} className="tableRow">
                        <div className="cell strong">{r.name}</div>
                        <div className="cell">{r.type}</div>
                        <div className="cell">
                            <StatusBadge status={r.status} />
                        </div>
                        <div className="cell">
                            <ProgressBar value={r.progress} />
                        </div>
                        <div className="cell">
                            <div className="vChips">
                                <Chip tone="crit">{r.vulns.critical}</Chip>
                                <Chip tone="high">{r.vulns.high}</Chip>
                                <Chip tone="med">{r.vulns.medium}</Chip>
                                <Chip tone="low">{r.vulns.low}</Chip>
                            </div>
                        </div>
                        <div className="cell right muted">{r.lastScan}</div>
                    </div>
                ))}
            </div>
        </section>
    );
}