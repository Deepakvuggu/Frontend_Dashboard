import React from "react";

const ThemeToggle = ({ theme, onToggle }) => {
  const isDark = theme === "dark";

  return (
    <button
      type="button"
      className="themeToggle themeToggleDash"
      onClick={onToggle}
      aria-label="Toggle theme"
    >
      {/* Toggle switch */}
      <span className="togglePill">
        <span
          className={`toggleKnob ${isDark ? "isDark" : "isLight"}`}
        />
      </span>

      {/* Theme label */}
      <span className="toggleLabel">
        {isDark ? "Dark" : "Light"}
      </span>
    </button>
  );
};

export default ThemeToggle;