import React, { useState } from "react";
import { useDrones } from "./hooks/useDrones";
import DroneMap from "./components/DroneMap";
import DroneList from "./components/DroneList";
import Dashboard from "./components/Dashboard";
import Counter from "./components/Counter";

function App() {
  const droneMap = useDrones(); // object keyed by serial
  const [selectedDrone, setSelectedDrone] = useState(null);

  const drones = Object.values(droneMap);

  return (
    <div style={{ width: "100%", height: "100vh" }}>
      <DroneMap drones={drones} selectedDrone={selectedDrone} onSelectDrone={setSelectedDrone} />
      <DroneList drones={drones} onSelectDrone={setSelectedDrone} />
      <Dashboard droneList={droneMap} />
      <Counter droneList={droneMap} />
    </div>
  );
}

export default App;
