import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import dayjs from "dayjs";

const commodityImages = {
  Mango: "/fruits/mango.jpeg",
  Apple: "/fruits/apple.jpeg",
  Guava: "/fruits/guava.jpeg",
  Banana: "/fruits/banana.jpeg",
  Pomegranate: "/fruits/pomegranate.jpeg",
  Papaya: "/fruits/papaya.jpeg",
  Onion: "/vegetables/onion.jpg",
  Tomato: "/vegetables/tomato.jpg",
  Potato: "/vegetables/potato.jpg",
  Brinjal: "/vegetables/brinjal.jpg",
  Cabbage: "/vegetables/cabbage.jpg",
  Cauliflower: "/vegetables/cauliflower.jpg",
  Carrot: "/vegetables/carrot.jpg",
  Peas: "/vegetables/peas.jpg",
  Groundnut: "/oilseeds/groundnut.jpeg",
  Soyabean: "/oilseeds/soyabean.jpeg",
  Garlic: "/spices/garlic.jpeg",
  Ginger: "/spices/ginger.jpeg",
  "Green Chilli": "/spices/chilli.jpeg",
  Wheat: "/cereals/wheat.jpeg",
  Rice: "/cereals/rice.jpeg",
  Bajra: "/cereals/barley.jpeg",
};

// Dummy crop guide data
const dummyCropGuide = {
  Wheat: {
    description: "Wheat is a staple cereal crop grown widely for its grain.",
    weeklyGuide: [
      "Sow seeds in prepared soil.",
      "Ensure proper irrigation.",
      "Apply nitrogen fertilizer.",
      "Monitor for pests.",
      "Harvest when grains turn golden.",
    ],
    fertilizerTips: "Use nitrogen-rich fertilizer in the 2nd week.",
    irrigationTips: "Water moderately once a week.",
    diseaseTips: "Check for rust and blight.",
    image: "/cereals/wheat.jpeg",
  },
  Tomato: {
    description: "Tomatoes are nutritious and require well-drained soil.",
    weeklyGuide: [
      "Plant seedlings in pots or field.",
      "Water daily in early morning.",
      "Apply organic manure.",
      "Watch for fungal infections.",
      "Start harvesting ripe tomatoes.",
    ],
    fertilizerTips: "Use compost or NPK 10-10-10 fertilizer.",
    irrigationTips: "Keep soil moist, avoid waterlogging.",
    diseaseTips: "Check for leaf curl virus.",
    image: "/vegetables/tomato.jpg",
  },
  Mango: {
    description: "Mango trees are tropical fruit crops needing warm climate.",
    weeklyGuide: [
      "Plant young saplings.",
      "Apply mulch to retain soil moisture.",
      "Prune dead branches.",
      "Apply phosphorus fertilizer.",
      "Check fruit growth and ripeness.",
    ],
    fertilizerTips: "Use organic manure and NPK 12-12-17.",
    irrigationTips: "Water deeply once a week.",
    diseaseTips: "Monitor for anthracnose.",
    image: "/fruits/mango.jpeg",
  },
};

const dummyUserCrops = ["Wheat", "Tomato", "Mango"];
const dummySowingDates = {
  Wheat: dayjs().subtract(3, "week").format("YYYY-MM-DD"),
  Tomato: dayjs().subtract(1, "week").format("YYYY-MM-DD"),
  Mango: dayjs().subtract(5, "week").format("YYYY-MM-DD"),
};

const MyCrop = () => {
  const [selectedCrops, setSelectedCrops] = useState([]);
  const [sowingDates, setSowingDates] = useState({});
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    // Simulate fetching user crops
    setTimeout(() => {
      setSelectedCrops(dummyUserCrops);
      setSowingDates(dummySowingDates);
      setLoading(false);
    }, 500);
  }, []);

  const handleSowingDateChange = (crop, date) => {
    setSowingDates((prev) => ({ ...prev, [crop]: date }));
  };

  const handleSaveDate = (crop) => {
    alert(`✅ Saved sowing date for ${crop}: ${sowingDates[crop]}`);
  };

  const calculateWeeksSinceSowing = (dateStr) => {
    const diff = dayjs().diff(dayjs(dateStr), "week");
    return Math.max(diff, 0);
  };

  if (loading) {
    return <p className="text-center mt-10 text-lg animate-pulse">⏳ Loading your crop data...</p>;
  }

  return (
    <div className="p-4 min-h-screen">
      {/* Back button */}
      <div className="flex items-center mb-4">
        <button
          onClick={() => navigate("/dashboard")}
          className="text-green-700 hover:text-green-900 text-sm flex items-center gap-1"
        >
          ← Back to Dashboard
        </button>
      </div>

      <h2 className="text-2xl font-bold text-center text-green-800 mb-2">🌾 My Crop Guidance</h2>
      <p className="text-center text-gray-600 mb-6">Enter sowing date to get weekly insights and care tips.</p>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {selectedCrops.map((crop) => {
          const sowingDate = sowingDates[crop] || "";
          const week = sowingDate ? calculateWeeksSinceSowing(sowingDate) : null;
          const info = dummyCropGuide[crop];
          const cropImage = info?.image || commodityImages[crop] || "/vegetables/default.jpg";

          return (
            <div key={crop} className="border-gray-200 shadow-md p-4 flex flex-col justify-between">
              <div>
                <img
                  src={cropImage}
                  alt={crop}
                  className="w-full h-44 object-cover rounded mb-3 border"
                />
                <h4 className="text-lg font-semibold text-green-700 mb-2">🌿 {crop}</h4>

                <div className="flex items-center gap-2 mb-3">
                  <input
                    type="date"
                    value={sowingDate}
                    onChange={(e) => handleSowingDateChange(crop, e.target.value)}
                    className="flex-grow border px-2 py-1 text-sm rounded"
                  />
                  <button
                    onClick={() => handleSaveDate(crop)}
                    className="bg-green-600 hover:bg-green-700 text-white text-sm py-2 px-4 rounded"
                  >
                    💾 Save
                  </button>
                </div>

                {info && (
                  <div className="text-sm text-gray-700 space-y-2">
                    <p><strong>📘 About:</strong> {info.description}</p>
                    {week !== null && info.weeklyGuide && week < info.weeklyGuide.length && (
                      <p className="text-blue-700">
                        📅 <strong>Week {week + 1} Tip:</strong> {info.weeklyGuide[week]}
                      </p>
                    )}
                    <p><strong>🧪 Fertilizer:</strong> {info.fertilizerTips}</p>
                    <p><strong>💧 Irrigation:</strong> {info.irrigationTips}</p>
                    <p><strong>🛡️ Disease:</strong> {info.diseaseTips}</p>
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default MyCrop;
