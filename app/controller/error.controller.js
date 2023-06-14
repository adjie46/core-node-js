exports.err_404 = async (req, res) => {
	return res.render("pages/error/404", {
		csrfToken: req.csrfToken(),
		web_title: "404 - " + req.web_setting.web_name,
		web_desc: req.web_setting.web_desc,
		web_author: req.web_setting.web_author,
		web_keywords: req.web_setting.web_keywords,
		web_url: `${req.web_setting.web_url}/404`,
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
