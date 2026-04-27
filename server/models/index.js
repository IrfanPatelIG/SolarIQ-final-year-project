import sequelize from "../config/db.js";

import User from "./userModel.js";
import Location from "./LocationModel.js";
import Panel from "./panelModel.js";
import Forecast from "./forecastModel.js";
import Weather from "./weatherModel.js";

// 🔗 RELATIONS

// User → Location
User.hasMany(Location, { foreignKey: "user_id" });
Location.belongsTo(User, { foreignKey: "user_id" });

// User → Panel (optional but required for faster queries for future plan)
User.hasMany(Panel, { foreignKey: "user_id" });
Panel.belongsTo(User, { foreignKey: "user_id" });

// Location → Panel
Location.hasMany(Panel, {
  foreignKey: "location_id",
});
Panel.belongsTo(Location, {
  foreignKey: "location_id",
});

// Location → Forecast
Location.hasMany(Forecast, {
  foreignKey: "location_id",
});
Forecast.belongsTo(Location, {
  foreignKey: "location_id",
});

// Location → Weather
Location.hasMany(Weather, {
  foreignKey: "location_id",
});
Weather.belongsTo(Location, {
  foreignKey: "location_id",
});

// Panel → Forecast
Panel.hasMany(Forecast, {
  foreignKey: "panel_id",
});
Forecast.belongsTo(Panel, {
  foreignKey: "panel_id",
});

export { sequelize, Location, Panel, Weather, Forecast };
