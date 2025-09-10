import React, { useEffect, useState } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import { onAuthStateChanged } from "firebase/auth";
import { doc, getDoc } from "firebase/firestore";
import { auth, db } from "./firebase";

// Farmer Pages
import Dashboard from "./pages/farmer/Dashboard";
import MyCrop from "./pages/farmer/MyCrop";
import VoiceBot from "./pages/farmer/VoiceBot";
import Inventory from "./pages/farmer/Inventory";
import Weather from "./pages/farmer/Weather";
import ProfilePage from "./pages/farmer/ProfilePage";
import AdvisoryPage from "./pages/farmer/AdvisoryPage";
import AgroRentTab from "./pages/farmer/AgroRentTab";
import SoilAdvisory from "./pages/farmer/SoilAdvisory";
import CommunityPage from "./pages/farmer/CommunityPage";
import Waste from "./pages/farmer/Waste";
import FpoPage from "./pages/farmer/FpoPage";
import Learning from "./pages/farmer/Learning";
import TopicDetail from "./pages/farmer/TopicDetail";
import Ndvi from "./pages/farmer/Ndvi";
import MandiPage from "./pages/farmer/MandiPage";
import CommoditySelection from "./pages/farmer/CommoditySelection";
import CommodityPrices from "./pages/farmer/CommodityPrices";
import FarmingAlerts from "./pages/farmer/FarmingAlerts";
import SchemesPage from "./pages/farmer/SchemesPage";
import SchemesLayout from "./pages/farmer/SchemesLayout";
import Agriculture from "./pages/farmer/schemes/Agriculture";
import Irrigation from "./pages/farmer/schemes/Irrigation";
import Animal from "./pages/farmer/schemes/Animal";
import FarmMachine from "./pages/farmer/schemes/FarmMachine";
import Horticulture from "./pages/farmer/schemes/Horticulture";
import Others from "./pages/farmer/schemes/Others";

// Officer Pages
import OfficerDashboard from "./pages/officer/OfficerDashboard";
import AdvisoryManagement from "./pages/officer/AdvisoryManagement";
import Alerts from "./pages/officer/Alerts";
import CropData from "./pages/officer/CropData";
import FarmerQueries from "./pages/officer/FarmerQueries";
import KnowledgeBase from "./pages/officer/KnowledgeBase";
import ReportAnalytics from "./pages/officer/ReportAnalytics";
import OfficerProfile from "./pages/officer/OfficerProfile";

// Admin Pages
import AdminDashboard from "./pages/admin/AdminDashboard";
import AdminProfile from "./pages/admin/AdminProfile";
import FarmerManagement from "./pages/admin/UserManagement";
import OfficerManagement from "./pages/admin/UserManagement";
import Settings from "./pages/admin/Settings";
import UserManagement from "./pages/admin/UserManagement";




// Public Pages
import LandingPage from "./pages/Landing";
import AuthPage from "./pages/AuthPage";
import Registration from "./pages/Registration";

// Components
import Layout from "./components/Layout";

const App = () => {
  const [user, setUser] = useState(null);
  const [role, setRole] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
      if (currentUser) {
        const userDoc = await getDoc(doc(db, "users", currentUser.uid));
        if (userDoc.exists()) {
          setUser(currentUser);
          setRole(userDoc.data().role);
        }
      } else {
        setUser(null);
        setRole(null);
      }
      setLoading(false);
    });
    return () => unsubscribe();
  }, []);

  if (loading) return <div>Loading...</div>;

  return (
    <Routes>
      {/* Public Routes */}
      <Route path="/" element={<LandingPage />} />
      <Route path="/auth" element={<AuthPage setUser={setUser} />} />
      <Route path="/register" element={<Registration />} />

      {/* Protected Routes */}
      <Route
        path="/dashboard/*"
        element={
          user && role ? (
            <Layout role={role}>
              {role === "farmer" && <Dashboard />}
              {role === "officer" && <OfficerDashboard />}
              {role === "admin" && <AdminDashboard />}
            </Layout>
          ) : (
            <Navigate to="/auth" />
          )
        }
      >
        {/* Farmer Routes */}
        {role === "farmer" && (
          <>
            <Route index element={<Dashboard />} />
            <Route path="advisoryPage" element={<AdvisoryPage />} />
            <Route path="SoilAdvisory" element={<SoilAdvisory />} />
            <Route path="communityPage" element={<CommunityPage />} />
            <Route path="cropGuide" element={<MyCrop />} />
            <Route path="voiceBot" element={<VoiceBot />} />
            <Route path="waste" element={<Waste />} />
            <Route path="inventory" element={<Inventory />} />
            <Route path="fpoPage" element={<FpoPage />} />
            <Route path="profilePage" element={<ProfilePage />} />
            <Route path="Ndvi" element={<Ndvi />} />
            <Route path="weather" element={<Weather />} />
            <Route path="agroRentTab" element={<AgroRentTab />} />
            <Route path="mandiPage" element={<MandiPage />} />
            <Route path="farmingAlerts" element={<FarmingAlerts />} />
            <Route path="learningPage" element={<Learning />} />
            <Route path="learning/:id" element={<TopicDetail />} />
            <Route path="commoditySelection" element={<CommoditySelection />} />
            <Route path="commodity/:name" element={<CommodityPrices />} />
            <Route path="schemes" element={<SchemesLayout />}>
              <Route index element={<SchemesPage />} />
              <Route path="agriculture" element={<Agriculture />} />
              <Route path="irrigation" element={<Irrigation />} />
              <Route path="horticulture" element={<Horticulture />} />
              <Route path="machines" element={<FarmMachine />} />
              <Route path="animal" element={<Animal />} />
              <Route path="others" element={<Others />} />
            </Route>
          </>
        )}

        {/* Officer Routes */}
        {role === "officer" && (
          <>
            <Route index element={<OfficerDashboard />} />
            <Route path="advisory-management" element={<AdvisoryManagement />} />
            <Route path="alerts" element={<Alerts />} />
            <Route path="crop-data" element={<CropData />} />
            <Route path="farmer-queries" element={<FarmerQueries />} />
            <Route path="knowledge-base" element={<KnowledgeBase />} />
            <Route path="reports-analytics" element={<ReportAnalytics />} />
            <Route path="profile" element={<OfficerProfile />} />
          </>
        )}

       {/* Admin Routes */}
      {role === "admin" && (
        <>
          <Route index element={<AdminDashboard />} />
          <Route path="profile" element={<AdminProfile />} />
          <Route path="user-management" element={<UserManagement />} />
          <Route path="farmer-management" element={<FarmerManagement />} />
          <Route path="officer-management" element={<OfficerManagement />} />
          <Route path="settings" element={<Settings />} />
        </>
      )}
      </Route>

      {/* Fallback */}
      <Route path="*" element={<Navigate to="/" />} />
    </Routes>
  );
};

export default App;
