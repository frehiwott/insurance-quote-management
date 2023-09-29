import User from "../models/user.model";
import { Request, Response } from "express";
import UserType from "../models/user-type.model";
import Role from "../models/role.model";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

export const createUser = async (
  req: any,
  res: Response,
  next: Function
) => {

  let userType = req.body?.user_type;
  let role = req?.body?.role;

  console.log("under create user body body .... ", req.body);

  // validate username and password
  if (!req.body?.username || !req.body?.password)
    return res
      .status(400)
      .json({ message: "Username and password are required" });

  // check if role is not null
  if (!role) {
    let roleObject = await Role.findOne({ type: "USER" });
    role = roleObject?._id;
  }

  // check for dublicate username in db
  const duplicate = await User.findOne({ username: req.body?.username });

  if (duplicate) return res.sendStatus(409);

  // create new user
  // const newUser = new User({ ...req.body, user_type: userType, role: role, profile_picture: req?.file?.path ? req?.file?.path : req?.body?.profile_picture });
  const newUser = new User({ ...req.body, user_type: userType, role: role, profile_picture: null });


  try {
    // generate hashed password
    const hashedPassword = await bcrypt.hash(newUser?.password, 10);

    newUser.password = hashedPassword;

    const savedUser = await newUser.save();

    const accessToken = jwt.sign(
      {
        UserInfo: {
          username: savedUser.username,
          role: role,
          id: savedUser?.id,
        },
      },
      process.env.ACCESS_TOKEN_SECRET as string,
      { expiresIn: "1d" }
    );

    const refreshToken = jwt.sign(
      { username: savedUser?.username },
      process.env.REFRESH_TOKEN_SECRET as string,
      { expiresIn: "1d" }
    );

    // saving refersh token with current user
    savedUser.refresh_token = refreshToken;

    console.log("found user ", savedUser);

    // update the user with this refresh token
    await User.findByIdAndUpdate(
      savedUser?.id,
      {
        $set: savedUser,
      },
      { new: true }
    );

    res.cookie("jwt", refreshToken, {
      httpOnly: true,
      sameSite: "none",
      secure: true,
      maxAge: 24 * 60 * 60 * 100,
    });


    // the resonse showuld be token ...
    res.status(200).json({
      accessToken,
      username: savedUser.username,
      refreshToken,
      role: savedUser?.role,
      id: savedUser?._id,
      profilePicture: savedUser?.profile_picture
    });
  } catch (error) {
    console.log("error is inside my env ", error)
    next(error);
  }
};

// update user
export const updateUser = async (
  req: Request,
  res: Response,
  next: Function
) => {
  try {
    const updatedUser = await User.findByIdAndUpdate(
      req.params.id,
      {
        $set: req.body,
      },
      { new: true }
    );
    res.status(200).json(updatedUser);
  } catch (error) {
    next(error);
  }
};

export const deleteUser = async (
  req: Request,
  res: Response,
  next: Function
) => {
  try {
    await User.findByIdAndDelete(req.params.id);
    res.status(200).json("User has been deleted!");
  } catch (error) {
    next(error);
  }
};

export const getUser = async (req: Request, res: Response, next: Function) => {
  try {
    const user = await User.findById(req.params.id);
    res.status(200).json(user);
  } catch (error) {
    next(error);
  }
};

export const getUserByCreator = async (
  req: Request,
  res: Response,
  next: Function
) => {
  try {
    const user = await User.find({ created_by: req.params?.createdBy });
    res.status(200).json(user);
  } catch (error) {
    next(error);
  }
};

export const getUserByCompany = async (
  req: Request,
  res: Response,
  next: Function
) => {
  try {
    const user = await User.find({ insuranceCompany: req.params?.id });
    res.status(200).json(user);
  } catch (error) {
    next(error);
  }
};

export const getUsers = async (req: Request, res: Response, next: Function) => {
  try {
    const users = await User.find().populate("role").select("insuranceCompany username");
    res.status(200).json(users);
  } catch (error) {
    next(error);
  }
};

//export default createQuestion;
