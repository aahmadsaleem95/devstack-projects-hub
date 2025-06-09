"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    const todos = [];
    const products = [];
    const timestamp = new Date();

    for (let i = 0; i < 1000; i++) {
      todos.push({
        name: `Todo ${i + 1}`,
        description: `Description for todo ${i + 1}`,
        createdAt: timestamp,
        updatedAt: timestamp,
      });
      products.push({
        name: `Product ${i + 1}`,
        description: `Description for product ${i + 1}`,
        quantity: Math.floor(Math.random() * 100),
        price: parseFloat((Math.random() * 100).toFixed(2)),
        category: `Category ${i % 10}`,
        createdAt: timestamp,
        updatedAt: timestamp,
      });
    }
    await queryInterface.bulkInsert("Todo", todos);
    await queryInterface.bulkInsert("Product", products);
  },

  async down(queryInterface, Sequelize) {},
};
