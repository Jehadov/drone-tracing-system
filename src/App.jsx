import React, { useState } from "react";
import DroneMap from "./components/DroneMap";
import DroneList from "./components/DroneList";
import Counter from "./components/Counter";
import Dashboard from "./components/Dashboard";
import "./index.css";

function App() {
  const [selectedDrone, setSelectedDrone] = useState(null);
  const [allDrones, setAllDrones] = useState([]); // hold all drones

  // handle selection from list or map
  const handleSelectDrone = (drone) => {
    setSelectedDrone(drone);
  };

  return (
    <div style={{ width: "100%", height: "100vh", position: "relative" }}>
      {/* Map with live drones */}
      <DroneMap
        selectedDrone={selectedDrone}
        onSelectDrone={handleSelectDrone}
      />

      {/* Side panel list */}
      <DroneList drones={allDrones} onSelectDrone={handleSelectDrone} />

      {/* Counter bottom right */}
      <Counter drones={allDrones} />

      {/* Dashboard top-left */}
      <Dashboard drones={allDrones} />

      {/* WebSocket handler to update drones */}
      <WebSocketUpdater setAllDrones={setAllDrones} />
    </div>
  );
}

/**
 * Component to handle WebSocket connection and update drones state
 */
import { useEffect } from "react";
import { io } from "socket.io-client";
const socket = io("http://localhost:9013");

function WebSocketUpdater({ setAllDrones }) {
  useEffect(() => {
    socket.on("message", (data) => {
      const features = data?.features || [];
      setAllDrones(features);
    });

    return () => socket.off("message");
  }, [setAllDrones]);

  return null;
}

export default App;
