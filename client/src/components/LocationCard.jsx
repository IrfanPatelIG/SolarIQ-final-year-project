import { MapPin, Navigation, Search } from 'lucide-react';

const LocationCard = ({
  locationType,
  setLocationType,
  city,
  setCity,
  coords,
  loading,
  error,
  handleCitySearch,
  handleUseCurrentLocation,
  lat,
  setLat,
  lon,
  setLon,
}) => {
  return (
    <div id="locationCard" className="bg-white dark:bg-slate-900 p-6 rounded-xl shadow-sm border border-slate-200 dark:border-slate-800">
      <div className="flex items-center gap-3 mb-6">
        <div className="w-10 h-10 rounded-lg bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center">
          <MapPin className="text-blue-600 dark:text-blue-400" size={20} />
        </div>
        <h3 className="text-lg font-semibold text-slate-900 dark:text-slate-100">Location</h3>
      </div>

      <div className="flex items-center gap-4 mb-6">
        <label className="flex items-center gap-2 cursor-pointer">
          <input
            type="radio"
            name="locationType"
            value="city"
            checked={locationType === "city"}
            onChange={(e) => setLocationType(e.target.value)}
            className="accent-blue-600 dark:accent-blue-400"
          />
          <span className="text-sm text-slate-700 dark:text-slate-300">City</span>
        </label>
        <label className="flex items-center gap-2 cursor-pointer">
          <input
            type="radio"
            name="locationType"
            value="coordinates"
            checked={locationType === "coordinates"}
            onChange={(e) => setLocationType(e.target.value)}
            className="accent-blue-600 dark:accent-blue-400"
          />
          <span className="text-sm text-slate-700 dark:text-slate-300">Coordinates</span>
        </label>
      </div>

      {locationType === "city" ? (
        <div className="flex flex-col gap-4">
          <div className="flex gap-2">
            <input
              type="text"
              placeholder="Search City..."
              value={city}
              onChange={(e) => setCity(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter") handleCitySearch();
              }}
              className="flex-1 bg-slate-100 dark:bg-slate-800 border border-slate-300 dark:border-slate-600 rounded-lg px-4 py-2.5 text-slate-900 dark:text-slate-100 focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400"
            />
            <button
              onClick={handleCitySearch}
              className="px-4 py-2.5 bg-blue-600 hover:bg-blue-700 dark:bg-blue-600 dark:hover:bg-blue-500 rounded-lg font-medium text-white transition-colors flex items-center gap-2"
            >
              <Search size={18} />
              Search
            </button>
          </div>

          <button
            onClick={handleUseCurrentLocation}
            className="flex items-center justify-center gap-2 px-4 py-2.5 bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 rounded-lg font-medium text-slate-700 dark:text-slate-300 transition-colors"
          >
            <Navigation size={18} />
            Use My Current Location
          </button>

          {loading && (
            <p className="text-sm text-slate-500 dark:text-slate-400">Fetching data...</p>
          )}

          {error && <p className="text-sm text-red-600 dark:text-red-400">{error}</p>}

          {coords && (
            <div className="mt-4 p-4 bg-slate-50 dark:bg-slate-800 rounded-lg">
              <p className="text-sm text-slate-900 dark:text-slate-100">
                <span className="font-semibold">{coords.name}</span>{" "}
                {coords.country && `, ${coords.country}`}
              </p>
              <p className="text-sm text-slate-600 dark:text-slate-400 mt-1">
                Lat: <span className="text-blue-600 dark:text-blue-400 font-medium">{coords.lat}</span> | Lon:{" "}
                <span className="text-blue-600 dark:text-blue-400 font-medium">{coords.lon}</span>
              </p>
            </div>
          )}
        </div>
      ) : (
        <div className="flex flex-col gap-4">
          <div>
            <label className="block text-sm mb-2 text-slate-700 dark:text-slate-300">Latitude</label>
            <input
              type="text"
              placeholder="e.g., 37.7749"
              value={lat}
              onChange={(e) => setLat(e.target.value)}
              className="w-full bg-slate-100 dark:bg-slate-800 border border-slate-300 dark:border-slate-600 rounded-lg px-4 py-2.5 text-slate-900 dark:text-slate-100 focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400"
            />
          </div>
          <div>
            <label className="block text-sm mb-2 text-slate-700 dark:text-slate-300">Longitude</label>
            <input
              type="text"
              placeholder="e.g., -122.4194"
              value={lon}
              onChange={(e) => setLon(e.target.value)}
              className="w-full bg-slate-100 dark:bg-slate-800 border border-slate-300 dark:border-slate-600 rounded-lg px-4 py-2.5 text-slate-900 dark:text-slate-100 focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400"
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default LocationCard;