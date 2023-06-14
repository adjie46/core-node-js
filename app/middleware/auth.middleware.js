const library = require("../core/library");

exports.auth = async (req, res, next) => {
	let session = req.session;

	if (!library.isEmpty(session.tokenLogin)) {
		res.status(library.responseStatus.OK);
		return res.redirect("/dashboard");
	}

	next();
};

exports.unauth = async (req, res, next) => {
	let session = req.session;

	if (library.isEmpty(session.tokenLogin)) {
		res.status(library.responseStatus.OK);
		return res.redirect("/login");
	} else {
		const secret = Buffer.from(library.config.hex, "hex");
		await library
			.decryptJwt(session.tokenLogin.split(" ")[1], secret)
			.then((data) => {
				req.decrypted = data;
				next();
			})
			.catch((err) => {
				res.status(library.responseStatus.OK);
				return res.redirect("/login");
			});
	}
};

exports.mode = async (req, res, next) => {
	if (library.config.mode == "Maintenance") {
		res.status(library.responseStatus.OK);
		return res.redirect("/maintenance");
	}
	next();
};
