import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

import Loginpage from './components/Auth/Loginpage';
import Signuppage from './components/Signuppage'; // ✅ add this (adjust path if needed)

import Dashboardpage from "./pages/Dashboardpage";
import Scanpage from "./pages/Scanpage"; // ✅ keep only one import

function PrivateRoute({ children }) {
  const authed = localStorage.getItem("aps_auth") === "true";
  return authed ? children : <Navigate to="/" replace />;
}

function PublicRoute({ children }) {
  const authed = localStorage.getItem("aps_auth") === "true";
  return authed ? <Navigate to="/dashboard" replace /> : children;
}

export default function App() {
  const authed = localStorage.getItem("aps_auth") === "true";

  return (
    <BrowserRouter>
      <Routes>
        {/* ✅ Login */}
        <Route
          path="/"
          element={
            <PublicRoute>
              <Loginpage />
            </PublicRoute>
          }
        />

        {/* ✅ Signup */}
        <Route
          path="/signup"
          element={
            <PublicRoute>
              <Signuppage />
            </PublicRoute>
          }
        />

        {/* ✅ Dashboard */}
        <Route
          path="/dashboard"
          element={
            <PrivateRoute>
              <Dashboardpage />
            </PrivateRoute>
          }
        />

        {/* ✅ Scan */}
        <Route
          path="/scan"
          element={
            <PrivateRoute>
              <Scanpage />
            </PrivateRoute>
          }
        />

        {/* ✅ Fallback */}
        <Route path="*" element={<Navigate to={authed ? "/dashboard" : "/"} replace />} />
      </Routes>
    </BrowserRouter>
  );
}