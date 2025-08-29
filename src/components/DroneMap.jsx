import React, { useState, useEffect } from "react";
import Map, { Marker, Popup, Source, Layer } from "react-map-gl";
import "mapbox-gl/dist/mapbox-gl.css";

function DroneMap({ drones, selectedDrone, onSelectDrone }) {
  const [popupDrone, setPopupDrone] = useState(null);
  const [paths, setPaths] = useState({});

  // Update paths
  useEffect(() => {
    const newPaths = { ...paths };
    drones.forEach((drone) => {
      const id = drone?.properties?.serial || Math.random();
      const coords = drone?.geometry?.coordinates || [0, 0];
      if (!newPaths[id]) newPaths[id] = [];
      newPaths[id].push(coords);
    });
    setPaths(newPaths);
  }, [drones]);

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
      <Source id="paths" type="geojson" data={geojsonPaths}>
        <Layer
          id="line-layer"
          type="line"
          paint={{ "line-color": "#888", "line-width": 2 }}
        />
      </Source>

      {drones.map((drone, idx) => {
        const coords = drone?.geometry?.coordinates || [0, 0];
        const registration = drone?.properties?.registration || "";
        const allowed = registration.split("-")[1]?.startsWith("B");
        const yaw = drone?.properties?.yaw || 0;

        return (
          <Marker
            key={drone?.properties?.serial || idx}
            longitude={coords[0]}
            latitude={coords[1]}
            anchor="center"
          >
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

      {popupDrone && (
        <Popup
          longitude={popupDrone.geometry?.coordinates[0]}
          latitude={popupDrone.geometry?.coordinates[1]}
          anchor="top"
          closeButton={false}
        >
          <div>
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
