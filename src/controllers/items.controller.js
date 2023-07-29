import ItemService from "../services/items.service";

class ItemsController {
  itemService = new ItemService();

  createItem = async (req, res, next) => {
    const { name, price, type, optionId } = req.body;
    try {
      const createItemData = await this.itemService.createItem(
        name,
        price,
        type,
        optionId
      );

      res.status(201).json({ data: createItemData });
    } catch (error) {
      res.status(401).json({ message: error.message });
    }
  };

  getItems = async (req, res, next) => {
    const items = await this.itemService.findAllItem();

    res.status(200).json({ data: items });
  };

  getItemsByType = async (req, res, next) => {
    const { type } = req.params;
    try {
      const itemsByType = await this.itemService.findItemsByType(type);
      res.status(200).json({ data: itemsByType });
    } catch (error) {
      res.status(401).json({ message: error.message });
    }
  };

  deleteItem = async (req, res, next) => {
    const { id } = req.params;
    const deleteItem = await this.itemService.deleteItem(id);

    res.status(200).json({ message: "상품 삭제 성공." });
  };

  updateItem = async (req, res, next) => {
    const { id } = req.params;
    const { name, price, type, optionId } = req.body;
    try {
      const updatedItem = await this.itemService.updateItem(
        id,
        name,
        price,
        type,
        optionId
      );
      res.status(200).json({ data: updatedItem });
    } catch (error) {
      res.status(401).json({ message: error.message });
    }
  };
}

export default ItemsController;
