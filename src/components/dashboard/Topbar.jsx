import React, { useEffect, useMemo, useState } from "react";
import icSun from "../../assets/icons/light.png";
import icMoon from "../../assets/icons/moon.png";

const STORAGE_KEY = "aps_theme";

const getInitialTheme = () => localStorage.getItem(STORAGE_KEY) || "light";

const defaultScanCrumbs = [
    { label: "Scan", tone: "normal" },
    { label: "Private Assets", tone: "muted" },
    { label: "New Scan", tone: "link" },
];

export default function Topbar({
    mode = "dashboard", // "dashboard" | "scan"
    title = "Dashboard",
    crumbs = null, // optional breadcrumb array
}) {
    const [theme, setTheme] = useState(getInitialTheme);

    const isDark = theme === "dark";

    useEffect(() => {
        document.documentElement.setAttribute("data-theme", theme);
        localStorage.setItem(STORAGE_KEY, theme);
    }, [theme]);

    const toggleTheme = () => {
        setTheme((prev) => (prev === "dark" ? "light" : "dark"));
    };

    // Breadcrumb strategy:
    // - scan: fixed (matches screenshot)
    // - dashboard: title (or override via `crumbs`)
    const effectiveCrumbs = useMemo(() => {
        if (mode === "scan") return defaultScanCrumbs;
        return crumbs?.length ? crumbs : [{ label: title, tone: "normal" }];
    }, [mode, crumbs, title]);

    const crumbClass = (tone) => {
        if (tone === "muted") return "dbCrumb dbCrumbMuted";
        if (tone === "link") return "dbCrumb dbCrumbLink";
        return "dbCrumb";
    };

    return (
        <header className="dbTopbar">
            <div className="dbTopLeft">
                <nav className="dbCrumbs" aria-label="Breadcrumb">
                    {effectiveCrumbs.map((c, idx) => (
                        <React.Fragment key={`${c.label}-${idx}`}>
                            {idx > 0 && <span className="dbSlash">/</span>}
                            <span className={crumbClass(c.tone)}>{c.label}</span>
                        </React.Fragment>
                    ))}
                </nav>
            </div>

            <div className="dbTopRight">
                {/* Theme toggle (icon left of actions) */}
                <button
                    type="button"
                    className="dbIconBtn"
                    onClick={toggleTheme}
                    aria-label="Toggle theme"
                >
                    <img
                        src={isDark ? icSun : icMoon}
                        alt=""
                        className="dbIconImg"
                        aria-hidden="true"
                    />
                </button>

                {/* Scan-only actions */}
                {mode === "scan" && (
                    <>
                        <button type="button" className="dbBtn">
                            Export Report
                        </button>

                        <button type="button" className="dbBtn dbBtnDanger">
                            Stop Scan
                        </button>
                    </>
                )}
            </div>
        </header>
    );
}