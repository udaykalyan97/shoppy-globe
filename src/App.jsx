// Library imports
import { Outlet } from "react-router-dom";
import Header from "./components/Header";
import { Provider } from "react-redux";
import appStore from "./utils/appStore";
import SidePanel from "./components/SidePanel"; // Import the SidePanel component

// App Component
function App() {
  return (
    <Provider store={appStore}>
      {/* Header */}
      <Header />

      {/* Main Layout */}
      <div className="flex flex-col lg:flex-row p-4">
        {/* SidePanel (Categories) */}
        <aside className="lg:w-1/8 lg:min-h-screen lg:mr-4 bg-gray-100 p-4 shadow-md rounded-md">
          <SidePanel />
        </aside>

        {/* Main Content Area */}
        <main className="flex-1 p-4 bg-white shadow-md rounded-md">
          <Outlet />
        </main>
      </div>
    </Provider>
  );
}

export default App;
