"use-client";

import React, { useEffect, useState } from "react";

const Map = ({ getSource, getDestination }) => {
  const [mapLoaded, setMapLoaded] = useState(false);

  useEffect(() => {
    if (typeof window !== "undefined") {
      import("leaflet").then((L) => {
        import("leaflet/dist/leaflet.css");

        // @ts-ignore
        delete L.Icon.Default.prototype._getIconUrl;
        L.Icon.Default.mergeOptions({
          iconUrl: require("leaflet/dist/images/marker-icon.png").default,
          iconRetinaUrl: require("leaflet/dist/images/marker-icon-2x.png")
            .default,
          shadowUrl: require("leaflet/dist/images/marker-shadow.png").default,
        });

        setMapLoaded(true);
      });
    }
  }, []);

  if (!mapLoaded) return null;

  return (
    <div className="h-full rounded-lg">
      <LeafletMap getSource={getSource} getDestination={getDestination} />
    </div>
  );
};

const LeafletMap = ({ getSource, getDestination }) => {
  const { MapContainer, TileLayer, Marker } = require("react-leaflet");

  return (
    <MapContainer
      center={getSource || [51.505, -0.09]}
      zoom={4}
      scrollWheelZoom={false}
    >
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />

      {getSource && <Marker position={getSource} />}
      {getDestination && <Marker position={getDestination} />}
    </MapContainer>
  );
};

export default Map;
