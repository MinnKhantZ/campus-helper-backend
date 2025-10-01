import Club from "../models/Club.js";
import Announcement from "../models/Announcement.js";

export const createClub = async (req, res) => {
  const { name, description } = req.body;
  try {
    const admin_id = req.user?.id;
    if (!admin_id) return res.status(401).json({ message: 'Unauthorized' });
    const club = await Club.create({ name, description, admin_id });
    res.status(201).json(club);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export const getClubs = async (req, res) => {
  try {
    const clubs = await Club.findAll({ order: [['id', 'DESC']] });
    res.status(200).json(clubs);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export const getClubById = async (req, res) => {
  try {
    const { id } = req.params;
    const club = await Club.findByPk(id, {
      include: [{ model: Announcement, as: 'announcements', include: [{ association: 'author' }] }],
    });
    if (!club) return res.status(404).json({ message: 'Club not found' });
    res.status(200).json(club);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export const deleteClub = async (req, res) => {
  try {
    const { id } = req.params;
    const club = await Club.findByPk(id);
    if (!club) return res.status(404).json({ message: 'Club not found' });
    const user = req.user;
    const isOwner = club.admin_id === user.id;
    const isAdmin = user.role === 'admin';
    if (!isOwner && !isAdmin) return res.status(403).json({ message: 'Only owner or admin can delete' });
    await Announcement.destroy({ where: { club_id: id } });
    await club.destroy();
    res.status(200).json({ message: 'Club deleted' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export const updateClub = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, description } = req.body;
    const club = await Club.findByPk(id);
    if (!club) return res.status(404).json({ message: 'Club not found' });
    const user = req.user;
    const isOwner = club.admin_id === user.id;
    const isAdmin = user.role === 'admin';
    if (!isOwner && !isAdmin) return res.status(403).json({ message: 'Only owner or admin can update' });
    if (typeof name === 'string') club.name = name;
    if (typeof description === 'string') club.description = description;
    await club.save();
    res.status(200).json(club);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export const myClubs = async (req, res) => {
  try {
    const userId = req.user?.id;
    const clubs = await Club.findAll();
    const joined = clubs.filter(c => Array.isArray(c.student_ids) && c.student_ids.includes(userId) || c.admin_id === userId);
    res.status(200).json(joined);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export const requestJoin = async (req, res) => {
  try {
    const userId = req.user?.id;
    const { id } = req.params;
    const club = await Club.findByPk(id);
    if (!club) return res.status(404).json({ message: 'Club not found' });
    const isMember = club.student_ids.includes(userId) || club.admin_id === userId;
    if (isMember) return res.status(400).json({ message: 'Already a member' });
    if (!club.pending_ids.includes(userId)) {
      club.pending_ids = [...club.pending_ids, userId];
      await club.save();
    }
    res.status(200).json({ message: 'Join request sent', club });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export const approveJoin = async (req, res) => {
  try {
    const approverId = req.user?.id;
    const { id } = req.params; // club id
    const { userId } = req.body;
    const club = await Club.findByPk(id);
    if (!club) return res.status(404).json({ message: 'Club not found' });
    if (club.admin_id !== approverId && req.user.role !== 'admin') {
      return res.status(403).json({ message: 'Only owner or admin can approve' });
    }
    if (!club.pending_ids.includes(userId)) return res.status(400).json({ message: 'User not in pending list' });
    club.pending_ids = club.pending_ids.filter((pid) => pid !== userId);
    if (!club.student_ids.includes(userId)) club.student_ids = [...club.student_ids, userId];
    await club.save();
    res.status(200).json({ message: 'User added to club', club });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export const postAnnouncement = async (req, res) => {
  try {
    const { id } = req.params; // club id
    const { content } = req.body;
    const club = await Club.findByPk(id);
    if (!club) return res.status(404).json({ message: 'Club not found' });
    const user = req.user;
    const isOwner = club.admin_id === user.id;
    const isAdmin = user.role === 'admin';
    if (!isOwner && !isAdmin) return res.status(403).json({ message: 'Only owner or admin can announce' });
    const ann = await Announcement.create({ club_id: club.id, user_id: user.id, content });
    res.status(201).json(ann);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export const getAnnouncements = async (req, res) => {
  try {
    const { id } = req.params; // club id
  const anns = await Announcement.findAll({ where: { club_id: id }, order: [['id', 'DESC']], include: [{ association: 'author' }] });
    res.status(200).json(anns);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
