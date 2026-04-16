import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import Dashboard from "./pages/Dashboard";
import ProjectBoard from "./pages/ProjectBoard";
import ProjectList from "./pages/ProjectList";
import TaskDetail from "./pages/TaskDetail";
import CreateProject from "./pages/CreateProject";
import { AppProvider } from "./context/AppContext";
import MainLayout from "./layout/MainLayout";

function App() {
  return (
    <AppProvider>
      <BrowserRouter>

        {/* 🔝 Simple Navbar */}
        {/* <nav style={{ padding: "10px", background: "#eee" }}>
          <Link to="/" style={{ marginRight: "10px" }}>Dashboard</Link>
          <Link to="/projects">Projects</Link>
        </nav> */}
        <MainLayout>
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/projects" element={<ProjectList />} />
            <Route path="/create-project" element={<CreateProject />} />
            <Route path="/project/:id" element={<ProjectBoard />} />
            <Route path="/task/:id" element={<TaskDetail />} />
          </Routes>
        </MainLayout>
      </BrowserRouter>
    </AppProvider>
  );
}

export default App;