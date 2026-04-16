import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import api from "../services/api";
import Modal from "../components/Modal";
import { useNavigate } from "react-router-dom";

function TaskDetail() {
    const { id } = useParams();
    const navigate = useNavigate();
    const [task, setTask] = useState(null);
    const [comments, setComments] = useState([]);
    const [text, setText] = useState("");

    const [isEditOpen, setIsEditOpen] = useState(false);
    const [editTitle, setEditTitle] = useState("");
    const [editStatus, setEditStatus] = useState("");
    const [editPriority, setEditPriority] = useState("");

    useEffect(() => {
        loadTask();
        loadComments();
    }, [id]);

    const loadTask = async () => {
        const res = await api.get(`/tasks/${id}`);
        setTask(res.data);
    };

    const loadComments = async () => {
        const res = await api.get(`/tasks/${id}/comments`);
        setComments(res.data);
    };

    const addComment = async () => {
        if (!text.trim()) return;

        const res = await api.post(`/tasks/${id}/comments`, {
            author: "User",
            body: text
        });

        setComments([...comments, res.data]);
        setText("");
    };

    if (!task) return <p style={{ padding: 20 }}>Loading...</p>;

    return (
        <div style={pageStyle}>

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
                ← Back to Tasks
            </button>

            {/* HEADER CARD */}
            <div style={card}>
                <div style={{ display: "flex", justifyContent: "space-between" }}>

                    <div>
                        <h2 style={{ margin: 0 }}>{task.title}</h2>

                        <div style={{ marginTop: 6, fontSize: 13, color: "#6b7280" }}>
                            Status: <b>{task.status}</b> | Priority: <b>{task.priority}</b>
                        </div>
                    </div>

                    <button
                        onClick={() => {
                            setEditTitle(task.title);
                            setEditStatus(task.status);
                            setEditPriority(task.priority);
                            setIsEditOpen(true);
                        }}
                        style={primaryBtn}
                    >
                        ✏️ Edit Task
                    </button>
                </div>

                <p style={{ marginTop: 10, color: "#4b5563" }}>
                    {task.description || "No description"}
                </p>
            </div>

            {/* COMMENTS SECTION */}
            <div style={card}>
                <h3 style={{ marginTop: 0 }}>💬 Comments</h3>

                <div style={{ maxHeight: 300, overflowY: "auto" }}>
                    {comments.map(c => (
                        <div key={c.id} style={commentBox}>
                            <div style={{ fontSize: 13 }}>
                                <b>{c.author}</b>
                            </div>

                            <div style={{ marginTop: 4 }}>{c.body}</div>

                            <button
                                onClick={() => {
                                    if (!window.confirm("Delete comment?")) return;

                                    api.delete(`/comments/${c.id}`).then(() => {
                                        setComments(comments.filter(x => x.id !== c.id));
                                    });
                                }}
                                style={deleteBtn}
                            >
                                Delete
                            </button>
                        </div>
                    ))}
                </div>

                {/* COMMENT INPUT */}
                <div style={{ display: "flex", gap: 10, marginTop: 15 }}>
                    <input
                        value={text}
                        onChange={e => setText(e.target.value)}
                        placeholder="Write a comment..."
                        style={input}
                    />

                    <button onClick={addComment} style={primaryBtn}>
                        Send
                    </button>
                </div>
            </div>

            {/* EDIT MODAL */}
            <Modal isOpen={isEditOpen} onClose={() => setIsEditOpen(false)}>

                <h3>✏️ Edit Task</h3>

                <label>Title</label>
                <input
                    value={editTitle}
                    onChange={(e) => setEditTitle(e.target.value)}
                    style={input}
                />

                <label>Status</label>
                <select
                    value={editStatus}
                    onChange={(e) => setEditStatus(e.target.value)}
                    style={input}
                >
                    <option value="Todo">Todo</option>
                    <option value="InProgress">InProgress</option>
                    <option value="Review">Review</option>
                    <option value="Done">Done</option>
                </select>

                <label>Priority</label>
                <select
                    value={editPriority}
                    onChange={(e) => setEditPriority(e.target.value)}
                    style={input}
                >
                    <option value="Low">Low</option>
                    <option value="Medium">Medium</option>
                    <option value="High">High</option>
                    <option value="Critical">Critical</option>
                </select>

                <div style={{ display: "flex", gap: 10, marginTop: 15 }}>
                    <button onClick={() => setIsEditOpen(false)} style={secondaryBtn}>
                        Cancel
                    </button>

                    <button
                        onClick={async () => {
                            await api.put(`/tasks/${id}`, {
                                ...task,
                                title: editTitle,
                                status: editStatus,
                                priority: editPriority
                            });

                            setIsEditOpen(false);
                            loadTask();
                        }}
                        style={primaryBtn}
                    >
                        Save
                    </button>
                </div>
            </Modal>

        </div>
    );
}
export default TaskDetail;

const pageStyle = {
    padding: "20px",
    maxWidth: "800px",
    margin: "0 auto"
};

const card = {
    background: "white",
    border: "1px solid #e5e7eb",
    borderRadius: "12px",
    padding: "16px",
    marginBottom: "15px",
    boxShadow: "0 2px 8px rgba(0,0,0,0.05)"
};

const input = {
    width: "100%",
    padding: "10px",
    borderRadius: "8px",
    border: "1px solid #d1d5db",
    marginTop: "5px"
};

const primaryBtn = {
    padding: "8px 12px",
    borderRadius: "8px",
    border: "none",
    background: "#111827",
    color: "white",
    cursor: "pointer"
};

const secondaryBtn = {
    padding: "8px 12px",
    borderRadius: "8px",
    border: "1px solid #d1d5db",
    background: "#f3f4f6",
    cursor: "pointer"
};

const deleteBtn = {
    marginTop: "5px",
    fontSize: "12px",
    color: "red",
    border: "none",
    background: "transparent",
    cursor: "pointer"
};

const commentBox = {
    padding: "10px",
    border: "1px solid #eee",
    borderRadius: "8px",
    marginBottom: "10px",
    background: "#fafafa"
};