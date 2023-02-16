import UserType from "../models/user-type.model";
import { Request, Response } from "express";

export const createUserType = async (
  req: Request,
  res: Response,
  next: Function
) => {
  const newUserType = new UserType(req.body);
  try {
    const savedUserType = await newUserType.save();
    res.status(200).json(savedUserType);
  } catch (error) {
    next(error);
  }
};
export const updateUserType = async (
  req: Request,
  res: Response,
  next: Function
) => {
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
export const deleteUserType = async (
  req: Request,
  res: Response,
  next: Function
) => {
  try {
    await UserType.findByIdAndDelete(req.params.id);
    res.status(200).json("UserType has been deleted!");
  } catch (error) {
    next(error);
  }
};

export const getUserType = async (
  req: Request,
  res: Response,
  next: Function
) => {
  try {
    const userType = await UserType.findById(req.params.id);
    res.status(200).json(userType);
  } catch (error) {
    next(error);
  }
};

export const getUserTypeByName = async (
  req: Request,
  res: Response,
  next: Function
) => {
  try {
    const userType = await UserType.findOne({ type: req.params.type });
    res.status(200).json(userType);
  } catch (error) {
    next(error);
  }
};

export const getUserTypes = async (
  req: Request,
  res: Response,
  next: Function
) => {
  try {
    const UserTypes = await UserType.find();

    res.status(200).json(UserTypes);
  } catch (error) {
    next(error);
  }
};

//export default createUserType;
