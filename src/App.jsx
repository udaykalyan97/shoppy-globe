// Library imports
import { Outlet } from "react-router-dom";
import Header from "./components/Header";
import SidePanel from "./components/SidePanel"; // Import the SidePanel component

// App Component
function App() {
  return (
    <>
      <Header />
      <div className="flex">
        {/* Left Side Panel */}
        <aside className="w-48 bg-gray-100 h-screen p-4 shadow-md">
          <SidePanel />
        </aside>

        {/* Main Content Area */}
        <main className="flex-1 p-4">
          <Outlet />
        </main>
      </div>
    </>
  );
}

export default App;
