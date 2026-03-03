import { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import "../css/auth-shell.css";

import appleIcon from "../assets/icons/apple.png";
import googleIcon from "../assets/icons/google.png";
import metaIcon from "../assets/icons/meta.png";

import icSun from "../assets/icons/light.png";
import icMoon from "../assets/icons/moon.png";

const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export default function Signuppage() {
    const [theme, setTheme] = useState(() => localStorage.getItem("aps_theme") || "dark");
    const navigate = useNavigate();

    const [form, setForm] = useState({
        firstName: "",
        lastName: "",
        email: "",
        password: "",
        terms: false,
    });

    const [errors, setErrors] = useState({});
    const [touched, setTouched] = useState({});
    const [showPassword, setShowPassword] = useState(false);
    const [isSubmitting, setIsSubmitting] = useState(false);

    useEffect(() => {
        document.documentElement.setAttribute("data-theme", theme);
        localStorage.setItem("aps_theme", theme);
    }, [theme]);

    const toggle = () => setTheme((t) => (t === "dark" ? "light" : "dark"));

    const trustpilot = useMemo(
        () => ({
            rating: "4.5/5.0",
            reviews: "100k+ reviews",
        }),
        []
    );

    const validate = (values) => {
        const next = {};

        if (!values.firstName.trim()) next.firstName = "First name is required.";
        if (!values.lastName.trim()) next.lastName = "Last name is required.";

        if (!values.email.trim()) next.email = "Email address is required.";
        else if (!emailRegex.test(values.email.trim()))
            next.email = "Enter a valid email address.";

        if (!values.password) next.password = "Password is required.";
        else if (values.password.length < 8)
            next.password = "Password must be at least 8 characters.";

        if (!values.terms) next.terms = "You must accept Terms & Conditions.";

        return next;
    };

    const setField = (name, value) => {
        setForm((prev) => ({ ...prev, [name]: value }));
        setErrors((prevErrs) => {
            const merged = { ...form, [name]: value };
            const next = validate(merged);
            return { ...prevErrs, [name]: next[name] };
        });
    };

    const markTouched = (name) => setTouched((prev) => ({ ...prev, [name]: true }));
    const hasError = (name) => Boolean(touched[name] && errors[name]);

    const onSubmit = (e) => {
        e.preventDefault();
        setIsSubmitting(true);

        const nextErrors = validate(form);
        setErrors(nextErrors);
        setTouched({
            firstName: true,
            lastName: true,
            email: true,
            password: true,
            terms: true,
        });

        if (Object.keys(nextErrors).length > 0) {
            setIsSubmitting(false);
            return;
        }

        // ✅ Store user for future login
        const users = JSON.parse(localStorage.getItem("aps_users") || "[]");
        const email = form.email.trim().toLowerCase();

        const exists = users.some((u) => (u.email || "").toLowerCase() === email);
        if (exists) {
            setErrors((prev) => ({ ...prev, email: "Account already exists. Please log in." }));
            setTouched((prev) => ({ ...prev, email: true }));
            setIsSubmitting(false);
            return;
        }

        const newUser = {
            firstName: form.firstName.trim(),
            lastName: form.lastName.trim(),
            email: form.email.trim(),
            password: form.password, // demo only (no backend)
        };

        localStorage.setItem("aps_users", JSON.stringify([...users, newUser]));

        // ✅ After account creation → redirect to LOGIN (your login route is "/")
        setIsSubmitting(false);
        navigate("/", { replace: true });
    };

    return (
        <div className="authShell">
            {/* Top-left brand */}
            <div className="brand">
                <span className="brandDot" />
                <span className="brandText">aps</span>
            </div>

            {/* Theme toggle */}
            <button
                className="dbIconBtn authIconToggle"
                onClick={toggle}
                type="button"
                aria-label="Toggle theme"
            >
                <img
                    src={theme === "dark" ? icSun : icMoon}
                    alt=""
                    className="dbIconImg"
                    aria-hidden="true"
                />
            </button>

            <div className="authGrid">
                {/* Left side content */}
                <section className="hero">
                    <h1 className="heroTitle">
                        Expert level Cybersecurity <br />
                        in <span className="accent">hours</span> not weeks.
                    </h1>

                    <div className="heroBlock">
                        <div className="heroSubtitle">What’s included</div>

                        <ul className="bulletList">
                            <li>
                                <span className="check" aria-hidden="true">✓</span>
                                Effortlessly spider and map targets to uncover hidden security flaws.
                            </li>
                            <li>
                                <span className="check" aria-hidden="true">✓</span>
                                Deliver high-quality, validated findings in hours, not weeks.
                            </li>
                            <li>
                                <span className="check" aria-hidden="true">✓</span>
                                Generate professional, enterprise-grade security reports automatically.
                            </li>
                        </ul>
                    </div>

                    <div className="trustpilot">
                        <div className="trustHeader">
                            <span className="trustStar" aria-hidden="true">★</span>
                            <span className="trustName">Trustpilot</span>
                        </div>
                        <div className="trustRow">
                            <span className="trustRating">Rated {trustpilot.rating}</span>
                            <span className="trustMeta">({trustpilot.reviews})</span>
                        </div>
                    </div>
                </section>

                {/* Right side card */}
                <section className="cardWrap">
                    <div className="signupCard">
                        <div className="signupHeader">
                            <h2 className="signupTitle">Sign up</h2>
                            <p className="signupSub">
                                Already have an account?{" "}
                                <a className="signupLink" href="/">
                                    Log in
                                </a>
                            </p>
                        </div>

                        <form className="signupForm" onSubmit={onSubmit} noValidate>
                            <div className="fieldBlock">
                                <input
                                    className={`signupInput ${hasError("firstName") ? "isError" : ""}`}
                                    placeholder="First name*"
                                    value={form.firstName}
                                    onChange={(e) => setField("firstName", e.target.value)}
                                    onBlur={() => markTouched("firstName")}
                                    aria-invalid={hasError("firstName")}
                                />
                                {hasError("firstName") && <div className="fieldError">{errors.firstName}</div>}
                            </div>

                            <div className="fieldBlock">
                                <input
                                    className={`signupInput ${hasError("lastName") ? "isError" : ""}`}
                                    placeholder="Last name*"
                                    value={form.lastName}
                                    onChange={(e) => setField("lastName", e.target.value)}
                                    onBlur={() => markTouched("lastName")}
                                    aria-invalid={hasError("lastName")}
                                />
                                {hasError("lastName") && <div className="fieldError">{errors.lastName}</div>}
                            </div>

                            <div className="fieldBlock">
                                <input
                                    className={`signupInput ${hasError("email") ? "isError" : ""}`}
                                    placeholder="Email address*"
                                    type="email"
                                    value={form.email}
                                    onChange={(e) => setField("email", e.target.value)}
                                    onBlur={() => markTouched("email")}
                                    aria-invalid={hasError("email")}
                                />
                                {hasError("email") && <div className="fieldError">{errors.email}</div>}
                            </div>

                            <div className="fieldBlock">
                                <div className="signupPasswordWrap">
                                    <input
                                        className={`signupInput signupPasswordInput ${hasError("password") ? "isError" : ""}`}
                                        placeholder="Password (8+ characters)*"
                                        type={showPassword ? "text" : "password"}
                                        value={form.password}
                                        onChange={(e) => setField("password", e.target.value)}
                                        onBlur={() => markTouched("password")}
                                        aria-invalid={hasError("password")}
                                    />
                                    <button
                                        type="button"
                                        className="signupEyeBtn"
                                        aria-label={showPassword ? "Hide password" : "Show password"}
                                        onClick={() => setShowPassword((s) => !s)}
                                    >
                                        <span className={`signupEye ${showPassword ? "isOpen" : ""}`} />
                                    </button>
                                </div>
                                {hasError("password") && <div className="fieldError">{errors.password}</div>}
                            </div>

                            <label className={`signupCheckRow ${hasError("terms") ? "isErrorRow" : ""}`}>
                                <input
                                    type="checkbox"
                                    className="signupCheckbox"
                                    checked={form.terms}
                                    onChange={(e) => setField("terms", e.target.checked)}
                                    onBlur={() => markTouched("terms")}
                                    aria-invalid={hasError("terms")}
                                />
                                <span className="signupCheckText">
                                    I agree to Aps’{" "}
                                    <a className="signupLink" href="#terms">Terms &amp; Conditions</a>{" "}
                                    and acknowledge the{" "}
                                    <a className="signupLink" href="#privacy">Privacy Policy</a>
                                </span>
                            </label>
                            {hasError("terms") && <div className="fieldError">{errors.terms}</div>}

                            <button className="signupCTA" type="submit" disabled={isSubmitting}>
                                {isSubmitting ? "Creating..." : "Create account"}
                            </button>

                            <div className="signupSocialRow">
                                <button type="button" className="signupSocial signupApple" aria-label="Sign up with Apple">
                                    <img src={appleIcon} alt="Apple" className="socialIconImg" />
                                </button>

                                <button type="button" className="signupSocial signupGoogle" aria-label="Sign up with Google">
                                    <img src={googleIcon} alt="Google" className="socialIconImg" />
                                </button>

                                <button type="button" className="signupSocial signupMeta" aria-label="Sign up with Meta">
                                    <img src={metaIcon} alt="Meta" className="socialIconImg" />
                                </button>
                            </div>
                        </form>
                    </div>
                </section>
            </div>
        </div>
    );
}