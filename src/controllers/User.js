import bcrypt from "bcrypt";
import {
  createToken,
  createUser,
  findUserByPhone,
} from "../services/UserServices.js";
import { v4 as uuidV4 } from "uuid";
import User from "../models/User.js";

export const register = async (req, res) => {
  const { name, phone, password, device_token, country, dob, juristic_method } =
    req.body;
  try {
    const formatPhone = `+${phone.replace(/\D/g, "")}`;
    const existingUser = await findUserByPhone(formatPhone);
    if (existingUser) {
      return res.status(400).json({ message: "Phone number already exists" });
    }

    const user = await createUser({
      name,
      phone: formatPhone,
      password,
      device_token,
      country,
      dob,
      juristic_method,
    });
    const token = createToken(user);

    return res.status(201).json({
      message: "Register successful",
      token,
      user,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Server error" });
  }
};

export const login = async (req, res) => {
  const { phone, password, device_token } = req.body;

  try {
    const user = await findUserByPhone(phone);

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    if (!user.isActive)
      return res.status(401).json({ message: "Account was frozen" });

    // Compare the provided password with the hashed password in the database
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    // If user has existing session id,
    // check if the user is logged in from another device or has an expired token
    // if (user.session_id) {
    //   // Check auth token
    //   const token = req.headers["authorization"]
    //     ? req.headers["authorization"].split(" ")[1]
    //     : null;
    //   if (!token) {
    //     // if there is no token, this login is from another device
    //     return res.status(401).json({ message: "User already logged in" });
    //   }

    //   try {
    //     // Verify the token and check if it's expired
    //     const decoded = jwt.verify(token, process.env.SECRET_KEY);

    //     if (decoded.session !== user.session_id) {
    //       // If the session id in the token is different from the one in the database,
    //       // this login is from another device
    //       return res.status(401).json({ message: "User already logged in" });
    //     }
    //   } catch (error) {
    //     if (error.name !== "TokenExpiredError") {
    //       // If it's not expired, this login is from another device
    //       return res.status(401).json({ message: "User already logged in" });
    //     }
    //   }
    // }

    // Update the device token
    if (device_token && device_token !== user.device_token) {
      user.device_token = device_token;
    }

    // Generate a new session id
    user.session_id = uuidV4();
    user.session_start = new Date();
    await user.save();

    const token = createToken(user);

    return res.status(200).json({
      message: "Login successful",
      token,
      user,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

export const logout = async (req, res) => {
  const user = req.user;
  try {
    user.device_token = null;
    user.session_id = null;
    user.session_start = null;
    await user.save();

    return res
      .status(200)
      .json({ data: true, message: "Logged out successfully" });
  } catch (error) {
    console.log(error);
    res.status(403).json({ data: false, message: "Server error" });
  }
};

export const loginWithToken = async (req, res) => {
  const user = req.user;
  const { device_token } = req.query;

  if (!user.isActive)
    return res.status(401).json({ message: "Account was frozen" });

  try {
    user.session_start = new Date();
    // Update the device token if it's different from the one in the database
    if (device_token && device_token !== user.device_token) {
      user.device_token = device_token;
    }
    await user.save();

    return res.status(200).json({ user });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Server error" });
  }
};

export const updateProfile = async (req, res) => {
  const user = req.user;
  const { phone } = req.body;

  try {
    const formatPhone = `+${phone.replace(/\D/g, "")}`;
    const existingUser = await findUserByPhone(formatPhone);
    // console.log(existingUser.user_id, user.user_id);
    if (existingUser && existingUser.user_id !== user.user_id) {
      return res.status(400).json({ message: "Phone number already exists" });
    }

    await user.update({ phone: formatPhone });

    return res.status(200).json({ user, message: "Profile updated" });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Server error" });
  }
};
export const deleteUser = async (req, res) => {
  const { user_id } = req.user;
  try {
    const user = await User.findByPk(user_id);
    if (!user) {
      return res.status(500).json({ message: "User not found" });
    }
    await user.destroy();
    return res.status(200).json({ message: "User deleted successfully" });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Server error" });
  }
};
