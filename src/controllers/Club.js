import Club from "../models/Club.js";

export const createClub = async (req, res) => {
  const { name, description, admin_id, student_ids } = req.body;
  try {
    const club = await Club.create({ name, description, admin_id, student_ids });
    res.status(201).json(club);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export const getClubs = async (req, res) => {
  try {
    const clubs = await Club.findAll();
    res.status(200).json(clubs);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
