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

export const createInsuranceCompanyRatings = async (req, res, next) => {
  //  first delete exsisting records and save them all as new
  let rates = req.body;

  console.log("rates are ", rates);

  // delete all rates
  let ratingDeleted = await InsuranceCompanyRating.deleteMany({
    insuranceCompany: rates[0]?.insuranceCompany,
  });

  // create insurance company rating
  const newInsuranceCompanyRating = new InsuranceCompanyRating(req.body);
  try {
    const savedInsuranceCompanyRating = await InsuranceCompanyRating.insertMany(
      req.body
    );
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

export const getInsuranceCompanyRatingsByCompany = async (req, res, next) => {
  try {
    const InsuranceCompanyRatings = await InsuranceCompanyRating.find({
      insuranceCompany: req?.params?.id,
    })
      .populate("insuranceCompany")
      .populate("question")
      .select("insuranceCompany question rate");

    res.status(200).json(InsuranceCompanyRatings);
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
