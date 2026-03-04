import { useEffect, useMemo, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import "../css/auth-shell.css";

// Social icons
import appleIcon from "../assets/icons/apple.png";
import googleIcon from "../assets/icons/google.png";
import metaIcon from "../assets/icons/meta.png";

// Theme icons
import icSun from "../assets/icons/light.png";
import icMoon from "../assets/icons/moon.png";

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const STORAGE_KEYS = {
  theme: "aps_theme",
  users: "aps_users",
};

export default function SignupPage() {
  const navigate = useNavigate();

  // Theme
  const [theme, setTheme] = useState(() => localStorage.getItem(STORAGE_KEYS.theme) || "dark");

  // Form state
  const [form, setForm] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    terms: false,
  });

  // UX state
  const [touched, setTouched] = useState({});
  const [errors, setErrors] = useState({});
  const [showPassword, setShowPassword] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

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

  const isDark = theme === "dark";
  const toggleTheme = () => setTheme((prev) => (prev === "dark" ? "light" : "dark"));

  const validate = (values) => {
    const next = {};

    if (!values.firstName.trim()) next.firstName = "First name is required.";
    if (!values.lastName.trim()) next.lastName = "Last name is required.";

    const email = values.email.trim();
    if (!email) next.email = "Email address is required.";
    else if (!EMAIL_REGEX.test(email)) next.email = "Enter a valid email address.";

    if (!values.password) next.password = "Password is required.";
    else if (values.password.length < 8) next.password = "Password must be at least 8 characters.";

    if (!values.terms) next.terms = "You must accept Terms & Conditions.";

    return next;
  };

  const markTouched = (name) => setTouched((prev) => ({ ...prev, [name]: true }));
  const fieldHasError = (name) => Boolean(touched[name] && errors[name]);

  const updateField = (name, value) => {
    setForm((prev) => {
      const nextForm = { ...prev, [name]: value };

      // Light “live validation” on just the edited field
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

    // Demo signup (localStorage)
    const users = JSON.parse(localStorage.getItem(STORAGE_KEYS.users) || "[]");
    const emailKey = form.email.trim().toLowerCase();

    const exists = users.some((u) => (u.email || "").toLowerCase() === emailKey);
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

    localStorage.setItem(STORAGE_KEYS.users, JSON.stringify([...users, newUser]));

    setIsSubmitting(false);
    navigate("/", { replace: true }); // redirect to login
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
        {/* Left / hero */}
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

        {/* Right / form card */}
        <section className="cardWrap">
          <div className="signupCard">
            <div className="signupHeader">
              <h2 className="signupTitle">Sign up</h2>
              <p className="signupSub">
                Already have an account?{" "}
                <Link className="signupLink" to="/">
                  Log in
                </Link>
              </p>
            </div>

            <form className="signupForm" onSubmit={onSubmit} noValidate>
              <div className="fieldBlock">
                <input
                  className={`signupInput ${fieldHasError("firstName") ? "isError" : ""}`}
                  placeholder="First name*"
                  value={form.firstName}
                  onChange={(e) => updateField("firstName", e.target.value)}
                  onBlur={() => markTouched("firstName")}
                  aria-invalid={fieldHasError("firstName")}
                />
                {fieldHasError("firstName") && (
                  <div className="fieldError">{errors.firstName}</div>
                )}
              </div>

              <div className="fieldBlock">
                <input
                  className={`signupInput ${fieldHasError("lastName") ? "isError" : ""}`}
                  placeholder="Last name*"
                  value={form.lastName}
                  onChange={(e) => updateField("lastName", e.target.value)}
                  onBlur={() => markTouched("lastName")}
                  aria-invalid={fieldHasError("lastName")}
                />
                {fieldHasError("lastName") && (
                  <div className="fieldError">{errors.lastName}</div>
                )}
              </div>

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
                    className={`signupInput signupPasswordInput ${
                      fieldHasError("password") ? "isError" : ""
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

              <label className={`signupCheckRow ${fieldHasError("terms") ? "isErrorRow" : ""}`}>
                <input
                  type="checkbox"
                  className="signupCheckbox"
                  checked={form.terms}
                  onChange={(e) => updateField("terms", e.target.checked)}
                  onBlur={() => markTouched("terms")}
                  aria-invalid={fieldHasError("terms")}
                />
                <span className="signupCheckText">
                  I agree to Aps’{" "}
                  <a className="signupLink" href="#terms">
                    Terms &amp; Conditions
                  </a>{" "}
                  and acknowledge the{" "}
                  <a className="signupLink" href="#privacy">
                    Privacy Policy
                  </a>
                </span>
              </label>

              {fieldHasError("terms") && <div className="fieldError">{errors.terms}</div>}

              <button className="signupCTA" type="submit" disabled={isSubmitting}>
                {isSubmitting ? "Creating..." : "Create account"}
              </button>

              <div className="signupSocialRow">
                <button
                  type="button"
                  className="signupSocial signupApple"
                  aria-label="Sign up with Apple"
                >
                  <img src={appleIcon} alt="Apple" className="socialIconImg" />
                </button>

                <button
                  type="button"
                  className="signupSocial signupGoogle"
                  aria-label="Sign up with Google"
                >
                  <img src={googleIcon} alt="Google" className="socialIconImg" />
                </button>

                <button
                  type="button"
                  className="signupSocial signupMeta"
                  aria-label="Sign up with Meta"
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