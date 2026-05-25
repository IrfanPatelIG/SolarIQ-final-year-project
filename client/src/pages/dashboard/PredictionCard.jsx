import { useState } from "react";
import { getPrediction } from "../../api/mlAPI";

export default function PredictionCard() {
  const [prediction, setPrediction] = useState(null);
  const [loading, setLoading] = useState(false);

  const handlePredict = async () => {
    setLoading(true);

    const formData = {
      sin_doy: 0.45,
      cos_doy: 0.89,
      solar_irradiance: 750,
      temperature_avg: 28,
      humidity: 55,
      wind_speed: 3.5,
      pressure: 1012,
      cloud_cover: 20,
      precipitation: 0,
      solar_zenith_angle: 35,
      clear_sky_index: 0.8,
      air_mass: 1.3,
      capacity_kw: 5,
      tilt_angle: 25,
      orientation: 180,
    };

    try {
      const result = await getPrediction(formData);
      setPrediction(result);
    } catch (err) {
      console.error(err);
    }

    setLoading(false);
  };

  return (
    <div className="card">
      <h2>Solar Energy Prediction</h2>

      <button onClick={handlePredict} disabled={loading}>
        {loading ? "Predicting..." : "Get Prediction"}
      </button>

      <div style={{ marginTop: "10px" }}>
        {prediction ? (
          <p>
            Predicted Energy:{" "}
            <b>{prediction.predicted_energy_kwh} kWh</b>
          </p>
        ) : (
          <p>No prediction yet</p>
        )}
      </div>
    </div>
  );
}
