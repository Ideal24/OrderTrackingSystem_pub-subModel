// src/components/Sidebar.tsx
import React from "react";

const Sidebar = () => {
  return (
    <aside className="w-64 bg-gray-800 text-white h-screen p-6 flex flex-col">
      <h1 className="text-2xl font-bold mb-8">Dashboard</h1>
      <ul className="space-y-3">
        <li className="hover:bg-gray-700 p-2 rounded cursor-pointer">Home</li>
        <li className="hover:bg-gray-700 p-2 rounded cursor-pointer">Orders</li>
        <li className="hover:bg-gray-700 p-2 rounded cursor-pointer">Users</li>
        <li className="hover:bg-gray-700 p-2 rounded cursor-pointer">
          Settings
        </li>
      </ul>
    </aside>
  );
};

export default Sidebar;
