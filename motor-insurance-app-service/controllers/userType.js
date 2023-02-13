import UserType from "../models/UserType.js";

export const createUserType = async (req, res, next) => {
  const newUserType = new UserType(req.body);
  try {
    const savedUserType = await newUserType.save();
    res.status(200).json(savedUserType);
  } catch (error) {
    next(error);
  }
};
export const updateUserType = async (req, res, next) => {
  try {
    const updatedUserType = await UserType.findByIdAndUpdate(
      req.params.id,
      {
        $set: req.body,
      },
      { new: true }
    );
    res.status(200).json(updatedUserType);
  } catch (error) {
    next(error);
  }
};
export const deleteUserType = async (req, res, next) => {
  try {
    await UserType.findByIdAndDelete(req.params.id);
    res.status(200).json("UserType has been deleted!");
  } catch (error) {
    next(error);
  }
};

export const getUserType = async (req, res, next) => {
  try {
    const UserType = await UserType.findById(req.params.id);
    res.status(200).json(UserType);
  } catch (error) {
    next(error);
  }
};

export const getUserTypes = async (req, res, next) => {
  try {
    const UserTypes = await UserType.find();

    res.status(200).json(UserTypes);
  } catch (error) {
    next(error);
  }
};

//export default createUserType;
