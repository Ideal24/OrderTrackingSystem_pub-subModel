// src/App.tsx
import { useState } from "react";
import OrderStatusTracker from "../components/OrderStatusTracker"; // Remove {}
import { OrderStatus } from "../types/order"; // Add this import

function App() {
  const [step, setStep] = useState<OrderStatus>(OrderStatus.SHIPPED); // Use enum

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100">
      <OrderStatusTracker currentStatus={step} />

      <div className="flex space-x-2 mt-6">
        {[
          OrderStatus.ORDER_PLACED,
          OrderStatus.PACKED,
          OrderStatus.SHIPPED,
          OrderStatus.OUT_FOR_DELIVERY,
        ].map((status) => (
          <button
            key={status}
            className={`px-4 py-2 rounded ${
              status === step ? "bg-green-500 text-white" : "bg-gray-200"
            }`}
            onClick={() => setStep(status)}
          >
            {status}
          </button>
        ))}
      </div>
    </div>
  );
}

export default App;
