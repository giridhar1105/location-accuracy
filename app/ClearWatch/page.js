"use client"
import { useState } from 'react';

export default function Home() {
  const [status, setStatus] = useState('');
  const [mapLink, setMapLink] = useState('');

  const geoFindMe = () => {
    setStatus('Locating…');
    setMapLink('');

    if (!navigator.geolocation) {
      setStatus('Geolocation is not supported by your browser');
      return;
    }

    navigator.geolocation.getCurrentPosition(
      (position) => {
        const latitude = position.coords.latitude;
        const longitude = position.coords.longitude;
        
        setStatus('');
        setMapLink(`https://www.openstreetmap.org/#map=18/${latitude}/${longitude}`);
      },
      () => {
        setStatus('Unable to retrieve your location');
      }
    );
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-black-100">
      <h1 className="text-4xl font-bold mb-4 text-red-500">Find My Location</h1>
      <button
        onClick={geoFindMe}
        className="px-6 py-2 text-white bg-green-500 rounded hover:bg-yellow-600 transition"
      >
        Find Me
      </button>
      <p className="mt-4 text-lg text-blue-700">{status}</p>
      {mapLink && (
        <p className="mt-2">
          <a
            href={mapLink}
            target="_blank"
            rel="noopener noreferrer"
            className="text-orange-500 underline"
          >
            View Location
          </a>
        </p>
      )}
    </div>
  );
}
