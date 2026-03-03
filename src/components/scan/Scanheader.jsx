import React from "react";

import icSpidering from "../../assets/icons/I1.png";
import icMapping from "../../assets/icons/I2.png";
import icTesting from "../../assets/icons/I3.png";
import icValidating from "../../assets/icons/I4.png";
import icReporting from "../../assets/icons/I5.png";

function Step({ stepKey, label, active }) {
    return (
        <div className={`scanStep ${active ? "isActive" : ""}`}>
            <div className="scanStepIconWrap">
                <img
                    src={stepIconByKey[stepKey]}
                    alt=""
                    className="scanStepIcon"
                    aria-hidden="true"
                />
            </div>
            <div className="scanStepLabel">{label}</div>
        </div>
    );
}
const stepIconByKey = {
    spidering: icSpidering,
    mapping: icMapping,
    testing: icTesting,
    validating: icValidating,
    reporting: icReporting,
};
export default function Scanheader({ data }) {
    return (
        <section className="scanHeaderCard">
            <div className="scanHeaderLeft">
                <div className="scanRing">
                    <div className="scanRingInner">
                        <div className="scanRingPct">{data.percent}%</div>
                        <div className="scanRingSub">{data.status}</div>
                    </div>
                </div>
            </div>

            <div className="scanHeaderRight">
                <div className="scanStepsRow">
                    {data.steps.map((s) => (
                        <Step
                            key={s.key}
                            stepKey={s.key}
                            label={s.label}
                            active={s.active}
                        />
                    ))}
                </div>

                <div className="scanMetaRow">
                    {data.meta.map((m) => (
                        <div key={m.label} className="scanMetaItem">
                            <div className="scanMetaLabel">{m.label}</div>
                            <div
                                className={`scanMetaValue ${m.valueTone === "teal" ? "isTeal" : ""
                                    }`}
                            >
                                {m.value}
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}