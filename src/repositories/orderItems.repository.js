import { OrderItems } from "../db";

class OrderItemRepository {
  createOrderItem = async (itemId, amount, state) => {
    const createOrderItemData = await OrderItems.create({
      itemId,
      amount,
      state,
    });

    return createOrderItemData;
  };

  findOrderItemById = async (id) => {
    const OrderItem = await OrderItems.findByPk(id);

    return OrderItem;
  };

  updateOrderItem = async (id, state) => {
    const updateOrderItemData = await OrderItems.update(
      { state },
      { where: { id: Number(id) } }
    );

    return updateOrderItemData;
  };
}

export default OrderItemRepository;
