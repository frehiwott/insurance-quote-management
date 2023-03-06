import InsuranceBranchEmployees from "../models/InsuranceBranchEmployees.js";

export const createInsuranceBranchEmployees = async (req, res, next) => {
  const newInsuranceBranchEmployees = new InsuranceBranchEmployees(req.body);
  try {
    const savedInsuranceBranchEmployees =
      await newInsuranceBranchEmployees.save();
    res.status(200).json(savedInsuranceBranchEmployees);
  } catch (error) {
    next(error);
  }
};
export const updateInsuranceBranchEmployees = async (req, res, next) => {
  try {
    const updatedInsuranceBranchEmployees =
      await InsuranceBranchEmployees.findByIdAndUpdate(
        req.params.id,
        {
          $set: req.body,
        },
        { new: true }
      );
    res.status(200).json(updatedInsuranceBranchEmployees);
  } catch (error) {
    next(error);
  }
};
export const deleteInsuranceBranchEmployees = async (req, res, next) => {
  try {
    await InsuranceBranchEmployees.findByIdAndDelete(req.params.id);
    res.status(200).json("InsuranceBranchEmployees has been deleted!");
  } catch (error) {
    next(error);
  }
};

export const getInsuranceBranchEmployees = async (req, res, next) => {
  try {
    const InsuranceBranchEmployees = await InsuranceBranchEmployees.findById(
      req.params.id
    );
    res.status(200).json(InsuranceBranchEmployees);
  } catch (error) {
    next(error);
  }
};

export const getAllInsuranceBranchEmployees = async (req, res, next) => {
  try {
    const InsuranceBranchEmployeess = await InsuranceBranchEmployees.find()
      .populate("insuranceCompany")
      .select("name location insuranceCompany");

    res.status(200).json(InsuranceBranchEmployeess);
  } catch (error) {
    next(error);
  }
};

export const getInsuranceBranchEmployeesByparentId = async (
  req,
  res,
  next
) => {
  try {
    const InsuranceBranchEmployeess = await InsuranceBranchEmployees.find({
      insuranceCompany: req.params.id,
    })
      .populate("insuranceCompany")
      .populate("user")
      .select("user insuranceCompany");

    res.status(200).json(InsuranceBranchEmployeess);
  } catch (error) {
    next(error);
  }
};

//export default createInsuranceBranchEmployees;
