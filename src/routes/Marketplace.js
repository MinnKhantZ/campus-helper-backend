import express from 'express';
import { authMiddleware } from '../services/auth.js';
import { createItem, getItems, getItemById, updateItem, deleteItem } from '../controllers/Marketplace.js';

const router = express.Router();

router.get('/', getItems);
router.get('/:id', getItemById);
router.post('/', authMiddleware(), createItem);
router.put('/:id', authMiddleware(), updateItem);
router.delete('/:id', authMiddleware(), deleteItem);

export default router;
