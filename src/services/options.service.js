import OptionRepository from "../repositories/options.repository";
import { Options } from "../db";

class OptionService {
  optionRepository = new OptionRepository();

  createOption = async (extra_price, shot_price, hot) => {
    const createOptionData = await this.optionRepository.createOption(
      extra_price,
      shot_price,
      hot
    );
    return createOptionData;
  };

  getAllOptions = async (req, res) => {
    try {
      const options = await Options.findAll(); // Sequelize 모델을 통해 모든 옵션 데이터를 가져옴
      return options;
    } catch (error) {
      console.log(error);

      // res.status(500).json({ message: "서버 에러" });
    }
  };

  deleteOption = async (id) => {
    await this.optionRepository.deleteOption(id);
    return true;
  };
}

export default OptionService;
