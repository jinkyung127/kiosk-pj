import OptionService from "../services/options.service";

class OptionsController {
  optionService = new OptionService();

  createOption = async (req, res, next) => {
    const { extra_price, shot_price, hot } = req.body;
    try {
      const createOptionData = await this.optionService.createOption(
        extra_price,
        shot_price,
        hot
      );

      res.status(201).json({ data: createOptionData });
    } catch (error) {
      res.status(401).json({ message: error.message });
    }
  };

  deleteOption = async (req, res, next) => {
    try {
      const { id } = req.params;
      const deleteOption = await this.optionService.deleteOption(id);

      res.status(200).json({ message: "옵션 삭제 성공." });
    } catch (error) {
      res.status(401).json({ message: error.message });
    }
  };
}

export default OptionsController;
