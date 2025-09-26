import express from 'express';
import { MenuController } from '../controllers/menuController';

const router = express.Router();

// GET /api/menu - Get menu items with filtering
router.get('/', MenuController.getMenuItems);

// GET /api/menu/filters - Get available filter options for menu items
router.get('/filters', MenuController.getFilterOptions);

// GET /api/menu/:id - Get menu item by ID
router.get('/:id', MenuController.getMenuItemById);

export default router;