function Modal({ isOpen, onClose, children }) {
    if (!isOpen) return null;

    return (
        <div style={{
            position: "fixed",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
            background: "rgba(0,0,0,0.5)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            zIndex: 1000
        }}>
            <div style={{
                background: "white",
                padding: "20px",
                borderRadius: "12px",
                width: "400px",
                boxShadow: "0 10px 30px rgba(0,0,0,0.2)",
                position: "relative"
            }}>

                {/* Close button */}
                <button
                    onClick={onClose}
                    style={{
                        position: "absolute",
                        top: "10px",
                        right: "10px",
                        border: "none",
                        background: "transparent",
                        fontSize: "18px",
                        cursor: "pointer"
                    }}
                >
                    ✖
                </button>

                {children}
            </div>
        </div>
    );
}

export default Modal;