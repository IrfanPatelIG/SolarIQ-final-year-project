import requests
import json

# Test the FastAPI prediction endpoint
url = "http://localhost:8000/predict"

test_data = {
    "sin_doy": 0.45,
    "cos_doy": 0.89,
    "solar_irradiance": 850,
    "temperature_avg": 32,
    "humidity": 65,
    "wind_speed": 12,
    "pressure": 1012,
    "cloud_cover": 20,
    "precipitation": 0,
    "solar_zenith_angle": 35,
    "clear_sky_index": 0.9,
    "air_mass": 1.2,
    "capacity_kw": 5,
    "tilt_angle": 25,
    "orientation": 180
}

try:
    response = requests.post(url, json=test_data)
    print(f"Status Code: {response.status_code}")
    print(f"Response: {json.dumps(response.json(), indent=2)}")
except Exception as e:
    print(f"Error: {e}")
