import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const initialAlerts = [
  {
    id: 1,
    title: "Heavy Rainfall Warning",
    category: "Weather",
    message: "Continuous rainfall expected for next 3 days. Protect crops and store seeds in dry place.",
    date: "2025-09-10 09:30 AM",
    priority: "High"
  },
  {
    id: 2,
    title: "Pest Outbreak Alert",
    category: "Pest",
    message: "Brown plant hopper infestation reported. Spray recommended pesticide immediately.",
    date: "2025-09-09 05:15 PM",
    priority: "Medium"
  }
];

function Alerts() {
  const [alerts, setAlerts] = useState(initialAlerts);
  const [newAlert, setNewAlert] = useState({
    title: "",
    category: "Weather",
    message: "",
    priority: "Medium"
  });
  const [showForm, setShowForm] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!newAlert.title || !newAlert.message) return;
    const alertData = {
      ...newAlert,
      id: Date.now(),
      date: new Date().toLocaleString()
    };
    setAlerts([alertData, ...alerts]);
    setShowForm(false);
    setNewAlert({ title: "", category: "Weather", message: "", priority: "Medium" });
  };

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <h1 className="text-3xl font-bold mb-6">Alerts Management</h1>

      <button
        className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700"
        onClick={() => setShowForm(true)}
      >
        + Send New Alert
      </button>

      {/* Alert Form Modal */}
      <AnimatePresence>
        {showForm && (
          <motion.div
            className="fixed inset-0 bg-black/50 flex items-center justify-center z-50"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <motion.div
              className="bg-white rounded-2xl shadow-xl p-6 w-[500px]"
              initial={{ scale: 0.8 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.8 }}
            >
              <h2 className="text-xl font-semibold mb-4">Create New Alert</h2>
              <form className="space-y-4" onSubmit={handleSubmit}>
                <div>
                  <label className="block font-medium mb-1">Title</label>
                  <input
                    type="text"
                    value={newAlert.title}
                    onChange={(e) => setNewAlert({ ...newAlert, title: e.target.value })}
                    className="w-full border rounded-lg p-2"
                    placeholder="Enter alert title"
                  />
                </div>
                <div>
                  <label className="block font-medium mb-1">Category</label>
                  <select
                    value={newAlert.category}
                    onChange={(e) => setNewAlert({ ...newAlert, category: e.target.value })}
                    className="w-full border rounded-lg p-2"
                  >
                    <option>Weather</option>
                    <option>Pest</option>
                    <option>Government Notice</option>
                    <option>Emergency</option>
                  </select>
                </div>
                <div>
                  <label className="block font-medium mb-1">Priority</label>
                  <select
                    value={newAlert.priority}
                    onChange={(e) => setNewAlert({ ...newAlert, priority: e.target.value })}
                    className="w-full border rounded-lg p-2"
                  >
                    <option>High</option>
                    <option>Medium</option>
                    <option>Low</option>
                  </select>
                </div>
                <div>
                  <label className="block font-medium mb-1">Message</label>
                  <textarea
                    rows={4}
                    value={newAlert.message}
                    onChange={(e) => setNewAlert({ ...newAlert, message: e.target.value })}
                    className="w-full border rounded-lg p-2"
                    placeholder="Enter alert message"
                  />
                </div>
                <div className="flex justify-end gap-3">
                  <button
                    type="button"
                    className="px-4 py-2 border rounded hover:bg-gray-100"
                    onClick={() => setShowForm(false)}
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700"
                  >
                    Send Alert
                  </button>
                </div>
              </form>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Alerts List */}
      <div className="mt-6 space-y-4">
        {alerts.map((alert) => (
          <motion.div
            key={alert.id}
            className={`p-4 rounded-xl shadow-md border-l-4 ${
              alert.priority === "High"
                ? "border-red-500 bg-red-50"
                : alert.priority === "Medium"
                ? "border-yellow-500 bg-yellow-50"
                : "border-green-500 bg-green-50"
            }`}
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
          >
            <div className="flex justify-between items-center">
              <h2 className="text-lg font-semibold">{alert.title}</h2>
              <span className="text-xs px-2 py-1 bg-gray-200 rounded-full">{alert.category}</span>
            </div>
            <p className="text-gray-700 mt-2">{alert.message}</p>
            <p className="text-xs text-gray-500 mt-1">{alert.date} • Priority: {alert.priority}</p>
          </motion.div>
        ))}
      </div>
    </div>
  );
}

export default Alerts;