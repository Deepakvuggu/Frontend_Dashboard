import { useEffect, useMemo, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "../../css/auth-shell.css";

import appleIcon from "../../assets/icons/apple.png";
import googleIcon from "../../assets/icons/google.png";
import metaIcon from "../../assets/icons/meta.png";

import icSun from "../../assets/icons/light.png";
import icMoon from "../../assets/icons/moon.png";

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const STORAGE_KEYS = {
  theme: "aps_theme",
  users: "aps_users",
  auth: "aps_auth",
  user: "aps_user",
  rememberEmail: "aps_remember_email",
};

const getInitialTheme = () => localStorage.getItem(STORAGE_KEYS.theme) || "dark";

const getRememberedEmail = () => localStorage.getItem(STORAGE_KEYS.rememberEmail) || "";

export default function LoginPage() {
  const navigate = useNavigate();

  // Theme
  const [theme, setTheme] = useState(getInitialTheme);
  const isDark = theme === "dark";

  // Form
  const [form, setForm] = useState(() => {
    const rememberedEmail = getRememberedEmail();
    return {
      email: rememberedEmail,
      password: "",
      remember: Boolean(rememberedEmail),
    };
  });

  // UX state
  const [touched, setTouched] = useState({});
  const [errors, setErrors] = useState({});
  const [showPassword, setShowPassword] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Already logged in? → dashboard
  useEffect(() => {
    if (localStorage.getItem(STORAGE_KEYS.auth) === "true") {
      navigate("/dashboard", { replace: true });
    }
  }, [navigate]);

  // Persist theme
  useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme);
    localStorage.setItem(STORAGE_KEYS.theme, theme);
  }, [theme]);

  const trustpilot = useMemo(
    () => ({
      rating: "4.5/5.0",
      reviews: "100k+ reviews",
    }),
    []
  );

  const toggleTheme = () => setTheme((prev) => (prev === "dark" ? "light" : "dark"));

  const validate = (values) => {
    const next = {};

    const email = values.email.trim();
    if (!email) next.email = "Email address is required.";
    else if (!EMAIL_REGEX.test(email)) next.email = "Enter a valid email address.";

    if (!values.password) next.password = "Password is required.";
    else if (values.password.length < 8) next.password = "Password must be at least 8 characters.";

    return next;
  };

  const markTouched = (name) => setTouched((prev) => ({ ...prev, [name]: true }));
  const fieldHasError = (name) => Boolean(touched[name] && errors[name]);

  const updateField = (name, value) => {
    setForm((prev) => {
      const nextForm = { ...prev, [name]: value };

      // light live-validation for the edited field
      const nextErrors = validate(nextForm);
      setErrors((prevErrors) => ({ ...prevErrors, [name]: nextErrors[name] }));

      return nextForm;
    });
  };

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

    // Demo auth (localStorage)
    const users = JSON.parse(localStorage.getItem(STORAGE_KEYS.users) || "[]");
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

    // Save session
    localStorage.setItem(STORAGE_KEYS.auth, "true");
    localStorage.setItem(
      STORAGE_KEYS.user,
      JSON.stringify({
        firstName: found.firstName,
        lastName: found.lastName,
        email: found.email,
      })
    );

    // Remember email
    if (form.remember) localStorage.setItem(STORAGE_KEYS.rememberEmail, email);
    else localStorage.removeItem(STORAGE_KEYS.rememberEmail);

    setIsSubmitting(false);
    navigate("/dashboard", { replace: true });
  };

  return (
    <div className="authShell">
      {/* Brand */}
      <div className="brand">
        <span className="brandDot" />
        <span className="brandText">aps</span>
      </div>

      {/* Theme toggle */}
      <button
        type="button"
        className="dbIconBtn authIconToggle"
        onClick={toggleTheme}
        aria-label="Toggle theme"
      >
        <img
          src={isDark ? icSun : icMoon}
          alt=""
          className="dbIconImg"
          aria-hidden="true"
        />
      </button>

      <div className="authGrid">
        {/* Left side */}
        <section className="hero">
          <h1 className="heroTitle">
            Expert level Cybersecurity <br />
            in <span className="accent">hours</span> not weeks.
          </h1>

          <div className="heroBlock">
            <div className="heroSubtitle">What’s included</div>

            <ul className="bulletList">
              <li>
                <span className="check" aria-hidden="true">
                  ✓
                </span>
                Effortlessly spider and map targets to uncover hidden security flaws.
              </li>
              <li>
                <span className="check" aria-hidden="true">
                  ✓
                </span>
                Deliver high-quality, validated findings in hours, not weeks.
              </li>
              <li>
                <span className="check" aria-hidden="true">
                  ✓
                </span>
                Generate professional, enterprise-grade security reports automatically.
              </li>
            </ul>
          </div>

          <div className="trustpilot">
            <div className="trustHeader">
              <span className="trustStar" aria-hidden="true">
                ★
              </span>
              <span className="trustName">Trustpilot</span>
            </div>

            <div className="trustRow">
              <span className="trustRating">Rated {trustpilot.rating}</span>
              <span className="trustMeta">({trustpilot.reviews})</span>
            </div>
          </div>
        </section>

        {/* Right side */}
        <section className="cardWrap">
          <div className="signupCard">
            <div className="signupHeader">
              <h2 className="signupTitle">Log in</h2>
              <p className="signupSub">
                Don’t have an account?{" "}
                <Link className="signupLink" to="/signup">
                  Sign up
                </Link>
              </p>
            </div>

            <form className="signupForm" onSubmit={onSubmit} noValidate>
              <div className="fieldBlock">
                <input
                  className={`signupInput ${fieldHasError("email") ? "isError" : ""}`}
                  placeholder="Email address*"
                  type="email"
                  value={form.email}
                  onChange={(e) => updateField("email", e.target.value)}
                  onBlur={() => markTouched("email")}
                  aria-invalid={fieldHasError("email")}
                />
                {fieldHasError("email") && <div className="fieldError">{errors.email}</div>}
              </div>

              <div className="fieldBlock">
                <div className="signupPasswordWrap">
                  <input
                    className={`signupInput signupPasswordInput ${fieldHasError("password") ? "isError" : ""
                      }`}
                    placeholder="Password (8+ characters)*"
                    type={showPassword ? "text" : "password"}
                    value={form.password}
                    onChange={(e) => updateField("password", e.target.value)}
                    onBlur={() => markTouched("password")}
                    aria-invalid={fieldHasError("password")}
                  />

                  <button
                    type="button"
                    className="signupEyeBtn"
                    aria-label={showPassword ? "Hide password" : "Show password"}
                    onClick={() => setShowPassword((prev) => !prev)}
                  >
                    <span className={`signupEye ${showPassword ? "isOpen" : ""}`} />
                  </button>
                </div>

                {fieldHasError("password") && (
                  <div className="fieldError">{errors.password}</div>
                )}
              </div>

              <label className="signupCheckRow">
                <input
                  type="checkbox"
                  className="signupCheckbox"
                  checked={form.remember}
                  onChange={(e) => updateField("remember", e.target.checked)}
                />
                <span className="signupCheckText">Remember me</span>
              </label>

              <button className="signupCTA" type="submit" disabled={isSubmitting}>
                {isSubmitting ? "Logging in..." : "Log in"}
              </button>

              <div className="signupSocialRow">
                <button
                  type="button"
                  className="signupSocial signupApple"
                  aria-label="Log in with Apple"
                >
                  <img src={appleIcon} alt="Apple" className="socialIconImg" />
                </button>

                <button
                  type="button"
                  className="signupSocial signupGoogle"
                  aria-label="Log in with Google"
                >
                  <img src={googleIcon} alt="Google" className="socialIconImg" />
                </button>

                <button
                  type="button"
                  className="signupSocial signupMeta"
                  aria-label="Log in with Meta"
                >
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