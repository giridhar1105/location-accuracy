"use client"
import { useEffect, useState } from 'react';

export default function Home() {
  const [target, setTarget] = useState({ latitude: 37.7749, longitude: -122.4194 }); // Example: San Francisco
  const [message, setMessage] = useState('');
  const [watchId, setWatchId] = useState(null);

  useEffect(() => {
    const success = (pos) => {
      const crd = pos.coords;

      if (target.latitude === crd.latitude && target.longitude === crd.longitude) {
        setMessage('Congratulations, you reached the target!');
        if (watchId) {
          navigator.geolocation.clearWatch(watchId);
        }
      }
    };

    const error = (err) => {
      console.error(`ERROR(${err.code}): ${err.message}`);
    };

    const options = {
      enableHighAccuracy: false,
      timeout: 5000,
      maximumAge: 0,
    };

    const id = navigator.geolocation.watchPosition(success, error, options);
    setWatchId(id);

    // Cleanup function to clear the watch on component unmount
    return () => {
      if (id) {
        navigator.geolocation.clearWatch(id);
      }
    };
  }, [target]);

  const handleSetTarget = () => {
    // You can modify this to set a new target if desired
    setTarget({ latitude: 37.7749, longitude: -122.4194 }); // Example coordinates
  };

  return (
    <div>
      <h1>Geolocation Watcher</h1>
      <button onClick={handleSetTarget}>Set Target Location</button>
      <p>{message}</p>
    </div>
  );
}
