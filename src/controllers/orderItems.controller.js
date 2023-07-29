import OrderItemService from "../services/orderItems.service";

class OrderItemsController {
  orderItemService = new OrderItemService();

  createOrderItem = async (req, res, next) => {
    const { itemId, amount, state } = req.body;
    try {
      const createOrderItemData = await this.orderItemService.createOrderItem(
        itemId,
        amount,
        state
      );

      res.status(201).json({ data: createOrderItemData });
    } catch (error) {
      res.status(401).json({ message: error.message });
    }
  };

  updateOrderItem = async (req, res, next) => {
    const { id } = req.params;
    const { state } = req.body;
    try {
      const updatedOrderItem = await this.orderItemService.updateOrderItem(
        id,
        state
      );
      res.status(200).json({ data: updatedOrderItem });
    } catch (error) {
      res.status(401).json({ message: error.message });
    }
  };
}

export default OrderItemsController;
