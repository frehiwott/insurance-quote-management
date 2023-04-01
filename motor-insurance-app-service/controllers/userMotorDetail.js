import UserMotorDetail from "../models/UserMotorDetail.js";

export const createUserMotorDetail = async (req, res, next) => {
  const newUserMotorDetail = new UserMotorDetail(req.body);
  try {
    const savedUserMotorDetail = await newUserMotorDetail.save();
    res.status(200).json(savedUserMotorDetail);
  } catch (error) {
    next(error);
  }
};
export const updateUserMotorDetail = async (req, res, next) => {
  try {
    const updatedUserMotorDetail = await UserMotorDetail.findByIdAndUpdate(
      req.params.id,
      {
        $set: req.body,
      },
      { new: true }
    );
    res.status(200).json(updatedUserMotorDetail);
  } catch (error) {
    next(error);
  }
};
export const deleteUserMotorDetail = async (req, res, next) => {
  try {
    await UserMotorDetail.findByIdAndDelete(req.params.id);
    res.status(200).json("UserMotorDetail has been deleted!");
  } catch (error) {
    next(error);
  }
};

export const getUserMotorDetail = async (req, res, next) => {
  try {
    const UserMotorDetail = await UserMotorDetail.findById(req.params.id);
    res.status(200).json(UserMotorDetail);
  } catch (error) {
    next(error);
  }
};

export const getUserMotorDetails = async (req, res, next) => {
  try {
    const UserMotorDetails = await UserMotorDetail.find()
      .select("model price dateOfManufacturing user_id");

    res.status(200).json(UserMotorDetails);
  } catch (error) {
    next(error);
  }
};
