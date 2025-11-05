'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    console.log('🧹 Limpiando base de datos antes de insertar datos nuevos...');

    // 🔥 Desactivar temporalmente las restricciones de clave foránea
    await queryInterface.sequelize.query('PRAGMA foreign_keys = OFF;');

    // Limpiar tablas en orden (ya sin restricciones)
    await queryInterface.bulkDelete('Comments', null, {});
    await queryInterface.bulkDelete('Post_Tags', null, {});
    await queryInterface.bulkDelete('Tags', null, {});
    await queryInterface.bulkDelete('Post_Images', null, {});
    await queryInterface.bulkDelete('Posts', null, {});
    await queryInterface.bulkDelete('Users', null, {});

    console.log('✅ Tablas limpiadas correctamente.');

    // 🔁 Reactivar restricciones de clave foránea
    await queryInterface.sequelize.query('PRAGMA foreign_keys = ON;');

    // --- Inserción de datos (lo mismo que ya tenías) ---
    await queryInterface.bulkInsert('Users', [
      { nickName: 'gonzalo', email: 'gonzalo@mail.com', createdAt: new Date(), updatedAt: new Date() },
      { nickName: 'sofia', email: 'sofia@mail.com', createdAt: new Date(), updatedAt: new Date() },
      { nickName: 'tomas', email: 'tomas@mail.com', createdAt: new Date(), updatedAt: new Date() },
      { nickName: 'mariano', email: 'mariano@mail.com', createdAt: new Date(), updatedAt: new Date() }
    ]);

    await queryInterface.bulkInsert('Posts', [
      { description: 'Explorando el nuevo framework de JavaScript 🚀', userId: 1, createdAt: new Date(), updatedAt: new Date() },
      { description: 'Primer día probando Node.js con Express 💻', userId: 2, createdAt: new Date(), updatedAt: new Date() },
      { description: '¿Qué opinan del nuevo VSCode update? ✨', userId: 3, createdAt: new Date(), updatedAt: new Date() },
      { description: 'Trabajando en mi primer API REST con Sequelize 🔥', userId: 4, createdAt: new Date(), updatedAt: new Date() },
      { description: 'Tips para mejorar tu flujo de trabajo en Git 👨‍💻', userId: 1, createdAt: new Date(), updatedAt: new Date() },
    ]);

    await queryInterface.bulkInsert('Post_Images', [
      { url: 'https://picsum.photos/id/101/400', postId: 1, createdAt: new Date(), updatedAt: new Date() },
      { url: 'https://picsum.photos/id/102/400', postId: 2, createdAt: new Date(), updatedAt: new Date() },
      { url: 'https://picsum.photos/id/103/400', postId: 3, createdAt: new Date(), updatedAt: new Date() },
      { url: 'https://picsum.photos/id/104/400', postId: 4, createdAt: new Date(), updatedAt: new Date() },
      { url: 'https://picsum.photos/id/105/400', postId: 5, createdAt: new Date(), updatedAt: new Date() },
    ]);

    await queryInterface.bulkInsert('Tags', [
      { name: 'javascript', createdAt: new Date(), updatedAt: new Date() },
      { name: 'nodejs', createdAt: new Date(), updatedAt: new Date() },
      { name: 'express', createdAt: new Date(), updatedAt: new Date() },
      { name: 'sequelize', createdAt: new Date(), updatedAt: new Date() },
      { name: 'backend', createdAt: new Date(), updatedAt: new Date() }
    ]);

    await queryInterface.bulkInsert('Post_Tags', [
      { postId: 1, tagId: 1, createdAt: new Date(), updatedAt: new Date() },
      { postId: 1, tagId: 5, createdAt: new Date(), updatedAt: new Date() },
      { postId: 2, tagId: 2, createdAt: new Date(), updatedAt: new Date() },
      { postId: 3, tagId: 3, createdAt: new Date(), updatedAt: new Date() },
      { postId: 4, tagId: 4, createdAt: new Date(), updatedAt: new Date() },
      { postId: 5, tagId: 5, createdAt: new Date(), updatedAt: new Date() }
    ]);

    await queryInterface.bulkInsert('Comments', [
      { text: 'Excelente aporte, gracias por compartir!', visible: true, postId: 1, userId: 2, createdAt: new Date(), updatedAt: new Date() },
      { text: 'No conocía ese truco de Git 😎', visible: true, postId: 5, userId: 3, createdAt: new Date(), updatedAt: new Date() },
      { text: 'Me gustó el enfoque que le diste al proyecto 💪', visible: true, postId: 4, userId: 1, createdAt: new Date(), updatedAt: new Date() },
      { text: 'Muy buena explicación sobre Express!', visible: true, postId: 2, userId: 4, createdAt: new Date(), updatedAt: new Date() },
      { text: 'Gracias por la info!', visible: true, postId: 3, userId: 2, createdAt: new Date(), updatedAt: new Date() }
    ]);

    console.log('🌱 Datos de ejemplo insertados correctamente.');
  },

  async down(queryInterface, Sequelize) {
    console.log('🧨 Eliminando todos los datos de ejemplo...');
    await queryInterface.bulkDelete('Comments', null, {});
    await queryInterface.bulkDelete('Post_Tags', null, {});
    await queryInterface.bulkDelete('Tags', null, {});
    await queryInterface.bulkDelete('Post_Images', null, {});
    await queryInterface.bulkDelete('Posts', null, {});
    await queryInterface.bulkDelete('Users', null, {});
  }
};
