import { NavLink } from "react-router-dom";

export default function Sidebar() {

    const linkStyle = ({ isActive }) => ({
        display: "block",
        padding: "12px 15px",
        borderRadius: "10px",
        color: isActive ? "#111" : "#e5e7eb",
        background: isActive ? "#ffffff" : "transparent",
        textDecoration: "none",
        fontWeight: isActive ? "600" : "400",
        transition: "0.2s",
    });

    return (
        <div style={{
            width: "240px",
            background: "#111827",
            color: "white",
            padding: "20px",
            display: "flex",
            flexDirection: "column"
        }}>

            {/* Logo / Title */}
            <h2 style={{
                marginBottom: "25px",
                fontSize: "20px",
                letterSpacing: "0.5px",
                color: "#ffffff"
            }}>
                📌 TaskBoard
            </h2>

            {/* NAV */}
            <nav style={{ display: "flex", flexDirection: "column", gap: "8px" }}>

                <NavLink to="/" style={linkStyle}>
                    📊 Dashboard
                </NavLink>

                <NavLink to="/projects" style={linkStyle}>
                    📁 Projects
                </NavLink>

            </nav>
        </div>
    );
}