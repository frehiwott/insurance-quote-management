import fetch from "node-fetch";

export const fetchUsers = async () => {
  const response = await fetch(process.env.USER_MODULE_SERVICE + "/userTypes/");
  const data = await response.json();

  return data;
};

// fetch user by id
export const fetchUserById = async (userId) => {
  const response = await fetch(process.env.USER_MODULE_SERVICE + "/users/"+ userId);
  const data = await response.json();

  return data;
};

// sign up user

export const registerUser = async (user) => {
  // response for user registration
  const response = await fetch(process.env.USER_MODULE_SERVICE + "/users/", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(user),
  });

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
  const response = await fetch(
    process.env.USER_MODULE_SERVICE + "/roles/byName/" + type
  );
  const role = await response.json();

  return role?.id;
};
