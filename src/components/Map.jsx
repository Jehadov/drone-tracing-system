import React from "react";
import Map, { Marker, Popup } from "react-map-gl";

const DroneMap = () => {
  return (
    <div className="h-screen w-full">
      <Map
        mapboxAccessToken={import.meta.env.VITE_MAPBOX_TOKEN}
        initialViewState={{
          longitude: 35.9, // Example: Jordan
          latitude: 31.95,
          zoom: 6,
        }}
        style={{ width: "100%", height: "100%" }}
        mapStyle="mapbox://styles/mapbox/streets-v11"
      >
        {/* Example marker */}
        <Marker longitude={35.9} latitude={31.95} color="red" />
      </Map>
    </div>
  );
};

export default DroneMap;
