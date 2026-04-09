'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    // Verificar se a coluna created_at existe
    const tableDescription = await queryInterface.describeTable('Users');

    // Adicionar created_at se não existir
    if (!tableDescription.created_at) {
      await queryInterface.addColumn('Users', 'created_at', {
        type: Sequelize.DATE,
        allowNull: true,
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'),
      });
      console.log('Added created_at column');
    } else {
      console.log('created_at column already exists, skipping...');
    }

    // Adicionar updated_at se não existir
    if (!tableDescription.updated_at) {
      await queryInterface.addColumn('Users', 'updated_at', {
        type: Sequelize.DATE,
        allowNull: true,
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'),
      });
      console.log('Added updated_at column');
    } else {
      console.log('updated_at column already exists, skipping...');
    }
  },

  async down(queryInterface, Sequelize) {
    // Remover colunas se existirem
    const tableDescription = await queryInterface.describeTable('Users');

    if (tableDescription.created_at) {
      await queryInterface.removeColumn('Users', 'created_at');
    }

    if (tableDescription.updated_at) {
      await queryInterface.removeColumn('Users', 'updated_at');
    }
  },
};
