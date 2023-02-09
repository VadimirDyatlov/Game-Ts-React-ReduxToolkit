module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert('Chats', [
      {
        user_id: 2,
        message: 'Ходячих должно быть больше...',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        user_id: 3,
        message: 'Добавьте замедление пуль!',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        user_id: 6,
        message: 'Где Рики Верона?',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ], {});
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Chats', null, {});
  },
};
