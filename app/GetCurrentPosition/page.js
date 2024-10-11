"use client"

import { useEffect, useState } from 'react';

const Geolocation = () => {
  const [position, setPosition] = useState(null);
  const [error, setError] = useState(null);
  const [showDone, setShowDone] = useState(false);

  const options = {
    enableHighAccuracy: true,
    timeout: 5000,
    maximumAge: 0,
  };

  const success = (pos) => {
    const crd = pos.coords;
    setPosition({
      latitude: crd.latitude,
      longitude: crd.longitude,
      accuracy: crd.accuracy,
    });
    setShowDone(true);
  };

  const errorCallback = (err) => {
    setError(`ERROR(${err.code}): ${err.message}`);
  };

  useEffect(() => {
    navigator.geolocation.getCurrentPosition(success, errorCallback, options);
  }, []);

  return (
    <div className="bg-gradient-to-r from-purple-400 to-blue-500 text-white p-8 rounded-lg shadow-lg text-center animate-fadeIn">
      <h1 className="text-2xl font-bold">Geolocation</h1>
      {error && <p className="mt-4 text-red-400">{error}</p>}
      {position ? (
        <div className="mt-6">
          <p>Your current position is:</p>
          <p>Latitude: {position.latitude}</p>
          <p>Longitude: {position.longitude}</p>
          <p>Accuracy: {position.accuracy} meters</p>
          <div className={`text-4xl mt-4 transition-opacity duration-500 ${showDone ? 'opacity-100' : 'opacity-0'}`}>
            ✅
          </div>
          <p className="mt-2 text-lg">Location fetched successfully!</p>
        </div>
      ) : (
        <p className="mt-4">Fetching location...</p>
      )}
    </div>
  );
};

export default Geolocation;
