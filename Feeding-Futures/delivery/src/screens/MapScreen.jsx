import React, { useEffect, useState } from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import axios from "axios";
import L from "leaflet";

const MapScreen = () => {
  const [locations, setLocations] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchLocations = async () => {
      try {
        const { data } = await axios.get("/api/locations");
        // Ensure we always set an array
        if (Array.isArray(data)) {
          setLocations(data);
        } else if (data && typeof data === "object") {
          setLocations([data]);
        } else {
          setLocations([]);
        }
      } catch (error) {
        console.error("Error fetching locations:", error);
        setLocations([]);
      } finally {
        setLoading(false);
      }
    };
    fetchLocations();
  }, []);

  const customIcon = new L.Icon({
    iconUrl: "https://cdn-icons-png.flaticon.com/512/684/684908.png",
    iconSize: [30, 30],
  });

  if (loading)
    return (
      <div className="flex justify-center items-center h-screen">
        <p className="text-green-600 font-semibold text-lg animate-pulse">
          Loading map locations...
        </p>
      </div>
    );

  return (
    <div className="h-screen w-full bg-gray-100 dark:bg-gray-900">
      <h1 className="text-2xl font-semibold text-center py-4 text-gray-800 dark:text-gray-100">
        Nearby Food & NGO Locations
      </h1>

      {locations.length === 0 ? (
        <p className="text-center text-gray-500 dark:text-gray-300 mt-4">
          No locations available.
        </p>
      ) : (
        <div className="h-[85vh] w-full">
          <MapContainer
            center={[13.0827, 80.2707]}
            zoom={12}
            className="h-full w-full rounded-lg shadow-md"
          >
            <TileLayer
              attribution='&copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a>'
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
            {locations.map((loc, idx) => (
              <Marker
                key={idx}
                position={[loc.lat || 13.0827, loc.lng || 80.2707]}
                icon={customIcon}
              >
                <Popup>
                  <b>{loc.name || "Unknown Location"}</b>
                  <br />
                  Type: {loc.type || "N/A"}
                  <br />
                  {loc.address || "No address provided"}
                </Popup>
              </Marker>
            ))}
          </MapContainer>
        </div>
      )}
    </div>
  );
};

export default MapScreen;
