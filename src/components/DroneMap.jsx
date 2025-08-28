import React, { useState, useEffect } from "react";
import Map, { Marker, Popup, Source, Layer } from "react-map-gl";
import "mapbox-gl/dist/mapbox-gl.css";
import { io } from "socket.io-client";

const socket = io("http://localhost:9013"); // backend WebSocket

function DroneMap({ selectedDrone, onSelectDrone }) {
  const [drones, setDrones] = useState([]);
  const [popupDrone, setPopupDrone] = useState(null);
  const [paths, setPaths] = useState({}); // track drone paths

  useEffect(() => {
    socket.on("message", (data) => {
      const features = data?.features || [];
      setDrones(features);

      // update paths for each drone
      const newPaths = { ...paths };
      features.forEach((drone) => {
        const id = drone?.properties?.serial || Math.random();
        const coords = drone?.geometry?.coordinates || [0, 0];
        if (!newPaths[id]) newPaths[id] = [];
        newPaths[id].push(coords);
      });
      setPaths(newPaths);
    });

    return () => socket.off("message");
  }, [paths]);

  // convert paths to GeoJSON for LineString layer
  const geojsonPaths = {
    type: "FeatureCollection",
    features: Object.keys(paths).map((id) => ({
      type: "Feature",
      geometry: {
        type: "LineString",
        coordinates: paths[id],
      },
    })),
  };

  return (
    <Map
      initialViewState={{
        longitude: 35.9313,
        latitude: 31.9487,
        zoom: 10,
      }}
      style={{ width: "100%", height: "100vh" }}
      mapStyle="mapbox://styles/mapbox/streets-v11"
      mapboxAccessToken={import.meta.env.VITE_MAPBOX_TOKEN}
    >
      {/* Draw paths */}
      <Source id="paths" type="geojson" data={geojsonPaths}>
        <Layer
          id="line-layer"
          type="line"
          paint={{ "line-color": "#888", "line-width": 2 }}
        />
      </Source>

      {/* Render drone markers */}
      {drones.map((drone, idx) => {
        const coords = drone?.geometry?.coordinates || [0, 0];
        const registration = drone?.properties?.registration || "";
        const allowed = registration.split("-")[1]?.startsWith("B"); // green if allowed

        return (
          <Marker
            key={drone?.properties?.serial || idx}
            longitude={coords[0]}
            latitude={coords[1]}
            anchor="center"
            rotation={drone?.properties?.yaw || 0}
          >
            <div
              onClick={() => onSelectDrone && onSelectDrone(drone)}
              onMouseEnter={() => setPopupDrone(drone)}
              onMouseLeave={() => setPopupDrone(null)}
              style={{
                width: 20,
                height: 20,
                backgroundColor: allowed ? "green" : "red",
                transform: `rotate(${drone?.properties?.yaw || 0}deg)`,
                borderRadius: "50%",
                cursor: "pointer",
              }}
            />
          </Marker>
        );
      })}

      {/* Show popup on hover */}
      {popupDrone && (
        <Popup
          longitude={popupDrone.geometry?.coordinates[0]}
          latitude={popupDrone.geometry?.coordinates[1]}
          anchor="top"
          closeButton={false}
        >
          <div style={{ fontSize: "14px" }}>
            <strong>{popupDrone.properties?.Name}</strong>
            <p>Altitude: {popupDrone.properties?.altitude} m</p>
            <p>Flight Time: {popupDrone.properties?.startTime || "N/A"} s</p>
          </div>
        </Popup>
      )}
    </Map>
  );
}

export default DroneMap;
