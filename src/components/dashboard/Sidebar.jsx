import React from "react";
import { useNavigate } from "react-router-dom";

// PNG icons
import icDashboard from "../../assets/icons/dashboard.png";
import icProjects from "../../assets/icons/projects.png";
import icScans from "../../assets/icons/scans.png";
import icSchedule from "../../assets/icons/schedule.png";
import icNotifications from "../../assets/icons/bell.png";
import icSettings from "../../assets/icons/settings.png";
import icSupport from "../../assets/icons/support.png";

const NAV_ITEMS = [
    { label: "Dashboard", icon: icDashboard, path: "/dashboard" },
    { label: "Projects", icon: icProjects, path: "/projects" },
    { label: "Scans", icon: icScans, path: "/scan" },
    { label: "Schedule", icon: icSchedule, path: "/schedule" },

    { label: "Notifications", icon: icNotifications, path: "/notifications" },
    { label: "Settings", icon: icSettings, path: "/settings" },
    { label: "Support", icon: icSupport, path: "/support" },
];

export default function Sidebar() {
    const navigate = useNavigate();

    const mainNav = NAV_ITEMS.slice(0, 4);
    const secondaryNav = NAV_ITEMS.slice(4);

    const goTo = (path) => navigate(path);

    return (
        <aside className="dbSidebar">
            {/* Brand */}
            <div className="dbBrand">
                <span className="dbBrandDot" />
                <span className="dbBrandText">aps</span>
            </div>

            {/* Navigation */}
            <nav className="dbNav" aria-label="Sidebar navigation">
                {mainNav.map((item) => (
                    <button
                        key={item.label}
                        type="button"
                        className="dbNavItem"
                        onClick={() => goTo(item.path)}
                    >
                        <img
                            className="dbNavPng"
                            src={item.icon}
                            alt=""
                            aria-hidden="true"
                        />
                        <span>{item.label}</span>
                    </button>
                ))}

                <div className="dbNavDivider" />

                {secondaryNav.map((item) => (
                    <button
                        key={item.label}
                        type="button"
                        className="dbNavItem"
                        onClick={() => goTo(item.path)}
                    >
                        <img
                            className="dbNavPng"
                            src={item.icon}
                            alt=""
                            aria-hidden="true"
                        />
                        <span>{item.label}</span>
                    </button>
                ))}
            </nav>

            {/* User */}
            <div className="dbUser">
                <div className="dbAvatar" aria-hidden="true" />

                <div className="dbUserMeta">
                    <div className="dbUserEmail">admin@edu.com</div>
                    <div className="dbUserRole">Security Lead</div>
                </div>

                <button type="button" className="dbChevron" aria-label="Open user menu">
                    ›
                </button>
            </div>
        </aside>
    );
}