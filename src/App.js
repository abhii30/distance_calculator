import React from "react";
import { useJsApiLoader, Marker, GoogleMap } from "@react-google-maps/api";
import "./App.css";

const center = { lat: 24.7914, lng: 85.0002 };

function App() {
  const { isLoaded } = useJsApiLoader({
    googleMapsApiKey: "AIzaSyANDj4mJ2i_d0zRiNozVqbUGMgZTnDOeYI",
  });
  if (!isLoaded) {
    return <h1>Loading...</h1>;
  }
  return (
    <div className="App">
      <GoogleMap
        center={center}
        zoom={8}
        mapContainerStyle={{ height: "500px", width: "100%" }}
        options={{
          zoomControl: false,
          streetViewControl: false,
          mapTypeControl: false,
          fullscreenControl: false,
        }}
      >
        <Marker position={center} />
      </GoogleMap>
    </div>
  );
}

export default App;
