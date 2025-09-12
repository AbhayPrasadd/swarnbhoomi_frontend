import React, { useState } from "react";
import {
  BarChart,
  Bar,
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
} from "recharts";
import { motion } from "framer-motion";

function ReportAnalytics() {
  const [cropData] = useState([
    { name: "Wheat", yield: 120, target: 150 },
    { name: "Rice", yield: 90, target: 120 },
    { name: "Maize", yield: 70, target: 100 },
    { name: "Pulses", yield: 50, target: 80 },
  ]);

  const [queryData] = useState([
    { month: "Jan", resolved: 30, pending: 10 },
    { month: "Feb", resolved: 40, pending: 8 },
    { month: "Mar", resolved: 50, pending: 6 },
    { month: "Apr", resolved: 35, pending: 12 },
  ]);

  const pieData = [
    { name: "Fertilizer Requests", value: 40 },
    { name: "Weather Alerts", value: 25 },
    { name: "Market Prices", value: 20 },
    { name: "Govt Schemes", value: 15 },
  ];

  const COLORS = ["#22c55e", "#3b82f6", "#f59e0b", "#ef4444"];

  return (
    <div className="p-6 max-w-7xl mx-auto text-gray-800">
      <h1 className="text-3xl font-bold text-center mb-6 text-green-700">
        📊 Reports & Analytics
      </h1>

      {/* Crop Yield Performance */}
      <motion.div
        whileHover={{ scale: 1.02 }}
        className="bg-white p-6 rounded-2xl shadow mb-6"
      >
        <h2 className="text-2xl font-semibold mb-4">Crop Yield Performance</h2>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={cropData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Bar dataKey="yield" fill="#22c55e" name="Actual Yield" />
            <Bar dataKey="target" fill="#3b82f6" name="Target" />
          </BarChart>
        </ResponsiveContainer>
      </motion.div>

      {/* Farmer Queries Trend */}
      <motion.div
        whileHover={{ scale: 1.02 }}
        className="bg-white p-6 rounded-2xl shadow mb-6"
      >
        <h2 className="text-2xl font-semibold mb-4">
          Farmer Queries Resolution Trend
        </h2>
        <ResponsiveContainer width="100%" height={300}>
          <LineChart data={queryData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="month" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Line
              type="monotone"
              dataKey="resolved"
              stroke="#22c55e"
              strokeWidth={3}
              name="Resolved"
            />
            <Line
              type="monotone"
              dataKey="pending"
              stroke="#ef4444"
              strokeWidth={3}
              name="Pending"
            />
          </LineChart>
        </ResponsiveContainer>
      </motion.div>

      {/* Pie Chart - Type of Alerts */}
      <motion.div
        whileHover={{ scale: 1.02 }}
        className="bg-white p-6 rounded-2xl shadow mb-6"
      >
        <h2 className="text-2xl font-semibold mb-4">Types of Alerts Sent</h2>
        <ResponsiveContainer width="100%" height={300}>
          <PieChart>
            <Pie
              data={pieData}
              cx="50%"
              cy="50%"
              outerRadius={100}
              fill="#8884d8"
              dataKey="value"
              label
            >
              {pieData.map((entry, index) => (
                <Cell
                  key={`cell-${index}`}
                  fill={COLORS[index % COLORS.length]}
                />
              ))}
            </Pie>
            <Tooltip />
            <Legend />
          </PieChart>
        </ResponsiveContainer>
      </motion.div>

      {/* Insights Section */}
      <motion.div
        whileHover={{ scale: 1.02 }}
        className="bg-green-50 p-6 rounded-2xl shadow border border-green-300"
      >
        <h2 className="text-2xl font-semibold mb-4">
          Insights & Recommendations
        </h2>
        <ul className="list-disc pl-6 space-y-2 text-gray-700">
          <li>
            🚜 Focus on improving maize yield — it's below the target by 30%.
          </li>
          <li>
            📢 Weather alerts are the second-highest type of notifications —
            consider automating them.
          </li>
          <li>
            ✅ Farmer query resolution rate is improving — keep response times
            under 24 hours.
          </li>
          <li>
            📈 Monthly reports should be exported and shared with higher
            authorities by the 5th of each month.
          </li>
        </ul>
      </motion.div>
    </div>
  );
}

export default ReportAnalytics;
