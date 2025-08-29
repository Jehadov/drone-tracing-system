import React from "react";

function DroneList({ drones = [], onSelectDrone }) {
  return (
    <div
      style={{
        position: "absolute",
        top: 0,
        left: 0,
        width: "250px",
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

      {drones.length === 0 && <p style={{ color: "#888" }}>No drones available</p>}

      {drones.map((drone, idx) => {
        const registration = drone?.properties?.registration || "";
        const allowed = registration.split("-")[1]?.startsWith("B");

        return (
          <div
            key={drone?.properties?.serial || idx}
            onClick={() => onSelectDrone && onSelectDrone(drone)}
            style={{
              border: "1px solid #eee",
              borderRadius: "8px",
              padding: "10px",
              marginBottom: "10px",
              cursor: "pointer",
              background: allowed ? "#f0fff0" : "#ffe6e6",
              transition: "background 0.2s",
            }}
          >
            <h4 style={{ margin: "0 0 5px 0" }}>{drone?.properties?.Name}</h4>
            <p style={{ margin: 0, fontSize: "14px", color: "#555" }}>
              Status:{" "}
              <span style={{ fontWeight: "bold", color: allowed ? "green" : "red" }}>
                {allowed ? "Allowed" : "Not Allowed"}
              </span>
            </p>
            <p style={{ margin: 0, fontSize: "12px", color: "#777" }}>
              📍 {drone?.geometry?.coordinates?.join(", ")}
            </p>
          </div>
        );
      })}
    </div>
  );
}

export default DroneList;
