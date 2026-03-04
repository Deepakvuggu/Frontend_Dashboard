import React from "react";

import icCritical from "../../assets/icons/block.png";
import icHigh from "../../assets/icons/warn.png";
import icMedium from "../../assets/icons/warning.png";
import icLow from "../../assets/icons/severity.png";

import deltaUp from "../../assets/icons/up.png";
import deltaDown from "../../assets/icons/down.png";

const ICONS = {
  critical: icCritical,
  high: icHigh,
  medium: icMedium,
  low: icLow,
};

export default function SeverityCards({ items = [] }) {
  return (
    <div className="sevGrid">
      {items.map((item) => {
        const isUp = item.deltaType === "up";
        const deltaIcon = isUp ? deltaUp : deltaDown;

        return (
          <div key={item.key} className="sevCard">
            {/* Card header */}
            <div className="sevTop">
              <div className="sevLabel">{item.label}</div>

              <div className={`sevIconWrap ${item.key}`}>
                <img
                  src={ICONS[item.key]}
                  alt=""
                  className="sevIconImg"
                  aria-hidden="true"
                />
              </div>
            </div>

            {/* Value + delta */}
            <div className="sevValueRow">
              <div className="sevValue">{item.value}</div>

              <div className={`sevDelta ${isUp ? "isUp" : "isDown"}`}>
                <img
                  src={deltaIcon}
                  alt=""
                  className="sevDeltaIcon"
                  aria-hidden="true"
                />
                <span>{item.delta}</span>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}