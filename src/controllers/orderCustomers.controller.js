import OrderCustomerService from "../services/orderCustomers.service";

class OrderCustomersController {
  orderCustomerService = new OrderCustomerService();

  createOrderCustomer = async (req, res, next) => {
    const { customerId, orderItems } = req.body;
    try {
      const { orderId, totalPrice } =
        await this.orderCustomerService.createOrderCustomer(
          customerId,
          orderItems
        );
      res.status(201).json({ orderId, totalPrice });
    } catch (error) {
      console.log(error);

      res.status(401).json({ message: error.message });
    }
  };

  // 주문 완료 API
  completeOrder = async (req, res, next) => {
    const { id } = req.params;
    try {
      // 주문 완료 작업을 수행하는 서비스 메서드 호출
      const totalAmount = await this.orderCustomerService.completeOrder(id);

      res.status(200).json({ message: "주문완료처리되었습니다" });
    } catch (error) {
      console.log(error);
      res.status(400).json({ message: error.message });
    }
  };

  // 주문 취소 API
  cancelOrder = async (req, res, next) => {
    const { id } = req.params;
    try {
      await this.orderCustomerService.cancelOrder(id);

      res.status(200).json({ message: "주문이 취소되었습니다." });
    } catch (error) {
      console.log(error);
      res.status(400).json({ message: error.message });
    }
  };
}

export default OrderCustomersController;
