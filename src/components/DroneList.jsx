import React, { useEffect, useState } from "react";

function DroneList({ drones = [], onSelectDrone }) {
  const [droneMap, setDroneMap] = useState({});

  // Keep drones keyed by serial (always latest data)
  useEffect(() => {
    const newMap = { ...droneMap };
    drones.forEach((d) => {
      const serial = d.properties?.serial;
      if (serial) newMap[serial] = d; // replace old drone with new data
    });
    setDroneMap(newMap);
  }, [drones]);

  return (
    <div
      style={{
        position: "absolute",
        top: 0,
        left: 0,
        width: "300px",
        height: "100%",
        background: "#fff",
        borderRight: "1px solid #ddd",
        overflowY: "auto",
        padding: "15px",
        boxShadow: "2px 0 6px rgba(0,0,0,0.1)",
        zIndex: 1000,
      }}
    >
      <h3 style={{ marginBottom: "15px" }}>📋 Drones List</h3>
      {Object.values(droneMap).map((drone) => (
        <div
          key={drone.properties?.serial}
          onClick={() => onSelectDrone && onSelectDrone(drone)}
          style={{
            border: "1px solid #eee",
            borderRadius: "8px",
            padding: "10px",
            marginBottom: "10px",
            cursor: "pointer",
            background: drone.properties?.registration?.startsWith("SD-B")
              ? "#f9f9f9"
              : "#ffe6e6",
          }}
        >
          <h4 style={{ margin: "0 0 5px 0" }}>
            {drone.properties?.Name || "Unnamed Drone"}
          </h4>
          {/* Show all drone details */}
          <ul style={{ listStyle: "none", padding: 0, margin: 0, fontSize: "13px" }}>
            {Object.entries(drone.properties || {}).map(([key, value]) => (
              <li key={key}>
                <strong>{key}:</strong> {String(value)}
              </li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  );
}

export default DroneList;
