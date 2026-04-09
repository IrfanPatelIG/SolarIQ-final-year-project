const LocationCard = ({
  locationType,
  setLocationType,
  city,
  setCity,
  coords,
  loading,
  error,
  handleCitySearch,
  handleUseCurrentLocation, // ✅ NEW PROP
  lat,
  setLat,
  lon,
  setLon,
}) => {
  return (
    <div id="locationCard" className="bg-gray-800 p-6 rounded-2xl shadow-lg">
      <h3 className="text-xl font-semibold mb-4">Location</h3>

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

      {locationType === "city" ? (
        <div className="flex flex-col gap-3">
          <div className="w-full h-full flex gap-2 flex-col items-center ">
            <input
              type="text"
              placeholder="Search City..."
              value={city}
              onChange={(e) => setCity(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter") handleCitySearch();
              }}
              className="w-full flex-1 bg-gray-700 rounded-lg p-2 text-white focus:outline-none focus:ring-2 focus:ring-cyan-500"
            />

            <div className="location-search-and-get w-full h-full flex gap-2 items-center justify-between">
              {/* 🔥 NEW BUTTON */}
              <button
                onClick={handleUseCurrentLocation}
                className="px-4 py-2 bg-cyan-700 hover:bg-cyan-800 rounded-lg font-semibold">
                📍 Use My Current Location
              </button>
              <button
                onClick={handleCitySearch}
                className="h-full px-4 py-2 bg-cyan-600 hover:bg-cyan-700 rounded-lg font-semibold">
                Search
              </button>
            </div>
          </div>

          {loading && (
            <p className="text-sm text-gray-400 mt-2">Fetching data...</p>
          )}

          {error && <p className="text-sm text-red-400 mt-2">{error}</p>}

          {coords && (
            <div className="mt-3 text-sm text-gray-300">
              <p>
                <span className="font-semibold">{coords.name}</span>{" "}
                {coords.country && `, ${coords.country}`}
              </p>
              <p>
                Lat: <span className="text-cyan-400">{coords.lat}</span> | Lon:{" "}
                <span className="text-cyan-400">{coords.lon}</span>
              </p>
            </div>
          )}
        </div>
      ) : (
        <div className="flex flex-col gap-3">
          <input
            type="text"
            placeholder="Latitude"
            value={lat}
            onChange={(e) => setLat(e.target.value)}
            className="w-full bg-gray-700 rounded-lg p-2 text-white focus:outline-none focus:ring-2 focus:ring-cyan-600"
          />
          <input
            type="text"
            placeholder="Longitude"
            value={lon}
            onChange={(e) => setLon(e.target.value)}
            className="w-full bg-gray-700 rounded-lg p-2 text-white focus:outline-none focus:ring-2 focus:ring-cyan-600"
          />
        </div>
      )}
    </div>
  );
};

export default LocationCard;