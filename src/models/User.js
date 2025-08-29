import { DataTypes } from 'sequelize';
import sequelize from '../config/db.config.js';

// User model for auth with role-based access
const User = sequelize.define('User', {
  id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
  name: { type: DataTypes.STRING, allowNull: false },
  phone: { type: DataTypes.STRING, allowNull: false, unique: true },
  password: { type: DataTypes.STRING, allowNull: false },
  role: { type: DataTypes.ENUM('admin', 'student'), allowNull: false, defaultValue: 'student' },
  major: { type: DataTypes.STRING, allowNull: true },
  rollno: { type: DataTypes.STRING, allowNull: true },
  refresh_token: { type: DataTypes.TEXT, allowNull: true },
});

export default User;
