import bcrypt from "bcrypt";
import User from "../models/user.model";
import jwt from "jsonwebtoken";
import { Request, Response } from "express";

// handle login
export const handleLogin = async (req: Request, res: Response) => {
  const { username, password } = req.body;

  // validate
  if (!username || !password)
    return res
      .status(400)
      .json({ message: "Username and password are required" });

  const foundUser = await User.findOne({ username: username });

  if (!foundUser) return res.sendStatus(401);

  // evaluate passsword
  const match = await bcrypt.compare(password, foundUser.password);

  if (match) {
    const roles = Object.values(foundUser.roles);

    // create JWTs

    const accessToken = jwt.sign(
      {
        UserInfo: {
          username: foundUser.username,
          roles: roles,
        },
      },
      process.env.ACCESS_TOKEN_SECRET as string,
      { expiresIn: "30s" }
    );

    const refreshToken = jwt.sign(
      { username: foundUser?.username },
      process.env.REFRESH_TOKEN_SECRET as string,
      { expiresIn: "1d" }
    );

    // saving refersh token with current user
    foundUser.refresh_token = refreshToken;

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
    res.json({ accessToken });
  } else {
    res.sendStatus(401);
  }
};

// handle refresh token
export const handleRefreshToken = async (req: Request, res: Response) => {
  const cookies = req.cookies;

  if (!cookies?.jwt) return res.sendStatus(401);

  const refreshToken = cookies.jwt;

  const foundUser: any = User.findOne({ refresh_token: refreshToken }).populate(
    "roles"
  );


  if (!foundUser) return res.sendStatus(403); // forbidden

  // evaluate jwt

  jwt.verify(
    refreshToken,
    process.env.REFRESH_TOKEN_SECRET as string,
    async (err: any, decoded: any) => {
      if (err || foundUser.username !== decoded.username)
        return res.sendStatus(403);

      const roles = Object.values(foundUser.roles);

      const accessToken = jwt.sign(
        {
          UserInfo: {
            username: decoded.username,
            roles: roles,
          },
        },
        process.env.ACCESS_TOKEN_SECRET as string,
        { expiresIn: "30s" }
      );

      const refreshToken = jwt.sign(
        { username: decoded?.username },
        process.env.REFRESH_TOKEN_SECRET as string,
        { expiresIn: "1d" }
      );

      // saving refersh token with current user
      foundUser.refresh_token = refreshToken;

      // update the user with this refresh token
      const updatedUser = await User.findByIdAndUpdate(
        foundUser?.id,
        {
          $set: foundUser,
        },
        { new: true }
      );


      res.json({ accessToken });
    }
  );
};

// handle log out

export const handleLogout = async (req: Request, res: Response) => {
  // on the client , also delete the access token

  const cookies = req.cookies;
  if (!cookies?.jwt) return res.sendStatus(204); // no content

  const refreshToken = cookies.jwt;

  // is refresh token in the db

  const foundUser: any = User.findOne({ refresh_token: refreshToken });

  if (!foundUser) {
    res.clearCookie("jwt", { httpOnly: true, sameSite: "none", secure: true });
    return res.sendStatus(204);
  }

  // delete refresh token in db
  foundUser.refresh_token = "";

  // update this on the db

  res.clearCookie("jwt", { httpOnly: true, sameSite: "none", secure: true });
  res.sendStatus(204);
};
