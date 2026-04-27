import { DataTypes } from "sequelize";
import sequelize from "../config/db.js";

const Panel = sequelize.define(
  "Panel",
  {
    panel_id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    area: {
      type: DataTypes.FLOAT,
      allowNull: false,
    },
    tilt: {
      type: DataTypes.FLOAT,
      allowNull: false,
    },
    orientation: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    installation_date: {
      type: DataTypes.DATE,
      allowNull: true, // important
    },
    user_id: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
  },
  {
    tableName: "panel_configs",
    timestamps: true,
  }
);

export default Panel;
