import React from "react";

function Counter({ drones = [] }) {
  // Count drones that are NOT allowed (red)
  const redDrones = drones.filter(
    (drone) => !drone?.properties?.registration?.split("-")[1]?.startsWith("B")
  ).length;

  return (
    <div
      style={{
        position: "absolute",
        bottom: 20,
        right: 20,
        background: "rgba(255,255,255,0.9)",
        padding: "10px 15px",
        borderRadius: "8px",
        boxShadow: "0 2px 8px rgba(0,0,0,0.2)",
        fontWeight: "bold",
        fontFamily: "sans-serif",
        zIndex: 1000,
        minWidth: "90px",
        textAlign: "center",
      }}
    >
      <span style={{ color: "red", fontSize: "16px" }}>❌ Red Drones</span>
      <p style={{ margin: 0, fontSize: "18px" }}>{redDrones}</p>
    </div>
  );
}

export default Counter;
