import React, { useState } from "react";
import { useDrones } from "./hooks/useDrones";
import DroneMap from "./components/DroneMap";
import DroneList from "./components/DroneList";
import Dashboard from "./components/Dashboard";
import Counter from "./components/Counter";
import "./index.css";

function App() {
  const drones = useDrones();
  const [selectedDrone, setSelectedDrone] = useState(null);

  return (
    <div style={{ width: "100%", height: "100vh" }}>
      <DroneMap drones={drones} selectedDrone={selectedDrone} onSelectDrone={setSelectedDrone} />
      <DroneList drones={drones} onSelectDrone={setSelectedDrone} />
      <Dashboard drones={drones} />
      <Counter drones={drones} />
    </div>
  );
}

export default App;
