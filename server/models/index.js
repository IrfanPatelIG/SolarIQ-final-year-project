import sequelize from "../config/db.js";

import Location from "./locationModel.js";
import Panel from "./panelModel.js";

// 🔗 Associations
Location.hasMany(Panel, {
  foreignKey: "location_id",
});

Panel.belongsTo(Location, {
  foreignKey: "location_id",
});

export { sequelize, Location, Panel };