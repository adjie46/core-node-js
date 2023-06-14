"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
	class auth extends Model {
		/**
		 * Helper method for defining associations.
		 * This method is not a part of Sequelize lifecycle.
		 * The `models/index` file will call this method automatically.
		 */
		static associate(models) {
			auth.hasOne(models.profile, {
				foreignKey: "id_auth",
				as: "profile",
			});
		}
	}
	auth.init(
		{
			user_auth: DataTypes.STRING,
			user_pass: DataTypes.STRING,
			user_type: DataTypes.STRING,
			status: DataTypes.STRING,
		},
		{
			sequelize,
			modelName: "auth",
		}
	);
	return auth;
};
