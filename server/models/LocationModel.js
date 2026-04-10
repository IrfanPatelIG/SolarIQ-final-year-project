import { DataTypes } from "sequelize";
import sequelize from "../config/db.js";
import Panel from "./panelModel.js";

const Location = sequelize.define(
  "Location",
  {
    location_id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    latitude: {
      type: DataTypes.FLOAT,
      allowNull: false,
    },
    longitude: {
      type: DataTypes.FLOAT,
      allowNull: false,
    },
    city: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    state: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    country: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    timezone: {
      type: DataTypes.STRING,
      allowNull: true,
    }
  },
  {
    tableName: "location_data",
    timestamps: true,
  }
);

export default Location;