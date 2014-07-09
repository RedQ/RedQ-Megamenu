$(document).ready(function () {

	$('#menu-align li').click(function(e){

		  val

		e.preventDefault();
	})

});


(function($) {
	"use strict";

	var redQ_settings = {

		redQ_settings_init : function() {
			redQ_settings.menu_align();
			redQ_settings.menu_icons();
			redQ_settings.menu_animation();
			redQ_settings.menu_color_skins();
		},


		menu_align : function() {
			$('#menu-align').on('change', '[name="change-align"]', function() {
				var name = $(this).val();

				$('#mega-menu.primary-menu').removeClass('align-left align-right align-center').addClass(name);

			});
		},
		menu_icons : function() {
			$('#menu-icons').on('change', '[name="change-icons"]', function() {
				var name = $(this).val();

				$('#mega-menu.primary-menu').removeClass('icons-no icons-left icons-right icons-top').addClass(name);

			});
		},
		menu_animation : function() {
			$('#menu-animation').on('change', '[name="change-animation"]', function() {
				var name = $(this).val();

				$('#mega-menu.primary-menu').removeClass('fadeInUp fadeInDown bounceInUp flipInX flipInY pulse zoomIx lightSpeedIn').addClass(name);

			});
		},
		menu_color_skins : function() {
			$('#color-skins').on('change', '[name="change-skins"]', function() {
				var name = $(this).val();

				$('#mega-menu.primary-menu').removeClass('default-skin green-sea-skin pomegranate-skin pumpkin-skin wisteria-skin orange-skin nephritis-skin belize-hole-skin midnight-blue-skin asbestos-skin').addClass(name);

			});
		},

	};

	redQ_settings.redQ_settings_init();

})(jQuery);