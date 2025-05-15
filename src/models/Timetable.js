import { DataTypes } from 'sequelize';
import sequelize from '../config/db.config.js';

const Timetable = sequelize.define('Timetable', {
  id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
  major: DataTypes.STRING,
  year: DataTypes.INTEGER,
  sem: DataTypes.INTEGER,
  lectureSessions: { type: DataTypes.JSON }
});

export default Timetable;
