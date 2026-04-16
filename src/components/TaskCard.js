function TaskCard({ task, onView, onDelete, onEdit }) {

    const getBadgeColor = (type, value) => {
        if (type === "status") {
            switch (value) {
                case "Done": return "#16a34a";
                case "InProgress": return "#2563eb";
                case "Review": return "#f59e0b";
                default: return "#6b7280";
            }
        }

        if (type === "priority") {
            switch (value) {
                case "Critical": return "#7f1d1d";
                case "High": return "#dc2626";
                case "Medium": return "#f59e0b";
                default: return "#16a34a";
            }
        }
    };

    return (
        <div style={cardStyle}>

            {/* TITLE SECTION (same as project card) */}
            <h3 style={titleStyle}>
                {task.title}
            </h3>

            <p style={descStyle}>
                Task item under your project workflow
            </p>

            {/* BADGES ROW */}
            <div style={badgeRow}>
                <span style={{
                    ...badgeStyle,
                    background: getBadgeColor("status", task.status)
                }}>
                    {task.status}
                </span>

                <span style={{
                    ...badgeStyle,
                    background: getBadgeColor("priority", task.priority)
                }}>
                    {task.priority}
                </span>
            </div>

            {/* BUTTONS */}
            <div style={btnRow}>

                <button onClick={onView} style={btn}>
                    Open
                </button>

                <button onClick={onEdit} style={btn}>
                    Edit
                </button>

                <button onClick={onDelete} style={btnDanger}>
                    Delete
                </button>

            </div>

        </div>
    );
}

/* CARD (MATCH PROJECT CARD STYLE) */
const cardStyle = {
    background: "#fff",
    border: "1px solid #e5e7eb",
    borderRadius: "12px",
    padding: "15px",
    boxShadow: "0 2px 5px rgba(0,0,0,0.08)",
    display: "flex",
    flexDirection: "column",
    gap: "10px",
    transition: "0.2s"
};

/* TITLE (SAME FEEL AS PROJECT CARD) */
const titleStyle = {
    margin: 0,
    fontSize: "16px",
    fontWeight: "600",
    color: "#111827"
};

/* DESCRIPTION (like project description) */
const descStyle = {
    margin: 0,
    fontSize: "13px",
    color: "#6b7280"
};

/* BADGES */
const badgeRow = {
    display: "flex",
    gap: "6px",
    flexWrap: "wrap"
};

const badgeStyle = {
    fontSize: "11px",
    padding: "4px 8px",
    borderRadius: "6px",
    color: "#fff",
    fontWeight: "500"
};

/* BUTTON ROW */
const btnRow = {
    display: "flex",
    gap: "8px",
    marginTop: "5px"
};

const btn = {
    flex: 1,
    padding: "7px",
    fontSize: "12px",
    borderRadius: "8px",
    border: "1px solid #d1d5db",
    background: "#fff",
    cursor: "pointer"
};

const btnDanger = {
    flex: 1,
    padding: "7px",
    fontSize: "12px",
    borderRadius: "8px",
    border: "none",
    background: "#dc2626",
    color: "#fff",
    cursor: "pointer"
};

export default TaskCard;