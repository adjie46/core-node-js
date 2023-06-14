//IMPORT CORE LIBRARY
var library = require("./app/core/library");

//IMPORT ROUTES
const webRoutes = require(__dirname + "/app/routes/admin.routes");

//INITIALIZE EXPRESS
const app = library.express();

//BODYPARSER CONFIG
app.use(
	library.bodyParser.json({
		limit: library.config.limitBody,
	})
);
app.use(
	library.bodyParser.urlencoded({
		extended: true,
		limit: library.config.limitBody,
	})
);
//END BODYPARSER CONFIG

//CORS CONFIG
var whitelists = library.config.whitelist;
const corsOptions = (req, callback) => {
	if (whitelists.indexOf(req.header("host")) !== -1) {
		callback(null, true);
	} else {
		callback(new Error(library.messages.notAllowedCors));
	}
};
app.use(library.cors(corsOptions));
//END CORS CONFIG

app.use(
	library.session({
		cookie: {
			maxAge: Date.now() + 1000 * 60 * 60 * 24,
		},
		secret: library.config.jwtSecret,
		resave: true,
		saveUninitialized: false,
	})
);

app.use(library.cookieParser());

app.use(library.expressip().getIpInfoMiddleware);
app.use(library.device.capture());

library.device.enableViewRouting(app);

var csrfProtection = library.csrf({
	cookie: true,
});

app.use(
	"/dist",
	library.express.static(__dirname + "/public", {
		etag: false,
	})
);

app.use("/", csrfProtection, webRoutes);

//CONFIG OF HBS
library.hbs.registerPartials(__dirname + "/app/view/includes/");
library.hbs.registerPartials(__dirname + "/app/view/pages/");
library.hbsutils.registerWatchedPartials(__dirname + "/app/view/includes/");
library.hbsutils.registerWatchedPartials(__dirname + "/app/view/pages/");
library.hbsutils.precompilePartials();
app.set("views", library.path.join(__dirname, "app/view/"));
app.disable("views cache");
app.set("view engine", "hbs");

library.hbs.registerHelper("ifEquals", function (arg1, arg2, options) {
	return arg1 == arg2 ? options.fn(this) : options.inverse(this);
});
library.hbs.registerHelper("ifNotEquals", function (arg1, arg2, options) {
	return arg1 != arg2 ? options.fn(this) : options.inverse(this);
});

library.hbs.registerHelper("ifAnd", function (v1, v2, options) {
	if (v1 === v2) {
		return options.fn(this);
	}
	return options.inverse(this);
});

library.hbs.registerHelper("inc", function (value, options) {
	return parseInt(value) + 1;
});

library.hbs.registerHelper("log", function (content) {
	console.log(content.fn(this));
	return "";
});

library.hbs.registerHelper("getFirstLetter", function (name) {
	return name.match(/\b\w/g).join("");
});

library.hbs.registerHelper("toRupiah", function (angka, prefix) {
	let angka1 = angka.toString();
	let number_string = angka1.replace(/[^,\d]/g, "").toString();
	var split = number_string.split(",");
	var sisa = split[0].length % 3;
	var rupiah = split[0].substr(0, sisa);
	var ribuan = split[0].substr(sisa).match(/\d{3}/gi);

	if (ribuan) {
		separator = sisa ? "." : "";
		rupiah += separator + ribuan.join(".");
	}

	rupiah = split[1] != undefined ? rupiah + "," + split[1] : rupiah;
	return prefix == undefined ? rupiah : rupiah ? "Rp " + rupiah : "";
});

app.use(function (err, req, res, next) {
	var userAgent = req.headers["user-agent"];
	if (
		err.code == library.messages.badCsrfToken &&
		userAgent == library.config.userAgent
	) {
		return res.status(401).json({
			success: false,
			message: helper.notAllowedCors,
			status: 401,
		});
	} else if (
		err.code == library.messages.badCsrfToken &&
		userAgent != library.config.userAgent
	) {
		res.status(404);
		res.redirect("/404");
	} else if (err.message == library.messages.notAllowedCors) {
		return res.status(404).json({
			success: false,
			message: library.messages.dontHaveAccess,
			status: 404,
		});
	}
});

// app.all("*", (req, res) => {
// 	return res.render("404", {
// 		csrfToken: req.csrfToken(),
// 		web_title: "404 Not Found - Signal TTE Aceh Tamiang",
// 		web_desc: "Signal TTE Aceh Tamiang",
// 		web_author: "Adjie Kurniawan",
// 		web_keywords: "Signal TTE Aceh Tamiang",
// 		web_url: `/404`,
// 		web_icon: "",
// 	});
// });

const startServer = library.http.createServer(app).listen(library.config.port);

if (startServer) {
	console.log(`${library.messages.messageRunServer} ${library.config.port}`);
}
