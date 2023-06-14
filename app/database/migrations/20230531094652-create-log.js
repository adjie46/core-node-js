"use strict";
/** @type {import('sequelize-cli').Migration} */
var dataType = require("sequelize/lib/data-types");
module.exports = {
	async up(queryInterface, Sequelize) {
		await queryInterface.createTable("logs", {
			id: {
				allowNull: false,
				autoIncrement: true,
				primaryKey: true,
				type: Sequelize.BIGINT,
			},
			id_auth: {
				type: Sequelize.STRING,
			},
			log_type: {
				type: Sequelize.STRING,
			},
			log_action: {
				type: Sequelize.STRING,
			},
			log_os: {
				type: Sequelize.STRING,
			},
			log_devices: {
				type: Sequelize.STRING,
			},
			log_ip: {
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
		await queryInterface.dropTable("logs");
	},
};
