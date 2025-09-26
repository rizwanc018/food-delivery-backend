export interface RestaurantFilters {
  cuisine?: string[];
  priceRange?: string[];
  rating?: number;
  deliveryTime?: string;
  isVeg?: boolean;
  location?: string;
  search?: string;
  sortBy?: 'rating' | 'deliveryTime' | 'deliveryFee' | 'name';
  sortOrder?: 'asc' | 'desc';
}

export interface MenuItemFilters {
  restaurantId?: string;
  category?: string[];
  isVeg?: boolean;
  isVegan?: boolean;
  isGlutenFree?: boolean;
  isSpicy?: boolean;
  priceMin?: number;
  priceMax?: number;
  rating?: number;
  search?: string;
  sortBy?: 'price' | 'rating' | 'name';
  sortOrder?: 'asc' | 'desc';
}

export interface PaginationParams {
  page?: number;
  limit?: number;
}

export interface ApiResponse<T> {
  data: T;
  pagination?: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
  };
  filters?: {
    cuisines: string[];
    priceRanges: string[];
    categories: string[];
    locations: string[];
  };
}