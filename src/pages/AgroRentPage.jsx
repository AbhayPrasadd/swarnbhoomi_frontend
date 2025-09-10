import React, { useState, useEffect } from "react";
import Select from "react-select";
import makeAnimated from "react-select/animated";
import { useTranslation } from "react-i18next";

const animatedComponents = makeAnimated();

const categoryOptions = [
  { value: "Tractor", label: "Tractor" },
  { value: "Plough", label: "Plough" },
  { value: "Seeder", label: "Seeder" },
  { value: "Harvester", label: "Harvester" },
  { value: "Sprayer", label: "Sprayer" },
  { value: "Irrigation", label: "Irrigation" },
  { value: "Cultivator", label: "Cultivator" },
  { value: "Baler", label: "Baler" },
  { value: "Drone", label: "Drone" },
  { value: "Weeder", label: "Weeder" },
];

const rentTypeOptions = [
  { value: "Hourly", label: "Hourly" },
  { value: "Daily", label: "Daily" },
  { value: "Weekly", label: "Weekly" },
];

const locationOptions = [
  { value: "Siddharthnagar", label: "Siddharthnagar" },
  { value: "Balrampur", label: "Balrampur" },
  { value: "Bhubaneshwar", label: "Bhubaneshwar" },
  { value: "Lucknow", label: "Lucknow" },
  { value: "Kanpur", label: "Kanpur" },
  { value: "Varanasi", label: "Varanasi" },
  { value: "Allahabad", label: "Allahabad" },
  { value: "Gorakhpur", label: "Gorakhpur" },
];

// Dummy Images
const getPlaceholderImage = (name) =>
  `https://via.placeholder.com/200x150.png?text=${encodeURIComponent(name)}`;

const AgroRent = () => {
  const [machinery, setMachinery] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [search, setSearch] = useState("");
  const [imageFile, setImageFile] = useState(null);
  const [addLoading, setAddLoading] = useState(false);

  const [categoryOption, setCategoryOption] = useState(null);
  const [rentTypeOption, setRentTypeOption] = useState(null);
  const [locationOption, setLocationOption] = useState(null);

  const [newMachinery, setNewMachinery] = useState({
    name: "",
    price: "",
    ownerName: "",
    contact: "",
  });

  const { t } = useTranslation();

  // Complete machinery data based on your images
  useEffect(() => {
    const completeMachineryData = [
      {
        id: "1",
        name: "Tractor",
        category: "Tractor",
        rentType: "Daily",
        location: "Siddharthnagar",
        price: "1500",
        ownerName: "Ramesh Kumar",
        contact: "9876543210",
        image: "/machinery/tractor.jpg"
      },
      {
        id: "2",
        name: "Seed Drill",
        category: "Seeder",
        rentType: "Hourly",
        location: "Balrampur",
        price: "300",
        ownerName: "Suresh Singh",
        contact: "9123456780",
        image: "/machinery/seed-drill.jpg"
      },
      {
        id: "3",
        name: "Combine Harvester",
        category: "Harvester",
        rentType: "Daily",
        location: "Bhubaneshwar",
        price: "2500",
        ownerName: "Mukesh Patel",
        contact: "9234567890",
        image: "/machinery/combine-harvester.jpg"
      },
      {
        id: "4",
        name: "Chisel Plough",
        category: "Plough",
        rentType: "Daily",
        location: "Siddharthnagar",
        price: "800",
        ownerName: "Rajesh Yadav",
        contact: "9345678901",
        image: "/machinery/chisel-plough.jpg"
      },
      {
        id: "5",
        name: "Disc Plough",
        category: "Plough",
        rentType: "Daily",
        location: "Balrampur",
        price: "700",
        ownerName: "Vinod Sharma",
        contact: "9456789012",
        image: "/machinery/plough.jpg"
      },
      {
        id: "6",
        name: "Rotavator",
        category: "Cultivator",
        rentType: "Daily",
        location: "Lucknow",
        price: "1200",
        ownerName: "Ashok Kumar",
        contact: "9567890123",
        image: "/machinery/rotavator.jpg"
      },
      {
        id: "7",
        name: "Crop Sprayer",
        category: "Sprayer",
        rentType: "Hourly",
        location: "Kanpur",
        price: "200",
        ownerName: "Santosh Gupta",
        contact: "9678901234",
        image: "/machinery/sprayer.jpg"
      },
      {
        id: "8",
        name: "Irrigation Pump",
        category: "Irrigation",
        rentType: "Daily",
        location: "Varanasi",
        price: "500",
        ownerName: "Manoj Singh",
        contact: "9789012345",
        image: "/machinery/irrigation-pump.jpg"
      },
      {
        id: "9",
        name: "Paddy Harvester",
        category: "Harvester",
        rentType: "Daily",
        location: "Allahabad",
        price: "2000",
        ownerName: "Deepak Verma",
        contact: "9890123456",
        image: "/machinery/harvester.jpg"
      },
      {
        id: "10",
        name: "Round Baler",
        category: "Baler",
        rentType: "Daily",
        location: "Gorakhpur",
        price: "1800",
        ownerName: "Ravi Chandra",
        contact: "9901234567",
        image: "/machinery/baler.jpg"
      },
      {
        id: "11",
        name: "Agricultural Drone",
        category: "Drone",
        rentType: "Hourly",
        location: "Lucknow",
        price: "500",
        ownerName: "Tech Agri Solutions",
        contact: "9012345678",
        image: "/machinery/drones.jpg"
      },
      {
        id: "12",
        name: "Power Weeder",
        category: "Weeder",
        rentType: "Daily",
        location: "Siddharthnagar",
        price: "600",
        ownerName: "Sunil Kumar",
        contact: "9123456789",
        image: "/machinery/weeder.jpg"
      },
      {
        id: "13",
        name: "Mahindra Tractor 575 DI",
        category: "Tractor",
        rentType: "Weekly",
        location: "Balrampur",
        price: "8000",
        ownerName: "Prakash Singh",
        contact: "9234567801",
        image: "/machinery/tractor.jpg"
      },
      {
        id: "14",
        name: "Multi-Crop Seeder",
        category: "Seeder",
        rentType: "Daily",
        location: "Bhubaneshwar",
        price: "900",
        ownerName: "Govind Das",
        contact: "9345678902",
        image: "/machinery/seed-drill.jpg"
      },
      {
        id: "15",
        name: "Boom Sprayer",
        category: "Sprayer",
        rentType: "Daily",
        location: "Kanpur",
        price: "1000",
        ownerName: "Ajay Mishra",
        contact: "9456789013",
        image: "/machinery/sprayer.jpg"
      },
      {
        id: "16",
        name: "Sub Surface Plough",
        category: "Plough",
        rentType: "Daily",
        location: "Varanasi",
        price: "750",
        ownerName: "Bharat Lal",
        contact: "9567890124",
        image: "/machinery/plough.jpg"
      },
      {
        id: "17",
        name: "Mini Combine Harvester",
        category: "Harvester",
        rentType: "Daily",
        location: "Allahabad",
        price: "2200",
        ownerName: "Kalyan Singh",
        contact: "9678901235",
        image: "/machinery/combine-harvester.jpg"
      },
      {
        id: "18",
        name: "Drip Irrigation System",
        category: "Irrigation",
        rentType: "Weekly",
        location: "Gorakhpur",
        price: "2500",
        ownerName: "Water Tech Solutions",
        contact: "9789012346",
        image: "/machinery/irrigation-pump.jpg"
      },
      {
        id: "19",
        name: "Precision Seeder",
        category: "Seeder",
        rentType: "Daily",
        location: "Lucknow",
        price: "1100",
        ownerName: "Modern Agri",
        contact: "9890123457",
        image: "/machinery/seed-drill.jpg"
      },
      {
        id: "20",
        name: "Field Cultivator",
        category: "Cultivator",
        rentType: "Daily",
        location: "Siddharthnagar",
        price: "1000",
        ownerName: "Jagdish Prasad",
        contact: "9901234568",
        image: "/machinery/rotavator.jpg"
      },
      {
        id: "21",
        name: "Crop Surveillance Drone",
        category: "Drone",
        rentType: "Daily",
        location: "Balrampur",
        price: "1500",
        ownerName: "AgroTech Innovations",
        contact: "9012345679",
        image: "/machinery/drones.jpg"
      },
      {
        id: "22",
        name: "Manual Weeder",
        category: "Weeder",
        rentType: "Daily",
        location: "Bhubaneshwar",
        price: "300",
        ownerName: "Shyam Lal",
        contact: "9123456790",
        image: "/machinery/weeder.jpg"
      },
      {
        id: "23",
        name: "Square Baler",
        category: "Baler",
        rentType: "Daily",
        location: "Kanpur",
        price: "1600",
        ownerName: "Harvest Solutions",
        contact: "9234567012",
        image: "/machinery/baler.jpg"
      },
      {
        id: "24",
        name: "High Pressure Sprayer",
        category: "Sprayer",
        rentType: "Hourly",
        location: "Varanasi",
        price: "250",
        ownerName: "Spray Tech",
        contact: "9345678023",
        image: "/machinery/sprayer.jpg"
      }
    ];

    setMachinery(completeMachineryData);
    setLoading(false);
  }, []);

  const handleAddMachinery = (e) => {
    e.preventDefault();
    setAddLoading(true);

    const newItem = {
      id: Date.now().toString(),
      ...newMachinery,
      category: categoryOption?.value || "",
      rentType: rentTypeOption?.value || "",
      location: locationOption?.value || "",
      image: imageFile
        ? URL.createObjectURL(imageFile)
        : getPlaceholderImage(newMachinery.name || "New Item"),
    };

    setMachinery((prev) => [...prev, newItem]);

    setShowForm(false);
    setNewMachinery({ name: "", price: "", ownerName: "", contact: "" });
    setImageFile(null);
    setCategoryOption(null);
    setRentTypeOption(null);
    setLocationOption(null);
    setAddLoading(false);
  };

  const resetFilters = () => {
    setSearch("");
    setCategoryOption(null);
    setRentTypeOption(null);
    setLocationOption(null);
  };

  const filteredMachinery = machinery.filter((item) => {
    return (
      item.name.toLowerCase().includes(search.toLowerCase()) &&
      (!categoryOption || item.category === categoryOption.value) &&
      (!rentTypeOption || item.rentType === rentTypeOption.value) &&
      (!locationOption || item.location === locationOption.value)
    );
  });

  if (loading) {
    return (
      <div className="container mx-auto px-4 py-6">
        <div className="flex justify-center items-center h-64">
          <div className="text-lg text-gray-600">Loading machinery...</div>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-6">
      <div className="bg-white p-4 rounded shadow">
        <div className="flex flex-col gap-4 sm:flex-row sm:flex-wrap justify-between items-center">
          <input
            type="text"
            placeholder={t("search_equipment")}
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="border p-2 text-sm w-full sm:w-[48%]"
          />

          <Select
            options={categoryOptions}
            value={categoryOption}
            onChange={setCategoryOption}
            placeholder={t("category")}
            className="w-full sm:w-[48%] text-sm"
            components={animatedComponents}
          />

          <Select
            options={rentTypeOptions}
            value={rentTypeOption}
            onChange={setRentTypeOption}
            placeholder={t("rent_type")}
            className="w-full sm:w-[48%] text-sm"
            components={animatedComponents}
          />

          <Select
            options={locationOptions}
            value={locationOption}
            onChange={setLocationOption}
            placeholder={t("location")}
            className="w-full sm:w-[48%] text-sm"
            components={animatedComponents}
          />

          <div className="flex flex-col sm:flex-row gap-2 w-full sm:w-auto">
            <button
              onClick={resetFilters}
              className="bg-gray-500 text-white px-4 py-2 hover:bg-gray-600 text-sm"
            >
              {t("reset_filters")}
            </button>
            <button
              onClick={() => setShowForm(true)}
              className="bg-green-600 text-white px-4 py-2 hover:bg-green-700 text-sm"
            >
              {t("list_equipment")}
            </button>
          </div>
        </div>
      </div>

      {/* Add Equipment Form */}
      {showForm && (
        <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
          <div className="bg-white p-6 w-[90%] sm:w-[500px] rounded-md shadow-lg">
            <h2 className="text-lg font-bold mb-4 text-center text-green-700">
              {t("add_equipment")}
            </h2>
            <form onSubmit={handleAddMachinery} className="space-y-3">
              <input
                name="name"
                placeholder={t("equipment_name")}
                value={newMachinery.name}
                onChange={(e) =>
                  setNewMachinery({ ...newMachinery, name: e.target.value })
                }
                className="border w-full p-2 text-sm"
                required
              />
              <Select
                options={categoryOptions}
                value={categoryOption}
                onChange={setCategoryOption}
                placeholder={t("select_category")}
                className="text-sm"
                components={animatedComponents}
              />
              <input
                name="price"
                placeholder={t("price")}
                value={newMachinery.price}
                onChange={(e) =>
                  setNewMachinery({ ...newMachinery, price: e.target.value })
                }
                className="border w-full p-2 text-sm"
                required
              />
              <Select
                options={rentTypeOptions}
                value={rentTypeOption}
                onChange={setRentTypeOption}
                placeholder={t("select_rent_type")}
                className="text-sm"
                components={animatedComponents}
              />
              <Select
                options={locationOptions}
                value={locationOption}
                onChange={setLocationOption}
                placeholder={t("select_location")}
                className="text-sm"
                components={animatedComponents}
              />
              <input
                name="ownerName"
                placeholder={t("owner_name")}
                value={newMachinery.ownerName}
                onChange={(e) =>
                  setNewMachinery({
                    ...newMachinery,
                    ownerName: e.target.value,
                  })
                }
                className="border w-full p-2 text-sm"
                required
              />
              <input
                name="contact"
                placeholder={t("contact_number")}
                value={newMachinery.contact}
                onChange={(e) =>
                  setNewMachinery({ ...newMachinery, contact: e.target.value })
                }
                className="border w-full p-2 text-sm"
                required
              />
              <input
                type="file"
                accept="image/*"
                onChange={(e) => setImageFile(e.target.files[0])}
                className="border w-full p-2 text-sm"
              />
              {imageFile && (
                <img
                  src={URL.createObjectURL(imageFile)}
                  alt="Preview"
                  className="w-full h-28 object-cover"
                />
              )}
              <div className="flex justify-between pt-2">
                <button
                  type="submit"
                  className="bg-blue-600 text-white px-4 py-2 hover:bg-blue-700 text-sm"
                  disabled={addLoading}
                >
                  {addLoading ? t("submitting") : t("submit")}
                </button>
                <button
                  type="button"
                  onClick={() => setShowForm(false)}
                  className="bg-red-600 text-white px-4 py-2 hover:bg-red-700 text-sm"
                >
                  {t("cancel")}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Equipment Cards */}
      <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 mt-3">
        {filteredMachinery.map((item) => (
          <div key={item.id} className="bg-white border text-sm p-2 shadow-sm">
            <img
              src={item.image}
              alt={item.name}
              className="w-full h-24 sm:h-28 object-cover rounded"
              onError={(e) => {
                e.target.src = getPlaceholderImage(item.name);
              }}
            />
            <div className="pt-2">
              <p className="font-semibold text-gray-800 truncate">{item.name}</p>
              <p className="text-gray-600">{item.category}</p>
              <p className="text-green-700 font-medium">
                ₹{item.price} / {t(item.rentType)}
              </p>
              <p className="text-gray-600">📍 {item.location}</p>
              <p className="text-gray-700">👤 {item.ownerName}</p>
              <a
                href={`tel:${item.contact}`}
                className="mt-2 inline-block bg-blue-600 text-white px-3 py-1 hover:bg-blue-700 rounded"
              >
                {t("call_now")}
              </a>
            </div>
          </div>
        ))}
      </div>

      {filteredMachinery.length === 0 && (
        <div className="text-center py-8">
          <p className="text-gray-500">No machinery found matching your filters.</p>
        </div>
      )}
    </div>
  );
};

export default AgroRent;