import InsuranceBranch from "../models/InsuranceBranch.js";

export const createInsuranceBranch = async (req, res, next) => {

  console.log("under insurance branch")
  const newInsuranceBranch = new InsuranceBranch(req.body);
  try {
    const savedInsuranceBranch = await newInsuranceBranch.save();
    res.status(200).json(savedInsuranceBranch);
  } catch (error) {
    next(error);
  }
};
export const updateInsuranceBranch = async (req, res, next) => {
  try {
    const updatedInsuranceBranch = await InsuranceBranch.findByIdAndUpdate(
      req.params.id,
      {
        $set: req.body,
      },
      { new: true }
    );
    res.status(200).json(updatedInsuranceBranch);
  } catch (error) {
    next(error);
  }
};
export const deleteInsuranceBranch = async (req, res, next) => {
  try {
    await InsuranceBranch.findByIdAndDelete(req.params.id);
    res.status(200).json("InsuranceBranch has been deleted!");
  } catch (error) {
    next(error);
  }
};

export const getInsuranceBranch = async (req, res, next) => {
  try {
    const InsuranceBranch = await InsuranceBranch.findById(req.params.id);
    res.status(200).json(InsuranceBranch);
  } catch (error) {
    next(error);
  }
};

export const getInsuranceBranches = async (req, res, next) => {
  try {
    const InsuranceBranches = await InsuranceBranch.find()
      .populate("insuranceCompany")
      .select("name location insuranceCompany");

    res.status(200).json(InsuranceBranches);
  } catch (error) {
    next(error);
  }
};

export const getInsuranceBranchesByCompany = async (req, res, next) => {
  try {
    const InsuranceBranches = await InsuranceBranch.find({insuranceCompany: req.params.id})
      .populate("insuranceCompany")
      .select("name location insuranceCompany");

    res.status(200).json(InsuranceBranches);
  } catch (error) {
    next(error);
  }
};

export const getInsuranceBranchesByparentId = async (req, res, next) => {
  try {
    const InsuranceBranches = await InsuranceBranch.find({
      insuranceCompany: req.params.id,
    })
      .populate("insuranceCompany")
      .select("name location insuranceCompany");

    res.status(200).json(InsuranceBranches);
  } catch (error) {
    next(error);
  }
};

//export default createInsuranceBranch;
