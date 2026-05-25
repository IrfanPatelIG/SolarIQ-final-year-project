import streamlit as st
import joblib
import pandas as pd
import numpy as np
import json
import os

# Page Configuration for a premium layout
st.set_page_config(
    page_title="SolarIQ | Solar Energy Forecaster",
    page_icon="☀️",
    layout="wide",
    initial_sidebar_state="expanded"
)

# Custom premium CSS for visual excellence
st.markdown("""
    <style>
    @import url('https://fonts.googleapis.com/css2?family=Outfit:wght@300;400;600;800&display=swap');
    
    html, body, [class*="css"] {
        font-family: 'Outfit', sans-serif;
    }
    
    .stApp {
        background: radial-gradient(circle at top right, rgba(99, 102, 241, 0.15), transparent 450px),
                    radial-gradient(circle at bottom left, rgba(244, 63, 94, 0.1), transparent 450px);
        background-color: #0b0f19;
        color: #f8fafc;
    }
    
    /* Header styling */
    .title-text {
        background: linear-gradient(90deg, #ff7e5f, #feb47b, #6366f1);
        -webkit-background-clip: text;
        -webkit-text-fill-color: transparent;
        font-weight: 800;
        font-size: 3rem;
        margin-bottom: 0.2rem;
    }
    
    .subtitle-text {
        color: #94a3b8;
        font-size: 1.1rem;
        margin-bottom: 2rem;
    }
    
    /* Card design */
    .metric-card {
        background: rgba(30, 41, 59, 0.45);
        border: 1px solid rgba(255, 255, 255, 0.08);
        border-radius: 16px;
        padding: 24px;
        box-shadow: 0 4px 30px rgba(0, 0, 0, 0.2);
        backdrop-filter: blur(10px);
        -webkit-backdrop-filter: blur(10px);
        transition: transform 0.3s ease, border-color 0.3s ease;
    }
    
    /* Input field container styling */
    div[data-testid="stForm"] {
        background: rgba(30, 41, 59, 0.3) !important;
        border: 1px solid rgba(255, 255, 255, 0.06) !important;
        border-radius: 20px !important;
        padding: 30px !important;
    }
    
    /* Premium button */
    div.stButton > button {
        background: linear-gradient(90deg, #6366f1 0%, #a855f7 100%) !important;
        color: white !important;
        border: none !important;
        padding: 12px 30px !important;
        font-weight: 600 !important;
        border-radius: 8px !important;
        transition: all 0.3s ease !important;
        box-shadow: 0 4px 15px rgba(99, 102, 241, 0.4) !important;
        cursor: pointer !important;
    }
    div.stButton > button:hover {
        transform: translateY(-2px) scale(1.02) !important;
        box-shadow: 0 6px 20px rgba(99, 102, 241, 0.6) !important;
    }
    </style>
""", unsafe_allow_html=True)

# Helper function to load model and config
@st.cache_resource
def load_assets():
    model = joblib.load("XGBoost Regressor.pkl")
    with open("scaling_config.json", "r") as f:
        scaling_config = json.load(f)
    return model, scaling_config

try:
    model, scaling_config = load_assets()
    assets_loaded = True
except Exception as e:
    assets_loaded = False
    error_msg = str(e)

# Sidebar UI
st.sidebar.markdown("<h2 style='color:#6366f1; font-family: Outfit;'>☀️ SolarIQ System</h2>", unsafe_allow_html=True)
st.sidebar.info(
    "SolarIQ utilizes a high-precision XGBoost Regressor model to project "
    "solar energy generation (kWh) based on meteorological and solar-plant system parameters."
)
st.sidebar.markdown("---")
st.sidebar.markdown("### 📊 Model Evaluation Metrics")
st.sidebar.markdown(
    """
    <div style='background: rgba(30, 41, 59, 0.45); border: 1px solid rgba(255,255,255,0.08); border-radius: 12px; padding: 15px; margin-bottom: 10px;'>
        <div style='margin-bottom: 6px;'><b>Algorithm:</b> <span style='color:#a855f7;'>XGBoost Regressor</span></div>
        <div style='margin-bottom: 6px;'><b>R² Score:</b> <span style='color:#feb47b; font-weight:600;'>0.401 (40.1%)</span></div>
        <div style='margin-bottom: 6px;'><b>Mean Absolute Error:</b> <span style='color:#4ade80;'>39.66 kWh</span></div>
        <div style='margin-bottom: 0px;'><b>Root Mean Sq Error:</b> <span style='color:#f87171;'>54.15 kWh</span></div>
    </div>
    """,
    unsafe_allow_html=True
)
st.sidebar.markdown("---")
st.sidebar.markdown("### 📝 Input Guidelines")
st.sidebar.write(
    "- **Day of Year Components**: `sin_doy` & `cos_doy` capture seasonality. Value range is `[-1.0, 1.0]`.\n"
    "- **Solar Irradiance**: Critical driver for solar output. Values usually range `[0, 1200] W/m²`.\n"
    "- **Capacity (kW)**: Power rating of your solar panels."
)

if not assets_loaded:
    st.error(f"❌ Error loading model assets: {error_msg}")
    st.stop()

# Layout
st.markdown("<div class='title-text'>SolarIQ Prediction Engine</div>", unsafe_allow_html=True)
st.markdown("<div class='subtitle-text'>Harnessing Advanced XGBoost Machine Learning to Forecast Solar Power Production</div>", unsafe_allow_html=True)

# Main Form organized logically
with st.form("solar_prediction_form"):
    st.markdown("<h3 style='color:#6366f1; margin-top:0;'>🛠️ Input Parameters</h3>", unsafe_allow_html=True)
    
    col1, col2, col3 = st.columns(3)
    
    with col1:
        st.markdown("<h4 style='color:#a855f7;'>📅 Temporal Parameters</h4>", unsafe_allow_html=True)
        sin_doy = st.number_input("Sine Day of Year (sin_doy)", min_value=-1.0, max_value=1.0, value=-0.4958, format="%.4f")
        cos_doy = st.number_input("Cosine Day of Year (cos_doy)", min_value=-1.0, max_value=1.0, value=-0.9286, format="%.4f")
        
        st.markdown("<h4 style='color:#a855f7; margin-top: 15px;'>⚙️ System Specs</h4>", unsafe_allow_html=True)
        capacity_kw = st.number_input("Inverter/Panel Capacity (kW)", min_value=0.0, value=14.1, step=1.0, format="%.1f")
        tilt_angle = st.slider("Tilt Angle (degrees)", min_value=0, max_value=90, value=37)
        orientation = st.slider("Orientation/Azimuth (degrees)", min_value=0, max_value=360, value=196)
        
    with col2:
        st.markdown("<h4 style='color:#ff7e5f;'>🌦️ Weather Conditions</h4>", unsafe_allow_html=True)
        temperature_avg = st.number_input("Average Temperature (°C)", min_value=-40.0, max_value=60.0, value=13.6, format="%.1f")
        humidity = st.slider("Relative Humidity (%)", min_value=0, max_value=100, value=15)
        wind_speed = st.number_input("Wind Speed (m/s)", min_value=0.0, value=8.4, format="%.1f")
        pressure = st.number_input("Atmospheric Pressure (hPa)", min_value=900.0, max_value=1100.0, value=1008.6, format="%.1f")
        precipitation = st.number_input("Precipitation (mm)", min_value=0.0, value=68.8, format="%.1f")
        
    with col3:
        st.markdown("<h4 style='color:#feb47b;'>☀️ Solar Geometry</h4>", unsafe_allow_html=True)
        solar_irradiance = st.number_input("Global Horizontal Irradiance (W/m²)", min_value=0.0, value=22.4, format="%.1f")
        solar_zenith_angle = st.slider("Solar Zenith Angle (degrees)", min_value=0, max_value=180, value=12)
        clear_sky_index = st.slider("Clear Sky Index (0-1)", min_value=0.0, max_value=1.0, value=0.35, step=0.05)
        air_mass = st.number_input("Air Mass Coefficient", min_value=0.0, value=9.4, format="%.1f")
        cloud_cover = st.slider("Cloud Cover (%)", min_value=0, max_value=100, value=61)
        
    st.markdown("<br>", unsafe_allow_html=True)
    submit_button = st.form_submit_button("⚡ Calculate Energy Prediction")

# Handle submit
if submit_button:
    # Build dataframe matching trained feature names exactly
    feature_names = [
        "sin_doy", "cos_doy", "solar_irradiance", "temperature_avg", "humidity",
        "wind_speed", "pressure", "cloud_cover", "precipitation", "solar_zenith_angle",
        "clear_sky_index", "air_mass", "capacity_kw", "tilt_angle", "orientation"
    ]
    
    input_dict = {
        "sin_doy": sin_doy,
        "cos_doy": cos_doy,
        "solar_irradiance": solar_irradiance,
        "temperature_avg": temperature_avg,
        "humidity": humidity,
        "wind_speed": wind_speed,
        "pressure": pressure,
        "cloud_cover": cloud_cover,
        "precipitation": precipitation,
        "solar_zenith_angle": solar_zenith_angle,
        "clear_sky_index": clear_sky_index,
        "air_mass": air_mass,
        "capacity_kw": capacity_kw,
        "tilt_angle": tilt_angle,
        "orientation": orientation
    }
    
    input_df = pd.DataFrame([input_dict], columns=feature_names)
    
    st.markdown("### 📊 Inference Analytics")
    
    col_out1, col_out2 = st.columns([1, 1])
    
    # Perform standardization
    standardized_df = input_df.copy()
    for feature in feature_names:
        mean = scaling_config["mean"][feature]
        std = scaling_config["std"][feature]
        standardized_df[feature] = (standardized_df[feature] - mean) / std
        
    # Make Prediction
    try:
        prediction = model.predict(standardized_df)
        predicted_energy = float(prediction[0])
        if predicted_energy < 0:
            predicted_energy = 0.0  # Physical constraint
            
        with col_out1:
            st.markdown(
                f"""
                <div class='metric-card' style='height: 180px;'>
                    <h3 style='color:#a855f7; margin-top:0; font-family: Outfit;'>💡 Projected Energy Output</h3>
                    <div style='font-size: 3rem; font-weight: 800; color: #ff7e5f;'>
                        {predicted_energy:.3f} <span style='font-size:1.5rem; color:#94a3b8;'>kWh</span>
                    </div>
                    <p style='color:#94a3b8; font-size:0.9rem; margin-bottom:0;'>
                        Inference computed using real-time Z-score standardization.
                    </p>
                </div>
                """,
                unsafe_allow_html=True
            )
            
        with col_out2:
            st.markdown(
                f"""
                <div class='metric-card' style='height: 180px;'>
                    <h3 style='color:#6366f1; margin-top:0; font-family: Outfit;'>🌱 Environmental Impact</h3>
                    <div style='font-size: 1.5rem; font-weight: 600; color: #f8fafc; margin-bottom: 8px;'>
                        CO₂ Offset: <span style='color: #4ade80;'>{(predicted_energy * 0.475):.3f} kg</span>
                    </div>
                    <div style='color: #94a3b8; font-size: 0.9rem;'>
                        Equivalent to keeping a standard LED light bulb lit for <b>{int(predicted_energy * 100)} hours</b>, or driving <b>{(predicted_energy * 1.2):.2f} km</b> in a conventional car.
                    </div>
                </div>
                """,
                unsafe_allow_html=True
            )
            
        # Draw clean visual table showing Z-score scaling shift
        st.markdown("<br><h4 style='color:#feb47b; font-family: Outfit;'>🔄 Z-score Standardization Overview</h4>", unsafe_allow_html=True)
        comparison_data = []
        for feature in feature_names:
            comparison_data.append({
                "Feature Name": feature,
                "Raw Input Value": float(input_dict[feature]),
                "Training Mean (μ)": float(scaling_config["mean"][feature]),
                "Training Std (σ)": float(scaling_config["std"][feature]),
                "Standardized Model Input (Z)": float(standardized_df[feature].iloc[0])
            })
        st.dataframe(pd.DataFrame(comparison_data), use_container_width=True)

        # Dynamic GHI Response Curve Chart
        st.markdown("<br><h4 style='color:#a855f7; font-family: Outfit;'>📈 What-If Analysis: Irradiance Response Curve</h4>", unsafe_allow_html=True)
        st.markdown(
            "This dynamic simulation models expected power output as the solar irradiance (GHI) varies "
            "from `0 W/m²` (overcast/night) to `1200 W/m²` (peak standard sunlight), holding all other metrics constant."
        )
        ghi_values = np.linspace(0, 1200, 25)
        simulated_power = []
        for ghi in ghi_values:
            temp_dict = input_dict.copy()
            temp_dict["solar_irradiance"] = ghi
            temp_df = pd.DataFrame([temp_dict], columns=feature_names)
            # Standardize
            for f in feature_names:
                mean = scaling_config["mean"][f]
                std = scaling_config["std"][f]
                temp_df[f] = (temp_df[f] - mean) / std
            pred = model.predict(temp_df)[0]
            simulated_power.append(max(0.0, float(pred)))
            
        chart_data = pd.DataFrame({
            "Solar Irradiance (W/m²)": ghi_values,
            "Predicted Power Output (kWh)": simulated_power
        }).set_index("Solar Irradiance (W/m²)")
        st.line_chart(chart_data, color="#ff7e5f")
        
        # Download Data button
        st.markdown("<br>", unsafe_allow_html=True)
        export_df = pd.DataFrame([input_dict])
        export_df["predicted_energy_kwh"] = predicted_energy
        csv_data = export_df.to_csv(index=False).encode('utf-8')
        st.download_button(
            label="💾 Download Prediction Report (CSV)",
            data=csv_data,
            file_name="solariq_forecast_export.csv",
            mime="text/csv"
        )

    except Exception as e:
        st.error(f"Prediction Error: {e}")

st.markdown("<hr style='border-color: rgba(255,255,255,0.05);'>", unsafe_allow_html=True)
st.markdown("<p style='text-align: center; color: #64748b; font-size: 0.85rem;'> Solariq ML Solar Plant Forecasting Systems</p>", unsafe_allow_html=True)
