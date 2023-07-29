import { Options } from "../db";

class OptionRepository {
  createOption = async (extra_price, shot_price, hot) => {
    const createOptionData = await Options.create({
      extra_price,
      shot_price,
      hot,
    });

    return createOptionData;
  };

  deleteOption = async (id) => {
    const deleteOptionData = await Options.destroy({
      where: { id },
    });

    return deleteOptionData;
  };

  getOptionById = async (optionId) => {
    const option = await Options.findByPk(optionId);
    return option;
  };
}

export default OptionRepository;
