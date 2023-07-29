import sequelize from "./sequelize";
import Items from "./models/items";
import OrderItems from "./models/orderitems";
import OrderCustomers from "./models/ordercustomers";
import ItemOrderCustomers from "./models/itemordercustomers";
import Options from "./models/options";

import relations from "./relations";

Object.values(relations).forEach((relationsFunction) => {
  relationsFunction();
});

export {
  sequelize,
  Items,
  OrderItems,
  OrderCustomers,
  ItemOrderCustomers,
  Options,
};
