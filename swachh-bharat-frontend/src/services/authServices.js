import axios from "axios";

const register = async (user, isDriver) => {
  try {
    let data = null;
    if (isDriver) {
      data = await axios.post("/api/auth/register-driver-user", user);
    }
    else {
      data = await axios.post("/api/auth/register-normal-user", user);
    }
    data = data ? data.data : null;
    if (data && data.userId) {
      console.log(
        "authServices:register() Success: ",
        user.username,
        " successfully registerd."
      );
      return { isRegistered: true, error: null };
    }
    else {
      console.log("authServices:register() Failed: ");
      return { isRegistered: false, error: data };
    }
  }
  catch (error) {
    console.error("authServices:register() Error: ", error.response.data);
    return { isRegistered: false, error: error.response.data };
  }
};


const login = async (username, password) => {
  try {
    const { data } = await axios.post("/api/auth/login", {
      username: username,
      password: password,
    });

    if (data && data.jwtToken.length) {
      localStorage.setItem("user", JSON.stringify(data.user));
      localStorage.setItem("jwtToken", JSON.stringify(data.jwtToken));
      console.log("authServices:login() Success: ", data.user);
      return data;
    } else {
      console.error("authServices:login() Failed: ", data);
      return data;
    }
  } catch (error) {
    console.error("authServices:login() Error: ", error.response.data);
    return error.response.data;
  }
};


const authServices = { register, login };
export default authServices;