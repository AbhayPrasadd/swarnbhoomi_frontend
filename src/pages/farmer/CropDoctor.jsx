import React, { useState } from "react";

export default function CropDoctor() {
  const [selectedFile, setSelectedFile] = useState(null);
  const [preview, setPreview] = useState(null);
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setSelectedFile(file);
      setPreview(URL.createObjectURL(file));
    }
  };

  const handleSubmit = async () => {
    if (!selectedFile) {
      alert("Please select an image first.");
      return;
    }

    setLoading(true);
    setResult(null);

    const formData = new FormData();
    formData.append("cropImage", selectedFile);

    try {
      const res = await fetch("http://localhost:5002/analyze", {
        method: "POST",
        body: formData,
      });
      const data = await res.json();
      
      // Flatten advice if it's an array
      const adviceText = Array.isArray(data.advice)
        ? data.advice.map((item) => item.text || "").join("\n\n")
        : data.advice;

      setResult({
        disease: data.disease || "No disease detected",
        advice: adviceText || "No advice found",
      });
    } catch (err) {
      console.error(err);
      setResult({ disease: "Error", advice: "Failed to get advice" });
    }

    setLoading(false);
  };

  const formatAdvice = (advice) => {
    return advice.split('\n').map((line, index) => {
      if (line.trim() === '') return <br key={index} />;
      
      // Check for bold text patterns
      if (line.includes('**') || line.includes('*')) {
        const parts = line.split(/(\*\*.*?\*\*|\*.*?\*)/g);
        return (
          <p key={index} className="mb-2">
            {parts.map((part, partIndex) => {
              if (part.startsWith('**') && part.endsWith('**')) {
                return <strong key={partIndex} className="font-semibold text-green-800">{part.slice(2, -2)}</strong>;
              } else if (part.startsWith('*') && part.endsWith('*')) {
                return <em key={partIndex} className="italic">{part.slice(1, -1)}</em>;
              }
              return part;
            })}
          </p>
        );
      }
      
      // Check for list items
      if (line.trim().startsWith('-') || line.trim().startsWith('•')) {
        return <li key={index} className="ml-4 mb-1">{line.replace(/^[-•]\s*/, '')}</li>;
      }
      
      // Check for numbered lists
      if (line.trim().match(/^\d+\./)) {
        return <li key={index} className="ml-4 mb-1 list-decimal">{line.replace(/^\d+\.\s*/, '')}</li>;
      }
      
      return <p key={index} className="mb-2">{line}</p>;
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-emerald-100 py-8 px-4">
      <div className="max-w-2xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-green-800 mb-3 flex items-center justify-center gap-3">
            <span className="text-5xl">🌱</span>
            Crop Disease Advisor
          </h1>
          <p className="text-lg text-gray-600 max-w-md mx-auto">
            Upload a crop image to detect diseases and get expert treatment recommendations
          </p>
        </div>

        {/* Main Card */}
        <div className="bg-white rounded-2xl shadow-xl border border-green-200 overflow-hidden">
          {/* Upload Section */}
          <div className="p-8 border-b border-green-100">
            <div className="space-y-6">
              <div className="flex flex-col items-center">
                <label className="w-full">
                  <div className="border-2 border-dashed border-green-300 rounded-xl p-8 text-center hover:border-green-400 hover:bg-green-50 transition-colors cursor-pointer">
                    <div className="space-y-3">
                      <div className="text-4xl">📷</div>
                      <div className="text-lg font-medium text-green-700">
                        Choose crop image
                      </div>
                      <div className="text-sm text-gray-500">
                        JPG, PNG, or JPEG up to 10MB
                      </div>
                    </div>
                  </div>
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleFileChange}
                    className="hidden"
                  />
                </label>
              </div>

              {preview && (
                <div className="flex justify-center">
                  <div className="relative">
                    <img
                      src={preview}
                      alt="Preview"
                      className="max-w-full max-h-64 rounded-lg shadow-md border-2 border-green-200"
                    />
                    <div className="absolute -top-2 -right-2 bg-green-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-sm font-bold">
                      ✓
                    </div>
                  </div>
                </div>
              )}

              <button
                onClick={handleSubmit}
                disabled={loading || !selectedFile}
                className={`w-full py-4 px-6 rounded-xl font-semibold text-lg transition-all duration-200 ${
                  loading || !selectedFile
                    ? "bg-gray-300 text-gray-500 cursor-not-allowed"
                    : "bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 text-white shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
                }`}
              >
                {loading ? (
                  <div className="flex items-center justify-center gap-3">
                    <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                    Analyzing Image...
                  </div>
                ) : (
                  <div className="flex items-center justify-center gap-2">
                    <span>🔍</span>
                    Analyze Crop
                  </div>
                )}
              </button>
            </div>
          </div>

          {/* Results Section */}
          {result && (
            <div className="p-8 bg-gradient-to-r from-green-50 to-emerald-50">
              <div className="space-y-6">
                {/* Disease Detection */}
                <div className="bg-white rounded-xl p-6 shadow-md border-l-4 border-green-500">
                  <h2 className="text-xl font-semibold text-green-800 mb-3 flex items-center gap-2">
                    <span className="text-2xl">🩺</span>
                    Disease Detection
                  </h2>
                  <p className="text-lg font-medium text-gray-800 bg-green-100 px-4 py-2 rounded-lg">
                    {result.disease}
                  </p>
                </div>

                {/* Treatment Advice */}
                <div className="bg-white rounded-xl p-6 shadow-md border-l-4 border-blue-500">
                  <h2 className="text-xl font-semibold text-blue-800 mb-4 flex items-center gap-2">
                    <span className="text-2xl">👨‍🌾</span>
                    Treatment Recommendations
                  </h2>
                  <div className="prose prose-sm max-w-none text-gray-700 space-y-2">
                    {formatAdvice(result.advice)}
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="text-center mt-8 text-sm text-gray-500">
          <p>Powered by AI • For educational and advisory purposes only</p>
        </div>
      </div>
    </div>
  );
}