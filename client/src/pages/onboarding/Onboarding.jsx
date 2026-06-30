import React, { useState } from "react";
import { useNavigate } from 'react-router-dom';
import { MapPin, ArrowRight } from "lucide-react";
import LocationCard from "../../components/dashboard/LocationCard.jsx";
import PanelCard from "../../components/dashboard/PanelCard.jsx";
import DateCard from "../../components/dashboard/DateCard.jsx";
import * as solarAPI from "../../api/solarAPI.js";
import BrandLogo from "../../components/common/BrandLogo.jsx";

const Onboarding = () => {
  const navigate = useNavigate();
  const [currentStep, setCurrentStep] = useState(1);
  const [locationType, setLocationType] = useState("city");
  const [city, setCity] = useState("");
  const [coords, setCoords] = useState(null);
  const [loading, setLoading] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");

  const [panelArea, setPanelArea] = useState("");
  const [tilt, setTilt] = useState("");
  const [orientation, setOrientation] = useState("");

  const [lat, setLat] = useState("");
  const [lon, setLon] = useState("");

  const API_KEY = "9da522f9ac3a0a2b291ca43e482549bd";

  const getPosition = () => (
    new Promise((resolve, reject) => {
      navigator.geolocation.getCurrentPosition(resolve, reject, {
        enableHighAccuracy: true,
        timeout: 20000,
        maximumAge: 60000,
      });
    })
  );

  const getLocationNameFromCoords = async (latitude, longitude) => {
    const response = await fetch(
      `https://api.openweathermap.org/geo/1.0/reverse?lat=${latitude}&lon=${longitude}&limit=1&appid=${API_KEY}`
    );
    const data = await response.json();

    if (!Array.isArray(data) || data.length === 0) {
      return null;
    }

    return data[0];
  };

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
        `https://api.openweathermap.org/geo/1.0/direct?q=${city}&limit=1&appid=${API_KEY}`
      );
      const data = await response.json();

      if (!Array.isArray(data) || data.length === 0) {
        setError("City not found. Try another name.");
      } else {
        const { lat, lon, name, state, country } = data[0];
        setCoords({ lat, lon, name, state, country });
      }
    } catch (err) {
      setError("Failed to fetch location data. Please try again.");
    }

    setLoading(false);
  };

  const handleUseCurrentLocation = async () => {
    if (!navigator.geolocation) {
      setError("Geolocation not supported.");
      return;
    }

    setLoading(true);
    setError("");

    try {
      const position = await getPosition();
      const latitude = position.coords.latitude;
      const longitude = position.coords.longitude;
      let location = null;

      try {
        location = await getLocationNameFromCoords(latitude, longitude);
      } catch {
        location = null;
      }

      setCoords({
        lat: latitude,
        lon: longitude,
        name: location?.name || "Current Location",
        state: location?.state || "",
        country: location?.country || "",
      });
      setCity(location?.name || "");
      setLat(latitude);
      setLon(longitude);
      setLocationType("city");
    } catch (err) {
      const message = err.code === 1
        ? "Location permission was denied. Please allow location access and try again."
        : "Unable to fetch your current location. Please try again or enter your city manually.";
      setError(message);
    } finally {
      setLoading(false);
    }
  };

  const todayISO = (() => {
    const d = new Date();
    const tzOffset = d.getTimezoneOffset() * 60000;
    return new Date(d - tzOffset).toISOString().slice(0, 10);
  })();

  const [startDate, setStartDate] = useState(todayISO);
  const [endDate, setEndDate] = useState(() => {
    const d = new Date(todayISO);
    d.setDate(d.getDate() + 5);
    return d.toISOString().slice(0, 10);
  });

  const handleNext = () => {
    if (currentStep === 1) {
      if (locationType === "city" && !coords) {
        setError("Please search a city first.");
        return;
      }
      if (locationType === "manual" && (!lat || !lon)) {
        setError("Please enter coordinates.");
        return;
      }
      setError("");
      setCurrentStep(2);
    } else if (currentStep === 2) {
      if (!panelArea || !tilt || !orientation) {
        setError("Please fill in all panel details.");
        return;
      }
      setError("");
      setCurrentStep(3);
    }
  };

  const handleBack = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleSubmit = async () => {
    let finalCoords;

    if (locationType === "city") {
      if (!coords) return setError("Please search a city first.");
      finalCoords = { lat: Number(coords.lat), lon: Number(coords.lon) };
    } else {
      if (!lat || !lon) return setError("Enter coordinates.");
      finalCoords = { lat: Number(lat), lon: Number(lon) };
    }

    const setupData = {
      location: finalCoords,
      panel: {
        area: Number(panelArea),
        tilt: Number(tilt),
        orientation,
      },
      dates: {
        startDate,
        endDate,
      },
    };

    try {
      setSubmitting(true);
      setError("");
      
      console.log('⚙️ Solar Setup Configuration:', {
        location: {
          type: locationType,
          coordinates: finalCoords,
        },
        panel: {
          area: `${panelArea} m²`,
          tilt: `${tilt}°`,
          orientation,
        },
        dates: {
          startDate,
          endDate,
        },
      });
      
      const response = await solarAPI.getSolarData(setupData);
      const result = response.data || response;
      const panelId = result?.db?.panel?.panel_id;

      console.log('✅ Solar Panel Installed Successfully:', {
        panelId,
        location: {
          city: result?.db?.location?.city,
          state: result?.db?.location?.state,
          country: result?.db?.location?.country,
          latitude: result?.db?.location?.latitude,
          longitude: result?.db?.location?.longitude,
        },
        panel: {
          area: result?.db?.panel?.area,
          tilt: result?.db?.panel?.tilt,
          orientation: result?.db?.panel?.orientation,
        },
        predictions: {
          totalEnergy: result?.summary?.totalEnergy,
          days: result?.summary?.days,
          factors: result?.factors,
        },
      });

      navigate(panelId ? `/dashboard/${panelId}` : '/dashboard');
    } catch (error) {
      setError(error.message || "Failed to generate prediction. Please try again.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 p-8">
      <div className="max-w-4xl mx-auto">
        <div className="mb-10">
          <BrandLogo />
        </div>

        {/* Header */}
        <div className="mb-12 text-center">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-blue-600 mb-6">
            <MapPin className="text-white" size={32} />
          </div>
          <h1 className="text-4xl font-bold text-slate-900 dark:text-slate-100 mb-4">
            Setup Your Solar System
          </h1>
          <p className="text-lg text-slate-600 dark:text-slate-400 max-w-2xl mx-auto">
            Configure your solar panel installation to get accurate energy predictions
          </p>
        </div>

        {/* Progress Steps */}
        <div className="flex items-center justify-center mb-12">
          <div className="flex items-center space-x-4">
            {[1, 2, 3].map((step) => (
              <div key={step} className="flex items-center">
                <div className={`w-10 h-10 rounded-full flex items-center justify-center font-bold transition-all ${
                  currentStep >= step ? 'bg-blue-600 text-white' : 'bg-slate-300 dark:bg-slate-700 text-slate-600'
                }`}>
                  {step}
                </div>
                {step < 3 && (
                  <div className={`w-16 h-0.5 transition-all ${
                    currentStep > step ? 'bg-blue-600' : 'bg-slate-300'
                  }`}></div>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Error Message */}
        {error && (
          <div className="mb-6 p-4 bg-red-100 dark:bg-red-900/30 border border-red-300 rounded-lg text-red-700 text-sm">
            {error}
          </div>
        )}

        {/* Form */}
        <div className="space-y-6">
          {currentStep === 1 && (
            <LocationCard {...{locationType, setLocationType, city, setCity, coords, loading, error, handleCitySearch, handleUseCurrentLocation, lat, setLat, lon, setLon}} />
          )}
          {currentStep === 2 && (
            <PanelCard {...{panelArea, setPanelArea, tilt, setTilt, orientation, setOrientation}} />
          )}
          {currentStep === 3 && (
            <DateCard {...{startDate, setStartDate, endDate, setEndDate}} />
          )}

          {/* Buttons */}
          <div className="flex justify-between gap-4 mt-8">
            <button
              onClick={handleBack}
              disabled={currentStep === 1}
              className="flex-1 px-6 py-3 bg-slate-200 dark:bg-slate-800 text-slate-900 dark:text-slate-100 font-bold rounded-xl hover:bg-slate-300 dark:hover:bg-slate-700 disabled:opacity-50 transition-all"
            >
              Back
            </button>
            {currentStep < 3 ? (
              <button
                onClick={handleNext}
                className="flex-1 px-6 py-3 bg-blue-600 text-white font-bold rounded-xl hover:bg-blue-700 active:scale-95 transition-all flex items-center justify-center gap-2"
              >
                Next <ArrowRight size={20} />
              </button>
            ) : (
              <button
                onClick={handleSubmit}
                disabled={submitting}
                className="flex-1 px-6 py-3 bg-blue-600 text-white font-bold rounded-xl hover:bg-blue-700 active:scale-95 transition-all"
              >
                {submitting ? 'Saving Setup...' : 'Complete Setup'}
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Onboarding;
