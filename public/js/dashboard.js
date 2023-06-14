$(function () {
	//
	// Carousel
	//
	$(".counter-carousel").owlCarousel({
		loop: true,
		margin: 30,
		mouseDrag: true,
		autoplay: true,
		autoplayTimeout: 5000,
		autoplaySpeed: 5000,
		nav: false,
		rtl: true,
		responsive: {
			0: {
				items: 2,
			},
			576: {
				items: 2,
			},
			768: {
				items: 3,
			},
		},
	});
});
