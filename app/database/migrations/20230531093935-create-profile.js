"use strict";
/** @type {import('sequelize-cli').Migration} */
var dataType = require("sequelize/lib/data-types");
module.exports = {
	async up(queryInterface, Sequelize) {
		await queryInterface.createTable("profiles", {
			id: {
				allowNull: false,
				primaryKey: true,
				type: Sequelize.UUID,
				defaultValue: dataType.UUID,
			},
			id_auth: {
				type: Sequelize.UUID,
				defaultValue: dataType.UUID,
				allowNull: false,
				references: {
					model: "auths",
					id: "id",
				},
			},
			full_name: {
				type: Sequelize.STRING,
				allowNull: false,
			},
			email: {
				type: Sequelize.STRING,
				allowNull: false,
			},
			phone: {
				type: Sequelize.STRING,
				allowNull: false,
			},
			photo_profile: {
				type: Sequelize.STRING,
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
		await queryInterface.dropTable("profiles");
	},
};
