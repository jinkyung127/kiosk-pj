import { Model, DataTypes } from "sequelize";
import sequelize from "../sequelize";

class Options extends Model {}

Options.init(
  {
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: DataTypes.INTEGER,
    },
    extra_price: {
      allowNull: true,
      type: DataTypes.INTEGER,
    },
    shot_price: {
      allowNull: true,
      type: DataTypes.INTEGER,
    },
    hot: {
      allowNull: true,
      type: DataTypes.BOOLEAN,
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
    modelName: "Options",
  }
);

export default Options;
