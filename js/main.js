(function ($) {
	"use strict";
	var nav = $('nav');
	var navHeight = nav.outerHeight();
	$('.navbar-toggler').on('click', function () {
		if (!$('#mainNav').hasClass('navbar-reduce')) {
			$('#mainNav').addClass('navbar-reduce');
		}
	})
	AOS.init();
	// Preloader
	$(window).on('load', function () {
		if ($('#preloader').length) {
			$('#preloader').delay(100).fadeOut('slow', function () {
				$(this).remove();
			});
		}
	});

	//Read More Logic
	$('#more').on('click', function () {
		$(this).hide();
		$('.content').show();
		$('#less').show();
	});
	$('#less').on('click', function () {
		$(this).hide();
		$('#more').show();
		$(".content").hide();
	});
	$(".content").hide();
	$(".show_hide").on("click", function () {
		var txt = $(".content").is(':visible');
		$(this).next('.content').slideToggle(200);
	});

	$('#more_more').on('click', function () {
		$(this).hide();
		$('.content').show();
		$('#less_less').show();
	});
	$('#less_less').on('click', function () {
		$(this).hide();
		$('#more_more').show();
		$(".content").hide();
	});
	$(".content").hide();
	$(".show_hide").on("click", function () {
		var txt = $(".content").is(':visible');
		$(this).next('.content').slideToggle(200);
	});

	// Back to top button
	$(window).scroll(function () {
		if ($(this).scrollTop() > 50) {
			$('.back-to-top').fadeIn('slow');
		} else {
			$('.back-to-top').fadeOut('slow');
		}
	});
	$('.back-to-top').click(function () {
		$('html, body').animate({ scrollTop: 0 }, 1500, 'easeInOutExpo');
		return false;
	});

	/*--/ Star ScrollTop /--*/
	$('.scrolltop-mf').on("click", function () {
		$('html, body').animate({
			scrollTop: 0
		}, 1000);
	});

	/*--/ Star Counter /--*/
	$('.counter').counterUp({
		delay: 15,
		time: 2000
	});

	/*--/ Star Scrolling nav /--*/
	$('a.js-scroll[href*="#"]:not([href="#"])').on("click", function () {
		if (location.pathname.replace(/^\//, '') == this.pathname.replace(/^\//, '') && location.hostname == this.hostname) {
			var target = $(this.hash);
			target = target.length ? target : $('[name=' + this.hash.slice(1) + ']');
			if (target.length) {
				$('html, body').animate({
					scrollTop: (target.offset().top - navHeight + 5)
				}, 1000, "easeInOutExpo");
				return false;
			}
		}
	});
	// Activate scrollspy to add active class to navbar items on scroll
	$('body').scrollspy({
		target: '#mainNav',
		offset: navHeight
	});
	/*--/ End Scrolling nav /--*/

	/*--/ Navbar Menu Reduce /--*/
	$(window).trigger('scroll');
	$(window).on('scroll', function () {
		var pixels = 50;
		var top = 1200;
		if ($(window).scrollTop() > pixels) {
			$('.navbar-expand-lg').addClass('navbar-reduce');
			$('.navbar-expand-lg').removeClass('navbar-trans');
			$('.navbar-expand-lg .container .navbar-brand .logow').css('width', '150px');
			$('.navbar-expand-lg .container .navbar-brand .logo-show').css('width', '150px');

		} else {
			$('.navbar-expand-lg').addClass('navbar-trans');
			$('.navbar-expand-lg').removeClass('navbar-reduce');
			$('.navbar-expand-lg .container .navbar-brand .logow').css('width', '200px');
			$('.navbar-expand-lg .container .navbar-brand .logo-show').css('width', '200px');
		}
		if ($(window).scrollTop() > top) {
			$('.scrolltop-mf').fadeIn(1000, "easeInOutExpo");
		} else {
			$('.scrolltop-mf').fadeOut(1000, "easeInOutExpo");
		}
	});


	$('.clients .owl-carousel').owlCarousel({
		loop: true,
		margin: 10,
		nav: false,
		dots: false,
		autoplay: true,
		autoplayHoverPause: true,
		responsive: {
			0: {
				items: 2
			},
			767: {
				items: 2
			},
			1000: {
				items: 3
			}
		}
	});

	/* ==============================================
	   CONTACT FORM
	=============================================== */


	$(function () {
		jQuery.validator.addMethod("mobile", function (phone_number, element) {
			phone_number = phone_number.replace(/\s+/g, "");
			return this.optional(element) || phone_number.length > 9 &&
				phone_number.match(/^((\+[1-9]{1,4}[ \-]*)|(\([0-9]{2,3}\)[ \-]*)|([0-9]{2,4})[ \-]*)*?[0-9]{3,4}?[ \-]*[0-9]{3,4}?$/);
		}, "<br />Please specify a valid mobile number");

		$("form[name='contact-form']").validate({

			rules: {
				fullname: "required",
				mobile: {
					required: true,

					mobile: true
				},
				email: {
					required: true,
					email: true
				}
				},
			messages: {
				fullname: "Please enter your name",
				mobile: {
					required: "Please enter your mobile number",
				},
				email: "Please enter a valid email address"
			},
			submitHandler: function (form) {
				form.submit();
			}
		});
	});



	// Products
	$(document).ready(function () {
		var owl = $('#galleria-carousel .owl-carousel').owlCarousel({
			loop: true,
			smartSpeed: 100,
			autoplay: true,
			autoplaySpeed: 100,
			mouseDrag: true,
			margin: 10,
			animateIn: 'slideIn',
			animateOut: 'fadeOut',
			nav: false,
			responsive: {
				0: {
					items: 1
				},
				767: {
					items: 3
				},
				1000: {
					items: 4
				}
			}
		});
		$.getJSON("js/products.json", function (data) {
			var categoryArray = [];
			var productsArray = [];

			$.each(data, function (key, val) {
				var category = key;
				if ($.inArray(category, categoryArray) == -1) {
					categoryArray.push(category);
				}

				for (var items in val) {
					var product_items = val[items];
					if ($.inArray(product_items, productsArray) == -1) {
						productsArray.push(product_items);
					}
				}

			});

			var $categoryList = $('#product ul.nav.nav-tabs');
			var $productsList = $('#product .tab-content .nav.flex-column');

			// product categories
			$.each(categoryArray, function (i) {
				var getCategory = categoryArray[i];
				var putCategorys = getCategory.split('_').join(' ');
				$categoryList.append('<li class="nav-item">' +
					'<a class="nav-link js-filter" data-toggle="tab" href="" id="' + categoryArray[i] + '" data-category="' + categoryArray[i] + '">' + putCategorys + '</a></li>');

				$("#product ul.nav.nav-tabs li a").first().addClass("active").addClass("show");
			});

			// products info
			$.each(productsArray, function (i, v) {
				var itemCategory = productsArray[i].product_category;
				var itemCategorys = itemCategory.split(' ').join('_');
				var subProduct = productsArray[i].product_name;
				var subProducts = subProduct.split(' ').join('_').split('/').join('').split('.').join('');
				var $productInfo = $('#product-info');

				//if (itemCategorys == 'Granite'){
				var random_num = Math.floor((Math.random() * 34));
				owl.trigger('add.owl.carousel', [jQuery('<div class="item">' +
					//				'<a href="' + productsArray[i].close_up + '" class="carousel-thumbnail" title ="' + productsArray[i].product_name + '">' +
					'<img src="' + productsArray[random_num].close_up + '" alt="" class="img-fluid fix-height" />' +
					'<div class="protuct-line"></div>' +
					'<div class="white-color ftas">' + productsArray[random_num].product_name + '</div>' +
					//				'</a >' +
					'</div >')]);
				//}


				$productsList.append('<li class="nav-item js-filterable is-hidden" data-category="' + itemCategorys + '"><a class="nav-link js-filter" data-category="' + subProducts + '" data-order="' + productsArray[i].order + '">' + productsArray[i].product_name + '</a></li >');

				$productInfo.append('<div id="' + subProducts + '" class="col-md-3 tab-pane js-filterable" data-category="' + subProducts + '" data-order="' + productsArray[i].order + '" data-product="' + itemCategorys + '">' +
					'<div class="border-pad" data-toggle="modal" data-target="#productModal">' +
					'<img src="' + productsArray[i].close_up + '"  class="img-fluid fix-height" />' +
					'<h4 class="site-color"><span class="protext">' + productsArray[i].product_name + '</span></h4>' +
					'</div>' +
					'</div>');


				$(".container .tab-pane.js-filterable").addClass("active").addClass("show");
				$('.js-filterable[data-category="Granite"]').removeClass('is-hidden');
				$('.js-filterable').removeClass('is-hidden');

				$('#product .tab-content .nav.flex-column a.nav-link.js-filter').addClass("active").addClass("show");


				//modal
				$('.border-pad').on('click', 'img', function () {
					var productImg = $(this).attr('src');
					var	closeup_img = productsArray[i].close_up;
					if (closeup_img == productImg){
					var $productModal = $('#productModal .modal-dialog .modal-content');
					$productModal.html('<div class="modal-header">' +
						'<button type="button" class="close" data-dismiss="modal" aria-label="Close">' +
						'<span aria-hidden="true">&times;</span>' +
						'</button>' +
						'</div>' +
						'<div class="modal-body">' +
						'<div class="big-image">' +
						'<h3>' + productsArray[i].product_name+' (<span class="imgtitle">Close Up</span>)</h3>' +
						'<img src="' + productImg + '" alt="" class="img-fluid modal-img">' +
						'</div>' +
						'<div class="sm-image">' +
						'<img src="' + productsArray[i].close_up + '" class="show-small-img" title="Close Up" alt="">' +
						'<img src="' + productsArray[i].application + '" class="show-small-img" title="Application" alt="">' +
						'<img src="' + productsArray[i].slab + '" class="show-small-img" title="Slab" alt="">' +
						'</div>' +
						'</div>');
					}
					$('.sm-image').on('click','img',function(){
						var smallImg = $(this).attr('src');
						var imgTitle = $(this).attr('title');
						$('.big-image img').attr('src', smallImg);
						$('.big-image h3 span.imgtitle').text(imgTitle);
					});

				});




			});
			owl.trigger('refresh.owl.carousel');

			var url = $(location).attr('href');
			var httpPath = window.location.protocol;
			var hostUrl = window.location.host + '/products.html';
			var removeData = url.replace(httpPath + '//' + hostUrl, "");
			var clickUrl = httpPath + '//' + hostUrl + removeData + '';
			var clickCategory = removeData.replace("#", "");
			$('.fullinfo').addClass('is-hidden');
			if (clickCategory == 'product-line') {
				var clickUrl = httpPath + '//' + hostUrl;
			}
			if (clickUrl == url && clickCategory != "") {
				$("html, body").animate({ scrollTop: 0 }, "slow");
				$('.nav.nav-tabs .nav-link.js-filter').removeClass('active').removeClass('show');
				$('.nav.nav-tabs .nav-link.js-filter[data-category=' + clickCategory + ']').addClass('active').addClass('show');
				$('.container .tab-pane.js-filterable').addClass('is-hidden');
				$('.container .tab-pane.js-filterable[data-product="' + clickCategory + '"]').removeClass('is-hidden').addClass('active');
				$('.fullinfo[data-category=' + clickCategory + ']').removeClass('is-hidden');

				
			}

			$('#product ul.nav.nav-tabs').on('click', '.nav-item .nav-link.js-filter', function () {

				var $subfilterCategory = $(this).attr('data-category');
				$('.fullinfo').addClass('is-hidden');
				if ($subfilterCategory == 'all') {
					$('.js-filterable').removeClass('is-hidden');
				}
				else {
					$('.js-filterable').addClass('is-hidden');
					$('.js-filterable[data-category=' + $subfilterCategory + ']').removeClass('is-hidden');
					$('.container .tab-pane.js-filterable[data-product="' + $subfilterCategory + '"]').removeClass('is-hidden').addClass('active').addClass('show');
					$('#product .tab-content .nav.flex-column a.nav-link.js-filter').removeClass('active');
					//$('#product .tab-content .nav.flex-column a.nav-link.js-filter').addClass('active');
					$('.fullinfo[data-category=' + $subfilterCategory + ']').removeClass('is-hidden');
				}

				$('.tab-content .nav.flex-column').css('display', 'block');


			});


			$('#product .tab-content .nav.flex-column').on('click', 'a.nav-link.js-filter', function () {
				var $filterCategory = $(this).attr('data-category').split('/').join('');
				var $filterProductCategory = $(this).parent('.js-filterable').attr('data-category');
				if ($filterCategory == 'all') {
					$('.tab-pane.js-filterable[data-category="Granite"]').removeClass('is-hidden');
				}
				else {
					$('.container .tab-pane.js-filterable').removeClass('active').removeClass('show');
					$('.container .tab-pane.js-filterable').addClass('is-hidden');
					$('.tab-pane.js-filterable[data-category=' + $filterCategory + ']').removeClass('is-hidden');

					$('#product .tab-content tab-pane.js-filterable').removeClass('active').removeClass('show');
					$('#product .tab-content tab-pane.js-filterable').addClass('is-hidden');
					$('#' + $filterCategory + '[data-product="' + $filterProductCategory + '"').removeClass('is-hidden');
					$('#' + $filterCategory + '[data-product="' + $filterProductCategory + '"').addClass('active').addClass('show');

					$('#product .tab-content .nav.flex-column a.nav-link.js-filter').removeClass('active');
					$(this).addClass('active');
				}

			});
			jQuery(window).resize(function () {
				if (jQuery(window).width() < 767) {
					jQuery('.nav.flex-column .nav-item.js-filterable .nav-link.js-filter').on('click', function () {
						jQuery('.tab-content .nav.flex-column').css('display', 'none');
					});
				}
				else {
					jQuery('.nav.flex-column .nav-item.js-filterable .nav-link.js-filter').on('click', function () {
						jQuery('.tab-content .nav.flex-column').css('display', 'block');
					});
				}
			});

		});
	});

})(jQuery);