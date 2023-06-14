"use strict";
/** @type {import('sequelize-cli').Migration} */
var dataType = require("sequelize/lib/data-types");
module.exports = {
	async up(queryInterface, Sequelize) {
		await queryInterface.createTable("web_settings", {
			id: {
				allowNull: false,
				primaryKey: true,
				type: Sequelize.UUID,
				defaultValue: dataType.UUID,
			},
			web_name: {
				type: Sequelize.STRING,
			},
			web_desc: {
				type: Sequelize.STRING,
			},
			web_author: {
				type: Sequelize.STRING,
			},
			web_keywords: {
				type: Sequelize.STRING,
			},
			web_url: {
				type: Sequelize.STRING,
			},
			web_icon: {
				type: Sequelize.STRING,
			},
			web_logo: {
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
		await queryInterface.dropTable("web_settings");
	},
};
