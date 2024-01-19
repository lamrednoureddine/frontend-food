import React, { useState, useEffect } from 'react';

const UserLocation = () => {
  const [location, setLocation] = useState({
    loaded: false,
    coordinates: { lat: "", lng: "" },
  });
  
  const onSuccess = location => {
    setLocation({
      loaded: true,
      coordinates: {
        lat: location.coords.latitude,
        lng: location.coords.longitude,
      },
    });
  };

  const onError = error => {
    setLocation({
      loaded: true,
      error,
    });
  };
    
  useEffect(() => {
    if (!("geolocation" in navigator)) {
      onError({
        code: 0,
        message: "Geolocation not supported",
      });
    }

    navigator.geolocation.getCurrentPosition(onSuccess, onError);
  }, []);

  return (
    <div>
      <h2>User Location</h2>
      {location.loaded ? (
        location.error ? (
          <div>Error: The Geolocation service failed. {location.error.message}</div>
        ) : (
          <ul>
            <li>Latitude: {location.coordinates.lat}</li>
            <li>Longitude: {location.coordinates.lng}</li>
          </ul>
        )
      ) : (
        <div>Getting the location data&hellip;</div>
      )}
    </div>
  );
};

export default UserLocation;