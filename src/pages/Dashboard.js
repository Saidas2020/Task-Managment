import { useEffect } from "react";
import api from "../services/api";
import useApi from "../hooks/useApi";

function Dashboard() {

    const { data, loading, error, request } = useApi(() =>
        api.get("/dashboard")
    );

    useEffect(() => {
        request();
    }, []);

    if (loading) return <p>Loading dashboard...</p>;
    if (error) return <p style={{ color: "red" }}>{error}</p>;

    const stats = [
        { label: "Total Projects", value: data?.totalProjects },
        { label: "Total Tasks", value: data?.totalTasks },
        { label: "Due in 7 Days", value: data?.upcomingCount },
        { label: "Overdue", value: data?.overdueCount, danger: true }
    ];

    return (
        <div>

            <h2 style={{ marginBottom: "20px" }}>📊 Dashboard</h2>

            {/* STATS CARDS */}
            <div style={{
                display: "grid",
                gridTemplateColumns: "repeat(4, 1fr)",
                gap: "15px"
            }}>
                {stats.map((s, i) => (
                    <div
                        key={i}
                        style={{
                            background: "white",
                            padding: "20px",
                            borderRadius: "14px",
                            border: s.danger ? "1px solid #fca5a5" : "1px solid #eee",
                            boxShadow: "0 2px 10px rgba(0,0,0,0.06)",
                            cursor: "pointer",
                            transition: "all 0.25s ease",
                        }}

                        onMouseEnter={(e) => {
                            e.currentTarget.style.transform = "translateY(-5px)";
                            e.currentTarget.style.boxShadow = "0 10px 25px rgba(0,0,0,0.12)";
                        }}

                        onMouseLeave={(e) => {
                            e.currentTarget.style.transform = "translateY(0)";
                            e.currentTarget.style.boxShadow = "0 2px 10px rgba(0,0,0,0.06)";
                        }}
                    >
                        <h4 style={{
                            margin: 0,
                            fontSize: "14px",
                            color: "#6b7280",
                            fontWeight: "500"
                        }}>
                            {s.label}
                        </h4>

                        <h2 style={{
                            marginTop: "10px",
                            fontSize: "28px",
                            fontWeight: "700",
                            color: s.danger ? "#ef4444" : "#111827",
                            transition: "color 0.2s ease"
                        }}>
                            {s.value ?? 0}
                        </h2>
                    </div>
                ))}
            </div>
            {/* STATUS BREAKDOWN */}
            <div style={{
                marginTop: "30px",
                background: "white",
                padding: "20px",
                borderRadius: "14px",
                boxShadow: "0 2px 10px rgba(0,0,0,0.06)"
            }}>

                <h3 style={{
                    marginBottom: "20px",
                    fontSize: "16px",
                    fontWeight: "600",
                    color: "#111827"
                }}>
                    📊 Tasks by Status
                </h3>

                {(data?.tasksByStatus ?? []).map((s, i) => {

                    // simple color mapping
                    const colors = {
                        Todo: "#3b82f6",
                        InProgress: "#f59e0b",
                        Review: "#8b5cf6",
                        Done: "#22c55e"
                    };

                    const color = colors[s.status] || "#6b7280";

                    return (
                        <div
                            key={i}
                            style={{
                                marginBottom: "14px",
                                padding: "12px",
                                borderRadius: "12px",
                                background: "#f9fafb",
                                transition: "0.2s",
                                cursor: "pointer"
                            }}

                            onMouseEnter={(e) => {
                                e.currentTarget.style.background = "#f3f4f6";
                                e.currentTarget.style.transform = "scale(1.01)";
                            }}

                            onMouseLeave={(e) => {
                                e.currentTarget.style.background = "#f9fafb";
                                e.currentTarget.style.transform = "scale(1)";
                            }}
                        >

                            {/* TOP ROW */}
                            <div style={{
                                display: "flex",
                                justifyContent: "space-between",
                                alignItems: "center",
                                marginBottom: "8px"
                            }}>
                                <div style={{
                                    display: "flex",
                                    alignItems: "center",
                                    gap: "8px"
                                }}>
                                    <span style={{
                                        width: "10px",
                                        height: "10px",
                                        borderRadius: "50%",
                                        background: color
                                    }}></span>

                                    <span style={{
                                        fontWeight: "500",
                                        color: "#111827"
                                    }}>
                                        {s.status}
                                    </span>
                                </div>

                                <b style={{
                                    fontSize: "14px",
                                    color: color
                                }}>
                                    {s.count}
                                </b>
                            </div>

                            {/* PROGRESS BAR */}
                            <div style={{
                                height: "6px",
                                width: "100%",
                                background: "#e5e7eb",
                                borderRadius: "10px",
                                overflow: "hidden"
                            }}>
                                <div style={{
                                    height: "100%",
                                    width: `${Math.min(s.count * 20, 100)}%`,
                                    background: color,
                                    borderRadius: "10px",
                                    transition: "width 0.4s ease"
                                }} />
                            </div>

                        </div>
                    );
                })}
            </div>

        </div>
    );
}

export default Dashboard;