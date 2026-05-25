from fastapi import FastAPI
from pydantic import BaseModel
import joblib
import json
import numpy as np
import pandas as pd

app = FastAPI()

# =========================
# LOAD MODEL + SCALING
# =========================
model = joblib.load("XGBoost Regressor.pkl")

with open("scaling_config.json", "r") as f:
    scaling_config = json.load(f)

FEATURES = [
    "sin_doy", "cos_doy", "solar_irradiance", "temperature_avg", "humidity",
    "wind_speed", "pressure", "cloud_cover", "precipitation",
    "solar_zenith_angle", "clear_sky_index", "air_mass",
    "capacity_kw", "tilt_angle", "orientation"
]

# =========================
# INPUT SCHEMA
# =========================
class SolarInput(BaseModel):
    sin_doy: float
    cos_doy: float
    solar_irradiance: float
    temperature_avg: float
    humidity: float
    wind_speed: float
    pressure: float
    cloud_cover: float
    precipitation: float
    solar_zenith_angle: float
    clear_sky_index: float
    air_mass: float
    capacity_kw: float
    tilt_angle: float
    orientation: float


# =========================
# PREPROCESS FUNCTION
# =========================
def preprocess(df):
    df_scaled = df.copy()

    for f in FEATURES:
        mean = scaling_config["mean"][f]
        std = scaling_config["std"][f]
        df_scaled[f] = (df_scaled[f] - mean) / std

    return df_scaled


# =========================
# MAIN PREDICTION API
# =========================
@app.post("/predict")
def predict(data: SolarInput):

    input_dict = data.dict()
    df = pd.DataFrame([input_dict], columns=FEATURES)

    processed = preprocess(df)

    prediction = model.predict(processed)[0]

    prediction = max(0, float(prediction))

    return {
        "predicted_energy_kwh": prediction
    }