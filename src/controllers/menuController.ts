import type { Request, Response } from "express";
import { db } from "../utils/database";
import type { MenuItemFilters, PaginationParams, ApiResponse } from "../types/index.js";
import type { MenuItem } from "@prisma/client";

export class MenuController {
    static async getMenuItems(req: Request, res: Response): Promise<void> {
        try {
            const {
                restaurantId,
                category,
                isVeg,
                isVegan,
                isGlutenFree,
                isSpicy,
                priceMin,
                priceMax,
                rating,
                search,
                sortBy = "name",
                sortOrder = "asc",
                page = 1,
                limit = 20,
            } = req.query;

            // Build where clause for filtering
            const whereClause: any = {};

            // Restaurant filter
            if (restaurantId) {
                whereClause.restaurantId = restaurantId as string;
            }

            // Category filter
            if (category) {
                const categories = Array.isArray(category) ? category : [category];
                whereClause.category = {
                    in: categories,
                };
            }

            // Dietary filters
            if (isVeg === "true") {
                whereClause.isVeg = true;
            }

            if (isVegan === "true") {
                whereClause.isVegan = true;
            }

            if (isGlutenFree === "true") {
                whereClause.isGlutenFree = true;
            }

            if (isSpicy === "true") {
                whereClause.isSpicy = true;
            }

            // Price range filter
            if (priceMin || priceMax) {
                whereClause.price = {};
                if (priceMin) {
                    whereClause.price.gte = parseFloat(priceMin as string);
                }
                if (priceMax) {
                    whereClause.price.lte = parseFloat(priceMax as string);
                }
            }

            // Rating filter
            if (rating) {
                whereClause.rating = {
                    gte: parseFloat(rating as string),
                };
            }

            // Search filter
            if (search) {
                whereClause.OR = [
                    {
                        name: {
                            contains: search as string,
                            mode: "insensitive",
                        },
                    },
                    {
                        description: {
                            contains: search as string,
                            mode: "insensitive",
                        },
                    },
                    {
                        category: {
                            contains: search as string,
                            mode: "insensitive",
                        },
                    },
                ];
            }

            // Build orderBy clause
            const orderBy: any = {};
            if (sortBy === "price") {
                orderBy.price = sortOrder;
            } else if (sortBy === "rating") {
                orderBy.rating = sortOrder;
            } else {
                orderBy.name = sortOrder;
            }

            // Pagination
            const pageNum = parseInt(page as string);
            const limitNum = parseInt(limit as string);
            const skip = (pageNum - 1) * limitNum;

            // Get menu items with filtering and pagination
            const [menuItems, total] = await Promise.all([
                db.menuItem.findMany({
                    where: whereClause,
                    orderBy,
                    skip,
                    take: limitNum,
                    include: {
                        restaurant: {
                            select: {
                                name: true,
                                id: true,
                            },
                        },
                    },
                }),
                db.menuItem.count({
                    where: whereClause,
                }),
            ]);

            // Get filter options for frontend
            const categoriesData = await db.menuItem.findMany({
                select: { category: true },
                distinct: ["category"],
            });

            const categories = categoriesData.map((item) => item.category);

            const response: ApiResponse<MenuItem[]> = {
                data: menuItems,
                pagination: {
                    page: pageNum,
                    limit: limitNum,
                    total,
                    totalPages: Math.ceil(total / limitNum),
                },
                filters: {
                    cuisines: [], // Not applicable for menu items
                    priceRanges: [], // Not applicable for menu items
                    categories,
                    locations: [], // Not applicable for menu items
                },
            };

            res.json(response);
        } catch (error) {
            console.error("Error fetching menu items:", error);
            res.status(500).json({ error: "Internal server error" });
        }
    }

    static async getMenuItemById(req: Request, res: Response): Promise<void> {
        try {
            const { id } = req.params;

            const menuItem = await db.menuItem.findUnique({
                where: { id },
                include: {
                    restaurant: true,
                },
            });

            if (!menuItem) {
                res.status(404).json({ error: "Menu item not found" });
                return;
            }

            res.json({ data: menuItem });
        } catch (error) {
            console.error("Error fetching menu item:", error);
            res.status(500).json({ error: "Internal server error" });
        }
    }

    static async getFilterOptions(req: Request, res: Response): Promise<void> {
        try {
            const { restaurantId } = req.query;

            const whereClause: any = {};
            if (restaurantId) {
                whereClause.restaurantId = restaurantId as string;
            }

            const [categoriesData, priceRange] = await Promise.all([
                db.menuItem.findMany({
                    where: whereClause,
                    select: { category: true },
                    distinct: ["category"],
                }),
                db.menuItem.aggregate({
                    where: whereClause,
                    _min: { price: true },
                    _max: { price: true },
                }),
            ]);

            const categories = categoriesData.map((item) => item.category);

            res.json({
                data: {
                    categories,
                    priceRange: {
                        min: priceRange._min.price || 0,
                        max: priceRange._max.price || 100,
                    },
                },
            });
        } catch (error) {
            console.error("Error fetching menu filter options:", error);
            res.status(500).json({ error: "Internal server error" });
        }
    }
}
