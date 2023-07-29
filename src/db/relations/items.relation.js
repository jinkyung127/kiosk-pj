import Items from "../models/items";
import OrderItems from "../models/orderitems";
import ItemOrderCustomers from "../models/itemordercustomers";
import Options from "../models/options";

export default () => {
  Items.hasMany(OrderItems, {
    sourceKey: "id",
    foreignKey: "itemId",
  });

  Items.hasMany(ItemOrderCustomers, {
    sourceKey: "id",
    foreignKey: "itemId",
  });

  Items.belongsTo(Options, {
    targetKey: "id",
    foreignKey: "optionId",
  });
};
