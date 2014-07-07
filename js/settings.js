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
		},

		menu_align : function() {
			$('#menu-align').on('click', 'a', function(e) {
				e.preventDefault();
				var self = $(this),
					name = self.data('name');

					console.log(name);

				$('#mega-menu.primary-menu').removeClass('align-left align-right align-center').addClass(name);

			});
		},
		menu_icons : function() {
			$('#menu-icons').on('click', 'a', function(e) {
				e.preventDefault();
				var self = $(this),
					name = self.data('name');

					console.log(name);

				$('#mega-menu.primary-menu').removeClass('icons-no icons-left icons-right icons-top').addClass(name);

			});
		},

	};

	redQ_settings.redQ_settings_init();

})(jQuery);