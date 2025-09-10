import React, { useEffect, useState } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import { onAuthStateChanged } from "firebase/auth";
import { doc, getDoc } from "firebase/firestore";
import { auth, db } from "./firebase";

// Farmer Pages
import Dashboard from "./pages/Dashboard";
import MyCrop from "./pages/MyCrop";
import VoiceBot from "./pages/VoiceBot";
import Inventory from "./pages/Inventory";
import Weather from "./pages/Weather";
import ProfilePage from "./pages/ProfilePage";
import AdvisoryPage from "./pages/AdvisoryPage";
import AgroRentTab from "./pages/AgroRentTab";
import SoilAdvisory from "./pages/SoilAdvisory";
import CommunityPage from "./pages/CommunityPage";
import Waste from "./pages/Waste";
import FpoPage from "./pages/FpoPage";
import Learning from "./pages/Learning";
import TopicDetail from "./pages/TopicDetail";
import Ndvi from "./pages/Ndvi";
import MandiPage from "./pages/MandiPage";
import CommoditySelection from "./pages/CommoditySelection";
import CommodityPrices from "./pages/CommodityPrices";
import FarmingAlerts from "./pages/FarmingAlerts";
import SchemesPage from "./pages/SchemesPage";
import SchemesLayout from "./pages/SchemesLayout";
import Agriculture from "./pages/schemes/Agriculture";
import Irrigation from "./pages/schemes/Irrigation";
import Animal from "./pages/schemes/Animal";
import FarmMachine from "./pages/schemes/FarmMachine";
import Horticulture from "./pages/schemes/Horticulture";
import Others from "./pages/schemes/Others";

// Officer Pages
import OfficerDashboard from "./pages/officer/OfficerDashboard";

// Admin Pages
import AdminDashboard from "./pages/admin/AdminDashboard";

// Public
import LandingPage from "./pages/Landing";
import AuthPage from "./pages/AuthPage";
import Registration from "./pages/Registration";
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

  const getDashboard = () => {
    switch (role) {
      case "farmer":
        return <Layout role="farmer"><Dashboard /></Layout>;
      case "officer":
        return <Layout role="officer"><OfficerDashboard /></Layout>;
      case "admin":
        return <Layout role="admin"><AdminDashboard /></Layout>;
      default:
        return <Navigate to="/auth" />;
    }
  };

  return (
    <Routes>
      {/* Public Routes */}
      <Route path="/" element={<LandingPage />} />
      <Route path="/auth" element={<AuthPage setUser={setUser} />} />
      <Route path="/register" element={<Registration />} />

      {/* Protected Dashboard */}
      <Route
        path="/dashboard/*"
        element={user && role ? getDashboard() : <Navigate to="/auth" />}
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
          </>
        )}

        {/* Admin Routes */}
        {role === "admin" && (
          <>
            <Route index element={<AdminDashboard />} />
          </>
        )}
      </Route>

      {/* Fallback */}
      <Route path="*" element={<Navigate to="/" />} />
    </Routes>
  );
};

export default App;
