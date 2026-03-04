import React from "react";

export default function BottomBar({ data }) {
    const leftStats = [
        { label: "Sub-Agents", value: data.subAgents },
        { label: "Parallel Executions", value: data.parallelExecutions },
        { label: "Operations", value: data.operations },
    ];

    const severityCounts = [
        { key: "critical", label: "Critical", value: data.counts.critical },
        { key: "high", label: "High", value: data.counts.high },
        { key: "medium", label: "Medium", value: data.counts.medium },
        { key: "low", label: "Low", value: data.counts.low },
    ];

    return (
        <div className="scanBottomBar">
            {/* Left stats */}
            <div className="scanBottomLeft">
                {leftStats.map((item, index) => (
                    <React.Fragment key={item.label}>
                        <span>
                            {item.label}: {item.value}
                        </span>

                        {index < leftStats.length - 1 && (
                            <span className="sepDot">•</span>
                        )}
                    </React.Fragment>
                ))}
            </div>

            {/* Right severity counts */}
            <div className="scanBottomRight">
                {severityCounts.map((sev) => (
                    <span key={sev.key} className={`count ${sev.key}`}>
                        {sev.label}: {sev.value}
                    </span>
                ))}
            </div>
        </div>
    );
}