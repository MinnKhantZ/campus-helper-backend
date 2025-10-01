import bcrypt from 'bcrypt';
import User from '../models/User.js';
import { signAccessToken, signRefreshToken, verifyRefreshToken } from '../services/auth.js';

const sanitizeUser = (u) => ({ id: u.id, name: u.name, phone: u.phone, role: u.role, major: u.major, rollno: u.rollno });

export const register = async (req, res) => {
  const { name, phone, password, role = 'student' } = req.body;
  try {
    const formatPhone = `+${String(phone).replace(/\D/g, '')}`;
    const existingUser = await User.findOne({ where: { phone: formatPhone } });
    if (existingUser) return res.status(400).json({ message: 'Phone number already exists' });

    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await User.create({ name, phone: formatPhone, password: hashedPassword, role });
    const payload = sanitizeUser(user);
    const accessToken = signAccessToken(payload);
    const refreshToken = signRefreshToken({ id: user.id });
    user.refresh_token = refreshToken;
    await user.save();
    res.status(201).json({ message: 'Register successful', accessToken, refreshToken, user: payload });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export const login = async (req, res) => {
  const { phone, password } = req.body;
  try {
    const formatPhone = phone.startsWith('+') ? phone : `+${String(phone).replace(/\D/g, '')}`;
    const user = await User.findOne({ where: { phone: formatPhone } });
    if (!user) return res.status(404).json({ message: 'User not found' });

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) return res.status(401).json({ message: 'Invalid credentials' });

    const payload = sanitizeUser(user);
    const accessToken = signAccessToken(payload);
    const refreshToken = signRefreshToken({ id: user.id });
    user.refresh_token = refreshToken;
    await user.save();
    res.status(200).json({ message: 'Login successful', accessToken, refreshToken, user: payload });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export const refresh = async (req, res) => {
  const { refreshToken } = req.body;
  if (!refreshToken) return res.status(400).json({ message: 'Refresh token required' });
  try {
    const decoded = verifyRefreshToken(refreshToken);
    const user = await User.findByPk(decoded.id);
    if (!user || user.refresh_token !== refreshToken) {
      return res.status(401).json({ message: 'Invalid refresh token' });
    }
    const payload = sanitizeUser(user);
    const accessToken = signAccessToken(payload);
    const newRefresh = signRefreshToken({ id: user.id });
    user.refresh_token = newRefresh;
    await user.save();
    res.status(200).json({ accessToken, refreshToken: newRefresh, user: payload });
  } catch (err) {
    res.status(401).json({ message: 'Invalid refresh token', error: err.message });
  }
};

export const logout = async (req, res) => {
  const { id } = req.user || {};
  if (!id) return res.status(200).json({ message: 'Logged out' });
  try {
    const user = await User.findByPk(id);
    if (user) {
      user.refresh_token = null;
      await user.save();
    }
    res.status(200).json({ message: 'Logged out successfully' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export const me = async (req, res) => {
  try {
    res.status(200).json({ user: req.user });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export const usersByIds = async (req, res) => {
  try {
    const idsParam = String(req.query.ids || '').trim();
    if (!idsParam) return res.status(400).json({ message: 'ids query is required' });
    const ids = idsParam.split(',').map((s) => Number(s)).filter((n) => Number.isFinite(n));
    if (!ids.length) return res.status(400).json({ message: 'No valid ids' });
    const users = await User.findAll({ where: { id: ids } });
    res.status(200).json(users.map((u) => ({ id: u.id, name: u.name, phone: u.phone, role: u.role })));
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};