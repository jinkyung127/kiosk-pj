import Items from "../models/items";
import OrderCustomers from "../models/ordercustomers";
import ItemOrderCustomers from "../models/itemordercustomers";

export default () => {
  ItemOrderCustomers.belongsTo(Items, {
    targetKey: "id",
    foreignKey: "itemId",
  });

  ItemOrderCustomers.belongsTo(OrderCustomers, {
    targetKey: "id",
    foreignKey: "orderCustomerId",
  });
};
