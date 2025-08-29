import React from "react";

function Dashboard({ droneList = {} }) {
  // Convert droneMap object to array
  const drones = Object.values(droneList);
  const totalDrones = drones.length;

  const allowedDrones = drones.filter(d =>
    (d.properties?.registration || "").startsWith("SD-B")
  ).length;

  const redDrones = totalDrones - allowedDrones;

  // Top 3 highest drones
  const topDrones = [...drones]
    .sort((a, b) => (b.properties?.altitude || 0) - (a.properties?.altitude || 0))
    .slice(0, 3);

  return (
    <div
      style={{
        position: "absolute",
        top: "15px",
        left: "270px", // leave space for DroneList
        padding: "15px",
        background: "rgba(255, 255, 255, 0.9)",
        borderRadius: "10px",
        boxShadow: "0 2px 8px rgba(0,0,0,0.2)",
        zIndex: 1000,
        minWidth: "200px",
        fontFamily: "Arial, sans-serif",
      }}
    >
      <h3 style={{ margin: "0 0 10px 0" }}>📊 Drone Dashboard</h3>
      <p>Total Drones: <b>{totalDrones}</b></p>
      <p style={{ color: "green" }}>Allowed Drones: <b>{allowedDrones}</b></p>
      <p style={{ color: "red" }}>Red Drones: <b>{redDrones}</b></p>
      <hr style={{ margin: "10px 0" }} />
      <h4>Top 3 Highest Drones</h4>
      <ul style={{ paddingLeft: "15px", margin: 0 }}>
        {topDrones.map(d => (
          <li key={d.properties?.serial}>
            {d.properties?.Name || "Unnamed"} ({d.properties?.altitude || 0} m)
          </li>
        ))}
      </ul>


    </div>
    
  );
}

export default Dashboard;
