import { Items } from "../db";

class ItemRepository {
  createItem = async (name, price, type, optionId) => {
    const createItemData = await Items.create({
      name,
      price,
      type,
      optionId,
    });

    return createItemData;
  };

  findAllItem = async () => {
    const allItems = await Items.findAll();

    return allItems;
  };

  findAllByType = async (type) => {
    const items = await Items.findAll({ where: { type: type } });
    return items;
  };

  findItemById = async (id) => {
    const item = await Items.findByPk(id);

    return item;
  };

  deleteItem = async (id) => {
    const deleteItemData = await Items.destroy({
      where: { id },
    });

    return deleteItemData;
  };

  updateItem = async (id, name, price, type, optionId) => {
    const updateItemData = await Items.update(
      { name, price, type, optionId },
      { where: { id: Number(id) } }
    );

    return updateItemData;
  };

  updateItemAmount = async (itemId, amount) => {
    const item = await Items.findOne({ where: { id: itemId } });

    if (!item) {
      throw new Error("해당하는 상품이 없습니다");
    }

    // 현재 수량에 추가 발주량을 더하여 업데이트
    const updatedAmount = item.amount + amount;
    await Items.update({ amount: updatedAmount }, { where: { id: itemId } });
  };

  cancelItemAmount = async (itemId, amount) => {
    const item = await Items.findOne({ where: { id: itemId } });

    if (!item) {
      throw new Error("해당하는 상품이 없습니다");
    }

    // 현재 수량에서 발주량만큼 차감하여 업데이트
    const updatedAmount = item.amount - amount;
    if (item.amount < amount) {
      throw new Error("재고가 부족해 발주를 취소할 수 없습니다");
    } else {
      await Items.update({ amount: updatedAmount }, { where: { id: itemId } });
    }
  };
}

export default ItemRepository;
