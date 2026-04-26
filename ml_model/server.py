from flask import Flask, request, jsonify
from flask_cors import CORS
import joblib
import pandas as pd
import numpy as np

app = Flask(__name__)
CORS(app)

# Load the trained model and scaler on startup
try:
    model = joblib.load('solar_energy_model_Random_Forest_final.pkl')
    scaler = joblib.load('final_feature_scaler.pkl')
    print("✓ Model and scaler loaded successfully")
except Exception as e:
    print(f"✗ Failed to load model: {e}")
    model = None
    scaler = None

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

@app.route('/predict', methods=['POST'])
def predict():
    """Predict solar energy generation for given inputs"""
    if model is None or scaler is None:
        return jsonify({
            "success": False,
            "error": "Model not loaded"
        }), 500
    
    try:
        data = request.get_json()
        
        if not data:
            return jsonify({
                "success": False,
                "error": "No input data provided"
            }), 400
        
        # Check if single input or batch
        if isinstance(data, list):
            input_data_list = data
        else:
            input_data_list = [data]
        
        # Validate that all required features are present
        for input_data in input_data_list:
            missing_features = [f for f in FEATURE_ORDER if f not in input_data]
            if missing_features:
                return jsonify({
                    "success": False,
                    "error": f"Missing features: {missing_features}"
                }), 400
        
        # Create DataFrame with correct feature order
        input_df = pd.DataFrame(input_data_list, columns=FEATURE_ORDER)
        
        # Scale the input
        input_scaled = scaler.transform(input_df)
        
        # Make predictions
        predictions = model.predict(input_scaled)
        
        # Prepare response
        if isinstance(data, list):
            result = {
                "success": True,
                "predictions": [float(p) for p in predictions],
                "count": len(predictions)
            }
        else:
            result = {
                "success": True,
                "prediction": float(predictions[0])
            }
        
        return jsonify(result)
        
    except Exception as e:
        return jsonify({
            "success": False,
            "error": str(e)
        }), 500

@app.route('/health', methods=['GET'])
def health():
    """Health check endpoint"""
    return jsonify({
        "status": "healthy",
        "model_loaded": model is not None,
        "scaler_loaded": scaler is not None
    })

if __name__ == '__main__':
    print("="*60)
    print("Solar Energy ML Server")
    print("="*60)
    print("Starting server on port 5000...")
    app.run(host='0.0.0.0', port=5000, debug=True)
