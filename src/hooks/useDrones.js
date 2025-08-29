import { useEffect, useState } from "react";
import { io } from "socket.io-client";

const socket = io("http://localhost:9013"); // backend WebSocket

export function useDrones() {
  const [drones, setDrones] = useState([]);

  useEffect(() => {
    socket.on("message", (data) => {
      const features = data?.features || [];
      setDrones(features);
    });

    return () => socket.off("message");
  }, []);

  return drones;
}
