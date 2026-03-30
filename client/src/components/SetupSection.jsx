import React, { useState, useEffect } from "react";

const SetupSection = () => {
  const [locationType, setLocationType] = useState("city");
  const [city, setCity] = useState("");
  const [coords, setCoords] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const API_KEY = "9da522f9ac3a0a2b291ca43e482549bd"; // your key

  // --- City search (OpenWeatherMap Geocoding API) ---
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
        `https://api.openweathermap.org/geo/1.0/direct?q=${encodeURIComponent(
          city
        )}&limit=1&appid=${API_KEY}`
      );
      const data = await response.json();

      if (!Array.isArray(data) || data.length === 0) {
        setError("City not found. Try another name.");
      } else {
        const { lat, lon, name, country } = data[0];
        setCoords({ lat, lon, name, country });
      }
    } catch (err) {
      setError("Failed to fetch location data. Please try again.");
    }

    setLoading(false);
  };

  // --- Analysis period: fixed to one week ---
  // defaultStart = today
  const todayISO = (() => {
    const d = new Date();
    const tzOffset = d.getTimezoneOffset() * 60000;
    const localISO = new Date(d - tzOffset).toISOString().slice(0, 10);
    return localISO;
  })();

  const [startDate, setStartDate] = useState(todayISO);
  const [endDate, setEndDate] = useState(() => {
    const d = new Date(todayISO);
    d.setDate(d.getDate() + 6); // +6 days => 7-day window
    return d.toISOString().slice(0, 10);
  });

  // update endDate whenever startDate changes
  useEffect(() => {
    if (!startDate) {
      setEndDate("");
      return;
    }
    const d = new Date(startDate);
    d.setDate(d.getDate() + 6);
    const tzOffset = d.getTimezoneOffset() * 60000;
    const localISO = new Date(d - tzOffset).toISOString().slice(0, 10);
    setEndDate(localISO);
  }, [startDate]);

  // optional: prevent startDate being in the past (example)
  const minStartDate = todayISO;

  return (
    <section className="w-full min-h-screen bg-gray-900 text-white flex flex-col items-center py-16 px-4">
      {/* Title & Description */}
      <div className="text-center mb-12">
        <h2 className="text-3xl font-bold mb-2">Setup Your Solar Forecast</h2>
        <p className="text-gray-300 max-w-xl mx-auto">
          Enter your details below to generate an accurate solar energy
          prediction for your chosen location.
        </p>
      </div>

      {/* Cards Container */}
      <div className="flex flex-col gap-8 w-full max-w-3xl">
        {/* LOCATION CARD */}
        <div className="bg-gray-800 p-6 rounded-2xl shadow-lg">
          <h3 className="text-xl font-semibold mb-4">Location</h3>

          {/* Radio buttons */}
          <div className="flex items-center gap-4 mb-4">
            <label className="flex items-center gap-2">
              <input
                type="radio"
                name="locationType"
                value="city"
                checked={locationType === "city"}
                onChange={(e) => setLocationType(e.target.value)}
                className="accent-cyan-500"
              />
              City
            </label>
            <label className="flex items-center gap-2">
              <input
                type="radio"
                name="locationType"
                value="coordinates"
                checked={locationType === "coordinates"}
                onChange={(e) => setLocationType(e.target.value)}
                className="accent-cyan-500"
              />
              Coordinates
            </label>
          </div>

          {/* City Search or Coordinates Input */}
          {locationType === "city" ? (
            <div className="flex flex-col gap-3">
              <div className="flex gap-2">
                <input
                  type="text"
                  placeholder="Search City..."
                  value={city}
                  onChange={(e) => setCity(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === "Enter") handleCitySearch();
                  }}
                  className="flex-1 bg-gray-700 rounded-lg p-2 text-white focus:outline-none focus:ring-2 focus:ring-cyan-500"
                />
                <button
                  onClick={handleCitySearch}
                  className="px-4 bg-cyan-500 hover:bg-cyan-600 rounded-lg font-semibold"
                >
                  Search
                </button>
              </div>

              {/* Loading / Error / Result */}
              {loading && (
                <p className="text-sm text-gray-400 mt-2">Fetching data...</p>
              )}
              {error && <p className="text-sm text-red-400 mt-2">{error}</p>}
              {coords && (
                <div className="mt-3 text-sm text-gray-300">
                  <p>
                    <span className="font-semibold">{coords.name}</span>,{" "}
                    {coords.country}
                  </p>
                  <p>
                    Lat: <span className="text-cyan-400">{coords.lat}</span> |
                    Lon: <span className="text-cyan-400">{coords.lon}</span>
                  </p>
                </div>
              )}
            </div>
          ) : (
            <div className="flex flex-col gap-3">
              <input
                type="text"
                placeholder="Latitude"
                className="w-full bg-gray-700 rounded-lg p-2 text-white focus:outline-none focus:ring-2 focus:ring-cyan-500"
              />
              <input
                type="text"
                placeholder="Longitude"
                className="w-full bg-gray-700 rounded-lg p-2 text-white focus:outline-none focus:ring-2 focus:ring-cyan-500"
              />
            </div>
          )}
        </div>

        {/* PANEL CONFIGURATION CARD */}
        <div className="bg-gray-800 p-6 rounded-2xl shadow-lg">
          <h3 className="text-xl font-semibold mb-4">Panel Configuration</h3>

          <div className="flex flex-col gap-4">
            <div>
              <label className="block text-sm mb-1 text-gray-300">
                Panel Area (m²)
              </label>
              <input
                type="number"
                placeholder="e.g., 25"
                className="w-full bg-gray-700 rounded-lg p-2 text-white focus:outline-none focus:ring-2 focus:ring-cyan-500"
              />
            </div>

            <div>
              <label className="block text-sm mb-1 text-gray-300">
                Tilt Angle (°)
              </label>
              <input
                type="number"
                placeholder="e.g., 30"
                className="w-full bg-gray-700 rounded-lg p-2 text-white focus:outline-none focus:ring-2 focus:ring-cyan-500"
              />
            </div>
          </div>
        </div>

        {/* ANALYSIS PERIOD CARD (fixed to one week) */}
        <div className="bg-gray-800 p-6 rounded-2xl shadow-lg">
          <h3 className="text-xl font-semibold mb-4">
            Analysis Period (7 days)
          </h3>

          <div className="flex flex-col gap-4">
            <div>
              <label className="block text-sm mb-1 text-gray-300">
                Start Date
              </label>
              <input
                type="date"
                value={startDate}
                min={minStartDate}
                onChange={(e) => setStartDate(e.target.value)}
                className="w-full bg-gray-700 rounded-lg p-2 text-white focus:outline-none focus:ring-2 focus:ring-cyan-500"
              />
            </div>

            <div>
              <label className="block text-sm mb-1 text-gray-300">
                End Date (auto)
              </label>
              <input
                type="date"
                value={endDate}
                readOnly
                className="w-full bg-gray-700 rounded-lg p-2 text-gray-300 cursor-not-allowed"
              />
              <p className="text-xs text-gray-400 mt-1">
                The analysis window is fixed to 7 days (start date + 6 days).
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Continue Button */}
      <button className="mt-10 px-8 py-3 bg-cyan-500 hover:bg-cyan-600 rounded-full font-semibold transition">
        Continue
      </button>
    </section>
  );
};

export default SetupSection;
