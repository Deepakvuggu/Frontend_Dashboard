import React, { useMemo, useState } from "react";

import searchIcon from "../../assets/icons/search.png";
import filterIcon from "../../assets/icons/filter.png";
import columnsIcon from "../../assets/icons/columns.png";

const getStatusClass = (status) => {
    if (status === "Completed") return "statusBadge isDone";
    if (status === "Scheduled") return "statusBadge isScheduled";
    return "statusBadge isFailed";
};

function StatusBadge({ status }) {
    return <span className={getStatusClass(status)}>{status}</span>;
}

function ProgressBar({ value = 0 }) {
    const pct = Math.max(0, Math.min(100, Number(value) || 0));

    return (
        <div className="progWrap">
            <div className="progTrack">
                <div className="progBar" style={{ width: `${pct}%` }} />
            </div>
            <span className="progText">{pct}%</span>
        </div>
    );
}

function Chip({ tone, children }) {
    return <span className={`vChip ${tone}`}>{children}</span>;
}

export default function ScansTable({ rows = [] }) {
    const [query, setQuery] = useState("");

    const filteredRows = useMemo(() => {
        const q = query.trim().toLowerCase();
        if (!q) return rows;

        return rows.filter((r) => {
            const name = (r.name || "").toLowerCase();
            const type = (r.type || "").toLowerCase();
            const status = (r.status || "").toLowerCase();

            return name.includes(q) || type.includes(q) || status.includes(q);
        });
    }, [query, rows]);

    return (
        <section className="tableCard">
            {/* Toolbar */}
            <div className="tableToolbar">
                <div className="searchWrap">
                    <img src={searchIcon} alt="" className="searchIconImg" aria-hidden="true" />
                    <input
                        className="searchInput"
                        placeholder="Search scans by name or type..."
                        value={query}
                        onChange={(e) => setQuery(e.target.value)}
                    />
                </div>

                <div className="toolBtns">
                    <button className="toolBtn" type="button">
                        <img src={filterIcon} alt="" className="toolIconImg" aria-hidden="true" />
                        Filter
                    </button>

                    <button className="toolBtn" type="button">
                        <img src={columnsIcon} alt="" className="toolIconImg" aria-hidden="true" />
                        Column
                    </button>

                    <button className="toolBtn toolBtnPrimary" type="button">
                        + New scan
                    </button>
                </div>
            </div>

            {/* Header */}
            <div className="tableHead">
                <div>Scan Name</div>
                <div>Type</div>
                <div>Status</div>
                <div>Progress</div>
                <div>Vulnerability</div>
                <div className="right">Last Scan</div>
            </div>

            {/* Rows */}
            <div className="tableBody">
                {filteredRows.map((row) => (
                    <div key={row.id} className="tableRow">
                        <div className="cell strong">{row.name}</div>
                        <div className="cell">{row.type}</div>

                        <div className="cell">
                            <StatusBadge status={row.status} />
                        </div>

                        <div className="cell">
                            <ProgressBar value={row.progress} />
                        </div>

                        <div className="cell">
                            <div className="vChips">
                                <Chip tone="crit">{row.vulns?.critical}</Chip>
                                <Chip tone="high">{row.vulns?.high}</Chip>
                                <Chip tone="med">{row.vulns?.medium}</Chip>
                                <Chip tone="low">{row.vulns?.low}</Chip>
                            </div>
                        </div>

                        <div className="cell right muted">{row.lastScan}</div>
                    </div>
                ))}

                {filteredRows.length === 0 && (
                    <div className="tableEmpty">No scans match your search.</div>
                )}
            </div>
        </section>
    );
}