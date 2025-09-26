import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  console.log('🌱 Seeding database...');

  // Clear existing data
  await prisma.menuItem.deleteMany();
  await prisma.restaurant.deleteMany();

  // Seed Restaurants
  const restaurants = await Promise.all([
    // Italian Restaurants
    prisma.restaurant.create({
      data: {
        name: "Mama Mia's Italian Kitchen",
        image: "https://images.unsplash.com/photo-1555396273-367ea4eb4db5?w=500",
        description: "Authentic Italian cuisine with fresh ingredients and traditional recipes",
        rating: 4.5,
        deliveryTime: "25-40 min",
        deliveryFee: 2.99,
        minOrder: 15.00,
        cuisine: ["Italian", "Pizza", "Pasta"],
        isVeg: false,
        location: "Downtown",
        priceRange: "mid-range",
        menuItems: {
          create: [
            {
              name: "Margherita Pizza",
              description: "Fresh mozzarella, tomato sauce, and basil",
              price: 14.99,
              image: "https://images.unsplash.com/photo-1565299624946-b28f40a0ca4b?w=300",
              category: "pizza",
              isVeg: true,
              rating: 4.6,
              prepTime: "15-20 min"
            },
            {
              name: "Pepperoni Pizza",
              description: "Classic pepperoni with mozzarella cheese",
              price: 16.99,
              image: "https://images.unsplash.com/photo-1628840042765-356cda07504e?w=300",
              category: "pizza",
              isVeg: false,
              rating: 4.4,
              prepTime: "15-20 min"
            },
            {
              name: "Spaghetti Carbonara",
              description: "Creamy pasta with bacon, eggs, and parmesan",
              price: 18.99,
              image: "https://images.unsplash.com/photo-1621996346565-e3dbc353d2e5?w=300",
              category: "pasta",
              isVeg: false,
              rating: 4.7,
              prepTime: "20-25 min"
            },
            {
              name: "Caesar Salad",
              description: "Crisp romaine lettuce with caesar dressing",
              price: 9.99,
              image: "https://images.unsplash.com/photo-1550304943-4f24f54ddde9?w=300",
              category: "salad",
              isVeg: true,
              rating: 4.2,
              prepTime: "10-15 min"
            }
          ]
        }
      }
    }),

    // Chinese Restaurant
    prisma.restaurant.create({
      data: {
        name: "Dragon Palace",
        image: "https://images.unsplash.com/photo-1526318896980-cf78c088247c?w=500",
        description: "Traditional Chinese cuisine with modern presentation",
        rating: 4.4,
        deliveryTime: "30-45 min",
        deliveryFee: 3.49,
        minOrder: 22.00,
        cuisine: ["Chinese", "Asian", "Dim Sum"],
        isVeg: false,
        location: "Chinatown",
        priceRange: "mid-range",
        menuItems: {
          create: [
            {
              name: "Sweet & Sour Chicken",
              description: "Crispy chicken with sweet and sour sauce",
              price: 15.99,
              image: "https://images.unsplash.com/photo-1565299507177-b0ac66763828?w=300",
              category: "main",
              isVeg: false,
              rating: 4.3,
              prepTime: "20-25 min"
            },
            {
              name: "Vegetable Fried Rice",
              description: "Wok-fried rice with mixed vegetables",
              price: 11.99,
              image: "https://images.unsplash.com/photo-1603133872878-684f208fb84b?w=300",
              category: "rice",
              isVeg: true,
              rating: 4.2,
              prepTime: "15-20 min"
            },
            {
              name: "Pork Dumplings",
              description: "Steamed dumplings with seasoned pork filling",
              price: 8.99,
              image: "https://images.unsplash.com/photo-1496116218417-1a781b1c416c?w=300",
              category: "appetizers",
              isVeg: false,
              rating: 4.6,
              prepTime: "15-20 min"
            },
            {
              name: "Hot & Sour Soup",
              description: "Traditional soup with tofu and mushrooms",
              price: 6.99,
              image: "https://images.unsplash.com/photo-1547592180-85f173990554?w=300",
              category: "soup",
              isVeg: true,
              isSpicy: true,
              rating: 4.1,
              prepTime: "10-15 min"
            }
          ]
        }
      }
    }),

    // Mediterranean Restaurant
    prisma.restaurant.create({
      data: {
        name: "Olive Branch Mediterranean",
        image: "https://images.unsplash.com/photo-1544510820-4afa61b81b85?w=500",
        description: "Fresh Mediterranean dishes with olive oil and herbs",
        rating: 4.5,
        deliveryTime: "25-35 min",
        deliveryFee: 2.99,
        minOrder: 18.00,
        cuisine: ["Mediterranean", "Greek", "Healthy"],
        isVeg: false,
        location: "Uptown",
        priceRange: "mid-range",
        menuItems: {
          create: [
            {
              name: "Greek Gyro",
              description: "Lamb and beef with tzatziki in pita bread",
              price: 12.99,
              image: "https://images.unsplash.com/photo-1529006557810-274b9b2fc783?w=300",
              category: "wraps",
              isVeg: false,
              rating: 4.7,
              prepTime: "15-20 min"
            },
            {
              name: "Falafel Bowl",
              description: "Crispy falafel with hummus and fresh vegetables",
              price: 13.99,
              image: "https://images.unsplash.com/photo-1540420773420-3366772f4999?w=300",
              category: "bowls",
              isVeg: true,
              isVegan: true,
              rating: 4.4,
              prepTime: "20-25 min"
            },
            {
              name: "Greek Salad",
              description: "Mixed greens with feta, olives, and olive oil",
              price: 10.99,
              image: "https://images.unsplash.com/photo-1540420773420-3366772f4999?w=300",
              category: "salad",
              isVeg: true,
              rating: 4.5,
              prepTime: "10-15 min"
            },
            {
              name: "Baklava",
              description: "Sweet pastry with nuts and honey",
              price: 5.99,
              image: "https://images.unsplash.com/photo-1571877227200-a0d98ea607e9?w=300",
              category: "desserts",
              isVeg: true,
              rating: 4.6,
              prepTime: "5 min"
            }
          ]
        }
      }
    }),

    // Healthy Bowl Restaurant
    prisma.restaurant.create({
      data: {
        name: "Fresh & Fit Bowls",
        image: "https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=500",
        description: "Healthy bowls and salads with organic ingredients",
        rating: 4.6,
        deliveryTime: "20-30 min",
        deliveryFee: 2.49,
        minOrder: 12.00,
        cuisine: ["Healthy", "Salads", "Bowls"],
        isVeg: true,
        location: "Downtown",
        priceRange: "mid-range",
        menuItems: {
          create: [
            {
              name: "Buddha Bowl",
              description: "Quinoa, roasted vegetables, and tahini dressing",
              price: 14.99,
              image: "https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=300",
              category: "bowls",
              isVeg: true,
              isVegan: true,
              isGlutenFree: true,
              rating: 4.8,
              prepTime: "15-20 min"
            },
            {
              name: "Acai Bowl",
              description: "Acai berries with granola and fresh fruit",
              price: 11.99,
              image: "https://images.unsplash.com/photo-1511690743698-d9d85f2fbf38?w=300",
              category: "bowls",
              isVeg: true,
              isVegan: true,
              isGlutenFree: true,
              rating: 4.5,
              prepTime: "10-15 min"
            },
            {
              name: "Kale Caesar Salad",
              description: "Massaged kale with vegan caesar dressing",
              price: 12.99,
              image: "https://images.unsplash.com/photo-1540420773420-3366772f4999?w=300",
              category: "salad",
              isVeg: true,
              isVegan: true,
              rating: 4.3,
              prepTime: "10-15 min"
            },
            {
              name: "Green Smoothie",
              description: "Spinach, banana, mango, and coconut water",
              price: 6.99,
              image: "https://images.unsplash.com/photo-1638176066666-ffb2f013c7dd?w=300",
              category: "beverages",
              isVeg: true,
              isVegan: true,
              rating: 4.4,
              prepTime: "5 min"
            }
          ]
        }
      }
    }),

    // Pizza Specialty Shop
    prisma.restaurant.create({
      data: {
        name: "Artisan Pizza Co.",
        image: "https://images.unsplash.com/photo-1513104890138-7c749659a591?w=500",
        description: "Gourmet pizzas with artisan ingredients and wood-fired oven",
        rating: 4.8,
        deliveryTime: "25-40 min",
        deliveryFee: 3.99,
        minOrder: 16.00,
        cuisine: ["Pizza", "Italian", "Gourmet"],
        isVeg: false,
        location: "Midtown",
        priceRange: "premium",
        menuItems: {
          create: [
            {
              name: "Truffle Mushroom Pizza",
              description: "Wild mushrooms with truffle oil and parmesan",
              price: 24.99,
              image: "https://images.unsplash.com/photo-1513104890138-7c749659a591?w=300",
              category: "pizza",
              isVeg: true,
              rating: 4.9,
              prepTime: "20-25 min"
            },
            {
              name: "Prosciutto & Arugula",
              description: "Prosciutto, fresh arugula, and burrata cheese",
              price: 22.99,
              image: "https://images.unsplash.com/photo-1565299624946-b28f40a0ca4b?w=300",
              category: "pizza",
              isVeg: false,
              rating: 4.7,
              prepTime: "20-25 min"
            },
            {
              name: "Vegan Supreme",
              description: "Plant-based cheese with roasted vegetables",
              price: 19.99,
              image: "https://images.unsplash.com/photo-1571407970349-bc81e7e96d47?w=300",
              category: "pizza",
              isVeg: true,
              isVegan: true,
              rating: 4.4,
              prepTime: "20-25 min"
            },
            {
              name: "Tiramisu",
              description: "Classic Italian dessert with espresso",
              price: 7.99,
              image: "https://images.unsplash.com/photo-1571877227200-a0d98ea607e9?w=300",
              category: "desserts",
              isVeg: true,
              rating: 4.8,
              prepTime: "5 min"
            }
          ]
        }
      }
    }),

    // Mexican Restaurant
    prisma.restaurant.create({
      data: {
        name: "El Sombrero",
        image: "https://images.unsplash.com/photo-1565299585323-38174c4a6471?w=500",
        description: "Fresh Mexican food with bold flavors and authentic recipes",
        rating: 4.4,
        deliveryTime: "20-35 min",
        deliveryFee: 2.49,
        minOrder: 12.00,
        cuisine: ["Mexican", "Tacos", "Burritos"],
        isVeg: false,
        location: "Downtown",
        priceRange: "budget",
        menuItems: {
          create: [
            {
              name: "Chicken Tacos",
              description: "Grilled chicken with fresh salsa and cilantro",
              price: 12.99,
              image: "https://images.unsplash.com/photo-1565299624946-b28f40a0ca4b?w=300",
              category: "tacos",
              isVeg: false,
              isSpicy: true,
              rating: 4.5,
              prepTime: "15-20 min"
            },
            {
              name: "Veggie Burrito",
              description: "Black beans, rice, peppers, and guacamole",
              price: 10.99,
              image: "https://images.unsplash.com/photo-1626700051175-6818013e1d4f?w=300",
              category: "burritos",
              isVeg: true,
              rating: 4.2,
              prepTime: "15-20 min"
            },
            {
              name: "Nachos Supreme",
              description: "Crispy chips with cheese, jalapeños, and sour cream",
              price: 9.99,
              image: "https://images.unsplash.com/photo-1513456852971-30c0b8199d4d?w=300",
              category: "appetizers",
              isVeg: true,
              isSpicy: true,
              rating: 4.3,
              prepTime: "10-15 min"
            },
            {
              name: "Horchata",
              description: "Traditional rice drink with cinnamon",
              price: 3.99,
              image: "https://images.unsplash.com/photo-1571091655789-405eb7a3a3a8?w=300",
              category: "beverages",
              isVeg: true,
              rating: 4.1,
              prepTime: "5 min"
            }
          ]
        }
      }
    }),

    // Japanese Restaurant
    prisma.restaurant.create({
      data: {
        name: "Sakura Sushi",
        image: "https://images.unsplash.com/photo-1579584425555-c3ce17fd4351?w=500",
        description: "Fresh sushi and Japanese cuisine with premium ingredients",
        rating: 4.7,
        deliveryTime: "35-50 min",
        deliveryFee: 4.99,
        minOrder: 25.00,
        cuisine: ["Japanese", "Sushi", "Asian"],
        isVeg: false,
        location: "Uptown",
        priceRange: "premium",
        menuItems: {
          create: [
            {
              name: "Salmon Sashimi",
              description: "Fresh Atlantic salmon, thinly sliced",
              price: 18.99,
              image: "https://images.unsplash.com/photo-1579584425555-c3ce17fd4351?w=300",
              category: "sushi",
              isVeg: false,
              rating: 4.8,
              prepTime: "20-25 min"
            },
            {
              name: "Vegetable Roll",
              description: "Cucumber, avocado, and carrot sushi roll",
              price: 8.99,
              image: "https://images.unsplash.com/photo-1611143669185-af224c5e3252?w=300",
              category: "sushi",
              isVeg: true,
              rating: 4.4,
              prepTime: "15-20 min"
            },
            {
              name: "Chicken Teriyaki",
              description: "Grilled chicken with teriyaki sauce and rice",
              price: 16.99,
              image: "https://images.unsplash.com/photo-1546833999-b9f581a1996d?w=300",
              category: "main",
              isVeg: false,
              rating: 4.6,
              prepTime: "25-30 min"
            },
            {
              name: "Miso Soup",
              description: "Traditional soybean paste soup",
              price: 4.99,
              image: "https://images.unsplash.com/photo-1606491956689-2ea866880c84?w=300",
              category: "soup",
              isVeg: true,
              rating: 4.2,
              prepTime: "10-15 min"
            }
          ]
        }
      }
    }),

    // American Burger Joint
    prisma.restaurant.create({
      data: {
        name: "Big Bite Burgers",
        image: "https://images.unsplash.com/photo-1571091655789-405eb7a3a3a8?w=500",
        description: "Juicy burgers and crispy fries made fresh daily",
        rating: 4.2,
        deliveryTime: "15-30 min",
        deliveryFee: 1.99,
        minOrder: 10.00,
        cuisine: ["American", "Burgers", "Fast Food"],
        isVeg: false,
        location: "Downtown",
        priceRange: "budget",
        menuItems: {
          create: [
            {
              name: "Classic Cheeseburger",
              description: "Beef patty with cheese, lettuce, and tomato",
              price: 11.99,
              image: "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=300",
              category: "burgers",
              isVeg: false,
              rating: 4.3,
              prepTime: "15-20 min"
            },
            {
              name: "Veggie Burger",
              description: "Plant-based patty with all the fixings",
              price: 10.99,
              image: "https://images.unsplash.com/photo-1525059696034-4967a729002e?w=300",
              category: "burgers",
              isVeg: true,
              rating: 4.0,
              prepTime: "15-20 min"
            },
            {
              name: "Crispy Fries",
              description: "Golden fries seasoned with sea salt",
              price: 5.99,
              image: "https://images.unsplash.com/photo-1573080496219-bb080dd4f877?w=300",
              category: "sides",
              isVeg: true,
              rating: 4.4,
              prepTime: "10-15 min"
            },
            {
              name: "Chocolate Milkshake",
              description: "Creamy chocolate shake with whipped cream",
              price: 5.99,
              image: "https://images.unsplash.com/photo-1572490122747-3968b75cc699?w=300",
              category: "beverages",
              isVeg: true,
              rating: 4.5,
              prepTime: "5-10 min"
            }
          ]
        }
      }
    }),

    // Thai Restaurant
    prisma.restaurant.create({
      data: {
        name: "Thai Basil",
        image: "https://images.unsplash.com/photo-1559847844-d90143c609af?w=500",
        description: "Authentic Thai flavors with fresh herbs and spices",
        rating: 4.6,
        deliveryTime: "25-40 min",
        deliveryFee: 3.99,
        minOrder: 18.00,
        cuisine: ["Thai", "Asian", "Spicy"],
        isVeg: false,
        location: "Midtown",
        priceRange: "mid-range",
        menuItems: {
          create: [
            {
              name: "Pad Thai",
              description: "Stir-fried noodles with shrimp, tofu, and peanuts",
              price: 15.99,
              image: "https://images.unsplash.com/photo-1559847844-d90143c609af?w=300",
              category: "noodles",
              isVeg: false,
              isSpicy: true,
              rating: 4.7,
              prepTime: "20-25 min"
            },
            {
              name: "Green Curry",
              description: "Coconut curry with vegetables and jasmine rice",
              price: 14.99,
              image: "https://images.unsplash.com/photo-1455619452474-d2be8b1e70cd?w=300",
              category: "curry",
              isVeg: true,
              isSpicy: true,
              rating: 4.5,
              prepTime: "25-30 min"
            },
            {
              name: "Tom Yum Soup",
              description: "Spicy and sour soup with shrimp and mushrooms",
              price: 8.99,
              image: "https://images.unsplash.com/photo-1551326844-4df70f78d0e9?w=300",
              category: "soup",
              isVeg: false,
              isSpicy: true,
              rating: 4.4,
              prepTime: "15-20 min"
            },
            {
              name: "Mango Sticky Rice",
              description: "Sweet dessert with fresh mango and coconut",
              price: 6.99,
              image: "https://images.unsplash.com/photo-1488900128323-21503983a07e?w=300",
              category: "desserts",
              isVeg: true,
              rating: 4.6,
              prepTime: "10-15 min"
            }
          ]
        }
      }
    })
  ]);

  console.log(`✅ Created ${restaurants.length} restaurants with menu items`);
  console.log('🎉 Seeding completed successfully!');
}

main()
  .catch((e) => {
    console.error('❌ Error seeding database:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });