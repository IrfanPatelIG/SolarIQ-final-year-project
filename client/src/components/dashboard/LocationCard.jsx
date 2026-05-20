import { MapPin, Navigation } from 'lucide-react';

const LocationCard = ({
  locationType,
  setLocationType,
  city,
  setCity,
  coords,
  loading,
  handleCitySearch,
  handleUseCurrentLocation,
  lat,
  setLat,
  lon,
  setLon,
}) => {
  const locationLabel = coords
    ? [coords.name, coords.state, coords.country].filter(Boolean).join(', ')
    : '';

  return (
    <div className="bg-white dark:bg-slate-900 p-6 rounded-xl shadow-sm border border-slate-200 dark:border-slate-800">
      <div className="flex items-center gap-3 mb-6">
        <div className="w-10 h-10 rounded-lg bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center">
          <MapPin className="text-blue-600 dark:text-blue-400" size={20} />
        </div>
        <h3 className="text-lg font-semibold text-slate-900 dark:text-slate-100">Location</h3>
      </div>

      <div className="flex flex-col sm:flex-row sm:items-center gap-4 mb-6">
        <label className="flex items-center gap-2 cursor-pointer text-sm font-medium text-slate-700 dark:text-slate-300">
          <input
            type="radio"
            name="locationType"
            value="city"
            checked={locationType === 'city'}
            onChange={() => setLocationType('city')}
          />
          <span>Search by City</span>
        </label>
        <label className="flex items-center gap-2 cursor-pointer text-sm font-medium text-slate-700 dark:text-slate-300">
          <input
            type="radio"
            name="locationType"
            value="manual"
            checked={locationType === 'manual'}
            onChange={() => setLocationType('manual')}
          />
          <span>Enter Coordinates</span>
        </label>
      </div>

      {locationType === 'city' ? (
        <div className="space-y-4">
          <div>
            <label htmlFor="city" className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
              City
            </label>
            <div className="flex flex-col sm:flex-row gap-2">
              <input
                id="city"
                type="text"
                placeholder="Enter city name (e.g., New York)"
                value={city}
                onChange={(e) => setCity(e.target.value)}
                className="flex-1 px-4 py-2 border border-slate-300 dark:border-slate-600 rounded-lg bg-white dark:bg-slate-800 text-slate-900 dark:text-slate-100"
              />
              <button
                onClick={handleCitySearch}
                disabled={loading}
                className="px-6 py-2 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 disabled:opacity-50"
              >
                {loading ? 'Searching...' : 'Search'}
              </button>
            </div>
          </div>

          <button
            onClick={handleUseCurrentLocation}
            disabled={loading}
            className="w-full px-4 py-2 bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 font-semibold rounded-lg hover:bg-slate-200 dark:hover:bg-slate-700 flex items-center justify-center gap-2 disabled:opacity-50"
          >
            <Navigation size={16} />
            {loading ? 'Fetching location...' : 'Use My Current Location'}
          </button>

          {coords && (
            <div className="p-4 bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-lg">
              <p className="text-sm font-semibold text-green-700 dark:text-green-300">
                {locationLabel || 'Selected location'}
              </p>
              <p className="text-xs text-green-600 dark:text-green-400">
                Lat: {Number(coords.lat).toFixed(4)}°, Lon: {Number(coords.lon).toFixed(4)}°
              </p>
            </div>
          )}
        </div>
      ) : (
        <div className="space-y-4">
          <div>
            <label htmlFor="latitude" className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
              Latitude
            </label>
            <input
              id="latitude"
              type="number"
              step="0.0001"
              placeholder="-90 to 90"
              value={lat}
              onChange={(e) => setLat(e.target.value)}
              className="w-full px-4 py-2 border border-slate-300 dark:border-slate-600 rounded-lg bg-white dark:bg-slate-800 text-slate-900 dark:text-slate-100"
            />
          </div>
          <div>
            <label htmlFor="longitude" className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
              Longitude
            </label>
            <input
              id="longitude"
              type="number"
              step="0.0001"
              placeholder="-180 to 180"
              value={lon}
              onChange={(e) => setLon(e.target.value)}
              className="w-full px-4 py-2 border border-slate-300 dark:border-slate-600 rounded-lg bg-white dark:bg-slate-800 text-slate-900 dark:text-slate-100"
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default LocationCard;
