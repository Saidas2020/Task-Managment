import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import api from "../services/api";
import Modal from "../components/Modal";
import TaskCard from "../components/TaskCard";

function ProjectBoard() {
    const { id } = useParams();
    const navigate = useNavigate();

    const [tasks, setTasks] = useState([]);
    const [status, setStatus] = useState("");
    const [priority, setPriority] = useState("");
    const [sortBy, setSortBy] = useState("createdAt");
    const [page, setPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const [isTaskModalOpen, setIsTaskModalOpen] = useState(false);
    const [isEditMode, setIsEditMode] = useState(false);

    const [taskTitle, setTaskTitle] = useState("");
    const [taskStatus, setTaskStatus] = useState("Todo");
    const [taskPriority, setTaskPriority] = useState("Medium");

    const [selectedTask, setSelectedTask] = useState(null);

    const loadTasks = () => {
        api.get(`/projects/${id}/tasks`, {
            params: {
                status,
                priority,
                sortBy,
                page,
                pageSize: 5
            }
        }).then(res => {
            setTasks(res.data.data);
            setTotalPages(res.data.totalPages);
        });
    };

    useEffect(() => {
        loadTasks();
    }, [id, status, priority, sortBy, page]);

    return (
        <div style={{ padding: "20px" }}>

            <button
                onClick={() => navigate(-1)}
                style={{
                    marginBottom: "15px",
                    padding: "8px 12px",
                    borderRadius: "8px",
                    border: "1px solid #d1d5db",
                    background: "#fff",
                    cursor: "pointer"
                }}
            >
                ← Back to Projects
            </button>

            {/* HEADER */}
            <div style={{
                marginBottom: "20px",
                paddingBottom: "10px",
                borderBottom: "1px solid #e5e7eb"
            }}>
                <h2 style={{
                    margin: 0,
                    fontSize: "22px",
                    fontWeight: "600",
                    color: "#111827"
                }}>
                    📋 Task Board
                </h2>

                <p style={{
                    margin: "4px 0 0 0",
                    fontSize: "13px",
                    color: "#6b7280"
                }}>
                    Manage and track all tasks for this project
                </p>
            </div>

            {/* ACTION BAR */}
            <div style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                marginBottom: "15px",
                flexWrap: "wrap",
                gap: "10px"
            }}>
                <button
                    onClick={() => {
                        setIsEditMode(false);
                        setTaskTitle("");
                        setTaskStatus("Todo");
                        setTaskPriority("Medium");
                        setIsTaskModalOpen(true);
                    }}
                    style={{
                        padding: "10px 15px",
                        borderRadius: "10px",
                        border: "none",
                        background: "#111827",
                        color: "white",
                        cursor: "pointer"
                    }}
                >
                    ➕ Add Task
                </button>

                {/* FILTERS */}
                <div style={{
                    display: "flex",
                    gap: "10px",
                    flexWrap: "wrap"
                }}>
                    <select
                        onChange={e => setStatus(e.target.value)}
                        style={selectStyle}
                    >
                        <option value="">All Status</option>
                        <option value="Todo">Todo</option>
                        <option value="InProgress">InProgress</option>
                        <option value="Review">Review</option>
                        <option value="Done">Done</option>
                    </select>

                    <select
                        onChange={e => setPriority(e.target.value)}
                        style={selectStyle}
                    >
                        <option value="">All Priority</option>
                        <option value="Low">Low</option>
                        <option value="Medium">Medium</option>
                        <option value="High">High</option>
                        <option value="Critical">Critical</option>
                    </select>

                    <select
                        onChange={e => setSortBy(e.target.value)}
                        style={selectStyle}
                    >
                        <option value="createdAt">Created</option>
                        <option value="dueDate">Due Date</option>
                        <option value="priority">Priority</option>
                    </select>
                </div>
            </div>

            {/* TASK GRID */}
            <div style={{
                display: "grid",
                gridTemplateColumns: "repeat(auto-fit, minmax(280px, 320px))",
                gap: "15px",
                justifyContent: "start",
                alignItems: "stretch"
            }}>
                {tasks.map(t => (
                    <TaskCard
                        key={t.id}
                        task={t}
                        onView={() => navigate(`/task/${t.id}`)}
                        onEdit={async () => {
                            const newTitle = prompt("Edit title", t.title);
                            if (!newTitle) return;

                            await api.put(`/tasks/${t.id}`, {
                                title: newTitle,
                                status: t.status,
                                priority: t.priority
                            });

                            loadTasks();
                        }}
                        onDelete={() => {
                            if (!window.confirm("Delete this task?")) return;
                            api.delete(`/tasks/${t.id}`).then(loadTasks);
                        }}
                    />
                ))}
            </div>

            {/* PAGINATION */}
            <div style={{
                marginTop: "20px",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                gap: "10px"
            }}>
                <button
                    disabled={page === 1}
                    onClick={() => setPage(page - 1)}
                    style={pageBtn}
                >
                    Prev
                </button>

                <span style={{ fontSize: "13px", color: "#6b7280" }}>
                    Page {page} / {totalPages}
                </span>

                <button
                    disabled={page === totalPages}
                    onClick={() => setPage(page + 1)}
                    style={pageBtn}
                >
                    Next
                </button>
            </div>

            <Modal
                isOpen={isTaskModalOpen}
                onClose={() => setIsTaskModalOpen(false)}
            >
                <h3 style={{ marginBottom: "15px" }}>
                    {isEditMode ? "✏️ Edit Task" : "➕ Create Task"}
                </h3>

                {/* TITLE */}
                <label>Title</label>
                <input
                    value={taskTitle}
                    onChange={(e) => setTaskTitle(e.target.value)}
                    style={{
                        width: "100%",
                        padding: "10px",
                        margin: "6px 0 12px 0",
                        borderRadius: "8px",
                        border: "1px solid #ddd"
                    }}
                />

                {/* STATUS */}
                <label>Status</label>
                <select
                    value={taskStatus}
                    onChange={(e) => setTaskStatus(e.target.value)}
                    style={selectStyle}
                >
                    <option value="Todo">Todo</option>
                    <option value="InProgress">InProgress</option>
                    <option value="Review">Review</option>
                    <option value="Done">Done</option>
                </select>

                {/* PRIORITY */}
                <label style={{ marginTop: "10px", display: "block" }}>
                    Priority
                </label>
                <select
                    value={taskPriority}
                    onChange={(e) => setTaskPriority(e.target.value)}
                    style={selectStyle}
                >
                    <option value="Low">Low</option>
                    <option value="Medium">Medium</option>
                    <option value="High">High</option>
                    <option value="Critical">Critical</option>
                </select>

                {/* ACTIONS */}
                <div style={{ display: "flex", gap: "10px", marginTop: "20px" }}>
                    <button
                        onClick={() => setIsTaskModalOpen(false)}
                        style={pageBtn}
                    >
                        Cancel
                    </button>

                    <button
                        onClick={async () => {
                            if (!taskTitle.trim()) return;

                            if (isEditMode) {
                                await api.put(`/tasks/${selectedTask.id}`, {
                                    title: taskTitle,
                                    status: taskStatus,
                                    priority: taskPriority
                                });
                            } else {
                                await api.post(`/projects/${id}/tasks`, {
                                    title: taskTitle,
                                    status: taskStatus,
                                    priority: taskPriority
                                });
                            }

                            setIsTaskModalOpen(false);
                            loadTasks();
                        }}
                        style={{
                            flex: 1,
                            padding: "10px",
                            borderRadius: "8px",
                            border: "none",
                            background: "#111827",
                            color: "white",
                            cursor: "pointer"
                        }}
                    >
                        {isEditMode ? "Save Changes" : "Create Task"}
                    </button>
                </div>
            </Modal>
        </div>
    );
}

const selectStyle = {
    padding: "8px",
    borderRadius: "8px",
    border: "1px solid #d1d5db",
    fontSize: "13px",
    outline: "none"
};

const pageBtn = {
    padding: "8px 12px",
    borderRadius: "8px",
    border: "1px solid #d1d5db",
    background: "#fff",
    cursor: "pointer"
};

export default ProjectBoard;