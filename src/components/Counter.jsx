// src/components/Counter.jsx
import React from "react";

/**
 * Counter component
 * Shows the number of red (not allowed) drones
 */
function Counter({ droneList = {} }) {
  // Convert droneMap object to array
  const drones = Object.values(droneList);

  // Count drones whose registration does NOT start with "SD-B"
  const redDrones = drones.filter(
    (d) => !(d.properties?.registration || "").startsWith("SD-B")
  ).length;

  return (
    <div
      style={{
        position: "absolute",
        bottom: "20px",
        right: "20px",
        background: "rgba(255, 0, 0, 0.9)",
        color: "#fff",
        padding: "10px 15px",
        borderRadius: "50%",
        fontWeight: "bold",
        fontSize: "18px",
        textAlign: "center",
        boxShadow: "0 2px 8px rgba(0,0,0,0.3)",
        zIndex: 1000,
        minWidth: "50px",
        minHeight: "50px",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        fontFamily: "Arial, sans-serif",
      }}
      title="Number of red drones"
    >
      {redDrones}
    </div>
  );
}

export default Counter;
