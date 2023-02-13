import InsuranceCompany from "../models/InsuranceCompany.js";

export const createInsuranceCompany = async (req, res, next) => {
  const newInsuranceCompany = new InsuranceCompany(req.body);

  try {
    const savedInsuranceCompany = await newInsuranceCompany.save();
    res.status(200).json(savedInsuranceCompany);
  } catch (error) {
    next(error);
  }
};
export const updateInsuranceCompany = async (req, res, next) => {
  try {
    const updatedInsuranceCompany = await InsuranceCompany.findByIdAndUpdate(
      req.params.id,
      {
        $set: req.body,
      },
      { new: true }
    );
    res.status(200).json(updatedInsuranceCompany);
  } catch (error) {
    next(error);
  }
};
export const deleteInsuranceCompany = async (req, res, next) => {
  try {
    await Insuarnce.findByIdAndDelete(req.params.id);
    res.status(200).json("InsuranceCompany has been deleted!");
  } catch (error) {
    next(error);
  }
};

export const getInsuranceCompany = async (req, res, next) => {
  try {
    const InsuranceCompany = await InsuranceCompany.findById(req.params.id);
    res.status(200).json(InsuranceCompany);
  } catch (error) {
    next(error);
  }
};

export const getInsuranceCompanys = async (req, res, next) => {
  try {
    const InsuranceCompanys = await InsuranceCompany.find();

    res.status(200).json(InsuranceCompanys);
  } catch (error) {
    next(error);
  }
};
