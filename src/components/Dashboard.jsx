import React from "react";

function Dashboard({ drones }) {
  return (
    <div
      style={{
        position: "absolute",
        top: 20,
        left: 270,
        background: "rgba(255,255,255,0.9)",
        padding: "10px 15px",
        borderRadius: "8px",
        boxShadow: "0 2px 8px rgba(0,0,0,0.2)",
        fontFamily: "sans-serif",
        zIndex: 1000,
      }}
    >
      <h3>🚁 Drone Dashboard</h3>
      <p>Total Drones: {drones.length}</p>
    </div>
  );
}

export default Dashboard;
