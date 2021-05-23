$(document).ready(
	function() 
	{
		var float_header_area = $("#float-header-area");
		var content_box = $("#content-box");	
		var bottom_menu_area = $("#bottom-menu-area");
		var footer_area = $("#footer-area");		
		var header_area_height = $("#header-area").outerHeight(true);
		var footer_area_height = footer_area.outerHeight(true);
		var bottom_menu_area_height = bottom_menu_area.outerHeight(true);
		
		$("#header-row1-col3").children().clone(true).appendTo($("#float-header-col4"));
		$("#header-row2-col1 .top-menu").children().clone(true).appendTo($("#float-header-col2 .main-menu-box .top-menu"));
		/*$("#header-row2-col1").children().clone(true).appendTo($("#float-menu-box"));*/
		$("#header-row2-col2").children().clone(true).appendTo($("#float-header-col3"));

		$(window).scroll(setup_bottom_menu_area);
		$(window).scroll(setup_float_header_area);
		$(window).resize(setup_content_area);
		$(window).resize(setup_bottom_menu_area);
		$(window).resize(setup_float_header_area);
		setup_content_area();
		setup_bottom_menu_area();

		function setup_bottom_menu_area() 
		{
		  var footer_area_top = footer_area.get(0).getBoundingClientRect().top;
		  var client_height = document.documentElement.clientHeight;
		  if (bottom_menu_area.css('position') == 'fixed')
		  {
			if (!(window.matchMedia("(max-width: 1006px)").matches)) {
				if (footer_area_top < (client_height - bottom_menu_area.outerHeight(true)))
					bottom_menu_area.css({position: 'relative'});
			} else
				bottom_menu_area.css({position: 'relative'});
		  }
		  else 
		  {
			if (!(window.matchMedia("(max-width: 1006px)").matches)) {
				if (footer_area_top > client_height)
					bottom_menu_area.css({position: 'fixed'});
			}
		  }
		}

		function setup_content_area() 
		{
			content_box.css('min-height', 
				(document.documentElement.clientHeight - header_area_height - footer_area_height - bottom_menu_area_height) + 'px'
			);
		}
		
		function setup_float_header_area() {
			if (!(window.matchMedia("(max-width: 520px)").matches)) {
				if ($(document).scrollTop() < 72) 
					float_header_area.css({display: 'none'});
				else 
					float_header_area.css({display: 'block'});
			} else
				float_header_area.css({display: 'block'});		
		}
	}
);

$(document).ready(
	function() 
	{
		$(".h-scroll-box .indicator .slide:first-child").addClass("current");
		
		h_scroll_box_last_index = function(holder)
		{
			var slides = holder.children(".strip").children(".slide");
			var holder_w = holder.width();
			var result = slides.size() - 1;
			
			for 
			(
				var i = result, w = slides.eq(i).width(); 
				i >= 0 && w <= holder_w; 
				i--, w += slides.eq(i).width()
			)
				result = i;
			
			return result;
		};
		
		h_scroll_box_rotate_left = function(holder, loop)
		{
			var indicator = holder.children(".indicator");
			var strip = holder.children(".strip");
			var indicator_s = indicator.children(".slide")
			var last_index = h_scroll_box_last_index(holder);
			
			if (indicator.children(".current").index() >= h_scroll_box_last_index(holder))
			{
				if (!loop)
				{
					var shift = strip.children(".slide").eq(last_index).position().left;
					strip.animate({left: -shift-15}, 50);
					strip.animate({left: -shift}, 50);
					return;
				}	
				var next = indicator.children(".slide:first-child");
			}
			else
			{
				var next = indicator.children(".current").next();
				if (next.length == 0) 
				{
					if (!loop)
					{
						var shift = strip.children(".slide").eq(last_index).position().left;
						strip.animate({left: -shift-15}, 50);
						strip.animate({left: -shift}, 50);
						return;
					}	
						
					next = indicator.children(".slide:first-child");
				}
			}
			
			var new_index = indicator_s.index(next.eq(0));
			var shift = strip.children(".slide").eq(new_index).position().left;
		
			indicator_s.removeClass('current');
			indicator_s.eq(new_index).addClass('current');
			
			strip.animate({left: -shift}, 500);
		}

		h_scroll_box_rotate_right = function(holder, loop)
		{
			var indicator = holder.children(".indicator");
			var strip = holder.children(".strip");
			var indicator_s = indicator.children(".slide");
			
			if (indicator.children(".current").index() <= 0)
			{
				if (!loop)
				{
					strip.animate({left: +15}, 50);
					strip.animate({left: 0}, 50);
					return;
				}	
				var next = indicator_s.eq(h_scroll_box_last_index(holder));
			}
			else
			{
				var next = indicator.children(".current").prev();
				if (next.length == 0) 
				{
					if (!loop)
					{
						strip.animate({left: +15}, 50);
						strip.animate({left: 0}, 50);
						return;
					}					
					next = indicator_s.eq(h_scroll_box_last_index(holder));
				}
			}
			
			var new_index = indicator_s.index(next.eq(0));
			var shift = strip.children(".slide").eq(new_index).position().left;
		
			indicator_s.removeClass('current');
			indicator_s.eq(new_index).addClass('current');
			
			strip.animate({left: -shift}, 500);
		}
		
		h_scroll_box_rotation = function()
		{
			h_scroll_box_play = setInterval(
				function()
				{
					$('.h-scroll-box').filter('.auto-scroll').each(
						function(indx, element)
						{
							h_scroll_box_rotate_left($(this).children(".holder"), true);
						}
					);
				}, 
				2500 //5000
			);
		};
		h_scroll_box_rotation();
 
		$(".h-scroll-box .r-arrow-box a").click(
			function() 
			{
				clearInterval(h_scroll_box_play);
				h_scroll_box_rotate_left($(this).parents(".holder"));
				h_scroll_box_rotation();
				return false;
			}
		);
		
		$(".h-scroll-box .l-arrow-box a").click(
			function() 
			{
				clearInterval(h_scroll_box_play);
				h_scroll_box_rotate_right($(this).parents(".holder"));
				h_scroll_box_rotation();
				return false;
			}
		);
	}
);

$(document).ready(
	function() 
	{
		$(".v-scroll-box .indicator .slide:first-child").addClass("current");
		
		v_scroll_box_last_index = function(holder)
		{
			var slides = holder.children(".strip").children(".slide");
			var holder_h = holder.height();
			var result = slides.size() - 1;
			
			for 
			(
				var i = result, h = slides.eq(i).height(); 
				i >= 0 && h <= holder_h; 
				i--, h += slides.eq(i).height()
			)
				result = i;
			
			return result;
		};
		
		v_scroll_box_rotate_up = function(holder, loop)
		{
			var indicator = holder.children(".indicator");
			var strip = holder.children(".strip");
			var indicator_s = indicator.children(".slide");
			var last_index = v_scroll_box_last_index(holder);
			
			if (indicator.children(".current").index() >= last_index)
			{
				if (!loop)
				{
					var shift = strip.children(".slide").eq(last_index).position().top;
					strip.animate({top: -shift-15}, 50);
					strip.animate({top: -shift}, 50);
					return;
				}	
				var next = indicator.children(".slide:first-child");
			}
			else
			{
				var next = indicator.children(".current").next();
				if (next.length == 0) 
				{
					if (!loop)
					{
						var shift = strip.children(".slide").eq(last_index).position().top;
						strip.animate({top: -shift-15}, 50);
						strip.animate({top: -shift}, 50);
						return;
					}	
					next = indicator.children(".slide:first-child");
				}
			}
			
			var new_index = indicator_s.index(next.eq(0));
			var shift = strip.children(".slide").eq(new_index).position().top;
		
			indicator_s.removeClass('current');
			indicator_s.eq(new_index).addClass('current');
			
			strip.animate({top: -shift}, 500);
		}

		v_scroll_box_rotate_down = function(holder, loop)
		{
			var indicator = holder.children(".indicator");
			var strip = holder.children(".strip");
			var indicator_s = indicator.children(".slide")
			var last_index = v_scroll_box_last_index(holder)
			
			if (indicator.children(".current").index() <= 0)
			{
				if (!loop)
				{
					strip.animate({top: +15}, 50);
					strip.animate({top: 0}, 50);
					return;
				}	
				var next = indicator_s.eq(last_index);
			}
			else
			{
				var next = indicator.children(".current").prev();
				if (next.length == 0) 
				{
					if (!loop)
					{
						strip.animate({top: +15}, 50);
						strip.animate({top: 0}, 50);
						return;
					}	
					next = indicator_s.eq(last_index);
				}
			}
			
			var new_index = indicator_s.index(next.eq(0));
			var shift = strip.children(".slide").eq(new_index).position().top;
		
			indicator_s.removeClass('current');
			indicator_s.eq(new_index).addClass('current');
			
			strip.animate({top: -shift}, 500);
		}
		
		$(".v-scroll-box .bottombar a.arrow").click(
			function() 
			{
				v_scroll_box_rotate_up($(this).parents(".v-scroll-box").children(".holder"));
				return false;
			}
		);
		
		$(".v-scroll-box .topbar a.arrow").click(
			function() 
			{
				v_scroll_box_rotate_down($(this).parents(".v-scroll-box").children(".holder"));
				return false;
			}
		);
	}
);

$(document).ready(function(){
	$(".drop-down-text").hide();
	$(".drop-down-text-head").click(
		function()
		{
			$(this).parent().children(".drop-down-text").slideToggle();
			$(this).toggleClass("drop-down-text-active"); return false;
		}
	);
});

$(document).ready(function(){
	$('.dialog-box').each(
		function(indx, element)
		{
			var sParams = getCookie(this.id) || '';
			var aParams = sParams.split(',', 5);
			var aParamsL = aParams.length;
			$(this).draggable({zIndex:9999, handle:'.dialog-header', scroll:false});
			if(aParamsL>=3)
				$(this).css({'top':aParams[1], 'left':aParams[2]});
				
			if($(this).hasClass('resizable')) 
			{
				$(this).resizable({minHeight:$(this).height(), minWidth:$(this).width()});
				if(aParamsL>=5)
					$(this).css({'height':aParams[3], 'width':aParams[4]});
			}			
			if(aParamsL>=1)
				$(this).css({'display':aParams[0]});
		}
	);
	$(".dialog-close-button").click(
		function()
		{
			var dlg_root = $(this).parents(".modal-dialog-bg");
			if(dlg_root.length == 0)
				dlg_root = $(this).parents(".dialog-box");
			dlg_root.css({"display":"none"});
		}
	);
});

$(document).ready(function(){
	$(".submenu-close-button").click(
		function()
		{
			var submenu = $(this).parents(".submenu");
			if(submenu.length == 0)
				submenu = $(this).parents(".top-menu");
			submenu.css({"display":"none"});
		}
	);
});

$(window).unload(function(){ 
	$('.dialog-box').each(
		function(indx, element)
		{
			var cookieValue = $(this).css('display') + ',' + $(this).css('top') + ',' + $(this).css('left');
			if($(this).hasClass('resizable')) {
				cookieValue += ',' + $(this).css('height') + ',' + $(this).css('width');
			}
			setCookie(this.id, cookieValue, {path:'/'});
		}
	);
});

function open_dialog(selector)
{
	$(selector).css({"display":"block"});
	return false;
}

function open_modal_dialog(selector)
{
	$(selector).css({"display":"block"});
	adjust_modal_dialog(selector);
	return false;
}

function adjust_modal_dialog(selector)
{
	var dialog_area = $(selector).children('.modal-dialog-area');
	var dialog_box = dialog_area.children('.modal-dialog-box');
	var top = (dialog_area.innerHeight()-dialog_box.outerHeight(true))/2;
	if(top<0) top = 0;
	dialog_box.css({top: (top < 0 ? 0 : top)});
}

$(document).ready(function() {
	$(window).resize(function(){
		$('.modal-dialog-bg').each(function(indx, element) {
			adjust_modal_dialog(this);
		});
	});
});

function close_dialog(selector)
{
	$(selector).css({"display":"none"});
	return false;
}

function open_tip(src, text, id, datestamp, title)
{
	if(datestamp === undefined)	datestamp = '';
	if(title === undefined)	title = document.title;
	
	$("#f-tips-dlg img.photo").attr("src", src);
	$("#f-tips-dlg span.datestamp").text(datestamp);
	$("#f-tips-dlg p.name").text(text);
	
	CcSetSharer(
		title, 
		document.location.protocol + '//' + document.location.host + src, 
		text, 
		document.location.protocol + '//' + document.location.host + document.location.pathname + '?EID_=' + id
	);
	
	$.ajax({
		url: "/ajax.counter.php",
		type: "POST",
		data: "ELEMENT_ID=" + id
	});
	
	return open_modal_dialog("#f-tips-dlg");
}

function CcSetSharer(title, img, text, url) {
	
	if(url === undefined)
		url = document.location.href;
	
	url = encodeURIComponent(url);
	title = encodeURIComponent(title);
	img = encodeURIComponent(img);
	text = encodeURIComponent(text);
	
	document.getElementById('cc_fb_sharer').href='https://www.facebook.com/sharer/sharer.php?u='+url;
	document.getElementById('cc_vk_sharer').href='http://vk.com/share.php?url='+url+'&title='+title+'&description='+text+'&image='+img+'&noparse=true';
	document.getElementById('cc_ok_sharer').href='https://connect.ok.ru/dk?st.cmd=WidgetSharePreview&service=odnoklassniki&st.shareUrl='+url;
	document.getElementById('cc_twitter_sharer').href='https://twitter.com/intent/tweet?text='+text+'&url='+url;
	document.getElementById('cc_google_sharer').href='https://plus.google.com/share?url='+url;
}

function open_digest(src,text,datestamp)
{
	$("#digest-dlg img.photo").attr("src", src);
	$("#f-tips-dlg span.datestamp").text(datestamp);
	$("#digest-dlg p.name").text(text);
	
	return open_modal_dialog("#digest-dlg");
}

$(document).ready(function()
{
	translate_it = function()
	{
		$.getJSON
		(
			'https://translate.yandex.net/api/v1.5/tr.json/translate', 
			{
				key:'trnsl.1.1.20160524T043313Z.d28e5415b80a5e9e.073238ba4c0adf763a54798e317a143870e837b7',
				text:$('#translate-src').val(),
				lang:'de-ru'
			}, 
			function(data)
			{
				$("#translate-res").text(data['text']);
			}
		);
	}

	$("#translate-btn").click(translate_it);
	$("#translate-src").keypress(function(eventObject){
	  if(eventObject.which == 13)
		translate_it();
	});
	
});

$(document).ready(function()
{
	/*convert_it = function()
	{
		var converter = $(this).parents(".converter");
		converter.find(".rub-value").val( 
			Math.round( converter.find(".eur-value").val() * converter.find(".eur-rate").html() * 100) / 100 
		);
	}*/

	//$(".converter .eur-value").on("input", convert_it);
	//$(".converter .eur-value").trigger("input");
	
	$(".converter .eur-value").on("input", 
		function()
		{
			var converter = $(this).parents(".converter");
			converter.find(".rub-value").val( 
				Math.round( converter.find(".eur-value").val() * converter.find(".eur-rate").html() * 100) / 100 
			);
		}
	);
	$(".converter .rub-value").on("input", 
		function()
		{
			var converter = $(this).parents(".converter");
			converter.find(".eur-value").val( 
				Math.round( converter.find(".rub-value").val() / converter.find(".eur-rate").html() * 100) / 100 
			);
		}
	);
	$(".converter .currency-fld").inputmask({
		"alias": "numeric",
		"digits": 2, 
		"digitsOptional": false,
		"allowPlus": false,
		"allowMinus": false,
		"placeholder": "0.00"
	});
});


function setCookie(name, value, options) {
	options = options || {};

	var expires = options.expires;

	if (typeof expires == "number" && expires) {
		var d = new Date();
		d.setTime(d.getTime() + expires * 1000);
		expires = options.expires = d;
	}
	if (expires && expires.toUTCString) {
		options.expires = expires.toUTCString();
	}

	value = encodeURIComponent(value);

	var updatedCookie = name + "=" + value;

	for (var propName in options) {
		updatedCookie += "; " + propName;
		var propValue = options[propName];
		if (propValue !== true) {
			updatedCookie += "=" + propValue;
		}
	}

	document.cookie = updatedCookie;
}

function getCookie(name) {
	var matches = document.cookie.match(new RegExp(
		"(?:^|; )" + name.replace(/([\.$?*|{}\(\)\[\]\\\/\+^])/g, '\\$1') + "=([^;]*)"
	));
	return matches ? decodeURIComponent(matches[1]) : undefined;
}
