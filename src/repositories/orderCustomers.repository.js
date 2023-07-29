import { OrderCustomers } from "../db";

class OrderCustomerRepository {
  createOrderCustomer = async (state) => {
    const createOrderCustomerData = await OrderCustomers.create({
      state,
    });

    return createOrderCustomerData;
  };

  getOrderCustomerById = async (id) => {
    const orderCustomer = await OrderCustomers.findOne({ where: { id } });
    if (!orderCustomer) {
      throw new Error("해당하는 주문이 없습니다.");
    }
    return orderCustomer;
  };

  // 주문 사용자의 상태(state)를 업데이트하는 메서드
  updateOrderCustomerState = async (id, transaction) => {
    await OrderCustomers.update(
      { state: true },
      { where: { id }, transaction }
    );
  };

  deleteOrderCustomer = async (id, transaction) => {
    await OrderCustomers.destroy({
      where: { id },
      transaction,
    });
  };
}

export default OrderCustomerRepository;
