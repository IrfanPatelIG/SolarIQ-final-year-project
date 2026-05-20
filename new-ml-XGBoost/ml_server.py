from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
import joblib
import pandas as pd
import numpy as np

app = FastAPI(title="Solar Energy Prediction API", version="1.0.0")

# Add CORS middleware to allow Node.js backend to communicate
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Load the XGBoost model
MODEL_PATH = "XGBoost Regressor.pkl"
try:
    model = joblib.load(MODEL_PATH)
    print(f"Model loaded successfully from {MODEL_PATH}")
except Exception as e:
    print(f"Error loading model: {e}")
    model = None

# Define the input data model
class PredictionInput(BaseModel):
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

# Define the response model
class PredictionOutput(BaseModel):
    predicted_energy_kwh: float

@app.get("/")
def read_root():
    return {"message": "Solar Energy Prediction API", "status": "running"}

@app.get("/health")
def health_check():
    return {"status": "healthy", "model_loaded": model is not None}

@app.post("/predict", response_model=PredictionOutput)
def predict(input_data: PredictionInput):
    if model is None:
        raise HTTPException(status_code=500, detail="Model not loaded")
    
    try:
        # Convert input to DataFrame with correct feature order
        feature_names = [
            "sin_doy", "cos_doy", "solar_irradiance", "temperature_avg", "humidity",
            "wind_speed", "pressure", "cloud_cover", "precipitation", "solar_zenith_angle",
            "clear_sky_index", "air_mass", "capacity_kw", "tilt_angle", "orientation"
        ]
        
        input_dict = input_data.dict()
        input_df = pd.DataFrame([input_dict], columns=feature_names)
        
        # Make prediction
        prediction = model.predict(input_df)
        
        return {"predicted_energy_kwh": float(prediction[0])}
    
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Prediction error: {str(e)}")

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)
