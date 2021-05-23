$(document).ready(
	function() 
	{
		$("#slider-indicator-box a:first").addClass("current-slide");
		var slide_width = $("#slider-holder").width();
		var slide_count = $("#slider-strip a").size() - 2;
		
		slider_rotate = function()
		{
			var slide_id = $active.attr("rel") - 1;
			var slider_strip_shift = (slide_id + 1) * slide_width;
			$("#slider-indicator-box a").removeClass('current-slide');
			$active.addClass('current-slide');
			$("#slider-strip").animate({left: -slider_strip_shift}, 500);
		}; 
 
		slider_rotation = function()
		{
			play = setInterval(
				function()
				{
					$active = $('#slider-indicator-box a.current-slide').next();
					if ($active.length === 0) 
						$active = $('#slider-indicator-box a:first');
					slider_rotate();
				}, 
				5000
			);
		};
		slider_rotation();

		$("#slider-indicator-box a").click(
			function() 
			{
				$active = $(this);
				clearInterval(play);
				slider_rotate();
				slider_rotation();
				return false;
			}
		);
		
		$("#slider-r-arrow-box a").click(
			function() 
			{
				$active = $('#slider-indicator-box a.current-slide').next();
				if ($active.length === 0) 
					$active = $('#slider-indicator-box a:first');
				clearInterval(play);
				slider_rotate();
				slider_rotation();
				return false;
			}
		);
		
		$("#slider-l-arrow-box a").click(
			function() 
			{
				$active = $('#slider-indicator-box a.current-slide').prev();
				if ($active.length === 0) 
					$active = $('#slider-indicator-box a:last');
				clearInterval(play);
				slider_rotate();
				slider_rotation();
				return false;
			}
		);
	}
);
