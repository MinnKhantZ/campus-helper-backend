import bcrypt from "bcrypt";
import User from "../models/User.js";
import { createToken } from "../services/UserServices.js";

export const register = async (req, res) => {
  const { name, phone, password } = req.body;

  try {
    const formatPhone = `+${phone.replace(/\D/g, "")}`;
    const existingUser = await User.findOne({ where: { phone: formatPhone } });

    if (existingUser) {
      return res.status(400).json({ message: "Phone number already exists" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await User.create({
      name,
      phone: formatPhone,
      password: hashedPassword,
    });

    const token = createToken(user);
    res.status(201).json({ message: "Register successful", token, user });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export const login = async (req, res) => {
  const { phone, password } = req.body;

  try {
    const user = await User.findOne({ where: { phone } });

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    const token = createToken(user);
    res.status(200).json({ message: "Login successful", token, user });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export const logout = async (req, res) => {
  res.status(200).json({ message: "Logged out successfully" });
};

export const updateProfile = async (req, res) => {
  const user = req.user;
  const { phone, name } = req.body;

  try {
    const formatPhone = `+${phone.replace(/\D/g, "")}`;
    const existingUser = await User.findOne({ where: { phone: formatPhone } });

    if (existingUser && existingUser.user_id !== user.user_id) {
      return res.status(400).json({ message: "Phone number already exists" });
    }

    await user.update({ name, phone: formatPhone });
    res.status(200).json({ message: "Profile updated", user });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export const deleteUser = async (req, res) => {
  try {
    await req.user.destroy();
    res.status(200).json({ message: "User deleted successfully" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};