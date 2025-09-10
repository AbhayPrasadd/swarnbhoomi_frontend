import React, { useState, useEffect } from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { GoogleMap, Marker, useJsApiLoader } from "@react-google-maps/api";
import { ArrowLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";

const dummyFarms = [
  {
    id: "1",
    name: "Farm 1",
    crop: "Wheat",
    lat: 25.5,
    lng: 82.5,
    weeks: 4,
    data: [
      { week: 1, ndvi: 0.4, thumb_url: "/ndvi/thumb1.jpg" },
      { week: 2, ndvi: 0.6, thumb_url: "/ndvi/thumb2.jpg" },
      { week: 3, ndvi: 0.5, thumb_url: "/ndvi/thumb3.jpg" },
      { week: 4, ndvi: 0.7, thumb_url: "/ndvi/thumb4.jpg" },
    ],
    loading: false,
    error: "",
    showPreview: true,
    showMap: false,
  },
  {
    id: "2",
    name: "Farm 2",
    crop: "Tomato",
    lat: 26.0,
    lng: 81.9,
    weeks: 4,
    data: [
      { week: 1, ndvi: 0.3, thumb_url: "/ndvi/thumb5.jpg" },
      { week: 2, ndvi: 0.5, thumb_url: "/ndvi/thumb6.jpg" },
      { week: 3, ndvi: 0.6, thumb_url: "/ndvi/thumb7.jpg" },
      { week: 4, ndvi: 0.8, thumb_url: "/ndvi/thumb8.jpg" },
    ],
    loading: false,
    error: "",
    showPreview: true,
    showMap: false,
  },
];

const NdviFarms = () => {
  const [farms, setFarms] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    // simulate fetching farms
    setTimeout(() => {
      setFarms(dummyFarms);
    }, 500);
  }, []);

  const { isLoaded } = useJsApiLoader({
    googleMapsApiKey: import.meta.env.VITE_GOOGLE_MAPS_API_KEY,
  });

  const addFarm = () => {
    const newFarm = {
      id: Date.now().toString(),
      name: `Farm ${farms.length + 1}`,
      crop: "",
      lat: 25.5,
      lng: 82.5,
      weeks: 4,
      data: [],
      loading: false,
      error: "",
      showPreview: true,
      showMap: false,
    };
    setFarms([...farms, newFarm]);
  };

  const updateFarmField = (id, field, value) => {
    setFarms(prev => prev.map(f => f.id === id ? { ...f, [field]: value } : f));
  };

  const fetchTrend = (id) => {
    // simulate fetching NDVI trend
    const trendData = [
      { week: 1, ndvi: Math.random().toFixed(2), thumb_url: "/ndvi/thumb1.jpg" },
      { week: 2, ndvi: Math.random().toFixed(2), thumb_url: "/ndvi/thumb2.jpg" },
      { week: 3, ndvi: Math.random().toFixed(2), thumb_url: "/ndvi/thumb3.jpg" },
      { week: 4, ndvi: Math.random().toFixed(2), thumb_url: "/ndvi/thumb4.jpg" },
    ];
    updateFarmField(id, "data", trendData);
    updateFarmField(id, "showPreview", true);
  };

  return (
    <div className="max-w-10xl mx-auto ml-2 ">
      <div className="flex justify-between items-center mb-6">
        <div className="flex gap-2 items-center">
          <button onClick={() => navigate(-1)} className="hover:text-green-700">
            <ArrowLeft size={20} />
          </button>
          <h1 className="text-xl font-bold text-green-800">NDVI Trend Of Your Crop</h1>
        </div>
        <button onClick={addFarm} className="bg-blue-600 text-white px-4 py-2 mt-3 hover:bg-blue-700">➕ Add Farm</button>
      </div>

      {farms.map((farm) => (
        <div key={farm.id} className="mb-10 border border-gray-300 p-4 bg-white">
          <div className="flex justify-between items-center mb-2">
            <h2 className="text-lg font-semibold text-green-700">{farm.name}</h2>
            <button onClick={() => setFarms(farms.filter(f => f.id !== farm.id))} className="text-sm text-red-600 hover:underline">🗑️ Remove Farm</button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-6 gap-3 mb-4">
            <input type="text" placeholder="Farm Name" value={farm.name} onChange={(e) => updateFarmField(farm.id, "name", e.target.value)} className="border p-2" />
            <input type="text" placeholder="Crop Name" value={farm.crop} onChange={(e) => updateFarmField(farm.id, "crop", e.target.value)} className="border p-2" />
            <input type="number" placeholder="Latitude" value={farm.lat} onChange={(e) => updateFarmField(farm.id, "lat", e.target.value)} className="border p-2" />
            <input type="number" placeholder="Longitude" value={farm.lng} onChange={(e) => updateFarmField(farm.id, "lng", e.target.value)} className="border p-2" />
            <input type="number" placeholder="Weeks" value={farm.weeks} onChange={(e) => updateFarmField(farm.id, "weeks", e.target.value)} className="border p-2" />
            <div className="flex gap-2">
              <button onClick={() => updateFarmField(farm.id, "showMap", !farm.showMap)} className="bg-yellow-600 text-white px-3 py-2 hover:bg-yellow-700">🗺️ Pick on Map</button>
              <button onClick={() => fetchTrend(farm.id)} className="bg-green-600 text-white px-3 py-2 hover:bg-green-700">💹 Get NDVI Trend</button>
            </div>
          </div>

          {farm.showMap && isLoaded && (
            <div className="h-[300px] w-full mb-4">
              <GoogleMap
                mapContainerStyle={{ width: "100%", height: "100%" }}
                center={{ lat: parseFloat(farm.lat || 25.5), lng: parseFloat(farm.lng || 82.5) }}
                zoom={6}
                onClick={(e) => {
                  const lat = e.latLng.lat();
                  const lng = e.latLng.lng();
                  updateFarmField(farm.id, "lat", lat);
                  updateFarmField(farm.id, "lng", lng);
                }}
              >
                <Marker position={{ lat: parseFloat(farm.lat), lng: parseFloat(farm.lng) }} />
              </GoogleMap>
            </div>
          )}

          {farm.data.length > 0 && farm.showPreview && (
            <div className="mt-6">
              <div className="grid md:grid-cols-2 gap-6">
                <ResponsiveContainer width="100%" height={200}>
                  <LineChart data={farm.data}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="week" />
                    <YAxis domain={[0, 1]} />
                    <Tooltip />
                    <Line type="monotone" dataKey="ndvi" stroke="#16a34a" strokeWidth={3} dot={{ r: 3 }} />
                  </LineChart>
                </ResponsiveContainer>

                <div>
                  <h4 className="text-sm font-medium mb-2">NDVI Weekly Images</h4>
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
                    {farm.data.map((item, idx) => (
                      <div key={idx} className="border p-2">
                        <p className="text-sm font-medium mb-1">Week {item.week}</p>
                        <img src={item.thumb_url} alt={`Week ${item.week}`} className="w-full h-28 object-cover" />
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              <div className="text-right mt-4">
                <button onClick={() => updateFarmField(farm.id, "showPreview", false)} className="text-sm text-red-600 hover:underline">❌ Close Preview</button>
              </div>
            </div>
          )}

          {!farm.showPreview && farm.data.length > 0 && (
            <div className="mt-4 text-right">
              <button onClick={() => updateFarmField(farm.id, "showPreview", true)} className="text-sm text-blue-600 hover:underline">🔄 Reopen Preview</button>
            </div>
          )}
        </div>
      ))}
    </div>
  );
};

export default NdviFarms;
