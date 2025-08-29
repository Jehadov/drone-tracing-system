import React, { useState, useEffect, useRef } from "react";
import Map, { Marker, Popup, Source, Layer } from "react-map-gl";
import "mapbox-gl/dist/mapbox-gl.css";

function DroneMap({ drones, selectedDrone, onSelectDrone }) {
  const [allDrones, setAllDrones] = useState([]); // store all drones by serial
  const [paths, setPaths] = useState({});
  const [popupDrone, setPopupDrone] = useState(null);
  const mapRef = useRef();

  // Update drones and paths whenever new data arrives
  useEffect(() => {
    const updatedDrones = [...allDrones];
    const newPaths = { ...paths };

    drones.forEach((drone) => {
      const serial = drone?.properties?.serial;
      if (!serial) return;

      const coords = drone?.geometry?.coordinates || [0, 0];

      // Update or add drone by serial
      const existingIndex = updatedDrones.findIndex(
        (d) => d?.properties?.serial === serial
      );
      if (existingIndex !== -1) {
        // keep existing startTime if exists
        const existingDrone = updatedDrones[existingIndex];
        drone.properties.startTime = existingDrone.properties.startTime || new Date();
        updatedDrones[existingIndex] = drone;
      } else {
        // new drone, set startTime
        drone.properties.startTime = new Date();
        updatedDrones.push(drone);
      }

      // Update path for this drone
      if (!newPaths[serial]) newPaths[serial] = [];
      newPaths[serial].push(coords);
    });

    setAllDrones(updatedDrones);
    setPaths(newPaths);
  }, [drones]);

  // Fly to selected drone
  useEffect(() => {
    if (selectedDrone && mapRef.current) {
      const coords = selectedDrone.geometry?.coordinates || [0, 0];
      mapRef.current.flyTo({
        center: coords,
        zoom: 15,
        speed: 0.8,
      });
    }
  }, [selectedDrone]);

  // Format time as Day / HH:MM
  const formatTime = (date) => {
    const d = new Date(date);
    return `${d.toLocaleDateString()} ${d.getHours()}:${String(d.getMinutes()).padStart(2, "0")}`;
  };

  return (
    <Map
      ref={mapRef}
      initialViewState={{ longitude: 35.9313, latitude: 31.9487, zoom: 10 }}
      style={{ width: "100%", height: "100vh" }}
      mapStyle="mapbox://styles/mapbox/streets-v11"
      mapboxAccessToken={import.meta.env.VITE_MAPBOX_TOKEN}
    >
      {/* Render paths for all drones */}
      {Object.keys(paths).map((serial) => {
        const dronePath = {
          type: "FeatureCollection",
          features: [
            {
              type: "Feature",
              geometry: { type: "LineString", coordinates: paths[serial] },
            },
          ],
        };
        return (
          <Source key={serial} id={`path-${serial}`} type="geojson" data={dronePath}>
            <Layer
              id={`line-layer-${serial}`}
              type="line"
              paint={{ "line-color": "#888", "line-width": 2 }}
            />
          </Source>
        );
      })}

      {/* Render drone markers */}
      {allDrones.map((drone) => {
        const coords = drone?.geometry?.coordinates || [0, 0];
        const serial = drone?.properties?.serial;
        const registration = drone?.properties?.registration || "";
        const allowed = registration.startsWith("SD-B");
        const yaw = drone?.properties?.yaw || 0;

        return (
          <Marker key={serial} longitude={coords[0]} latitude={coords[1]} anchor="center">
            <div
              onClick={() => onSelectDrone && onSelectDrone(drone)}
              onMouseEnter={() => setPopupDrone(drone)}
              onMouseLeave={() => setPopupDrone(null)}
              style={{
                width: 20,
                height: 20,
                transform: `rotate(${yaw}deg)`,
                backgroundColor: allowed ? "green" : "red",
                clipPath: "polygon(50% 0%, 0% 100%, 100% 100%)",
                cursor: "pointer",
              }}
            />
          </Marker>
        );
      })}

      {/* Hover popup */}
      {popupDrone && (
        <Popup
          longitude={popupDrone.geometry?.coordinates[0]}
          latitude={popupDrone.geometry?.coordinates[1]}
          anchor="top"
          closeButton={false}
        >
          <div>
            <strong>{popupDrone.properties?.Name || popupDrone.properties?.serial}</strong>
            <p>Altitude: {popupDrone.properties?.altitude || "N/A"} m</p>
            <p>Flight Time: {popupDrone.properties?.startTime ? formatTime(popupDrone.properties.startTime) : "N/A"}</p>
          </div>
        </Popup>
      )}
    </Map>
  );
}

export default DroneMap;
