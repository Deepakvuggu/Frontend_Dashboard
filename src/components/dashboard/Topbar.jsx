import React, { useEffect, useState } from "react";
import icSun from "../../assets/icons/light.png";
import icMoon from "../../assets/icons/moon.png";

export default function Topbar({
    mode = "dashboard",           // "dashboard" | "scan"
    title = "Dashboard",          // dashboard title
    crumbs = null,                // optional breadcrumb array for dashboard too
}) {
    const [theme, setTheme] = useState(() => localStorage.getItem("aps_theme") || "light");

    useEffect(() => {
        document.documentElement.setAttribute("data-theme", theme);
        localStorage.setItem("aps_theme", theme);
    }, [theme]);

    const toggle = () => setTheme((t) => (t === "dark" ? "light" : "dark"));

    // Breadcrumbs:
    // - scan mode: fixed crumbs like screenshot
    // - dashboard: show a single "Dashboard" crumb (shot-1 style)
    const effectiveCrumbs =
        mode === "scan"
            ? [
                { label: "Scan", tone: "normal" },
                { label: "Private Assets", tone: "muted" },
                { label: "New Scan", tone: "link" },
            ]
            : crumbs ?? [{ label: title, tone: "normal" }];

    return (
        <header className="dbTopbar">
            <div className="dbTopLeft">
                <div className="dbCrumbs">
                    {effectiveCrumbs.map((c, idx) => (
                        <React.Fragment key={`${c.label}-${idx}`}>
                            {idx > 0 && <span className="dbSlash">/</span>}
                            <span
                                className={
                                    c.tone === "muted"
                                        ? "dbCrumb dbCrumbMuted"
                                        : c.tone === "link"
                                            ? "dbCrumb dbCrumbLink"
                                            : "dbCrumb"
                                }
                            >
                                {c.label}
                            </span>
                        </React.Fragment>
                    ))}
                </div>
            </div>

            <div className="dbTopRight">
                {/* ✅ Toggle icon LEFT of export (for dashboard + scan) */}
                <button className="dbIconBtn" onClick={toggle} type="button" aria-label="Toggle theme">
                    <img
                        src={theme === "dark" ? icSun : icMoon}
                        alt=""
                        className="dbIconImg"
                        aria-hidden="true"
                    />
                </button>

                {/* ✅ Scan actions only on scan page */}
                {mode === "scan" && (
                    <>
                        <button className="dbBtn" type="button">
                            Export Report
                        </button>
                        <button className="dbBtn dbBtnDanger" type="button">
                            Stop Scan
                        </button>
                    </>
                )}
            </div>
        </header>
    );
}