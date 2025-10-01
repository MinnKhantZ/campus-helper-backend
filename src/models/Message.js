import { DataTypes } from 'sequelize';
import sequelize from '../config/db.config.js';
import User from './User.js';
import Club from './Club.js';

const Message = sequelize.define('Message', {
  id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
  club_id: { type: DataTypes.INTEGER, allowNull: false },
  user_id: { type: DataTypes.INTEGER, allowNull: false },
  content: { type: DataTypes.TEXT, allowNull: false },
}, {
  indexes: [
    { fields: ['club_id'] },
    { fields: ['createdAt'] },
  ],
});

Message.belongsTo(Club, { foreignKey: 'club_id', as: 'club' });
Message.belongsTo(User, { foreignKey: 'user_id', as: 'author' });
Club.hasMany(Message, { foreignKey: 'club_id', as: 'messages' });

export default Message;
