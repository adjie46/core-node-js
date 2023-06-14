"use strict";
/** @type {import('sequelize-cli').Migration} */
var dataType = require("sequelize/lib/data-types");
module.exports = {
	async up(queryInterface, Sequelize) {
		await queryInterface.createTable("auths", {
			id: {
				allowNull: false,
				primaryKey: true,
				type: Sequelize.UUID,
				defaultValue: dataType.UUID,
			},
			user_auth: {
				type: Sequelize.STRING,
				allowNull: false,
			},
			user_pass: {
				type: Sequelize.STRING,
				allowNull: false,
			},
			user_type: {
				type: Sequelize.STRING,
				allowNull: false,
			},
			status: {
				type: Sequelize.STRING,
				allowNull: false,
				defaultValue: 0,
			},
			createdAt: {
				type: "TIMESTAMP",
				defaultValue: Sequelize.literal("CURRENT_TIMESTAMP"),
				allowNull: false,
			},
			updatedAt: {
				type: "TIMESTAMP",
				defaultValue: Sequelize.literal("CURRENT_TIMESTAMP"),
				allowNull: false,
			},
		});
	},
	async down(queryInterface, Sequelize) {
		await queryInterface.dropTable("auths");
	},
};
