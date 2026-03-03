import React from "react";

export default function Themetoggle({ theme, onToggle }) {
  return (
    <button className="themeToggle themeToggleDash" onClick={onToggle} type="button" aria-label="Toggle theme">
      <span className="togglePill">
        <span className={`toggleKnob ${theme === "dark" ? "isDark" : "isLight"}`} />
      </span>
      <span className="toggleLabel">{theme === "dark" ? "Dark" : "Light"}</span>
    </button>
  );
}