const LocationCard = ({
  locationType,
  setLocationType,
  city,
  setCity,
  coords,
  error,
  handleCitySearch,
  handleUseCurrentLocation,
  lat,
  setLat,
  lon,
  setLon,
  searchLoading,
  locationLoading,
}) => {
  return (
    <div
      id="setup"
      className="bg-white border border-gray-200 shadow-sm p-6 rounded-2xl"
    >
      <h3 className="text-xl font-semibold mb-4 text-gray-900">
        Location
      </h3>

      {/* Radio Selection */}
      <div className="flex gap-6 mb-4 text-gray-700">
        <label className="flex items-center gap-2 cursor-pointer">
          <input
            type="radio"
            value="city"
            checked={locationType === "city"}
            onChange={(e) => setLocationType(e.target.value)}
            className="accent-yellow-500"
          />
          City
        </label>

        <label className="flex items-center gap-2 cursor-pointer">
          <input
            type="radio"
            value="coordinates"
            checked={locationType === "coordinates"}
            onChange={(e) => setLocationType(e.target.value)}
            className="accent-yellow-500"
          />
          Coordinates
        </label>
      </div>

      {locationType === "city" ? (
        <>
          {/* Input */}
          <input
            value={city}
            onChange={(e) => setCity(e.target.value)}
            placeholder="Search city..."
            className="w-full bg-gray-50 border border-gray-200 focus:border-yellow-500 focus:ring-1 focus:ring-yellow-500 p-3 rounded-lg mb-3 outline-none transition"
          />

          {/* Buttons */}
          <div className="flex gap-3">
            <button
              onClick={handleUseCurrentLocation}
              disabled={locationLoading}
              className="bg-gray-100 hover:bg-gray-200 px-4 py-2 rounded-lg text-sm font-medium transition"
            >
              {locationLoading ? "Detecting..." : "📍 Use Location"}
            </button>

            <button
              onClick={handleCitySearch}
              disabled={searchLoading}
              className="bg-yellow-500 hover:bg-yellow-600 text-white px-4 py-2 rounded-lg text-sm font-medium transition"
            >
              {searchLoading ? "Searching..." : "Search"}
            </button>
          </div>

          {/* Result */}
          {coords && (
            <p className="mt-3 text-sm text-gray-600">
              {coords.name} ({coords.lat}, {coords.lon})
            </p>
          )}
        </>
      ) : (
        <>
          <input
            value={lat}
            onChange={(e) => setLat(e.target.value)}
            placeholder="Latitude"
            className="w-full bg-gray-50 border border-gray-200 focus:border-yellow-500 focus:ring-1 focus:ring-yellow-500 p-3 rounded-lg mb-2 outline-none transition"
          />

          <input
            value={lon}
            onChange={(e) => setLon(e.target.value)}
            placeholder="Longitude"
            className="w-full bg-gray-50 border border-gray-200 focus:border-yellow-500 focus:ring-1 focus:ring-yellow-500 p-3 rounded-lg outline-none transition"
          />
        </>
      )}
    </div>
  );
};

export default LocationCard;