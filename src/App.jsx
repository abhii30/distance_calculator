import React, { useState } from "react";
import {
  useJsApiLoader,
  Marker,
  GoogleMap,
  Autocomplete,
} from "@react-google-maps/api";
import styles from "./App.module.css";
import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";

const center = { lat: 24.7914, lng: 85.0002 };

function App() {
  const { isLoaded } = useJsApiLoader({
    googleMapsApiKey: "AIzaSyANDj4mJ2i_d0zRiNozVqbUGMgZTnDOeYI",
    libraries: ["places"],
  });

  const [map, setMap] = useState(/** @type google.map.Map */ (null));

  if (!isLoaded) {
    return <h1>Loading...</h1>;
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
          </GoogleMap>
        </div>
        <div className="col-6">
          <form>
            <div className="form-group col-md-6">
              <label for="">Origin</label>
              <Autocomplete>
                <input type="text" className="form-control form-control-lg" />
              </Autocomplete>
            </div>
            <button className="btn btn-primary mb-2 " id="calc">
              Calculate
            </button>
            <div className="form-group mt-5 col-md-6">
              <label for="">Destination</label>
              <Autocomplete>
                <input type="text" className="form-control form-control-lg" />
              </Autocomplete>
            </div>
            <button
              className="btn btn-secondary mt-4"
              onClick={() => map.panTo(center)}
            >
              Recenter
            </button>
          </form>
          <div className={styles.container}>
            <h1>Distance</h1>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
