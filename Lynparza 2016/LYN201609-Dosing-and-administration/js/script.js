$( function(){
	//prevent iPad rubber bank effect
	"use strict";
	$(document).on('touchmove',function(e){
 		e.preventDefault();
	});
	var content = $('.content'),
		navTop = $('.nav-top'),
		overlay = $('.overlay'),
		video =overlay.find('.video'),
		items = $('.overlay > div'),
		btn = $('.content > .btn, .nav-top [data-href=menu]'),
		btnMenu = $('.nav-top [data-href=menu]'),
		info = overlay.find('.info'),
		btnClose = overlay.find('.arrow, .close');
		
		btn.on('tap', function(){
			var $this = $(this);
				applyShade(overlay);
				overlay.addClass('show');
				
				items.hide();
			if($this.hasClass('btn-info')){
				overlay.find(".info > *:not('.arrow')").hide();
				info.show().find('[data-info='+$this.parent().find('.swiper-slide-active').attr('data-slide')+']').show();
				//console.log($this.parent().find('.swiper-slide-active').attr('data-slide'));
			}else if($this.hasClass('btn-play')){
				video.show();
				overlay.find('video').get(0).play();
			}else {
				
				overlay.find('.nav').show();
				btnMenu.css('opacity', 0);
				
			}
		});
		//close overlay
		btnClose.on('tap', function(){
			overlay.find('video').get(0).pause();
			btnMenu.css('opacity', 1);
			overlay.removeClass('show');
			applyShade(overlay);
		});	
	//top menu go to slide >>
	$('.nav-top').on('tap', "li:not('[data-href=menu]')", function(){
		var $this = $(this),
			km = '', id = '';
			console.log($this.attr('data-href'))
			switch($this.attr('data-href')){
				case "warning":
					km = 'LYN201612-Contraindications';
				break;
				case "pi":
					km = 'LYN2016-PI';
					id = 'LYNREF_2016';
				break;
				case "bibliography":
					km = 'LYN201611-References';
				break;
				case "resource":
					km = 'LYN201613-Resources';
				break;
				default:
					km = 'LYN2016-Test-or-Treat-me';
				break;
			}
		goToSlide(km, id);
	});
		
});

//go to slide
function goToSlide(km, id){
	"use strict";
	//$('.'+btn).on('tap', function(){});
	id = id ? ', '+id : '';
	document.location = 'veeva:gotoSlide('+km+'.zip'+id+')';
	
}
//global timeline
var tl = new TimelineLite();

///add shade class
function applyShade(e){
	setTimeout( function(){
		e.toggleClass('shade');
	}, 400);
}
