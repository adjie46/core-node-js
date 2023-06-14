const library = require("../core/library");

exports.login_pages = async (req, res) => {
	return res.render("pages/auth/login", {
		csrfToken: req.csrfToken(),
		web_title: "Login - " + req.web_setting.web_name,
		web_desc: req.web_setting.web_desc,
		web_author: req.web_setting.web_author,
		web_keywords: req.web_setting.web_keywords,
		web_url: `${req.web_setting.web_url}/login`,
		web_icon: req.web_setting.web_icon,
		content: function () {
			return "admin/no_item";
		},
		includeCss: function () {
			return "admin/no_item";
		},
		includeJs: function () {
			return "admin/no_item";
		},
	});
};

exports.authLogout = async (req, res) => {
	req.session.destroy((err) => {
		res.redirect("/login");
	});
};

exports.login_action = async (req, res) => {
	return new Promise(async (resolve, reject) => {
		try {
			await library.formData(req, res);
			datas = JSON.parse(JSON.stringify(req.body));

			users = await library.model.auth.findOne({
				include: [
					{
						model: library.model.profile,
						as: "profile",
					},
				],
				where: {
					[library.Op.or]: [
						{
							user_auth: datas.username_login,
						},
						{
							"$profile.email$": datas.username_login,
						},
					],
				},
			});

			if (library.isEmpty(users)) {
				return res.status(library.responseStatus.OK).send({
					success: false,
					code: library.responseStatus.OK,
					message: "Pengguna Tidak Ditemukan",
					redirect: "/login",
				});
			} else {
				passDecrypt = await library.decrypt(users.user_pass).catch((err) => {
					return res.status(library.responseStatus.serverError).json({
						success: false,
						code: library.responseStatus.serverError,
						message: "Error 101, Hubungi Admin",
					});
				});

				if (passDecrypt === datas.password_login) {
					const payload = {
						user_login_name: users.profile.full_name,
						user_login_auth: await library.encrypt(users.id),
					};

					const secret = Buffer.from(library.config.hex, "hex");

					const encryptedJwt = await library.encryptedJwt(
						"login_action",
						payload,
						secret,
						library.config.jwtExpireWeb
					);

					session = req.session;
					session.tokenLogin = "Bearer " + encryptedJwt;

					newLogs = {
						id_auth: await library.encrypt(users.id),
						log_type: "Success",
						log_action: `${users.profile.full_name} berhasil login`,
						log_os: req.headers["sec-ch-ua-platform"],
						log_devices: req.device.type,
						log_ip: req.ipInfo.ip,
					};

					library.logs(newLogs);

					return res.status(library.responseStatus.OK).send({
						success: true,
						code: library.responseStatus.OK,
						message: "Berhasil Masuk",
						redirect: "/dashboard",
					});
				} else {
					newLogs = {
						id_auth: await library.encrypt(users.id),
						log_type: "Success",
						log_action: `${users.profile.full_name} Gagal Melakukan Login, Error : Password Salah`,
						log_os: req.headers["sec-ch-ua-platform"],
						log_devices: req.device.type,
						log_ip: req.ipInfo.ip,
					};

					library.logs(newLogs);

					return res.status(library.responseStatus.OK).send({
						success: false,
						code: library.responseStatus.OK,
						message: "Password Anda Salah, Silahkan Coba Lagi",
						redirect: "/login",
					});
				}
			}
		} catch (error) {
			return res.status(library.responseStatus.serverError).send({
				success: false,
				code: library.responseStatus.serverError,
				message: error.message,
			});
		}
	});
};
