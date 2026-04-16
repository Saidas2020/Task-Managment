import { useState } from "react";
import api from "../services/api";
import { useNavigate } from "react-router-dom";

function CreateProject() {
    const [name, setName] = useState("");
    const [description, setDescription] = useState("");
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);

    const navigate = useNavigate();

    const submit = async () => {
        if (!name.trim()) {
            setError("Project name is required");
            return;
        }

        try {
            setLoading(true);
            setError("");

            await api.post("/projects", { name, description });

            navigate("/projects");
        } catch (err) {
            setError(err.response?.data?.errors?.Name?.[0] || "Something went wrong");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            height: "80vh",
            background: "#f4f6f9"
        }}>

            <div style={{
                width: "420px",
                background: "white",
                padding: "25px",
                borderRadius: "14px",
                boxShadow: "0 10px 25px rgba(0,0,0,0.08)"
            }}>

                {/* TITLE */}
                <h2 style={{
                    marginBottom: "20px",
                    fontSize: "20px",
                    fontWeight: "600",
                    color: "#111827"
                }}>
                    ➕ Create Project
                </h2>

                {/* NAME */}
                <label style={{
                    fontSize: "13px",
                    fontWeight: "500",
                    color: "#374151"
                }}>
                    Project Name *
                </label>

                <input
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Enter project name"
                    style={{
                        width: "100%",
                        padding: "10px",
                        marginTop: "6px",
                        marginBottom: "15px",
                        borderRadius: "8px",
                        border: "1px solid #d1d5db",
                        outline: "none",
                        boxSizing: "border-box"
                    }}
                />

                {/* DESCRIPTION */}
                <label style={{
                    fontSize: "13px",
                    fontWeight: "500",
                    color: "#374151"
                }}>
                    Description
                </label>

                <textarea
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    placeholder="Enter project description"
                    rows={4}
                    style={{
                        width: "100%",
                        padding: "10px",
                        marginTop: "6px",
                        marginBottom: "15px",
                        borderRadius: "8px",
                        border: "1px solid #d1d5db",
                        resize: "none",
                        outline: "none",
                        boxSizing: "border-box"
                    }}
                />

                {/* ERROR */}
                {error && (
                    <div style={{
                        color: "#dc2626",
                        fontSize: "13px",
                        marginBottom: "10px"
                    }}>
                        {error}
                    </div>
                )}

                {/* BUTTON */}
                <button
                    onClick={submit}
                    disabled={loading}
                    style={{
                        width: "100%",
                        padding: "10px",
                        borderRadius: "8px",
                        border: "none",
                        background: loading ? "#9ca3af" : "#111827",
                        color: "white",
                        cursor: "pointer",
                        fontWeight: "500",
                        transition: "0.2s"
                    }}
                >
                    {loading ? "Creating..." : "Create Project"}
                </button>

            </div>
        </div>
    );
}

export default CreateProject;