import { useEffect, useState } from "react";
import { io } from "socket.io-client";

const socket = io("http://localhost:9013");

export function useDrones() {
  const [drones, setDrones] = useState([]);

  useEffect(() => {
    socket.on("message", (data) => {
      const newDrones = data.features.map((d) => ({
        id: d.properties.serial,
        name: d.properties.Name,
        registration: d.properties.registration,
        coords: d.geometry.coordinates,
        altitude: d.properties.altitude,
        yaw: d.properties.yaw,
        startTime: Date.now(),
        status: d.properties.registration.startsWith("B") ? "green" : "red",
      }));
      setDrones(newDrones);
    });

    return () => socket.off("message");
  }, []);

  return { drones };
}
