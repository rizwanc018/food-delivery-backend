import type { Request, Response } from 'express';
import { db } from '../utils/database';
import type { RestaurantFilters, PaginationParams, ApiResponse } from '../types/index';
import type { Restaurant } from '@prisma/client';

export class RestaurantController {
  static async getRestaurants(req: Request, res: Response): Promise<void> {
    try {
      const {
        cuisine,
        priceRange,
        rating,
        deliveryTime,
        isVeg,
        location,
        search,
        sortBy = 'rating',
        sortOrder = 'desc',
        page = 1,
        limit = 12
      } = req.query;

      // Build where clause for filtering
      const whereClause: any = {};

      // Cuisine filter
      if (cuisine) {
        const cuisines = Array.isArray(cuisine) ? cuisine : [cuisine];
        whereClause.cuisine = {
          hasSome: cuisines
        };
      }

      // Price range filter
      if (priceRange) {
        const priceRanges = Array.isArray(priceRange) ? priceRange : [priceRange];
        whereClause.priceRange = {
          in: priceRanges
        };
      }

      // Rating filter
      if (rating) {
        whereClause.rating = {
          gte: parseFloat(rating as string)
        };
      }

      // Vegetarian filter
      if (isVeg === 'true') {
        whereClause.isVeg = true;
      }

      // Location filter
      if (location) {
        whereClause.location = {
          contains: location as string,
          mode: 'insensitive'
        };
      }

      // Search filter
      if (search) {
        whereClause.OR = [
          {
            name: {
              contains: search as string,
              mode: 'insensitive'
            }
          },
          {
            description: {
              contains: search as string,
              mode: 'insensitive'
            }
          },
          {
            cuisine: {
              hasSome: [search as string]
            }
          }
        ];
      }

      // Only show open restaurants
      whereClause.isOpen = true;

      // Build orderBy clause
      const orderBy: any = {};
      if (sortBy === 'deliveryTime') {
        // For delivery time, we'll need custom sorting since it's a string
        orderBy.deliveryTime = sortOrder;
      } else if (sortBy === 'deliveryFee') {
        orderBy.deliveryFee = sortOrder;
      } else if (sortBy === 'name') {
        orderBy.name = sortOrder;
      } else {
        orderBy.rating = sortOrder;
      }

      // Pagination
      const pageNum = parseInt(page as string);
      const limitNum = parseInt(limit as string);
      const skip = (pageNum - 1) * limitNum;

      // Get restaurants with filtering and pagination
      const [restaurants, total] = await Promise.all([
        db.restaurant.findMany({
          where: whereClause,
          orderBy,
          skip,
          take: limitNum,
          include: {
            _count: {
              select: {
                menuItems: true
              }
            }
          }
        }),
        db.restaurant.count({
          where: whereClause
        })
      ]);

      // Get filter options for frontend
      const filterOptions = await db.restaurant.groupBy({
        by: ['cuisine', 'priceRange', 'location'],
        where: { isOpen: true }
      });

      const cuisines = [...new Set(filterOptions.flatMap(item => item.cuisine))];
      const priceRanges = [...new Set(filterOptions.map(item => item.priceRange))];
      const locations = [...new Set(filterOptions.map(item => item.location))];

      const response: ApiResponse<Restaurant[]> = {
        data: restaurants,
        pagination: {
          page: pageNum,
          limit: limitNum,
          total,
          totalPages: Math.ceil(total / limitNum)
        },
        filters: {
          cuisines,
          priceRanges,
          categories: [], // Not applicable for restaurants
          locations
        }
      };

      res.json(response);
    } catch (error) {
      console.error('Error fetching restaurants:', error);
      res.status(500).json({ error: 'Internal server error' });
    }
  }

  static async getRestaurantById(req: Request, res: Response): Promise<void> {
    try {
      const { id } = req.params;

      const restaurant = await db.restaurant.findUnique({
        where: { id },
        include: {
          menuItems: {
            orderBy: {
              category: 'asc'
            }
          }
        }
      });

      if (!restaurant) {
        res.status(404).json({ error: 'Restaurant not found' });
        return;
      }

      res.json({ data: restaurant });
    } catch (error) {
      console.error('Error fetching restaurant:', error);
      res.status(500).json({ error: 'Internal server error' });
    }
  }

  static async getFilterOptions(req: Request, res: Response): Promise<void> {
    try {
      const [cuisineData, priceRangeData, locationData] = await Promise.all([
        db.restaurant.findMany({
          where: { isOpen: true },
          select: { cuisine: true },
          distinct: ['cuisine']
        }),
        db.restaurant.findMany({
          where: { isOpen: true },
          select: { priceRange: true },
          distinct: ['priceRange']
        }),
        db.restaurant.findMany({
          where: { isOpen: true },
          select: { location: true },
          distinct: ['location']
        })
      ]);

      const cuisines = [...new Set(cuisineData.flatMap(item => item.cuisine))];
      const priceRanges = [...new Set(priceRangeData.map(item => item.priceRange))];
      const locations = [...new Set(locationData.map(item => item.location))];

      res.json({
        data: {
          cuisines,
          priceRanges,
          locations
        }
      });
    } catch (error) {
      console.error('Error fetching filter options:', error);
      res.status(500).json({ error: 'Internal server error' });
    }
  }
}