import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

import LoginPage from "./components/Auth/Loginpage";
import SignupPage from "./components/Signuppage";

import DashboardPage from "./pages/Dashboardpage";
import ScanPage from "./pages/Scanpage";

const isAuthenticated = () => localStorage.getItem("aps_auth") === "true";

// Protect private pages
function PrivateRoute({ children }) {
  return isAuthenticated() ? children : <Navigate to="/" replace />;
}

// Prevent logged-in users from accessing auth pages
function PublicRoute({ children }) {
  return isAuthenticated() ? <Navigate to="/dashboard" replace /> : children;
}

export default function App() {
  const authed = isAuthenticated();

  return (
    <BrowserRouter>
      <Routes>
        {/* Login */}
        <Route
          path="/"
          element={
            <PublicRoute>
              <LoginPage />
            </PublicRoute>
          }
        />

        {/* Signup */}
        <Route
          path="/signup"
          element={
            <PublicRoute>
              <SignupPage />
            </PublicRoute>
          }
        />

        {/* Dashboard */}
        <Route
          path="/dashboard"
          element={
            <PrivateRoute>
              <DashboardPage />
            </PrivateRoute>
          }
        />

        {/* Scan */}
        <Route
          path="/scan"
          element={
            <PrivateRoute>
              <ScanPage />
            </PrivateRoute>
          }
        />

        {/* Fallback */}
        <Route
          path="*"
          element={<Navigate to={authed ? "/dashboard" : "/"} replace />}
        />
      </Routes>
    </BrowserRouter>
  );
}