(function($) {
	"use strict";

	var RedQ = {

		redQ_init : function() {
			RedQ.redQ_nav_hover();
		},

		redQ_nav_hover : function() {
			$('.dropdown').on('mouseenter', function() {
				var self = $(this);

				self.find('.dropdown-menu').slideDown('300', 'easeInCirc');
			});

			$('.dropdown').on('mouseleave', function() {
				var self = $(this);

				self.find('.dropdown-menu').slideUp('300', 'easeOutCirc');
			});
		},


	};

	RedQ.redQ_init();

})(jQuery);