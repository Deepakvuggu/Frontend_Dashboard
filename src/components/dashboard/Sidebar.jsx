import React from "react";
import { useNavigate } from "react-router-dom";

// import png icons
import icDashboard from "../../assets/icons/dashboard.png";
import icProjects from "../../assets/icons/projects.png";
import icScans from "../../assets/icons/scans.png";
import icSchedule from "../../assets/icons/schedule.png";
import icNotifications from "../../assets/icons/bell.png";
import icSettings from "../../assets/icons/settings.png";
import icSupport from "../../assets/icons/support.png";

const nav = [
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

    const handleNav = (path) => {
        navigate(path);
    };

    return (
        <aside className="dbSidebar">
            <div className="dbBrand">
                <span className="dbBrandDot" />
                <span className="dbBrandText">aps</span>
            </div>

            <nav className="dbNav">
                {nav.slice(0, 4).map((i) => (
                    <button
                        key={i.label}
                        className="dbNavItem"
                        type="button"
                        onClick={() => handleNav(i.path)}
                    >
                        <img className="dbNavPng" src={i.icon} alt="" aria-hidden="true" />
                        <span>{i.label}</span>
                    </button>
                ))}

                <div className="dbNavDivider" />

                {nav.slice(4).map((i) => (
                    <button
                        key={i.label}
                        className="dbNavItem"
                        type="button"
                        onClick={() => handleNav(i.path)}
                    >
                        <img className="dbNavPng" src={i.icon} alt="" aria-hidden="true" />
                        <span>{i.label}</span>
                    </button>
                ))}
            </nav>

            <div className="dbUser">
                <div className="dbAvatar" aria-hidden="true" />
                <div className="dbUserMeta">
                    <div className="dbUserEmail">admin@edu.com</div>
                    <div className="dbUserRole">Security Lead</div>
                </div>
                <button className="dbChevron" type="button" aria-label="Open user menu">
                    ›
                </button>
            </div>
        </aside>
    );
}