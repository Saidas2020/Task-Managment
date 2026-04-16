export default function Header() {
    return (
        <div style={{
            height: "60px",
            background: "#ffffff",
            borderBottom: "1px solid #e5e7eb",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            padding: "0 20px",
            boxShadow: "0 1px 3px rgba(0,0,0,0.05)"
        }}>

            {/* Left Title */}
            <div style={{
                fontSize: "16px",
                fontWeight: "600",
                color: "#111827"
            }}>
                TaskBoard Dashboard
            </div>

            {/* Right side (future user/profile area) */}
            <div style={{
                fontSize: "13px",
                color: "#6b7280"
            }}>
                Welcome 👋
            </div>

        </div>
    );
}