import InsuranceCompanyRating from "../models/InsuranceCompanyRating.js";

export const createInsuranceCompanyRating = async (req, res, next) => {
  const newInsuranceCompanyRating = new InsuranceCompanyRating(req.body);
  try {
    const savedInsuranceCompanyRating = await newInsuranceCompanyRating.save();
    res.status(200).json(savedInsuranceCompanyRating);
  } catch (error) {
    next(error);
  }
};
export const updateInsuranceCompanyRating = async (req, res, next) => {
  try {
    const updatedInsuranceCompanyRating =
      await InsuranceCompanyRating.findByIdAndUpdate(
        req.params.id,
        {
          $set: req.body,
        },
        { new: true }
      );
    res.status(200).json(updatedInsuranceCompanyRating);
  } catch (error) {
    next(error);
  }
};
export const deleteInsuranceCompanyRating = async (req, res, next) => {
  try {
    await Insuarnce.findByIdAndDelete(req.params.id);
    res.status(200).json("InsuranceCompanyRating has been deleted!");
  } catch (error) {
    next(error);
  }
};

export const getInsuranceCompanyRating = async (req, res, next) => {
  try {
    const InsuranceCompanyRating = await InsuranceCompanyRating.findById(
      req.params.id
    );
    res.status(200).json(InsuranceCompanyRating);
  } catch (error) {
    next(error);
  }
};

export const getInsuranceCompanyRatings = async (req, res, next) => {
  try {
    const InsuranceCompanyRatings = await InsuranceCompanyRating.find()
      .populate("insuranceCompany")
      .populate("question")
      .select("insuranceCompany question rate");

    res.status(200).json(InsuranceCompanyRatings);
  } catch (error) {
    next(error);
  }
};
