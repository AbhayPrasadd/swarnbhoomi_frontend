import React, { useState, useEffect } from "react";
import axios from "axios";
import { Loader2, Download, Volume2 } from "lucide-react";
import { useTranslation } from "react-i18next";

const cropOptions = ["Wheat", "Rice", "Maize", "Paddy", "Sugarcane", "Soybean"];

const dummyNDVI = {
  ndvi_mean: 0.45,
  ndvi_min: 0.2,
  ndvi_max: 0.6,
  ndvi_breakdown: {
    poor_percent: 20,
    moderate_percent: 50,
    good_percent: 30
  }
};

const dummyWeather = [
  { date: "2025-06-12", maxTemp: 35, minTemp: 25, rainfall: 2 },
  { date: "2025-06-13", maxTemp: 34, minTemp: 24, rainfall: 1 },
  { date: "2025-06-14", maxTemp: 36, minTemp: 26, rainfall: 0 }
];

const Advisory = () => {
  const { t } = useTranslation();
  const [latitude, setLatitude] = useState(() => parseFloat(localStorage.getItem("cachedLat")) || 21.8294671);
  const [longitude, setLongitude] = useState(() => parseFloat(localStorage.getItem("cachedLng")) || 86.2584791);
  const [crop, setCrop] = useState("Wheat");
  const [stage, setStage] = useState("Growth");
  const [language, setLanguage] = useState("Hindi");
  const [ndviData, setNdviData] = useState(dummyNDVI);
  const [weatherData, setWeatherData] = useState(dummyWeather);
  const [advisoryText, setAdvisoryText] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [selectedTopic, setSelectedTopic] = useState("");

  // Cache lat/lng in localStorage
  useEffect(() => {
    localStorage.setItem("cachedLat", latitude.toString());
    localStorage.setItem("cachedLng", longitude.toString());
  }, [latitude, longitude]);

  // Fetch advisory from backend
  const fetchAdvisory = async (topic) => {
    setIsLoading(true);
    setSelectedTopic(topic);
    setAdvisoryText("");

    try {
      const payload = {
        topic,
        cropName: crop,
        growthStage: stage,
        language,
        location: { lat: latitude, lng: longitude },
        weather: weatherData,
        ndvi: ndviData
      };

      const res = await axios.post("https://swarnabhumi-backend.onrender.com/api/getAdvice", payload);
      setAdvisoryText(res.data.advice || t("no_advisory"));
    } 
    catch {
      setAdvisoryText(t("fetch_failed"));
    }
    finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="max-w-8xl mx-auto px-4 sm:px-6 py-6 space-y-6">
      <h2 className="text-2xl sm:text-3xl font-bold text-green-800 text-center">{t("smart_crop_advisory")}</h2>

      {/* Inputs */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="space-y-2">
          <label className="text-sm font-semibold">{t("latitude")}</label>
          <input
            value={latitude}
            onChange={(e) => setLatitude(parseFloat(e.target.value))}
            type="number"
            className="w-full p-2 border rounded"
          />
        </div>
        <div className="space-y-2">
          <label className="text-sm font-semibold">{t("longitude")}</label>
          <input
            value={longitude}
            onChange={(e) => setLongitude(parseFloat(e.target.value))}
            type="number"
            className="w-full p-2 border rounded"
          />
        </div>
        <div className="space-y-2">
          <label className="text-sm font-semibold">{t("location")}</label>
          <button
            onClick={() =>
              navigator.geolocation.getCurrentPosition(
                (pos) => {
                  setLatitude(pos.coords.latitude);
                  setLongitude(pos.coords.longitude);
                },
                () => alert(t("location_denied"))
              )
            }
            className="w-full p-2 bg-green-700 text-white rounded hover:bg-green-800 text-sm"
          >
            {t("Get My Location")}
          </button>
        </div>
      </div>

      {/* Crop, Stage, Language */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="space-y-2">
          <label className="text-sm font-semibold">{t("language")}</label>
          <select value={language} onChange={(e) => setLanguage(e.target.value)} className="w-full p-2 border rounded">
            <option>English</option>
            <option>Hindi</option>
          </select>
        </div>
        <div className="space-y-2">
          <label className="text-sm font-semibold">{t("crop")}</label>
          <select value={crop} onChange={(e) => setCrop(e.target.value)} className="w-full p-2 border rounded">
            {cropOptions.map((c) => <option key={c}>{c}</option>)}
          </select>
        </div>
        <div className="space-y-2">
          <label className="text-sm font-semibold">{t("stage")}</label>
          <select value={stage} onChange={(e) => setStage(e.target.value)} className="w-full p-2 border rounded">
            <option>{t("sowing")}</option>
            <option>{t("growth")}</option>
            <option>{t("harvesting")}</option>
          </select>
        </div>
      </div>

      {/* NDVI + Weather */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="bg-green-50 p-4 rounded shadow space-y-2">
          <h3 className="text-green-800 font-semibold">{t("ndvi_overview")}</h3>
          <p>{t("mean")}: {ndviData.ndvi_mean}, {t("min")}: {ndviData.ndvi_min}, {t("max")}: {ndviData.ndvi_max}</p>
          <p>{t("poor")}: {ndviData.ndvi_breakdown.poor_percent}%, {t("moderate")}: {ndviData.ndvi_breakdown.moderate_percent}%, {t("good")}: {ndviData.ndvi_breakdown.good_percent}%</p>
        </div>

        <div className="bg-blue-50 p-4 rounded shadow space-y-2">
          <h3 className="text-blue-800 font-semibold">{t("weather_update")}</h3>
          {weatherData.map((d, i) => (
            <p key={i}>{d.date}: {t("max")}: {d.maxTemp}°C, {t("min")}: {d.minTemp}°C, {t("rain")}: {d.rainfall}mm</p>
          ))}
        </div>
      </div>

      {/* Topics */}
      <div className="flex flex-wrap justify-center gap-2">
        {["Crop Health", "Weather Alert", "General Advisory"].map((topic) => (
          <button
            key={topic}
            onClick={() => fetchAdvisory(topic)}
            className={`px-4 py-2 rounded text-sm font-semibold shadow-sm transition-all ${
              selectedTopic === topic ? "bg-green-700 text-white" : "bg-gray-100 text-gray-800 hover:bg-green-100"
            }`}
          >
            {t(topic.toLowerCase().replace(/ /g, "_"))}
          </button>
        ))}
      </div>

      {/* Advisory Result */}
      <div className="relative p-4 bg-yellow-50 border-l-4 border-yellow-400 rounded shadow-md">
        <strong className="text-yellow-800 block mb-2">{t("advisory")}</strong>
        {isLoading ? (
          <div className="flex items-center gap-2 text-yellow-800 text-sm">
            <Loader2 className="animate-spin h-5 w-5" /> {t("generating")}
          </div>
        ) : (
          <p className="text-yellow-900 whitespace-pre-line text-sm">{advisoryText}</p>
        )}
        <div className="absolute top-2 right-2 flex gap-3">
          <button className="text-yellow-700 hover:text-yellow-900" title={t("save")}><Download size={18} /></button>
          <button className="text-yellow-700 hover:text-yellow-900" title={t("listen")}><Volume2 size={18} /></button>
        </div>
      </div>
    </div>
  );
};

export default Advisory;
