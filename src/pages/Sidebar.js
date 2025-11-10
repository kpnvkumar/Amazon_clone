import React, { useState } from "react";

const Sidebar = () => {
  const slots = [
    "Mobiles",
    "Electronics",
    "Home & Kitchen",
    "Fashion",
    "Books",
    "Toys & Games",
    "Home Improvements",
    "Bikes & Cars",
  ];

  const [selectedSlot, setSelectedSlot] = useState(null);

  return (
    <div className="flex min-h-screen bg-gray-100">
      <aside className="w-64 bg-white shadow-md p-4">
        <h2 className="text-xl font-semibold text-gray-800 mb-4 border-b pb-2">
          Categories
        </h2>
        <ul className="space-y-2">
          {slots.map((slot, index) => (
            <li
              key={index}
              onClick={() => setSelectedSlot(slot)}
              className={`cursor-pointer p-3 rounded-lg transition-all duration-200 ${
                selectedSlot === slot
                  ? "bg-blue-500 text-white"
                  : "bg-gray-100 hover:bg-gray-200 text-gray-700"
              }`}
            >
              {slot}
            </li>
          ))}
        </ul>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-8">
        {selectedSlot ? (
          <div>
            <h1 className="text-3xl font-bold mb-4">{selectedSlot}</h1>
            <p className="text-gray-600">
              You selected <b>{selectedSlot}</b>.  
              You can load product lists or category info here.
            </p>
          </div>
        ) : (
          <h2 className="text-gray-500 text-2xl">
            Select a category from the sidebar
          </h2>
        )}
      </main>
    </div>
  );
};

export default Sidebar;
