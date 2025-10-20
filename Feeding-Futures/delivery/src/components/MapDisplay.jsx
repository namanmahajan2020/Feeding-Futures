import React, { useEffect } from "react";
import L from "leaflet";

const MapDisplay = () => {
  useEffect(() => {
    const mapContainer = document.getElementById("map-container");
    if (!mapContainer) return;

    navigator.geolocation.getCurrentPosition(
      async (position) => {
        const userLocation = {
          lat: position.coords.latitude,
          lng: position.coords.longitude,
        };

        const map = L.map(mapContainer).setView(userLocation, 15);
        L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
          attribution:
            'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors',
          maxZoom: 18,
        }).addTo(map);

        const marker = L.marker(userLocation).addTo(map);
        marker.bindPopup("<b>You are here!</b>").openPopup();

        const response = await fetch(
          `https://nominatim.openstreetmap.org/reverse?format=jsonv2&lat=${userLocation.lat}&lon=${userLocation.lng}`
        );
        const data = await response.json();

        document.getElementById("city-name").innerText =
          "You are in " + (data.address.city || data.address.town);
        document.getElementById("address").innerText =
          "You are at " + data.display_name;
      },
      () => {
        alert("Error: Unable to retrieve your location.");
      }
    );
  }, []);

  return (
    <div className="text-center font-poppins my-8">
      <h3 className="text-xl font-semibold mb-4">Current Location</h3>
      <div id="map-container" className="w-[90%] h-[300px] mx-auto rounded-lg shadow-md z-20"></div>
      <div id="city-name" className="mt-4 text-lg font-medium"></div>
      <div id="address" className="mt-2 text-gray-600"></div>
    </div>
  );
};

export default MapDisplay;
