import Event from "../models/Event.js";

export const createEvent = async (req, res) => {
  const { title, description, date, place, user_id } = req.body;
  try {
    const event = await Event.create({ title, description, date, place, user_id });
    res.status(201).json(event);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export const getEvents = async (req, res) => {
  try {
    const events = await Event.findAll();
    res.status(200).json(events);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
