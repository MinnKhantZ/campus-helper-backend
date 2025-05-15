import { DataTypes } from 'sequelize';
import sequelize from '../config/db.config.js';
import User from './User.js';

const Event = sequelize.define('Event', {
  id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
  title: DataTypes.STRING,
  description: DataTypes.TEXT,
  date: DataTypes.DATE,
  place: DataTypes.STRING
});

Event.belongsTo(User, { foreignKey: 'user_id' }); // Event.user_id → User.id
User.hasMany(Event, { foreignKey: 'user_id' });

export default Event;
