import React, { useMemo } from "react";
import { Link, useLocation } from "react-router-dom";
import {
  Home,
  Bell,
  BookOpen,
  Database,
  Users,
  FileText,
  BarChart,
  User,
  X,
} from "lucide-react";
import { useTranslation } from "react-i18next";

const OfficerSidebar = ({ setIsSidebarOpen }) => {
  const location = useLocation();
  const { t } = useTranslation();

 const menuItems = useMemo(
  () => [
    { name: t("Officer Dashboard"), path: "/dashboard", icon: <Home size={20} /> },
    { name: t("Advisory Management"), path: "/dashboard/advisory-management", icon: <BookOpen size={20} /> },
    { name: t("Alerts"), path: "/dashboard/alerts", icon: <Bell size={20} /> },
    { name: t("Crop Data"), path: "/dashboard/crop-data", icon: <Database size={20} /> },
    { name: t("Farmer Queries"), path: "/dashboard/farmer-queries", icon: <Users size={20} /> },
    { name: t("Knowledge Base"), path: "/dashboard/knowledge-base", icon: <FileText size={20} /> },
    { name: t("Report & Analytics"), path: "/dashboard/reports-analytics", icon: <BarChart size={20} /> },
    { name: t("Profile"), path: "/dashboard/profile", icon: <User size={20} /> },
  ],
  [t]
);


  return (
    <div className="bg-green-900 text-white h-full w-64 p-4 pt-20 md:pt-24 flex flex-col justify-between">
      {/* Top Section: Logo and Close (Mobile) */}
      <div>
        <div className="md:hidden flex items-center justify-between px-4 absolute top-2 left-0 right-0">
          <img src="/swarnbhoomi-logo.png" alt="SwLogo" className="h-[90px] w-auto" />
          <button onClick={() => setIsSidebarOpen(false)} className="text-white ml-4">
            <X size={24} />
          </button>
        </div>

        {/* Navigation Links */}
        <nav className="space-y-1 mt-4">
          {menuItems.map((item) => (
            <Link
              key={item.path}
              to={item.path}
              className={`flex items-center gap-3 px-3 py-2 rounded-md text-sm md:text-base font-medium transition-all ${
                location.pathname === item.path
                  ? "bg-green-700 text-white"
                  : "hover:bg-green-800 text-white/90"
              }`}
              onClick={() => setIsSidebarOpen(false)}
            >
              {item.icon}
              <span>{item.name}</span>
            </Link>
          ))}
        </nav>
      </div>

      {/* Bottom Section */}
      <div className="text-center text-xs text-white/60 mt-6 mb-2">
        <hr className="border-white/20 my-2" />
        <p>{t("copyright", { year: 2025 })}</p>
        <p>{t("version", { version: "1.0.0" })}</p>
      </div>
    </div>
  );
};

export default OfficerSidebar;
