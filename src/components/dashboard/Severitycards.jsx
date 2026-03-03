import React from "react";

import icCritical from "../../assets/icons/block.png";
import icHigh from "../../assets/icons/warn.png";
import icMedium from "../../assets/icons/warning.png";
import icLow from "../../assets/icons/severity.png";

import deltaUp from "../../assets/icons/up.png";
import deltaDown from "../../assets/icons/down.png";

const iconByKey = {
  critical: icCritical,
  high: icHigh,
  medium: icMedium,
  low: icLow,
};

export default function Severitycards({ items }) {
  return (
    <div className="sevGrid">
      {items.map((s) => {
        const deltaIcon = s.deltaType === "up" ? deltaUp : deltaDown;

        return (
          <div key={s.key} className="sevCard">
            <div className="sevTop">
              <div className="sevLabel">{s.label}</div>

              <div className={`sevIconWrap ${s.key}`}>
                <img
                  src={iconByKey[s.key]}
                  alt=""
                  className="sevIconImg"
                  aria-hidden="true"
                />
              </div>
            </div>

            <div className="sevValueRow">
              <div className="sevValue">{s.value}</div>

              <div className={`sevDelta ${s.deltaType === "up" ? "isUp" : "isDown"}`}>
                <img
                  src={deltaIcon}
                  alt=""
                  className="sevDeltaIcon"
                  aria-hidden="true"
                />
                <span>{s.delta}</span>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}