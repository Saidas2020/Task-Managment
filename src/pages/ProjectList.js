import { useEffect, useState } from "react";
import api from "../services/api";
import Modal from "../components/Modal";
import { useNavigate } from "react-router-dom";

function ProjectList() {
    const [projects, setProjects] = useState([]);
    const navigate = useNavigate();
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedProject, setSelectedProject] = useState(null);
    const [editName, setEditName] = useState("");
    const [editDesc, setEditDesc] = useState("");
    const [isCreateOpen, setIsCreateOpen] = useState(false);
    const [newName, setNewName] = useState("");
    const [newDesc, setNewDesc] = useState("");
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

    useEffect(() => {
        api.get("/projects").then(res => setProjects(res.data));
    }, []);

    return (
        <div style={{ padding: "20px" }}>

            {/* HEADER */}
            <div style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                marginBottom: "20px"
            }}>
                <div style={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    marginBottom: "20px",
                    paddingBottom: "10px",
                    borderBottom: "1px solid #e5e7eb"
                }}>

                    {/* LEFT SIDE TITLE */}
                    <div>
                        <h2 style={{
                            margin: 0,
                            fontSize: "22px",
                            fontWeight: "600",
                            color: "#111827",
                            display: "flex",
                            alignItems: "center",
                            gap: "8px"
                        }}>
                            📁 Projects
                        </h2>

                        <p style={{
                            margin: "4px 0 0 0",
                            fontSize: "13px",
                            color: "#6b7280"
                        }}>
                            Manage and organize all your projects
                        </p>
                    </div>

                </div>

                <button
                    onClick={() => setIsCreateOpen(true)}
                    style={{
                        padding: "10px 15px",
                        borderRadius: "10px",
                        border: "none",
                        background: "#111827",
                        color: "white",
                        cursor: "pointer",
                        fontWeight: "500",
                        transition: "0.2s"
                    }}

                    onMouseEnter={(e) => {
                        e.currentTarget.style.background = "#1f2937";
                    }}

                    onMouseLeave={(e) => {
                        e.currentTarget.style.background = "#111827";
                    }}
                >
                    ➕ Create Project
                </button>
            </div>

            {/* GRID */}
            <div style={{
                display: "grid",
                gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
                gap: "15px"
            }}>
                {projects.map(p => (
                    <div
                        key={p.id}
                        style={{
                            background: "white",
                            borderRadius: "14px",
                            padding: "18px",
                            border: "1px solid #eee",
                            boxShadow: "0 2px 10px rgba(0,0,0,0.06)",
                            transition: "0.25s",
                            display: "flex",
                            flexDirection: "column",
                            justifyContent: "space-between"
                        }}

                        onMouseEnter={(e) => {
                            e.currentTarget.style.transform = "translateY(-5px)";
                            e.currentTarget.style.boxShadow = "0 12px 25px rgba(0,0,0,0.12)";
                        }}

                        onMouseLeave={(e) => {
                            e.currentTarget.style.transform = "translateY(0)";
                            e.currentTarget.style.boxShadow = "0 2px 10px rgba(0,0,0,0.06)";
                        }}
                    >

                        {/* TITLE */}
                        <div>
                            <h3 style={{
                                margin: "0 0 8px 0",
                                fontSize: "16px",
                                fontWeight: "600",
                                color: "#111827"
                            }}>
                                {p.name}
                            </h3>

                            <p style={{
                                margin: 0,
                                fontSize: "13px",
                                color: "#6b7280",
                                lineHeight: "1.4"
                            }}>
                                {p.description || "No description provided"}
                            </p>
                        </div>

                        {/* ACTIONS */}
                        <div style={{
                            marginTop: "15px",
                            display: "flex",
                            gap: "8px",
                            flexWrap: "wrap"
                        }}>
                            <button
                                onClick={() => navigate(`/project/${p.id}`)}
                                style={{
                                    flex: 1,
                                    padding: "8px",
                                    borderRadius: "8px",
                                    border: "1px solid #3b82f6",
                                    background: "#eff6ff",
                                    color: "#2563eb",
                                    cursor: "pointer",
                                    fontWeight: "500"
                                }}
                            >
                                Open
                            </button>

                            <button
                                onClick={() => {
                                    setSelectedProject(p);
                                    setEditName(p.name);
                                    setEditDesc(p.description);
                                    setIsModalOpen(true);
                                }}
                                style={{
                                    flex: 1,
                                    padding: "8px",
                                    borderRadius: "8px",
                                    border: "1px solid #f59e0b",
                                    background: "#fffbeb",
                                    color: "#b45309",
                                    cursor: "pointer",
                                    fontWeight: "500"
                                }}
                            >
                                Edit
                            </button>

                            <button
                                onClick={() => {
                                    if (!window.confirm("Delete this project?")) return;

                                    api.delete(`/projects/${p.id}`)
                                        .then(() => {
                                            setProjects(projects.filter(x => x.id !== p.id));
                                        });
                                }}
                                style={{
                                    flex: 1,
                                    padding: "8px",
                                    borderRadius: "8px",
                                    border: "1px solid #ef4444",
                                    background: "#fef2f2",
                                    color: "#dc2626",
                                    cursor: "pointer",
                                    fontWeight: "500"
                                }}
                            >
                                Delete
                            </button>
                        </div>

                    </div>
                ))}
            </div>

            <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>

                <h3 style={{
                    marginBottom: "15px",
                    fontSize: "18px",
                    fontWeight: "600",
                    color: "#111827"
                }}>
                    ✏️ Edit Project
                </h3>

                {/* NAME FIELD */}
                <label style={{
                    fontSize: "13px",
                    fontWeight: "500",
                    color: "#374151"
                }}>
                    Project Name
                </label>

                <input
                    value={editName}
                    onChange={(e) => setEditName(e.target.value)}
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

                {/* DESCRIPTION FIELD */}
                <label style={{
                    fontSize: "13px",
                    fontWeight: "500",
                    color: "#374151"
                }}>
                    Description
                </label>

                <textarea
                    value={editDesc}
                    onChange={(e) => setEditDesc(e.target.value)}
                    placeholder="Enter project description"
                    rows={4}
                    style={{
                        width: "100%",
                        padding: "10px",
                        marginTop: "6px",
                        marginBottom: "20px",
                        borderRadius: "8px",
                        border: "1px solid #d1d5db",
                        resize: "none",
                        outline: "none",
                        boxSizing: "border-box"
                    }}
                />

                {/* ACTION BUTTONS */}
                <div style={{
                    display: "flex",
                    gap: "10px"
                }}>

                    <button
                        onClick={() => setIsModalOpen(false)}
                        style={{
                            flex: 1,
                            padding: "10px",
                            borderRadius: "8px",
                            border: "1px solid #d1d5db",
                            background: "#f3f4f6",
                            color: "#374151",
                            cursor: "pointer",
                            fontWeight: "500"
                        }}
                    >
                        Cancel
                    </button>

                    <button
                        onClick={async () => {
                            await api.put(`/projects/${selectedProject.id}`, {
                                ...selectedProject,
                                name: editName,
                                description: editDesc
                            });

                            setProjects(projects.map(x =>
                                x.id === selectedProject.id
                                    ? { ...x, name: editName, description: editDesc }
                                    : x
                            ));

                            setIsModalOpen(false);
                        }}
                        style={{
                            flex: 1,
                            padding: "10px",
                            borderRadius: "8px",
                            border: "none",
                            background: "#111827",
                            color: "white",
                            cursor: "pointer",
                            fontWeight: "500",
                            transition: "0.2s"
                        }}

                        onMouseEnter={(e) => {
                            e.currentTarget.style.background = "#1f2937";
                        }}

                        onMouseLeave={(e) => {
                            e.currentTarget.style.background = "#111827";
                        }}
                    >
                        Save Changes
                    </button>

                </div>

            </Modal>

            <Modal isOpen={isCreateOpen} onClose={() => setIsCreateOpen(false)}>

                <h3 style={{ marginBottom: "15px" }}>➕ Create Project</h3>

                {/* NAME */}
                <label>Project Name *</label>
                <input
                    value={newName}
                    onChange={(e) => setNewName(e.target.value)}
                    style={{
                        width: "100%",
                        padding: "10px",
                        marginTop: "6px",
                        marginBottom: "10px",
                        borderRadius: "8px",
                        border: "1px solid #ddd",
                        boxSizing: "border-box"
                    }}
                />

                {/* DESCRIPTION */}
                <label>Description</label>
                <textarea
                    value={newDesc}
                    onChange={(e) => setNewDesc(e.target.value)}
                    rows={4}
                    style={{
                        width: "100%",
                        padding: "10px",
                        marginTop: "6px",
                        marginBottom: "15px",
                        borderRadius: "8px",
                        border: "1px solid #ddd",
                        resize: "none",
                        boxSizing: "border-box"
                    }}
                />

                {/* ERROR */}
                {error && (
                    <p style={{ color: "red", fontSize: "13px" }}>
                        {error}
                    </p>
                )}

                {/* BUTTONS */}
                <div style={{ display: "flex", gap: "10px" }}>

                    <button
                        onClick={() => setIsCreateOpen(false)}
                        style={{
                            flex: 1,
                            padding: "10px",
                            borderRadius: "8px",
                            border: "1px solid #ddd",
                            background: "#f3f4f6"
                        }}
                    >
                        Cancel
                    </button>

                    <button
                        onClick={async () => {
                            if (!newName.trim()) {
                                setError("Name is required");
                                return;
                            }

                            try {
                                setLoading(true);
                                setError("");

                                const res = await api.post("/projects", {
                                    name: newName,
                                    description: newDesc
                                });

                                setProjects([...projects, res.data]);

                                setNewName("");
                                setNewDesc("");
                                setIsCreateOpen(false);

                            } catch (err) {
                                setError(err.response?.data?.errors?.Name?.[0] || "Error");
                            } finally {
                                setLoading(false);
                            }
                        }}
                        style={{
                            flex: 1,
                            padding: "10px",
                            borderRadius: "8px",
                            border: "none",
                            background: "#111827",
                            color: "white"
                        }}
                    >
                        {loading ? "Creating..." : "Create"}
                    </button>

                </div>

            </Modal>
        </div>
    );
}

export default ProjectList;