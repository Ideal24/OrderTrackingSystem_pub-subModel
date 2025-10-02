// src/pages/Dashboard.tsx
import { useState, useEffect } from "react";
import Navbar from "../components/Navbar";
import Card from "../components/Card";
import Table from "../components/Table";
import OrderStatusTracker from "../components/OrderStatusTracker";
import { OrderStatus, type OrderStatusType } from "../types/order";

function Dashboard() {
  const [currentStatus, setCurrentStatus] = useState<OrderStatusType>(
    OrderStatus.SHIPPED
  );

  const tableData = [
    { id: "#001", name: "John Doe", status: "Completed", date: "2025-10-02" },
    { id: "#002", name: "Jane Smith", status: "Pending", date: "2025-10-01" },
    {
      id: "#003",
      name: "Alice Johnson",
      status: "Processing",
      date: "2025-09-30",
    },
  ];

  // RabbitMQ subscription will be added here
  useEffect(() => {
    // TODO: Subscribe to RabbitMQ for real-time order updates
    // Example:
    // const connection = connectToRabbitMQ();
    // connection.subscribe('order-updates', (message) => {
    //   setCurrentStatus(message.status);
    // });
    // return () => connection.close();
  }, []);

  return (
    <main className="flex-1 p-6 bg-gray-100 overflow-auto">
      <Navbar />

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
        <Card title="Total Orders" value="1,245" />
        <Card title="Revenue" value="$24,500" />
        <Card title="Users" value="8,234" />
      </div>

      {/* Table */}
      <Table rows={tableData} />

      {/* Order Status Tracker Section */}
      <div className="mb-6 mt-6">
        <OrderStatusTracker currentStatus={currentStatus} orderId="ORD-12345" />
      </div>

      {/* Test Controls - Uncomment for testing */}
      <div className="bg-white rounded-lg shadow-md p-6 mb-6">
        <h3 className="text-lg font-semibold mb-4">
          Test Order Status Updates
        </h3>
        <div className="flex flex-wrap justify-center gap-2">
          {[
            OrderStatus.ORDER_PLACED,
            OrderStatus.PACKED,
            OrderStatus.SHIPPED,
            OrderStatus.OUT_FOR_DELIVERY,
          ].map((status) => (
            <button
              key={status}
              className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                status === currentStatus
                  ? "bg-blue-500 text-white"
                  : "bg-gray-200 hover:bg-gray-300"
              }`}
              onClick={() => setCurrentStatus(status)}
            >
              {status}
            </button>
          ))}
        </div>
      </div>
    </main>
  );
}

export default Dashboard;
