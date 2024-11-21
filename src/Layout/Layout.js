import React, { useState } from "react";
import Header from "./Header";
import Sidebar from "./Sidebar";

const Layout = ({ children }) => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  return (
    <div className="min-h-screen flex">
      {/* Sidebar */}
      <Sidebar onToggle={setIsSidebarOpen} />

      {/* Main Content */}
      <div className="flex-1 flex flex-col">
        {/* Top Navbar */}
        <Header isSidebarOpen={isSidebarOpen} />

        {/* Main Content */}
        <main
          className={`mt-[70px] ${
            isSidebarOpen ? "ml-[240px]" : "ml-[80px]"
          } p-6 bg-metronics_white flex-1 overflow-y-auto`}
        >
          {children}
        </main>
      </div>
    </div>
  );
};

export default Layout;
