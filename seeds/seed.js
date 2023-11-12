const sequelize = require('../config/connection');

const { User, Category, Location } = require('../models');

const seedData = async () => {
  try {
    await sequelize.sync({
        "force": true
    });

    // Seed Users
    const users = await User.bulkCreate([
      {
        name: 'User 1',
        email: 'user1@example.com',
        password: 'password1',
      },
      {
        name: 'User 2',
        email: 'user2@example.com',
        password: 'password2',
      },
    ]);

    // Seed Categories
    const hikesCategory = await Category.create({
      name: 'Hikes',
    });

    const restaurantCategory = await Category.create({
      name: 'Restaurant',
    });

    // Seed Locations
    const sanFranciscoLocation1 = await Location.create({
      lat: 37.7749,
      lon: -122.4194,
      location_name: 'Hike Spot 1',
      user_id: users[0].id,
      category_id: hikesCategory.id,
    });

    const sanFranciscoLocation2 = await Location.create({
      lat: 37.7749,
      lon: -122.4194,
      location_name: 'Restaurant 1',
      user_id: users[1].id,
      category_id: restaurantCategory.id,
    });

    console.log('Seed data inserted successfully.');
  } catch (error) {
    console.error('Error seeding data:', error);
  }
};

seedData();
