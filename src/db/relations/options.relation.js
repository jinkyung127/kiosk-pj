import Options from "../models/options";
import Items from "../models/items";

export default () => {
  Options.hasMany(Items, {
    sourceKey: "id",
    foreignKey: "optionId",
  });
};
