import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { db, auth } from "../../firebase";
import { doc, getDoc } from "firebase/firestore";
import {
  Bell,
  Users,
  BarChart3,
  BookOpen,
  Database,
  MessageSquare,
} from "lucide-react";
import "@fontsource/poppins/400.css";
import "@fontsource/poppins/600.css";
import "@fontsource/poppins/700.css";

const OfficerDashboard = () => {
  const [officerData, setOfficerData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchOfficerData = async () => {
      if (auth.currentUser) {
        const officerRef = doc(db, "officers", auth.currentUser.uid);
        const officerSnap = await getDoc(officerRef);
        if (officerSnap.exists()) {
          setOfficerData(officerSnap.data());
        }
      }
      setLoading(false);
    };

    fetchOfficerData();
  }, []);

  if (loading) {
    return (
      <div className="p-4 bg-gray-100 min-h-screen font-poppins text-center">
        Loading officer dashboard...
      </div>
    );
  }

  return (
    <div className="px-4 py-6 sm:px-8 bg-gradient-to-br min-h-screen font-poppins text-gray-800">
      <div className="max-w-7xl mx-auto">
        {/* Officer Info */}
        <div className="flex justify-between items-center mb-6">
          <div>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-green-800">
              Welcome, {officerData?.name || "Officer"} 👋
            </h1>
            <p className="text-base text-gray-700">
              {officerData?.designation || "Agriculture Officer"}
            </p>
          </div>
        </div>

        {/* Officer Quick Stats */}
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 mb-8">
          <QuickStat label="Farmers Managed" value={officerData?.farmersCount || 0} />
          <QuickStat label="Active Alerts" value={officerData?.activeAlerts || 0} />
          <QuickStat label="Reports Generated" value={officerData?.reportsCount || 0} />
        </div>

        {/* Cards Section */}
        <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 gap-5">
          <Card
            to="/dashboard/advisory-management"
            icon={<Users className="text-green-700" />}
            title="Advisory Management"
            subtitle="Create and send advisories to farmers"
          />
          <Card
            to="/dashboard/alerts"
            icon={<Bell className="text-red-500" />}
            title="Alerts"
            subtitle="Manage weather & pest alerts"
          />
          <Card
            to="/dashboard/crop-data"
            icon={<Database className="text-blue-600" />}
            title="Crop Data"
            subtitle="Update and monitor crop statistics"
          />
          <Card
            to="/dashboard/farmer-queries"
            icon={<MessageSquare className="text-purple-600" />}
            title="Farmer Queries"
            subtitle="Answer farmers' questions"
          />
          <Card
            to="/dashboard/knowledge-base"
            icon={<BookOpen className="text-indigo-600" />}
            title="Knowledge Base"
            subtitle="Access guidelines & resources"
          />
          <Card
            to="/dashboard/reports-analytics"
            icon={<BarChart3 className="text-yellow-500" />}
            title="Reports & Analytics"
            subtitle="View analytics & generate reports"
          />
        </div>
      </div>
    </div>
  );
};

const QuickStat = ({ label, value }) => {
  return (
    <div className="bg-white border border-gray-200 rounded-md shadow p-4 text-center">
      <h3 className="text-2xl font-bold text-green-700">{value}</h3>
      <p className="text-sm text-gray-600">{label}</p>
    </div>
  );
};

const Card = ({ to, icon, title, subtitle }) => {
  return (
    <Link
      to={to}
      className="bg-white border border-gray-300 p-5 rounded-md shadow hover:shadow-md transition-all flex flex-col gap-3 text-center items-center hover:border-green-400"
    >
      <div className="w-12 h-12 flex items-center justify-center rounded-full bg-green-50">
        {icon}
      </div>
      <h3 className="text-base font-semibold text-gray-900">{title}</h3>
      <p className="text-sm text-gray-600 leading-snug">{subtitle}</p>
    </Link>
  );
};

export default OfficerDashboard;
