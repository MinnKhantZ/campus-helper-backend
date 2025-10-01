import { Op } from 'sequelize';
import MarketplaceItem from '../models/MarketplaceItem.js';

// Create Item
export const createItem = async (req, res) => {
  try {
    const { title, description, price, category, contact_phone, contact_link, image_url } = req.body;
    const user_id = req.user?.id;
    if (!user_id) return res.status(401).json({ message: 'Unauthorized' });
    const item = await MarketplaceItem.create({
      title,
      description,
      price,
      category,
      contact_phone,
      contact_link,
      image_url,
      user_id,
    });
    res.status(201).json(item);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Get Items with search, sort, filters, pagination
export const getItems = async (req, res) => {
  try {
    const {
      q,
      category,
      status,
      minPrice,
      maxPrice,
      sort = 'createdAt:desc',
      page = '1',
      limit = '50',
      userId,
    } = req.query;

    const where = {};
    if (q) {
      where[Op.or] = [
        { title: { [Op.iLike]: `%${q}%` } },
        { description: { [Op.iLike]: `%${q}%` } },
      ];
    }
    if (category) where.category = category;
    if (status) where.status = status;
    if (userId) where.user_id = userId;
    if (minPrice || maxPrice) {
      where.price = {};
      if (minPrice) where.price[Op.gte] = Number(minPrice);
      if (maxPrice) where.price[Op.lte] = Number(maxPrice);
    }

    const [sortField, sortDir] = String(sort).split(':');

    const items = await MarketplaceItem.findAll({
      where,
      order: [[sortField || 'createdAt', (sortDir || 'DESC').toUpperCase()]],
      limit: Number(limit),
      offset: (Number(page) - 1) * Number(limit),
    });
    res.json(items);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export const getItemById = async (req, res) => {
  try {
    const item = await MarketplaceItem.findByPk(req.params.id);
    if (!item) return res.status(404).json({ message: 'Item not found' });
    res.json(item);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export const updateItem = async (req, res) => {
  try {
    const item = await MarketplaceItem.findByPk(req.params.id);
    if (!item) return res.status(404).json({ message: 'Item not found' });

    const isAdmin = req.user?.role === 'admin';
    if (!isAdmin && item.user_id !== req.user?.id) {
      return res.status(403).json({ message: 'Forbidden' });
    }

    const { title, description, price, category, contact_phone, contact_link, image_url, status } = req.body;
    await item.update({ title, description, price, category, contact_phone, contact_link, image_url, status });
    res.json(item);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export const deleteItem = async (req, res) => {
  try {
    const item = await MarketplaceItem.findByPk(req.params.id);
    if (!item) return res.status(404).json({ message: 'Item not found' });

    const isAdmin = req.user?.role === 'admin';
    if (!isAdmin && item.user_id !== req.user?.id) {
      return res.status(403).json({ message: 'Forbidden' });
    }

    await item.destroy();
    res.json({ message: 'Item deleted' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
