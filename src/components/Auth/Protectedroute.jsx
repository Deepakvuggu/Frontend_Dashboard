import { Navigate, Outlet } from "react-router-dom";

export default function Protectedroute() {
    const authed = localStorage.getItem("aps_auth") === "true";
    return authed ? <Outlet /> : <Navigate to="/login" replace />;
}