import { DataTypes } from "sequelize";
import sequelize from "../config/db.js";

const Forecast = sequelize.define(
  "Forecast",
  {
    forecast_id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },

    forecast_date: {
      type: DataTypes.DATEONLY,
      allowNull: false,
    },

    predicted_energy_kwh: {
      type: DataTypes.FLOAT,
      allowNull: false,
    },

    model_version: {
      type: DataTypes.STRING,
      allowNull: true, // optional for now
      defaultValue: "v1",
    },
  },
  {
    indexes: [
      {
        fields: ["panel_id", "forecast_date"],
      },
    ],
    tableName: "forecasted_values",
    timestamps: true, // gives createdAt
    createdAt: "created_at",
    updatedAt: false, // we don't need updatedAt
  }
);

export default Forecast;