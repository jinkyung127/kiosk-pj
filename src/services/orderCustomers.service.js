import OrderCustomerRepository from "../repositories/orderCustomers.repository";
import ItemOrderCustomerRepository from "../repositories/itemOrderCustomers.repository";
import ItemRepository from "../repositories/items.repository";
import OptionRepository from "../repositories/options.repository";

import { Items, Options } from "../db";
import { sequelize } from "../db";

class OrderCustomerService {
  orderCustomerRepository = new OrderCustomerRepository();
  itemOrderCustomerRepository = new ItemOrderCustomerRepository();
  itemRepository = new ItemRepository();
  optionRepository = new OptionRepository();

  createOrderCustomer = async (customerId, orderItems) => {
    let totalAmount = 0;
    const createdOrderCustomer =
      await this.orderCustomerRepository.createOrderCustomer();

    for (const orderItem of orderItems) {
      const { itemId, amount, optionChoices } = orderItem;

      const item = await Items.findByPk(itemId, { include: [Options] });

      if (!item) {
        throw new Error("해당하는 상품이 없습니다.");
      }

      // 기본 상품 가격
      let itemPrice = item.price * amount;

      // 옵션 가격 추가
      let optionPrice = 0;
      if (optionChoices && optionChoices.length > 0) {
        for (const optionChoice of optionChoices) {
          switch (optionChoice) {
            case "extra_price":
              optionPrice += item.Option.extra_price;
              break;
            case "shot_price":
              optionPrice += item.Option.shot_price;
              break;
            default:
              break;
          }
        }
      }

      totalAmount += itemPrice + optionPrice;

      const itemOrderCustomerData = {
        itemId: itemId,
        orderCustomerId: createdOrderCustomer.id,
        amount: amount,
        optionChoices: optionChoices,
      };

      await this.itemOrderCustomerRepository.createItemOrderCustomer(
        itemOrderCustomerData
      );
    }

    return { orderId: createdOrderCustomer.id, totalPrice: totalAmount };
  };

  // 주문 완료 메서드
  completeOrder = async (id) => {
    // 주문 정보 가져오기
    const orderCustomer =
      await this.orderCustomerRepository.getOrderCustomerById(id);
    console.log(orderCustomer);

    // 이미 주문이 완료된 경우 에러 발생
    if (orderCustomer.state === true) {
      throw new Error("이미완료처리된 주문입니다");
    }
    // 트랜잭션 시작
    const t = await sequelize.transaction();

    try {
      // order_customer의 상태를 true로 업데이트
      await this.orderCustomerRepository.updateOrderCustomerState(id, t);

      // 주문한 상품들의 재고 감소 작업
      // 주문 고객과 관련된 주문 상품들을 가져옴
      const orderItems =
        await this.itemOrderCustomerRepository.getItemsByOrderCustomerId(id);

      // 상품 수량 업데이트 및 트랜잭션 커밋
      for (const orderItem of orderItems) {
        const { itemId, amount } = orderItem;

        await this.itemRepository.updateItemAmount(itemId, -amount, t);
      }

      // 트랜잭션 커밋
      await t.commit();

      return "주문완료처리되었습니다";
    } catch (error) {
      // 트랜잭션 롤백
      await t.rollback();
      throw error;
    }
  };

  cancelOrder = async (id) => {
    const orderCustomer =
      await this.orderCustomerRepository.getOrderCustomerById(id);

    if (orderCustomer.state === true) {
      throw new Error("완료된 주문은 취소할 수 없습니다.");
    }

    const t = await sequelize.transaction();

    try {
      const orderItems =
        await this.itemOrderCustomerRepository.getItemsByOrderCustomerId(id);

      await this.itemOrderCustomerRepository.deleteItemOrderCustomersByOrderCustomerId(
        id,
        t
      );

      await this.orderCustomerRepository.deleteOrderCustomer(id, t);

      await t.commit();

      return "주문이 취소되었습니다.";
    } catch (error) {
      await t.rollback();
      throw error;
    }
  };
}

export default OrderCustomerService;
