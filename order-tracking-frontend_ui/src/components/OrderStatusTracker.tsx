// src/components/OrderStatusTracker.tsx
import React from "react";
import { OrderStatus } from "../types/order";
import type { OrderStatusType } from "../types/order";

interface Props {
  currentStatus: OrderStatusType;
  orderId?: string;
}

const steps: OrderStatusType[] = [
  OrderStatus.ORDER_PLACED,
  OrderStatus.PACKED,
  OrderStatus.SHIPPED,
  OrderStatus.OUT_FOR_DELIVERY,
];

const getStepIndex = (step: OrderStatusType): number =>
  steps.findIndex((s) => s === step);

const OrderStatusTracker: React.FC<Props> = ({ currentStatus, orderId }) => {
  const currentStepIdx = getStepIndex(currentStatus);

  const getBarWidth = (): number => {
    return (currentStepIdx / (steps.length - 1)) * 100;
  };

  return (
    <div className="w-full bg-white rounded-2xl shadow-xl p-6 sm:p-8 lg:p-10">
      {/* Header */}
      <div className="mb-12">
        <h2 className="text-3xl font-bold text-gray-800 mb-3">Order Status</h2>
        <p className="text-lg text-gray-600">
          Current Status:{" "}
          <span className="font-semibold text-blue-600">{currentStatus}</span>
        </p>
        {orderId && (
          <p className="text-sm text-gray-500 mt-1">Order ID: {orderId}</p>
        )}
      </div>

      {/* Progress Tracker */}
      <div className="relative pb-32 px-4 sm:px-8">
        {/* Main Progress Bar Container */}
        <div className="relative h-2 bg-gray-200 rounded-full">
          {/* Filled Progress Bar */}
          <div
            className="absolute top-0 left-0 h-full bg-blue-500 rounded-full transition-all duration-700 ease-in-out"
            style={{ width: `${getBarWidth()}%` }}
          />

          {/* Step Circle Indicators with Guidelines */}
          {steps.map((step, idx) => {
            const isActive = idx <= currentStepIdx;
            const isCurrent = idx === currentStepIdx;
            const stepPosition = (idx / (steps.length - 1)) * 100;

            return (
              <div
                key={step}
                className="absolute top-1/2 -translate-y-1/2 -translate-x-1/2"
                style={{ left: `${stepPosition}%` }}
              >
                {/* Circle */}
                <div
                  className={`w-7 h-7 rounded-full border-4 transition-all duration-500 ${
                    isActive
                      ? "bg-blue-500 border-blue-500 shadow-lg"
                      : "bg-white border-gray-300"
                  }`}
                />

                {/* Vertical Guideline to Moving Button (only for current step) */}
                {isCurrent && (
                  <div className="absolute top-7 left-1/2 -translate-x-1/2">
                    <svg width="2" height="50" className="text-blue-400">
                      <line
                        x1="1"
                        y1="0"
                        x2="1"
                        y2="50"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeDasharray="4 4"
                      />
                    </svg>
                  </div>
                )}

                {/* Vertical Guideline to Label */}
                <div className="absolute top-7 left-1/2 -translate-x-1/2">
                  <svg width="1" height="75" className="text-gray-300">
                    <line
                      x1="0.5"
                      y1="0"
                      x2="0.5"
                      y2="75"
                      stroke="currentColor"
                      strokeWidth="1"
                      strokeDasharray="3 3"
                    />
                  </svg>
                </div>
              </div>
            );
          })}

          {/* Moving Circle Indicator */}
          <div
            className="absolute top-1/2 -translate-y-1/2 -translate-x-1/2 transition-all duration-700 ease-in-out"
            style={{ left: `${getBarWidth()}%` }}
          >
            {/* Moving Button */}
            <div className="relative top-[62px]">
              <div className="w-14 h-14 bg-gradient-to-br from-green-400 to-green-600 rounded-full shadow-xl flex items-center justify-center animate-pulse">
                <div className="w-7 h-7 bg-white rounded-full" />
              </div>
            </div>
          </div>
        </div>

        {/* Status Labels */}
        <div className="absolute bottom-0 left-0 right-0 px-4 sm:px-8">
          <div className="relative w-full">
            {steps.map((step, idx) => {
              const stepPosition = (idx / (steps.length - 1)) * 100;
              const isActive = idx <= currentStepIdx;

              return (
                <div
                  key={step}
                  className="absolute -translate-x-1/2"
                  style={{ left: `${stepPosition}%` }}
                >
                  <div
                    className="flex flex-col items-center text-center"
                    style={{ width: "90px" }}
                  >
                    {step === OrderStatus.OUT_FOR_DELIVERY ? (
                      <>
                        <span
                          className={`text-xs sm:text-sm font-semibold transition-colors duration-300 ${
                            isActive ? "text-blue-600" : "text-gray-600"
                          }`}
                        >
                          Out for
                        </span>
                        <span
                          className={`text-xs sm:text-sm font-semibold transition-colors duration-300 ${
                            isActive ? "text-blue-600" : "text-gray-600"
                          }`}
                        >
                          Delivery
                        </span>
                      </>
                    ) : (
                      step.split(" ").map((line, i) => (
                        <span
                          key={i}
                          className={`text-xs sm:text-sm font-semibold transition-colors duration-300 ${
                            isActive ? "text-blue-600" : "text-gray-600"
                          }`}
                        >
                          {line}
                        </span>
                      ))
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Additional Info Section */}
      <div className="mt-8 pt-8 border-t border-gray-200">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <div>
            <p className="text-sm text-gray-500">Estimated Delivery</p>
            <p className="text-lg font-semibold text-gray-800">
              3-5 Business Days
            </p>
          </div>
          <button className="px-6 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors duration-200 font-medium">
            Track Order
          </button>
        </div>
      </div>
    </div>
  );
};

export default OrderStatusTracker;

// //v6

// import React from "react";

// // Order Status Enum
// const OrderStatus = {
//   ORDER_PLACED: "ORDER PLACED",
//   PACKED: "PACKED",
//   SHIPPED: "SHIPPED",
//   OUT_FOR_DELIVERY: "OUT FOR DELIVERY",
// };

// interface Props {
//   currentStatus: string;
//   orderId?: string;
// }

// const steps = [
//   OrderStatus.ORDER_PLACED,
//   OrderStatus.PACKED,
//   OrderStatus.SHIPPED,
//   OrderStatus.OUT_FOR_DELIVERY,
// ];

// const getStepIndex = (step: string) => steps.findIndex((s) => s === step);

// const OrderStatusTracker: React.FC<Props> = ({ currentStatus }) => {
//   const currentStepIdx = getStepIndex(currentStatus);

//   const getBarWidth = () => {
//     return (currentStepIdx / (steps.length - 1)) * 100;
//   };

//   return (
//     <div className="w-full min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-4 sm:p-6 lg:p-8">
//       <div className="max-w-5xl mx-auto">
//         <div className="bg-white rounded-2xl shadow-xl p-6 sm:p-8 lg:p-10">
//           {/* Header */}
//           <div className="mb-12">
//             <h2 className="text-3xl font-bold text-gray-800 mb-3">
//               Order Status
//             </h2>
//             <p className="text-lg text-gray-600">
//               Current Status:{" "}
//               <span className="font-semibold text-blue-600">
//                 {currentStatus}
//               </span>
//             </p>
//           </div>

//           {/* Progress Tracker */}
//           <div className="relative pb-32 px-4 sm:px-8">
//             {/* Main Progress Bar Container */}
//             <div className="relative h-2 bg-gray-200 rounded-full">
//               {/* Filled Progress Bar */}
//               <div
//                 className="absolute top-0 left-0 h-full bg-blue-500 rounded-full transition-all duration-700 ease-in-out"
//                 style={{ width: `${getBarWidth()}%` }}
//               />

//               {/* Step Circle Indicators with Guidelines */}
//               {steps.map((step, idx) => {
//                 const isActive = idx <= currentStepIdx;
//                 const isCurrent = idx === currentStepIdx;
//                 const stepPosition = (idx / (steps.length - 1)) * 100;

//                 return (
//                   <div
//                     key={step}
//                     className="absolute top-1/2 -translate-y-1/2 -translate-x-1/2"
//                     style={{ left: `${stepPosition}%` }}
//                   >
//                     {/* Circle */}
//                     <div
//                       className={`w-7 h-7 rounded-full border-4 transition-all duration-500 ${
//                         isActive
//                           ? "bg-blue-500 border-blue-500 shadow-lg"
//                           : "bg-white border-gray-300"
//                       }`}
//                     />

//                     {/* Vertical Guideline to Moving Button (only for current step) */}
//                     {isCurrent && (
//                       <div className="absolute top-7 left-1/2 -translate-x-1/2">
//                         <svg width="2" height="50" className="text-blue-400">
//                           <line
//                             x1="1"
//                             y1="0"
//                             x2="1"
//                             y2="50"
//                             stroke="currentColor"
//                             strokeWidth="2"
//                             strokeDasharray="4 4"
//                           />
//                         </svg>
//                       </div>
//                     )}

//                     {/* Vertical Guideline to Label */}
//                     <div className="absolute top-7 left-1/2 -translate-x-1/2">
//                       <svg width="1" height="75" className="text-gray-300">
//                         <line
//                           x1="0.5"
//                           y1="0"
//                           x2="0.5"
//                           y2="75"
//                           stroke="currentColor"
//                           strokeWidth="1"
//                           strokeDasharray="3 3"
//                         />
//                       </svg>
//                     </div>
//                   </div>
//                 );
//               })}

//               {/* Moving Circle Indicator */}
//               <div
//                 className="absolute top-1/2 -translate-y-1/2 -translate-x-1/2 transition-all duration-700 ease-in-out"
//                 style={{ left: `${getBarWidth()}%` }}
//               >
//                 {/* Moving Button */}
//                 <div className="relative top-[62px]">
//                   <div className="w-14 h-14 bg-gradient-to-br from-green-400 to-green-600 rounded-full shadow-xl flex items-center justify-center animate-pulse">
//                     <div className="w-7 h-7 bg-white rounded-full" />
//                   </div>
//                 </div>
//               </div>
//             </div>

//             {/* Status Labels */}
//             <div className="absolute bottom-0 left-0 right-0 px-4 sm:px-8">
//               <div className="relative w-full">
//                 {steps.map((step, idx) => {
//                   const stepPosition = (idx / (steps.length - 1)) * 100;
//                   const isActive = idx <= currentStepIdx;

//                   return (
//                     <div
//                       key={step}
//                       className="absolute -translate-x-1/2"
//                       style={{ left: `${stepPosition}%` }}
//                     >
//                       <div
//                         className="flex flex-col items-center text-center"
//                         style={{ width: "90px" }}
//                       >
//                         {step === OrderStatus.OUT_FOR_DELIVERY ? (
//                           <>
//                             <span
//                               className={`text-xs sm:text-sm font-semibold transition-colors duration-300 ${
//                                 isActive ? "text-blue-600" : "text-gray-600"
//                               }`}
//                             >
//                               Out for
//                             </span>
//                             <span
//                               className={`text-xs sm:text-sm font-semibold transition-colors duration-300 ${
//                                 isActive ? "text-blue-600" : "text-gray-600"
//                               }`}
//                             >
//                               Delivery
//                             </span>
//                           </>
//                         ) : (
//                           step.split(" ").map((line, i) => (
//                             <span
//                               key={i}
//                               className={`text-xs sm:text-sm font-semibold transition-colors duration-300 ${
//                                 isActive ? "text-blue-600" : "text-gray-600"
//                               }`}
//                             >
//                               {line}
//                             </span>
//                           ))
//                         )}
//                       </div>
//                     </div>
//                   );
//                 })}
//               </div>
//             </div>
//           </div>

//           {/* Additional Info Section */}
//           <div className="mt-8 pt-8 border-t border-gray-200">
//             <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
//               <div>
//                 <p className="text-sm text-gray-500">Estimated Delivery</p>
//                 <p className="text-lg font-semibold text-gray-800">
//                   3-5 Business Days
//                 </p>
//               </div>
//               <button className="px-6 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors duration-200 font-medium">
//                 Track Order
//               </button>
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// // Demo Component with Controls
// const App = () => {
//   const [currentStatus, setCurrentStatus] = React.useState(OrderStatus.PACKED);

//   return (
//     <div>
//       <OrderStatusTracker currentStatus={currentStatus} orderId="ORD-12345" />

//       {/* Demo Controls */}
//       <div className="fixed bottom-8 left-1/2 -translate-x-1/2 bg-white rounded-full shadow-2xl p-4 flex gap-2 flex-wrap justify-center max-w-xl">
//         <button
//           onClick={() => setCurrentStatus(OrderStatus.ORDER_PLACED)}
//           className="px-4 py-2 bg-gray-800 text-white text-sm rounded-full hover:bg-gray-700 transition-colors"
//         >
//           Order Placed
//         </button>
//         <button
//           onClick={() => setCurrentStatus(OrderStatus.PACKED)}
//           className="px-4 py-2 bg-gray-800 text-white text-sm rounded-full hover:bg-gray-700 transition-colors"
//         >
//           Packed
//         </button>
//         <button
//           onClick={() => setCurrentStatus(OrderStatus.SHIPPED)}
//           className="px-4 py-2 bg-gray-800 text-white text-sm rounded-full hover:bg-gray-700 transition-colors"
//         >
//           Shipped
//         </button>
//         <button
//           onClick={() => setCurrentStatus(OrderStatus.OUT_FOR_DELIVERY)}
//           className="px-4 py-2 bg-gray-800 text-white text-sm rounded-full hover:bg-gray-700 transition-colors"
//         >
//           Out for Delivery
//         </button>
//       </div>
//     </div>
//   );
// };

// export default App;
