import Timetable from "../models/Timetable.js";

export const createTimetable = async (req, res) => {
  const { major, year, sem, lectureSessions } = req.body;
  try {
    const timetable = await Timetable.create({ major, year, sem, lectureSessions });
    res.status(201).json(timetable);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export const getTimetables = async (req, res) => {
  try {
    const timetables = await Timetable.findAll();
    res.status(200).json(timetables);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
