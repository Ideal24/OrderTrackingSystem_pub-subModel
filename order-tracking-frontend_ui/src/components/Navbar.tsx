// src/components/Navbar.tsx
import React from "react";

const Navbar = () => {
  return (
    <header className="flex justify-between items-center mb-6">
      <h2 className="text-2xl font-bold text-gray-700">Dashboard</h2>
      <button className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">
        Add New
      </button>
    </header>
  );
};

export default Navbar;
