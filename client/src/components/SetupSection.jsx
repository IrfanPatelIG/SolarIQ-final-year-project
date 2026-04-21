import React, { useState, useEffect } from "react";
import LocationCard from "./LocationCard";
import PanelCard from "./PanelCard";
import DateCard from "./DateCard";

const SetupSection = () => {
  const [locationType, setLocationType] = useState("city");
  const [city, setCity] = useState("");
  const [coords, setCoords] = useState(null);

  const [panelArea, setPanelArea] = useState("");
  const [tilt, setTilt] = useState("");
  const [orientation, setOrientation] = useState("");

  const [lat, setLat] = useState("");
  const [lon, setLon] = useState("");

  const [error, setError] = useState("");

  const [searchLoading, setSearchLoading] = useState(false);
  const [locationLoading, setLocationLoading] = useState(false);
  const [submitLoading, setSubmitLoading] = useState(false);

  const API_KEY = "9da522f9ac3a0a2b291ca43e482549bd";

  // 🔍 CITY SEARCH
  const handleCitySearch = async () => {
    if (!city) return setError("Enter city name");

    setSearchLoading(true);
    setError("");

    try {
      const res = await fetch(
        `https://api.openweathermap.org/geo/1.0/direct?q=${city}&limit=1&appid=${API_KEY}`
      );
      const data = await res.json();

      if (!data.length) {
        setError("City not found");
      } else {
        const { lat, lon, name, country } = data[0];
        setCoords({ lat, lon, name, country });
      }
    } catch {
      setError("Error fetching city");
    }

    setSearchLoading(false);
  };

  // 📍 CURRENT LOCATION
  const handleUseCurrentLocation = () => {
    if (!navigator.geolocation) {
      return setError("Geolocation not supported");
    }

    setLocationLoading(true);
    setError("");

    navigator.geolocation.getCurrentPosition(
      async (pos) => {
        const { latitude, longitude } = pos.coords;

        try {
          const res = await fetch(
            `https://api.openweathermap.org/geo/1.0/reverse?lat=${latitude}&lon=${longitude}&limit=1&appid=${API_KEY}`
          );
          const data = await res.json();

          if (data.length > 0) {
            const { name, country } = data[0];

            setCoords({
              lat: latitude,
              lon: longitude,
              name,
              country,
            });

            setCity(name);
          }
        } catch {
          setCoords({
            lat: latitude,
            lon: longitude,
            name: "Current Location",
          });
        }

        setLat(latitude);
        setLon(longitude);
        setLocationType("city");

        setLocationLoading(false);
      },
      () => {
        setError("Location permission denied");
        setLocationLoading(false);
      }
    );
  };

  // 📅 DATE LOGIC
  const todayISO = new Date().toISOString().split("T")[0];

  const [startDate, setStartDate] = useState(todayISO);
  const [endDate, setEndDate] = useState(todayISO);

  useEffect(() => {
    const d = new Date(startDate);
    d.setDate(d.getDate() + 6);
    setEndDate(d.toISOString().split("T")[0]);
  }, [startDate]);

  // 🚀 SUBMIT (FIXED)
  const handleSubmit = async () => {
    if (!coords && (!lat || !lon)) {
      return setError("Select a location first");
    }

    if (!panelArea || !tilt || !orientation) {
      return setError("Complete panel configuration");
    }

    setSubmitLoading(true);
    setError("");

    const payload = {
      location: coords || { lat, lon },
      panel: {
        area: Number(panelArea),
        tilt: Number(tilt),
        orientation,
      },
      dates: { startDate, endDate },
    };

    console.log("Payload:", payload);

    try {
      const res = await fetch("http://localhost:5000/api/solar", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });

      const data = await res.json();

      if (!res.ok || !data?.db?.panel?.panel_id) {
        throw new Error(data.message || "Invalid backend response");
      }

      const panelId = data.db.panel.panel_id;

      localStorage.setItem("panelId", panelId);
      localStorage.setItem("solarResponse", JSON.stringify(data));
      localStorage.setItem("dates", JSON.stringify({ startDate, endDate }));

      window.location.href = "/dashboard";

    } catch (err) {
      console.error(err);
      setError("Backend connection failed");
    }

    setSubmitLoading(false);
  };

  return (
    <section className="w-full min-h-screen bg-gray-50 text-gray-900 flex flex-col items-center py-16 px-4">

      {/* HEADER */}
      <div className="text-center mb-12">
        <h2 className="text-4xl font-bold">
          Setup Your Solar Forecast ⚡
        </h2>
        <p className="text-gray-600 mt-3 max-w-xl">
          Configure your system and generate accurate solar insights.
        </p>
      </div>

      {/* CARDS */}
      <div className="flex flex-col gap-8 w-full max-w-3xl">

        <LocationCard
          locationType={locationType}
          setLocationType={setLocationType}
          city={city}
          setCity={setCity}
          coords={coords}
          error={error}
          handleCitySearch={handleCitySearch}
          handleUseCurrentLocation={handleUseCurrentLocation}
          lat={lat}
          setLat={setLat}
          lon={lon}
          setLon={setLon}
          searchLoading={searchLoading}
          locationLoading={locationLoading}
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
          minStartDate={todayISO}
        />

      </div>

      {/* SMART PREVIEW */}
     <div className="mt-8 bg-white border border-gray-200 shadow-sm p-5 rounded-xl text-center w-full max-w-md">
        <p className="text-sm text-gray-500">Estimated Output</p>
        <h2 className="text-2xl font-bold text-[#FFC107]">
          {panelArea ? (panelArea * 0.2).toFixed(2) : "0"} kWh/day ⚡
        </h2>
      </div>

      {/* CTA */}
      <button
        onClick={handleSubmit}
        disabled={submitLoading}
        className="mt-10 px-10 py-3 bg-[#FFC107] text-black rounded-full font-semibold text-lg"
      >
        {submitLoading ? "Analyzing..." : "Generate Insights →"}
      </button>

      {error && <p className="text-red-400 mt-4">{error}</p>}
    </section>
  );
};

export default SetupSection;