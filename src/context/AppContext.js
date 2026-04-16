import { createContext, useState } from "react";

export const AppContext = createContext();

export function AppProvider({ children }) {
    const [selectedProject, setSelectedProject] = useState(null);

    return (
        <AppContext.Provider value={{ selectedProject, setSelectedProject }}>
            {children}
        </AppContext.Provider>
    );
}