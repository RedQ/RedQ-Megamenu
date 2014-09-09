$(function() {

		"use-strict";
		var width = $(window).width();

		if ((width<=768)) {
		 	//	The menu
			$('#menu')
				.mmenu({
					classes			: 'mm-white',
					searchfield		: true,
					counters		: true,
					header			: {
						add		: true,
						update	: true,
						title	: 'mmenu'
					}
				});
		}
		else {
			console.log('bigger size window');
		}

	//	Scroll to the features (homepage)
	$('#home-intro a[href="#home-features"]')
		.on( 'click',
			function( e )
			{
				e.preventDefault();
				$('body, html').animate({
					scrollTop: $('#home-features').offset().top
				});	
			}
		);


	//	Compose email link, please stop sending me spam...
	setTimeout(function() {
		var b = 'frebsite' + '.' + 'nl',
			o = 'info',
			t = 'mail' + 'to';

		$('#emaillink').attr( 'href', t + ':' + o + '@' + b );
	}, 1000);


	//	Collapse tablerows
	$('.table-collapsed')
		.find( '.sub-start' )
		.each(
			function()
			{
				var $parent = $(this).prev().find( 'td' ).eq( 1 ).addClass( 'toggle' ),
					$args = $parent.find( 'span' ),
					$subs = $(this);
	
				var searching = true;
				$(this).nextAll().each(
					function()
					{
						if ( searching )
						{
							$subs = $subs.add( this );
							if ( !$(this).is( '.sub' ) )
							{
								searching = false;
							}
						}
					}
				);
				$subs.hide();
				$parent.click(
					function()
					{
						$args.toggle();
						$subs.toggle();
					}
				);
			}
		);

});