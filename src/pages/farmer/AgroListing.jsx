import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";

const AgroListing = () => {
  const [myItems, setMyItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const { t } = useTranslation();

  // Dummy data for current user's listings
  const dummyUserListings = [
    {
      id: "user1",
      name: "My Tractor - Mahindra 575",
      category: "Tractor",
      rentType: "Daily",
      location: "Siddharthnagar",
      price: "1500",
      ownerName: "Your Name",
      contact: "9876543210",
      image: "/machinery/tractor.jpg",
      creator: "current-user-uid"
    },
    {
      id: "user2",
      name: "My Harvester - Mini Combine",
      category: "Harvester",
      rentType: "Daily",
      location: "Siddharthnagar",
      price: "2200",
      ownerName: "Your Name",
      contact: "9876543210",
      image: "/machinery/combine-harvester.jpg",
      creator: "current-user-uid"
    },
    {
      id: "user3",
      name: "My Seed Drill",
      category: "Seeder",
      rentType: "Hourly",
      location: "Siddharthnagar",
      price: "300",
      ownerName: "Your Name",
      contact: "9876543210",
      image: "/machinery/seed-drill.jpg",
      creator: "current-user-uid"
    },
    {
      id: "user4",
      name: "My Rotavator",
      category: "Cultivator",
      rentType: "Daily",
      location: "Siddharthnagar",
      price: "1000",
      ownerName: "Your Name",
      contact: "9876543210",
      image: "/machinery/rotavator.jpg",
      creator: "current-user-uid"
    },
    {
      id: "user5",
      name: "My Crop Sprayer",
      category: "Sprayer",
      rentType: "Hourly",
      location: "Siddharthnagar",
      price: "200",
      ownerName: "Your Name",
      contact: "9876543210",
      image: "/machinery/sprayer.jpg",
      creator: "current-user-uid"
    },
    {
      id: "user6",
      name: "My Power Weeder",
      category: "Weeder",
      rentType: "Daily",
      location: "Siddharthnagar",
      price: "600",
      ownerName: "Your Name",
      contact: "9876543210",
      image: "/machinery/weeder.jpg",
      creator: "current-user-uid"
    }
  ];

  const fetchMyListings = async () => {
    setLoading(true);
    try {
      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // In real app, this would filter by current user's UID
      // const userItems = allData.filter((item) => item.creator === currentUser?.uid);
      setMyItems(dummyUserListings);
    } catch (error) {
      console.error("Error fetching listings:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    const confirmDelete = window.confirm(t("confirm_delete") || "Are you sure you want to delete this item?");
    if (!confirmDelete) return;
    
    try {
      // Simulate delete operation
      setMyItems(prevItems => prevItems.filter(item => item.id !== id));
      console.log("Item deleted:", id);
    } catch (err) {
      console.error("Delete failed", err);
    }
  };

  const handleEdit = (id) => {
    // Placeholder for edit functionality
    console.log("Edit item:", id);
    alert("Edit functionality will be implemented when Firebase is back online");
  };

  useEffect(() => {
    fetchMyListings();
  }, []);

  if (loading) {
    return (
      <div className="container mx-auto px-4 py-6">
        <div className="flex justify-center items-center h-64">
          <div className="text-lg text-gray-600">
            {t("loading_listings") || "Loading your listings..."}
          </div>
        </div>
      </div>
    );
  }

  if (myItems.length === 0) {
    return (
      <div className="container mx-auto px-4 py-6">
        <div className="text-center py-12">
          <div className="text-gray-400 text-6xl mb-4">🚜</div>
          <p className="text-center text-gray-500 text-lg">
            {t("no_equipment_added") || "No equipment added yet"}
          </p>
          <p className="text-center text-gray-400 text-sm mt-2">
            Add your first equipment to get started with renting
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-6">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-800 mb-2">My Equipment Listings</h1>
        <p className="text-gray-600">Manage your agricultural equipment available for rent</p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {myItems.map((item) => (
          <div key={item.id} className="bg-white border text-sm p-3 relative rounded-lg shadow-sm hover:shadow-md transition-shadow">
            <div className="absolute top-2 right-2 flex gap-1">
              <button
                onClick={() => handleEdit(item.id)}
                className="bg-blue-500 text-white p-1 rounded hover:bg-blue-600 text-xs"
                title="Edit"
              >
                ✏️
              </button>
              <button
                onClick={() => handleDelete(item.id)}
                className="bg-red-500 text-white p-1 rounded hover:bg-red-600 text-xs"
                title="Delete"
              >
                🗑️
              </button>
            </div>
            
            <img
              src={item.image}
              alt={item.name}
              className="w-full h-32 object-cover mb-2 rounded"
              onError={(e) => {
                e.target.src = `https://via.placeholder.com/200x150.png?text=${encodeURIComponent(item.name)}`;
              }}
            />
            
            <div className="space-y-1">
              <p className="font-semibold text-gray-800 truncate" title={item.name}>
                {item.name}
              </p>
              <p className="text-gray-600">{item.category}</p>
              <p className="text-green-700 font-medium">
                ₹{item.price} / {t(item.rentType) || item.rentType}
              </p>
              <p className="text-gray-600">📍 {item.location}</p>
              <p className="text-gray-700">👤 {item.ownerName}</p>
              <p className="text-blue-600 text-sm">📞 {item.contact}</p>
              
              <div className="pt-2">
                <span className="inline-block bg-green-100 text-green-800 text-xs px-2 py-1 rounded">
                  Available
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>

    
    </div>
  );
};

export default AgroListing;