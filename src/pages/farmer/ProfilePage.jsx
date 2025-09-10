import React, { useEffect, useState } from "react";
import { auth, db } from "../../firebase";
import { doc, getDoc, updateDoc } from "firebase/firestore";
import { X } from "lucide-react";
import { cropCategories } from "../../data/cropData";

const Profile = () => {
  const [userData, setUserData] = useState(null);
  const [editMode, setEditMode] = useState(false);
  const [loading, setLoading] = useState(true);
  const [selectedFarmIndex, setSelectedFarmIndex] = useState(null);
  const [selectedCrops, setSelectedCrops] = useState([]);

  const defaultAvatar =
    "https://api.dicebear.com/7.x/initials/svg?seed=" +
    (userData?.name || "User");

  const irrigationTypes = ["Canal", "Borewell", "Drip", "Sprinkler", "Rainfed"];
  const departmentTypes = ["Agriculture", "Fisheries", "Soil Health", "Extension"];
  const genders = ["Male", "Female", "Other"];
  const languages = ["Hindi", "English", "Bengali", "Telugu"];

  // Fetch user data from Firestore
  useEffect(() => {
    const fetchUser = async () => {
      if (auth.currentUser) {
        const userRef = doc(db, "users", auth.currentUser.uid);
        const userSnap = await getDoc(userRef);
        if (userSnap.exists()) {
          const data = userSnap.data();
          setUserData(data);

          if (data.role === "farmer" && data.farms?.length > 0) {
            setSelectedFarmIndex(0);
            setSelectedCrops(
              data.farms[0].crops ? Object.values(data.farms[0].crops).flat() : []
            );
          }
        }
        setLoading(false);
      }
    };
    fetchUser();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUserData({ ...userData, [name]: value });
  };

  const handleFarmChange = (e, index) => {
    const { name, value } = e.target;
    const farmsCopy = [...userData.farms];
    farmsCopy[index][name] = value;
    setUserData({ ...userData, farms: farmsCopy });
  };

  const handleAddFarm = () => {
    const newFarm = {
      state: "",
      district: "",
      village: "",
      pincode: "",
      landSize: "",
      irrigationType: "",
      crops: {},
    };
    const farmsCopy = userData.farms ? [...userData.farms, newFarm] : [newFarm];
    setUserData({ ...userData, farms: farmsCopy });
    setSelectedFarmIndex(farmsCopy.length - 1);
    setSelectedCrops([]);
  };

  const handleRemoveFarm = (index) => {
    const farmsCopy = [...userData.farms];
    farmsCopy.splice(index, 1);
    setUserData({ ...userData, farms: farmsCopy });
    setSelectedFarmIndex(farmsCopy.length > 0 ? 0 : null);
    setSelectedCrops(farmsCopy[0]?.crops ? Object.values(farmsCopy[0].crops).flat() : []);
  };

  const handleCropToggle = (crop) => {
    if (!editMode) return;
    if (selectedCrops.includes(crop)) {
      setSelectedCrops(selectedCrops.filter((c) => c !== crop));
    } else {
      setSelectedCrops([...selectedCrops, crop]);
    }
  };

  const handleUpdate = async () => {
    if (!auth.currentUser) return;
    const userRef = doc(db, "users", auth.currentUser.uid);

    if (userData.role === "farmer") {
      if (selectedFarmIndex !== null) {
        // Save crops for selected farm
        const updatedCrops = {};
        selectedCrops.forEach((crop) => {
          const category = Object.keys(cropCategories).find((cat) =>
            cropCategories[cat].includes(crop)
          );
          if (!updatedCrops[category]) updatedCrops[category] = [];
          updatedCrops[category].push(crop);
        });
        const farmsCopy = [...userData.farms];
        farmsCopy[selectedFarmIndex].crops = updatedCrops;
        await updateDoc(userRef, { ...userData, farms: farmsCopy });
      } else {
        await updateDoc(userRef, userData);
      }
    } else {
      // Officer/Admin
      await updateDoc(userRef, userData);
    }

    setEditMode(false);
  };

  if (loading) return <div className="p-6">Loading...</div>;

  return (
    <div className="min-h-screen p-6 max-w-7xl mx-auto">
      <div className="flex justify-between items-center mb-4">
        <div className="flex items-center gap-3">
          <img
            src={defaultAvatar}
            alt="Profile"
            className="h-16 w-16 md:h-20 md:w-20 rounded-full border-2 border-green-700 object-cover shadow-sm"
          />
          <div>
            <h3 className="text-lg md:text-xl font-bold text-gray-800 uppercase">
              {userData?.name || "User"}
            </h3>
            <p className="text-sm md:text-base text-gray-500">{userData?.email}</p>
          </div>
        </div>

        {!editMode && (
          <button
            className="px-3 py-1 bg-green-700 text-white rounded-md hover:bg-green-800 transition"
            onClick={() => setEditMode(true)}
          >
            Edit
          </button>
        )}
      </div>

      {/* User Basic Info */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
        {[
          { label: "Full Name", name: "name" },
          { label: "Email", name: "email" },
          { label: "Phone", name: "phone" },
          { label: "Language", name: "language", type: "select", options: languages },
          { label: "Gender", name: "gender", type: "select", options: genders },
        ].map((field) => (
          <div key={field.name}>
            <label className="block font-semibold text-gray-700 mb-1">{field.label}</label>
            {field.type === "select" ? (
              <select
                name={field.name}
                value={userData[field.name] || ""}
                disabled={!editMode}
                onChange={handleChange}
                className="w-full px-3 py-2 border rounded bg-white"
              >
                <option value="">Select {field.label}</option>
                {field.options.map((opt) => (
                  <option key={opt} value={opt}>
                    {opt}
                  </option>
                ))}
              </select>
            ) : (
              <input
                type="text"
                name={field.name}
                value={userData[field.name] || ""}
                disabled={!editMode}
                onChange={handleChange}
                className="w-full px-3 py-2 border rounded"
              />
            )}
          </div>
        ))}

        {/* Officer/Admin Fields */}
        {(userData.role === "officer" || userData.role === "admin") && (
          <>
            <div>
              <label className="block font-semibold text-gray-700 mb-1">Department</label>
              <select
                name="department"
                value={userData.department || ""}
                disabled={!editMode}
                onChange={handleChange}
                className="w-full px-3 py-2 border rounded bg-white"
              >
                <option value="">Select Department</option>
                {departmentTypes.map((dept) => (
                  <option key={dept} value={dept}>
                    {dept}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label className="block font-semibold text-gray-700 mb-1">Assigned Region</label>
              <input
                type="text"
                name="assignedRegion"
                value={userData.assignedRegion || ""}
                disabled={!editMode}
                onChange={handleChange}
                className="w-full px-3 py-2 border rounded bg-white"
              />
            </div>
          </>
        )}
      </div>

      {/* Farmer Farms Section */}
      {userData.role === "farmer" && (
        <div className="mt-6">
          <h3 className="font-bold text-gray-700 mb-2">Farms</h3>
          <div className="space-y-4">
            {userData.farms?.map((farm, index) => (
              <div
                key={index}
                className={`p-4 border rounded ${
                  selectedFarmIndex === index ? "border-green-700" : "border-gray-300"
                }`}
              >
                <div className="flex justify-between items-center mb-2">
                  <h4 className="font-semibold">Farm {index + 1}</h4>
                  <div className="flex gap-2">
                    {editMode && (
                      <button
                        className="px-2 py-1 text-red-600 border rounded"
                        onClick={() => handleRemoveFarm(index)}
                      >
                        Remove
                      </button>
                    )}
                    <button
                      className="px-2 py-1 text-blue-600 border rounded"
                      onClick={() => {
                        setSelectedFarmIndex(index);
                        setSelectedCrops(farm.crops ? Object.values(farm.crops).flat() : []);
                      }}
                    >
                      Select
                    </button>
                  </div>
                </div>

                {selectedFarmIndex === index && (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {["state", "district", "village", "pincode", "landSize", "irrigationType"].map(
                      (field) => (
                        <div key={field}>
                          <label className="block font-semibold text-gray-700 mb-1">{field}</label>
                          {field === "irrigationType" ? (
                            <select
                              name={field}
                              disabled={!editMode}
                              value={farm[field] || ""}
                              onChange={(e) => handleFarmChange(e, index)}
                              className="w-full px-3 py-2 border rounded bg-white"
                            >
                              <option value="">Select</option>
                              {irrigationTypes.map((type) => (
                                <option key={type} value={type}>
                                  {type}
                                </option>
                              ))}
                            </select>
                          ) : (
                            <input
                              type="text"
                              name={field}
                              value={farm[field] || ""}
                              disabled={!editMode}
                              onChange={(e) => handleFarmChange(e, index)}
                              className="w-full px-3 py-2 border rounded"
                            />
                          )}
                        </div>
                      )
                    )}

                    {/* Crops */}
                    <div>
                      <label className="block font-semibold text-gray-700 mb-1">Crops</label>
                      <div className="flex flex-wrap gap-2 mt-2">
                        {selectedCrops.map((crop) => (
                          <div
                            key={crop}
                            className="bg-green-100 text-green-800 px-2 py-1 rounded-full flex items-center gap-1"
                          >
                            {crop}
                            {editMode && (
                              <X
                                className="w-3 h-3 cursor-pointer"
                                onClick={() =>
                                  setSelectedCrops(selectedCrops.filter((c) => c !== crop))
                                }
                              />
                            )}
                          </div>
                        ))}
                      </div>

                      {editMode && (
                        <div className="mt-2 flex flex-wrap gap-2">
                          {Object.values(cropCategories)
                            .flat()
                            .map((crop) => (
                              <button
                                key={crop}
                                onClick={() => handleCropToggle(crop)}
                                className={`px-2 py-1 rounded-full border ${
                                  selectedCrops.includes(crop)
                                    ? "bg-green-600 text-white"
                                    : "bg-white text-gray-700"
                                }`}
                              >
                                {crop}
                              </button>
                            ))}
                        </div>
                      )}
                    </div>
                  </div>
                )}
              </div>
            ))}

            {editMode && (
              <button
                className="mt-3 px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700"
                onClick={handleAddFarm}
              >
                Add Farm
              </button>
            )}
          </div>
        </div>
      )}

      {/* Save/Cancel Buttons */}
      {editMode && (
        <div className="flex justify-end gap-4 mt-4">
          <button
            className="px-4 py-2 bg-gray-500 text-white rounded hover:bg-gray-600"
            onClick={() => setEditMode(false)}
          >
            Cancel
          </button>
          <button
            className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
            onClick={handleUpdate}
          >
            Save
          </button>
        </div>
      )}
    </div>
  );
};

export default Profile;
