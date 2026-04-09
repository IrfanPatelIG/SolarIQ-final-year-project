import React, { useState, useEffect } from "react";
import LocationCard from "./LocationCard";
import PanelCard from "./PanelCard";
import DateCard from "./DateCard";

const SetupSection = () => {
  const [locationType, setLocationType] = useState("city");
  const [city, setCity] = useState("");
  const [coords, setCoords] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const [panelArea, setPanelArea] = useState("");
  const [tilt, setTilt] = useState("");
  const [orientation, setOrientation] = useState("");

  const [lat, setLat] = useState("");
  const [lon, setLon] = useState("");

  const API_KEY = "9da522f9ac3a0a2b291ca43e482549bd";

  // 🔥 EXISTING: City Search (UNCHANGED)
  const handleCitySearch = async () => {
    if (!city) {
      setError("Please enter a city name.");
      return;
    }

    setLoading(true);
    setError("");
    setCoords(null);

    try {
      const response = await fetch(
        `https://api.openweathermap.org/geo/1.0/direct?q=${city}&limit=1&appid=${API_KEY}`,
      );
      const data = await response.json();

      if (!Array.isArray(data) || data.length === 0) {
        setError("City not found. Try another name.");
      } else {
        console.log("Data: ", data)
        const { lat, lon, name, country } = data[0];
        setCoords({ lat, lon, name, country });
      }
    } catch (err) {
      setError("Failed to fetch location data. Please try again.");
    }

    setLoading(false);
  };

  // 🔥 NEW: CURRENT LOCATION FUNCTION
  const handleUseCurrentLocation = async () => {
    if (!navigator.geolocation) {
      setError("Geolocation not supported.");
      return;
    }

    setLoading(true);
    setError("");

    navigator.geolocation.getCurrentPosition(
      (position) => {
        const latitude = position.coords.latitude;
        const longitude = position.coords.longitude;

        fetch(`http://api.openweathermap.org/geo/1.0/reverse?lat=${latitude}&lon=${longitude}&limit=1&appid=${API_KEY}`)
          .then(response => {
            if (!response.ok) {
              throw new Error(`HTTP error! status: ${response.status}`);
            }
            return response.json();
          })
          .then(data => {
            if (Array.isArray(data) && data.length > 0) {
              console.log("DATA: ", data)
              const {name, country} = data[0];
              setCity(name);
              setCoords({
                lat: latitude,
                lon: longitude,
                name: name,
                country: country
              });
            }
          })
          .catch(error => {
            console.error('Error fetching location name:', error);
          });
        
        setCoords({
          lat: latitude,
          lon: longitude,
          name: "Current Location",
          country: "",
        });

        // optional: fill manual inputs
        setLat(latitude);
        setLon(longitude);

        setLocationType("city"); // important
        setLoading(false);
      },
      (err) => {
        setError("Location permission denied or failed.");
        setLoading(false);
      },
      {
        enableHighAccuracy: true,
        timeout: 5000,
        maximumAge: 0,
      },
    );
  };

  const todayISO = (() => {
    const d = new Date();
    const tzOffset = d.getTimezoneOffset() * 60000;
    return new Date(d - tzOffset).toISOString().slice(0, 10);
  })();

  const [startDate, setStartDate] = useState(todayISO);
  const [endDate, setEndDate] = useState(() => {
    const d = new Date(todayISO);
    d.setDate(d.getDate() + 6);
    return d.toISOString().slice(0, 10);
  });

  useEffect(() => {
    if (!startDate) return;
    const d = new Date(startDate);
    d.setDate(d.getDate() + 6);
    const tzOffset = d.getTimezoneOffset() * 60000;
    setEndDate(new Date(d - tzOffset).toISOString().slice(0, 10));
  }, [startDate]);

  const minStartDate = todayISO;

  const handleSubmit = async () => {
    let finalCoords;

    if (locationType === "city") {
      if (!coords) return setError("Please search a city first.");
      finalCoords = { lat: coords.lat, lon: coords.lon };
    } else {
      if (!lat || !lon) return setError("Enter coordinates.");
      finalCoords = { lat, lon };
    }

    const payload = {
      location: finalCoords,
      panel: {
        area: panelArea,
        tilt,
        orientation,
      },
      dates: {
        startDate,
        endDate,
      },
    };

    const res = await fetch("http://localhost:5000/api/solar/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    });

    const data = await res.json();
    console.log(data);
  };

  return (
    <section className=" w-full min-h-screen bg-gray-900 text-white flex flex-col items-center py-16 px-4">
      <div className="text-center mb-12">
        <h2 className="text-3xl font-bold mb-2">Setup Your Solar Forecast</h2>
        <p className="text-gray-300 max-w-xl mx-auto">
          Enter your details below to generate an accurate solar energy
          prediction for your chosen location.
        </p>
      </div>

      <div className="flex flex-col gap-8 w-full max-w-3xl">
        <LocationCard
          locationType={locationType}
          setLocationType={setLocationType}
          city={city}
          setCity={setCity}
          coords={coords}
          loading={loading}
          error={error}
          handleCitySearch={handleCitySearch}
          handleUseCurrentLocation={handleUseCurrentLocation} // ✅ ADDED
          lat={lat}
          setLat={setLat}
          lon={lon}
          setLon={setLon}
        />

        <PanelCard
          panelArea={panelArea}
          setPanelArea={setPanelArea}
          tilt={tilt}
          setTilt={setTilt}
          orientation={orientation}
          setOrientation={setOrientation}
        />

        <DateCard
          startDate={startDate}
          setStartDate={setStartDate}
          endDate={endDate}
          minStartDate={minStartDate}
        />
      </div>

      <button
        onClick={handleSubmit}
        className="mt-10 px-8 py-3 bg-cyan-600 hover:bg-cyan-700 rounded-full font-semibold transition"
      >
        Submit
      </button>
    </section>
  );
};

export default SetupSection;