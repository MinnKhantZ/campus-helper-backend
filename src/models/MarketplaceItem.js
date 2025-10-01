import { DataTypes } from 'sequelize';
import sequelize from '../config/db.config.js';

const MarketplaceItem = sequelize.define('MarketplaceItem', {
  id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
  title: { type: DataTypes.STRING, allowNull: false },
  description: { type: DataTypes.TEXT, allowNull: true },
  price: { type: DataTypes.FLOAT, allowNull: false, validate: { min: 0 } },
  category: { type: DataTypes.STRING, allowNull: true },
  contact_phone: { type: DataTypes.STRING, allowNull: true },
  contact_link: { type: DataTypes.STRING, allowNull: true },
  image_url: { type: DataTypes.STRING, allowNull: true },
  status: { type: DataTypes.ENUM('available', 'sold'), allowNull: false, defaultValue: 'available' },
  user_id: { type: DataTypes.INTEGER, allowNull: false },
});

export default MarketplaceItem;
