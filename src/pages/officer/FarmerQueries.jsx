import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

function FarmerQueries() {
  // Expanded mock data for testing
  const [queries, setQueries] = useState([
    {
      id: 1,
      farmerName: "Rajesh Kumar",
      query: "My wheat crop is showing yellow leaves, what should I do?",
      status: "pending",
      createdAt: new Date(),
    },
    {
      id: 2,
      farmerName: "Sita Devi",
      query: "Is there any upcoming government scheme for irrigation?",
      status: "responded",
      response: "Yes, PM-KUSUM scheme is available. Visit your nearest KVK.",
      createdAt: new Date(Date.now() - 86400000), // 1 day ago
    },
    {
      id: 3,
      farmerName: "Anil Verma",
      query: "Market price for onions dropped suddenly. Should I store or sell?",
      status: "pending",
      createdAt: new Date(Date.now() - 2 * 86400000), // 2 days ago
    },
    {
      id: 4,
      farmerName: "Pooja Sharma",
      query: "Facing pest attack on my paddy field, please suggest solution.",
      status: "responded",
      response: "Use recommended pesticide as per KVK guidelines within 48 hours.",
      createdAt: new Date(Date.now() - 5 * 86400000), // 5 days ago
    },
    {
      id: 5,
      farmerName: "Mahesh Yadav",
      query: "Soil in my field is very hard, how can I improve fertility?",
      status: "pending",
      createdAt: new Date(Date.now() - 3 * 86400000), // 3 days ago
    },
    {
      id: 6,
      farmerName: "Lata Singh",
      query: "Heavy rainfall damaged my crop. Can I apply for compensation?",
      status: "pending",
      createdAt: new Date(Date.now() - 6 * 86400000), // 6 days ago
    },
    {
      id: 7,
      farmerName: "Deepak Rana",
      query: "What is the best time to sow mustard crop in my region?",
      status: "responded",
      response: "Ideal sowing period is mid-October to mid-November.",
      createdAt: new Date(Date.now() - 10 * 86400000),
    },
  ]);

  const [selectedQuery, setSelectedQuery] = useState(null);
  const [response, setResponse] = useState("");
  const [filter, setFilter] = useState("all");
  const [search, setSearch] = useState("");

  const handleResponseSubmit = () => {
    if (!response.trim()) return;

    setQueries((prev) =>
      prev.map((q) =>
        q.id === selectedQuery.id
          ? { ...q, response, status: "responded" }
          : q
      )
    );

    setResponse("");
    setSelectedQuery(null);
  };

  const filteredQueries = queries
    .filter((q) => (filter === "all" ? true : q.status === filter))
    .filter(
      (q) =>
        q.query.toLowerCase().includes(search.toLowerCase()) ||
        q.farmerName.toLowerCase().includes(search.toLowerCase())
    );

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Farmer Queries</h1>

      {/* Search & Filter */}
      <div className="flex gap-4 mb-4">
        <input
          type="text"
          placeholder="Search by farmer or query..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="border rounded px-3 py-2 w-full max-w-sm focus:outline-none focus:ring focus:ring-blue-200"
        />
        <select
          value={filter}
          onChange={(e) => setFilter(e.target.value)}
          className="border rounded p-2"
        >
          <option value="all">All</option>
          <option value="pending">Pending</option>
          <option value="responded">Responded</option>
        </select>
      </div>

      {/* Query Cards */}
      <div className="grid gap-4">
        {filteredQueries.length > 0 ? (
          filteredQueries.map((q) => (
            <motion.div
              key={q.id}
              layout
              className="bg-white shadow rounded-xl p-4 cursor-pointer hover:shadow-lg transition"
              onClick={() => setSelectedQuery(q)}
            >
              <div className="flex justify-between">
                <h2 className="font-semibold">{q.farmerName}</h2>
                <span
                  className={`text-xs px-2 py-1 rounded ${
                    q.status === "responded"
                      ? "bg-green-200 text-green-700"
                      : "bg-yellow-200 text-yellow-700"
                  }`}
                >
                  {q.status}
                </span>
              </div>
              <p className="text-gray-700 truncate">{q.query}</p>
              <p className="text-xs text-gray-500">
                {q.createdAt.toLocaleString()}
              </p>
            </motion.div>
          ))
        ) : (
          <p className="text-gray-500 text-center">No queries found.</p>
        )}
      </div>

      {/* Query Detail Modal */}
      <AnimatePresence>
        {selectedQuery && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            className="fixed inset-0 bg-black/50 flex justify-center items-center"
          >
            <div className="bg-white p-6 rounded-2xl w-[500px] shadow-xl">
              <h2 className="text-xl font-bold">{selectedQuery.farmerName}</h2>
              <p className="mt-2">{selectedQuery.query}</p>

              {selectedQuery.status === "responded" && (
                <p className="mt-2 text-green-700">
                  ✅ Response: {selectedQuery.response}
                </p>
              )}

              {selectedQuery.status !== "responded" && (
                <div className="mt-4">
                  <textarea
                    className="w-full border rounded p-2 focus:outline-none focus:ring focus:ring-blue-200"
                    rows={3}
                    placeholder="Type your response..."
                    value={response}
                    onChange={(e) => setResponse(e.target.value)}
                  />
                  <button
                    className="mt-3 w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition"
                    onClick={handleResponseSubmit}
                  >
                    Send Response
                  </button>
                </div>
              )}

              <button
                className="mt-3 w-full border border-gray-400 py-2 rounded hover:bg-gray-100 transition"
                onClick={() => setSelectedQuery(null)}
              >
                Close
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default FarmerQueries;