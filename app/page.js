"use client";

import { useEffect, useState } from 'react';

const AllInOne = () => {
  const [position, setPosition] = useState(null);
  const [error, setError] = useState(null);
  const [status, setStatus] = useState('');
  const [mapLink, setMapLink] = useState('');
  const [target, setTarget] = useState({ latitude: 37.7749, longitude: -122.4194 });
  const [message, setMessage] = useState('');
  const [watchId, setWatchId] = useState(null);

  const options = {
    enableHighAccuracy: true,
    timeout: 10000,
    maximumAge: 0,
  };

  useEffect(() => {
    const success = (pos) => {
      const crd = pos.coords;
      setPosition({
        latitude: crd.latitude,
        longitude: crd.longitude,
        accuracy: crd.accuracy,
      });
      setStatus('');
      setMapLink(`https://www.openstreetmap.org/#map=18/${crd.latitude}/${crd.longitude}`);
    };

    const errorCallback = (err) => {
      setError(`ERROR(${err.code}): ${err.message}`);
      setStatus('Unable to retrieve your location');
    };

    navigator.geolocation.getCurrentPosition(success, errorCallback, options);

    const id = navigator.geolocation.watchPosition(success, errorCallback, options);
    setWatchId(id);

    return () => {
      if (id) {
        navigator.geolocation.clearWatch(id);
      }
    };
  }, [target]);

  useEffect(() => {
    if (position && target.latitude === position.latitude && target.longitude === position.longitude) {
      setMessage('Congratulations, you reached the target!');
      if (watchId) {
        navigator.geolocation.clearWatch(watchId);
      }
    }
  }, [position, target, watchId]);

  const handleSetTarget = () => {
    setTarget({ latitude: 37.7749, longitude: -122.4194 }); // Example coordinates (San Francisco)
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-r from-purple-400 to-blue-500 text-white p-8">
      <h1 className="text-4xl font-bold mb-6">Geolocation Tracker</h1>
      
      <div className="bg-white text-black p-6 rounded-lg shadow-lg w-full max-w-md">
        {error && <p className="text-red-500">{error}</p>}
        {position ? (
          <div>
            <p>Your current position:</p>
            <p>Latitude: {position.latitude}</p>
            <p>Longitude: {position.longitude}</p>
            <p>Accuracy: {position.accuracy} meters</p>
            {mapLink && (
              <p className="mt-2">
                <a
                  href={mapLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-600 underline"
                >
                  View Location
                </a>
              </p>
            )}
          </div>
        ) : (
          <p className="mt-4">Fetching location...</p>
        )}
        
        <button
          onClick={handleSetTarget}
          className="mt-4 px-6 py-2 bg-green-500 text-white rounded hover:bg-yellow-600 transition"
        >
          Set Target Location
        </button>
        {message && <p className="mt-4 text-lg text-yellow-400">{message}</p>}
      </div>
    </div>
  );
};

export default AllInOne;
