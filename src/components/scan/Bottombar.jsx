import React from "react";

export default function Bottombar({ data }) {
    return (
        <div className="scanBottomBar">
            <div className="scanBottomLeft">
                <span>Sub-Agents: {data.subAgents}</span>
                <span className="sepDot">•</span>
                <span>Parallel Executions: {data.parallelExecutions}</span>
                <span className="sepDot">•</span>
                <span>Operations: {data.operations}</span>
            </div>

            <div className="scanBottomRight">
                <span className="count crit">Critical: {data.counts.critical}</span>
                <span className="count high">High: {data.counts.high}</span>
                <span className="count med">Medium: {data.counts.medium}</span>
                <span className="count low">Low: {data.counts.low}</span>
            </div>
        </div>
    );
}