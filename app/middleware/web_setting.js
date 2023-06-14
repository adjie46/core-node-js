var library = require("../core/library");

exports.web_setting = async (req, res, next) => {
	return new Promise(async (resolve, reject) => {
		try {
			web_setting = await library.model.web_settings.findOne({
				limit: 1,
			});

			req.web_setting = web_setting;

			next();
		} catch (error) {
			reject(error);
		}
	});
};
