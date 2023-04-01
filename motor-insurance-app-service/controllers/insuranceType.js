import InsuranceType from "../models/InsuranceType.js";

export const createInsuranceType = async (req, res, next) => {
  const newInsuranceType = new InsuranceType(req.body);
  try {
    const savedInsuranceType = await newInsuranceType.save();
    res.status(200).json(savedInsuranceType);
  } catch (error) {
    next(error);
  }
};

export const updateInsuranceType = async (req, res, next) => {
  try {
    const updatedInsuranceType = await InsuranceType.findByIdAndUpdate(
      req.params.id,
      {
        $set: req.body,
      },
      { new: true }
    );
    res.status(200).json(updatedInsuranceType);
  } catch (error) {
    next(error);
  }
};
export const deleteInsuranceType = async (req, res, next) => {
  try {
    await InsuranceType.findByIdAndDelete(req.params.id);
    res.status(200).json("InsuranceType has been deleted!");
  } catch (error) {
    next(error);
  }
};

export const getInsuranceType = async (req, res, next) => {
  try {
    const InsuranceType = await InsuranceType.findById(req.params.id);
    res.status(200).json(InsuranceType);
  } catch (error) {
    next(error);
  }
};

export const getInsuranceTypes = async (req, res, next) => {
  try {
    const InsuranceTypes = await InsuranceType.find();

    res.status(200).json(InsuranceTypes);
  } catch (error) {
    next(error);
  }
};

//export default createInsuranceType;
