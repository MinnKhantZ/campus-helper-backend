import { DataTypes } from 'sequelize';
import sequelize from '../config/db.config.js';
import User from './User.js';
import Club from './Club.js';

const Announcement = sequelize.define('Announcement', {
  id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
  club_id: { type: DataTypes.INTEGER, allowNull: false },
  user_id: { type: DataTypes.INTEGER, allowNull: false },
  content: { type: DataTypes.TEXT, allowNull: false },
});

Announcement.belongsTo(Club, { foreignKey: 'club_id', as: 'club' });
Announcement.belongsTo(User, { foreignKey: 'user_id', as: 'author' });
Club.hasMany(Announcement, { foreignKey: 'club_id', as: 'announcements' });

export default Announcement;
