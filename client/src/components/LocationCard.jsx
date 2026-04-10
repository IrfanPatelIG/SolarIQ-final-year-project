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
    <div className="bg-white/5 backdrop-blur-lg border border-white/10 p-6 rounded-2xl">

      <h3 className="text-xl font-semibold mb-4">Location</h3>

      <div className="flex gap-4 mb-4">
        <label>
          <input
            type="radio"
            value="city"
            checked={locationType === "city"}
            onChange={(e) => setLocationType(e.target.value)}
            className="accent-[#FFC107] gap-2"
          />
          City
        </label>

        <label>
          <input
            type="radio"
            value="coordinates"
            checked={locationType === "coordinates"}
            onChange={(e) => setLocationType(e.target.value)}
            className="accent-[#FFC107]"
          />
          Coordinates
        </label>
      </div>

      {locationType === "city" ? (
        <>
          <input
            value={city}
            onChange={(e) => setCity(e.target.value)}
            placeholder="Search city..."
            className="w-full bg-white/10 p-3 rounded-lg mb-3"
          />

          <div className="flex gap-3">
            <button
              onClick={handleUseCurrentLocation}
              disabled={locationLoading}
              className="bg-white/10 px-4 py-2 rounded-lg"
            >
              {locationLoading ? "Detecting..." : "📍 Use Location"}
            </button>

            <button
              onClick={handleCitySearch}
              disabled={searchLoading}
              className="bg-[#FFC107] text-black px-4 py-2 rounded-lg"
            >
              {searchLoading ? "Searching..." : "Search"}
            </button>
          </div>

          {coords && (
            <p className="mt-3 text-sm text-gray-300">
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
            className="w-full bg-white/10 p-3 rounded-lg mb-2"
          />
          <input
            value={lon}
            onChange={(e) => setLon(e.target.value)}
            placeholder="Longitude"
            className="w-full bg-white/10 p-3 rounded-lg"
          />
        </>
      )}
    </div>
  );
};

export default LocationCard;