import React, { useEffect, useState } from "react";
import { formatDistanceToNow } from "date-fns";
import { AlertTriangle, ArrowLeft, Trash2, Info, ShieldAlert, SunSnow } from "lucide-react";
import { useNavigate } from "react-router-dom";

const alertThemes = [
  { icon: <AlertTriangle className="text-red-600 w-5 h-5" />, bg: "bg-red-50", border: "border-red-500", text: "text-red-900" },
  { icon: <SunSnow className="text-blue-600 w-5 h-5" />, bg: "bg-blue-50", border: "border-blue-500", text: "text-blue-900" },
  { icon: <ShieldAlert className="text-yellow-600 w-5 h-5" />, bg: "bg-yellow-50", border: "border-yellow-500", text: "text-yellow-900" },
  { icon: <Info className="text-green-600 w-5 h-5" />, bg: "bg-green-50", border: "border-green-500", text: "text-green-900" },
];

const dummyAlerts = [
  { id: 1, message: "Heavy rainfall expected in your region", timestamp: new Date(Date.now() - 3600 * 1000) },
  { id: 2, message: "Wheat crop at risk due to sudden temperature drop", timestamp: new Date(Date.now() - 7200 * 1000) },
  { id: 3, message: "Soil moisture levels low; irrigation recommended", timestamp: new Date(Date.now() - 10800 * 1000) },
  { id: 4, message: "Pest alert: Locusts spotted nearby", timestamp: new Date(Date.now() - 14400 * 1000) },
  { id: 5, message: "Optimal time to fertilize maize crop", timestamp: new Date(Date.now() - 18000 * 1000) },
];

const FarmingAlerts = () => {
  const [alerts, setAlerts] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    // Simulate fetching data
    setTimeout(() => {
      setAlerts(dummyAlerts);
      setLoading(false);
    }, 500); // small delay to simulate loading
  }, []);

  const deleteAlert = (id) => {
    setAlerts((prev) => prev.filter((alert) => alert.id !== id));
  };

  return (
    <div className="max-w-6xl mx-auto px-4 py-6 font-poppins">
      {/* Header */}
      <div className="flex items-center gap-3 mb-6">
        <button onClick={() => navigate(-1)} className="text-gray-600 hover:text-black transition">
          <ArrowLeft size={22} />
        </button>
        <h1 className="text-2xl font-bold text-green-800 flex items-center gap-2">
          <AlertTriangle className="text-green-600" />
          Farming Alerts
        </h1>
      </div>

      {/* Alerts */}
      {loading ? (
        <p className="text-sm text-gray-600">Loading alerts...</p>
      ) : alerts.length === 0 ? (
        <p className="text-sm text-gray-500">No alerts available at the moment.</p>
      ) : (
        <ul className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-5">
          {alerts.map((alert, index) => {
            const theme = alertThemes[index % alertThemes.length];
            return (
              <li
                key={alert.id}
                className={`p-4 rounded-lg border-l-4 shadow-sm relative hover:shadow-md transition-all duration-200 ${theme.bg} ${theme.border}`}
              >
                {/* Delete Button */}
                <button onClick={() => deleteAlert(alert.id)} className="absolute top-2 right-2 text-gray-400 hover:text-red-600 transition">
                  <Trash2 size={16} />
                </button>

                {/* Icon and Message */}
                <div className="flex items-start gap-3">
                  <div>{theme.icon}</div>
                  <div>
                    <p className={`font-semibold text-sm ${theme.text}`}>{alert.message}</p>
                    <p className="text-xs text-gray-600 mt-1">
                      {formatDistanceToNow(new Date(alert.timestamp), { addSuffix: true })}
                    </p>
                  </div>
                </div>
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
};

export default FarmingAlerts;
