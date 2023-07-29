import Items from "../models/items";
import OrderItems from "../models/orderitems";

export default () => {
  OrderItems.belongsTo(Items, {
    targetKey: "id",
    foreignKey: "itemId",
  });
};
