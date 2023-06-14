"use strict";

/** @type {import('sequelize-cli').Migration} */

const library = require("../../core/library");

module.exports = {
	async up(queryInterface, Sequelize) {
		return queryInterface
			.bulkInsert("auths", [
				{
					id: await library.uuid(),
					user_auth: "admin@gmail.com",
					user_pass: await library.encrypt("admin"),
					user_type: -1,
					status: 1,
					createdAt: new Date(),
					updatedAt: new Date(),
				},
			])
			.then(async function () {
				const auths = await queryInterface.sequelize.query(
					`SELECT id from auths order by createdAt DESC;`
				);

				const idAuth = auths[0][0].id;

				return queryInterface.bulkInsert("profiles", [
					{
						id: await library.uuid(),
						id_auth: idAuth,
						full_name: "Administrator",
						email: "admin@gmail.com",
						phone: "6281269494591",
						photo_profile: "default.png",
						createdAt: new Date(),
						updatedAt: new Date(),
					},
				]);
			});
	},

	async down(queryInterface, Sequelize) {},
};
