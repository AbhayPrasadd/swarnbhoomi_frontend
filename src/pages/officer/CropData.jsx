import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

function CropData() {
  const [files, setFiles] = useState([]);
  const [notes, setNotes] = useState("");
  const [category, setCategory] = useState("general");
  const [customCategory, setCustomCategory] = useState("");

  const handleFileChange = (e) => {
    const selectedFiles = Array.from(e.target.files);
    setFiles((prevFiles) => [...prevFiles, ...selectedFiles]);
  };

  const handleRemoveFile = (index) => {
    setFiles((prevFiles) => prevFiles.filter((_, i) => i !== index));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const finalCategory = category === "other" ? customCategory : category;

    console.log("Uploading data:", { notes, files, finalCategory });
    setNotes("");
    setFiles([]);
    setCategory("general");
    setCustomCategory("");
    alert("Data submitted successfully (backend integration needed)");
  };

  return (
    <div className="p-6 max-w-5xl mx-auto text-gray-800">
      <h1 className="text-3xl font-bold mb-6 text-center">📂 Crop Data & Context Upload</h1>
      <p className="text-center mb-6 text-gray-600">
        Add new data, files, or context that should be included for future AI analysis and knowledge base updates.
      </p>

      {/* Upload Form */}
      <motion.form
        onSubmit={handleSubmit}
        className="bg-white shadow-lg rounded-2xl p-6 space-y-6"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        {/* Notes Section */}
        <div>
          <label className="block font-medium mb-2">📝 Add Notes / Context</label>
          <textarea
            rows={4}
            value={notes}
            onChange={(e) => setNotes(e.target.value)}
            placeholder="Enter text context here (e.g., new pest outbreak, government notice, crop pattern change)"
            className="w-full border rounded-xl p-3 focus:ring focus:ring-blue-300"
          />
        </div>

        {/* File Upload */}
        <div className="border-2 border-dashed border-gray-300 rounded-xl p-6 text-center hover:bg-gray-50 transition">
          <p className="mb-3 text-gray-600">📎 Drag & drop files here or click to upload</p>
          <input
            type="file"
            multiple
            onChange={handleFileChange}
            className="block mx-auto"
            accept=".pdf,.docx,.odt,.txt,.jpg,.jpeg,.png"
          />
        </div>

        {/* Preview of Uploaded Files */}
        <AnimatePresence>
          {files.length > 0 && (
            <motion.div
              className="mt-4 space-y-2"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              <h3 className="text-lg font-semibold">📑 Uploaded Files:</h3>
              {files.map((file, index) => (
                <motion.div
                  key={index}
                  className="flex justify-between items-center bg-gray-100 p-3 rounded-lg shadow-sm"
                  initial={{ x: -20, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  exit={{ x: -20, opacity: 0 }}
                >
                  <span>{file.name}</span>
                  <button
                    type="button"
                    className="text-red-500 hover:underline"
                    onClick={() => handleRemoveFile(index)}
                  >
                    Remove
                  </button>
                </motion.div>
              ))}
            </motion.div>
          )}
        </AnimatePresence>

        {/* Categorization Section */}
        <div>
          <label className="block font-medium mb-2">🌾 Crop / Category</label>
          <select
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            className="w-full border rounded-xl p-3"
          >
            <option value="general">General Update</option>
            <option value="wheat">Wheat</option>
            <option value="rice">Rice</option>
            <option value="maize">Maize</option>
            <option value="pulses">Pulses</option>
            <option value="other">Other</option>
          </select>

          {/* Show custom input when "Other" is selected */}
          {category === "other" && (
            <motion.input
              key="customCategory"
              type="text"
              value={customCategory}
              onChange={(e) => setCustomCategory(e.target.value)}
              placeholder="Enter custom crop/category name"
              className="mt-3 w-full border rounded-xl p-3 focus:ring focus:ring-green-300"
              initial={{ opacity: 0, y: -5 }}
              animate={{ opacity: 1, y: 0 }}
            />
          )}
        </div>

        {/* Submit Button */}
        <div className="flex justify-end">
          <button
            type="submit"
            className="bg-green-600 text-white px-6 py-2 rounded-xl hover:bg-green-700"
          >
            Submit Data
          </button>
        </div>
      </motion.form>
    </div>
  );
}

export default CropData;