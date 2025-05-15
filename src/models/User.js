import { DataTypes } from 'sequelize';
import sequelize from '../config/db.config.js';

const User = sequelize.define('User', {
  id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
  name: DataTypes.STRING,
  password: DataTypes.STRING,
  role: { type: DataTypes.ENUM('teacher', 'student'), allowNull: false },
  major: DataTypes.STRING,
  rollno: DataTypes.STRING
});

export default User;
