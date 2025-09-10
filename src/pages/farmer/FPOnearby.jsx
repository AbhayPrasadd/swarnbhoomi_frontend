import React from "react";

const FPOnearby = () => {
  // Hardcoded FPO list for Bhubaneswar demo
  const fpoCenters = [
    { name: "Bhubaneswar Farmers Producer Company", location: "Unit 9, Bhubaneswar" },
    { name: "Odisha Agro FPO", location: "Near Rasulgarh, Bhubaneswar" },
    { name: "Kalinga Farmers FPO", location: "Patia, Bhubaneswar" },
    { name: "Krishi Vikash FPO", location: "Baramunda, Bhubaneswar" },
  ];

  return (
    <div className="flex flex-col md:flex-row h-screen">
      {/* Map Section */}
      <div className="w-full md:w-2/3 h-96 md:h-full relative">
        <iframe
          title="Google Map Bhubaneswar"
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d117563.24571607347!2d85.74722760529773!3d20.30084920907602!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3a1909d4726f4c11%3A0x91a0b5d3f32c1e3!2sBhubaneswar%2C%20Odisha!5e0!3m2!1sen!2sin!4v1630912345678!5m2!1sen!2sin"
          width="100%"
          height="100%"
          style={{ border: 0 }}
          allowFullScreen=""
          loading="lazy"
        ></iframe>
      </div>

      {/* FPO List Section */}
      <div className="w-full md:w-1/3 p-4 bg-gray-100 overflow-y-auto max-h-96 md:max-h-full">
        <h2 className="text-lg md:text-xl font-semibold text-green-800 mb-4 text-center md:text-left">
          Nearby FPO Centers (Bhubaneswar)
        </h2>
        <ul className="space-y-2">
          {fpoCenters.map((fpo, index) => (
            <li
              key={index}
              className="p-3 bg-white rounded shadow cursor-pointer hover:bg-green-100"
            >
              <p className="font-medium">{fpo.name}</p>
              <p className="text-sm text-gray-600">{fpo.location}</p>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default FPOnearby;
