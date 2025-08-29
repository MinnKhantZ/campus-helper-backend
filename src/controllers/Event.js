import { Op } from "sequelize";
import Event from "../models/Event.js";

export const createEvent = async (req, res) => {
  const { title, description, date, place, user_id } = req.body;
  try {
  const createdBy = req.user?.id ?? user_id;
    const event = await Event.create({ title, description, date, place, user_id: createdBy });
    res.status(201).json(event);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export const getEvents = async (req, res) => {
  try {
    const events = await Event.findAll({
      where: {
        date: {
          [Op.gte]: new Date(), 
        },
      },
      order: [['date', 'ASC']],
    });

    res.status(200).json(events);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export const updateEvent = async (req, res) => {
  const { id } = req.params;
  const { title, description, date, place } = req.body;

  try {
    const event = await Event.findByPk(id);

    if (!event) {
      return res.status(404).json({ message: "Event not found" });
    }
    // Permission: admin can update any; student only own events
    const isAdmin = req.user?.role === 'admin';
    if (!isAdmin && event.user_id !== req.user?.id) {
      return res.status(403).json({ message: 'Forbidden' });
    }
    await event.update({ title, description, date, place });
    res.status(200).json(event);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export const deleteEvent = async (req, res) => {
  const { id } = req.params;

  try {
    const event = await Event.findByPk(id);

    if (!event) {
      return res.status(404).json({ message: "Event not found" });
    }
    // Permission: admin can delete any; student only own events
    const isAdmin = req.user?.role === 'admin';
    if (!isAdmin && event.user_id !== req.user?.id) {
      return res.status(403).json({ message: 'Forbidden' });
    }
    await event.destroy();
    res.status(200).json({ message: "Event deleted successfully" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
