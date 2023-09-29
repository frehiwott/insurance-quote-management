import fetch from "node-fetch";

export const fetchUsers = async () => {
  const response = await fetch(process.env.USER_MODULE_SERVICE + "/userTypes/");
  const data = await response.json();

  return data;
};

// fetch user by id
export const fetchUserById = async (userId) => {
  const response = await fetch(
    process.env.USER_MODULE_SERVICE + "/users/" + userId
  );
  const data = await response.json();

  return data;
};

// sign up user

export const registerUser = async (user) => {
  console.log("under register user ..");
  // response for user registration
  const response = await fetch(process.env.USER_MODULE_SERVICE + "/users/", {
    method: "POST",
    headers: {
      "Content-Type": "multipart/form-data",
    },
    body: user,
  });

  console.log("rsponse is ", response)
  if (response.status == 200) {
    const data = await response.json();
    return data;
  } else {
    console.log("error is is ", response?.status, user);
    const error = new Error("User  creation failed");
    error.code = response?.status;
    throw error;
  }
};

export const signInUser = async (user) => {
  console.log("under register user ..");
  // response for user registration
  const response = await fetch(
    process.env.USER_MODULE_SERVICE + "/auth/login",
    {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(user),
    }
  );

  if (response.status == 200) {
    const data = await response.json();
    return data;
  } else {
    console.log("error is is ", response?.status, user);
    const error = new Error("User  creation failed");
    error.code = response?.status;
    throw error;
  }
};

export const updateUser = async (user) => {
  // response for user registration
  const response = await fetch(
    process.env.USER_MODULE_SERVICE + "/users/" + user?._id,
    {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(user),
    }
  );

  if (response.status == 200) {
    const data = await response.json();
    return data;
  } else {
    const error = new Error("User not found");
    error.code = response?.status;
    throw error;
  }
};

// fetch user type by id

export const fetchUserTypeByName = async (type) => {
  const response = await fetch(
    process.env.USER_MODULE_SERVICE + "/userTypes/byType/" + type
  );
  const userType = await response.json();

  return userType?.id;
};

export const fetchRoleByName = async (type) => {
  console.log("type is ... ", type);
  const response = await fetch(
    process.env.USER_MODULE_SERVICE + "/roles/byName/" + type
  );

  if (response.status == 200) {
    console.log("under response dara ..");
    const data = await response.json();
    return data;
  } else {
    console.log("response status is ", response.status);
    const error = new Error("Role could not be found");
    error.code = response?.status;
    throw error;
  }

  // console.log("response json is ", response.json())

  // const role = await response.json();

  // console.log("role is ", role)

  // return role?._id;
};
