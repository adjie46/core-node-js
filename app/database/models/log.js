"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
	class log extends Model {
		/**
		 * Helper method for defining associations.
		 * This method is not a part of Sequelize lifecycle.
		 * The `models/index` file will call this method automatically.
		 */
		static associate(models) {
			// define association here
		}
	}
	log.init(
		{
			id_auth: DataTypes.STRING,
			log_type: DataTypes.STRING,
			log_action: DataTypes.STRING,
			log_os: DataTypes.STRING,
			log_devices: DataTypes.STRING,
			log_ip: DataTypes.STRING,
		},
		{
			sequelize,
			modelName: "log",
		}
	);
	return log;
};
