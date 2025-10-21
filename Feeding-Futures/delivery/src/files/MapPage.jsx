import React from "react";
import Header from "../components/Header";
import MapDisplay from "../components/MapDisplay";

const MapPage = () => {
  return (
    <div className="min-h-screen bg-gray-100">
      <Header />
      <MapDisplay />
    </div>
  );
};

export default MapPage;
