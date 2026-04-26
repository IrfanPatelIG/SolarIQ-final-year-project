import React, { useState, useEffect } from "react";
import { useNavigate } from 'react-router-dom';
import { MapPin, ArrowRight } from "lucide-react";
import LocationCard from "../components/LocationCard";
import PanelCard from "../components/PanelCard";
import DateCard from "../components/DateCard";

const Onboarding = () => {
  const navigate = useNavigate();
  const [currentStep, setCurrentStep] = useState(1);
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
        const { lat, lon, name, country } = data[0];
        setCoords({ lat, lon, name, country });
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

        setLat(latitude);
        setLon(longitude);
        setLocationType("city");
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

  const handleNext = () => {
    if (currentStep === 1) {
      // Validate location step
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
      // Validate panel step
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

    try {
      const res = await fetch("http://localhost:5000/api/solar/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });

      const data = await res.json();
      console.log(data);
      
      // Navigate to dashboard after successful submission
      navigate('/dashboard');
    } catch (error) {
      setError("Failed to generate prediction. Please try again.");
      console.error(error);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 p-8">
      <div className="max-w-4xl mx-auto">
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
            <div className="flex items-center">
              <div className={`w-10 h-10 rounded-full flex items-center justify-center font-bold transition-all ${
                currentStep >= 1 ? 'bg-blue-600 text-white' : 'bg-slate-300 dark:bg-slate-700 text-slate-600 dark:text-slate-400'
              }`}>1</div>
              <span className={`ml-2 text-sm font-medium transition-all ${
                currentStep >= 1 ? 'text-slate-900 dark:text-slate-100' : 'text-slate-500 dark:text-slate-400'
              }`}>Location</span>
            </div>
            <div className={`w-16 h-0.5 transition-all ${
              currentStep >= 2 ? 'bg-blue-600' : 'bg-slate-300 dark:bg-slate-700'
            }`}></div>
            <div className="flex items-center">
              <div className={`w-10 h-10 rounded-full flex items-center justify-center font-bold transition-all ${
                currentStep >= 2 ? 'bg-blue-600 text-white' : 'bg-slate-300 dark:bg-slate-700 text-slate-600 dark:text-slate-400'
              }`}>2</div>
              <span className={`ml-2 text-sm font-medium transition-all ${
                currentStep >= 2 ? 'text-slate-900 dark:text-slate-100' : 'text-slate-500 dark:text-slate-400'
              }`}>Panel</span>
            </div>
            <div className={`w-16 h-0.5 transition-all ${
              currentStep >= 3 ? 'bg-blue-600' : 'bg-slate-300 dark:bg-slate-700'
            }`}></div>
            <div className="flex items-center">
              <div className={`w-10 h-10 rounded-full flex items-center justify-center font-bold transition-all ${
                currentStep >= 3 ? 'bg-blue-600 text-white' : 'bg-slate-300 dark:bg-slate-700 text-slate-600 dark:text-slate-400'
              }`}>3</div>
              <span className={`ml-2 text-sm font-medium transition-all ${
                currentStep >= 3 ? 'text-slate-900 dark:text-slate-100' : 'text-slate-500 dark:text-slate-400'
              }`}>Dates</span>
            </div>
          </div>
        </div>

        {/* Error Message */}
        {error && (
          <div className="mb-6 p-4 bg-red-100 dark:bg-red-900/30 border border-red-300 dark:border-red-700 rounded-lg text-red-700 dark:text-red-400 text-sm">
            {error}
          </div>
        )}

        {/* Form Cards - Show based on current step */}
        <div className="space-y-6">
          {currentStep === 1 && (
            <LocationCard
              locationType={locationType}
              setLocationType={setLocationType}
              city={city}
              setCity={setCity}
              coords={coords}
              loading={loading}
              error={error}
              handleCitySearch={handleCitySearch}
              handleUseCurrentLocation={handleUseCurrentLocation}
              lat={lat}
              setLat={setLat}
              lon={lon}
              setLon={setLon}
            />
          )}

          {currentStep === 2 && (
            <PanelCard
              panelArea={panelArea}
              setPanelArea={setPanelArea}
              tilt={tilt}
              setTilt={setTilt}
              orientation={orientation}
              setOrientation={setOrientation}
            />
          )}

          {currentStep === 3 && (
            <DateCard
              startDate={startDate}
              setStartDate={setStartDate}
              endDate={endDate}
              minStartDate={minStartDate}
            />
          )}
        </div>

        {/* Navigation Buttons */}
        <div className="mt-12 flex justify-between">
          {currentStep > 1 && (
            <button
              onClick={handleBack}
              className="flex items-center px-6 py-3 bg-slate-200 dark:bg-slate-700 hover:bg-slate-300 dark:hover:bg-slate-600 text-slate-700 dark:text-slate-200 rounded-xl font-semibold transition-all"
            >
              Back
            </button>
          )}
          <div className="flex-1"></div>
          {currentStep < 3 ? (
            <button
              onClick={handleNext}
              className="flex items-center px-8 py-3 bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white rounded-xl font-semibold shadow-lg hover:shadow-xl transition-all active:scale-95"
            >
              Next
              <ArrowRight className="ml-2" size={20} />
            </button>
          ) : (
            <button
              onClick={handleSubmit}
              className="flex items-center px-8 py-3 bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-700 hover:to-cyan-700 text-white rounded-xl font-semibold shadow-lg hover:shadow-xl transition-all active:scale-95"
            >
              Complete
              <ArrowRight className="ml-2" size={20} />
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default Onboarding;
