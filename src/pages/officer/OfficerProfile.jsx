import React, { useEffect, useState } from "react";
import { auth, db } from "../../firebase";
import { doc, getDoc, updateDoc } from "firebase/firestore";

const OfficerProfile = () => {
  const [userData, setUserData] = useState(null);
  const [editMode, setEditMode] = useState(false);
  const [loading, setLoading] = useState(true);

  const defaultAvatar =
    "https://api.dicebear.com/7.x/initials/svg?seed=" +
    (userData?.name || "Officer");

  const departmentTypes = ["Agriculture", "Fisheries", "Soil Health", "Extension"];
  const genders = ["Male", "Female", "Other"];
  const languages = ["Hindi", "English", "Bengali", "Telugu"];

  // Fetch officer data from Firestore
  useEffect(() => {
    const fetchOfficer = async () => {
      if (auth.currentUser) {
        const userRef = doc(db, "users", auth.currentUser.uid);
        const userSnap = await getDoc(userRef);
        if (userSnap.exists()) {
          setUserData(userSnap.data());
        }
        setLoading(false);
      }
    };
    fetchOfficer();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUserData({ ...userData, [name]: value });
  };

  const handleUpdate = async () => {
    if (!auth.currentUser) return;
    const userRef = doc(db, "users", auth.currentUser.uid);
    await updateDoc(userRef, userData);
    setEditMode(false);
  };

  if (loading) return <div className="p-6">Loading...</div>;

  return (
    <div className="min-h-screen p-6 max-w-4xl mx-auto">
      {/* Profile Header */}
      <div className="flex justify-between items-center mb-6">
        <div className="flex items-center gap-3">
          <img
            src={defaultAvatar}
            alt="Profile"
            className="h-16 w-16 md:h-20 md:w-20 rounded-full border-2 border-green-700 object-cover shadow-sm"
          />
          <div>
            <h3 className="text-lg md:text-xl font-bold text-gray-800 uppercase">
              {userData?.name || "Officer"}
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

      {/* Officer Information */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {[ 
          { label: "Full Name", name: "name" },
          { label: "Email", name: "email" },
          { label: "Phone", name: "phone" },
        ].map((field) => (
          <div key={field.name}>
            <label className="block font-semibold text-gray-700 mb-1">{field.label}</label>
            <input
              type="text"
              name={field.name}
              value={userData[field.name] || ""}
              disabled={!editMode}
              onChange={handleChange}
              className="w-full px-3 py-2 border rounded bg-white"
            />
          </div>
        ))}

        {/* Select fields */}
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

        <div>
          <label className="block font-semibold text-gray-700 mb-1">Gender</label>
          <select
            name="gender"
            value={userData.gender || ""}
            disabled={!editMode}
            onChange={handleChange}
            className="w-full px-3 py-2 border rounded bg-white"
          >
            <option value="">Select Gender</option>
            {genders.map((g) => (
              <option key={g} value={g}>
                {g}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label className="block font-semibold text-gray-700 mb-1">Language</label>
          <select
            name="language"
            value={userData.language || ""}
            disabled={!editMode}
            onChange={handleChange}
            className="w-full px-3 py-2 border rounded bg-white"
          >
            <option value="">Select Language</option>
            {languages.map((lang) => (
              <option key={lang} value={lang}>
                {lang}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Action Buttons */}
      {editMode && (
        <div className="flex justify-end gap-4 mt-6">
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

export default OfficerProfile;