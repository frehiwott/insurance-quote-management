import bcrypt from "bcrypt";
import User from "../models/user.model";
import jwt from "jsonwebtoken";
import { Request, Response } from "express";

// handle login
export const handleLogin = async (req: Request, res: Response) => {
  const { username, password, logInBy } = req.body;

  // validate
  if (!username || !password)
    return res
      .status(400)
      .json({ message: `${logInBy} and password are required` });

  let foundUser = null;

  // logInBy is using email
  if (logInBy == "Email") {
    foundUser = await User.findOne({ email: username }).populate("role");
  }
  // if user wants to login using phoneNumber
  else if (logInBy == "PhoneNumber") {
    foundUser = await User.findOne({ phoneNumber: username }).populate("role");
  } else {
    // is user wants to login using username
    foundUser = await User.findOne({ username: username }).populate("role");
  }

  if (!foundUser) return res.sendStatus(401);

  // evaluate passsword
  const match = await bcrypt.compare(password, foundUser.password);

  if (match) {
    const role = foundUser.role;

    // create JWTs

    const accessToken = jwt.sign(
      {
        UserInfo: {
          username: foundUser.username,
          role: role,
          id: foundUser?.id,
        },
      },
      process.env.ACCESS_TOKEN_SECRET as string,
      { expiresIn: "1d" }
    );

    const refreshToken = jwt.sign(
      { username: foundUser?.username },
      process.env.REFRESH_TOKEN_SECRET as string,
      { expiresIn: "1d" }
    );

    // saving refersh token with current user
    foundUser.refresh_token = refreshToken;

    console.log("found user ", foundUser);

    // update the user with this refresh token
    const updatedUser = await User.findByIdAndUpdate(
      foundUser?.id,
      {
        $set: foundUser,
      },
      { new: true }
    );

    res.cookie("jwt", refreshToken, {
      httpOnly: true,
      sameSite: "none",
      secure: true,
      maxAge: 24 * 60 * 60 * 100,
    });

    res.json({
      accessToken,
      username: foundUser.username,
      insuranceCompany: foundUser.insuranceCompany,
      refreshToken,
      role: role,
      id: foundUser?.id,
      profilePicture: foundUser?.profile_picture
    });
  } else {
    res.sendStatus(401);
  }
};

// handle refresh token
export const handleRefreshToken = async (req: Request, res: Response) => {
  console.log("under handle refresh token .... ");
  const token = req.body;

  if (!token) return res.sendStatus(401);

  const refreshToken = token?.refreshToken;

  const foundUser: any = await User.findOne({
    refresh_token: refreshToken,
  }).populate("role");

  console.log("found user ", foundUser);

  if (!foundUser) return res.sendStatus(403); // forbidden

  // evaluate jwt

  jwt.verify(
    refreshToken,
    process.env.REFRESH_TOKEN_SECRET as string,
    async (err: any, decoded: any) => {
      if (err || foundUser.username !== decoded.username)
        return res.sendStatus(403);

      const role = foundUser.role;

      const accessToken = jwt.sign(
        {
          UserInfo: {
            username: decoded.username,
            role: role,
          },
        },
        process.env.ACCESS_TOKEN_SECRET as string,
        { expiresIn: "30s" }
      );

      const newRefreshToken = jwt.sign(
        { username: decoded?.username },
        process.env.REFRESH_TOKEN_SECRET as string,
        { expiresIn: "1d" }
      );

      // saving refersh token with current user
      foundUser.refresh_token = newRefreshToken;

      // update the user with this refresh token
      const updatedUser = await User.findByIdAndUpdate(
        foundUser?.id,
        {
          $set: foundUser,
        },
        { new: true }
      );

      console.log("updatedUser .. ", updatedUser);

      res.json({
        accessToken,
        username: foundUser.username,
        insuranceCompany: foundUser?.insuranceCompany,
        newRefreshToken,
        role: role,
        id: foundUser?.id,
      });
    }
  );
};

// handle log out
export const handleLogout = async (req: Request, res: Response) => {
  // on the client , also delete the access token

  // is refresh token in the db

  const foundUser: any = User.findOne({ id:  req?.params?.id});

  if (!foundUser) {
    // res.clearCookie("jwt", { httpOnly: true, sameSite: "none", secure: true });
    return res.sendStatus(204);
  }

  // delete refresh token in db
  foundUser.refresh_token = "";

   // update the user with this refresh token
   const updatedUser = await User.findByIdAndUpdate(
    foundUser?.id,
    {
      $set: foundUser,
    },
    { new: true }
  )

  // update this on the db
  res.sendStatus(204);
};

// verify phone number
export const verifyPhoneNumber = async (req: Request, res: Response) => {
  const { phoneNumber } = req.body;

  // validate
  if (!phoneNumber)
    return res.status(400).json({ message: `Phonenumber is required` });

  try {
    let foundUser = await User.findOne({ phoneNumber: phoneNumber });

    if (!foundUser) return res.sendStatus(409);

    return foundUser;
  } catch (err: any) {
    res.status(409).json(err._message);
  }
};

// verify phone number - get request
export const verifyUserByPhoneNumber = async (req: Request, res: Response) => {
  const { phoneNumber } = req.params;

  // validate
  if (!phoneNumber)
    return res.status(400).json({ message: `Phonenumber is required` });

  try {
    let foundUser = await User.findOne({ phoneNumber: phoneNumber });

    if (!foundUser) return res.sendStatus(409);

    return foundUser;
  } catch (err: any) {
    res.status(409).json(err._message);
  }
};

// verify email
export const verifyEmail = async (req: Request, res: Response) => {
  const { email } = req.body;

  console.log("under verify email ..");
  // validate
  if (!email) return res.status(400).json({ message: `Email is required` });

  try {
    let foundUser = await User.findOne({ email: email });

    if (!foundUser) return res.sendStatus(409);

    return foundUser;
  } catch (err: any) {
    res.status(409).json(err._message);
  }
};

// get request - verify email
export const verifyUserByEmail = async (req: Request, res: Response) => {
  console.log("under verify user ");
  const { email } = req.params;

  console.log("verify user by email ", req.params, email);

  // validate
  if (!email) return res.status(400).json({ message: `Email is required` });

  try {
    let foundUser = await User.findOne({ email: email });

    if (!foundUser) return res.sendStatus(409);

    return foundUser;
  } catch (err: any) {
    res.status(409).json(err._message);
  }
};

// reset password
export const resetPassword = async (req: Request, res: Response) => {
  const { username, password, resetBy } = req.body;

  // validate password
  if (!username || !password)
    return res
      .status(400)
      .json({ message: `${resetBy} and password are required` });

  let foundUser = null;

  // resetBy is using email
  if (resetBy == "Email") {
    foundUser = await User.findOne({ email: username });
  }
  // if user wants to reset using phoneNumber
  else if (resetBy == "PhoneNumber") {
    foundUser = await User.findOne({ phoneNumber: username });
  }

  if (!foundUser) return res.sendStatus(409);

  try {
    // generate hashed password
    const hashedPassword = await bcrypt.hash(password, 10);

    foundUser.password = hashedPassword;

    const updatedUser = await foundUser.save();

    res.status(200).json(updatedUser);
  } catch (error: any) {
    res.status(500).json(error._message);
  }
};
