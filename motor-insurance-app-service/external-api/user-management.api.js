import fetch from "node-fetch";

export const fetchUsers = async () => {
  console.log("env variable ", process.env.USER_MODULE_SERVICE);
  const response = await fetch(process.env.USER_MODULE_SERVICE + "/userTypes/");
  const data = await response.json();

  console.log("data is ", data);
  return data;
};
