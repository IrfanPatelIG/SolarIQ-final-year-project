import sys
import json
import joblib
import pandas as pd
import numpy as np

# Load the trained model and scaler
try:
    model = joblib.load('solar_energy_model_Random_Forest_final.pkl')
    scaler = joblib.load('final_feature_scaler.pkl')
except Exception as e:
    print(json.dumps({"error": f"Failed to load model: {str(e)}"}))
    sys.exit(1)

# Feature order must match the training data
FEATURE_ORDER = [
    'latitude',
    'longitude',
    'day_of_year',
    'month',
    'sin_doy',
    'cos_doy',
    'solar_irradiance',
    'temperature_avg',
    'humidity',
    'wind_speed',
    'pressure',
    'cloud_cover',
    'precipitation',
    'capacity_kw',
    'panel_area',
    'tilt_angle',
    'orientation'
]

def predict_single(input_data):
    """Make prediction for a single input"""
    try:
        # Create DataFrame with correct feature order
        input_df = pd.DataFrame([input_data], columns=FEATURE_ORDER)
        
        # Scale the input
        input_scaled = scaler.transform(input_df)
        
        # Make prediction
        prediction = model.predict(input_scaled)[0]
        
        return {
            "success": True,
            "prediction": float(prediction),
            "input": input_data
        }
    except Exception as e:
        return {
            "success": False,
            "error": str(e)
        }

def predict_batch(input_data_list):
    """Make predictions for multiple inputs"""
    try:
        # Create DataFrame with correct feature order
        input_df = pd.DataFrame(input_data_list, columns=FEATURE_ORDER)
        
        # Scale the input
        input_scaled = scaler.transform(input_df)
        
        # Make predictions
        predictions = model.predict(input_scaled)
        
        return {
            "success": True,
            "predictions": [float(p) for p in predictions],
            "inputs": input_data_list
        }
    except Exception as e:
        return {
            "success": False,
            "error": str(e)
        }

if __name__ == "__main__":
    # Read input from stdin (JSON format)
    try:
        input_str = sys.stdin.read()
        if not input_str:
            print(json.dumps({"error": "No input provided"}))
            sys.exit(1)
        
        data = json.loads(input_str)
        
        # Check if single input or batch
        if isinstance(data, list):
            result = predict_batch(data)
        else:
            result = predict_single(data)
        
        print(json.dumps(result))
        
    except json.JSONDecodeError as e:
        print(json.dumps({"error": f"Invalid JSON input: {str(e)}"}))
        sys.exit(1)
    except Exception as e:
        print(json.dumps({"error": f"Prediction error: {str(e)}"}))
        sys.exit(1)
