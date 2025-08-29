import React, { useState } from "react";
import { useDrones } from "./hooks/useDrones";
import DroneMap from "./components/DroneMap";
import DroneList from "./components/DroneList";
import Dashboard from "./components/Dashboard";

function App() {
  const droneMap = useDrones(); // object keyed by serial
  const [selectedDrone, setSelectedDrone] = useState(null);

  const drones = Object.values(droneMap); // convert to array for map/list

  return (
    <div style={{ width: "100%", height: "100vh", position: "relative" }}>
      {/* Map takes full screen */}
      <DroneMap
        drones={drones}
        selectedDrone={selectedDrone}
        onSelectDrone={setSelectedDrone}
      />

      {/* Overlay DroneList for mobile */}
      <DroneList
        drones={drones}
        onSelectDrone={setSelectedDrone}
      />

      {/* Dashboard as small panel */}
      <Dashboard droneList={droneMap} />

      {/* Optional CSS for responsive layout */}
      <style>
        {`
          @media (max-width: 768px) {
            /* Make map take full screen */
            .map-container {
              width: 100% !important;
              height: 100% !important;
            }
          }
        `}
      </style>
    </div>
  );
}

export default App;
