import React, { useState, useEffect } from "react";
import FarmerSidebar from "./Sidebar";
import OfficerSidebar from "./OfficerSidebar";
import AdminSidebar from "./AdminSidebar";
import FarmerNavbar from "./Navbar";
import OfficerNavbar from "./OfficerNavbar";
import AdminNavbar from "./AdminNavbar";
import BottomTabBar from "./BottomTabBar";
import { Outlet } from "react-router-dom";

const Layout = ({ role }) => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
      if (window.innerWidth < 768) setIsSidebarOpen(false);
      else setIsSidebarOpen(true);
    };
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const toggleSidebar = () => setIsSidebarOpen(prev => !prev);

  const renderSidebar = () => {
    const props = { setIsSidebarOpen, isSidebarOpen };
    switch (role) {
      case "admin":
        return <AdminSidebar {...props} />;
      case "officer":
        return <OfficerSidebar {...props} />;
      case "farmer":
        return <FarmerSidebar {...props} />;
      default:
        return null;
    }
  };

  const renderNavbar = () => {
    const props = { setIsSidebarOpen, isSidebarOpen };
    switch (role) {
      case "admin":
        return <AdminNavbar {...props} />;
      case "officer":
        return <OfficerNavbar {...props} />;
      case "farmer":
        return <FarmerNavbar {...props} />;
      default:
        return null;
    }
  };

  const getSidebarBgColor = () => {
    switch (role) {
      case "admin":
        return "bg-indigo-900";
      case "officer":
        return "bg-green-900";
      case "farmer":
        return "bg-blue-900";
      default:
        return "bg-gray-800";
    }
  };

  return (
    <div className="relative flex flex-col min-h-screen bg-gray-100">
      {/* Navbar */}
      <header className="fixed top-0 left-0 right-0 z-50">
        {renderNavbar()}
      </header>

      {/* Mobile Sidebar */}
      <div
        className={`fixed top-0 left-0 h-full w-64 z-50 transform transition-transform duration-300 ${getSidebarBgColor()} md:hidden ${
          isSidebarOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        {renderSidebar()}
      </div>

      {/* Desktop Sidebar */}
      <div className={`hidden md:block fixed top-0 left-0 w-64 h-full ${getSidebarBgColor()} z-30`}>
        {renderSidebar()}
      </div>

      {/* Overlay for mobile */}
      {isMobile && isSidebarOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-40 md:hidden"
          onClick={toggleSidebar}
        />
      )}

      {/* Page Content */}
      <div className={`flex-1 pt-16 md:ml-64 flex flex-col`}>
        <main className="flex-1 px-4 pb-20 overflow-y-auto h-[calc(100vh-4rem)]">
          <Outlet />
        </main>

        {/* Mobile Bottom Bar */}
        {isMobile && <BottomTabBar />}
      </div>
    </div>
  );
};

export default Layout;
