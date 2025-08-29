import { useEffect, useState } from "react";
import { io } from "socket.io-client";

const socket = io("http://localhost:9013");

export function useDrones() {
  const [droneMap, setDroneMap] = useState({}); // key: serial, value: drone data

  useEffect(() => {
    socket.on("message", (data) => {
      const features = data?.features || [];
      setDroneMap(prevMap => {
        const newMap = { ...prevMap };
        features.forEach(d => {
          const serial = d.properties?.serial;
          if (serial) {
            newMap[serial] = d; // update existing or add new
          }
        });
        return newMap;
      });
    });

    return () => socket.off("message");
  }, []);

  return droneMap; // return object keyed by serial
}
