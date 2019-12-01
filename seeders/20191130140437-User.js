'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => 
    queryInterface.bulkInsert(
    'User',
    [
      {
        username: 'ti123',
        password: 'ti123',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        username: 'teo234',
        password: 'teo234',
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ],
    {},
  ),
  down: (queryInterface, Sequelize) => queryInterface.bulkDelete('User', null, {})
};
