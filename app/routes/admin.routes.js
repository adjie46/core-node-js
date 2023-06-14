const express = require("express");
const { web_setting } = require("../middleware/web_setting");
const route = express.Router();

const webSetting = require("../middleware/web_setting");
const authMiddleware = require("../middleware/auth.middleware");

const errorController = require("../controller/error.controller");
const authController = require("../controller/auth.controller");
const dashboardController = require("../controller/dashboard.controller");

route.get(
	"/404",
	authMiddleware.mode,
	webSetting.web_setting,
	errorController.err_404
);
route.get(
	"/login",
	authMiddleware.mode,
	webSetting.web_setting,
	authMiddleware.auth,
	authController.login_pages
);
route.get(
	"/",
	authMiddleware.mode,
	webSetting.web_setting,
	authMiddleware.auth,
	authController.login_pages
);

route.get(
	"/dashboard",
	authMiddleware.mode,
	webSetting.web_setting,
	authMiddleware.unauth,
	dashboardController.dashboard_pages
);

//AUTH
route.post(
	"/login",
	authMiddleware.mode,
	webSetting.web_setting,
	authController.login_action
);

route.get(
	"/logout",
	authMiddleware.mode,
	webSetting.web_setting,
	authController.authLogout
);

route.all(
	"*",
	authMiddleware.mode,
	webSetting.web_setting,
	errorController.err_404
);

module.exports = route;
