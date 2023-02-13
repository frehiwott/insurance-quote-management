import Role from "../models/Role.js";

export const createRole = async (req, res, next) => {
  const newRole = new Role(req.body);
  try {
    const savedRole = await newRole.save();
    res.status(200).json(savedRole);
  } catch (error) {
    next(error);
  }
};
export const updateRole = async (req, res, next) => {
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
export const deleteRole = async (req, res, next) => {
  try {
    await Role.findByIdAndDelete(req.params.id);
    res.status(200).json("Role has been deleted!");
  } catch (error) {
    next(error);
  }
};

export const getRole = async (req, res, next) => {
  try {
    const Role = await Role.findById(req.params.id);
    res.status(200).json(Role);
  } catch (error) {
    next(error);
  }
};

export const getRoles = async (req, res, next) => {
  try {
    const Roles = await Role.find();

    res.status(200).json(Roles);
  } catch (error) {
    next(error);
  }
};

//export default createRole;
