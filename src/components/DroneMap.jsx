import React, { useState, useEffect, useRef } from "react";
import Map, { Marker, Popup, Source, Layer } from "react-map-gl";
import "mapbox-gl/dist/mapbox-gl.css";

function DroneMap({ drones, selectedDrone, onSelectDrone }) {
  const [allDrones, setAllDrones] = useState([]);
  const [paths, setPaths] = useState({});
  const [popupDrone, setPopupDrone] = useState(null);
  const mapRef = useRef();

  useEffect(() => {
    const updatedDrones = [...allDrones];
    const newPaths = { ...paths };

    drones.forEach((drone) => {
      const serial = drone?.properties?.serial;
      if (!serial) return;

      const coords = drone?.geometry?.coordinates || [0, 0];
      const existingIndex = updatedDrones.findIndex(d => d?.properties?.serial === serial);

      if (existingIndex !== -1) {
        const existingDrone = updatedDrones[existingIndex];
        drone.properties.startTime = existingDrone.properties.startTime || new Date();
        updatedDrones[existingIndex] = drone;
      } else {
        drone.properties.startTime = new Date();
        updatedDrones.push(drone);
      }

      if (!newPaths[serial]) newPaths[serial] = [];
      newPaths[serial].push(coords);
    });

    setAllDrones(updatedDrones);
    setPaths(newPaths);
  }, [drones]);

  useEffect(() => {
    if (selectedDrone && mapRef.current) {
      const coords = selectedDrone.geometry?.coordinates || [0, 0];
      mapRef.current.flyTo({ center: coords, zoom: 15, speed: 0.8 });
    }
  }, [selectedDrone]);

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
      dragRotate={false}
      touchPitch={true}
    >
      {Object.keys(paths).map(serial => {
        const dronePath = {
          type: "FeatureCollection",
          features: [{ type: "Feature", geometry: { type: "LineString", coordinates: paths[serial] } }],
        };
        return (
          <Source key={serial} id={`path-${serial}`} type="geojson" data={dronePath}>
            <Layer id={`line-layer-${serial}`} type="line" paint={{ "line-color": "#888", "line-width": 2 }} />
          </Source>
        );
      })}

      {allDrones.map(drone => {
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
                width: 20, // smaller on mobile
                height: 20,
                transform: `rotate(${yaw}deg)`,
                backgroundColor: allowed ? "green" : "red",
                clipPath: "polygon(50% 0%, 0% 100%, 100% 100%)",
                cursor: "pointer",
                touchAction: "manipulation",
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
          maxWidth="180px"
        >
          <div style={{ fontSize: "12px", lineHeight: "1.2em" }}>
            <strong>{popupDrone.properties?.Name || popupDrone.properties?.serial}</strong>
            <p>Altitude: {popupDrone.properties?.altitude || "N/A"} m</p>
            <p>
              Flight Time:{" "}
              {popupDrone.properties?.startTime ? formatTime(popupDrone.properties.startTime) : "N/A"}
            </p>
          </div>
        </Popup>
      )}

      {/* Red drone counter */}
      <div
        style={{
          position: "absolute",
          bottom: "10px",
          right: "10px",
          background: "rgba(255,0,0,0.85)",
          color: "#fff",
          padding: "8px 10px",
          borderRadius: "50%",
          fontWeight: "bold",
          fontSize: "14px",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          minWidth: "35px",
          minHeight: "35px",
          zIndex: 1000,
          fontFamily: "Arial, sans-serif",
        }}
        title="Number of red drones"
      >
        {allDrones.filter(d => !(d?.properties?.registration || "").startsWith("SD-B")).length}
      </div>

      {/* Mobile adjustments */}
      <style>
        {`
          @media (max-width: 768px) {
            .mapboxgl-map {
              height: 100vh;
            }
          }
        `}
      </style>
    </Map>
  );
}

export default DroneMap;
