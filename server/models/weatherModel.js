import { DataTypes } from "sequelize";
import sequelize from "../config/db.js";

const Weather = sequelize.define(
  "Weather",
  {
    weather_id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },

    temperature: {
      type: DataTypes.FLOAT,
      allowNull: false,
    },

    humidity: {
      type: DataTypes.FLOAT,
      allowNull: false,
    },

    solar_irradiance: {
      type: DataTypes.FLOAT,
      allowNull: false,
    },

    cloud_cover: {
      type: DataTypes.FLOAT,
      allowNull: false,
    },

    wind_speed: {
      type: DataTypes.FLOAT,
      allowNull: false,
    },

    precipitation: {
      type: DataTypes.FLOAT,
      allowNull: true,
    },

    air_pressure: {
      type: DataTypes.FLOAT,
      allowNull: true,
    },

    recorded_at: {
      type: DataTypes.DATE,
      allowNull: false,
    },
  },
  {
    indexes: [
      {
        fields: ["location_id", "recorded_at"],
      },
    ],
    tableName: "weather_data",
    timestamps: true,
    createdAt: "created_at",
    updatedAt: false,
  }
);

export default Weather;