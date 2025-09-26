import express from 'express';
import { RestaurantController } from '../controllers/restaurantController';

const router = express.Router();

// GET /api/restaurants - Get all restaurants with filtering
router.get('/', RestaurantController.getRestaurants);

// GET /api/restaurants/filters - Get available filter options
router.get('/filters', RestaurantController.getFilterOptions);

// GET /api/restaurants/:id - Get restaurant by ID
router.get('/:id', RestaurantController.getRestaurantById);

export default router;