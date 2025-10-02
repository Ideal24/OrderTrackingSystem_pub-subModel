// src/App.tsx
import Sidebar from "./components/Sidebar";
import Dashboard from "./pages/Dashboard";

const App = () => {
  return (
    <div className="flex h-screen">
      <Sidebar />
      <Dashboard />
    </div>
  );
};

export default App;
