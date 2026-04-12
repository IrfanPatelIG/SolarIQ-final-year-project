import sequelize from "../config/db.js";

import Location from "./locationModel.js";
import Panel from "./panelModel.js";
import Forecast from "./forecastModel.js";
import Weather from "./weatherModel.js";

// 🔗 RELATIONS

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