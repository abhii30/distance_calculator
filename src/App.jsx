import React, { useState, useRef } from "react";
import {
  useJsApiLoader,
  Marker,
  GoogleMap,
  Autocomplete,
  DirectionsRenderer,
} from "@react-google-maps/api";
import styles from "./App.module.css";
import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";

const center = { lat: 24.7914, lng: 85.0002 };
const libraries = ["places"];

function App() {
  const { isLoaded } = useJsApiLoader({
    googleMapsApiKey: "AIzaSyANDj4mJ2i_d0zRiNozVqbUGMgZTnDOeYI",
    libraries,
  });

  const [map, setMap] = useState(/** @type google.map.Map */ (null));
  const [directionResponse, setDirectionResponse] = useState(null);
  const [distance, setDistance] = useState("");
  const [duration, setDuration] = useState("");

  const originRef = useRef();
  const destinationRef = useRef();

  if (!isLoaded) {
    return <h1>Loading...</h1>;
  }

  async function calculateRoute() {
    if (originRef.current.value === "" || destinationRef.current.value === "") {
      return;
    }
    const directionService = new window.google.maps.DirectionsService();
    const result = await directionService.route({
      origin: originRef.current.value,
      destination: destinationRef.current.value,
      travelMode: window.google.maps.TravelMode.DRIVING,
    });
    setDirectionResponse(result);
    setDistance(result.routes[0].legs[0].distance.text);
    setDuration(result.routes[0].legs[0].duration.text);
  }

  function clearRoute() {
    setDistance("");
    setDuration("");
    setDirectionResponse(null);
    originRef.current.value = "";
    destinationRef.current.value = "";
  }

  return (
    <div className={styles.App}>
      <header>Hello</header>
      <div className="row" id="row">
        <div className="col-6" id="col">
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
            onLoad={(map) => setMap(map)}
          >
            <Marker position={center} />
            {directionResponse && (
              <DirectionsRenderer directions={directionResponse} />
            )}
          </GoogleMap>
        </div>
        <div className="col-6">
          <form>
            <div className="form-group col-md-6">
              <label for="">Origin</label>
              <Autocomplete>
                <input
                  type="text"
                  className="form-control form-control-lg"
                  ref={originRef}
                />
              </Autocomplete>
            </div>
            <button
              className="btn btn-primary mb-2 "
              id="calc"
              onClick={calculateRoute}
            >
              Calculate
            </button>
            <div className="form-group mt-5 col-md-6">
              <label for="">Destination</label>
              <Autocomplete>
                <input
                  type="text"
                  className="form-control form-control-lg"
                  ref={destinationRef}
                />
              </Autocomplete>
            </div>
            <button
              className="btn btn-secondary mt-4"
              onClick={() => map.panTo(center)}
            >
              Recenter
            </button>
            <button
              className="btn btn-danger mt-4"
              id="calc"
              onClick={clearRoute}
            >
              Clear
            </button>
          </form>
          <div className={styles.container}>
            <h1>Distance : {distance}</h1>
          </div>
          <div className={styles.container}>
            <h1>Duration : {duration}</h1>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
