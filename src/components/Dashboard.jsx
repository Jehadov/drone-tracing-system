import React from "react";

function Dashboard({ drones = [] }) {
  // Count drones
  const total = drones.length;
  const greenDrones = drones.filter((d) =>
    d?.properties?.registration?.split("-")[1]?.startsWith("B")
  ).length;
  const redDrones = total - greenDrones;

  return (
    <div
      style={{
        position: "absolute",
        top: 10,
        left: 10,
        background: "rgba(255, 255, 255, 0.9)",
        padding: "15px",
        borderRadius: "10px",
        boxShadow: "0 2px 8px rgba(0,0,0,0.2)",
        zIndex: 1000,
        minWidth: "180px",
        fontFamily: "sans-serif",
      }}
    >
      <h3 style={{ margin: "0 0 10px 0" }}>🚁 Drone Dashboard</h3>
      <p style={{ margin: "5px 0" }}>
        Total drones: <strong>{total}</strong>
      </p>
      <p style={{ margin: "5px 0", color: "green" }}>
        Allowed (Green): <strong>{greenDrones}</strong>
      </p>
      <p style={{ margin: "5px 0", color: "red" }}>
        Not allowed (Red): <strong>{redDrones}</strong>
      </p>
      {/* Fun bonus: simple animation */}
      <div
        style={{
          marginTop: 10,
          height: 10,
          width: `${(greenDrones / (total || 1)) * 100}%`,
          backgroundColor: "green",
          borderRadius: 5,
          transition: "width 0.3s",
        }}
      />
    </div>
  );
}

export default Dashboard;
