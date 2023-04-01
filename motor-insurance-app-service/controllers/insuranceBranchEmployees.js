import {
  fetchRoleByName,
  fetchUserById,
  updateUser,
} from "../external-api/user-management.api.js";
import InsuranceBranchEmployees from "../models/InsuranceBranchEmployees.js";

export const createInsuranceBranchEmployees = async (req, res, next) => {
  const newInsuranceBranchEmployees = new InsuranceBranchEmployees(req.body);
  try {
    // first find the user
    let user = await fetchUserById(req?.body?.user);

    console.log("user is ", user);

    // if the user does not exist
    if (!user) {
      console.log("user could not be found");
      res.status(409).json("user could not be found");
    }

    const savedInsuranceBranchEmployees =
      await newInsuranceBranchEmployees.save();

    console.log("saved instance ", savedInsuranceBranchEmployees);

    // fetch role by name
    let roleByName = await fetchRoleByName("branch_manager");

    console.log("role by name is ", roleByName);

    user.role = roleByName;

    // after creating the insurance branch employee .. update the role to branch manager
    let updatedUser = await updateUser(user);

    console.log("under updated user ", updatedUser);

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
    const insuranceBranchEmployees = await InsuranceBranchEmployees.find()
      .populate("insuranceBranch")
      .select("user insuranceBranch");

    let emps = []; // to keep track of insurance employees

    //  iterate over the result and populate user
    for (let i = 0; i < insuranceBranchEmployees?.length; i++) {
      if (insuranceBranchEmployees[i]?.user) {
        let user = await fetchUserById(insuranceBranchEmployees[i]?.user);

        emps.push({
          user: user,
          insuranceBranch: insuranceBranchEmployees[i]?.insuranceBranch,
        });
      }
    }

    console.log("insuranceBranchEmployees ", insuranceBranchEmployees);

    res.status(200).json(emps);
  } catch (error) {
    next(error);
  }
};

export const getInsuranceBranchEmployeesByparentId = async (req, res, next) => {
  try {
    console.log("under get insurance employees ....");
    const insuranceBranchEmployees = await InsuranceBranchEmployees.find({
      insuranceCompany: req.params.id,
    })
      .populate("insuranceBranch")
      .select("insuranceBranch user");

    let emps = []; // to keep track of insurance employees

    //  iterate over the result and populate user
    for (let i = 0; i < insuranceBranchEmployees?.length; i++) {
      if (insuranceBranchEmployees[i]?.user) {
        let user = await fetchUserById(insuranceBranchEmployees[i]?.user);

        emps.push({
          user: user,
          insuranceBranch: insuranceBranchEmployees[i]?.insuranceBranch,
        });
      }
    }
    console.log(emps);

    res.status(200).json(emps);
  } catch (error) {
    next(error);
  }
};

//export default createInsuranceBranchEmployees;
