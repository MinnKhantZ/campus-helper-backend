import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import User from "../models/User.js";
import { v4 as uuidv4 } from "uuid";
import { Op } from "sequelize";

export const createUser = async ({
  name,
  phone,
  password,
  device_token,
  country,
  dob,
  juristic_method,
}) => {
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(password, salt);

  const session_id = uuidv4();
  const session_start = new Date();

  return User.create({
    name,
    phone,
    password: hashedPassword,
    country,
    dob,
    juristic_method,
    device_token,
    session_id,
    session_start,
  });
};

export const getActiveUsersWithDeviceToken = async () => {
  // ? Get all active users where device_token is not null or empty
  return User.findAll({
    attributes: ["device_token", "name"],
    where: {
      isActive: true,
      device_token: {
        [Op.and]: {
          [Op.ne]: null,
          [Op.ne]: "",
        },
      },
    },
  });
};

export const findUserByPhone = (phone) => User.findOne({ where: { phone } });

export const createToken = (user) => {
  return jwt.sign(
    {
      id: user.user_id,
      session: user.session_id,
    },
    process.env.SECRET_KEY,
    {},
  );
};

export const removeUnregisteredTokens = async (deviceTokens) => {
  return User.update(
    { device_token: null },
    {
      where: {
        device_token: { [Op.in]: deviceTokens },
      },
    },
  );
};
