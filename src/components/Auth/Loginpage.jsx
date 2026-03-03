import { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import "../../css/auth-shell.css";

import appleIcon from "../../assets/icons/apple.png";
import googleIcon from "../../assets/icons/google.png";
import metaIcon from "../../assets/icons/meta.png";

import icSun from "../../assets/icons/light.png";
import icMoon from "../../assets/icons/moon.png";

const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export default function Loginpage() {
  const [theme, setTheme] = useState(() => localStorage.getItem("aps_theme") || "dark");
  const navigate = useNavigate();

  const [form, setForm] = useState({
    email: "",
    password: "",
    remember: false,
  });

  const [errors, setErrors] = useState({});
  const [touched, setTouched] = useState({});
  const [showPassword, setShowPassword] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // ✅ If already logged in, redirect to dashboard
  useEffect(() => {
    if (localStorage.getItem("aps_auth") === "true") {
      navigate("/dashboard", { replace: true });
    }
  }, [navigate]);

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

    if (!values.email.trim()) next.email = "Email address is required.";
    else if (!emailRegex.test(values.email.trim())) next.email = "Enter a valid email address.";

    if (!values.password) next.password = "Password is required.";
    else if (values.password.length < 8) next.password = "Password must be at least 8 characters.";

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
    setTouched({ email: true, password: true });

    if (Object.keys(nextErrors).length > 0) {
      setIsSubmitting(false);
      return;
    }

    // ✅ LOGIN LOGIC (check saved users)
    const users = JSON.parse(localStorage.getItem("aps_users") || "[]");
    const email = form.email.trim().toLowerCase();
    const password = form.password;

    const found = users.find(
      (u) => (u.email || "").toLowerCase() === email && u.password === password
    );

    if (!found) {
      setErrors((prev) => ({ ...prev, password: "Invalid email or password." }));
      setTouched((prev) => ({ ...prev, password: true }));
      setIsSubmitting(false);
      return;
    }

    // ✅ set auth session
    localStorage.setItem("aps_auth", "true");
    localStorage.setItem(
      "aps_user",
      JSON.stringify({
        firstName: found.firstName,
        lastName: found.lastName,
        email: found.email,
      })
    );

    // ✅ remember email
    if (form.remember) localStorage.setItem("aps_remember_email", email);
    else localStorage.removeItem("aps_remember_email");

    setIsSubmitting(false);

    // ✅ redirect to dashboard
    navigate("/dashboard", { replace: true });
  };

  // ✅ prefill remembered email
  useEffect(() => {
    const remembered = localStorage.getItem("aps_remember_email");
    if (remembered) setForm((p) => ({ ...p, email: remembered, remember: true }));
  }, []);

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
              <h2 className="signupTitle">Log in</h2>
              <p className="signupSub">
                Don’t have an account?{" "}
                <a className="signupLink" href="/signup">Sign up</a>
              </p>
            </div>

            <form className="signupForm" onSubmit={onSubmit} noValidate>
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

              <label className="signupCheckRow">
                <input
                  type="checkbox"
                  className="signupCheckbox"
                  checked={form.remember}
                  onChange={(e) => setField("remember", e.target.checked)}
                />
                <span className="signupCheckText">Remember me</span>
              </label>

              <button className="signupCTA" type="submit" disabled={isSubmitting}>
                {isSubmitting ? "Logging in..." : "Log in"}
              </button>

              <div className="signupSocialRow">
                <button type="button" className="signupSocial signupApple" aria-label="Log in with Apple">
                  <img src={appleIcon} alt="Apple" className="socialIconImg" />
                </button>

                <button type="button" className="signupSocial signupGoogle" aria-label="Log in with Google">
                  <img src={googleIcon} alt="Google" className="socialIconImg" />
                </button>

                <button type="button" className="signupSocial signupMeta" aria-label="Log in with Meta">
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