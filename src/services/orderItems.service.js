import OrderItemRepository from "../repositories/orderItems.repository";
import ItemRepository from "../repositories/items.repository";
import { sequelize } from "../db";

class OrderItemService {
  orderItemRepository = new OrderItemRepository();
  itemRepository = new ItemRepository();

  createOrderItem = async (itemId, amount, state) => {
    const createOrderItemData = await this.orderItemRepository.createOrderItem(
      itemId,
      amount,
      state
    );

    return createOrderItemData;
  };

  updateOrderItem = async (id, state) => {
    const orderitem = await this.orderItemRepository.findOrderItemById(id);
    const prevState = orderitem.state;

    if (prevState === "0" && state === "1") {
      return this.orderItemRepository.updateOrderItem(id, state);
    } else if ((prevState === "0" || prevState === "1") && state === "3") {
      return this.orderItemRepository.updateOrderItem(id, state);
    } else if ((prevState === "0" || prevState === "1") && state === "2") {
      const t = await sequelize.transaction();
      try {
        // 발주 정보 업데이트
        await this.orderItemRepository.updateOrderItem(id, state, {
          transaction: t,
        });

        // 발주 정보 조회
        const updatedOrderItem =
          await this.orderItemRepository.findOrderItemById(id, {
            transaction: t,
          });

        // 상품의 수량 업데이트
        await this.itemRepository.updateItemAmount(
          updatedOrderItem.itemId,
          updatedOrderItem.amount,
          { transaction: t }
        );

        await t.commit();
        return updatedOrderItem;
      } catch (error) {
        await t.rollback();
        throw error;
      }
    } else if (
      prevState === "2" &&
      (state === "3" || state === "1" || state === "0")
    ) {
      const t = await sequelize.transaction();
      try {
        // 발주 정보 업데이트
        await this.orderItemRepository.updateOrderItem(id, state, {
          transaction: t,
        });

        // 발주 정보 조회
        const updatedOrderItem =
          await this.orderItemRepository.findOrderItemById(id, {
            transaction: t,
          });

        // 상품의 수량 업데이트
        await this.itemRepository.cancelItemAmount(
          updatedOrderItem.itemId,
          updatedOrderItem.amount,
          { transaction: t }
        );

        await t.commit();
        return updatedOrderItem;
      } catch (error) {
        await t.rollback();
        throw error;
      }
    } else {
      // 다른 상태일 경우 그냥 발주 정보만 업데이트
      return this.orderItemRepository.updateOrderItem(id, state);
    }
  };
}

export default OrderItemService;
