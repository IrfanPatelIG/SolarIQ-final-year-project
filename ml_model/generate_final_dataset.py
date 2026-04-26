import pandas as pd
import numpy as np
import random
import math
from datetime import datetime, timedelta

print("="*80)
print("REGENERATING FINAL COMPREHENSIVE SOLAR DATASET")
print("="*80)

# ============================================================================
# PHYSICS-BASED WEATHER GENERATION
# ============================================================================
def generate_weather_data(latitude, longitude, day_of_year, hour=12):
    """Generate realistic weather data based on physics and location"""

    # Solar irradiance calculation (simplified physics-based model)
    declination = 23.45 * math.sin(math.radians(360 * (284 + day_of_year) / 365))
    hour_angle = 15 * (hour - 12)

    solar_zenith = math.degrees(math.acos(
        math.sin(math.radians(latitude)) * math.sin(math.radians(declination)) +
        math.cos(math.radians(latitude)) * math.cos(math.radians(declination)) * math.cos(math.radians(hour_angle))
    ))

    # Air mass calculation
    if solar_zenith <= 90:
        air_mass = 1 / (math.cos(math.radians(solar_zenith)) + 0.50572 * (96.07995 - solar_zenith)**(-1.6364))
    else:
        air_mass = 0

    # Base irradiance (physics-based)
    base_irradiance = 1366 * (0.7 ** (air_mass ** 0.678)) * math.cos(math.radians(solar_zenith))

    # Seasonal and location adjustments
    seasonal_factor = 1 + 0.3 * math.sin(math.radians(360 * day_of_year / 365))
    latitude_factor = 1 - abs(latitude) / 90 * 0.2

    solar_irradiance = max(0, base_irradiance * seasonal_factor * latitude_factor)

    # Add realistic cloud cover effect
    cloud_cover = random.uniform(0, 80)  # 0-80% cloud cover
    solar_irradiance *= (1 - cloud_cover/100 * 0.7)  # Clouds reduce irradiance

    # Temperature (physics-based approximation)
    base_temp = 25 + 10 * math.sin(math.radians(360 * day_of_year / 365))
    latitude_temp_adjust = -latitude/30  # Cooler at higher latitudes
    temperature_avg = base_temp + latitude_temp_adjust + random.uniform(-5, 5)

    # Humidity (higher in coastal/tropical areas)
    base_humidity = 60 + latitude/20  # Higher humidity in tropical regions
    humidity = min(100, max(20, base_humidity + random.uniform(-20, 20)))

    # Wind speed (realistic ranges)
    wind_speed = random.uniform(1, 8)

    # Pressure (physics-based)
    base_pressure = 1013.25 - latitude/10  # Lower pressure at higher latitudes
    pressure = base_pressure + random.uniform(-10, 10)

    # Precipitation (seasonal)
    season = (day_of_year // 91) % 4  # 0=winter, 1=spring, 2=summer, 3=fall
    precip_chance = [15, 20, 25, 20][season]  # Higher in summer
    precipitation = random.uniform(0, 10) if random.random() < precip_chance/100 else 0

    return {
        'solar_irradiance': round(solar_irradiance, 2),
        'temperature_avg': round(temperature_avg, 2),
        'humidity': round(humidity, 1),
        'wind_speed': round(wind_speed, 1),
        'pressure': round(pressure, 1),
        'cloud_cover': round(cloud_cover, 1),
        'precipitation': round(precipitation, 2)
    }

# ============================================================================
# SOLAR PANEL CONFIGURATIONS
# ============================================================================
def generate_panel_config():
    """Generate realistic solar panel configurations"""
    capacities = [1, 2, 3, 5, 10, 15, 20, 25, 50, 100]  # kW
    capacity_kw = random.choice(capacities)

    # Panel area calculation (typical 15-20 W/m² panels)
    panel_area = capacity_kw * 1000 / random.uniform(150, 200)  # m²

    # Tilt angle (optimal for location, typically latitude ± 15°)
    tilt_angle = random.randint(15, 45)

    # Orientation (south-facing preferred, with some variation)
    orientation = random.randint(150, 210)  # 180° = south

    return {
        'capacity_kw': capacity_kw,
        'panel_area': round(panel_area, 1),
        'tilt_angle': tilt_angle,
        'orientation': orientation
    }

# ============================================================================
# ENERGY CALCULATION
# ============================================================================
def calculate_energy_generation(weather, panel_config, day_of_year):
    """Calculate energy generation using physics-based model"""

    irradiance = weather['solar_irradiance']
    temp = weather['temperature_avg']
    capacity = panel_config['capacity_kw']
    area = panel_config['panel_area']

    # Temperature coefficient effect (-0.3% to -0.5% per °C)
    temp_coefficient = random.uniform(-0.003, -0.005)
    temp_factor = 1 + temp_coefficient * (temp - 25)

    # Efficiency factors
    base_efficiency = random.uniform(0.15, 0.22)  # Panel efficiency
    soiling_factor = random.uniform(0.95, 0.99)  # Dust/soiling losses
    inverter_efficiency = random.uniform(0.92, 0.96)  # Inverter efficiency
    system_losses = random.uniform(0.85, 0.92)  # Other system losses

    # Calculate energy (kWh)
    energy_per_kw = irradiance * area / 1000 * base_efficiency * temp_factor * soiling_factor * inverter_efficiency * system_losses / 1000

    # Convert to daily energy
    energy_generated_kwh = energy_per_kw * capacity

    # Add some realistic variation
    variation_factor = random.uniform(0.9, 1.1)
    energy_generated_kwh *= variation_factor

    return round(max(0.1, energy_generated_kwh), 3)

# ============================================================================
# MAIN DATASET GENERATION
# ============================================================================
print("\n[1] GENERATING COMPREHENSIVE SOLAR DATASET")
print("-"*60)

# Indian cities with coordinates
indian_cities = [
    {'name': 'Mumbai', 'lat': 19.076, 'lon': 72.877},
    {'name': 'Delhi', 'lat': 28.704, 'lon': 77.102},
    {'name': 'Bangalore', 'lat': 12.971, 'lon': 77.594},
    {'name': 'Chennai', 'lat': 13.082, 'lon': 80.271},
    {'name': 'Kolkata', 'lat': 22.572, 'lon': 88.363},
    {'name': 'Hyderabad', 'lat': 17.385, 'lon': 78.486},
    {'name': 'Pune', 'lat': 18.520, 'lon': 73.856},
    {'name': 'Ahmedabad', 'lat': 23.022, 'lon': 72.571}
]

TARGET_SAMPLES = 25000
samples_per_city = TARGET_SAMPLES // len(indian_cities)

print(f"✓ Target: {TARGET_SAMPLES:,} samples")
print(f"✓ Cities: {len(indian_cities)}")
print(f"✓ Samples per city: {samples_per_city:,}")

# Generate dataset
all_data = []

for city in indian_cities:
    print(f"\nGenerating data for {city['name']}...")
    city_samples = 0

    while city_samples < samples_per_city:
        # Random day of year (full year coverage)
        day_of_year = random.randint(1, 365)

        # Generate weather
        weather = generate_weather_data(city['lat'], city['lon'], day_of_year)

        # Skip if irradiance too low (night time)
        if weather['solar_irradiance'] < 50:
            continue

        # Generate panel configuration
        panel_config = generate_panel_config()

        # Calculate energy
        energy_generated_kwh = calculate_energy_generation(weather, panel_config, day_of_year)

        # Time features
        month = ((day_of_year - 1) // 30) + 1
        sin_doy = math.sin(2 * math.pi * day_of_year / 365)
        cos_doy = math.cos(2 * math.pi * day_of_year / 365)

        # Combine all features
        sample = {
            'location_name': city['name'],
            'latitude': city['lat'],
            'longitude': city['lon'],
            'day_of_year': day_of_year,
            'month': month,
            'sin_doy': round(sin_doy, 3),
            'cos_doy': round(cos_doy, 3),
            **weather,
            **panel_config,
            'energy_generated_kwh': energy_generated_kwh,
            'energy_per_kw': round(energy_generated_kwh / panel_config['capacity_kw'], 3)
        }

        all_data.append(sample)
        city_samples += 1

    print(f"  ✓ Generated {city_samples:,} samples for {city['name']}")

# ============================================================================
# CREATE DATAFRAME AND SAVE
# ============================================================================
print("\n[2] CREATING DATASET")
print("-"*60)

df = pd.DataFrame(all_data)
print(f"✓ Dataset created: {df.shape[0]:,} rows, {df.shape[1]} columns")

# ============================================================================
# DATA VALIDATION
# ============================================================================
print("\n[3] DATA VALIDATION")
print("-"*60)

print("Feature Statistics:")
print(f"  Solar Irradiance: {df['solar_irradiance'].mean():.1f} ± {df['solar_irradiance'].std():.1f} W/m²")
print(f"  Temperature: {df['temperature_avg'].mean():.1f} ± {df['temperature_avg'].std():.1f} °C")
print(f"  Capacity: {df['capacity_kw'].mean():.1f} ± {df['capacity_kw'].std():.1f} kW")
print(f"  Energy Generated: {df['energy_generated_kwh'].mean():.3f} ± {df['energy_generated_kwh'].std():.3f} kWh")

print("\nLocation Distribution:")
location_counts = df['location_name'].value_counts()
for city, count in location_counts.items():
    print(f"  {city}: {count:,} samples")

# ============================================================================
# SAVE DATASET
# ============================================================================
print("\n[4] SAVING DATASET")
print("-"*60)

# Save full dataset
output_file = 'final_comprehensive_solar_dataset.csv'
df.to_csv(output_file, index=False)
print(f"✓ Full dataset saved: {output_file}")

# Save sample for inspection
sample_file = 'final_solar_dataset_sample.csv'
df.head(100).to_csv(sample_file, index=False)
print(f"✓ Sample saved: {sample_file}")

# ============================================================================
# FINAL SUMMARY
# ============================================================================
print("\n" + "="*80)
print("FINAL COMPREHENSIVE SOLAR DATASET GENERATION COMPLETE!")
print("="*80)

print(f"\n📊 DATASET SUMMARY:")
print(f"   • Total Samples: {df.shape[0]:,}")
print(f"   • Features: {df.shape[1]}")
print(f"   • Cities: {len(indian_cities)}")
print(f"   • Date Range: Full year (365 days)")
print(f"   • Physics-Based: ✓ Weather, ✓ Irradiance, ✓ Energy calculations")

print(f"\n🔧 FEATURES INCLUDED:")
print(f"   • Weather: Solar irradiance, temperature, humidity, wind, pressure, clouds, precipitation")
print(f"   • Panel Config: Capacity, area, tilt angle, orientation")
print(f"   • Time: Day of year, month, sine/cosine cycles")
print(f"   • Location: Latitude, longitude, city names")
print(f"   • Target: Energy generated (kWh) and per kW")

print(f"\n💾 FILES CREATED:")
print(f"   • {output_file} - Complete dataset ({df.shape[0]:,} samples)")
print(f"   • {sample_file} - Sample dataset (100 samples)")

print("\n" + "="*80)
print("✅ READY FOR MACHINE LEARNING TRAINING!")
print("="*80)