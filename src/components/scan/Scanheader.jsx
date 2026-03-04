import React from "react";

import icSpidering from "../../assets/icons/I1.png";
import icMapping from "../../assets/icons/I2.png";
import icTesting from "../../assets/icons/I3.png";
import icValidating from "../../assets/icons/I4.png";
import icReporting from "../../assets/icons/I5.png";

const STEP_ICONS = {
    spidering: icSpidering,
    mapping: icMapping,
    testing: icTesting,
    validating: icValidating,
    reporting: icReporting,
};

function Step({ stepKey, label, active }) {
    return (
        <div className={`scanStep ${active ? "isActive" : ""}`}>
            <div className="scanStepIconWrap">
                <img
                    src={STEP_ICONS[stepKey]}
                    alt=""
                    className="scanStepIcon"
                    aria-hidden="true"
                />
            </div>

            <div className="scanStepLabel">{label}</div>
        </div>
    );
}

export default function ScanHeader({ data }) {
    const progress = Math.max(0, Math.min(100, Number(data?.percent) || 0));

    return (
        <section className="scanHeaderCard">
            {/* Left: progress ring */}
            <div className="scanHeaderLeft">
                <div className="scanRing">
                    <div className="scanRingInner">
                        <div className="scanRingPct">{progress}%</div>
                        <div className="scanRingSub">{data?.status}</div>
                    </div>
                </div>
            </div>

            {/* Right: steps + metadata */}
            <div className="scanHeaderRight">
                <div className="scanStepsRow">
                    {(data?.steps || []).map((step) => (
                        <Step
                            key={step.key}
                            stepKey={step.key}
                            label={step.label}
                            active={step.active}
                        />
                    ))}
                </div>

                <div className="scanMetaRow">
                    {(data?.meta || []).map((m) => (
                        <div key={m.label} className="scanMetaItem">
                            <div className="scanMetaLabel">{m.label}</div>

                            <div className={`scanMetaValue ${m.valueTone === "teal" ? "isTeal" : ""}`}>
                                {m.value}
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}