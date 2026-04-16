import Sidebar from "../components/Sidebar";
import Header from "../components/Header";

function MainLayout({ children }) {
    return (
        <div style={{ display: "flex", height: "100vh" }}>

            {/* Sidebar */}
            <Sidebar />

            {/* Main Section */}
            <div style={{ flex: 1, display: "flex", flexDirection: "column" }}>

                <Header />

                <div style={{
                    padding: "20px",
                    background: "#f4f6f9",
                    height: "100%",
                    overflowY: "auto"
                }}>
                    {children}
                </div>

            </div>
        </div>
    );
}

export default MainLayout;