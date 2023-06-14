$(document).ready(function () {
	function loadButton(idButton, type) {
		if (type == 1) {
			$(idButton).prop("disabled", true);
			$(idButton).html(
				`<span class="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span> Loading`
			);
		} else if (type == 0) {
			$(idButton).prop("disabled", false);
			$(idButton).html(`Sign In`);
		} else if (type == 2) {
			$(idButton).prop("disabled", true);
			$(idButton).html(`Sign In`);
		}
	}

	function notification(id, type, message) {
		$(id).html(`
			<div class="alert customize-alert alert-dismissible text-${type} border border-${type} fade show remove-close-icon" role="alert">
            	<button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
                	<div class="d-flex align-items-center font-medium me-3 me-md-0">
                        <i class="ti ti-info-circle fs-5 me-2 flex-shrink-0 text-${type}"></i>
                        ${message}
                    </div>
            </div>`);
	}

	$("#frm_login").on("submit", function (e) {
		if (!this.checkValidity()) {
			e.preventDefault();
			e.stopPropagation();
		} else {
			e.preventDefault();

			var formData = new FormData();
			params = $(this).serializeArray();

			$.each(params, function (i, val) {
				formData.append(val.name, val.value);
			});

			$.ajax({
				type: "post",
				headers: {
					"X-CSRF-Token": $("input[name=_csrf]").val(),
				},
				url: "/login",
				data: formData,
				dataType: "json",
				contentType: false,
				processData: false,
				beforeSend: function () {
					loadButton("#btn_loading", 1);
				},
				success: function (response) {
					if (response.success) {
						setTimeout(() => {
							loadButton("#btn_loading", 2);
							notification("#notification", "success", response.message);
							location.replace(response.redirect);
						}, 1000);
					} else {
						setTimeout(() => {
							loadButton("#btn_loading", 0);
							notification("#notification", "warning", response.message);

							setTimeout(() => {
								$(".alert")
									.delay(4000)
									.slideUp(200, function () {
										$(this).alert("close");
									});
							}, 500);
						}, 1000);
					}
				},
				error: function (xhr, status, errorThrown) {
					if (xhr.statusText == "Unauthorized") {
						location.replace("/");
					} else if (xhr.responseJSON.status == 2) {
						location.replace("/maintenance");
					} else {
						setTimeout(() => {
							loadButton("#btn_loading", 0);
							notification("#notification", "danger", xhr.responseJSON.message);

							setTimeout(() => {
								$(".alert")
									.delay(4000)
									.slideUp(200, function () {
										$(this).alert("close");
									});
							}, 500);
						}, 1000);
					}
				},
			});
		}
		$(this).addClass("was-validated");
	});
});
