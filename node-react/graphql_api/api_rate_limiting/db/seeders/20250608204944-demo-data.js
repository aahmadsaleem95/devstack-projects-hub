"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    const todos = [];
    const products = [];
    const timestamp = new Date();

    const verbs = [
      "Finish",
      "Start",
      "Review",
      "Plan",
      "Write",
      "Update",
      "Fix",
      "Organize",
      "Call",
      "Email",
    ];
    const nouns = [
      "report",
      "task",
      "feature",
      "presentation",
      "meeting",
      "API",
      "UI",
      "backend",
      "test",
      "issue",
    ];

    const productAdjectives = [
      "Eco",
      "Premium",
      "Budget",
      "Smart",
      "Ultra",
      "Compact",
      "Advanced",
    ];
    const productItems = [
      "Phone",
      "Laptop",
      "Headphones",
      "Watch",
      "Camera",
      "Microwave",
      "Speaker",
      "Router",
    ];
    const categories = [
      "Electronics",
      "Home",
      "Gadgets",
      "Office",
      "Fitness",
      "Kitchen",
      "Outdoor",
      "Clothing",
      "Books",
      "Toys",
    ];

    for (let i = 0; i < 1000; i++) {
      // Generate Todos
      const verb = verbs[Math.floor(Math.random() * verbs.length)];
      const noun = nouns[Math.floor(Math.random() * nouns.length)];
      todos.push({
        name: `${verb} ${noun}`,
        description: `Task to ${verb.toLowerCase()} the ${noun}`,
        createdAt: timestamp,
        updatedAt: timestamp,
      });

      // Generate Products
      const adj =
        productAdjectives[Math.floor(Math.random() * productAdjectives.length)];
      const item =
        productItems[Math.floor(Math.random() * productItems.length)];
      const category = categories[i % categories.length];
      products.push({
        name: `${adj} ${item}`,
        description: `A ${adj.toLowerCase()} ${item.toLowerCase()} designed for ${category.toLowerCase()} use.`,
        quantity: Math.floor(Math.random() * 100),
        price: parseFloat((Math.random() * 1000 + 10).toFixed(2)), // $10 - $1010
        category: category,
        createdAt: timestamp,
        updatedAt: timestamp,
      });
    }

    await queryInterface.bulkInsert("Todo", todos);
    await queryInterface.bulkInsert("Product", products);
  },

  async down(queryInterface, Sequelize) {},
};
