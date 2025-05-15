import { DataTypes } from 'sequelize';
import sequelize from '../config/db.config.js';
import User from './User.js';

const Club = sequelize.define('Club', {
  id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
  name: DataTypes.STRING,
  description: DataTypes.TEXT,
  admin_id: DataTypes.INTEGER,
  student_ids: DataTypes.JSON // Manual lookup using user IDs
});

Club.belongsTo(User, { foreignKey: 'admin_id', as: 'admin' }); // Club.admin_id → User.id
User.hasMany(Club, { foreignKey: 'admin_id', as: 'adminClubs' });

export default Club;
