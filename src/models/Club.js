import { DataTypes } from 'sequelize';
import sequelize from '../config/db.config.js';
import User from './User.js';

const Club = sequelize.define('Club', {
  id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
  name: DataTypes.STRING,
  description: DataTypes.TEXT,
  admin_id: DataTypes.INTEGER,
  // Use JSONB to make containment queries easier on Postgres
  student_ids: { type: DataTypes.JSONB, allowNull: false, defaultValue: [] }, // accepted members (user IDs)
  pending_ids: { type: DataTypes.JSONB, allowNull: false, defaultValue: [] }, // pending join requests (user IDs)
});

Club.belongsTo(User, { foreignKey: 'admin_id', as: 'admin' }); // Club.admin_id → User.id
User.hasMany(Club, { foreignKey: 'admin_id', as: 'adminClubs' });

export default Club;
