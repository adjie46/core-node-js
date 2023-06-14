const library = require("../core/library");

exports.dashboard_pages = async (req, res) => {
	let pages = req.query;
	let dataDashboard = {};
	let token = req.session.tokenLogin;
	let payload = req.decrypted.payload;

	myProfile = await library.model.auth.findOne({
		attributes: ["id", "user_type", "status"],
		include: [
			{
				model: library.model.profile,
				as: "profile",
			},
		],
		where: {
			id: await library.decrypt(payload.user_login_auth),
		},
	});

	if (myProfile.user_type == "-1") {
		user_type_category = "Operator Kominfo";
	} else {
		user_type_category = "";
	}

	dataDashboard.users = {
		user_name: myProfile.profile.full_name,
		user_type: myProfile.user_type,
		user_type_category: user_type_category,
		user_email: myProfile.profile.email,
		user_phone: myProfile.profile.phone,
		user_photo: myProfile.profile.photo_profile,
	};

	if (library.isEmpty(pages)) {
		dataDashboard.current_pages = "dashboard";
	} else {
		dataDashboard.current_pages = pages.pages;
	}

	var fileContents;
	var showPages, showCss, showJs;

	try {
		fileContents = library.fs
			.readdirSync(
				`./app/view/pages/admin/content/${dataDashboard.current_pages}`
			)
			.forEach((file) => {
				showPages = `admin/content/${dataDashboard.current_pages}/index`;
			});

		fileJs = library.fs
			.readdirSync(
				`./app/view/pages/admin/content/${dataDashboard.current_pages}`
			)
			.forEach((file) => {
				showJs = `admin/content/${dataDashboard.current_pages}/js`;
			});

		fileCss = library.fs
			.readdirSync(
				`./app/view/pages/admin/content/${dataDashboard.current_pages}`
			)
			.forEach((file) => {
				showCss = `admin/content/${dataDashboard.current_pages}/css`;
			});
	} catch (err) {
		showPages = "admin/no_item";
		showCss = `admin/no_item`;
		showJs = `admin/no_item`;
	}

	/* var _ = require("underscore");
	var pray_time = await library.prayer_time();
	var pray = JSON.parse(pray_time);
	var filtered = _.where(pray, { date: library.currentDate() });
	var waktu_sahalat = {};

	filtered[0].prayer_time_list.forEach((element, index) => {
		if (index == "1") {
			waktu_sahalat.subuh = element.prayerTime;
		}
		if (index == "3") {
			waktu_sahalat.dzuhur = element.prayerTime;
		}
		if (index == "4") {
			waktu_sahalat.ashar = element.prayerTime;
		}
		if (index == "5") {
			waktu_sahalat.maghrib = element.prayerTime;
		}
		if (index == "6") {
			waktu_sahalat.isyaa = element.prayerTime;
		}
	});

	dataDashboard.pray_time = waktu_sahalat; */

	return res.render("pages/admin/dashboard", {
		csrfToken: req.csrfToken(),
		web_title: "Dashboard - " + req.web_setting.web_name,
		web_desc: req.web_setting.web_desc,
		web_author: req.web_setting.web_author,
		web_keywords: req.web_setting.web_keywords,
		web_url: `${req.web_setting.web_url}/dashboard`,
		web_icon: req.web_setting.web_icon,
		datas: dataDashboard,
		content: function () {
			if (!library.isEmpty(myProfile)) {
				return showPages;
			} else {
				return "admin/no_item";
			}
		},
		includeCss: function () {
			if (!library.isEmpty(myProfile)) {
				return showCss;
			} else {
				return "admin/no_item";
			}
		},
		includeJs: function () {
			if (!library.isEmpty(myProfile)) {
				return showJs;
			} else {
				return "admin/no_item";
			}
		},
	});
};
