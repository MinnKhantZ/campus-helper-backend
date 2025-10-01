import Message from "../models/Message.js";
import Club from "../models/Club.js";
import { Op } from 'sequelize';

const ensureMember = (club, userId) => {
  if (!club) return false;
  if (club.admin_id === userId) return true;
  if (Array.isArray(club.student_ids) && club.student_ids.includes(userId)) return true;
  return false;
};

export const sendClubMessage = async (req, res) => {
  try {
    const userId = req.user?.id;
    const { id } = req.params; // club id
    const { content } = req.body;
    if (!content || !String(content).trim()) {
      return res.status(400).json({ message: 'Content is required' });
    }
    const club = await Club.findByPk(id);
    if (!club) return res.status(404).json({ message: 'Club not found' });
    if (!ensureMember(club, userId)) return res.status(403).json({ message: 'Only members can chat' });
    const msg = await Message.create({ club_id: club.id, user_id: userId, content: String(content).trim() });
    const withAuthor = await Message.findByPk(msg.id, { include: [{ association: 'author' }] });
    res.status(201).json(withAuthor);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export const getClubMessages = async (req, res) => {
  try {
    const userId = req.user?.id;
    const { id } = req.params; // club id
    const { sinceId, limit } = req.query;
    const club = await Club.findByPk(id);
    if (!club) return res.status(404).json({ message: 'Club not found' });
    if (!ensureMember(club, userId)) return res.status(403).json({ message: 'Only members can view messages' });

    const where = { club_id: id };
    if (sinceId) {
      where.id = { [Op.gt]: Number(sinceId) };
    }
    const take = Math.min(Number(limit) || 50, 200);

    const messages = await Message.findAll({
      where,
      order: [['id', 'ASC']],
      limit: take,
      include: [{ association: 'author' }],
    });
    res.status(200).json(messages);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
