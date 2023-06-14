"use strict";

var library = require("../../core/library");

/** @type {import('sequelize-cli').Migration} */
(
	module.exports = {
		async up(queryInterface, Sequelize) {
			return queryInterface.bulkInsert("web_settings", [
				{
					id: await library.uuid(),
					web_name: "Admin Panel",
					web_desc: "Admin Panel",
					web_author: "Adjie Kurniawan",
					web_keywords: "Admin Panel By Adjie Kurniawan",
					web_url: "localhost",
					web_icon: "default.png",
					web_logo: "default.png",
					createdAt: new Date(),
					updatedAt: new Date(),
				},
			]);
		},

		async down(queryInterface, Sequelize) {
			return queryInterface.bulkDelete("web_settings", null, {});
		},
	}
);
