import { ItemOrderCustomers } from "../db";

class ItemOrderCustomerRepository {
  createItemOrderCustomer = async (itemOrderCustomerData) => {
    const createdItemOrderCustomerData = await ItemOrderCustomers.create(
      itemOrderCustomerData
    );

    return createdItemOrderCustomerData;
  };

  getItemsByOrderCustomerId = async (id) => {
    const orderItems = await ItemOrderCustomers.findAll({
      where: { orderCustomerId: id },
    });
    return orderItems;
  };

  deleteItemOrderCustomersByOrderCustomerId = async (
    orderCustomerId,
    transaction
  ) => {
    await ItemOrderCustomers.destroy({
      where: { orderCustomerId },
      transaction,
    });
  };
}

export default ItemOrderCustomerRepository;
