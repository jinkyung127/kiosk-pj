import { Model, DataTypes } from "sequelize";
import sequelize from "../sequelize";

const orderItemState = {
  ORDERED: "0",
  PENDING: "1",
  COMPLETED: "2",
  CANCELED: "3",
};

class OrderItems extends Model {}

OrderItems.init(
  {
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: DataTypes.INTEGER,
    },
    itemId: {
      allowNull: false,
      type: DataTypes.INTEGER,
    },
    amount: {
      allowNull: false,
      type: DataTypes.INTEGER,
    },
    state: {
      allowNull: false,
      type: DataTypes.ENUM(Object.values(orderItemState)),
      defaultValue: orderItemState.ORDERED,
    },
    createdAt: {
      allowNull: false,
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW,
    },
    updatedAt: {
      allowNull: false,
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW,
    },
  },
  {
    sequelize,
    modelName: "OrderItems",
  }
);

export default OrderItems;
