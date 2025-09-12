import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { auth, db } from "../firebase.js";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { doc, setDoc, serverTimestamp } from "firebase/firestore";

const Registration = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    phone: "",
    language: "",
    state: "",
    district: "",
    village: "",
    pincode: "",
    gender: "",
    role: "farmer", // default role
  });
  const [error, setError] = useState("");

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    setError("");

    try {
      // 1️⃣ Create user in Firebase Auth
      const { user } = await createUserWithEmailAndPassword(
        auth,
        formData.email,
        formData.password
      );

      // 2️⃣ Save user profile in Firestore
      await setDoc(doc(db, "users", user.uid), {
        name: formData.name,
        email: formData.email,
        phone: formData.phone,
        language: formData.language,
        state: formData.state,
        district: formData.district,
        village: formData.village,
        pincode: formData.pincode,
        gender: formData.gender,
        role: formData.role,
        profileCompleted: false,
        createdAt: serverTimestamp(),
      });

      // 3️⃣ Redirect to dashboard or profile setup
      navigate("/dashboard");
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100 px-4">
      <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-md">
        <h2 className="text-2xl font-semibold mb-4 text-center text-green-700">
          Register
        </h2>

        {error && <p className="text-red-500 text-sm mb-2">{error}</p>}

        <form className="space-y-3" onSubmit={handleRegister}>
          <input
            type="text"
            name="name"
            placeholder="Full Name"
            className="w-full p-2 border rounded"
            onChange={handleChange}
            required
          />
          <input
            type="email"
            name="email"
            placeholder="Email"
            className="w-full p-2 border rounded"
            onChange={handleChange}
            required
          />
          <input
            type="password"
            name="password"
            placeholder="Password"
            className="w-full p-2 border rounded"
            onChange={handleChange}
            required
          />
          <input
            type="tel"
            name="phone"
            placeholder="Phone Number"
            className="w-full p-2 border rounded"
            onChange={handleChange}
            required
          />
          <select
            name="language"
            className="w-full p-2 border rounded"
            onChange={handleChange}
            required
          >
            <option value="">Select Language</option>
            <option value="Hindi">Hindi</option>
            <option value="English">English</option>
            <option value="Bengali">Bengali</option>
            <option value="Telugu">Telugu</option>
            {/* Add more languages */}
          </select>
          <input
            type="text"
            name="state"
            placeholder="State"
            className="w-full p-2 border rounded"
            onChange={handleChange}
            required
          />
          <input
            type="text"
            name="district"
            placeholder="District"
            className="w-full p-2 border rounded"
            onChange={handleChange}
            required
          />
          <input
            type="text"
            name="village"
            placeholder="Village"
            className="w-full p-2 border rounded"
            onChange={handleChange}
            required
          />
          <input
            type="text"
            name="pincode"
            placeholder="Pincode"
            className="w-full p-2 border rounded"
            onChange={handleChange}
            required
          />
          <select
            name="gender"
            className="w-full p-2 border rounded"
            onChange={handleChange}
            required
          >
            <option value="">Select Gender</option>
            <option value="Male">Male</option>
            <option value="Female">Female</option>
            <option value="Other">Other</option>
          </select>

          <select
            name="role"
            className="w-full p-2 border rounded"
            onChange={handleChange}
            required
          >
            <option value="farmer">Farmer</option>
            <option value="officer">Officer</option>
            <option value="admin">Admin</option>
          </select>

          <button
            type="submit"
            className="w-full bg-green-600 text-white p-2 rounded-lg hover:bg-green-700"
          >
            Register
          </button>
        </form>

        <p className="mt-4 text-sm text-center">
          Already have an account?{" "}
          <span
            className="text-green-600 cursor-pointer ml-1"
            onClick={() => navigate("/auth")}
          >
            Login
          </span>
        </p>
      </div>
    </div>
  );
};

export default Registration;
