import React, { useEffect, useState } from "react";

function DroneList({ drones = [], onSelectDrone }) {
  const [droneMap, setDroneMap] = useState({});
  const [isOpen, setIsOpen] = useState(false); // Start closed on mobile

  // Keep drones keyed by serial
  useEffect(() => {
    const newMap = {};
    drones.forEach((d) => {
      const serial = d.properties?.serial;
      if (serial) newMap[serial] = d;
    });
    setDroneMap(newMap);
  }, [drones]);

  return (
    <>
      {/* Hamburger button for small screens */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="drone-list-toggle"
      >
        ☰
      </button>

      <div className={`drone-list ${isOpen ? "open" : ""}`}>
        <h3> Drones List</h3>
        {Object.values(droneMap).map((drone) => (
          <div
            key={drone.properties?.serial}
            onClick={() => onSelectDrone && onSelectDrone(drone)}
            className={`drone-item ${drone.properties?.registration?.startsWith("SD-B") ? "allowed" : "red"}`}
          >
            <h4>{drone.properties?.Name || "Unnamed Drone"}</h4>
            <ul>
              {Object.entries(drone.properties || {}).map(([key, value]) => (
                <li key={key}>
                  <strong>{key}:</strong> {String(value)}
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>

      {/* Responsive CSS */}
      <style>
        {`
          /* Base styles */
          .drone-list-toggle {
            position: absolute;
            top: 10px;
            left: 10px;
            z-index: 1100;
            background: #007bff;
            color: #fff;
            border: none;
            border-radius: 4px;
            padding: 6px 10px;
            font-size: 16px;
            cursor: pointer;
            display: none;
          }

          .drone-list {
            position: absolute;
            top: 0;
            left: 0;
            width: 300px;
            max-width: 80%;
            height: 100%;
            background: #fff;
            border-right: 1px solid #ddd;
            overflow-y: auto;
            padding: 15px;
            box-shadow: 2px 0 6px rgba(0,0,0,0.1);
            z-index: 1000;
            transition: transform 0.3s ease;
          }

          .drone-item {
            border: 1px solid #eee;
            border-radius: 6px;
            padding: 10px;
            margin-bottom: 10px;
            cursor: pointer;
          }

          .drone-item.allowed {
            background: #f9f9f9;
          }

          .drone-item.red {
            background: #ffe6e6;
          }

          .drone-list h3 {
            margin-bottom: 10px;
            font-size: 18px;
          }

          .drone-item h4 {
            margin: 0 0 5px 0;
            font-size: 14px;
          }

          .drone-item ul {
            list-style: none;
            padding: 0;
            margin: 0;
            font-size: 12px;
          }

          /* Mobile responsiveness */
          @media (max-width: 768px) {
            .drone-list-toggle {
              display: block;
              font-size: 14px;
              padding: 5px 8px;
            }

            .drone-list {
              transform: translateX(-100%);
              width: 200px;
              max-width: 70%;
              padding: 10px;
            }

            .drone-list.open {
              transform: translateX(0);
            }

            .drone-list h3 {
              font-size: 16px;
            }

            .drone-item h4 {
              font-size: 12px;
            }

            .drone-item ul {
              font-size: 10px;
            }
          }
        `}
      </style>
    </>
  );
}

export default DroneList;
