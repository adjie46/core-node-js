"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
	class web_settings extends Model {
		/**
		 * Helper method for defining associations.
		 * This method is not a part of Sequelize lifecycle.
		 * The `models/index` file will call this method automatically.
		 */
		static associate(models) {
			// define association here
		}
	}
	web_settings.init(
		{
			web_name: DataTypes.STRING,
			web_desc: DataTypes.STRING,
			web_author: DataTypes.STRING,
			web_keywords: DataTypes.STRING,
			web_url: DataTypes.STRING,
			web_icon: DataTypes.STRING,
			web_logo: DataTypes.STRING,
		},
		{
			sequelize,
			modelName: "web_settings",
		}
	);
	return web_settings;
};
