import ItemOrderCustomers from "../models/itemordercustomers";
import OrderCustomers from "../models/ordercustomers";

export default () => {
  OrderCustomers.hasMany(ItemOrderCustomers, {
    sourceKey: "id",
    foreignKey: "orderCustomerId",
  });
};
