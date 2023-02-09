const bcrypt = require('bcrypt');

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert(
      'Users',
      [
        {
          name: 'JoniD',
          password: await bcrypt.hash('12345678', 8),
          gold: 51,
          avatar: '123',
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          name: 'Rick',
          password: await bcrypt.hash('12345678', 8),
          gold: 164,
          avatar: '123',
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          name: 'Neo',
          password: await bcrypt.hash('12345678', 8),
          gold: 230,
          avatar: '123',
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          name: 'Charlie',
          password: await bcrypt.hash('12345678', 8),
          gold: 67,
          avatar: '123',
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          name: 'Chuck',
          password: await bcrypt.hash('12345678', 8),
          gold: 122,
          avatar: '123',
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          name: 'ChefCelios',
          password: await bcrypt.hash('12345678', 8),
          gold: 88,
          avatar: '123',
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ],
      {},
    );
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Users', null, {});
  },
};
