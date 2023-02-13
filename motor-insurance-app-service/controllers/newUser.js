import NewUser from "../models/NewUser.js";
import bcrypt from "bcrypt";

export const createNewUser = async (req, res, next) => {
  const newUser = new NewUser(req.body);

  if (!newUser.username || !newUser.password)
    return res
      .status(400)
      .json({ message: "Username and password are required" });

  // check for dublicate username in db
  const duplicate = await NewUser.findOne({ username: newUser?.username });

  if (duplicate) return res.sendStatus(409);

  try {
    // encrypt the password
    const hashedPassword = await bcrypt.hash(newUser?.password, 10);

    newUser.password = hashedPassword;

    const savedNewUser = await newUser.save();
    res.status(200).json(savedNewUser);
  } catch (error) {
    next(error);
  }
};

// update new user
export const updateNewUser = async (req, res, next) => {
  try {
    const updatedNewUser = await NewUser.findByIdAndUpdate(
      req.params.id,
      {
        $set: req.body,
      },
      { new: true }
    );
    res.status(200).json(updatedNewUser);
  } catch (error) {
    next(error);
  }
};

// delete user
export const deleteNewUser = async (req, res, next) => {
  try {
    await NewUser.findByIdAndDelete(req.params.id);
    res.status(200).json("NewUser has been deleted!");
  } catch (error) {
    next(error);
  }
};

// get user detail
export const getNewUser = async (req, res, next) => {
  try {
    const NewUser = await NewUser.findById(req.params.id);
    res.status(200).json(NewUser);
  } catch (error) {
    next(error);
  }
};

// get users list
export const getNewUsers = async (req, res, next) => {
  try {
    const NewUsers = await NewUser.find()
      .populate("user_type")
      .populate("roles")
      .select("username email roles user_type");

    res.status(200).json(NewUsers);
  } catch (error) {
    next(error);
  }
};

//export default createNewUser;
