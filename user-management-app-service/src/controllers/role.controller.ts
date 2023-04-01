import Role from "../models/role.model";
import { Request, Response } from "express";

export const createRole = async (
  req: Request,
  res: Response,
  next: Function
) => {
  const newRole = new Role(req.body);
  try {
    const savedRole = await newRole.save();
    res.status(200).json(savedRole);
  } catch (error) {
    next(error);
  }
};
export const updateRole = async (
  req: Request,
  res: Response,
  next: Function
) => {
  try {
    const updatedRole = await Role.findByIdAndUpdate(
      req.params.id,
      {
        $set: req.body,
      },
      { new: true }
    );
    res.status(200).json(updatedRole);
  } catch (error) {
    next(error);
  }
};
export const deleteRole = async (
  req: Request,
  res: Response,
  next: Function
) => {
  try {
    await Role.findByIdAndDelete(req.params.id);
    res.status(200).json("Role has been deleted!");
  } catch (error) {
    next(error);
  }
};

export const getRole = async (req: Request, res: Response, next: Function) => {
  try {
    const role = await Role.findById(req.params.id);
    res.status(200).json(Role);
  } catch (error) {
    next(error);
  }
};

export const getRoleByName = async (
  req: Request,
  res: Response,
  next: Function
) => {
  try {
    const role = await Role.find({ name: req.params.name });
    res.status(200).json(role?.length ? role[0] : "");
  } catch (error) {
    next(error);
  }
};

export const getRoles = async (req: Request, res: Response, next: Function) => {
  try {
    const Roles = await Role.find();

    res.status(200).json(Roles);
  } catch (error) {
    next(error);
  }
};

//export default createRole;
